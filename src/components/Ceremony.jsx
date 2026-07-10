import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

export default function Ceremony() {
  return (
    <section className="ceremony texture-linen">
      <div className="section-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <ScrollReveal>
          <p className="ceremony__eyebrow">Celebra con nosotros</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} direction="scale">
          <div className="ceremony__date-block">
            <span className="ceremony__month">Octubre</span>
            <div className="ceremony__day-row">
              <span className="ceremony__weekday">Sábado</span>
              <span className="ceremony__hr" />
              <span className="ceremony__num">03</span>
              <span className="ceremony__hr" />
              <span className="ceremony__year">2026</span>
            </div>
          </div>
        </ScrollReveal>

        <motion.img
          src="/iglesia.jpg"
          alt=""
          aria-hidden="true"
          className="ceremony__church-img"
          style={{ mixBlendMode: 'screen' }}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />

        <ScrollReveal>
          <p className="ceremony__place">Iglesia Nuestra Señora de Fátima</p>
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <p className="ceremony__address">Av. González Suárez 1200, Guayaquil</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="ceremony__time">10:30 A.M.</p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <motion.a
            href="https://maps.google.com/?q=Iglesia+Nuestra+Se%C3%B1ora+de+F%C3%A1tima+Guayaquil"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-cream"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Ver en Mapa
          </motion.a>
        </ScrollReveal>
      </div>
    </section>
  );
}
