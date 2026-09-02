import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'NB FASHION | Pabrik Konveksi & Garment';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom, #1e3a8a, #0f172a)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 80,
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            letterSpacing: '-0.05em',
            marginBottom: 20,
            color: 'white',
            textShadow: '0 4px 10px rgba(0,0,0,0.5)'
          }}
        >
          NB FASHION
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 400,
            color: '#93c5fd',
            textAlign: 'center',
            marginBottom: 60,
          }}
        >
          Pabrik Konveksi & Garment Industri
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 32,
            fontWeight: 400,
            color: '#cbd5e1',
            background: 'rgba(255,255,255,0.15)',
            padding: '20px 40px',
            borderRadius: 50,
            border: '2px solid rgba(255,255,255,0.2)',
          }}
        >
          The Power of Cikijing Garment Industry
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
