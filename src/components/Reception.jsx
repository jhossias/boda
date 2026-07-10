import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

export default function Reception() {
  return (
    <section className="reception">
      <motion.img
        src="/pareja.png"
        alt=""
        aria-hidden="true"
        style={{
          width: '200px',
          display: 'block',
          margin: '0 auto 24px',
          mixBlendMode: 'multiply',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      <ScrollReveal>
        <p className="reception__eyebrow">Recepción</p>
      </ScrollReveal>

      <ScrollReveal delay={0.1} direction="scale">
        <p className="reception__name">Jaleo</p>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <p className="reception__address">Km 6.5 Vía a Samborondón, Guayaquil</p>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <p className="reception__time">12:00 P.M.</p>
      </ScrollReveal>

      <ScrollReveal delay={0.25}>
        <motion.a
          href="https://www.google.com/maps/place/Restaurante+Jaleo/data=!4m2!3m1!1s0x0:0x60c8ae3758fa52e7"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-solid-cafe"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Ver Ubicación
        </motion.a>
      </ScrollReveal>
    </section>
  );
}
