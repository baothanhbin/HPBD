import { AnimatePresence, motion } from "framer-motion";
import { Coffee, Download, Gift, RotateCcw, Sparkles, Star, Ticket, Trophy, Utensils } from "lucide-react";
import { toPng } from "html-to-image";
import { birthday } from "../data/birthday";
import { useEffect, useRef, useState } from "react";

const fireworks = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  left: `${8 + ((index * 19) % 84)}%`,
  top: `${10 + ((index * 13) % 54)}%`,
  delay: `${index * 0.22}s`
}));

export default function FinalScene({ onReplay }) {
  const [charge, setCharge] = useState(0);
  const [holding, setHolding] = useState(false);
  const frameRef = useRef(null);
  const ticketRef = useRef(null);
  const unlocked = charge >= 100;

  const downloadTicket = async () => {
    if (!ticketRef.current) return;
    const dataUrl = await toPng(ticketRef.current, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#ffd166"
    });
    const link = document.createElement("a");
    link.download = "birthday-pass-huyn.png";
    link.href = dataUrl;
    link.click();
  };

  useEffect(() => {
    const tick = () => {
      setCharge((value) => {
        if (value >= 100) return 100;
        if (holding) return Math.min(100, value + 1.85);
        return Math.max(0, value - 0.8);
      });
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [holding]);

  return (
    <section className="scene final-scene">
      <div className="firework-field" aria-hidden="true">
        {fireworks.map((item) => (
          <span
            className="firework-burst"
            key={item.id}
            style={{ left: item.left, top: item.top, animationDelay: item.delay }}
          />
        ))}
      </div>

      <motion.div
        className="final-card"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.85 }}
      >
        <Sparkles size={34} />
        <span className="eyebrow">Cuối rồi nè</span>
        <h2>Happy birthday, {birthday.displayName}</h2>
        <div className="icon-row icon-only center">
          <span title="Bớt mệt" aria-label="Bớt mệt"><Trophy size={19} /></span>
          <span title="Nhiều tiền" aria-label="Nhiều tiền"><Gift size={19} /></span>
        </div>
        <button
          className={`secret-star ${unlocked ? "unlocked" : ""}`}
          onPointerDown={() => setHolding(true)}
          onPointerUp={() => setHolding(false)}
          onPointerCancel={() => setHolding(false)}
          onPointerLeave={() => setHolding(false)}
          aria-label="Giữ ngôi sao để mở điều ước bí mật"
          style={{ "--charge": `${charge}%` }}
        >
          {unlocked ? <Ticket size={20} /> : <Star size={18} />}
          {unlocked ? "Tải xuống để khi nào cần thì đòi" : "Giữ ngôi sao một chút"}
          {!unlocked && <span className="secret-meter" aria-hidden="true" />}
        </button>
        <AnimatePresence>
          {unlocked && (
            <motion.div
              className="birthday-ticket"
              ref={ticketRef}
              initial={{ opacity: 0, y: 28, rotateX: -18, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ type: "spring", stiffness: 130, damping: 18 }}
            >
              <div className="ticket-main">
                <span className="ticket-kicker">Birthday Pass</span>
                <strong>{birthday.displayName}</strong>
                <p>{birthday.secretWish}</p>
                <div className="ticket-perks">
                  <span><Coffee size={16} /> 1 ly nước</span>
                  <span><Utensils size={16} /> 1 bữa</span>
                  <span><Sparkles size={16} /> nghe chửi</span>
                </div>
              </div>
              <div className="ticket-stub">
                <span>VALID</span>
                <strong>SCREENSHOT</strong>
                <small>tải xuống rồi để dành đòi</small>
                <div className="barcode" aria-hidden="true" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="final-actions">
          {unlocked && (
            <button className="secondary-action ticket-download" onClick={downloadTicket}>
              <Download size={18} />
              Tải ticket
            </button>
          )}
          <button className="primary-action" onClick={onReplay}>
            <RotateCcw size={18} />
            Xem lại
          </button>
        </div>
      </motion.div>
    </section>
  );
}
