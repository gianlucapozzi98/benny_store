// @ts-check
import { defineConfig } from 'astro/config';

// Indirizzo pubblico attuale (Vercel). Con un dominio proprio: SITE_URL=https://... npm run build
const SITE = process.env.SITE_URL ?? 'https://bennystore.vercel.app';

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  image: { responsiveStyles: false },
  devToolbar: { enabled: false },
});
