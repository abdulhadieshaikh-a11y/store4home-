import { useId, type ReactNode } from 'react';

/**
 * Original, hand-built vintage illustrations used as the site's default imagery.
 * Each scene is a full-bleed SVG that crops like a photograph (`slice`), lit like
 * a studio shot: warm spotlight, rim light, sunburst rays and a halftone floor.
 *
 * Swap any of them for real photography through <Visual image="/images/x.jpg" />.
 */

export type ArtName = 'barbell' | 'dumbbell' | 'kettlebell' | 'arm' | 'rack' | 'plates' | 'bench';
export type ArtTone = 'dark' | 'ember' | 'cream';

type Palette = {
  bgTop: string;
  bgBottom: string;
  glow: string;
  glowOpacity: number;
  rays: string;
  raysOpacity: number;
  metalHi: string;
  metalLo: string;
  edge: string;
  rim: string;
  rimOpacity: number;
  detail: string;
  halftone: string;
  halftoneOpacity: number;
  shadow: string;
  brass: string;
};

const palettes: Record<ArtTone, Palette> = {
  dark: {
    bgTop: '#2E1D13',
    bgBottom: '#100A06',
    glow: '#C0581F',
    glowOpacity: 0.5,
    rays: '#D8BD8C',
    raysOpacity: 0.07,
    metalHi: '#4A3223',
    metalLo: '#0C0805',
    edge: '#1A110B',
    rim: '#E8905E',
    rimOpacity: 0.95,
    detail: '#6B4A33',
    halftone: '#C4541C',
    halftoneOpacity: 0.22,
    shadow: '#000000',
    brass: '#C7A56E',
  },
  ember: {
    bgTop: '#D2642C',
    bgBottom: '#8E3710',
    glow: '#F6B07A',
    glowOpacity: 0.55,
    rays: '#FBF6EC',
    raysOpacity: 0.12,
    metalHi: '#3F2A1C',
    metalLo: '#120B07',
    edge: '#1E130D',
    rim: '#FBE3C4',
    rimOpacity: 0.85,
    detail: '#5A3D2A',
    halftone: '#1E130D',
    halftoneOpacity: 0.16,
    shadow: '#3A1405',
    brass: '#F1E6D2',
  },
  cream: {
    bgTop: '#F6EEDF',
    bgBottom: '#DCC7A4',
    glow: '#FFFFFF',
    glowOpacity: 0.7,
    rays: '#C4541C',
    raysOpacity: 0.09,
    metalHi: '#4D3322',
    metalLo: '#140D08',
    edge: '#24170F',
    rim: '#C4541C',
    rimOpacity: 0.95,
    detail: '#6B4A33',
    halftone: '#3A2619',
    halftoneOpacity: 0.12,
    shadow: '#5A3D2A',
    brass: '#B8935A',
  },
};

type Ctx = { id: (s: string) => string; p: Palette };

/* ────────────────────────────── primitives ────────────────────────────── */

/** A weight plate seen at three-quarters. `dir` = side the plate thickness extends to. */
function Plate({
  c,
  cx,
  cy,
  r,
  k = 0.42,
  t = 26,
  dir = 1,
}: {
  c: Ctx;
  cx: number;
  cy: number;
  r: number;
  k?: number;
  t?: number;
  dir?: 1 | -1;
}) {
  const rx = r * k;
  const bx = cx + t * dir;
  const sweep = dir === 1 ? 0 : 1;
  return (
    <g>
      <ellipse cx={bx} cy={cy} rx={rx} ry={r} fill={c.p.edge} />
      <rect x={Math.min(cx, bx)} y={cy - r} width={t} height={r * 2} fill={c.p.edge} />
      <line x1={cx} y1={cy - r} x2={bx} y2={cy - r} stroke={c.p.rim} strokeOpacity={0.35} strokeWidth={2} />
      <ellipse cx={cx} cy={cy} rx={rx} ry={r} fill={`url(#${c.id('face')})`} />
      <ellipse cx={cx} cy={cy} rx={rx * 0.9} ry={r * 0.9} fill="none" stroke={c.p.metalLo} strokeWidth={3} strokeOpacity={0.8} />
      <ellipse cx={cx} cy={cy} rx={rx * 0.64} ry={r * 0.64} fill="none" stroke={c.p.detail} strokeWidth={2} strokeOpacity={0.55} />
      <ellipse cx={cx} cy={cy} rx={rx * 0.24} ry={r * 0.24} fill={c.p.metalLo} />
      <ellipse cx={cx} cy={cy} rx={rx * 0.24} ry={r * 0.24} fill="none" stroke={c.p.rim} strokeOpacity={0.35} strokeWidth={2} />
      <path
        d={`M ${cx} ${cy - r} A ${rx} ${r} 0 0 ${sweep} ${cx} ${cy + r}`}
        fill="none"
        stroke={c.p.rim}
        strokeOpacity={c.p.rimOpacity}
        strokeWidth={4}
        strokeLinecap="round"
      />
    </g>
  );
}

