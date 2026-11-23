# Benny Store — sito

Sito di Benny Store, galleria d'arte (e negozio di abbigliamento e idee regalo) a Cesano Boscone (MI).
Astro 7 + TypeScript, GSAP (ScrollTrigger, SplitText, Flip), Lenis, View Transitions tra pagine. Nessun framework UI, nessun WebGL.

- Direzione artistica: [DIREZIONE-ARTISTICA-BENNY-STORE.md](DIREZIONE-ARTISTICA-BENNY-STORE.md)
- Concept scelto e motivazioni: [CONCEPT.md](CONCEPT.md)
- Inventario foto (alt, qualità, uso): [IMMAGINI.md](IMMAGINI.md)
- Screenshot della versione precedente ("Il pilastro"): `anteprima/` e `anteprima/verifica/`

## Comandi

```bash
npm install
npm run dev        # sviluppo su http://localhost:4321
npm run build      # build statica in dist/
npm run preview    # serve dist/
npm run check      # controllo tipi Astro/TypeScript
npm run foto       # rigenera src/assets/foto (foto del negozio) dagli originali
npm run opere      # ritaglia e raddrizza le opere dagli originali → src/assets/opere + src/data/opere-colori.json
npm run icone      # rigenera og.jpg, favicon e manifest in public/
```

Il sito è pubblicato su `https://bennystore.vercel.app` (valore predefinito di canonical, sitemap, robots e Open Graph). Con un dominio proprio: `SITE_URL=https://www.dominio.it npm run build`, o la variabile `SITE_URL` nelle impostazioni del progetto Vercel.

`vercel.json` attiva `cleanUrls`: la build produce `privacy.html`, `opere/gocce.html`…, e Vercel li serve come `/privacy`, `/opere/gocce`. Senza, quei link danno 404.

I link interni ("Collezione", "Lo spazio", "Visita") scorrono alla sezione senza aggiungere `#sezione` all'indirizzo; se si arriva da un'altra pagina con `/#sezione`, il `#` viene tolto subito.

> La cartella è sulla Scrivania sincronizzata con iCloud, che a volte crea copie "file 2.ext" dentro `dist/`. Prima di pubblicare: `rm -rf dist && npm run build`.

## Le scelte (in breve, il dettaglio è in CONCEPT.md)

**Concept "La galleria" (v2, novembre 2026).** Il sito è una galleria d'arte: le immagini sono i quadri veri, ritagliati e raddrizzati dalle foto (niente muro, niente cornice), ognuno con la sua pagina.
**Ingresso.** Contatore 0→100% con la striscia LED rossa del soffitto, poi il sipario sale (una volta per visita; mai con movimento ridotto; senza JS sparisce da solo).
**La sala.** "Benny *Store*" gigante in serif; davanti, un'opera alla volta. Scorrendo (scena ferma con `position: sticky`) le 5 opere in evidenza si danno il cambio e la parete prende il colore di ciascuna.
**Manifesto.** Righe giganti con piccole opere dentro le parole, su una griglia numerata; le righe scivolano in versi opposti.
**Collezione.** 15 opere "appese" su pareti color carta che al passaggio prendono il colore dell'opera; numero da catalogo, filtri per sezione con riordino animato (GSAP Flip); cursore "Guarda".
**Pagina d'opera.** Quadro sulla sua parete colorata a sinistra, scheda a destra con numero gigante, descrizione, "Chiedi di quest'opera" (email precompilata) e precedente/successiva (anche con le frecce). Dalla collezione l'immagine "vola" nella pagina (View Transitions, dove supportate).
**Lo spazio.** Foto vere del negozio sparse a velocità diverse, dal bianco e nero al colore; poi i cinque reparti del biglietto.
**Riferimenti** (solo per ritmo e animazioni, non copiati): lironmoran-interiors.com (contatore, titolo gigante con immagine al centro, galleria a schermo diviso), recruit.pearl-idea.co.jp (carta calda, corsivi serif, numeri "01", foto sparse), paulkalkbrenner.net (griglia numerata, righe giganti con immagini dentro, filtri).
**Colori e caratteri.** Carta calda #EFEBE3 per le sale, antracite delle pareti vere per i momenti scuri, rosso LED una volta per schermata. Instrument Serif (titoli, self-hosted) + Montserrat (il carattere del biglietto).

## Come cambiare foto e contenuti

