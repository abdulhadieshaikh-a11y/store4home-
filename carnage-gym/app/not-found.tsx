import Button from '@/components/Button';

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-void pt-24">
      <div className="frame relative">
        <p className="label text-ash">Error 404</p>
        <h1 className="display-xl mt-6 text-chalk">
          Wrong
          <span className="text-outline block">rack.</span>
        </h1>
        <p className="lede mt-8 max-w-md">The page you&rsquo;re looking for doesn&rsquo;t exist or has moved. Let&rsquo;s get you back to the floor.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/">Back to home</Button>
          <Button href="/contact" variant="outline">
            Contact
          </Button>
        </div>
      </div>
    </section>
  );
}
