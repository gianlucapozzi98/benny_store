// Ritaglia e raddrizza ogni opera dalle foto originali: niente muro, niente cornice, solo il quadro.
// Per ogni opera: i 4 angoli (in millesimi della foto: alto-sx, alto-dx, basso-dx, basso-sx),
// poi un'omografia porta il quadrilatero fotografato in prospettiva su un rettangolo piatto.
// Scrive src/assets/opere/<slug>.jpg e src/data/opere-colori.json (colore dominante di ogni opera).
// Uso: npm run opere
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

const SRC = 'materiale/foto-originali';
const OUT = 'src/assets/opere';
const LATO_MAX = 2000;

// Le opere singole hanno una foto loro; le altre sono prese dalle foto delle pareti.
const OPERE = {
  'ombrello-rosso': ['ce20215b-4411-4da8-a457-8f718de38e9f.jpg', '8,100 890,54 945,900 17,913'],
  'sguardo-in-alto': ['28c0ae9b-c71a-453a-b247-25f886ab9313.jpg', '58,110 898,96 914,908 74,929'],
  'ritratto-in-giallo': ['d93d91c2-dada-41b1-8e91-cee8079d4c9f.jpg', '22,194 981,194 954,884 67,886'],
  'volto-rosa': ['aac0a1d0-f1a3-4fe8-8db2-a4aa5a651c20.jpg', '153,115 836,133 831,852 172,871'],
  'cupola-e-simboli': ['ae2d16c4-197d-4c9b-8449-92f440b3bb40.jpg', '50,307 928,296 933,767 53,773'],
  'pannocchie': ['50ea240d-6578-49e8-9c36-13083ba2a5ae.jpg', '181,236 774,209 784,673 200,673'],
  'il-chitarrista': ['3c8740ec-43d2-4b6e-b635-571484b09db1.jpg', '327,349 717,349 714,762 331,764'],
  'cerchi-blu': ['8ce5d84a-cf8a-473f-8d4e-9d9df410022b.jpg', '228,225 722,235 747,663 211,657'],
  'rosso-nel-nero': ['c4017c72-283d-4722-b14a-e5310149fc87.jpg', '225,236 796,230 802,804 225,802'],
  'manifesti-strappati': ['789e75d6-ee76-42da-b497-a3c911b8e680.jpg', '329,241 673,240 673,476 329,476'],
  'gocce': ['789e75d6-ee76-42da-b497-a3c911b8e680.jpg', '745,239 958,237 963,457 746,461'],
  'donna-in-rosa': ['69c7e412-6259-4a0f-8af7-8625e8a0ceeb.jpg', '317.5,464.5 424,467.5 424.5,589.5 318.5,592.5'],
  'figura-su-arancio': ['69c7e412-6259-4a0f-8af7-8625e8a0ceeb.jpg', '306,285 415.5,301.5 417,408 307,403'],
  'decappottabile-rossa': ['789e75d6-ee76-42da-b497-a3c911b8e680.jpg', '147,238 262.5,236 264,324.5 142.5,325.5'],
  'scooter-a-pois': ['789e75d6-ee76-42da-b497-a3c911b8e680.jpg', '141.5,356 267.5,355 271,449 140.5,449.5'],
};

/** Omografia che porta i punti `da` nei punti `a` (4 coppie), risolta con Gauss. */
function omografia(da, a) {
  const A = [], b = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = da[i], [u, v] = a[i];
    A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.push(u);
    A.push([0, 0, 0, x, y, 1, -v * x, -v * y]); b.push(v);
  }
  for (let c = 0; c < 8; c++) {
    let m = c;
    for (let r = c + 1; r < 8; r++) if (Math.abs(A[r][c]) > Math.abs(A[m][c])) m = r;
    [A[c], A[m]] = [A[m], A[c]]; [b[c], b[m]] = [b[m], b[c]];
    for (let r = 0; r < 8; r++) if (r !== c) {
      const f = A[r][c] / A[c][c];
      for (let k = c; k < 8; k++) A[r][k] -= f * A[c][k];
      b[r] -= f * b[c];
    }
  }
  return b.map((v, i) => v / A[i][i]);
}

