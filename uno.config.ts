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
          'radial-gradient(56.52% 56.52% at 50% 50%, rgba(43, 26, 60, 0.00) 54.5%, rgba(107, 104, 255, 0.15) 100%)',
      },
    ],
  ],
  preflights: [
    {
      getCSS: () => `
      :root {
        --brand: 241 49.50% 78.20%;
      }
      `,
    },
  ],
  theme: {
    colors: {
      brand: 'hsl(var(--brand))',
    },
  },
  safelist: ['animate-fade-in', '!animate-duration-360'],
  transformers: [transformerVariantGroup()],
}

export default defineConfig(config)
