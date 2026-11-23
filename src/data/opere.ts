// Le opere della galleria. Le immagini sono i quadri ritagliati e raddrizzati dalle foto originali
// (scripts/ritaglia-opere.mjs → src/assets/opere). I colori vengono dallo stesso script.
//
// I titoli sono DESCRITTIVI, scelti da noi per riconoscere le opere: non sono i titoli d'autore.
// Artista, titolo vero, tecnica esatta, misure, anno, tiratura e prezzo NON sono qui: il cliente
// non li ha forniti. Le firme e le numerazioni visibili restano nelle immagini, non vengono trascritte.
import type { ImageMetadata } from 'astro';
import colori from './opere-colori.json';

export type Categoria = 'pop' | 'grafiche' | 'materico' | 'classico';

export const categorie: Record<Categoria, { nome: string; breve: string }> = {
  pop: { nome: 'Pop art', breve: 'Pop' },
  grafiche: { nome: 'Grafiche e stampe', breve: 'Grafica' },
  materico: { nome: 'Astratto e materico', breve: 'Materico' },
  classico: { nome: 'Classico e figurativo', breve: 'Classico' },
};

type Voce = {
  slug: keyof typeof colori;
  titolo: string;
  categoria: Categoria;
  /** Solo ciò che si vede nella foto (supporto, firma, numerazione), mai dati inventati. */
  supporto: string;
  descrizione: string;
  alt: string;
};

