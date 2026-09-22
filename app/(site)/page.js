import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const featured = products.filter((p) => p.compareAt).slice(0, 4);
  const newArrivals = products.slice(-8).reverse().slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="container-x pt-10 md:pt-14 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="order-2 md:order-1">
            <p className="text-gold font-semibold text-[13.5px] tracking-wide mb-4">The autumn edit is here</p>
            <h1 className="font-display text-[42px] sm:text-[54px] leading-[1.05] mb-6">
              Everything your home actually needs, nothing it doesn&apos;t.
            </h1>
            <p className="text-ink-600 text-[16px] leading-relaxed max-w-[440px] mb-8">
              store4home brings together considered furniture, electronics, kitchenware and everyday essentials —
              picked for how they hold up, not just how they photograph.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-brand text-white font-semibold text-[14.5px] px-7 py-3.5 rounded-sm hover:bg-brand-700 transition-colors"
              >
                Shop all products <ArrowRight size={16} />
              </Link>
              <Link href="/shop/home-living" className="text-[14.5px] font-semibold underline underline-offset-4 hover:text-brand">
                Explore Home & Living
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] rounded overflow-hidden translate-y-6">
              <Image src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80" alt="Living room styled with warm, considered furniture" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" priority />
            </div>
            <div className="relative aspect-[3/4] rounded overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80" alt="Table styled with ceramics and a linen runner" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-line bg-white">
        <div className="container-x py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Truck, label: 'Nationwide delivery', sub: '2–5 business days' },
            { icon: RotateCcw, label: '30-day returns', sub: 'No questions asked' },
            { icon: ShieldCheck, label: 'Secure checkout', sub: '256-bit encryption' },
            { icon: Headphones, label: 'Real support', sub: '7 days a week' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon size={22} className="text-brand shrink-0" />
              <div className="min-w-0">
                <p className="text-[13.5px] font-semibold truncate">{label}</p>
                <p className="text-[12px] text-ink-400 truncate">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container-x py-16 md:py-24">
        <div className="flex items-end justify-between mb-9">
          <div>
            <h2 className="font-display text-[30px] mb-2">Shop by category</h2>
            <p className="text-ink-400 text-[14.5px]">Six departments, one checkout.</p>
          </div>
          <Link href="/shop" className="hidden sm:flex items-center gap-1.5 text-[14px] font-semibold hover:text-brand">
            View all <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/shop/${cat.id}`} className="group relative aspect-[4/3] rounded overflow-hidden block">
              <Image src={cat.image} alt={cat.name} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-paper font-display text-[21px]">{cat.name}</h3>
                <p className="text-paper/80 text-[12.5px] mt-0.5">{cat.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Deals */}
      <section className="container-x py-16 md:py-24 border-t border-line">
        <div className="flex items-end justify-between mb-9">
          <div>
            <h2 className="font-display text-[30px] mb-2">Current offers</h2>
            <p className="text-ink-400 text-[14.5px]">Selected pieces, marked down for a limited time.</p>
          </div>
          <Link href="/shop" className="hidden sm:flex items-center gap-1.5 text-[14px] font-semibold hover:text-brand">
            View all <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-9">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="container-x pb-16 md:pb-24">
        <div className="relative rounded overflow-hidden">
          <div className="relative aspect-[16/7] md:aspect-[16/5]">
            <Image src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1600&q=80" alt="Desk setup with keyboard and accessories" fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-ink/50 flex items-center">
              <div className="container-x">
                <p className="text-gold font-semibold text-[13px] mb-2">Electronics</p>
                <h3 className="font-display text-paper text-[26px] md:text-[34px] max-w-[480px] mb-4">
                  Desk gear that earns its spot
                </h3>
                <Link
                  href="/shop/electronics"
                  className="inline-flex items-center gap-2 bg-paper text-ink font-semibold text-[13.5px] px-6 py-3 rounded-sm hover:bg-white transition-colors"
                >
                  Shop electronics <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="container-x pb-20 md:pb-28">
        <div className="flex items-end justify-between mb-9">
          <div>
            <h2 className="font-display text-[30px] mb-2">New arrivals</h2>
            <p className="text-ink-400 text-[14.5px]">Just landed in the warehouse.</p>
          </div>
          <Link href="/shop" className="hidden sm:flex items-center gap-1.5 text-[14px] font-semibold hover:text-brand">
            View all <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-9">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
