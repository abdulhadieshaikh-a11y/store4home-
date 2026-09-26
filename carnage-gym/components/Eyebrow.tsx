type Props = { index?: string; children: React.ReactNode; tone?: 'light' | 'dark'; className?: string };

/** Section label: “01 — ABOUT CARNAGE” with a hairline rule. */
export default function Eyebrow({ index, children, tone = 'light', className = '' }: Props) {
  const muted = tone === 'light' ? 'text-ash' : 'text-void/55';
  const rule = tone === 'light' ? 'bg-white/25' : 'bg-void/30';
  return (
    <p className={`label flex items-center gap-4 ${muted} ${className}`}>
      {index && <span className={tone === 'light' ? 'text-chalk' : 'text-void'}>{index}</span>}
      <span aria-hidden="true" className={`h-px w-10 ${rule}`} />
      <span>{children}</span>
    </p>
  );
}
