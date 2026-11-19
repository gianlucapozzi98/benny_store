# Direzione artistica — Benny Store

Cesano Boscone (MI) · "Le idee migliori per sorprendere. Gli oggetti unici che volevi."

> Metodo: questo file ha una parte **FISSO** (non si tocca) e una parte **SPUNTO** (seme di idea da superare). Code scrive prima `CONCEPT.md`, sceglie il concept più forte, ne mostra l'anteprima e solo dopo costruisce il resto.

---

## 1. Fatti verificati (biglietto da visita + parole del titolare)

- Nome: **Benny Store**. Qualifica sul biglietto: "Arte & Abbigliamento".
- Frase del biglietto: "Le idee migliori per sorprendere. Gli oggetti unici che volevi."
- Retro del biglietto, le cinque categorie: **Quadri d'autore · Classico moderno · Pop art · Abbigliamento · Oggettistica e idee regalo**.
- Telefono: +39 350 1330118. Email: g.bennystore1@gmail.com.
- Indirizzo: via delle Betulle 1/3, Cesano Boscone (MI).
- P.IVA: 14931470968.
- Dal titolare (a voce, riferito da Gianluca): negozio d'arte e non solo; acquista lotti e rivende; all'interno c'è una galleria; la parte principale sono opere e quadri.
- Materiale: nella cartella del progetto ci sono foto dell'interno del negozio e di alcune opere.
- Identità visiva del biglietto: fondo a pennellate chiare grigio-verde (salvia), logo "BENNY STORE" in blu-indaco pesante con alone sfumato, secondario in Montserrat corsivo maiuscolo.

**Non si sa** (da non inventare): ragione sociale e forma giuridica, REA, PEC, orari, profili social, se esiste un e-commerce, se il numero è anche WhatsApp, nomi degli artisti, titoli, prezzi, anno di apertura, recensioni. Ricerche web fatte: nessuna fonte pubblica trovata su Benny Store.

## 2. Emozione e idea

**Emozione: sorpresa** (la scoperta di qualcosa di unico che non sapevi di volere). Ogni scelta si giustifica con questa.

**Idea guida (seme):** *una galleria che si apre ruotando.* Il sito si presenta al buio, come una sala con le luci spente, e le opere si accendono una alla volta. L'hero è un prisma di fotografie vere (le categorie del negozio) che ruota in profondità; ogni faccia è una porta verso una parte della galleria.

L'idea è un punto di partenza: Code deve cercarne una migliore se c'è (vedi sezione 4).

---

## 3. FISSO (non si negozia)

1. **Dati e fatti**: solo quelli della sezione 1. Mai inventare artisti, titoli, prezzi, anni, recensioni.
2. **Immagini**: solo quelle della cartella del progetto (interno del negozio, opere). Catalogarle in `IMMAGINI.md` (nome file, cosa mostra, qualità, uso previsto, alt). Se mancano, stock provvisorio con marcatura chiara. **Niente immagini generate con AI spacciate per opere o per il negozio.** Niente titoli o nomi d'artista sotto le opere se il cliente non li ha forniti.
3. **Realismo**: foto vere. Il 3D è fatto di fotografie in prospettiva (CSS 3D/WebGL con textures delle foto), niente scatole procedurali, niente low-poly, niente stile videogioco.
4. **Linguaggio sulle opere**: non scrivere "originale", "autentico", "certificato", "d'autore" nelle schede delle singole opere se il cliente non lo conferma per quel pezzo. "Quadri d'autore" resta come nome di categoria del biglietto.
5. **Una sola azione principale**: contattare / venire in negozio (telefono, email, indicazioni). Niente sezione prezzi, piani o pacchetti.
6. **Conformità** (sezione 9), **accessibilità** (WCAG 2.2 AA, `prefers-reduced-motion`, nessuna animazione infinita senza pausa), **prestazioni** (Lighthouse mobile Performance ≥ 90, LCP < 2,5 s su 4G, immagini AVIF/WebP, peso hero contenuto).
7. Mobile verificato da 360 px.
8. Mai dichiarare "inviato" un modulo senza backend.

