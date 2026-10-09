import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import PropTypes from "prop-types";
import { useTheme } from "../../context/theme-context";
function Mechanism({ rotation, resetCount }) {
  const group = useRef();
  const target = useRef({ x: 0.35, y: -0.45, spread: 0 });
  const { invalidate, gl } = useThree();
  const { isDark } = useTheme();
  useEffect(() => {
    target.current.x = 0.35;
    target.current.y = -0.45 + rotation;
    invalidate();
  }, [rotation, resetCount, invalidate]);
  useEffect(() => {
    const move = (e) => {
      if (e.buttons) return;
      const rect = gl.domElement.getBoundingClientRect();
      target.current.x =
        0.35 + ((e.clientY - rect.top - rect.height / 2) / rect.height) * 0.18;
      target.current.y =
        -0.45 +
        rotation +
        ((e.clientX - rect.left - rect.width / 2) / rect.width) * 0.2;
      invalidate();
    };
    const leave = () => {
      target.current.x = 0.35;
      target.current.y = -0.45 + rotation;
      invalidate();
    };
    const scroll = () => {
      target.current.spread = Math.min(window.scrollY / 900, 0.35);
      invalidate();
    };
    gl.domElement.addEventListener("pointermove", move);
    gl.domElement.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      gl.domElement.removeEventListener("pointermove", move);
      gl.domElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", scroll);
    };
  }, [gl, invalidate, rotation]);
  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const t = target.current;
    const factor = 1 - Math.exp(-8 * Math.min(delta, 0.1));
    g.rotation.x += (t.x - g.rotation.x) * factor;
    g.rotation.y += (t.y - g.rotation.y) * factor;
    let moving =
      Math.abs(t.x - g.rotation.x) + Math.abs(t.y - g.rotation.y) > 0.001;
    g.children.forEach((child, i) => {
      const y = (i - 1) * (0.7 + t.spread);
      child.position.y += (y - child.position.y) * factor;
      moving ||= Math.abs(y - child.position.y) > 0.001;
    });
    if (moving) invalidate();
  });
  return (
    <group ref={group} rotation={[0.35, -0.45, -0.28]}>
      {[0, 1, 2].map((layer) => (
        <group
          key={layer}
          position={[0, (layer - 1) * 0.7, 0]}
          rotation={[0, layer === 1 ? Math.PI / 2 : 0, 0]}
        >
          {[0, 1, 2, 3].map((side) => (
            <group key={side} rotation={[0, (side * Math.PI) / 2, 0]}>
              <RoundedBox
                args={[2.65, 0.32, 0.36]}
                radius={0.09}
                smoothness={3}
                position={[0, 0, 1.18]}
              >
                <meshStandardMaterial
                  color={
                    layer === 1 ? "#ff653b" : isDark ? "#a5aaa5" : "#aeb8b1"
                  }
                  metalness={0.65}
                  roughness={0.3}
                />
              </RoundedBox>
              {[-1, 1].map((n) => (
                <mesh
                  key={n}
                  position={[n * 1.04, 0.18, 1.18]}
                  rotation={[-Math.PI / 2, 0, 0]}
                >
                  <cylinderGeometry args={[0.05, 0.05, 0.035, 10]} />
                  <meshStandardMaterial
                    color={isDark ? "#313831" : "#ced0c8"}
                    metalness={0.7}
                    roughness={0.4}
                  />
                </mesh>
              ))}
            </group>
          ))}
          {[-1, 1].map((n) => (
            <mesh key={n} position={[n * 1.15, 0, n * 1.15]}>
              <cylinderGeometry args={[0.07, 0.07, 0.8, 12]} />
              <meshStandardMaterial
                color="#6d756f"
                metalness={0.7}
                roughness={0.4}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}
Mechanism.propTypes = {
  resetCount: PropTypes.number,
  rotation: PropTypes.number,
};
function Controls({ rotation, resetCount, onFailure }) {
  const controls = useRef();
  const { gl } = useThree();
  useEffect(() => {
    controls.current?.reset();
  }, [rotation, resetCount]);
  useEffect(() => {
    const lost = (e) => {
      e.preventDefault();
      onFailure();
    };
    gl.domElement.addEventListener("webglcontextlost", lost);
    return () => gl.domElement.removeEventListener("webglcontextlost", lost);
  }, [gl, onFailure]);
  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      enableZoom={false}
      enableDamping
      dampingFactor={0.09}
      rotateSpeed={0.55}
      minPolarAngle={0.4}
      maxPolarAngle={2.5}
    />
  );
}
Controls.propTypes = {
  resetCount: PropTypes.number,
  rotation: PropTypes.number,
  onFailure: PropTypes.func,
};
export default function Scene({ rotation, resetCount, onFailure }) {
  return (
    <Canvas
      camera={{ position: [4, 3.1, 5.7], fov: 38 }}
      dpr={[1, 1.5]}
      frameloop="demand"
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 6, 4]} intensity={4} />
      <directionalLight position={[-4, 0, -2]} intensity={2} />
      <Mechanism rotation={rotation} resetCount={resetCount} />
      <Controls
        resetCount={resetCount}
        rotation={rotation}
        onFailure={onFailure}
      />
    </Canvas>
  );
}
Scene.propTypes = {
  resetCount: PropTypes.number,
  rotation: PropTypes.number,
  onFailure: PropTypes.func,
};
