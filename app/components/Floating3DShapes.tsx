"use client";
import { Canvas } from "@react-three/fiber";
import { Float, Box, MeshDistortMaterial } from "@react-three/drei";

export default function Floating3DShapes() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Box args={[1.5, 1.5, 1.5]}>
          <MeshDistortMaterial color="#ff00ff" distort={0.3} speed={2} />
        </Box>
      </Float>
    </Canvas>
  );
}
