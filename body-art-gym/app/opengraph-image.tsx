import { ImageResponse } from 'next/og';

export const alt = 'Body Art Gym — Built the old-school way. BMCHS Sharafabad, Karachi.';
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
          background: 'radial-gradient(circle at 78% 40%, #8A3A12 0%, #2A1B12 45%, #120B07 100%)',
          color: '#F1E6D2',
          padding: 64,
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', inset: 20, border: '2px solid rgba(241,230,210,0.25)', display: 'flex' }} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '62%' }}>
          <div style={{ display: 'flex', fontSize: 26, letterSpacing: 8, color: '#E8905E' }}>BODY ART GYM · KARACHI</div>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 104, fontWeight: 800, lineHeight: 0.92, letterSpacing: -2 }}>
            <span>BUILT THE</span>
            <span style={{ color: '#DB6B2E' }}>OLD-SCHOOL</span>
            <span>WAY.</span>
          </div>
          <div style={{ display: 'flex', fontSize: 24, letterSpacing: 4, color: 'rgba(241,230,210,0.75)' }}>
            MON — SAT · 8:00 AM — 1:00 AM · 0344 2886383
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38%' }}>
          <div
            style={{
              width: 340,
              height: 340,
              borderRadius: 999,
              border: '4px solid #F1E6D2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 250,
                height: 250,
                borderRadius: 999,
                border: '3px solid #C4541C',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: 18, height: 56, background: '#C4541C' }} />
                <div style={{ width: 12, height: 38, background: '#C4541C', marginLeft: 3 }} />
                <div style={{ width: 90, height: 10, background: '#C4541C' }} />
                <div style={{ width: 12, height: 38, background: '#C4541C', marginRight: 3 }} />
                <div style={{ width: 18, height: 56, background: '#C4541C' }} />
              </div>
              <div style={{ display: 'flex', fontSize: 46, fontWeight: 800, marginTop: 14 }}>BODY ART</div>
              <div style={{ display: 'flex', fontSize: 22, letterSpacing: 10, background: '#C4541C', color: '#1E130D', padding: '4px 28px', marginTop: 6 }}>
                GYM
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
