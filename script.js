/* =====================================================
   INVITACION DIGITAL — JavaScript
   - Cuenta regresiva
   - Animaciones scroll
   - WhatsApp link dinámico
   ===================================================== */

// ── CONFIGURACION ────────────────────────────────────
const CONFIG = {
  // Cambia esta fecha por la fecha y hora real del evento
  // Formato: 'YYYY-MM-DDTHH:MM:00' en hora local del evento
  fechaEvento: '2026-08-22T15:30:00',
};

// ── CUENTA REGRESIVA ─────────────────────────────────
function initCountdown() {
  const targetDate = new Date(CONFIG.fechaEvento).getTime();

  const elDias = document.getElementById('cd-dias');
  const elHoras = document.getElementById('cd-horas');
  const elMinutos = document.getElementById('cd-minutos');
  const elSegundos = document.getElementById('cd-segundos');

  if (!elDias) return;

  function pad(n) {
    return String(Math.max(0, n)).padStart(2, '0');
  }

  function bump(el) {
    el.classList.remove('bump');
    void el.offsetWidth; // reflow para reiniciar animacion
    el.classList.add('bump');
  }

  let prevSeg = null;

  function update() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      // La fecha ya llego
      elDias.textContent = '00';
      elHoras.textContent = '00';
      elMinutos.textContent = '00';
      elSegundos.textContent = '00';

      const sub = document.querySelector('.countdown-sub');
      if (sub) sub.textContent = '¡El momento llegó! 🌸';
      return;
    }

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diff % (1000 * 60)) / 1000);

    elDias.textContent = pad(dias);
    elHoras.textContent = pad(horas);
    elMinutos.textContent = pad(minutos);

    const segStr = pad(segundos);
    elSegundos.textContent = segStr;

    if (prevSeg !== segStr) {
      bump(elSegundos);
      if (segundos === 0) bump(elMinutos);
      prevSeg = segStr;
    }
  }

  update();
  setInterval(update, 1000);
}

// ── ANIMACIONES SCROLL (Intersection Observer) ────────
function initReveal() {
  const sections = document.querySelectorAll('.section, .info-card, .gift-card, .footer');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  sections.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.04}s`;
    observer.observe(el);
  });
}

// ── MICRO-ANIMACION DEL NUMERO 25 ─────────────────────
function initHeroEntrance() {
  const numero = document.querySelector('.numero');
  if (!numero) return;

  // Aparece con un suave scale desde 0.9
  numero.style.transition = 'opacity 1s ease, transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
  numero.style.opacity = '0';
  numero.style.transform = 'scale(0.88)';

  setTimeout(() => {
    numero.style.opacity = '1';
    numero.style.transform = 'scale(1)';
  }, 100);
}

// ── SCROLL SUAVE A SECCIONES ──────────────────────────
function initSmoothNav() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ── INIT ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initReveal();
  initHeroEntrance();
  initSmoothNav();
});
