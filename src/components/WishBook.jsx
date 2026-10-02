import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, BookOpen, PenLine, SmilePlus, Stars } from "lucide-react";
import { birthday } from "../data/birthday";

export default function WishBook({ onNext }) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const current = birthday.wishBookPages[page];
  const isFirst = page === 0;
  const isLast = page === birthday.wishBookPages.length - 1;

  const turnPage = (nextPage) => {
    setDirection(nextPage > page ? 1 : -1);
    setPage(nextPage);
  };

  return (
    <section className="scene book-scene">
      <div className="book-copy">
        <span className="eyebrow">Sổ nhỏ của Huỳn</span>
        <h2>Đọc từ từ thôi.</h2>
        <div className="icon-row icon-only">
          <span title="Lật trang" aria-label="Lật trang"><BookOpen size={19} /></span>
          <span title="Lời chúc" aria-label="Lời chúc"><PenLine size={19} /></span>
          <span title="Cà khịa" aria-label="Cà khịa"><SmilePlus size={19} /></span>
        </div>
      </div>

      <div className="book-wrap">
        <div className="wish-book">
          <div className="book-left">
            <Stars size={42} />
            <span>Sổ của Huỳn</span>
            <strong>{birthday.displayName}</strong>
          </div>
          <motion.div
            className="book-page"
            key={page}
            initial={{ opacity: 0, x: direction * 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.22, delay: 0.18 }}
          >
            <span>{current.title}</span>
            <h3>{current.heading}</h3>
            <p>{current.body}</p>
          </motion.div>
          <motion.div
            className="page-flip"
            key={`flip-${page}`}
            initial={{ rotateY: direction > 0 ? 0 : -180, opacity: 0.92 }}
            animate={{ rotateY: direction > 0 ? -180 : 0, opacity: 0 }}
            transition={{ duration: 0.58, ease: [0.2, 0.8, 0.2, 1] }}
            aria-hidden="true"
          />
        </div>

        <div className="book-controls">
          <button className="icon-button" disabled={isFirst} onClick={() => turnPage(page - 1)} aria-label="Trang trước">
            <ChevronLeft size={20} />
          </button>
          <span>
            {page + 1}/{birthday.wishBookPages.length}
          </span>
          <button className="icon-button" disabled={isLast} onClick={() => turnPage(page + 1)} aria-label="Trang sau">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <button className="secondary-action book-next" onClick={onNext}>
        Qua thổi nến
        <ArrowRight size={18} />
      </button>
    </section>
  );
}
