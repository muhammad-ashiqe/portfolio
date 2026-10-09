import PropTypes from "prop-types";
import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Stars, Float } from "@react-three/drei";
import { useTheme } from "../../context/theme-context";

const Halo = ({ scale, isDark }) => {
  return (
    <Sphere visible args={[1.35, 48, 48]} scale={scale}>
      <meshBasicMaterial
        color={isDark ? "#60a5fa" : "#2563eb"}
        transparent
        opacity={isDark ? 0.055 : 0.045}
      />
    </Sphere>
  );
};

const CoreGeometry = () => {
  const meshRef = useRef();
  const wireRef = useRef();
  const haloRef = useRef();
  const outerWireRef = useRef();
  const clusterRef = useRef();
  const dragRef = useRef({
    active: false,
    lastX: 0,
    lastY: 0,
    lastInteractionTime: 0,
    velocityX: 0,
    velocityY: 0,
    rotationX: 0.18,
    rotationY: 0.55,
  });
  const { viewport } = useThree();
  const { isDark } = useTheme();

  const scale = viewport.width < 7.68 ? viewport.width / 2.8 : 2.8;
  const dragSensitivity = viewport.width < 7.68 ? 0.0055 : 0.0042;
  const positionX = viewport.width < 7.68 ? 0 : viewport.width * 0.23;
  const positionY = viewport.width < 7.68 ? 0.1 : 0.12;

  const handlePointerDown = (event) => {
    event.stopPropagation();
    dragRef.current.active = true;
    dragRef.current.lastX = event.clientX;
    dragRef.current.lastY = event.clientY;
    dragRef.current.lastInteractionTime = performance.now();
    dragRef.current.velocityX = 0;
    dragRef.current.velocityY = 0;
    document.body.style.cursor = "grabbing";
    event.target.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current.active) {
      return;
    }

    event.stopPropagation();
    const deltaX = event.clientX - dragRef.current.lastX;
    const deltaY = event.clientY - dragRef.current.lastY;

    dragRef.current.lastX = event.clientX;
    dragRef.current.lastY = event.clientY;
    dragRef.current.lastInteractionTime = performance.now();
    dragRef.current.velocityY = deltaX * dragSensitivity;
    dragRef.current.velocityX = deltaY * dragSensitivity;
    dragRef.current.rotationY += dragRef.current.velocityY;
    dragRef.current.rotationX += dragRef.current.velocityX;
  };

  const stopDragging = (event) => {
    event?.stopPropagation?.();
    dragRef.current.active = false;
    dragRef.current.lastInteractionTime = performance.now();
    document.body.style.cursor = "";
    event?.target?.releasePointerCapture?.(event.pointerId);
  };

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const dragState = dragRef.current;
    const targetX = Math.max(-0.55, Math.min(0.55, dragState.rotationX));
    const msSinceInteraction = performance.now() - dragState.lastInteractionTime;
    const idleRotationDelay = 850;

    if (!dragState.active) {
      dragState.rotationY += dragState.velocityY;
      dragState.rotationX += dragState.velocityX;
      dragState.velocityX *= 0.92;
      dragState.velocityY *= 0.94;

      if (msSinceInteraction > idleRotationDelay) {
        dragState.rotationY += 0.0011;
        dragState.rotationX += Math.sin(t * 0.7) * 0.00022;
      }
    }

    dragState.rotationX = Math.max(-0.6, Math.min(0.6, dragState.rotationX));

    if (meshRef.current) {
      meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.08;
      meshRef.current.rotation.y +=
        (dragState.rotationY - meshRef.current.rotation.y) * 0.08;
    }

    if (wireRef.current) {
      wireRef.current.rotation.x = meshRef.current.rotation.x * 0.96;
      wireRef.current.rotation.y = meshRef.current.rotation.y * 1.03;
    }

    if (outerWireRef.current) {
      outerWireRef.current.rotation.x = meshRef.current.rotation.x * 1.05;
      outerWireRef.current.rotation.y = meshRef.current.rotation.y * 0.92;
    }

    if (haloRef.current) {
      haloRef.current.rotation.x = meshRef.current.rotation.x * 0.55;
      haloRef.current.rotation.y = meshRef.current.rotation.y * 0.55;
      const pulse = isDark ? 1 + Math.sin(t * 1.2) * 0.025 : 1 + Math.sin(t) * 0.02;
      haloRef.current.scale.setScalar(scale * 1.15 * pulse);
    }

    if (clusterRef.current) {
      clusterRef.current.position.x +=
        (positionX - clusterRef.current.position.x) * 0.035;
      clusterRef.current.position.y +=
        (positionY - clusterRef.current.position.y) * 0.035;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={1.15}>
      <group
        ref={clusterRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerOut={stopDragging}
        onPointerCancel={stopDragging}
        onPointerOver={() => {
          if (!dragRef.current.active) {
            document.body.style.cursor = "grab";
          }
        }}
      >
        <group ref={haloRef}>
          <Halo scale={scale * 1.15} isDark={isDark} />
        </group>

        <Sphere ref={meshRef} visible args={[1, 96, 96]} scale={scale}>
          <MeshDistortMaterial
            color={isDark ? "#171d2a" : "#bfd6f8"}
            attach="material"
            distort={0.62}
            speed={1.55}
            roughness={0.18}
            metalness={0.84}
            wireframe={false}
          />
        </Sphere>

        <Sphere ref={wireRef} visible args={[1.03, 64, 64]} scale={scale}>
          <meshBasicMaterial
            color={isDark ? "#60a5fa" : "#2563eb"}
            wireframe
            transparent
            opacity={isDark ? 0.28 : 0.24}
          />
        </Sphere>

        <Sphere ref={outerWireRef} visible args={[1.08, 48, 48]} scale={scale}>
          <meshBasicMaterial
            color={isDark ? "#38bdf8" : "#0ea5e9"}
            wireframe
            transparent
            opacity={isDark ? 0.12 : 0.08}
          />
        </Sphere>
      </group>
    </Float>
  );
};

const BackgroundParticles = () => {
  const { isDark } = useTheme();

  return (
    <Stars
      radius={100}
      depth={50}
      count={isDark ? 5200 : 4200}
      factor={isDark ? 4 : 3.2}
      saturation={0}
      fade
      speed={isDark ? 1 : 0.8}
    />
  );
};

const GlobalCanvas = () => {
  const { isDark } = useTheme();

  return (
    <div className="fixed inset-0 z-0 theme-bg">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={[isDark ? "#050505" : "#edf3fb"]} />
        <fog attach="fog" args={[isDark ? "#050505" : "#edf3fb", 7, 15]} />
        <ambientLight intensity={isDark ? 0.62 : 0.95} />
        <directionalLight
          position={[8, 10, 8]}
          intensity={isDark ? 1.2 : 1.35}
          color={isDark ? "#4f46e5" : "#2563eb"}
        />
        <directionalLight
          position={[-8, -10, -4]}
          intensity={isDark ? 0.62 : 0.85}
          color={isDark ? "#ec4899" : "#0ea5e9"}
        />
        <pointLight
          position={[0, 0, 5]}
          intensity={isDark ? 0.75 : 0.65}
          color={isDark ? "#60a5fa" : "#38bdf8"}
        />

        <CoreGeometry />
        <BackgroundParticles />
      </Canvas>
    </div>
  );
};

export default GlobalCanvas;

Halo.propTypes = { scale: PropTypes.number, isDark: PropTypes.bool };
