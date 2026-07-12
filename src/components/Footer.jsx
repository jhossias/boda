export default function Footer() {
  return (
    <footer className="footer">
      <img
        src="/logo.png"
        alt="Monograma JD"
        className="footer__logo"
        width={1024}
        height={1024}
        loading="lazy"
      />
      <p className="footer__thanks">Gracias por ser parte de nuestra historia.</p>
      <p className="footer__names">Domenica &amp; Jhossias</p>
      <p className="footer__date">03 · 10 · 2026</p>
    </footer>
  );
}