/** A cylinder between two points, used for bars and handles. */
function Bar({ c, x1, y1, x2, y2, w1, w2, fill }: { c: Ctx; x1: number; y1: number; x2: number; y2: number; w1: number; w2: number; fill?: string }) {
  const a = Math.atan2(y2 - y1, x2 - x1) + Math.PI / 2;
  const dx = Math.cos(a);
  const dy = Math.sin(a);
  const d = `M ${x1 + (dx * w1) / 2} ${y1 + (dy * w1) / 2} L ${x2 + (dx * w2) / 2} ${y2 + (dy * w2) / 2} L ${x2 - (dx * w2) / 2} ${y2 - (dy * w2) / 2} L ${x1 - (dx * w1) / 2} ${y1 - (dy * w1) / 2} Z`;
  return (
    <g>
      <path d={d} fill={fill ?? `url(#${c.id('steel')})`} />
      <path
        d={`M ${x1 - (dx * w1) / 2} ${y1 - (dy * w1) / 2} L ${x2 - (dx * w2) / 2} ${y2 - (dy * w2) / 2}`}
        stroke={c.p.rim}
        strokeOpacity={0.8}
        strokeWidth={2}
      />
    </g>
  );
}

function Rays({ c, cx, cy, count = 36 }: { c: Ctx; cx: number; cy: number; count?: number }) {
  const R = 1600;
  const step = (Math.PI * 2) / count;
  const paths: string[] = [];
  for (let i = 0; i < count; i += 2) {
    const a1 = i * step;
    const a2 = a1 + step;
    paths.push(
      `M ${cx} ${cy} L ${(cx + Math.cos(a1) * R).toFixed(1)} ${(cy + Math.sin(a1) * R).toFixed(1)} L ${(cx + Math.cos(a2) * R).toFixed(1)} ${(cy + Math.sin(a2) * R).toFixed(1)} Z`,
    );
  }
  return <path d={paths.join(' ')} fill={c.p.rays} fillOpacity={c.p.raysOpacity} />;
}

function Floor({ c, cx, cy, rx, ry }: { c: Ctx; cx: number; cy: number; rx: number; ry: number }) {
  return (
    <>
      <rect x={0} y={cy - 40} width={800} height={1000 - cy + 40} fill={`url(#${c.id('dots')})`} opacity={c.p.halftoneOpacity} />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={c.p.shadow} opacity={0.55} filter={`url(#${c.id('blur')})`} />
    </>
  );
}

/* ─────────────────────────────── scenes ─────────────────────────────── */

function Barbell({ c }: { c: Ctx }) {
  return (
    <g>
      <Rays c={c} cx={560} cy={330} />
      <Floor c={c} cx={420} cy={900} rx={420} ry={50} />
      {/* far end */}
      <Bar c={c} x1={700} y1={255} x2={760} y2={225} w1={20} w2={18} />
      <Plate c={c} cx={660} cy={280} r={132} t={16} />
      <Plate c={c} cx={640} cy={290} r={132} t={16} />
      <Plate c={c} cx={622} cy={299} r={100} t={14} />
      {/* shaft */}
      <Bar c={c} x1={250} y1={640} x2={620} y2={300} w1={26} w2={14} />
      <g opacity={0.5}>
        {Array.from({ length: 14 }).map((_, i) => {
          const f = 0.3 + i * 0.035;
          const x = 250 + (620 - 250) * f;
          const y = 640 + (300 - 640) * f;
          return <line key={i} x1={x - 6} y1={y - 8} x2={x + 6} y2={y + 8} stroke={c.p.metalLo} strokeWidth={2} />;
        })}
      </g>
      {/* near end */}
      <Plate c={c} cx={318} cy={600} r={170} t={24} />
      <Plate c={c} cx={282} cy={625} r={270} t={30} />
      <Plate c={c} cx={236} cy={655} r={270} t={30} />
      <Bar c={c} x1={236} y1={655} x2={80} y2={790} w1={40} w2={44} />
      <ellipse cx={80} cy={790} rx={10} ry={22} transform="rotate(-40 80 790)" fill={c.p.metalLo} stroke={c.p.rim} strokeOpacity={0.7} strokeWidth={2} />
    </g>
  );
}

