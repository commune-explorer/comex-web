import React from 'react'

const decodeHexString = (hexString: string): string => {
  try {
    return decodeURIComponent(hexString.replace(/^0x/, '').replace(/[0-9a-f]{2}/g, '%$&'))
  } catch (error) {
    return hexString // Return original string if decoding fails
  }
}

export const JSONObjectContainer: React.FC<{ data: any; depth?: number }> = ({ data, depth = 0 }) => {
  if (typeof data !== 'object' || data === null) {
    if (typeof data === 'string' && data.startsWith('0x')) {
      return (
        <span>
          {decodeHexString(data)} (hex: {data})
        </span>
      )
    }
    return <span>{JSON.stringify(data)}</span>
  }

  return (
    <div style={{ marginLeft: `${depth * 20}px` }}>
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <span>{key}: </span>
          {typeof value === 'string' && value.startsWith('{') && value.endsWith('}') ? (
            <JSONObjectContainer data={JSON.parse(value)} depth={depth + 1} />
          ) : (
            <JSONObjectContainer data={value} depth={depth + 1} />
          )}
        </div>
      ))}
    </div>
  )
}
