// Il pilastro: rotazione = scroll (scrub) + rotazione lenta autonoma.
// La rotazione autonoma dura solo i primi 5 secondi (WCAG 2.2.2: sotto i 5 s non serve
// un pulsante di pausa); poi il pilastro gira solo con lo scroll. Si ferma anche a
// hover/focus, fuori schermo e con la scheda nascosta.
// Con prefers-reduced-motion non viene eseguito: il CSS mostra le card.
import { initMovimento, riduci } from './movimento';

const PASSO = 72; // 360 / 5 facce
const DURATA_AUTO = 5; // secondi di rotazione autonoma
const VEL_AUTO = PASSO / DURATA_AUTO; // una faccia esatta in 5 s

export function initPilastro() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero || riduci()) return;

  const scena = hero.querySelector<HTMLElement>('[data-scena]')!;
  const prisma = hero.querySelector<HTMLElement>('[data-prisma]')!;
  const facce = [...hero.querySelectorAll<HTMLElement>('[data-faccia]')];
  const categoria = hero.querySelector<HTMLElement>('[data-categoria]')!;
  const indice = [...hero.querySelectorAll<HTMLAnchorElement>('[data-indice]')];
  const nomi = facce.map((f) => f.querySelector('.faccia__titolo')?.textContent ?? '');

  const { gsap, ScrollTrigger } = initMovimento();

  let auto = 0;          // gradi accumulati dalla rotazione autonoma
  let scroll = 0;        // gradi dovuti allo scroll
  let theta = 0;         // angolo mostrato (inseguimento morbido)
  let tempoAuto = 0;     // secondi di rotazione autonoma già trascorsi
  let sospeso = false;   // hover / focus
  let visibile = true;
  let ultimo = performance.now();
  let frontale = -1;
  let raf = 0;

  // Scroll: l'hero resta fermo mentre il pilastro mostra tutte le facce.
  ScrollTrigger.create({
    trigger: hero,
    start: 'top top',
    end: () => '+=' + window.innerHeight * 1.6,
    pin: scena,
    scrub: true,
    onUpdate: (st) => { scroll = st.progress * PASSO * 4; avvia(); },
  });
  // Il nome gigante si schiarisce (si ritira) mentre il pilastro prende la scena.
  gsap.to(hero.querySelectorAll('[data-nome], [data-nome-contorno]'), {
    opacity: 0.2, ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: () => '+=' + window.innerHeight * 1.6, scrub: true },
  });

  function aggiornaFacce(t: number) {
    for (let i = 0; i < facce.length; i++) {
      const rel = ((((i * PASSO - t) % 360) + 540) % 360) - 180;
      const c = Math.cos((rel * Math.PI) / 180);
      facce[i].style.setProperty('--ombra', Math.min(0.88, Math.max(0, 0.82 * (1 - c))).toFixed(3));
      const link = facce[i].querySelector('a')!;
      // solo la faccia frontale si clicca; le facce sul retro escono anche dal tab
      link.style.pointerEvents = Math.abs(rel) < 36 ? 'auto' : 'none';
      facce[i].style.visibility = Math.abs(rel) < 100 ? 'visible' : 'hidden';
    }
    const k = ((Math.round(t / PASSO) % 5) + 5) % 5;
    if (k !== frontale) {
      frontale = k;
      categoria.textContent = nomi[k];
      indice.forEach((a, j) => (j === k ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
    }
  }

  function tick(ora: number) {
    const dt = Math.min(0.05, (ora - ultimo) / 1000);
    ultimo = ora;
    if (!sospeso && tempoAuto < DURATA_AUTO) {
      const passo = Math.min(dt, DURATA_AUTO - tempoAuto);
      tempoAuto += passo;
      auto += VEL_AUTO * passo;
      // alla fine si allinea sempre su una faccia intera
      if (tempoAuto >= DURATA_AUTO) auto = Math.round((auto + scroll) / PASSO) * PASSO - scroll;
    }
    const target = auto + scroll;
    theta += (target - theta) * Math.min(1, dt * 7);
    prisma.style.setProperty('--theta', theta.toFixed(3));
    aggiornaFacce(theta);
    const fermo = tempoAuto >= DURATA_AUTO && !sospeso && Math.abs(target - theta) < 0.01;
    raf = visibile && !document.hidden && !fermo ? requestAnimationFrame(tick) : 0;
  }
  function avvia() { if (!raf && visibile && !document.hidden) { ultimo = performance.now(); raf = requestAnimationFrame(tick); } }

  // Pausa fuori schermo
  new IntersectionObserver(([e]) => { visibile = e.isIntersecting; avvia(); }, { threshold: 0 }).observe(scena);
  document.addEventListener('visibilitychange', avvia);

  // Pausa a hover e focus; il focus porta la faccia davanti
  const pilastro = hero.querySelector<HTMLElement>('[data-pilastro]')!;
  pilastro.addEventListener('pointerenter', () => { sospeso = true; });
  pilastro.addEventListener('pointerleave', () => { sospeso = false; avvia(); });
  const portaDavanti = (i: number) => {
    const delta = ((((i * PASSO - (auto + scroll)) % 360) + 540) % 360) - 180;
    auto += delta;
    avvia();
  };
  facce.forEach((f, i) => {
    const a = f.querySelector('a')!;
    a.addEventListener('focus', () => { sospeso = true; portaDavanti(i); });
    a.addEventListener('blur', () => { sospeso = false; avvia(); });
  });
  indice.forEach((a, i) => {
    const su = () => { sospeso = true; portaDavanti(i); };
    const giu = () => { sospeso = false; avvia(); };
    a.addEventListener('pointerenter', su); a.addEventListener('focus', su);
    a.addEventListener('pointerleave', giu); a.addEventListener('blur', giu);
  });

  // Luce che segue il cursore (solo puntatori precisi)
  if (window.matchMedia('(pointer: fine)').matches) {
    scena.addEventListener('pointermove', (e) => {
      const r = pilastro.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      prisma.style.setProperty('--lx', `${Math.max(-40, Math.min(140, x))}%`);
      prisma.style.setProperty('--ly', `${Math.max(-30, Math.min(130, y))}%`);
    });
  }

  // Con il movimento attivo da tastiera si usa l'indice 01–05 (sempre visibile e completo):
  // le facce restano cliccabili col mouse ma escono dall'ordine di tabulazione.
  facce.forEach((f) => f.querySelector('a')!.setAttribute('tabindex', '-1'));

  aggiornaFacce(0);
  avvia();
}
