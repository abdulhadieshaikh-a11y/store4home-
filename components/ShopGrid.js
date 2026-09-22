'use client';

import { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import { categories } from '@/data/categories';
import { SlidersHorizontal, X } from 'lucide-react';

export default function ShopGrid({ products, activeCategory, initialQuery }) {
  const [selectedCats, setSelectedCats] = useState(activeCategory ? [activeCategory] : []);
  const [sort, setSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(400);
  const [query, setQuery] = useState(initialQuery || '');
  const [filtersOpen, setFiltersOpen] = useState(false);

  function toggleCat(id) {
    setSelectedCats((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  }

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice);
    if (selectedCats.length) list = list.filter((p) => selectedCats.includes(p.category));
    if (query) list = list.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);

    return list;
  }, [products, selectedCats, sort, maxPrice, query]);

  const FilterPanel = (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-[13px] font-semibold tracking-wide uppercase text-ink-600 mb-3.5">Category</h3>
        <div className="flex flex-col gap-2.5">
          {categories.map((c) => (
            <label key={c.id} className="flex items-center gap-2.5 text-[14px] cursor-pointer">
              <input type="checkbox" checked={selectedCats.includes(c.id)} onChange={() => toggleCat(c.id)} />
              {c.name}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-[13px] font-semibold tracking-wide uppercase text-ink-600 mb-3.5">Max price: ${maxPrice}</h3>
        <input
          type="range"
          min="20"
          max="400"
          step="10"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-brand"
        />
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10">
      <aside className="hidden md:block">{FilterPanel}</aside>

      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            className="md:hidden flex items-center gap-2 text-[14px] font-medium border border-line rounded-sm px-3.5 py-2"
            onClick={() => setFiltersOpen(true)}
          >
            <SlidersHorizontal size={15} /> Filters
          </button>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search within results"
            className="hidden sm:block border border-line rounded-sm px-3.5 py-2 text-[13.5px] outline-none focus:border-brand w-[220px]"
          />
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-[13px] text-ink-400 hidden sm:inline">{filtered.length} items</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-line rounded-sm px-3 py-2 text-[13.5px] outline-none focus:border-brand bg-white"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-24 text-center text-ink-400">
            <p className="text-[15px]">No products match those filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setFiltersOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[80%] max-w-[320px] bg-paper p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <span className="font-display text-xl">Filters</span>
              <button onClick={() => setFiltersOpen(false)} aria-label="Close filters">
                <X size={20} />
              </button>
            </div>
            {FilterPanel}
            <button
              onClick={() => setFiltersOpen(false)}
              className="w-full mt-8 bg-brand text-white font-semibold text-[14px] py-3 rounded-sm"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
