# Concept — Benny Store

Emozione da ottenere: **sorpresa**, cioè scoprire qualcosa di unico che non sapevi di volere.

## Cosa dicono le foto (e perché cambia il seme)

Prima di inventare ho guardato le 19 foto (vedi `IMMAGINI.md`). Ne escono tre fatti che il seme non sfruttava:

1. **Le pareti del negozio sono già "la sala al buio"**: antracite #3E3F44, non nero. Il fondo scuro del sito diventa il colore vero delle pareti, non una scelta di stile.
2. **Nel mezzo della sala c'è un pilastro antracite** (`negozio-sala-pilastro`), con i quadri tutto intorno. Il prisma del seme esiste davvero: è quel pilastro.
3. **Lungo il soffitto corre una striscia LED rossa** (`negozio-parete-classico-led`). È il dettaglio più riconoscibile del posto, e può essere la "luce che si accende" del caricamento.

In più: **tutte le foto sono verticali (3:4)**. Un prisma che ruota sull'asse X (come nel riferimento) vuole facce orizzontali e taglierebbe le opere. Una colonna che ruota sull'asse Y le mostra intere.

## Il seme (punto di partenza)

Prisma a 5 facce che ruota sull'asse X in una sala buia, testo gigante dietro, luci che si accendono.
Buono, ma è il riferimento con altre foto: facce orizzontali, nessun legame con il negozio vero.

---

## Concept A — "Il pilastro"

**Idea.** L'hero è il pilastro del negozio. Una colonna a cinque facce, alta quasi quanto lo schermo, sta in piedi in mezzo alla sala buia tra le parole **BENNY** e **STORE**, che le passano dietro (la colonna le copre in parte: la profondità si capisce senza spiegazioni). Su ogni faccia è "appesa" una foto vera: Quadri d'autore, Classico moderno, Pop art, Abbigliamento, Oggettistica e idee regalo.