## 4. SPUNTO (libertà creativa)

> Code: parti da qui, ma cerca di superarlo. Scrivi `CONCEPT.md` con **tre concept più audaci** di quello sotto, pensati per un negozio d'arte che vende quadri, pop art, abbigliamento e idee regalo. Valutali per impatto, realismo, fattibilità e peso. Scegli uno, fai un'anteprima con screenshot e solo poi estendi alle altre sezioni. L'obiettivo è qualcosa che il titolare non pensava possibile in un sito, senza perdere i FISSO.

### 4.1 Hero (seme)
- 100vh, bordo a bordo. Testo gigante "BENNY STORE" sullo sfondo (come nel riferimento), che si schiarisce allo scroll.
- Prisma rotante in prospettiva (perspective ~2000px, `transform-style: preserve-3d`). **Il riferimento ha 4 facce, qui le categorie sono 5**: usare un prisma a 5 facce, oppure 5 facce più "Il negozio". Code decide.
- Ogni faccia: una foto vera di opere o dell'interno + titolo maiuscolo con spaziatura larga. Quadri d'autore, Classico moderno, Pop art, Abbigliamento, Oggettistica e idee regalo.
- La rotazione segue lo scroll (scrub) e ha una rotazione lenta autonoma con **pulsante pausa** e pausa a hover/focus. Con `prefers-reduced-motion`: nessuna rotazione, le categorie sono un elenco di card.
- Clic su una faccia: scorre alla sezione della categoria.

