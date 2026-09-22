'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { UploadCloud, Save } from 'lucide-react';
import { categories } from '@/data/categories';

export default function ProductForm({ initial }) {
  const router = useRouter();
  const [form, setForm] = useState(
    initial || {
      name: '',
      category: categories[0].id,
      price: '',
      compareAt: '',
      stock: '',
      description: '',
      highlights: '',
      colors: '',
      image: '',
    }
  );
  const [saved, setSaved] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      router.push('/admin/products');
    }, 700);
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
      <div className="flex flex-col gap-6">
        <div className="bg-white border border-line rounded p-6">
          <h2 className="font-display text-[18px] mb-5">Product information</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-[13px] font-semibold block mb-1.5">Product name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand"
                placeholder="e.g. Amber Ceramic Table Lamp"
              />
            </div>
            <div>
              <label className="text-[13px] font-semibold block mb-1.5">Description</label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand resize-none"
                placeholder="Describe the product for your customers..."
              />
            </div>
            <div>
              <label className="text-[13px] font-semibold block mb-1.5">Highlights (one per line)</label>
              <textarea
                rows={3}
                value={form.highlights}
                onChange={(e) => update('highlights', e.target.value)}
                className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand resize-none"
                placeholder={'Hand-glazed stoneware base\nNatural linen shade'}
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-line rounded p-6">
          <h2 className="font-display text-[18px] mb-5">Pricing & inventory</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-[13px] font-semibold block mb-1.5">Price ($)</label>
              <input
                type="number"
                step="0.01"
                required
                value={form.price}
                onChange={(e) => update('price', e.target.value)}
                className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand"
              />
            </div>
            <div>
              <label className="text-[13px] font-semibold block mb-1.5">Compare-at price</label>
              <input
                type="number"
                step="0.01"
                value={form.compareAt}
                onChange={(e) => update('compareAt', e.target.value)}
                className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand"
              />
            </div>
            <div>
              <label className="text-[13px] font-semibold block mb-1.5">Stock quantity</label>
              <input
                type="number"
                required
                value={form.stock}
                onChange={(e) => update('stock', e.target.value)}
                className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand"
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-line rounded p-6">
          <h2 className="font-display text-[18px] mb-5">Variants</h2>
          <label className="text-[13px] font-semibold block mb-1.5">Colors (comma-separated)</label>
          <input
            type="text"
            value={form.colors}
            onChange={(e) => update('colors', e.target.value)}
            className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand"
            placeholder="Amber, Sage, Charcoal"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="bg-white border border-line rounded p-6">
          <h2 className="font-display text-[18px] mb-5">Organize</h2>
          <label className="text-[13px] font-semibold block mb-1.5">Category</label>
          <select
            value={form.category}
            onChange={(e) => update('category', e.target.value)}
            className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand bg-white"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="bg-white border border-line rounded p-6">
          <h2 className="font-display text-[18px] mb-5">Product image</h2>
          {form.image ? (
            <div className="relative aspect-square rounded overflow-hidden mb-3 bg-ink-50">
              <Image src={form.image} alt="Product preview" fill sizes="320px" className="object-cover" />
            </div>
          ) : (
            <div className="aspect-square rounded border-2 border-dashed border-line flex flex-col items-center justify-center gap-2 mb-3 text-ink-400">
              <UploadCloud size={28} />
              <p className="text-[12.5px]">No image yet</p>
            </div>
          )}
          <input
            type="text"
            value={form.image}
            onChange={(e) => update('image', e.target.value)}
            placeholder="Paste an image URL"
            className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[13.5px] outline-none focus:border-brand"
          />
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 bg-brand text-white font-semibold text-[14.5px] py-3.5 rounded-sm hover:bg-brand-700 transition-colors"
        >
          <Save size={16} /> {saved ? 'Saved' : 'Save product'}
        </button>
      </div>
    </form>
  );
}
