import Link from 'next/link';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { products } from '@/data/products';
import { getCategory } from '@/data/categories';

export default function AdminProductsPage() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center bg-white border border-line rounded-full px-4 py-2.5 w-full sm:w-[280px]">
          <Search size={15} className="text-ink-400 shrink-0" />
          <input type="text" placeholder="Search products..." className="bg-transparent outline-none text-[13.5px] px-2 w-full placeholder:text-ink-400" />
        </div>
        <Link
          href="/admin/products/add"
          className="inline-flex items-center gap-2 bg-brand text-white font-semibold text-[13.5px] px-5 py-2.5 rounded-sm hover:bg-brand-700 transition-colors"
        >
          <Plus size={16} /> Add Product
        </Link>
      </div>

      <div className="bg-white border border-line rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13.5px]">
            <thead>
              <tr className="text-left text-ink-400 border-b border-line bg-ink-50/50">
                <th className="py-3 px-5 font-medium">Product</th>
                <th className="py-3 px-5 font-medium">Category</th>
                <th className="py-3 px-5 font-medium">Price</th>
                <th className="py-3 px-5 font-medium">Stock</th>
                <th className="py-3 px-5 font-medium">Rating</th>
                <th className="py-3 px-5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const cat = getCategory(p.category);
                return (
                  <tr key={p.id} className="border-b border-line last:border-0 hover:bg-ink-50/40">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-11 h-11 rounded overflow-hidden bg-ink-50 shrink-0">
                          <Image src={p.images[0]} alt={p.name} fill sizes="44px" className="object-cover" />
                        </div>
                        <span className="font-medium line-clamp-1 max-w-[220px]">{p.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-5 text-ink-600">{cat?.name}</td>
                    <td className="py-3 px-5 font-medium">${p.price.toFixed(2)}</td>
                    <td className="py-3 px-5">
                      <span className={p.stock < 15 ? 'text-gold-700 font-semibold' : 'text-ink-600'}>{p.stock}</span>
                    </td>
                    <td className="py-3 px-5 text-ink-600">{p.rating.toFixed(1)} ({p.reviews})</td>
                    <td className="py-3 px-5">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="p-2 rounded hover:bg-ink-100 text-ink-600"
                          aria-label={`Edit ${p.name}`}
                        >
                          <Pencil size={15} />
                        </Link>
                        <button className="p-2 rounded hover:bg-ink-100 text-ink-600" aria-label={`Delete ${p.name}`}>
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