**Il momento wow.** Al caricamento una linea rossa sottile corre lungo il bordo alto dello schermo come la striscia LED del soffitto, poi due coni di luce calda scendono sul pilastro e le foto si accendono; il nome compare per ultimo. Scorrendo, la colonna gira (una faccia ogni ~20% dell'hero) e l'etichetta della faccia frontale cambia in grande sotto. Il puntatore sposta leggermente la luce sulla colonna (solo desktop).

**Interazione.** Clic o Invio su una faccia porta alla sezione della categoria. Rotazione lenta autonoma, pulsante Pausa visibile, pausa su hover/focus e quando l'hero esce dallo schermo. Con reduced motion: niente rotazione, le cinque categorie diventano card in fila.

**Tecnica.** CSS 3D puro (`perspective`, `preserve-3d`, `rotateY` di 72° per faccia, `translateZ` = apotema), GSAP ScrollTrigger per lo scrub. Nessun WebGL. Peso: 5 immagini di faccia a ~400 px di larghezza in AVIF (~25–40 KB l'una).

## Concept B — "Sfoglia il lotto"

**Idea.** Benny Store compra lotti e li rivende: nei negozi così si sfogliano le stampe una per una in un cassone. L'hero è un cassone di legno visto dall'alto in prospettiva, pieno di opere fotografate. Scorrendo le opere si inclinano in avanti una dopo l'altra come cartelle sfogliate a mano, e ogni tanto ne esce una categoria.

**Wow.** Altissimo e molto legato al mestiere del titolare ("scoprire" il pezzo nel mucchio).
**Problemi.** Serve una foto di un vero cassone, che non c'è (verrebbe disegnato: contro il FISSO sul realismo). Su mobile 3D di 10–15 lastre è pesante; molte immagini caricate subito danneggiano LCP. Non porta alle 5 categorie in modo naturale.

## Concept C — "La torcia"

**Idea.** All'apertura lo schermo è una parete vera del negozio (`negozio-parete-grafiche`) completamente al buio. Il cursore, o il dito, è una torcia: dove passi, le opere appaiono. Dopo pochi secondi (o al primo scroll) le luci della sala si accendono tutte insieme e appare BENNY STORE.

**Wow.** Fortissimo sul desktop, è la sorpresa allo stato puro.
**Problemi.** Il contenuto principale è nascosto all'arrivo: male per LCP percepito e per chi non usa il mouse (tastiera, screen reader, touch, dove la torcia richiede di trascinare). Le categorie arrivano dopo. Meglio come interazione di una sezione che come ingresso.

---

## Valutazione

Punteggio 1–5 (5 = migliore; per "peso" 5 = più leggero).

| Concept | Impatto | Realismo (foto vere) | Fattibilità | Peso | Legame col negozio | Totale |
|---|---|---|---|---|---|---|
| Seme — prisma su X | 3 | 4 | 5 | 4 | 2 | 18 |
| **A — Il pilastro** | **4** | **5** | **5** | **5** | **5** | **24** |
| B — Sfoglia il lotto | 5 | 2 | 2 | 2 | 4 | 15 |
| C — La torcia | 5 | 5 | 3 | 4 | 3 | 20 |

## Scelta: A — "Il pilastro", con la torcia di C dentro "Le opere"

- È la sorpresa più leggera: chi conosce il negozio riconosce il pilastro e la luce rossa, chi non lo conosce vede una colonna di quadri che gira tra le lettere.
- Rispetta tutto il FISSO: solo foto vere, CSS 3D, nessun WebGL, LCP su un'immagine leggera, rotazione con pausa e fallback.
- Le foto verticali stanno intere sulle facce.
- La torcia di C diventa il "wow" di **Le opere** (un faretto che segue il cursore o il dito sulla parete scura, con le opere che passano dal bianco e nero al colore dove la luce le tocca). Così ogni sezione ha un solo momento forte.
- Del concept B tengo il gesto dello "sfogliare" per il selettore **Idee regalo**: le risposte si girano come cartellini.

## Ritmo della pagina (un wow per sezione)

| Sezione | Wow | Il resto |
|---|---|---|
| Caricamento | Linea LED rossa → coni di luce | < 1,2 s, il contenuto è già nel DOM e leggibile |
| Hero | Il pilastro che gira tra BENNY e STORE | Testo che si schiarisce allo scroll |
| Le opere | Faretto/torcia sulla parete, b/n → colore | Cornici vere e passepartout, nessuna didascalia inventata |
| Dentro il negozio | Hotspot sulla foto della sala (fondo salvia) | Dettagli che si aprono |
| Abbigliamento + Oggettistica | Nessuno: due blocchi calmi | Foto grandi, testo breve |
| Idee regalo | Cartellini che si girano | Messaggio precompilato verso telefono o email |
| Vieni a trovarci + footer | Nome gigante | Dati, mappa solo su consenso |

## Palette (dalle foto, non dal riferimento)

| Token | Hex | Da dove |
|---|---|---|
| `--sala` | #16171A | Parete antracite in ombra (fondo) |
| `--parete` | #3E3F44 | Parete antracite in luce (superfici) |
| `--avorio` | #F4F2EC | Passepartout, testo su scuro |
| `--nebbia` | #A3A3AA | Testo secondario (AA su `--sala`) |
| `--salvia` | #C9D6CE | Fondo del biglietto, sezioni chiare |
| `--indaco` | #3D40C4 | Logo (stimato, da campionare dal file) — solo su chiaro |
| `--indaco-luce` | #9DA0F5 | Indaco su scuro, focus |
| `--led` | #E5383F | Striscia LED: un solo uso per schermata (caricamento, stato attivo) |
| `--miele` | #D99A5B | Parquet: luce calda dei faretti |

Tipografia: **Montserrat variabile** self-hosted (subset latino), 850–900 maiuscolo per i titoli giganti, 400 per il testo. È il carattere del biglietto.