| Cosa | Dove |
|---|---|
| Telefono, email, indirizzo, P.IVA, ragione sociale, REA, PEC, orari | `src/data/sito.ts` — i campi `null` mostrano un segnaposto tratteggiato "da confermare" in footer, privacy e note legali |
| Foto del negozio | `materiale/foto-originali/` → mappa nome originale → nome descrittivo in `scripts/prepara-foto.mjs`, poi `npm run foto` |
| Ritaglio di un'opera (o una nuova opera da una foto) | `scripts/ritaglia-opere.mjs`: per ogni opera la foto e i 4 angoli del quadro in millesimi (alto-sx, alto-dx, basso-dx, basso-sx), poi `npm run opere` |
| Titolo, sezione, supporto, descrizione, alt e ordine delle opere | array `voci` in `src/data/opere.ts` (l'ordine dà il numero da catalogo) |
| Le 5 opere della sala d'ingresso / le 3 dentro il manifesto | `inEvidenza` e `nelTesto` in `src/data/opere.ts` |
| Sezioni della collezione (filtri) | `categorie` in `src/data/opere.ts` |
| Foto e didascalie di "Lo spazio", reparti | `src/components/Spazio.astro` |
| Domande frequenti (anche dati strutturati FAQPage) | array `faq` in `src/components/Visita.astro` — aggiungere solo risposte vere |
| Colori, tipografia, curve e durate del movimento | token in `src/styles/global.css` (`:root`) |
| Immagine social e favicon | `scripts/genera-icone.mjs`, poi `npm run icone` |
| Testi legali | `src/pages/privacy.astro`, `termini.astro`, `accessibilita.astro` |

Quando arrivano gli **orari veri**: inserirli in `negozio.orari`, sostituire il segnaposto in `Visita.astro`, aggiungere `openingHoursSpecification` al JSON-LD in `src/pages/index.astro`, una domanda FAQ sugli orari e, se si vuole, l'indicatore "aperto ora" in nav (oggi non esiste, perché non c'è un orario da calcolare).

Quando arrivano **artista, titolo vero, tecnica, misure e prezzo** di un'opera: aggiungerli in `src/data/opere.ts` e nella scheda di `src/pages/opere/[slug].astro`, poi togliere la nota "Il titolo è nostro…" per quell'opera.

## Da chiedere al cliente

