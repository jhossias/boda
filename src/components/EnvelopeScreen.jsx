import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Particles, ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

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

const initParticles = async (engine) => {
  await loadSlim(engine);
};

const particlesOptions = {
  fullScreen: { enable: false },
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  interactivity: {
    events: { onHover: { enable: false }, onClick: { enable: false }, resize: { enable: true } },
  },
  particles: {
    number: { value: 20 },
    color: { value: '#D4B896' },
    opacity: { value: 0.15 },
    size: { value: { min: 1, max: 2.5 } },
    move: {
      enable: true,
      speed: 0.25,
      direction: 'top',
      random: true,
      straight: false,
      outModes: { default: 'out' },
    },
    links: { enable: false },
  },
  detectRetina: true,
};

function MiniCountdown() {
  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mini-countdown">
      {UNITS.map((u, i) => (
        <div key={u.key} style={{ display: 'flex', alignItems: 'center' }}>
          <div className="mini-countdown__unit">
            <span className="mini-countdown__num">{String(remaining[u.key]).padStart(2, '0')}</span>
            <span className="mini-countdown__label">{u.label}</span>
          </div>
          {i < UNITS.length - 1 && <span className="mini-countdown__sep">:</span>}
        </div>
      ))}
    </div>
  );
}

function Envelope({ opening, onOpen }) {
  return (
    <div
      className="envelope"
      role="button"
      tabIndex={0}
      aria-label="Abrir invitación"
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="envelope__inner"
        animate={opening ? { y: 0 } : { y: [0, -12, 0] }}
        transition={
          opening
            ? { duration: 0.3 }
            : { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
        }
        whileHover={!opening ? { rotateY: 4, scale: 1.02 } : {}}
        style={{ transition: 'transform 0.3s ease' }}
      >
        <div className="envelope__body" />

        <AnimatePresence>
          {!opening && (
            <motion.div
              className="envelope__seal"
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src="/logo.jpg"
                alt="Monograma JD"
                style={{ width: 44, mixBlendMode: 'multiply', opacity: 0.85 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="envelope__flap"
          initial={{ rotateX: 0 }}
          animate={{ rotateX: opening ? -180 : 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
}

export default function EnvelopeScreen({ onOpen }) {
  const [opening, setOpening] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);

  const handleClick = () => {
    if (opening) return;
    setOpening(true);
    onOpen();
  };

  return (
    <section className="envelope-screen texture-linen">
      <div className="envelope-screen__particles">
        <ParticlesProvider init={initParticles}>
          <Particles id="tsparticles-envelope" options={particlesOptions} />
        </ParticlesProvider>
      </div>

      <AnimatePresence>
        {contentVisible && (
          <motion.div
            className="envelope-screen__content"
            initial={{ scale: 1, opacity: 1, y: 0 }}
            animate={
              opening
                ? { scale: 0.7, opacity: 0, y: 30 }
                : { scale: 1, opacity: 1, y: 0 }
            }
            transition={{ duration: 0.6, delay: opening ? 0.3 : 0 }}
            onAnimationComplete={() => {
              if (opening) setContentVisible(false);
            }}
          >
            <motion.img
              src="/logo.jpg"
              alt="Monograma JD"
              style={{
                width: 130,
                display: 'block',
                margin: '0 auto',
                mixBlendMode: 'screen',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />

            <p className="envelope-screen__gps">GUAYAQUIL · ECUADOR</p>

            <MiniCountdown />

            <Envelope opening={opening} onOpen={handleClick} />

            <motion.p
              className="envelope-hint"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Toca para abrir tu invitación
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
