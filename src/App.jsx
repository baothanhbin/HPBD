import { useCallback, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { Howl } from "howler";
import { motion } from "framer-motion";
import { RotateCcw, Volume2, VolumeX } from "lucide-react";
import { birthday } from "./data/birthday";
import FloatingParticles from "./components/FloatingParticles";
import BirthdayWorld3D from "./components/BirthdayWorld3D";
import OpeningStage from "./components/OpeningStage";
import PortraitScene from "./components/PortraitScene";
import WishBook from "./components/WishBook";
import DreamStage3D from "./components/DreamStage3D";
import CakeCeremony from "./components/CakeCeremony";
import WishWheel from "./components/WishWheel";
import FinalScene from "./components/FinalScene";

const scenes = ["gift", "portrait", "book", "dream", "cake", "wish", "final"];

function burstConfetti(power = 1) {
  const base = {
    particleCount: Math.round(120 * power),
    spread: 82,
    startVelocity: 42,
    gravity: 0.75,
    ticks: 260,
    scalar: 1.05,
    colors: ["#fff7c2", "#ffd166", "#ff7aa2", "#c084fc", "#67e8f9", "#ffffff"]
  };

  confetti({ ...base, origin: { x: 0.16, y: 0.72 }, angle: 58 });
  confetti({ ...base, origin: { x: 0.84, y: 0.72 }, angle: 122 });
}

export default function App() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const soundRef = useRef(null);

  const sound = useMemo(() => {
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: [birthday.music],
        volume: 0.62,
        loop: true,
        html5: true
      });
    }
    return soundRef.current;
  }, []);

  const goTo = useCallback((index) => {
    setSceneIndex(Math.max(0, Math.min(index, scenes.length - 1)));
  }, []);

  const begin = useCallback(() => {
    setStarted(true);
    sound.play();
    burstConfetti(1.25);
    window.setTimeout(() => goTo(1), 1050);
  }, [goTo, sound]);

  const next = useCallback(() => {
    const nextIndex = Math.min(sceneIndex + 1, scenes.length - 1);
    if (nextIndex !== sceneIndex) {
      if (nextIndex === scenes.length - 1) burstConfetti(1.35);
      goTo(nextIndex);
    }
  }, [goTo, sceneIndex]);

  const toggleMute = useCallback(() => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    sound.mute(nextMuted);
  }, [muted, sound]);

  const replay = useCallback(() => {
    goTo(0);
    setStarted(false);
    sound.stop();
    sound.seek(0);
  }, [goTo, sound]);

  return (
    <main className="birthday-shell">
      <BirthdayWorld3D sceneIndex={sceneIndex} />
      <FloatingParticles />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="scene-dots" aria-hidden="true">
        {scenes.map((scene, index) => (
          <button
            className={index === sceneIndex ? "active" : ""}
            key={scene}
            onClick={() => goTo(index)}
            aria-label={`Go to ${scene}`}
          />
        ))}
      </div>

      <motion.div
        className="scene-track"
        animate={{ y: `-${sceneIndex * 100}vh` }}
        transition={{ type: "spring", stiffness: 54, damping: 24, mass: 0.92 }}
      >
        <OpeningStage onBegin={begin} started={started} />
        <PortraitScene onNext={next} />
        <WishBook onNext={next} />
        <DreamStage3D onNext={next} />
        <CakeCeremony
          onNext={next}
          onCelebrate={() => {
            burstConfetti(1.1);
            window.setTimeout(() => burstConfetti(0.85), 450);
          }}
        />
        <WishWheel onNext={next} onCelebrate={() => burstConfetti(0.9)} />
        <FinalScene onReplay={replay} />
      </motion.div>

      <div className="control-bar">
        <button className="icon-button" onClick={toggleMute} aria-label="Toggle music">
          {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <button className="icon-button" onClick={replay} aria-label="Replay">
          <RotateCcw size={19} />
        </button>
      </div>
    </main>
  );
}
