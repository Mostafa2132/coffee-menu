"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function CoffeeBean({ position, rotation, scale }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
        {/* Approximating a coffee bean shape with a stretched sphere */}
        <sphereGeometry args={[1, 32, 16]} />
        <meshStandardMaterial
          color="#3E2011"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  const beans = Array.from({ length: 15 }).map((_, i) => ({
    position: [
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10 - 5,
    ] as [number, number, number],
    rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
    scale: (Math.random() * 0.4 + 0.3) * (i % 3 === 0 ? [1, 0.7, 0.5] : [0.8, 1, 0.6]),
  }));

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#e8cba5" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#c67d35" />
      
      {beans.map((props, i) => (
        <CoffeeBean key={i} {...props} />
      ))}

      {/* Gold dust floating around */}
      <Sparkles count={100} scale={12} size={2} speed={0.4} color="#dbaf78" opacity={0.6} />
      <Environment preset="city" />
    </>
  );
}

export function CoffeeScene() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
