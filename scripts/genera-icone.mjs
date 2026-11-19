// Genera immagine Open Graph (1200×630, foto vera del negozio) e favicon.
// Uso: node scripts/genera-icone.mjs
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const OUT = 'public';

// Open Graph: ritaglio orizzontale della foto della sala
const sala = sharp('src/assets/foto/negozio-sala-pilastro.jpg').resize({ width: 1200 });
const buf = await sala.toBuffer();
await sharp(buf).extract({ left: 0, top: 470, width: 1200, height: 630 })
  .modulate({ brightness: 0.96 })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(`${OUT}/og.jpg`);

// Favicon: monogramma B in avorio su indaco (il colore del logo)
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#3D40C4"/>
  <text x="32" y="47" text-anchor="middle" font-family="Montserrat, 'Arial Black', Helvetica, Arial, sans-serif" font-weight="900" font-size="44" fill="#F4F2EC">B</text>
</svg>`;
await writeFile(`${OUT}/favicon.svg`, svg);

const png = (s, pad = 0) => sharp(Buffer.from(svg), { density: 600 })
  .resize(s - pad * 2, s - pad * 2)
  .extend({ top: pad, bottom: pad, left: pad, right: pad, background: '#16171a' })
  .png().toBuffer();

await writeFile(`${OUT}/apple-touch-icon.png`, await png(180, 0));
await writeFile(`${OUT}/icon-192.png`, await png(192));
await writeFile(`${OUT}/icon-512.png`, await png(512));
await writeFile(`${OUT}/icon-maskable-512.png`, await png(512, 56));

// favicon.ico con PNG 32×32 incorporato
const p32 = await png(32);
const head = Buffer.alloc(22);
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(1, 4);
head.writeUInt8(32, 6); head.writeUInt8(32, 7); head.writeUInt8(0, 8); head.writeUInt8(0, 9);
head.writeUInt16LE(1, 10); head.writeUInt16LE(32, 12);
head.writeUInt32LE(p32.length, 14); head.writeUInt32LE(22, 18);
await writeFile(`${OUT}/favicon.ico`, Buffer.concat([head, p32]));

await writeFile(`${OUT}/site.webmanifest`, JSON.stringify({
  name: 'Benny Store', short_name: 'Benny Store', lang: 'it',
  start_url: '/', display: 'browser', background_color: '#16171a', theme_color: '#16171a',
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
}, null, 2));
console.log('ok');
