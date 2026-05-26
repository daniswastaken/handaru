// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import unocss from 'unocss/astro';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://handaru.dev',
  trailingSlash: 'always',
  integrations: [
    vue(),
    unocss(),
    sitemap({ filenameBase: 'sitemap' }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
    },
  },
});