async function raddrizza(file, angoli) {
  const { data, info } = await sharp(`${SRC}/${file}`).rotate().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;
  const P = angoli.split(/\s+/).map((p) => p.split(',').map(Number)).map(([x, y]) => [(x / 1000) * W, (y / 1000) * H]);
  const d = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
  const larg = (d(P[0], P[1]) + d(P[3], P[2])) / 2, alt = (d(P[0], P[3]) + d(P[1], P[2])) / 2;
  // mai oltre la risoluzione reale del quadro nella foto (+15%)
  const lato = Math.min(LATO_MAX, Math.round(Math.max(larg, alt) * 1.15));
  const ow = larg >= alt ? lato : Math.round((lato * larg) / alt);
  const oh = larg >= alt ? Math.round((lato * alt) / larg) : lato;

  const h = omografia([[0, 0], [ow, 0], [ow, oh], [0, oh]], P);
  const out = Buffer.alloc(ow * oh * C);
  for (let y = 0; y < oh; y++) for (let x = 0; x < ow; x++) {
    const X = x + 0.5, Y = y + 0.5, w = h[6] * X + h[7] * Y + 1;
    const u = (h[0] * X + h[1] * Y + h[2]) / w - 0.5, v = (h[3] * X + h[4] * Y + h[5]) / w - 0.5;
    const x0 = Math.max(0, Math.min(W - 2, Math.floor(u))), y0 = Math.max(0, Math.min(H - 2, Math.floor(v)));
    const fx = Math.min(1, Math.max(0, u - x0)), fy = Math.min(1, Math.max(0, v - y0));
    for (let c = 0; c < C; c++) {
      const i = (y0 * W + x0) * C + c;
      const sopra = data[i] * (1 - fx) + data[i + C] * fx;
      const sotto = data[i + W * C] * (1 - fx) + data[i + W * C + C] * fx;
      out[(y * ow + x) * C + c] = Math.round(sopra * (1 - fy) + sotto * fy);
    }
  }
  return sharp(out, { raw: { width: ow, height: oh, channels: C } });
}

const hex = ({ r, g, b }) => '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');

/** Il colore "che si ricorda" di un'opera: la tinta satura più presente (12 spicchi di tinta,
 *  ogni pixel pesa quanto è saturo e non troppo scuro né troppo chiaro). */
async function accento(img) {
  const { data } = await img.clone().resize(48, 48, { fit: 'fill' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const spicchi = Array.from({ length: 12 }, () => ({ peso: 0, r: 0, g: 0, b: 0 }));
  for (let i = 0; i < data.length; i += 3) {
    const r = data[i] / 255, g = data[i + 1] / 255, b = data[i + 2] / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, d = max - min;
    if (d < 0.08) continue;
    const s = d / (1 - Math.abs(2 * l - 1));
    let t = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    t = (t * 60 + 360) % 360;
    const peso = s * s * (1 - Math.abs(l - 0.5) * 2) ** 2;
    if (peso <= 0) continue;
    const k = spicchi[Math.floor(t / 30) % 12];
    k.peso += peso; k.r += data[i] * peso; k.g += data[i + 1] * peso; k.b += data[i + 2] * peso;
  }
  const top = spicchi.reduce((a, k) => (k.peso > a.peso ? k : a));
  return top.peso ? hex({ r: top.r / top.peso, g: top.g / top.peso, b: top.b / top.peso }) : '#3e3f44';
}

await mkdir(OUT, { recursive: true });
const colori = {};
for (const [slug, [file, angoli]] of Object.entries(OPERE)) {
  const img = await raddrizza(file, angoli);
  const info = await img.clone().jpeg({ quality: 90, mozjpeg: true }).toFile(`${OUT}/${slug}.jpg`);
  const colore = await accento(img);
  colori[slug] = { accento: colore, larghezza: info.width, altezza: info.height };
  console.log(slug.padEnd(22), `${info.width}x${info.height}`.padEnd(10), colore, Math.round(info.size / 1024) + ' KB');
}
await writeFile('src/data/opere-colori.json', JSON.stringify(colori, null, 2) + '\n');
