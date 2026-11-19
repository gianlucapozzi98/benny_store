// Copia le foto originali (materiale/foto-originali) in src/assets/foto con nomi descrittivi,
// orientamento corretto e lato lungo max 2400 px. Astro genera poi AVIF/WebP responsive.
// Uso: npm run foto
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'materiale/foto-originali';
const OUT = 'src/assets/foto';

export const MAPPA = {
  '3185c8ab-af0a-4f18-b0b6-7f23b392700b.jpg': 'negozio-sala-pilastro.jpg',
  'd5637dd3-c769-498f-a722-277c57ea56cc.jpg': 'negozio-abbigliamento.jpg',
  '69c7e412-6259-4a0f-8af7-8625e8a0ceeb.jpg': 'negozio-angolo-classico-vetrina.jpg',
  '7b9b3f57-73fc-4137-a050-03f11882e054.jpg': 'negozio-parete-classico-led.jpg',
  '952dc8ed-f270-4556-bf8d-a90a4e420e89.jpg': 'negozio-visitatore-parete-classico.jpg',
  'd7d149db-ad97-4af1-ab4d-fad5dc7d3b88.jpg': 'negozio-visitatore-seduto.jpg',
  '789e75d6-ee76-42da-b497-a3c911b8e680.jpg': 'negozio-parete-grafiche.jpg',
  'cc85046e-65aa-43ef-9278-9507f6a0a199.jpg': 'negozio-parete-pop-wow.jpg',
  'd93d91c2-dada-41b1-8e91-cee8079d4c9f.jpg': 'opera-pop-ritratto-giallo.jpg',
  '28c0ae9b-c71a-453a-b247-25f886ab9313.jpg': 'opera-pop-ritratto-verde.jpg',
  'aac0a1d0-f1a3-4fe8-8db2-a4aa5a651c20.jpg': 'opera-grafica-volto-rosa.jpg',
  'ae2d16c4-197d-4c9b-8449-92f440b3bb40.jpg': 'opera-grafica-composizione-sacra.jpg',
  '50ea240d-6578-49e8-9c36-13083ba2a5ae.jpg': 'opera-grafica-pannocchie.jpg',
  'ce20215b-4411-4da8-a457-8f718de38e9f.jpg': 'opera-stampa-ombrello-rosso.jpg',
  '3c8740ec-43d2-4b6e-b635-571484b09db1.jpg': 'opera-disegno-chitarrista.jpg',
  '8ce5d84a-cf8a-473f-8d4e-9d9df410022b.jpg': 'opera-materica-blu.jpg',
  'c4017c72-283d-4722-b14a-e5310149fc87.jpg': 'opera-materica-rossa.jpg',
};

await mkdir(OUT, { recursive: true });
for (const [src, dst] of Object.entries(MAPPA)) {
  const info = await sharp(`${SRC}/${src}`)
    .rotate()
    .resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(`${OUT}/${dst}`);
  console.log(dst, `${info.width}x${info.height}`, Math.round(info.size / 1024) + ' KB');
}
