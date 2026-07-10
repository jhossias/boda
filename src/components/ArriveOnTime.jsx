import ScrollReveal from './ScrollReveal';

export default function ArriveOnTime() {
  return (
    <section className="section-pad" style={{ background: 'var(--cream)' }}>
      <ScrollReveal direction="scale">
        <div className="arrive-card">
          <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
            <circle cx="16" cy="16" r="12" fill="none" stroke="#3D2B1A" strokeWidth="1.4" />
            <line x1="16" y1="16" x2="16" y2="9" stroke="#3D2B1A" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="16" y1="16" x2="21" y2="18" stroke="#3D2B1A" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="16" cy="16" r="1.4" fill="#3D2B1A" />
          </svg>

          <p className="arrive-card__title">Llega a Tiempo</p>

          <p className="arrive-card__text">
            Asegúrate de llegar a tiempo, queremos que todos podamos disfrutar del evento desde
            el comienzo.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
