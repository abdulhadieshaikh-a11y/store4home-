type Props = { items: string[]; tone?: 'light' | 'dark' };

/** Slow, continuous type ticker. Purely decorative — hidden from assistive tech. */
export default function Marquee({ items, tone = 'light' }: Props) {
  const row = [...items, ...items];
  const text = tone === 'light' ? 'text-chalk' : 'text-void';
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden border-y py-6 sm:py-8 ${
        tone === 'light' ? 'border-white/10 bg-void' : 'border-void/10 bg-bone'
      }`}
    >
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((item, i) => (
              <span key={`${k}-${i}`} className="flex items-center">
                <span
                  className={`font-display text-4xl uppercase sm:text-6xl ${
                    i % 2 === 1 ? (tone === 'light' ? 'text-outline' : 'text-outline-dark') : text
                  }`}
                >
                  {item}
                </span>
                <span className={`mx-6 inline-block h-2 w-2 rotate-45 sm:mx-10 ${tone === 'light' ? 'bg-chalk/60' : 'bg-void/60'}`} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
