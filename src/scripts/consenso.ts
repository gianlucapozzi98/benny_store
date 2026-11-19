// Consenso cookie secondo le Linee guida del Garante (10 giugno 2021).
// - Nessuno script di terze parti prima del consenso.
// - La scelta (anche il rifiuto) si conserva 6 mesi, poi si richiede.
// - La scelta stessa è salvata in localStorage: è uno strumento tecnico, non serve consenso.
export type Consenso = { mappe: boolean; statistiche: boolean; data: string };

const CHIAVE = 'bs-consenso';
const SEI_MESI = 1000 * 60 * 60 * 24 * 182;

export function leggiConsenso(): Consenso | null {
  try {
    const c = JSON.parse(localStorage.getItem(CHIAVE) ?? 'null') as Consenso | null;
    if (!c || Date.now() - Date.parse(c.data) > SEI_MESI) return null;
    return c;
  } catch {
    return null;
  }
}

export function salvaConsenso(scelta: Omit<Consenso, 'data'>) {
  const c: Consenso = { ...scelta, data: new Date().toISOString() };
  try { localStorage.setItem(CHIAVE, JSON.stringify(c)); } catch { /* modalità privata */ }
  document.dispatchEvent(new CustomEvent<Consenso>('consenso', { detail: c }));
  return c;
}
