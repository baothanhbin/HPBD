import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Flame, PartyPopper, Sparkles, WandSparkles } from "lucide-react";

function SimpleCake({ blown }) {
  return (
    <svg className="simple-cake" viewBox="0 0 720 440" role="img" aria-label="Bánh sinh nhật 2D đơn giản">
      <defs>
        <linearGradient id="simpleCakePink" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ff9fbd" />
          <stop offset="100%" stopColor="#e4568c" />
        </linearGradient>
        <linearGradient id="simpleCream" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fff9df" />
          <stop offset="100%" stopColor="#ffe6a8" />
        </linearGradient>
        <radialGradient id="simpleFlame" cx="50%" cy="62%" r="58%">
          <stop offset="0%" stopColor="#fffbd0" />
          <stop offset="48%" stopColor="#ffd166" />
          <stop offset="100%" stopColor="#ff8a45" />
        </radialGradient>
        <filter id="cakeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#12071d" floodOpacity="0.3" />
        </filter>
      </defs>

      <ellipse cx="360" cy="390" rx="252" ry="26" fill="rgba(255,255,255,0.28)" />

      <g filter="url(#cakeShadow)">
        <path d="M124 274 C124 241 230 218 360 218 C490 218 596 241 596 274 V348 C596 383 490 406 360 406 C230 406 124 383 124 348Z" fill="url(#simpleCakePink)" />
        <path d="M124 274 C124 240 230 216 360 216 C490 216 596 240 596 274 C596 305 490 328 360 328 C230 328 124 305 124 274Z" fill="url(#simpleCream)" />
        <path d="M124 274 C154 309 184 309 214 274 C244 311 274 311 304 274 C334 312 386 312 416 274 C446 311 476 311 506 274 C536 309 566 309 596 274 V292 C552 324 168 324 124 292Z" fill="#fff8dc" />

        <path d="M232 172 C232 146 287 128 360 128 C433 128 488 146 488 172 V235 C488 263 433 282 360 282 C287 282 232 263 232 235Z" fill="#f47fa8" />
        <path d="M232 172 C232 145 287 126 360 126 C433 126 488 145 488 172 C488 197 433 216 360 216 C287 216 232 197 232 172Z" fill="url(#simpleCream)" />
        <path d="M232 172 C260 202 288 202 316 172 C344 204 376 204 404 172 C432 202 460 202 488 172 V188 C455 214 265 214 232 188Z" fill="#fff8dc" />

        <path d="M337 324 C321 310 345 292 360 314 C375 292 399 310 383 324 L360 346Z" fill="#c73572" opacity="0.9" />
        <circle cx="260" cy="332" r="6" fill="#fff8dc" />
        <circle cx="460" cy="332" r="6" fill="#fff8dc" />
        <circle cx="322" cy="240" r="5" fill="#fff8dc" />
        <circle cx="398" cy="240" r="5" fill="#fff8dc" />
      </g>

      {[-82, 0, 82].map((x, index) => (
        <g key={x} className="simple-candle" style={{ "--delay": `${index * 0.12}s` }} transform={`translate(${360 + x} 78)`}>
          <rect x="-7" y="36" width="14" height="70" rx="5" fill="#fff8fb" />
          <path d="M-5 50 L6 40 M-6 72 L6 61 M-6 94 L6 83" stroke="#d85c88" strokeWidth="5" strokeLinecap="round" />
          <rect x="-1" y="30" width="2" height="8" rx="1" fill="#3b2443" />
          <path className={blown ? "simple-flame out" : "simple-flame"} d="M0 0 C18 23 9 43 0 48 C-14 39 -16 20 0 0Z" fill="url(#simpleFlame)" />
          {blown && <circle className="simple-smoke" cx="0" cy="10" r="12" />}
        </g>
      ))}
    </svg>
  );
}

export default function CakeCeremony({ onNext, onCelebrate }) {
  const [blown, setBlown] = useState(false);

  const blowCandles = () => {
    if (blown) return;
    setBlown(true);
    onCelebrate();
  };

  return (
    <section className="scene cake-scene">
      <div className="cake-copy">
        <span className="eyebrow">Tới đoạn quan trọng</span>
        <h2>Ước nhanh đi cậu.</h2>
        <div className="icon-row icon-only">
          <span title="Nến" aria-label="Nến"><Flame size={19} /></span>
          <span title="Ước giàu" aria-label="Ước giàu"><WandSparkles size={19} /></span>
          <span title="Pháo giấy" aria-label="Pháo giấy"><PartyPopper size={19} /></span>
        </div>
      </div>

      <motion.div
        className="cake-stage cake-stage-2d simple-cake-stage"
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <SimpleCake blown={blown} />
      </motion.div>

      <div className="cake-actions">
        <button className="primary-action" onClick={blowCandles}>
          <Flame size={18} />
          {blown ? "Xong, điều ước bay rồi" : "Thổi nến đi"}
        </button>
        <button className="secondary-action" onClick={onNext}>
          Voucher
          <ArrowRight size={18} />
        </button>
      </div>
      <Sparkles className="scene-sparkle cake-sparkle" size={30} />
    </section>
  );
}
