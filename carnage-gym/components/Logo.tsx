import Image from 'next/image';

/**
 * CARNAGE GYM brand mark.
 *
 * No logo file was supplied with the project, so a typographic wordmark is
 * used. To use the official logo, add it to /public (SVG preferred) and set
 * LOGO below — it will be rendered at the correct proportions everywhere.
 * Provide a light (white) version for the dark site, and optionally a dark
 * version for light sections.
 */
const LOGO: { light: string; dark?: string; width: number; height: number } | null = null;
// Example: const LOGO = { light: '/logo-white.svg', dark: '/logo-black.svg', width: 180, height: 48 };

type Props = { tone?: 'light' | 'dark'; size?: 'sm' | 'md' | 'lg'; className?: string };

export default function Logo({ tone = 'light', size = 'md', className = '' }: Props) {
  if (LOGO) {
    const src = tone === 'dark' && LOGO.dark ? LOGO.dark : LOGO.light;
    const h = size === 'lg' ? 64 : size === 'sm' ? 32 : 40;
    return (
      <Image
        src={src}
        alt="Carnage Gym"
        width={Math.round((LOGO.width / LOGO.height) * h)}
        height={h}
        priority
        className={className}
      />
    );
  }

  const word = size === 'lg' ? 'text-[3.25rem]' : size === 'sm' ? 'text-[1.35rem]' : 'text-[1.7rem]';
  const color = tone === 'dark' ? 'text-void' : 'text-chalk';

  return (
    <span className={`inline-flex items-end gap-2 leading-none ${color} ${className}`}>
      <span className={`font-display uppercase tracking-[0.04em] ${word}`}>Carnage</span>
      <span
        className={`mb-[0.2em] border-l pl-2 font-sans text-[0.58rem] font-semibold uppercase tracking-[0.34em] ${
          tone === 'dark' ? 'border-void/40' : 'border-white/35'
        }`}
      >
        Gym
      </span>
    </span>
  );
}
