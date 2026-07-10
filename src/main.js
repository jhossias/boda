import './style.css';

/* =========================================================
   Cursor personalizado (solo desktop)
   ========================================================= */
const cursorDot = document.getElementById('cursorDot');
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  window.addEventListener('mousemove', (e) => {
    cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    cursorDot.classList.add('is-visible');
  });
  document.addEventListener('mousedown', () => cursorDot.classList.add('is-active'));
  document.addEventListener('mouseup', () => cursorDot.classList.remove('is-active'));
}

/* =========================================================
   Scroll reveal — IntersectionObserver
   ========================================================= */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 90}ms`;
  revealObserver.observe(el);
});

/* Itinerario: aparición escalonada (stagger) */
const timelineItems = document.querySelectorAll('.timeline-item');
if (timelineItems.length) {
  const timelineObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          timelineItems.forEach((item, i) => {
            setTimeout(() => item.classList.add('is-visible'), i * 160);
          });
          obs.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );
  timelineObserver.observe(document.querySelector('.timeline'));
}

/* =========================================================
   Sobre — apertura + audio
   ========================================================= */
const envelope = document.getElementById('envelope');
const cover = document.getElementById('cover');
const invitation = document.getElementById('invitation');
const audio = document.getElementById('audio');
const player = document.getElementById('player');

function openInvitation() {
  if (envelope.classList.contains('is-open')) return;
  envelope.classList.add('is-open');

  audio.play().catch(() => {
    /* el navegador puede bloquear autoplay hasta la interacción; el clic ya cuenta como una */
  });

  setTimeout(() => {
    cover.classList.add('is-hidden');
    invitation.classList.add('is-visible');
    player.hidden = false;
    requestAnimationFrame(() => player.classList.add('is-visible'));
  }, 750);
}

envelope.addEventListener('click', openInvitation);
envelope.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    openInvitation();
  }
});

/* =========================================================
   Reproductor de música
   ========================================================= */
const playerToggle = document.getElementById('playerToggle');
const playerPrev = document.getElementById('playerPrev');
const playerNext = document.getElementById('playerNext');
const playerBar = document.getElementById('playerBar');
const playerBarFill = document.getElementById('playerBarFill');

playerToggle.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().catch(() => {});
  } else {
    audio.pause();
  }
});

playerPrev.addEventListener('click', () => {
  audio.currentTime = Math.max(0, audio.currentTime - 10);
});

playerNext.addEventListener('click', () => {
  audio.currentTime = Math.min(audio.duration || audio.currentTime + 10, audio.currentTime + 10);
});

audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  playerBarFill.style.width = `${pct}%`;
});

playerBar.addEventListener('click', (e) => {
  const rect = playerBar.getBoundingClientRect();
  const ratio = (e.clientX - rect.left) / rect.width;
  if (audio.duration) audio.currentTime = ratio * audio.duration;
});

/* El reproductor permanece siempre visible una vez que la invitación se abrió (position: fixed) */

/* =========================================================
   Guardar en calendario — generador de .ics
   ========================================================= */
document.getElementById('addToCalendar').addEventListener('click', () => {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Domenica & Jhossias//Boda//ES',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'UID:domenica-jhossias-2026@boda',
    'SUMMARY:Matrimonio de Domenica y Jhossias',
    'DTSTART;TZID=America/Guayaquil:20261003T103000',
    'DTEND;TZID=America/Guayaquil:20261003T180000',
    'LOCATION:Guayaquil, Ecuador',
    'DESCRIPTION:¡Nos casamos! Te esperamos con mucho amor.',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'boda-domenica-y-jhossias.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
});

/* =========================================================
   Countdown con animación flip
   ========================================================= */
const WEDDING_DATE = new Date('2026-10-03T10:30:00-05:00').getTime();

const flipValues = {
  days: document.querySelector('[data-unit="days"] .flip-value'),
  hours: document.querySelector('[data-unit="hours"] .flip-value'),
  minutes: document.querySelector('[data-unit="minutes"] .flip-value'),
  seconds: document.querySelector('[data-unit="seconds"] .flip-value'),
};

const flipCards = {
  days: document.querySelector('[data-unit="days"]'),
  hours: document.querySelector('[data-unit="hours"]'),
  minutes: document.querySelector('[data-unit="minutes"]'),
  seconds: document.querySelector('[data-unit="seconds"]'),
};

let lastCountdown = { days: null, hours: null, minutes: null, seconds: null };

function updateCountdown() {
  const now = Date.now();
  const diff = Math.max(0, WEDDING_DATE - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const next = { days, hours, minutes, seconds };

  Object.keys(next).forEach((unit) => {
    const padded = String(next[unit]).padStart(2, '0');
    if (lastCountdown[unit] !== next[unit]) {
      flipValues[unit].textContent = padded;
      flipCards[unit].classList.remove('is-flipping');
      // reflow para reiniciar la animación
      void flipCards[unit].offsetWidth;
      flipCards[unit].classList.add('is-flipping');
      lastCountdown[unit] = next[unit];
    }
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* =========================================================
   RSVP — formulario + confetti
   ========================================================= */
const rsvpForm = document.getElementById('rsvpForm');
const rsvpSuccess = document.getElementById('rsvpSuccess');

rsvpForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = {
    nombre: rsvpForm.nombre.value.trim(),
    apellido: rsvpForm.apellido.value.trim(),
    asistentes: rsvpForm.asistentes.value,
    fecha: new Date().toISOString(),
  };

  const existing = JSON.parse(localStorage.getItem('rsvp-domenica-jhossias') || '[]');
  existing.push(data);
  localStorage.setItem('rsvp-domenica-jhossias', JSON.stringify(existing));

  rsvpForm.hidden = true;
  rsvpSuccess.hidden = false;
  requestAnimationFrame(() => rsvpSuccess.classList.add('is-visible'));

  launchConfetti();
});

function launchConfetti() {
  const colors = ['#8B6E47', '#D4B896', '#6B5235', '#FAF7F2'];
  const count = 60;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;

    const duration = 2.5 + Math.random() * 2;
    const drift = (Math.random() - 0.5) * 200;

    piece.animate(
      [
        { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${drift}px, 100vh) rotate(${360 + Math.random() * 360}deg)`, opacity: 0.9 },
      ],
      { duration: duration * 1000, easing: 'cubic-bezier(0.22,1,0.36,1)' }
    );

    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), duration * 1000);
  }
}
