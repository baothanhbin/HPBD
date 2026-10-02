import { motion } from "framer-motion";
import { ArrowRight, Gem, Heart, Sparkles, Stars } from "lucide-react";
import { birthday } from "../data/birthday";

export default function PortraitScene({ onNext }) {
  return (
    <section className="scene portrait-scene">
      <motion.div
        className="portrait-card"
        initial={{ opacity: 0, x: -60, rotate: -4 }}
        whileInView={{ opacity: 1, x: 0, rotate: -1.5 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <div className="portrait-frame">
          <img src={birthday.photo} alt="Huyền" />
        </div>
        <span className="photo-caption">Huyền Thảo Mai</span>
      </motion.div>

      <div className="message-panel">
        <span className="eyebrow">Nói nhỏ nè</span>
        <h2>Tuổi mới bớt mệt nha.</h2>
        <div className="icon-row icon-only compact">
          <span title="Nhiều tiền" aria-label="Nhiều tiền"><Gem size={19} /></span>
          <span title="Ít stress" aria-label="Ít stress"><Stars size={19} /></span>
        </div>
        <div className="note-stack">
          {birthday.notes.map((note, index) => (
            <motion.p
              key={note}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.18, duration: 0.7 }}
            >
              <Heart size={18} />
              {note}
            </motion.p>
          ))}
        </div>
        <button className="secondary-action" onClick={onNext}>
          Mở sổ nè
          <ArrowRight size={18} />
        </button>
      </div>

      <Sparkles className="scene-sparkle sparkle-a" size={34} />
      <Sparkles className="scene-sparkle sparkle-b" size={24} />
    </section>
  );
}
