import ProductForm from '@/components/admin/ProductForm';

export default function AddProductPage() {
  return (
    <div>
      <p className="text-ink-400 text-[14px] mb-6 -mt-1">Fill in the details below to list a new product.</p>
      <ProductForm />
    </div>
  );
}
