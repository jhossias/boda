import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const WEDDING_DATE = new Date('2026-10-03T10:30:00-05:00').getTime();

function getRemaining() {
  const diff = Math.max(0, WEDDING_DATE - Date.now());
  return {
    dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diff / (1000 * 60)) % 60),
    segundos: Math.floor((diff / 1000) % 60),
  };
}

const UNITS = [
  { key: 'dias', label: 'Días' },
  { key: 'horas', label: 'Horas' },
  { key: 'minutos', label: 'Minutos' },
  { key: 'segundos', label: 'Segundos' },
];

function CountUnit({ value, label }) {
  return (
    <div className="countdown-big__unit">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          className="countdown-big__num"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>
      <div className="countdown-big__rule" />
      <span className="countdown-big__label">{label}</span>
    </div>
  );
}

export default function Countdown() {
  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="countdown-big texture-linen">
      <img
        src="/logo.png"
        alt=""
        aria-hidden="true"
        className="countdown-big__watermark"
        width={1024}
        height={1024}
        loading="lazy"
      />

      <div className="section-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <motion.p
          className="countdown-big__title"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          ¡Prepárate!
        </motion.p>

        <ScrollReveal delay={0.1}>
          <p className="eyebrow eyebrow--light countdown-big__sub">Nos vemos dentro de</p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="countdown-big__row">
            {UNITS.map((u, i) => (
              <div key={u.key} style={{ display: 'flex' }}>
                <CountUnit value={remaining[u.key]} label={u.label} />
                {i < UNITS.length - 1 && <span className="countdown-big__sep">:</span>}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
