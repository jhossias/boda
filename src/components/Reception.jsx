import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

export default function Reception() {
  return (
    <ScrollReveal direction="scale" delay={0.1}>
      <div className="venue-card venue-card--offset">
        <div className="venue-card__medallion">
          <motion.img
            src="/pareja.png"
            alt=""
            aria-hidden="true"
            width={765}
            height={771}
            loading="lazy"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>

        <p className="eyebrow">Recepción</p>
        <p className="venue-card__place venue-card__place--lg">Restaurante Jaleo</p>
        <p className="venue-card__address">Hotel Tryp By Wyndham</p>
        <p className="venue-card__time">12:00 P.M.</p>

        <motion.a
          href="https://www.google.com/maps/place/Restaurante+Jaleo/data=!4m2!3m1!1s0x0:0x60c8ae3758fa52e7"
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