- Ragione sociale, forma giuridica, codice fiscale, REA, PEC (e capitale sociale se società di capitali).
- **Orari** di apertura e giorni di chiusura.
- Il 350 133 0118 è anche **WhatsApp**? Se sì, aggiungere il pulsante nelle pagine d'opera e in Visita.
- **Profili social** (Instagram?) e se mostrarli.
- Vende solo in negozio o vuole un catalogo/e-commerce? Spedisce?
- Per ogni opera da mostrare: artista, titolo, tecnica, misure, stato, autenticazione, se mostrare il prezzo. Oggi le opere non hanno didascalie (è voluto: nessun dato inventato).
- Vuole una sezione "Vendi a noi / valutazione di quadri e lotti"?
- **Autorizzazione all'uso delle foto**, in particolare quelle con **persone di spalle**: `negozio-sala-pilastro` (usata in "Dentro il negozio" e nell'immagine social), `negozio-visitatore-*` (non usate).
- Logo in alta risoluzione o vettoriale (l'indaco #3D40C4 è stimato da una foto sfocata del biglietto).
- La sala al buio gli piace o preferisce un sito chiaro?
- **Dominio** proprio (oggi bennystore.vercel.app; www o senza) e fornitore email (servono anche per la privacy). Hosting: Vercel.
- Foto in più che mancano: oggettistica e regali in primo piano, vetrina/insegna esterna, una foto orizzontale per i social.

## Testi legali: sono bozze da validare

Tutte e tre le pagine mostrano in alto il riquadro "Bozza da validare" (togliere con `bozza={false}` in `src/layouts/Pagina.astro` quando approvate).

- **Privacy e cookie** (`/privacy`): titolare, finalità, basi giuridiche, conservazione (24 mesi proposti, da confermare), destinatari (hosting ed email da confermare), diritti, tabella cookie.
- **Note legali** (`/termini`): dati societari, uso del sito, diritti sulle immagini delle opere, niente vendita online. Se si apre un e-commerce servono condizioni di vendita e informazioni sul recesso.
- **Accessibilità** (`/accessibilita`): dichiarazione volontaria di impegno WCAG 2.2 AA.
- Da far verificare al consulente: obblighi per il commercio di beni usati/lotti e opere d'arte, uso delle immagini di opere di terzi, eventuale vendita a distanza.

## Conformità e pubblicazione — i 20 punti

| # | Requisito | Stato | Come è stato controllato |
|---|---|---|---|
| 1 | Privacy policy GDPR | Bozza, link in footer, banner cookie e Idee regalo | Pagina `/privacy` |
| 2 | Termini / note legali | Bozza; niente condizioni di vendita (nessun ordine online) | Pagina `/termini` |
| 3 | Cookie (Garante 2021) | Accetta / Rifiuta / Personalizza, X = rifiuta, scelta valida 6 mesi, "Preferenze cookie" in footer; mappa solo dopo consenso; nessuna statistica | Chrome headless: 0 richieste a domini esterni prima del consenso su tutte le pagine; dopo "Accetta e mostra la mappa" l'iframe compare |
| 4 | Dati societari nel footer | P.IVA e indirizzo reali; ragione sociale, C.F., REA, PEC con segnaposto tratteggiato | Visivo |
| 5 | Accessibilità WCAG 2.2 AA | Tastiera, focus visibile, salta-al-contenuto; nella sala niente si muove da solo (le opere cambiano solo scorrendo) e sono elencate anche come link per i lettori di schermo; filtri con `aria-pressed` e annuncio del numero di opere; reduced motion (niente Lenis, sala ferma, niente transizioni); alt descrittivi; target ≥ 44 px | Da rimisurare con Lighthouse dopo la v2 |
| 6 | CTA chiara | "Chiamaci" in nav, hero, sezioni e footer | Visivo |
| 7 | FAQ + FAQPage | 3 domande con risposta certa; orari/spedizioni/valutazioni in attesa di risposta | JSON-LD in `#visita` |
| 8 | Alt descrittivi | Tutti, senza autori né titoli | `IMMAGINI.md` |
| 9 | Analytics privacy-friendly | Nessuno installato. Se servono: uno strumento senza cookie, oppure attivarlo solo dopo consenso nella categoria "Statistiche" (già prevista nel pannello) | — |
| 10 | Meta title ≤ 60 | "Benny Store \| Arte e abbigliamento a Cesano Boscone" (51) | Build |
| 11 | Meta description ≤ 155 con CTA | 135 caratteri | Build |
| 12 | Open Graph 1200×630 | `public/og.jpg`, foto vera della sala | File (contiene una persona di spalle: vedi autorizzazioni) |
| 13 | Favicon completa | SVG, ICO 32, apple-touch 180, 192/512, maskable, manifest | `public/` |
| 14 | Canonical e redirect | Canonical su ogni pagina (bennystore.vercel.app). `vercel.json` con `cleanUrls` (prima `/privacy`, `/termini`, `/accessibilita` davano 404 su Vercel). Su Vercel http→https è automatico; con un dominio proprio impostare il redirect www/non-www nelle impostazioni Domains di Vercel (`public/_redirects` vale solo per Netlify/Cloudflare) | Da fare all'hosting |
| 15 | robots.txt | Generato con link alla sitemap | `/robots.txt` |
| 16 | sitemap.xml | Home + 15 pagine d'opera + 3 pagine legali | `/sitemap.xml` |
| 17 | 404 | "Questa parete è vuota", link a home e Chiamaci, `noindex` | Risponde 404 in preview |
| 18 | Mobile da 360 px | Nessuno scroll orizzontale a 360, 390, 1440 | Chrome headless `scrollWidth` |
| 19 | Form | Idee regalo non invia nulla: apre l'app di posta con testo precompilato e lo dice chiaramente; controllo testo vuoto; niente "inviato". Nessun backend quindi niente honeypot | Test manuale e headless |
| 20 | Link e prestazioni | `tel:`/`mailto:` corretti; immagini AVIF/WebP responsive; la prima opera della sala è `fetchpriority="high"`. I punteggi Lighthouse della v1 (mobile 98/100/100/100) vanno rimisurati sulla v2 | Da rimisurare dopo la pubblicazione |

**Attenzione su LCP mobile:** 2,4 s in simulazione 4G, appena sotto la soglia di 2,5 s. È la foto della faccia frontale del pilastro (AVIF ~30 KB); il ritardo è nel rendering, non nel download. Da ricontrollare sul dominio vero.

## Struttura

```
src/
  data/sito.ts            dati del negozio (unica fonte)
  data/opere.ts           le 15 opere: titolo, sezione, supporto, descrizione, alt, ordine
  data/opere-colori.json  colore e misure di ogni ritaglio (scritto da npm run opere)
  assets/opere/           i quadri ritagliati e raddrizzati (scritti da npm run opere)
  assets/foto/            le foto del negozio (scritte da npm run foto)
  styles/global.css       token, base, bottoni, comparse, View Transitions
  layouts/Base.astro      head, meta, nav, footer, cookie
  layouts/Pagina.astro    pagine di testo (legali)
  components/             Nav, Ingresso, HeroSala, Manifesto, Collezione, Spazio, Visita, Footer, Cookie
  scripts/                movimento (Lenis+GSAP), sito, consenso
  pages/                  index, opere/[slug], privacy, termini, accessibilita, 404, robots.txt, sitemap.xml
materiale/foto-originali/ le 19 foto ricevute (nomi originali)
scripts/                  prepara-foto, ritaglia-opere, genera-icone
vercel.json               cleanUrls (indirizzi senza .html)
```
