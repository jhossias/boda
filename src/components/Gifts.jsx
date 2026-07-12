import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

// TODO: reemplazar con los datos bancarios reales antes de compartir el link.
const BANK_NAME = 'Banco Pichincha';
const ACCOUNT_HOLDER = 'Domenica García';
const ACCOUNT_NUMBER = '0000000000';

function LineDiamond() {
  return (
    <svg viewBox="0 0 120 16" width="120" height="16" aria-hidden="true">
      <line x1="0" y1="8" x2="48" y2="8" stroke="#D4B896" strokeWidth="1" />
      <line x1="72" y1="8" x2="120" y2="8" stroke="#D4B896" strokeWidth="1" />
      <rect x="55.5" y="3.5" width="9" height="9" fill="#D4B896" transform="rotate(45 60 8)" />
    </svg>
  );
}

export default function Gifts() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ACCOUNT_NUMBER);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard no disponible; no bloquear la interacción
    }
  };

  return (
    <section className="gifts">
      <div className="section-inner gifts__inner">
        <ScrollReveal>
          <LineDiamond />
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <p className="eyebrow gifts__eyebrow">Regalos</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="gifts__text">
            Tu presencia es nuestro mejor regalo. Si deseas tener un detalle con nosotros,
            puedes hacerlo mediante transferencia bancaria.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15} direction="scale">
          <motion.div className="gifts__card" whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
            <svg viewBox="0 0 28 28" width="28" height="28" aria-hidden="true">
              <rect x="3" y="7" width="22" height="16" rx="2" fill="none" stroke="var(--cafe)" strokeWidth="1.4" />
              <path d="M3 9 L14 17 L25 9" fill="none" stroke="var(--cafe)" strokeWidth="1.4" />
              <circle cx="14" cy="14" r="3.2" fill="none" stroke="var(--cafe)" strokeWidth="1.2" />
            </svg>
            <p className="gifts__card-title">{BANK_NAME}</p>
            <p className="gifts__card-account">{ACCOUNT_NUMBER}</p>
            <p className="gifts__card-sub">{ACCOUNT_HOLDER}</p>

            <div className="gifts__copy-row">
              <button type="button" className="gifts__copy-btn" onClick={handleCopy}>
                Copiar número
              </button>
              {copied && <span className="gifts__copy-feedback">Copiado</span>}
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
