import { site } from '@/lib/site';
import Icon from './Icon';

const iconFor = { Instagram: 'instagram', Facebook: 'facebook', TikTok: 'tiktok' } as const;

/**
 * Social profiles. Handles were not supplied — add URLs in lib/site.ts.
 * Until then each renders as a quiet, non-clickable “soon” placeholder.
 */
export default function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {site.social.map((s) => (
        <li key={s.label}>
          {s.href ? (
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Carnage Gym on ${s.label}`}
              className="flex h-11 w-11 items-center justify-center border border-white/15 text-fog transition-colors duration-300 hover:border-chalk hover:bg-chalk hover:text-void"
            >
              <Icon name={iconFor[s.label]} className="h-[18px] w-[18px]" />
            </a>
          ) : (
            <span
              title={`${s.label} — coming soon`}
              className="flex h-11 items-center gap-2 border border-dashed border-white/15 px-3 text-ash/80"
            >
              <Icon name={iconFor[s.label]} className="h-4 w-4" />
              <span className="sr-only">{s.label}</span>
              <span className="text-[0.58rem] font-medium uppercase tracking-[0.2em]">Soon</span>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
