import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import ScrollReveal from './ScrollReveal';

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScPoIEbTT75TWLIJKpL9D9gwezlf1sBkuZEEgpsAkVW1hQDkA/formResponse';
const GOOGLE_FORM_FIELDS = {
  nombre: 'entry.1578370436',
  apellido: 'entry.1073821882',
  asistentes: 'entry.690178692',
};

function sendToGoogleForm(form) {
  const body = new FormData();
  body.append(GOOGLE_FORM_FIELDS.nombre, form.nombre);
  body.append(GOOGLE_FORM_FIELDS.apellido, form.apellido);
  body.append(GOOGLE_FORM_FIELDS.asistentes, form.asistentes);

  // "no-cors" no permite leer la respuesta, pero Google Forms igual registra
  // el envío; no bloqueamos la confirmación visual si esto falla.
  return fetch(GOOGLE_FORM_URL, { method: 'POST', mode: 'no-cors', body }).catch(() => {});
}

function FloatField({ label, name, value, onChange }) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  return (
    <div className="float-field">
      <input
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required
        autoComplete={name === 'nombre' ? 'given-name' : 'family-name'}
      />
      <motion.label
        htmlFor={name}
        initial={false}
        animate={
          floated
            ? { top: -14, fontSize: 11, letterSpacing: '0.08em', color: 'var(--cafe)' }
            : { top: 8, fontSize: 20, letterSpacing: '0em', color: 'var(--muted)' }
        }
        transition={{ duration: 0.2 }}
        style={{ textTransform: floated ? 'uppercase' : 'none' }}
      >
        {label}
      </motion.label>
    </div>
  );
}

export default function Confirm() {
  const [form, setForm] = useState({ nombre: '', apellido: '', asistentes: '1' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existing = JSON.parse(localStorage.getItem('rsvp-domenica-jhossias') || '[]');
    existing.push({ ...form, fecha: new Date().toISOString() });
    localStorage.setItem('rsvp-domenica-jhossias', JSON.stringify(existing));

    sendToGoogleForm(form);

    setSubmitted(true);

    confetti({
      colors: ['#D4B896', '#8B6E47', '#FAF7F2'],
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  return (
    <section className="section-pad" style={{ background: 'var(--cream)' }}>
      <ScrollReveal direction="scale">
        <div className="arch-card confirm-card">
          <p className="confirm__title">RSVP</p>
          <p className="confirm__sub">Por favor, confirma tu asistencia antes del</p>
          <p className="confirm__deadline">31 de agosto del 2026.</p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                className="confirm-form"
                onSubmit={handleSubmit}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <FloatField label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} />
                <FloatField label="Apellido" name="apellido" value={form.apellido} onChange={handleChange} />

                <div className="float-field">
                  <select
                    id="asistentes"
                    name="asistentes"
                    value={form.asistentes}
                    onChange={handleChange}
                    required
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                  <label
                    htmlFor="asistentes"
                    style={{ top: -14, fontSize: 11, letterSpacing: '0.08em', color: 'var(--cafe)', textTransform: 'uppercase' }}
                  >
                    Número de asistentes
                  </label>
                </div>

                <motion.button
                  type="submit"
                  className="btn btn--solid btn--block"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Confirmar Asistencia
                </motion.button>
              </motion.form>
            ) : (
              <motion.p
                key="success"
                className="confirm__success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                ¡Gracias! Los esperamos con mucho amor 🤍
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </ScrollReveal>
    </section>
  );
}
