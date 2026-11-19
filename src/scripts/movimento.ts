// Movimento condiviso: Lenis (scroll morbido) + GSAP ScrollTrigger.
// Con prefers-reduced-motion Lenis non si attiva.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export const riduci = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;
let pronto = false;

export function initMovimento() {
  if (!pronto) {
    gsap.registerPlugin(ScrollTrigger);
    pronto = true;
    if (!riduci()) {
      lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 0.9 });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis?.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }
  return { gsap, ScrollTrigger, lenis };
}

/** Scorre a un'ancora (#id) e sposta il focus lì. */
export function vaiA(hash: string) {
  const el = document.getElementById(decodeURIComponent(hash.replace(/^.*#/, '')));
  if (!el) return false;
  const offset = el.dataset.offset ? -window.innerHeight * Number(el.dataset.offset) : 0;
  if (lenis) lenis.scrollTo(el, { duration: 1.2, offset });
  else {
    const y = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top: y, behavior: riduci() ? 'auto' : 'smooth' });
  }
  if (!el.matches('a, button, input, [tabindex]')) el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
  el.dispatchEvent(new CustomEvent('arrivo', { bubbles: true }));
  history.replaceState(null, '', '#' + el.id);
  return true;
}
