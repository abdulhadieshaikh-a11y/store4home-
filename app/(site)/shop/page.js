import { products } from '@/data/products';
import ShopGrid from '@/components/ShopGrid';

export const metadata = { title: 'All Products — store4home' };

export default function ShopPage({ searchParams }) {
  return (
    <div className="container-x py-10 md:py-14">
      <div className="mb-9">
        <h1 className="font-display text-[32px] mb-2">All Products</h1>
        <p className="text-ink-400 text-[14.5px]">{products.length} items across every department.</p>
      </div>
      <ShopGrid products={products} initialQuery={searchParams?.q || ''} />
    </div>
  );
}
