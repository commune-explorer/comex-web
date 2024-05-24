import { SVG } from '@svgdotjs/svg.js'
import { useWindowSize } from 'usehooks-ts'

import { sleep } from '@/utils'

export const useSvgBg = (color: string = '#6b68ff') => {
  const { width } = useWindowSize()
  const svgRef = useCallback(
    async (target?: HTMLDivElement | HTMLButtonElement | HTMLAnchorElement | null) => {
      if (!target) return
      const hasSvg = target.querySelector('.random-svg-bg')
      if (hasSvg) {
        target.removeChild(hasSvg)
      }

      // wait for the element to be rendered
      await sleep(48)

      const wrapperSize = target?.getBoundingClientRect()
      const w = wrapperSize!.width
      const h = wrapperSize!.height
      const side = 8

      const draw = SVG().addTo(target).size('100%', '100%')
      draw
        .polyline([0, side, 0, 0, side, 0])
        .stroke({ color, width: 2, linecap: 'square', linejoin: 'round' })
        .fill('transparent')

      draw
        .polyline([w - side, 0, w, 0, w, side])
        .stroke({ color, width: 2, linecap: 'square', linejoin: 'round' })
        .fill('transparent')

      draw
        .polyline([0, h - side, 0, h, side, h])
        .stroke({ color, width: 2, linecap: 'square', linejoin: 'round' })
        .fill('transparent')

      draw
        .polyline([w, h - side, w, h, w - side, h])
        .stroke({ color, width: 2, linecap: 'square', linejoin: 'round' })
        .fill('transparent')

      draw.addClass('absolute top-0 left-0 random-svg-bg')
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [width]
  )

  return {
    svgRef,
  }
}
