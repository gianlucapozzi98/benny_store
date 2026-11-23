// Comportamenti comuni a tutte le pagine.
import { initMovimento, riduci, vaiA } from './movimento';

initMovimento();

// Ancore interne con scroll morbido (anche "/#id" quando siamo già in home)
document.addEventListener('click', (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
  const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
  if (!a) return;
  const url = new URL(a.href, location.href);
  if (url.pathname !== location.pathname || !url.hash || url.hash === '#') return;
  if (vaiA(url.hash)) e.preventDefault();
});

// Arrivo da un'altra pagina con "/#sezione": si scorre lì e si toglie subito il # dall'indirizzo
if (location.hash.length > 1) {
  const destinazione = location.hash;
  history.replaceState(null, '', location.pathname + location.search);
  window.addEventListener('load', () => setTimeout(() => vaiA(destinazione), 60), { once: true });
}
// # aggiunto a mano o da un link esterno sulla stessa pagina: stessa cosa
window.addEventListener('hashchange', () => {
  if (location.hash.length > 1 && !vaiA(location.hash, true)) history.replaceState(null, '', location.pathname + location.search);
});

// Comparsa morbida delle sezioni (una sola curva per tutto il sito)
const svela = document.querySelectorAll<HTMLElement>('[data-svela]');
if (!riduci() && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (voci) => voci.forEach((v) => {
      if (v.isIntersecting) { v.target.classList.add('svelato'); io.unobserve(v.target); }
    }),
    { rootMargin: '0px 0px -12% 0px' },
  );
  svela.forEach((el) => io.observe(el));
} else {
  svela.forEach((el) => el.classList.add('svelato'));
}

// Cursore personalizzato: solo desktop con puntatore preciso, mai con reduced motion.
// Il cursore di sistema resta visibile (accessibilità).
if (window.matchMedia('(pointer: fine) and (hover: hover)').matches && !riduci()) {
  const c = document.createElement('div');
  c.className = 'cursore';
  c.setAttribute('aria-hidden', 'true');
  const parola = document.createElement('span');
  c.append(parola);
  document.body.append(c);
  let x = -100, y = -100, cx = -100, cy = -100, raf = 0;
  // il loop gira solo finché il cursore si muove, poi si ferma
  const loop = () => {
    cx += (x - cx) * 0.25; cy += (y - cy) * 0.25;
    c.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.3 ? requestAnimationFrame(loop) : 0;
  };
  window.addEventListener('pointermove', (e) => {
    x = e.clientX; y = e.clientY;
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });
  document.addEventListener('pointerover', (e) => {
    const t = e.target as HTMLElement;
    // sulle opere il cursore diventa un cerchio con una parola ("Guarda")
    const conTesto = t.closest<HTMLElement>('[data-cursore]');
    if (conTesto) parola.textContent = conTesto.dataset.cursore ?? '';
    c.classList.toggle('cursore--testo', !!conTesto);
    c.classList.toggle('cursore--attivo', !conTesto && !!t.closest('a, button, label, [role="button"]'));
  });
  document.documentElement.addEventListener('pointerleave', () => { x = y = -100; if (!raf) raf = requestAnimationFrame(loop); });
}
