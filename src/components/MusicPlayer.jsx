import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Icon({ children, size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      {children}
    </svg>
  );
}

export default function MusicPlayer({ envelopeOpened, audioRef }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, [audioRef]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  };

  const seek = (delta) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, audio.currentTime + delta);
  };

  const handleBarClick = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
  };

  return (
    <>
      <audio ref={audioRef} src="/iris.mp3" preload="none" loop />

      <AnimatePresence>
        {envelopeOpened && (
          <motion.div
            className="player"
            style={{ transform: 'translateX(-50%)' }}
            initial={{ opacity: 0, y: 40, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 40, x: '-50%' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <button type="button" className="player__btn" onClick={() => seek(-10)} aria-label="Retroceder 10 segundos">
              <Icon size={16}>
                <path d="M17 5 L8 12 L17 19 Z" />
                <rect x="5" y="5" width="2" height="14" />
              </Icon>
            </button>

            <button type="button" className="player__btn" onClick={togglePlay} aria-label="Reproducir o pausar">
              {isPlaying ? (
                <Icon>
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </Icon>
              ) : (
                <Icon>
                  <path d="M7 4 L20 12 L7 20 Z" />
                </Icon>
              )}
            </button>

            <button type="button" className="player__btn" onClick={() => seek(10)} aria-label="Adelantar 10 segundos">
              <Icon size={16}>
                <path d="M7 5 L16 12 L7 19 Z" />
                <rect x="17" y="5" width="2" height="14" />
              </Icon>
            </button>

            <div className="player__body">
              <span className="player__title">
                <motion.svg
                  viewBox="0 0 24 24"
                  width={11}
                  height={11}
                  fill="var(--gold)"
                  animate={isPlaying ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                  transition={isPlaying ? { duration: 0.8, repeat: Infinity, ease: 'easeInOut' } : {}}
                >
                  <circle cx="7" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                  <path d="M10 18 L10 5 L21 3 L21 16" fill="none" stroke="var(--gold)" strokeWidth="1.6" />
                </motion.svg>
                Iris · Goo Goo Dolls
              </span>

              <div className="player__bar" onClick={handleBarClick}>
                <div className="player__bar-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
