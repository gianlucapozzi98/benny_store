// @ts-check
import { defineConfig } from 'astro/config';

// DA CONFERMARE: dominio definitivo del sito (serve per canonical, sitemap, Open Graph).
const SITE = process.env.SITE_URL ?? 'https://www.bennystore.example';

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  image: { responsiveStyles: false },
  devToolbar: { enabled: false },
});
