import {
  defineConfig,
  presetUno,
  presetIcons,
  presetAttributify,
  presetWind3,
  presetWebFonts,
} from 'unocss';

export default defineConfig({
  shortcuts: [
    {
      'bg-base': 'bg-white dark:bg-black',
      'color-base': 'text-black dark:text-white',
      'border-base': 'border-[#8884]',
    },
    [/^btn-(\w+)$/, ([_, color]) => `text-zinc-200 op50 px-2.5 h-35px inline-flex items-center gap-1 transition-all duration-200 ease-out no-underline! hover:op100 hover:text-${color} hover:bg-${color}/10 border border-solid border-base! rounded-2px`],
  ],
  presets: [
    presetWind3(),
    presetUno(),
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
        sans: 'Inter:400,600,700,900',
        mono: 'JetBrains Mono',
      },
    }),
  ],
});
