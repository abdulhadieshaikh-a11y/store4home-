import { ImageResponse } from 'next/og';

export const alt = 'Carnage Gym — 24-hour gym in DHA Phase 6, Karachi';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#050505',
          color: '#F7F6F3',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 22, letterSpacing: 8, color: '#8C8C8A' }}>KARACHI · DHA PHASE 6</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 180, fontWeight: 900, letterSpacing: -4, lineHeight: 0.9 }}>CARNAGE</div>
          <div style={{ fontSize: 40, letterSpacing: 18, marginTop: 16, color: '#B9B8B4' }}>GYM</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, letterSpacing: 4, borderTop: '1px solid #2A2A2A', paddingTop: 28 }}>
          <span>MON – SAT · OPEN 24 HOURS</span>
          <span style={{ color: '#8C8C8A' }}>0300 6652819</span>
        </div>
      </div>
    ),
    size,
  );
}
