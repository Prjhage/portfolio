"use client";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  Sphere,
  MeshDistortMaterial,
} from "@react-three/drei";

export default function ThreeBackground() {
  return (
    <Canvas className="absolute inset-0 z-0">
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 32, 32]} scale={1.5}>
          <MeshDistortMaterial
            color="#00f0ff"
            attach="material"
            distort={0.3}
            speed={2}
          />
        </Sphere>
      </Float>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
