import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

function LineDiamond() {
  return (
    <svg viewBox="0 0 120 16" width="120" height="16" aria-hidden="true">
      <line x1="0" y1="8" x2="48" y2="8" stroke="#D4B896" strokeWidth="1" />
      <line x1="72" y1="8" x2="120" y2="8" stroke="#D4B896" strokeWidth="1" />
      <rect x="55.5" y="3.5" width="9" height="9" fill="#D4B896" transform="rotate(45 60 8)" />
    </svg>
  );
}

export default function Gifts() {
  return (
    <section className="gifts">
      <div className="section-inner gifts__inner">
        <ScrollReveal>
          <LineDiamond />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <p className="gifts__eyebrow">Regalos</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="gifts__text">
            Tu presencia es el mejor regalo. Si deseas obsequiarnos algo, puedes hacerlo a
            través de:
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15} direction="scale">
          <motion.div className="gifts__card" whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            <svg viewBox="0 0 28 28" width="28" height="28" aria-hidden="true">
              <rect x="3" y="7" width="22" height="16" rx="2" fill="none" stroke="var(--cafe)" strokeWidth="1.4" />
              <path d="M3 9 L14 17 L25 9" fill="none" stroke="var(--cafe)" strokeWidth="1.4" />
              <circle cx="14" cy="14" r="3.2" fill="none" stroke="var(--cafe)" strokeWidth="1.2" />
            </svg>
            <p className="gifts__card-title">Transferencia bancaria</p>
            <p className="gifts__card-sub">[El usuario agregará los datos bancarios aquí]</p>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
