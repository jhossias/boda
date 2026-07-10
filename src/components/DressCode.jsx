import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const COLORS = [
  { name: 'Champagne', fill: '#F5F0E8', border: '#D9CBB0' },
  { name: 'Ivory', fill: '#FDFDF5', border: '#E3DFC2' },
  { name: 'Sage', fill: '#B8C9B8', border: '#8FA68F' },
  { name: 'Tierra', fill: '#C4A882', border: '#9C7F58' },
  { name: 'Azul Pálido', fill: '#BAD0DF', border: '#8CAFC6' },
  { name: 'Rosa Polvo', fill: '#E8D4D4', border: '#C9A8A8' },
];

export default function DressCode() {
  return (
    <section className="section-pad" style={{ background: 'var(--cream)' }}>
      <ScrollReveal direction="scale">
        <div className="arch-card dresscode-card">
          <p className="dresscode__title">Dress Code</p>
          <p className="dresscode__sub eyebrow">Elegante de Día</p>
          <div className="dresscode__rule" />

          <div className="dresscode__row">
            <img
              src="/dress.png"
              alt=""
              aria-hidden="true"
              style={{ width: '120px', mixBlendMode: 'multiply' }}
            />

            <div className="palette">
              {COLORS.map((c) => (
                <div key={c.name} className="palette__item">
                  <motion.span
                    className="palette__swatch"
                    style={{ background: c.fill, border: `1.5px solid ${c.border}` }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  />
                  <span className="palette__name">{c.name}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="dresscode__note">Los tonos blancos están reservados para la novia.</p>
        </div>
      </ScrollReveal>
    </section>
  );
}
