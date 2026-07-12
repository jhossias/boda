import ScrollReveal from './ScrollReveal';

export default function DressCode() {
  return (
    <section className="section-pad dresscode">
      <ScrollReveal direction="scale">
        <div className="arch-card dresscode-card">
          <p className="eyebrow dresscode__sub">Código de Vestimenta</p>
          <p className="dresscode__title">Elegante de Día</p>
          <div className="dresscode__rule" />

          <img
            src="/dress.png"
            alt=""
            aria-hidden="true"
            className="dresscode__illustration"
            width={778}
            height={1024}
            loading="lazy"
          />

          <p className="dresscode__note">
            Los tonos blancos, marfil y similares están reservados para la novia.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
