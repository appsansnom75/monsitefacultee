import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f172a', // Le bleu nuit exact de ton site
          width: '100%',
          height: '100%',
          borderRadius: '4px', // Un carré légèrement arrondi pour être propre
        }}
      />
    ),
    {
      ...size,
    }
  )
}