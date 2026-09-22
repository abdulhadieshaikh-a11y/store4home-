import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import { categories, getCategory } from '@/data/categories';
import ShopGrid from '@/components/ShopGrid';

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export function generateMetadata({ params }) {
  const cat = getCategory(params.category);
  return { title: cat ? `${cat.name} — store4home` : 'store4home' };
}

export default function CategoryPage({ params }) {
  const cat = getCategory(params.category);
  if (!cat) notFound();

  return (
    <div className="container-x py-10 md:py-14">
      <div className="mb-9">
        <h1 className="font-display text-[32px] mb-2">{cat.name}</h1>
        <p className="text-ink-400 text-[14.5px]">{cat.tagline}</p>
      </div>
      <ShopGrid products={products} activeCategory={cat.id} />
    </div>
  );
}
