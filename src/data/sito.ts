// Unica fonte dei dati del negozio. Tutto ciò che è qui è verificato
// (biglietto da visita + parole del titolare). I valori `null` sono DA CHIEDERE:
// il sito mostra un segnaposto evidente finché restano null.

export const negozio = {
  nome: 'Benny Store',
  qualifica: 'Arte & Abbigliamento',
  motto: ['Le idee migliori per sorprendere.', 'Gli oggetti unici che volevi.'],
  telefono: { vista: '+39 350 133 0118', href: 'tel:+393501330118' },
  email: 'g.bennystore1@gmail.com',
  indirizzo: { via: 'Via delle Betulle 1/3', citta: 'Cesano Boscone', provincia: 'MI', cap: null as string | null },
  piva: '14931470968',
  // DA CHIEDERE
  ragioneSociale: null as string | null,
  codiceFiscale: null as string | null,
  rea: null as string | null,
  pec: null as string | null,
  orari: null as null | Record<string, string>,
  whatsapp: null as boolean | null,
  instagram: null as string | null,
} as const;

/** Il titolare. Nome e storia li fornirà il cliente: finché sono null il sito mostra un segnaposto. */
export const titolare = {
  // DA CHIEDERE
  nome: null as string | null,
  /** I paragrafi della sua storia, in ordine. */
  storia: null as string[] | null,
};

export const mapsHref =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('Via delle Betulle 1/3, Cesano Boscone MI');

/** Link mailto con oggetto e testo precompilati (il messaggio parte solo se lo invia l'utente). */
export const mailto = (oggetto: string, testo: string) =>
  `mailto:${negozio.email}?subject=${encodeURIComponent(oggetto)}&body=${encodeURIComponent(testo)}`;