const voci: Voce[] = [
  {
    slug: 'ombrello-rosso', titolo: "L'ombrello rosso", categoria: 'grafiche',
    supporto: 'Stampa su carta, firmata e numerata',
    descrizione: "Due figure senza volto si stringono sotto un ombrello rosso, in una stanza dal pavimento a scacchi che si apre su un tramonto. Un sogno surreale, lucido e silenzioso.",
    alt: 'Stampa surreale: due figure abbracciate sotto un ombrello rosso, in una stanza con pavimento a scacchi aperta su un tramonto',
  },
  {
    slug: 'ritratto-in-giallo', titolo: 'Ritratto in giallo', categoria: 'pop',
    supporto: 'Su tela, con inserti di resina colorata',
    descrizione: 'Un ritratto pop dai toni arancio e fucsia su un giallo pieno. I frammenti di resina verde e blu brillano come vetro e cambiano con la luce.',
    alt: 'Ritratto pop di una donna dai toni arancio e fucsia su fondo giallo, con frammenti di resina verde e blu',
  },
  {
    slug: 'rosso-nel-nero', titolo: 'Rosso nel nero', categoria: 'materico',
    supporto: 'Materia e colore su tela, firmata',
    descrizione: 'Strati di nero lucido stesi a rilievo lasciano filtrare il rosso da sotto, come brace. Va guardato di lato, con la luce radente.',
    alt: 'Opera materica a rilievo: strati di nero lucido da cui affiora il rosso',
  },
  {
    slug: 'il-chitarrista', titolo: 'Il chitarrista', categoria: 'classico',
    supporto: 'Disegno su carta, firmato e datato',
    descrizione: 'Pochi tratti di pennarello e qualche velatura di colore: un giovane suona la chitarra, di profilo. In basso, una dedica scritta a mano.',
    alt: 'Disegno a pennarello con velature di colore: un giovane di profilo che suona la chitarra',
  },
  {
    slug: 'manifesti-strappati', titolo: 'Manifesti strappati', categoria: 'pop',
    supporto: 'Grafica su carta, firmata e numerata',
    descrizione: 'Manifesti del cinema strappati e sovrapposti: volti di divi, titoli spezzati, i colori delle sale degli anni Cinquanta.',
    alt: 'Collage pop di manifesti cinematografici strappati, con volti di attori e titoli spezzati',
  },
  {
    slug: 'volto-rosa', titolo: 'Volto rosa', categoria: 'grafiche',
    supporto: 'Grafica su carta, firmata e numerata',
    descrizione: 'Un volto fatto di forme ritagliate: rosa, nero, verde e una bocca a scacchi. Geometria allegra, quasi un collage.',
    alt: 'Grafica con un volto geometrico rosa con occhi a bersaglio e bocca a scacchi, su fondo verde e nero',
  },
  {
    slug: 'cerchi-blu', titolo: 'Cerchi blu', categoria: 'materico',
    supporto: 'Materia e colore su juta',
    descrizione: 'Due cerchi blu e viola scavati nella materia, sulla trama grezza della juta dai bordi sfilacciati.',
    alt: 'Opera materica su juta grezza con due grandi cerchi blu e viola in rilievo',
  },
  {
    slug: 'sguardo-in-alto', titolo: 'Sguardo in alto', categoria: 'pop',
    supporto: 'Su tela, siglata',
    descrizione: 'Un volto che guarda verso l’alto, costruito a campiture piatte di grigio, nero e verde acido come uno stencil. Energia da concerto.',
    alt: "Ritratto in stile stencil di un uomo che guarda verso l'alto, in grigio, nero e verde",
  },
  {
    slug: 'donna-in-rosa', titolo: 'Donna in rosa', categoria: 'classico',
    supporto: 'Dipinto, in cornice dorata',
    descrizione: 'Una giovane donna seduta su un drappo rosa sorride a chi guarda, davanti a una testiera dorata. Pittura figurativa dai toni caldi.',
    alt: 'Dipinto figurativo: una giovane donna seduta su un drappo rosa davanti a una testiera dorata',
  },
  {
    slug: 'cupola-e-simboli', titolo: 'Cupola e simboli', categoria: 'grafiche',
    supporto: 'Grafica su carta, firmata e numerata',
    descrizione: 'Una cupola, un angelo con la tromba, un crocifisso, un calice e il pane: simboli sacri spezzati in tasselli di blu e arancio, come una vetrata di oggi.',
    alt: 'Grafica a colori con una cupola, un angelo, un crocifisso e un calice, scomposti in tasselli blu e arancio',
  },
  {
    slug: 'gocce', titolo: 'Gocce', categoria: 'materico',
    supporto: 'Colore a spruzzo su fondo bianco',
    descrizione: 'File di segni a spruzzo blu, rossi, rosa e arancio che colano verso il basso. Ritmo, ripetizione e un po’ di caos controllato.',
    alt: 'Opera astratta con file di segni a spruzzo blu, rossi, rosa e arancio che colano su fondo bianco',
  },
  {
    slug: 'decappottabile-rossa', titolo: 'Decappottabile rossa', categoria: 'pop',
    supporto: 'Grafica su carta, firmata',
    descrizione: 'Una decappottabile rossa e una ragazza bionda, a linee nette e colori pieni. Pop, estate, anni Ottanta.',
    alt: 'Grafica pop: una ragazza bionda seduta su una decappottabile rossa, su fondo bianco',
  },
  {
    slug: 'figura-su-arancio', titolo: 'Figura su arancio', categoria: 'classico',
    supporto: 'Disegno su carta colorata',
    descrizione: 'Una figura bianca e azzurra affiora dal fondo arancio a tratti veloci, tra luce e movimento.',
    alt: 'Disegno a tratti bianchi e azzurri su carta arancio',
  },
  {
    slug: 'pannocchie', titolo: 'Pannocchie', categoria: 'grafiche',
    supporto: 'Grafica su carta, firmata e numerata',
    descrizione: 'Un fascio di pannocchie gialle esplode su un fondo scuro, tra colpi di rosso e di blu. Gesto rapido, colore pieno.',
    alt: 'Grafica con un fascio di pannocchie gialle su fondo scuro con rosso e blu',
  },
  {
    slug: 'scooter-a-pois', titolo: 'Scooter a pois', categoria: 'pop',
    supporto: 'Grafica su carta, firmata',
    descrizione: 'Uno scooter blu coperto di pois colorati, disegnato come un’icona. Leggero e ironico.',
    alt: 'Grafica pop: uno scooter blu coperto di pois colorati, su fondo bianco',
  },
];

const immagini = import.meta.glob<{ default: ImageMetadata }>('../assets/opere/*.jpg', { eager: true });

/** Mescola due colori esadecimali (t = quota del secondo). */
function mescola(a: string, b: string, t: number) {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('');
}

export const opere = voci.map((v, i) => {
  const img = immagini[`../assets/opere/${v.slug}.jpg`]?.default;
  if (!img) throw new Error(`Immagine mancante per ${v.slug}: esegui npm run opere`);
  const accento = colori[v.slug].accento;
  return {
    ...v,
    numero: String(i + 1).padStart(2, '0'),
    img,
    accento,
    /** la "parete" dietro l'opera: il suo colore, abbassato verso l'antracite */
    fondo: mescola(accento, '#111113', 0.62),
    orizzontale: img.width > img.height * 1.08,
  };
});

export type Opera = (typeof opere)[number];

/** Le cinque opere della sala d'ingresso */
export const inEvidenza = ['ombrello-rosso', 'ritratto-in-giallo', 'manifesti-strappati', 'sguardo-in-alto', 'cupola-e-simboli']
  .map((s) => opere.find((o) => o.slug === s)!);

/** Le tre opere che compaiono dentro le parole del manifesto */
export const nelTesto = ['gocce', 'il-chitarrista', 'volto-rosa'].map((s) => opere.find((o) => o.slug === s)!);