function Dumbbell({ c }: { c: Ctx }) {
  return (
    <g>
      <Rays c={c} cx={420} cy={380} />
      <Floor c={c} cx={410} cy={860} rx={360} ry={46} />
      {/* far head */}
      <Plate c={c} cx={600} cy={380} r={150} t={70} />
      <Plate c={c} cx={560} cy={400} r={150} t={40} />
      {/* knurled handle */}
      <Bar c={c} x1={330} y1={560} x2={560} y2={400} w1={52} w2={42} fill={`url(#${c.id('brass')})`} />
      <g opacity={0.45}>
        {Array.from({ length: 16 }).map((_, i) => {
          const f = 0.12 + i * 0.05;
          const x = 330 + (560 - 330) * f;
          const y = 560 + (400 - 560) * f;
          return <line key={i} x1={x - 14} y1={y - 20} x2={x + 14} y2={y + 20} stroke={c.p.metalLo} strokeWidth={2.5} />;
        })}
      </g>
      {/* near head */}
      <Plate c={c} cx={300} cy={580} r={200} t={50} />
      <Plate c={c} cx={250} cy={610} r={200} t={60} />
    </g>
  );
}

function Kettlebell({ c }: { c: Ctx }) {
  const g = c.id('bell');
  return (
    <g>
      <Rays c={c} cx={400} cy={560} />
      <Floor c={c} cx={400} cy={860} rx={300} ry={40} />
      <path
        d="M 250 520 C 230 360, 270 190, 400 190 C 530 190, 570 360, 550 520"
        fill="none"
        stroke={c.p.metalLo}
        strokeWidth={70}
        strokeLinecap="round"
      />
      <path
        d="M 250 520 C 230 360, 270 190, 400 190 C 530 190, 570 360, 550 520"
        fill="none"
        stroke={c.p.metalHi}
        strokeWidth={50}
        strokeLinecap="round"
      />
      <path d="M 262 470 C 246 340, 290 222, 400 222" fill="none" stroke={c.p.rim} strokeOpacity={0.55} strokeWidth={4} strokeLinecap="round" />
      <path d="M 170 640 C 170 480, 280 420, 400 420 C 520 420, 630 480, 630 640 C 630 760, 560 830, 400 842 C 240 830, 170 760, 170 640 Z" fill={`url(#${g})`} />
      <path d="M 630 640 C 630 760, 560 830, 400 842" fill="none" stroke={c.p.rim} strokeOpacity={c.p.rimOpacity} strokeWidth={5} strokeLinecap="round" />
      <path d="M 196 580 C 214 488, 300 446, 384 440" fill="none" stroke={c.p.rim} strokeOpacity={0.4} strokeWidth={3} strokeLinecap="round" />
      <ellipse cx={400} cy={842} rx={150} ry={14} fill={c.p.metalLo} />
      {/* embossed star */}
      <path d={starPath(400, 640, 46, 20)} fill="none" stroke={c.p.rim} strokeOpacity={0.5} strokeWidth={2.5} />
    </g>
  );
}

