// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import unocss from 'unocss/astro';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://handaru.dev',
  integrations: [
    vue(),
    unocss(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
    },
  },
});
