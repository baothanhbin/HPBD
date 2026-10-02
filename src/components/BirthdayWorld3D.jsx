import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function TinyGift({ color }) {
  return (
    <group>
      <RoundedBox args={[1, 0.82, 1]} radius={0.08} smoothness={5}>
        <meshPhysicalMaterial color={color} roughness={0.48} clearcoat={0.55} sheen={0.65} emissive={color} emissiveIntensity={0.04} />
      </RoundedBox>
      <RoundedBox args={[0.18, 0.86, 1.04]} radius={0.015} smoothness={3} position={[0, 0.01, 0]}>
        <meshPhysicalMaterial color="#fff7c2" roughness={0.24} metalness={0.18} clearcoat={0.7} emissive="#ffd166" emissiveIntensity={0.08} />
      </RoundedBox>
      <RoundedBox args={[1.04, 0.86, 0.18]} radius={0.015} smoothness={3} position={[0, 0.01, 0]}>
        <meshPhysicalMaterial color="#fff7c2" roughness={0.24} metalness={0.18} clearcoat={0.7} emissive="#ffd166" emissiveIntensity={0.08} />
      </RoundedBox>
      <mesh position={[0, 0.57, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.28, 0.026, 10, 32]} />
        <meshStandardMaterial color="#fff7c2" emissive="#ffd166" emissiveIntensity={0.16} />
      </mesh>
    </group>
  );
}

function FloatingShape({ position, color, speed, scale, type }) {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    ref.current.rotation.x = t * 0.55;
    ref.current.rotation.y = t * 0.75;
    ref.current.position.y = position[1] + Math.sin(t) * 0.22;
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {type === "gift" ? (
        <TinyGift color={color} />
      ) : (
        <mesh>
          <icosahedronGeometry args={[0.72, 1]} />
          <meshPhysicalMaterial color={color} roughness={0.42} metalness={0.16} clearcoat={0.5} emissive={color} emissiveIntensity={0.08} />
        </mesh>
      )}
    </group>
  );
}

function Balloon({ position, color, delay }) {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime + delay;
    ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.35;
    ref.current.position.x = position[0] + Math.sin(t * 0.42) * 0.16;
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.22} metalness={0.05} emissive={color} emissiveIntensity={0.08} />
      </mesh>
      <mesh position={[0, -0.52, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.72, 8]} />
        <meshBasicMaterial color="#fff7c2" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

function BirthdayObjects({ sceneIndex }) {
  const objects = useMemo(
    () => [
      [-4.9, 1.7, -3.2, "#ff7aa2", 0.62, 0.72, "gift"],
      [4.6, -0.2, -2.8, "#67e8f9", 0.78, 0.58, "star"],
      [2.8, 2.3, -4.4, "#ffd166", 0.5, 0.48, "gift"],
      [-2.1, -2.2, -3.5, "#c084fc", 0.7, 0.62, "star"]
    ],
    [],
  );

  return (
    <group position={[sceneIndex * 0.05, 0, 0]}>
      {objects.map(([x, y, z, color, speed, scale, type]) => (
        <Float key={`${x}-${y}`} speed={1.4} rotationIntensity={0.45} floatIntensity={0.7}>
          <FloatingShape position={[x, y, z]} color={color} speed={speed} scale={scale} type={type} />
        </Float>
      ))}
      <Balloon position={[-5.6, -1.2, -4.8]} color="#ff9f6e" delay={0.2} />
      <Balloon position={[5.4, 1.2, -4.2]} color="#f0abfc" delay={1.1} />
      <Balloon position={[3.9, -2.2, -5.2]} color="#a7f3d0" delay={2.1} />
    </group>
  );
}

export default function BirthdayWorld3D({ sceneIndex }) {
  return (
    <div className="world-3d" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 7.5], fov: 48 }} dpr={[1, 1.8]}>
        <ambientLight intensity={0.62} />
        <pointLight position={[4, 4, 4]} intensity={1.4} color="#fff7c2" />
        <pointLight position={[-5, -2, 3]} intensity={0.9} color="#ff7aa2" />
        <Stars radius={54} depth={22} count={1300} factor={3.8} saturation={0.35} fade speed={0.65} />
        <BirthdayObjects sceneIndex={sceneIndex} />
      </Canvas>
    </div>
  );
}
