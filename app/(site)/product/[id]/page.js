import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { products, getProduct, getRelatedProducts } from '@/data/products';
import { getCategory } from '@/data/categories';
import ProductPurchasePanel from '@/components/ProductPurchasePanel';
import ProductCard from '@/components/ProductCard';

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }) {
  const product = getProduct(params.id);
  return { title: product ? `${product.name} — store4home` : 'store4home' };
}

export default function ProductPage({ params }) {
  const product = getProduct(params.id);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product);

  return (
    <div className="container-x py-8 md:py-12">
      <nav className="flex items-center gap-1.5 text-[13px] text-ink-400 mb-8">
        <Link href="/" className="hover:text-brand">Home</Link>
        <ChevronRight size={13} />
        <Link href={`/shop/${category.id}`} className="hover:text-brand">{category.name}</Link>
        <ChevronRight size={13} />
        <span className="text-ink-600">{product.name}</span>
      </nav>

      <ProductPurchasePanel product={product} />

      {related.length > 0 && (
        <section className="mt-24 pt-12 border-t border-line">
          <h2 className="font-display text-[26px] mb-8">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-9">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
