import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Particles, ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

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
    color: { value: '#8B6E47' },
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

function AmbientParticles() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <div className="envelope-screen__particles">
      <ParticlesProvider init={initParticles}>
        <Particles id="tsparticles-envelope" options={particlesOptions} />
      </ParticlesProvider>
    </div>
  );
}

function Envelope({ opening, onOpen }) {
  const reduceMotion = useReducedMotion();

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
        animate={opening || reduceMotion ? { y: 0 } : { y: [0, -12, 0] }}
        transition={
          opening || reduceMotion
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
                src="/logo.png"
                alt=""
                style={{
                  width: '48px',
                  height: 'auto',
                  mixBlendMode: 'multiply',
                  opacity: 0.9,
                  display: 'block',
                  margin: '0 auto',
                }}
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
    <section className="envelope-screen texture-paper">
      <AmbientParticles />

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
              src="/logo.png"
              alt="Monograma JD"
              width={180}
              height={180}
              style={{
                width: 180,
                height: 'auto',
                display: 'block',
                margin: '0 auto',
                mixBlendMode: 'multiply',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />

            <p className="envelope-screen__gps">GUAYAQUIL · ECUADOR</p>
            <p className="envelope-screen__date">03 · 10 · 2026</p>

            <Envelope opening={opening} onOpen={handleClick} />

            <button type="button" className="btn btn--solid envelope-open-btn" onClick={handleClick}>
              Abrir invitación
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
