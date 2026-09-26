import Logo from '@/components/Logo';

export const metadata = { title: 'Page not found | Karachi Executive Gym' };

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center gap-8 bg-void px-6 text-center">
      <Logo />
      <h1 className="h-display text-[clamp(3rem,12vw,7rem)]">404</h1>
      <p className="lede max-w-sm">This page doesn&rsquo;t exist. Let&rsquo;s get you back to training.</p>
      <a href="/" className="btn-primary">Back to home</a>
    </main>
  );
}
