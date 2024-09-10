import React from 'react'
import ReactJson from 'react-json-view'

const decodeHexString = (hexString: string): string => {
  try {
    const decoded = decodeURIComponent(hexString.replace(/^0x/, '').replace(/[0-9a-f]{2}/g, '%$&'))
    if (/[^\x20-\x7E]/.test(decoded)) {
      // If it contains special characters, try to interpret it as a number
      const hex = hexString.replace(/^0x/, '')
      if (/^[0-9a-fA-F]+$/.test(hex)) {
        const bigIntValue = BigInt(`0x${hex}`)
        return bigIntValue.toString()
      }
    }
    return decoded
  } catch (error) {
    try {
      const hex = hexString.replace(/^0x/, '')
      if (/^[0-9a-fA-F]+$/.test(hex)) {
        const bigIntValue = BigInt(`0x${hex}`)
        return bigIntValue.toString()
      }
    } catch (e) {}
    return hexString // Return original string if decoding fails
  }
}

const decodeHexInObject = (obj: any): any => {
  if (typeof obj !== 'object' || obj === null) {
    if (typeof obj === 'string' && obj.startsWith('0x')) {
      return decodeHexString(obj)
    }
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(decodeHexInObject)
  }

  const result: { [key: string]: any } = {}
  for (const [key, value] of Object.entries(obj)) {
    result[key] = decodeHexInObject(value)
  }
  return result
}

export const JSONObjectContainer: React.FC<{ data: any; depth?: number }> = ({ data, depth = 0 }) => {
  const decodedData = React.useMemo(() => decodeHexInObject(data), [data])

  return (
    <ReactJson
      src={decodedData}
      theme="greenscreen"
      iconStyle="square"
      collapsed={1}
      displayDataTypes={false}
      name={false}
      collapseStringsAfterLength={15}
    />
  )
}
