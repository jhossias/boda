import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor">
      <path d="M7 4 L20 12 L7 20 Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

export default function MusicPlayer({ envelopeOpened, audioRef }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, [audioRef]);

  useEffect(() => {
    if (!envelopeOpened) return;
    setShowTooltip(true);
    const timer = setTimeout(() => setShowTooltip(false), 3500);
    return () => clearTimeout(timer);
  }, [envelopeOpened]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  };

  return (
    <>
      <audio ref={audioRef} src="/iris.mp3" preload="none" loop />

      <AnimatePresence>
        {envelopeOpened && (
          <>
            <motion.button
              type="button"
              className="player-fab"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </motion.button>

            <AnimatePresence>
              {showTooltip && (
                <motion.span
                  className="player-fab__tooltip"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  Iris · Goo Goo Dolls
                </motion.span>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
