import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Gift, RotateCw, Ticket, WandSparkles } from "lucide-react";
import { birthday } from "../data/birthday";

export default function WishWheel({ onNext, onCelebrate }) {
  const [rotation, setRotation] = useState(0);
  const [selected, setSelected] = useState(null);

  const slices = useMemo(() => birthday.wheelWishes, []);

  const spin = () => {
    const pick = Math.floor(Math.random() * slices.length);
    const fullTurns = 1440 + Math.floor(Math.random() * 720);
    const segment = 360 / slices.length;
    setRotation(fullTurns + (360 - pick * segment));
    setSelected(slices[pick].detail);
    onCelebrate();
  };

  const segment = 360 / slices.length;
  const labelRadius = 34;

  return (
    <section className="scene wish-scene">
      <div className="wish-copy">
        <span className="eyebrow">Quà bonus</span>
        <h2>Quay xem hên không.</h2>
        <div className="icon-row icon-only">
          <span title="Voucher" aria-label="Voucher"><Ticket size={19} /></span>
          <span title="Hên xui" aria-label="Hên xui"><WandSparkles size={19} /></span>
          <span title="Nhận ngay" aria-label="Nhận ngay"><BadgeCheck size={19} /></span>
        </div>
        <div className={`wish-result ${selected ? "revealed" : ""}`}>
          <Gift size={20} />
          {selected || "Chưa quay nè cậu"}
        </div>
      </div>

      <div className="wheel-wrap">
        <span className="wheel-pointer" />
        <motion.div
          className="wish-wheel"
          animate={{ rotate: rotation }}
          transition={{ duration: 2.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {slices.map((slice, index) => (
            (() => {
              const angle = (index * segment - 90) * (Math.PI / 180);
              const x = 50 + Math.cos(angle) * labelRadius;
              const y = 50 + Math.sin(angle) * labelRadius;

              return (
                <span
                  className="wheel-label"
                  key={slice.label}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {slice.label}
                </span>
              );
            })()
          ))}
        </motion.div>
      </div>

      <div className="wish-actions">
        <button className="primary-action" onClick={spin}>
          <RotateCw size={18} />
          Quay
        </button>
        <button className="secondary-action" onClick={onNext}>
          Màn cuối
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