### 4.2 Le opere (sostituisce i "case studies")
- Bento: una opera in evidenza a tutta larghezza, le altre in griglia a 2 colonne. **Non usare i pallini tipo macOS**: qui la cornice è una vera cornice/passepartout, con didascalia da museo solo se il cliente fornisce i dati.
- Le foto partono in bianco e nero e tornano a colori a hover/tocco (adatto all'arte). Su touch: colore al primo piano visibile.
- Interazione forte possibile: "illumina l'opera" (un faretto che segue il cursore o il dito sulla parete scura).

### 4.3 Dentro il negozio
- Una foto vera dell'interno a tutta larghezza con punti interattivi (hotspot) sulle sezioni: quadri, pop art, abbigliamento, regali. Clic o tocco: apre un dettaglio reale.
- Alternativa audace: scroll che attraversa la sala con parallasse tra più foto vere.

### 4.4 Idee regalo
- Un piccolo selettore ("Per chi è?" / "Per quale occasione?") che propone categorie e porta a un messaggio precompilato (telefono, WhatsApp se confermato, email). Nessun prezzo.

### 4.5 Chiusura
- Footer editoriale enorme (nome gigante), con indirizzo, telefono, email, mappa su richiesta (senza cookie finché non c'è consenso) e dati societari.

### 4.6 Navigazione, caricamento, microinterazioni
- Nav fissa con `mix-blend-mode: difference`, logo a sinistra, link al centro (nascosti su mobile, con menu), CTA a destra ("Chiamaci" o "Vieni a trovarci").
- Il "pallino live" del riferimento diventa "aperto ora" **solo se** si conoscono gli orari veri e si calcola davvero. Altrimenti non c'è.
- Caricamento (< 1,2 s, non blocca): le luci si accendono sulla sala, il nome compare per ultimo. Non peggiora LCP.
- Microinterazioni coerenti (stesse curve e durate): scala 1.02 sui bottoni, link a 0,2 s, focus visibile, cursore personalizzato solo su desktop, feedback dei controlli.
- Movimento a gerarchia: **un solo "wow" per sezione**, il resto morbido.

---

## 5. Riferimenti

**Riferimento 1 — "Cinematic Style" (Superdesign):** https://superdesign.dev/library/cinematic-style (la pagina non si apre senza rendering; analisi basata sulla specifica incollata da Gianluca).

| Cosa riprodurre (meccanica) | Cosa adattare a Benny Store |
|---|---|
| Hero 100vh con prisma 3D che ruota sull'asse X, prospettiva 2000px, testo gigante sullo sfondo | Facce = le 5 categorie con foto vere del negozio; pausa e reduced-motion |
| Nav fissa in `mix-blend-mode: difference` | Come sopra, "aperto ora" solo se reale |
| Titoli maiuscoli enormi (10–12vw), peso pesante, tracking stretto | Font scelto per l'identità (vedi sezione 6) |
| Griglia bento con elemento in evidenza e foto b/n che tornano a colori a hover | "Le opere" con cornici vere, senza pallini macOS |
| Superfici in vetro (blur 8px, bordo bianco al 10%) | Solo per pannelli e menu, con contrasto AA |
| Footer editoriale gigante | Con dati societari e contatti |

**Esclusi:** la sezione prezzi (tre piani e calcolatore) per scelta del cliente; il gradiente ciano-rosa e la palette del riferimento; il testo, le immagini e l'identità del sito originale. Si riproducono meccaniche, struttura e ritmo, mai codice, immagini, video, testi o marchio.

---

## 6. Palette e tipografia (proposta, Code può migliorarla)

Colori stimati dalla foto del biglietto: **campionarli dal logo o dal file originale**.

| Token | Hex | Uso |
|---|---|---|
| sala | #08080A | fondo principale (galleria al buio) |
| parete | #121215 | superfici e card |
| carta-salvia | #C9D3CB | sezioni chiare a pennellate, ripresa del biglietto |
| indaco | #4F52C9 | accento del logo: link, focus, dettagli (non gradiente) |
| indaco-luce | #8E91F0 | accento su fondo scuro, contrasto AA |
| avorio | #F4F2EC | testo principale su scuro |
| grigio-nebbia | #9A9AA0 | testo secondario |

Il fondo scuro è una scelta voluta, perché le opere "si accendono". Per non cadere nel "nero con un solo accento", si usa **la carta-salvia a pennellate come interludio chiaro** (ripresa del biglietto), e l'indaco dove c'è il logo.

Tipografia: **Montserrat** (è il carattere del biglietto) in peso 800–900 maiuscolo per i titoli giganti e 300–400 per il testo, self-hosted, subset latino. Il riferimento usa Aspekta: usarlo solo se la licenza lo consente, altrimenti restare su Montserrat o proporre un'alternativa coerente. Testo di corpo ≥ 1,125 rem, righe sotto gli 80 caratteri.

---

## 7. Struttura della pagina

```
[NAV blend-difference]  logo · link · CTA
[CARICAMENTO]  luci che si accendono (<1,2 s)
[HERO 100vh]  testo gigante + prisma 3D (5 categorie)
[LE OPERE]  bento: opera in evidenza + griglia 2 colonne
[DENTRO IL NEGOZIO]  foto vera + hotspot (carta-salvia)
[ABBIGLIAMENTO + OGGETTISTICA]  due blocchi con foto vere
[IDEE REGALO]  selettore "Per chi è?" → contatto
[VIENI A TROVARCI]  indirizzo, orari (se veri), telefono, email, mappa su consenso
[FOOTER GIGANTE]  nome, dati societari, privacy, termini, preferenze cookie
```

## 8. Testi (bozze in italiano, da far approvare)

- Hero: **BENNY STORE** · "Arte & abbigliamento" · "Le idee migliori per sorprendere. Gli oggetti unici che volevi."
- CTA: "Chiamaci" · "Scrivici" · "Vieni a trovarci".
- Categorie: Quadri d'autore · Classico moderno · Pop art · Abbigliamento · Oggettistica e idee regalo.
- Idee regalo: "Per chi è il regalo?" / "Per quale occasione?" / "Scrivici e ti aiutiamo a scegliere."
- Nessuna frase su prezzi, sconti, certificati o provenienza senza conferma del cliente.

---

## 9. Conformità e pubblicazione (20 punti, con i dati reali)

Testi legali = **bozze da far validare** al cliente o a un consulente.

1. **Privacy policy** (art. 13 GDPR): titolare Benny Store (ragione sociale da confermare), contatti, finalità (contatti, WhatsApp, mappe, analytics), basi giuridiche, conservazione, diritti, fornitori. Link nel footer e vicino a ogni modulo.
2. **Termini / note legali**; condizioni di vendita solo se ci sono ordini online (da chiedere).
3. **Cookie** (Linee guida Garante 2021): Accetta, Rifiuta, Personalizza; nessuno script con cookie prima del consenso; mappe e analytics dopo il consenso; "Preferenze cookie" nel footer; non riproporre prima di 6 mesi.
4. **Dati societari** nel footer: P.IVA 14931470968, via delle Betulle 1/3, Cesano Boscone (MI); **da chiedere**: ragione sociale e forma, codice fiscale, REA, PEC (e, se società di capitali, capitale sociale). Segnaposto evidenti finché mancano.
5. **Accessibilità** WCAG 2.2 AA; pausa per la rotazione del prisma; navigazione da tastiera; pagina Accessibilità se si vende online.
6. **CTA** chiara, una per schermata (telefono / email / indicazioni).
7. **FAQ** con dati strutturati `FAQPage` (orari, come arrivare, ritiro/valutazione di opere, spedizioni): solo con risposte vere, altrimenti segnaposto.
8. **Alt** descrittivi per ogni foto (cosa si vede, senza inventare autore o titolo); `alt=""` per le decorative.
9. **Analytics** privacy-friendly senza cookie, oppure dopo il consenso.
10. **Meta title** ≤ 60 caratteri, es. "Benny Store | Arte e abbigliamento a Cesano Boscone".
11. **Meta description** ≤ 155 caratteri con CTA.
12. **Open Graph / Twitter** con immagine 1200×630 vera del negozio.
13. **Favicon** completa (SVG, ICO, apple-touch 180 px, manifest).
14. **Canonical** e redirect www/non-www, http→https.
15. **robots.txt** · 16. **sitemap.xml**.
17. **404** nello stile del sito con link a home e CTA.
18. **Mobile** verificato da 360 px.
19. **Form**: validazione, errore/successo, honeypot, invio reale a un endpoint; se passa da WhatsApp o mailto, dirlo chiaramente. Mai "inviato" senza backend.
20. **Link rotti** (`tel:`, `mailto:`, interni, esterni) e **prestazioni** (AVIF/WebP, font ridotti, JS minimo, Lighthouse mobile ≥ 90, Accessibility ≥ 95).

Punti di attenzione sul settore (da far verificare al cliente o al consulente, non dati per certi): vendita di opere d'arte e oggetti usati/lotti (obblighi e registri dell'attività di commercio di usato), uso delle immagini di opere altrui sul sito, vendita a distanza se si apre un e-commerce (diritto di recesso, informazioni precontrattuali).

## 10. Da chiedere al cliente

- Ragione sociale, forma giuridica, codice fiscale, REA, PEC.
- Orari di apertura (per "aperto ora") e giorni di chiusura.
- Il numero 350 1330118 è anche WhatsApp?
- Profili social (Instagram?) e se vuole mostrarli.
- Vende solo in negozio o vuole un catalogo/e-commerce? Spedisce?
- Per ogni opera da mostrare: artista, titolo, tecnica, misure, stato, se è autenticata, se vuole mostrare il prezzo.
- Vuole una sezione "Vendi a noi / valutazione di quadri e lotti"?
- Autorizzazione a usare le foto della cartella (e se compaiono persone).
- Logo in alta risoluzione o file vettoriale (il blu del biglietto va campionato da lì).
- Preferenze sui toni: la sala al buio gli piace o preferisce un sito chiaro?
