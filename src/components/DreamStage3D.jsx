import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, MeshReflectorMaterial, OrbitControls, RoundedBox, Text } from "@react-three/drei";
import { useRef } from "react";
import { ArrowRight, Gift, Heart, Stars } from "lucide-react";
import HeartMascot3D from "./HeartMascot3D";

function SatinMaterial({ color, emissive = color }) {
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={0.52}
      metalness={0.08}
      clearcoat={0.65}
      clearcoatRoughness={0.28}
      sheen={0.95}
      sheenColor={color}
      emissive={emissive}
      emissiveIntensity={0.025}
    />
  );
}

function RibbonMaterial() {
  return (
    <meshPhysicalMaterial
      color="#fff0a8"
      roughness={0.26}
      metalness={0.22}
      clearcoat={0.8}
      clearcoatRoughness={0.18}
      emissive="#ffd166"
      emissiveIntensity={0.08}
    />
  );
}

function RealGift({ position, size = 1.4, color = "#ff7aa2", accent = "#fff0a8", delay = 0 }) {
  const ref = useRef();
  const lid = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime + delay;
    ref.current.rotation.y = Math.sin(t * 0.48) * 0.18;
    ref.current.rotation.z = Math.sin(t * 0.35) * 0.035;
    lid.current.rotation.x = -0.08 + Math.sin(t * 1.1) * 0.035;
  });

  const ribbonWidth = size * 0.15;
  const bodyHeight = size * 0.9;
  const lidHeight = size * 0.22;

  return (
    <group ref={ref} position={position} scale={size}>
      <RoundedBox args={[1, 0.72, 1]} radius={0.08} smoothness={6} position={[0, -0.14, 0]} castShadow receiveShadow>
        <SatinMaterial color={color} />
      </RoundedBox>
      <group ref={lid} position={[0, bodyHeight * 0.33, 0]}>
        <RoundedBox args={[1.14, lidHeight, 1.14]} radius={0.075} smoothness={6} castShadow receiveShadow>
          <SatinMaterial color={color} />
        </RoundedBox>
        <mesh position={[0, lidHeight * 0.55, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.22, 0.035, 14, 42]} />
          <RibbonMaterial color={accent} />
        </mesh>
        <mesh position={[-0.18, lidHeight * 0.56, 0]} rotation={[Math.PI / 2, 0.55, 0]} castShadow>
          <torusGeometry args={[0.18, 0.028, 12, 36]} />
          <RibbonMaterial color={accent} />
        </mesh>
        <mesh position={[0.18, lidHeight * 0.56, 0]} rotation={[Math.PI / 2, -0.55, 0]} castShadow>
          <torusGeometry args={[0.18, 0.028, 12, 36]} />
          <RibbonMaterial color={accent} />
        </mesh>
      </group>
      <RoundedBox args={[ribbonWidth, 0.76, 1.035]} radius={0.018} smoothness={4} position={[0, -0.13, 0.004]} castShadow>
        <RibbonMaterial />
      </RoundedBox>
      <RoundedBox args={[1.035, 0.76, ribbonWidth]} radius={0.018} smoothness={4} position={[0.004, -0.13, 0]} castShadow>
        <RibbonMaterial />
      </RoundedBox>
      <mesh position={[-0.22, 0.06, 0.515]} rotation={[0, 0, -0.25]}>
        <planeGeometry args={[0.34, 0.55]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.16} />
      </mesh>
    </group>
  );
}

function GiftTower() {
  const group = useRef();

  useFrame((state) => {
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.18;
  });

  return (
    <group ref={group}>
      <Float speed={1.4} floatIntensity={0.55} rotationIntensity={0.35}>
        <RealGift position={[-1.55, -0.62, 0.08]} size={1.1} color="#ff6f9f" delay={0.1} />
      </Float>
      <Float speed={1.2} floatIntensity={0.45} rotationIntensity={0.28}>
        <RealGift position={[-0.05, -0.02, 0.16]} size={1.42} color="#ffd166" delay={0.8} />
      </Float>
      <Float speed={1.6} floatIntensity={0.5} rotationIntensity={0.32}>
        <RealGift position={[1.45, -0.7, -0.04]} size={1} color="#67e8f9" delay={1.3} />
      </Float>
    </group>
  );
}

function GiftName() {
  const group = useRef();

  useFrame((state) => {
    group.current.position.y = 1.72 + Math.sin(state.clock.elapsedTime * 1.15) * 0.035;
  });

  return (
    <group ref={group} position={[0, 1.72, -0.36]}>
      <Text
        anchorX="center"
        anchorY="middle"
        color="#fff6c6"
        fontSize={0.34}
        letterSpacing={0.018}
        outlineColor="#4c1d36"
        outlineWidth={0.012}
      >
        Huyền Thảo Mai
      </Text>
    </group>
  );
}

function StageHalo() {
  const ring = useRef();

  useFrame((state) => {
    ring.current.rotation.z = state.clock.elapsedTime * 0.18;
  });

  return (
    <group ref={ring} position={[0, -1.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <torusGeometry args={[2.55, 0.012, 8, 128]} />
        <meshBasicMaterial color="#ffd166" transparent opacity={0.62} />
      </mesh>
      <mesh>
        <torusGeometry args={[2.05, 0.008, 8, 128]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.34} />
      </mesh>
      <mesh>
        <torusGeometry args={[1.45, 0.006, 8, 128]} />
        <meshBasicMaterial color="#ff7aa2" transparent opacity={0.38} />
      </mesh>
    </group>
  );
}

export default function DreamStage3D({ onNext }) {
  return (
    <section className="scene dream-scene">
      <div className="dream-copy">
        <span className="eyebrow">Sân khấu nhỏ</span>
        <h2>Làm tí hộp 3D cho vui nhể :))</h2>
        <div className="icon-row icon-only">
          <span title="Quà 3D" aria-label="Quà 3D"><Gift size={19} /></span>
          <span title="Tim bay" aria-label="Tim bay"><Heart size={19} /></span>
          <span title="Xịn xíu" aria-label="Xịn xíu"><Stars size={19} /></span>
        </div>
        <button className="secondary-action" onClick={onNext}>
          Qua thổi nến
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="dream-canvas-card">
        <Canvas shadows camera={{ position: [0, 1.18, 6], fov: 44 }} dpr={[1, 2]}>
          <color attach="background" args={["#12081f"]} />
          <ambientLight intensity={0.48} />
          <spotLight castShadow position={[0, 5.2, 5.2]} angle={0.52} intensity={2.8} color="#fff7c2" shadow-mapSize={[1024, 1024]} />
          <pointLight position={[-3.4, -0.7, 3]} intensity={1.35} color="#ff7aa2" />
          <pointLight position={[3.2, 1.1, 2.4]} intensity={1.25} color="#67e8f9" />
          <Environment preset="studio" environmentIntensity={0.82} />
          <HeartMascot3D position={[2.55, -0.5, 0.2]} scale={0.95} />
          <GiftName />
          <GiftTower />
          <StageHalo />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.36, 0]} receiveShadow>
            <circleGeometry args={[3.2, 96]} />
            <MeshReflectorMaterial color="#21122f" roughness={0.36} metalness={0.42} blur={[520, 120]} mixBlur={2.2} mixStrength={0.34} />
          </mesh>
          <ContactShadows position={[0, -1.33, 0]} opacity={0.52} scale={7} blur={2.2} far={3.8} />
          <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={1.0} maxPolarAngle={1.65} />
        </Canvas>
      </div>
    </section>
  );
}
