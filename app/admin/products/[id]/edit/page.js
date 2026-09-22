import { notFound } from 'next/navigation';
import { getProduct } from '@/data/products';
import ProductForm from '@/components/admin/ProductForm';

export default function EditProductPage({ params }) {
  const product = getProduct(params.id);
  if (!product) notFound();

  const initial = {
    name: product.name,
    category: product.category,
    price: product.price,
    compareAt: product.compareAt || '',
    stock: product.stock,
    description: product.description,
    highlights: product.highlights.join('\n'),
    colors: product.colors.join(', '),
    image: product.images[0],
  };

  return (
    <div>
      <p className="text-ink-400 text-[14px] mb-6 -mt-1">Editing <strong className="text-ink">{product.name}</strong></p>
      <ProductForm initial={initial} />
    </div>
  );
}
