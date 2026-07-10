import ScrollReveal from './ScrollReveal';

function LineDiamond() {
  return (
    <svg viewBox="0 0 120 16" width="120" height="16" aria-hidden="true">
      <line x1="0" y1="8" x2="48" y2="8" stroke="#D4B896" strokeWidth="1" />
      <line x1="72" y1="8" x2="120" y2="8" stroke="#D4B896" strokeWidth="1" />
      <rect x="55.5" y="3.5" width="9" height="9" fill="#D4B896" transform="rotate(45 60 8)" />
    </svg>
  );
}

export default function PersonalNote() {
  return (
    <section className="personal-note texture-paper">
      <div className="section-inner personal-note__inner">
        <ScrollReveal duration={1} direction="up">
          <LineDiamond />
        </ScrollReveal>

        <ScrollReveal duration={1} delay={0.1}>
          <p className="personal-note__text">
            Hace cinco años comenzamos a escribir nuestra historia como esposos. Hoy queremos
            dar gracias a Dios y recibir su bendición para seguir caminando juntos. Nada nos
            haría más felices que compartir este momento con quienes han sido parte de nuestro
            camino.
          </p>
        </ScrollReveal>

        <ScrollReveal duration={1} delay={0.2}>
          <LineDiamond />
        </ScrollReveal>
      </div>
    </section>
  );
}
