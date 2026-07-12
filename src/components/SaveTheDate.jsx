import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

function downloadIcs() {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Domenica & Jhossias//Boda//ES',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'UID:domenica-jhossias-2026@boda',
    'SUMMARY:Matrimonio de Domenica y Jhossias',
    'DTSTART:20261003T153000Z',
    'DTEND:20261003T230000Z',
    'LOCATION:Guayaquil, Ecuador',
    'DESCRIPTION:¡Nos casamos! Te esperamos con mucho amor.',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'boda-domenica-y-jhossias.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function SaveTheDate() {
  return (
    <section className="section-pad" style={{ background: 'var(--cream)' }}>
      <ScrollReveal direction="scale">
        <div className="arch-card std-card">
          <motion.div
            className="std-icon"
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <svg viewBox="0 0 48 48" width="32" height="32" style={{ margin: '0 auto' }}>
              <rect x="6" y="10" width="36" height="32" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="6" y1="18" x2="42" y2="18" stroke="currentColor" strokeWidth="2" />
              <line x1="14" y1="6" x2="14" y2="14" stroke="currentColor" strokeWidth="2" />
              <line x1="34" y1="6" x2="34" y2="14" stroke="currentColor" strokeWidth="2" />
              <circle cx="16" cy="27" r="1.8" fill="currentColor" />
              <circle cx="24" cy="27" r="1.8" fill="currentColor" />
              <circle cx="32" cy="27" r="1.8" fill="currentColor" />
              <circle cx="16" cy="35" r="1.8" fill="currentColor" />
              <circle cx="24" cy="35" r="1.8" fill="currentColor" />
            </svg>
          </motion.div>

          <p className="eyebrow std-eyebrow">Guarda esta fecha</p>
          <p className="std-title">Para no olvidar el día más importante</p>
          <p className="std-date">03 · 10 · 2026</p>

          <motion.button
            type="button"
            className="btn btn--outline-dark btn--block"
            onClick={downloadIcs}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Añadir al Calendario
          </motion.button>
        </div>
      </ScrollReveal>
    </section>
  );
}
