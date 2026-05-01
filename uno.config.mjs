// x:/handaru/uno.config.mjs
import {
  defineConfig,
  presetWind3,
  presetIcons,
  presetAttributify,
  presetWebFonts
} from 'unocss';

export default defineConfig({
    shortcuts: [
    {
      'btn-blue': 'flex items-center gap-2 px-3 py-1 rounded border border-blue/20 bg-blue/5 hover:bg-blue/10 transition-colors',
      'btn-lime': 'flex items-center gap-2 px-3 py-1 rounded border border-lime/20 bg-lime/5 hover:bg-lime/10 transition-colors',
    }
  ],
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
        sans: 'Inter',
        mono: 'JetBrains Mono',
      },
    }),
  ],
});
