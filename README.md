# Benny Store — sito

Sito di Benny Store, arte & abbigliamento a Cesano Boscone (MI).
Astro 7 + TypeScript, GSAP/ScrollTrigger, Lenis. Nessun framework UI, nessun WebGL.

- Direzione artistica: [DIREZIONE-ARTISTICA-BENNY-STORE.md](DIREZIONE-ARTISTICA-BENNY-STORE.md)
- Concept scelto e motivazioni: [CONCEPT.md](CONCEPT.md)
- Inventario foto (alt, qualità, uso): [IMMAGINI.md](IMMAGINI.md)
- Screenshot: `anteprima/` (hero) e `anteprima/verifica/` (pagine intere 1440/390/360, movimento ridotto, pagine legali)

## Comandi

```bash
npm install
npm run dev        # sviluppo su http://localhost:4321
npm run build      # build statica in dist/
npm run preview    # serve dist/
npm run check      # controllo tipi Astro/TypeScript
npm run foto       # rigenera src/assets/foto dagli originali
npm run icone      # rigenera og.jpg, favicon e manifest in public/
```

Per la pubblicazione impostare il dominio: `SITE_URL=https://www.dominio.it npm run build` (serve per canonical, sitemap, robots e Open Graph). Oggi c'è il segnaposto `https://www.bennystore.example`.

> La cartella è sulla Scrivania sincronizzata con iCloud, che a volte crea copie "file 2.ext" dentro `dist/`. Prima di pubblicare: `rm -rf dist && npm run build`.

## Le scelte (in breve, il dettaglio è in CONCEPT.md)

**Concept "Il pilastro".** Nella sala del negozio c'è un pilastro antracite circondato da quadri: l'hero è quella colonna, a cinque facce (le cinque categorie del biglietto), con foto vere, che ruota tra le parole BENNY e STORE. Ruota sull'asse verticale perché tutte le foto sono verticali.
**Caricamento.** Una linea rossa corre lungo il bordo alto come la striscia LED del soffitto del negozio, poi si accendono i coni di luce (circa 1 s, solo CSS, non blocca nulla).
**Un solo momento forte per sezione.** Le opere: faretto che segue cursore o dito, foto in bianco e nero che tornano a colori. Dentro il negozio: punti sulla foto della sala. Idee regalo: cartellini che si girano. Abbigliamento e Oggettistica: calmi.
**Colori dalle foto.** Antracite delle pareti, salvia del biglietto, indaco del logo, rosso del LED, miele del parquet. Font Montserrat (quello del biglietto), self-hosted, solo subset latino.

## Come cambiare foto e contenuti

| Cosa | Dove |
|---|---|
| Telefono, email, indirizzo, P.IVA, ragione sociale, REA, PEC, orari | `src/data/sito.ts` — i campi `null` mostrano un segnaposto tratteggiato "da confermare" in footer, privacy e note legali |
| Foto originali | `materiale/foto-originali/` → mappa nome originale → nome descrittivo in `scripts/prepara-foto.mjs`, poi `npm run foto` |
| Facce del pilastro (foto, titolo, inquadratura) | array `facce` in `src/components/HeroPilastro.astro` (`pos` = `object-position`) |
| Opere (foto, alt, testo del messaggio "Chiedi di quest'opera") | array `evidenza` e `opere` in `src/components/Opere.astro` |
| Punti sulla foto della sala | array `punti` in `src/components/Negozio.astro` (`x`/`y` in % sulla foto) |
| Testi Abbigliamento / Oggettistica | `src/components/Reparti.astro` |
| Scelte e categorie consigliate di Idee regalo | `src/components/Regali.astro` (liste in alto + mappe `CAT`, `PRIMA`, `OCC` nello script) |
| Domande frequenti (anche dati strutturati FAQPage) | array `faq` in `src/components/Visita.astro` — aggiungere solo risposte vere |
| Colori, tipografia, curve e durate del movimento | token in `src/styles/global.css` (`:root`) |
| Immagine social e favicon | `scripts/genera-icone.mjs`, poi `npm run icone` |
| Testi legali | `src/pages/privacy.astro`, `termini.astro`, `accessibilita.astro` |

Quando arrivano gli **orari veri**: inserirli in `negozio.orari`, sostituire il segnaposto in `Visita.astro`, aggiungere `openingHoursSpecification` al JSON-LD in `src/pages/index.astro`, una domanda FAQ sugli orari e, se si vuole, l'indicatore "aperto ora" in nav (oggi non esiste, perché non c'è un orario da calcolare).

## Da chiedere al cliente

