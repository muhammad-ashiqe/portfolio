import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Stars, Float } from "@react-three/drei";
import * as THREE from "three";

const CoreGeometry = () => {
  const meshRef = useRef();
  const { viewport } = useThree();
  
  // Responsive scaling
  const scale = viewport.width < 7.68 ? viewport.width / 3 : 2.5;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
        meshRef.current.rotation.x = t * 0.2;
        meshRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={meshRef} visible args={[1, 64, 64]} scale={scale}>
        <MeshDistortMaterial
            color="#222" // Dark architectural color
            attach="material"
            distort={0.6} // Strength, 0 disables distortion (default=1)
            speed={1.5} // Speed (default=1)
            roughness={0.2}
            metalness={0.8}
            wireframe={false}
        />
        </Sphere>
        {/* Wireframe overlay for "Cyber" look */}
         <Sphere visible args={[1.02, 64, 64]} scale={scale}>
             <meshBasicMaterial color="#4f46e5" wireframe transparent opacity={0.1} />
         </Sphere>
    </Float>
  );
};

const BackgroundParticles = () => {
    return (
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    )
}

const GlobalCanvas = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-black">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]} // Performance optimization
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} color="#4f46e5" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ec4899" />
        
        <CoreGeometry />
        <BackgroundParticles />
      </Canvas>
    </div>
  );
};

export default GlobalCanvas;
