import transformerVariantGroup from '@unocss/transformer-variant-group'
import { defineConfig, presetIcons, presetUno, presetWind, UserConfig } from 'unocss'
import { presetAnimations } from 'unocss-preset-animations'
import { presetShadcn } from 'unocss-preset-shadcn'

const config: UserConfig = {
  presets: [presetUno(), presetWind(), presetIcons(), presetAnimations(), presetShadcn()],
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
      'flex-col-center': 'flex flex-col justify-center items-center',
    },
  ],
  rules: [
    [
      'btn-brand-bg',
      {
        background:
          'radial-gradient(56.52% 56.52% at 50% 50%, rgba(39, 171, 132, 0.00) 54.5%, rgba(39, 171, 132, 0.1) 100%), radial-gradient(circle at center, rgba(39, 171, 132, 0.05) 0%, rgba(39, 171, 132, 0) 70%)',
        boxShadow: '0 0 15px 3px rgba(39, 171, 132, 0.4), 0 0 30px 5px rgba(39, 171, 132, 0.2)',
      },
    ],
    [
      'btn-brand-bg-bold',
      {
        background:
          'radial-gradient(56.52% 56.52% at 50% 50%, rgba(39, 171, 132, 0.00) 54.5%, rgba(39, 171, 132, 0.1) 100%), radial-gradient(circle at center, rgba(39, 171, 132, 0.05) 0%, rgba(39, 171, 132, 0) 70%)',
        boxShadow: '0 0 20px 5px rgba(39, 171, 132, 0.6), 0 0 40px 10px rgba(39, 171, 132, 0.4)',
      },
    ],
    [
      'neon-text',
      {
        textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor',
      },
    ],
  ],
  preflights: [
    {
      getCSS: () => `
        :root {
          --brand: 150.00 87.25% 40.86%;
          --border: 135.00 77.25% 36.86% / 0.15;
          --foreground: 0 0% 100%;
          --muted: 237.76 22.998% 15.007%;
          --muted-foreground: 0 0% 80%;
          --accent: 135.00 77.25% 36.86% / 0.30;
          --accent-foreground: 0 0% 100%;
          --radius: 0rem;
          --blue: #447EF2;
          --lightblue: #6d99f2;
          --green: #22EAAE;
          --red: #F24444;
          --pink: #ed6666;
          --yellow: #FEC464;
          --purple: #9A7CE0;
        }
      `,
    },
  ],
  theme: {
    colors: {
      brand: 'hsl(var(--brand))',
    },
  },
  safelist: ['animate-fade-in', '!animate-duration-360', 'neon-text'],
  transformers: [transformerVariantGroup()],
}

export default defineConfig(config)
