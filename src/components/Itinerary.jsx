import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const EVENTS = [
  { img: '/it-ceremonia.png', time: '10:30 A.M.', label: 'Ceremonia Religiosa' },
  { img: '/it-llegada.png', time: '12:00 P.M.', label: 'Llegada a Recepción' },
  { img: '/it-coctel.png', time: '12:45 P.M.', label: 'Cóctel de Bienvenida' },
  { img: '/it-almuerzo.png', time: '1:00 P.M.', label: 'Almuerzo' },
  { img: '/it-cocktail.png', time: '2:00 P.M.', label: 'Cocktail Hour' },
];

export default function Itinerary() {
  const [showHint, setShowHint] = useState(true);
  const trackRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="itinerary">
      <ScrollReveal>
        <h2 className="itinerary__title">Itinerario</h2>
      </ScrollReveal>

      <p className="itinerary__hint" style={{ opacity: showHint ? 1 : 0 }}>
        ← desliza →
      </p>

      <div
        className="itinerary__track"
        ref={trackRef}
        onScroll={() => setShowHint(false)}
      >
        {EVENTS.map((ev, i) => (
          <motion.div
            key={ev.label}
            className="itinerary__item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.15, ease: 'easeOut' }}
          >
            <img src={ev.img} alt={ev.label} className="itinerary__icon" />
            <div className="itinerary__line" />
            <div className="itinerary__dot" />
            <div className="itinerary__line" />
            <span className="itinerary__time">{ev.time}</span>
            <span className="itinerary__label">{ev.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
