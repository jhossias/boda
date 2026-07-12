import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

export default function Ceremony() {
  return (
    <ScrollReveal direction="scale">
      <div className="venue-card">
        <div className="venue-card__medallion">
          <motion.img
            src="/iglesia.jpg"
            alt=""
            aria-hidden="true"
            width={1536}
            height={1024}
            loading="lazy"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </div>

        <p className="eyebrow">Celebra con nosotros</p>

        <div className="venue-card__date-block">
          <span className="venue-card__month">Octubre</span>
          <div className="venue-card__day-row">
            <span className="venue-card__weekday">Sábado</span>
            <span className="venue-card__hr" />
            <span className="venue-card__num">03</span>
            <span className="venue-card__hr" />
            <span className="venue-card__year">2026</span>
          </div>
        </div>

        <p className="venue-card__place">Iglesia Nuestra Señora de Fátima</p>
        <p className="venue-card__address">Av. González Suárez 1200, Guayaquil</p>
        <p className="venue-card__time">10:30 A.M.</p>

        <motion.a
          href="https://maps.google.com/?q=Iglesia+Nuestra+Se%C3%B1ora+de+F%C3%A1tima+Guayaquil"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--solid"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Ver Ubicación
        </motion.a>
      </div>
    </ScrollReveal>
  );
}
