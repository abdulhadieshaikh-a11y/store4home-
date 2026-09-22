import Image from 'next/image';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { categories } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';

export default function AdminCategoriesPage() {
  return (
    <div>
      <div className="flex justify-end mb-6">
        <button className="inline-flex items-center gap-2 bg-brand text-white font-semibold text-[13.5px] px-5 py-2.5 rounded-sm hover:bg-brand-700 transition-colors">
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {categories.map((c) => (
          <div key={c.id} className="bg-white border border-line rounded overflow-hidden">
            <div className="relative aspect-[16/9]">
              <Image src={c.image} alt={c.name} fill sizes="360px" className="object-cover" />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-display text-[18px]">{c.name}</h3>
                <div className="flex items-center gap-1 shrink-0">
                  <button className="p-1.5 rounded hover:bg-ink-100 text-ink-600" aria-label={`Edit ${c.name}`}>
                    <Pencil size={14} />
                  </button>
                  <button className="p-1.5 rounded hover:bg-ink-100 text-ink-600" aria-label={`Delete ${c.name}`}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <p className="text-[13px] text-ink-400 mb-3">{c.tagline}</p>
              <p className="text-[12.5px] font-medium text-brand">{getProductsByCategory(c.id).length} products</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