- Ragione sociale, forma giuridica, codice fiscale, REA, PEC (e capitale sociale se società di capitali).
- **Orari** di apertura e giorni di chiusura.
- Il 350 133 0118 è anche **WhatsApp**? Se sì, aggiungere il pulsante in Idee regalo e Contatti.
- **Profili social** (Instagram?) e se mostrarli.
- Vende solo in negozio o vuole un catalogo/e-commerce? Spedisce?
- Per ogni opera da mostrare: artista, titolo, tecnica, misure, stato, autenticazione, se mostrare il prezzo. Oggi le opere non hanno didascalie (è voluto: nessun dato inventato).
- Vuole una sezione "Vendi a noi / valutazione di quadri e lotti"?
- **Autorizzazione all'uso delle foto**, in particolare quelle con **persone di spalle**: `negozio-sala-pilastro` (usata in "Dentro il negozio" e nell'immagine social), `negozio-visitatore-*` (non usate).
- Logo in alta risoluzione o vettoriale (l'indaco #3D40C4 è stimato da una foto sfocata del biglietto).
- La sala al buio gli piace o preferisce un sito chiaro?
- **Dominio** definitivo (www o senza), **hosting** e fornitore email (servono anche per la privacy).
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
| 5 | Accessibilità WCAG 2.2 AA | Tastiera, focus visibile, salta-al-contenuto, rotazione autonoma del pilastro limitata a 5 s (WCAG 2.2.2, quindi niente pulsante di pausa), reduced motion, alt, target ≥ 24 px | Lighthouse Accessibility (vedi punto 20); test headless: dopo 5 s la rotazione autonoma si ferma |
| 6 | CTA chiara | "Chiamaci" in nav, hero, sezioni e footer | Visivo |
| 7 | FAQ + FAQPage | 3 domande con risposta certa; orari/spedizioni/valutazioni in attesa di risposta | JSON-LD in `#visita` |
| 8 | Alt descrittivi | Tutti, senza autori né titoli | `IMMAGINI.md` |
| 9 | Analytics privacy-friendly | Nessuno installato. Se servono: uno strumento senza cookie, oppure attivarlo solo dopo consenso nella categoria "Statistiche" (già prevista nel pannello) | — |
| 10 | Meta title ≤ 60 | "Benny Store \| Arte e abbigliamento a Cesano Boscone" (51) | Build |
| 11 | Meta description ≤ 155 con CTA | 135 caratteri | Build |
| 12 | Open Graph 1200×630 | `public/og.jpg`, foto vera della sala | File (contiene una persona di spalle: vedi autorizzazioni) |
| 13 | Favicon completa | SVG, ICO 32, apple-touch 180, 192/512, maskable, manifest | `public/` |
| 14 | Canonical e redirect | Canonical su ogni pagina; `public/_redirects` di esempio (Netlify/Cloudflare) da completare col dominio vero | Da fare all'hosting |
| 15 | robots.txt | Generato con link alla sitemap | `/robots.txt` |
| 16 | sitemap.xml | Home + 3 pagine | `/sitemap.xml` |
| 17 | 404 | "Questa parete è vuota", link a home e Chiamaci, `noindex` | Risponde 404 in preview |
| 18 | Mobile da 360 px | Nessuno scroll orizzontale a 360, 390, 1440 | Chrome headless `scrollWidth` |
| 19 | Form | Idee regalo non invia nulla: apre l'app di posta con testo precompilato e lo dice chiaramente; controllo testo vuoto; niente "inviato". Nessun backend quindi niente honeypot | Test manuale e headless |
| 20 | Link e prestazioni | Nessuna ancora o link interno rotto; `tel:`/`mailto:` corretti. Lighthouse mobile: Performance 98, Accessibility 100, Best Practices 100, SEO 100 (LCP 2,4 s, CLS 0, TBT 0). Desktop: 100 ovunque | Script di controllo su `dist/` + Lighthouse 13.6 |

**Attenzione su LCP mobile:** 2,4 s in simulazione 4G, appena sotto la soglia di 2,5 s. È la foto della faccia frontale del pilastro (AVIF ~30 KB); il ritardo è nel rendering, non nel download. Da ricontrollare sul dominio vero.

## Struttura

```
src/
  data/sito.ts            dati del negozio (unica fonte)
  styles/global.css       token, base, bottoni, comparse
  layouts/Base.astro      head, meta, nav, footer, cookie
  layouts/Pagina.astro    pagine di testo (legali)
  components/             Nav, Ingresso, HeroPilastro, Opere, Negozio, Reparti, Regali, Visita, Footer, Cookie
  scripts/                movimento (Lenis+GSAP), pilastro, sito, consenso
  pages/                  index, privacy, termini, accessibilita, 404, robots.txt, sitemap.xml
materiale/foto-originali/ le 19 foto ricevute (nomi originali)
scripts/                  prepara-foto, genera-icone
```
