import { marqueeWords } from '@/lib/content';

export default function Marquee({ tone = 'ember', words = marqueeWords }: { tone?: 'ember' | 'cream' | 'iron'; words?: string[] }) {
  const styles = {
    ember: 'bg-ember-500 text-cream-50',
    cream: 'bg-cream-200 text-iron-900',
    iron: 'bg-iron-950 text-cream',
  }[tone];
  const row = (
    <ul className="flex shrink-0 items-center" aria-hidden>
      {words.map((w, i) => (
        <li key={i} className="flex items-center">
          <span className="px-6 font-display text-2xl uppercase tracking-poster sm:text-3xl">{w}</span>
          <svg viewBox="0 0 20 20" className="h-4 w-4 opacity-70" fill="currentColor" aria-hidden>
            <path d="M10 0l2.4 7.6H20l-6.2 4.6 2.4 7.8L10 15.2 3.8 20l2.4-7.8L0 7.6h7.6z" />
          </svg>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`relative overflow-hidden border-y border-iron-950/20 py-4 ${styles}`}>
      <p className="sr-only">{words.join(' · ')}</p>
      <div className="motion-marquee flex w-max animate-marquee">
        {row}
        {row}
      </div>
    </div>
  );
}
