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
          'radial-gradient(56.52% 56.52% at 50% 50%, rgba(43, 26, 60, 0.00) 54.5%, rgba(107, 104, 255, 0.15) 100%), radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
        boxShadow: '0 0 15px 3px rgba(107, 104, 255, 0.4), 0 0 30px 5px rgba(107, 104, 255, 0.2)',
      },
    ],
    [
      'btn-brand-bg-bold',
      {
        background:
          'radial-gradient(56.52% 56.52% at 50% 50%, rgba(43, 26, 60, 0.00) 54.5%, rgba(107, 104, 255, 0.3) 100%), radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 70%)',
        boxShadow: '0 0 20px 5px rgba(107, 104, 255, 0.6), 0 0 40px 10px rgba(107, 104, 255, 0.4)',
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
          --brand: 241 49.50% 78.20%;
          --border: 241 49.50% 78.20% / 0.15;
          --foreground: 0 0% 100%;
          --muted: 237.76 22.998% 15.007%;
          --muted-foreground: 0 0% 80%;
          --accent: 241 49.50% 78.20% / 0.30;
          --accent-foreground: 0 0% 100%;
          --radius: 0rem;
          --blue: #447EF2;
          --green: #22EAAE;
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