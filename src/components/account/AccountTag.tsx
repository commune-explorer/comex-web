import * as React from 'react'

import type { IAccountTag } from '@/types'

export function AccountTag({ tag }: { tag: IAccountTag }) {
  return (
    <span
      className={`border m-0.5 p-1 text-size-3 break-all`}
      style={{
        color: tag.color,
        borderColor: tag.color,
        borderRadius: '6px',
        backgroundColor: convertAlpha(tag.color, 0.15),
      }}
    >
      {tag.text}
    </span>
  )
}
function convertAlpha(rgbaString: string | undefined, newAlpha: number): string | undefined {
  if (!rgbaString) {
    return rgbaString
  }
  const rgbaRegex = /rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),([01]?\.?\d*)\)/
  const newRgbaString = rgbaString.replace(rgbaRegex, `rgba($1,$2,$3,${newAlpha})`)

  return newRgbaString
}