function Arm({ c }: { c: Ctx }) {
  const d =
    'M -20 600 C 60 572, 130 548, 190 530 C 230 430, 350 380, 450 426 C 478 440, 494 462, 502 482 C 490 430, 474 372, 484 322 C 472 280, 486 222, 526 200 C 566 172, 648 172, 688 204 C 728 236, 722 296, 696 326 C 708 410, 728 520, 706 640 C 694 722, 640 776, 556 786 C 420 806, 250 806, 150 796 C 90 792, 30 800, -20 808 Z';
  return (
    <g>
      <Rays c={c} cx={560} cy={360} />
      <path d={d} fill={`url(#${c.id('skin')})`} />
      {/* rim light along the top contour */}
      <path
        d="M -20 600 C 60 572, 130 548, 190 530 C 230 430, 350 380, 450 426"
        fill="none"
        stroke={c.p.rim}
        strokeOpacity={c.p.rimOpacity}
        strokeWidth={5}
        strokeLinecap="round"
      />
      <path d="M 688 204 C 728 236, 722 296, 696 326 C 708 410, 728 520, 706 640" fill="none" stroke={c.p.rim} strokeOpacity={0.7} strokeWidth={4} strokeLinecap="round" />
      {/* muscle & finger detail */}
      <g fill="none" stroke={c.p.metalLo} strokeOpacity={0.65} strokeWidth={4} strokeLinecap="round">
        <path d="M 230 560 C 300 620, 420 610, 492 540" />
        <path d="M 540 360 C 580 420, 600 520, 590 640" />
        <path d="M 520 250 C 560 238, 600 240, 640 252" />
        <path d="M 512 290 C 556 280, 610 282, 660 296" />
        <path d="M 590 206 C 598 230, 600 256, 596 278" />
      </g>
      <path d="M 300 470 C 340 440, 390 432, 430 446" fill="none" stroke={c.p.rim} strokeOpacity={0.35} strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

function Rack({ c }: { c: Ctx }) {
  const row = (y: number, radii: number[], gap: number) => {
    const total = radii.reduce((s, r) => s + r * 2, 0) + gap * (radii.length - 1);
    let x = 400 - total / 2;
    return radii.map((r, i) => {
      const cx = x + r;
      x += r * 2 + gap;
      return (
        <g key={i}>
          <circle cx={cx + 6} cy={y - r} r={r} fill={c.p.edge} />
          <circle cx={cx} cy={y - r} r={r} fill={`url(#${c.id('face')})`} />
          <circle cx={cx} cy={y - r} r={r * 0.78} fill="none" stroke={c.p.metalLo} strokeWidth={2.5} strokeOpacity={0.8} />
          <circle cx={cx} cy={y - r} r={r * 0.3} fill={c.p.metalLo} />
          <circle cx={cx} cy={y - r} r={r * 0.3} fill="none" stroke={c.p.brass} strokeOpacity={0.5} strokeWidth={2} />
          <path
            d={`M ${cx - r * 0.7} ${y - r - r * 0.7} A ${r} ${r} 0 0 1 ${cx + r * 0.7} ${y - r - r * 0.7}`}
            fill="none"
            stroke={c.p.rim}
            strokeOpacity={c.p.rimOpacity}
            strokeWidth={3}
            strokeLinecap="round"
          />
        </g>
      );
    });
  };
  const rail = (y: number) => (
    <g>
      <rect x={30} y={y} width={740} height={22} fill={c.p.metalLo} />
      <rect x={30} y={y} width={740} height={3} fill={c.p.rim} opacity={0.6} />
    </g>
  );
  return (
    <g>
      <Rays c={c} cx={400} cy={300} />
      <rect x={40} y={140} width={26} height={820} fill={c.p.metalLo} />
      <rect x={734} y={140} width={26} height={820} fill={c.p.metalLo} />
      <rect x={40} y={140} width={3} height={820} fill={c.p.rim} opacity={0.5} />
      <rect x={734} y={140} width={3} height={820} fill={c.p.rim} opacity={0.5} />
      {row(470, [46, 54, 62, 70, 76], 16)}
      {rail(470)}
      {row(820, [66, 76, 86, 94], 18)}
      {rail(820)}
      <rect x={0} y={842} width={800} height={200} fill={`url(#${c.id('dots')})`} opacity={c.p.halftoneOpacity} />
    </g>
  );
}

function Plates({ c }: { c: Ctx }) {
  const stack = [
    { rx: 300, t: 40 },
    { rx: 300, t: 40 },
    { rx: 256, t: 36 },
    { rx: 214, t: 32 },
    { rx: 170, t: 28 },
    { rx: 130, t: 24 },
  ];
  let y = 840;
  const k = 0.3;
  return (
    <g>
      <Rays c={c} cx={400} cy={260} />
      <Floor c={c} cx={400} cy={850} rx={380} ry={60} />
      {/* post */}
      <rect x={384} y={170} width={32} height={560} fill={`url(#${c.id('steel')})`} />
      <rect x={384} y={170} width={3} height={560} fill={c.p.rim} opacity={0.8} />
      <ellipse cx={400} cy={170} rx={30} ry={10} fill={c.p.metalHi} stroke={c.p.rim} strokeOpacity={0.8} strokeWidth={2} />
      {stack.map((s, i) => {
        const ry = s.rx * k;
        const top = y - s.t;
        const el = (
          <g key={i}>
            <path
              d={`M ${400 - s.rx} ${top} L ${400 - s.rx} ${y} A ${s.rx} ${ry} 0 0 0 ${400 + s.rx} ${y} L ${400 + s.rx} ${top} Z`}
              fill={c.p.edge}
            />
            <path d={`M ${400 - s.rx} ${y} A ${s.rx} ${ry} 0 0 0 ${400 + s.rx} ${y}`} fill="none" stroke={c.p.rim} strokeOpacity={0.35} strokeWidth={2} />
            <ellipse cx={400} cy={top} rx={s.rx} ry={ry} fill={`url(#${c.id('face')})`} />
            <ellipse cx={400} cy={top} rx={s.rx * 0.84} ry={ry * 0.84} fill="none" stroke={c.p.metalLo} strokeWidth={2.5} strokeOpacity={0.8} />
            <ellipse cx={400} cy={top} rx={s.rx * 0.56} ry={ry * 0.56} fill="none" stroke={c.p.detail} strokeWidth={2} strokeOpacity={0.5} />
            <path
              d={`M ${400 - s.rx} ${top} A ${s.rx} ${ry} 0 0 1 ${400 + s.rx} ${top}`}
              fill="none"
              stroke={c.p.rim}
              strokeOpacity={c.p.rimOpacity}
              strokeWidth={3.5}
              strokeLinecap="round"
            />
          </g>
        );
        y = top;
        return el;
      })}
      <rect x={384} y={170} width={32} height={y - 170} fill={`url(#${c.id('steel')})`} />
      <rect x={384} y={170} width={3} height={y - 170} fill={c.p.rim} opacity={0.8} />
      <ellipse cx={400} cy={170} rx={30} ry={10} fill={c.p.metalHi} stroke={c.p.rim} strokeOpacity={0.8} strokeWidth={2} />
    </g>
  );
}

function Bench({ c }: { c: Ctx }) {
  return (
    <g>
      <Rays c={c} cx={330} cy={420} />
      <Floor c={c} cx={450} cy={880} rx={420} ry={40} />
      {/* upright */}
      <rect x={300} y={250} width={40} height={630} fill={c.p.metalLo} />
      <rect x={336} y={250} width={4} height={630} fill={c.p.rim} opacity={0.7} />
      <rect x={240} y={868} width={160} height={16} fill={c.p.metalLo} />
      {/* bench */}
      <rect x={250} y={640} width={480} height={52} rx={10} fill={`url(#${c.id('face')})`} />
      <rect x={250} y={640} width={480} height={4} rx={2} fill={c.p.rim} opacity={0.85} />
      <rect x={290} y={692} width={440} height={16} fill={c.p.edge} />
      <rect x={430} y={708} width={26} height={170} fill={c.p.metalLo} />
      <rect x={650} y={708} width={26} height={170} fill={c.p.metalLo} />
      <rect x={400} y={868} width={320} height={14} fill={c.p.metalLo} />
      <rect x={452} y={708} width={3} height={170} fill={c.p.rim} opacity={0.5} />
      <rect x={672} y={708} width={3} height={170} fill={c.p.rim} opacity={0.5} />
      {/* plate, face on */}
      <circle cx={336} cy={410} r={214} fill={c.p.edge} />
      <circle cx={322} cy={402} r={210} fill={`url(#${c.id('face')})`} />
      <circle cx={322} cy={402} r={188} fill="none" stroke={c.p.metalLo} strokeWidth={4} strokeOpacity={0.85} />
      <circle cx={322} cy={402} r={130} fill="none" stroke={c.p.detail} strokeWidth={2.5} strokeOpacity={0.6} />
      <circle cx={322} cy={402} r={46} fill={c.p.metalLo} />
      <circle cx={322} cy={402} r={20} fill={`url(#${c.id('steel')})`} stroke={c.p.rim} strokeOpacity={0.8} strokeWidth={2} />
      <path d="M 140 330 A 210 210 0 0 1 400 208" fill="none" stroke={c.p.rim} strokeOpacity={c.p.rimOpacity} strokeWidth={5} strokeLinecap="round" />
      <g fill={c.p.brass} fillOpacity={0.55} fontFamily="var(--font-anton), Impact, sans-serif" fontSize={26} letterSpacing={6} textAnchor="middle">
        <text x={322} y={260}>BODY ART</text>
        <text x={322} y={566}>KARACHI</text>
      </g>
    </g>
  );
}

function starPath(cx: number, cy: number, R: number, r: number) {
  let d = '';
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? R : r;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    d += `${i === 0 ? 'M' : 'L'} ${(cx + Math.cos(a) * rad).toFixed(1)} ${(cy + Math.sin(a) * rad).toFixed(1)} `;
  }
  return d + 'Z';
}

const scenes: Record<ArtName, (props: { c: Ctx }) => ReactNode> = {
  barbell: Barbell,
  dumbbell: Dumbbell,
  kettlebell: Kettlebell,
  arm: Arm,
  rack: Rack,
  plates: Plates,
  bench: Bench,
};

const glowAt: Record<ArtName, [number, number]> = {
  barbell: [520, 360],
  dumbbell: [440, 420],
  kettlebell: [400, 520],
  arm: [560, 380],
  rack: [400, 380],
  plates: [400, 380],
  bench: [340, 420],
};

export default function Art({
  name,
  tone = 'dark',
  className,
  title,
}: {
  name: ArtName;
  tone?: ArtTone;
  className?: string;
  title?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const id = (s: string) => `${uid}-${s}`;
  const p = palettes[tone];
  const c: Ctx = { id, p };
  const Scene = scenes[name];
  const [gx, gy] = glowAt[name];

  return (
    <svg
      viewBox="0 0 800 1000"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <defs>
        <linearGradient id={id('bg')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.bgTop} />
          <stop offset="1" stopColor={p.bgBottom} />
        </linearGradient>
        <radialGradient id={id('glow')} cx={gx} cy={gy} r={520} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={p.glow} stopOpacity={p.glowOpacity} />
          <stop offset="0.55" stopColor={p.glow} stopOpacity={p.glowOpacity * 0.25} />
          <stop offset="1" stopColor={p.glow} stopOpacity={0} />
        </radialGradient>
        <linearGradient id={id('face')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.metalHi} />
          <stop offset="0.6" stopColor={p.metalLo} />
          <stop offset="1" stopColor={p.metalLo} />
        </linearGradient>
        <linearGradient id={id('steel')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={p.metalLo} />
          <stop offset="0.5" stopColor={p.detail} />
          <stop offset="1" stopColor={p.metalLo} />
        </linearGradient>
        <linearGradient id={id('brass')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.brass} />
          <stop offset="0.5" stopColor={p.detail} />
          <stop offset="1" stopColor={p.metalLo} />
        </linearGradient>
        <radialGradient id={id('bell')} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor={p.metalHi} />
          <stop offset="0.7" stopColor={p.metalLo} />
        </radialGradient>
        <linearGradient id={id('skin')} x1="0.2" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor={p.metalHi} />
          <stop offset="0.7" stopColor={p.metalLo} />
        </linearGradient>
        <pattern id={id('dots')} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <circle cx="7" cy="7" r="2.6" fill={p.halftone} />
        </pattern>
        <radialGradient id={id('vignette')} cx="0.5" cy="0.45" r="0.75">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity={tone === 'cream' ? 0.18 : 0.55} />
        </radialGradient>
        <filter id={id('blur')} x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <rect width="800" height="1000" fill={`url(#${id('bg')})`} />
      <rect width="800" height="1000" fill={`url(#${id('glow')})`} />
      <Scene c={c} />
      <rect width="800" height="1000" fill={`url(#${id('vignette')})`} />
    </svg>
  );
}
