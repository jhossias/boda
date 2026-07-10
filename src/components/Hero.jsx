import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

function AnimatedWord({ text, startIndex, className }) {
  return (
    <span style={{ display: 'inline-flex' }}>
      {[...text].map((ch, i) => (
        <motion.span
          key={i}
          className={className}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: (startIndex + i) * 0.03 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function BranchDivider() {
  return (
    <svg viewBox="0 0 200 30" width="200" height="30" aria-hidden="true">
      <motion.path
        d="M100 15 C 80 5, 60 4, 42 10 C 55 12, 68 14, 80 15"
        fill="none"
        stroke="#8B6E47"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
      <motion.path
        d="M100 15 C 120 5, 140 4, 158 10 C 145 12, 132 14, 120 15"
        fill="none"
        stroke="#8B6E47"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
      <circle cx="100" cy="15" r="2" fill="#8B6E47" />
    </svg>
  );
}

export default function Hero() {
  const first = 'Jhossias';
  const amp = ' & ';
  const second = 'Domenica';

  return (
    <section className="hero texture-paper">
      <div className="section-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ScrollReveal direction="scale">
          <BranchDivider />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="hero__eyebrow">Nos casamos</p>
        </ScrollReveal>

        <h1 className="hero__names">
          <AnimatedWord text={first} startIndex={0} />
          <span className="hero__amp">&amp;</span>
          <AnimatedWord text={second} startIndex={first.length + amp.length} />
        </h1>

        <div className="hero__rule" />

        <ScrollReveal delay={0.2}>
          <p className="hero__date">03 · OCTUBRE · 2026</p>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <p className="hero__quote">
            Queremos invitarte a ser parte del día más importante y especial de nuestras vidas.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3} direction="scale">
          <img src="/logo.png" alt="Monograma JD" className="hero__logo" />
        </ScrollReveal>
      </div>
    </section>
  );
}
