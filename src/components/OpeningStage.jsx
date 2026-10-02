import { motion } from "framer-motion";
import { Gift, Heart, Music, Sparkles } from "lucide-react";
import { birthday } from "../data/birthday";

export default function OpeningStage({ onBegin, started }) {
  return (
    <section className="scene opening-scene">
      <div className="stage-light" />
      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <h1>Sinh nhật vui nha {birthday.displayName}</h1>
        <div className="icon-row icon-only">
          <span title="Lung linh" aria-label="Lung linh"><Sparkles size={19} /></span>
          <span title="Có nhạc" aria-label="Có nhạc"><Music size={19} /></span>
          <span title="Riêng cho cậu" aria-label="Riêng cho cậu"><Heart size={19} /></span>
        </div>
      </motion.div>

      <motion.button
        className={`gift-portal ${started ? "opened" : ""}`}
        onClick={onBegin}
        whileHover={{ scale: 1.03, rotateX: 4, rotateY: -5 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Open birthday gift"
      >
        <span className="gift-lid" />
        <span className="gift-cube">
          <span className="gift-ribbon vertical" />
          <span className="gift-ribbon horizontal" />
          <Gift size={76} strokeWidth={1.35} />
        </span>
        <span className="gift-glow" />
      </motion.button>

      <motion.button
        className="primary-action"
        onClick={onBegin}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        <Sparkles size={19} />
        Mở đi cậu
      </motion.button>
    </section>
  );
}
