// x:/handaru/uno.config.mjs
import {
  defineConfig,
  presetWind3,
  presetIcons,
  presetAttributify,
  presetWebFonts
} from 'unocss';

export default defineConfig({
  presets: [
    presetWind3(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'height': '1.2em',
        'width': '1.2em',
        'vertical-align': 'text-bottom',
      },
    }),
    presetAttributify(),
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,600,700,800',
        mono: 'JetBrains Mono',
      },
    }),
  ],
});
