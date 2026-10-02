import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function HeartMesh() {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.9) * 0.22;
    ref.current.scale.setScalar(1 + Math.sin(t * 2.4) * 0.035);
  });

  return (
    <group ref={ref}>
      <mesh position={[-0.22, 0.18, 0]} castShadow>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshPhysicalMaterial color="#ff6f9f" roughness={0.42} clearcoat={0.7} sheen={0.8} emissive="#ff2f75" emissiveIntensity={0.08} />
      </mesh>
      <mesh position={[0.22, 0.18, 0]} castShadow>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshPhysicalMaterial color="#ff6f9f" roughness={0.42} clearcoat={0.7} sheen={0.8} emissive="#ff2f75" emissiveIntensity={0.08} />
      </mesh>
      <mesh position={[0, -0.12, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[0.52, 0.52, 0.42]} />
        <meshPhysicalMaterial color="#ff6f9f" roughness={0.42} clearcoat={0.7} sheen={0.8} emissive="#ff2f75" emissiveIntensity={0.08} />
      </mesh>
      <mesh position={[0, 0.12, 0.34]}>
        <sphereGeometry args={[0.08, 18, 18]} />
        <meshStandardMaterial color="#fff7c2" emissive="#ffd166" emissiveIntensity={0.18} />
      </mesh>
    </group>
  );
}

export default function HeartMascot3D({ position = [2.6, -0.32, 0.4], scale = 0.9 }) {
  return (
    <Float speed={1.7} floatIntensity={0.35} rotationIntensity={0.18}>
      <group position={position} scale={scale}>
        <HeartMesh />
      </group>
    </Float>
  );
}
