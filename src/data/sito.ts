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

/** Allestimento di Natale: neve e lucine nella sala, cartellini "Idea regalo", testi delle feste.
 *  Mettere `false` dopo l'Epifania (e rifare il push): il sito torna com'era, la struttura non cambia. */
export const natale = true;

/** Il titolare, per la sezione "Chi sono". */
export const titolare = {
  // DA CHIEDERE: finché è null il nome non compare
  nome: null as string | null,
  /** I paragrafi della sua storia, in prima persona.
   *  PROVVISORI: scritti da noi, generici e senza fatti inventati (niente date, luoghi, nomi).
   *  Da sostituire con la storia vera quando il titolare la fornisce. */
  storia: [
    'Benny Store è il mio negozio e la mia galleria. Le opere che vedi su queste pareti le ho scelte una per una: grafiche firmate, pop art, classici in cornice dorata, pezzi materici da guardare da vicino.',
    "Credo che un quadro non debba stare per forza in un museo. Può stare nel tuo soggiorno, in ufficio, o diventare il regalo che nessuno si aspetta. Per questo accanto all'arte trovi anche abbigliamento, oggettistica e idee regalo.",
    'Passa a trovarmi: ti racconto tutto quello che so di ogni opera, e se cerchi qualcosa di preciso lo cerchiamo insieme.',
  ] as string[] | null,
};

export const mapsHref =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('Via delle Betulle 1/3, Cesano Boscone MI');

/** Link mailto con oggetto e testo precompilati (il messaggio parte solo se lo invia l'utente). */
export const mailto = (oggetto: string, testo: string) =>
  `mailto:${negozio.email}?subject=${encodeURIComponent(oggetto)}&body=${encodeURIComponent(testo)}`;
