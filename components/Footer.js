import Link from 'next/link';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-ink text-ink-100 mt-24">
      <div className="container-x py-16 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-12">
        <div>
          <div className="font-display text-2xl text-paper mb-3">
            store<span className="text-gold">4</span>home
          </div>
          <p className="text-[14px] text-ink-200 max-w-[280px] leading-relaxed">
            Considered goods for the home, the desk and everywhere in between — sourced with care, shipped across Pakistan.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <a href="#" aria-label="Instagram" className="p-2 rounded-full border border-ink-600 hover:border-gold hover:text-gold transition-colors">
              <Instagram size={16} />
            </a>
            <a href="#" aria-label="Facebook" className="p-2 rounded-full border border-ink-600 hover:border-gold hover:text-gold transition-colors">
              <Facebook size={16} />
            </a>
            <a href="#" aria-label="Twitter" className="p-2 rounded-full border border-ink-600 hover:border-gold hover:text-gold transition-colors">
              <Twitter size={16} />
            </a>
          </div>
        </div>

        <div>
          <div className="text-paper text-[13px] font-semibold mb-4">Shop</div>
          <ul className="flex flex-col gap-2.5 text-[14px] text-ink-200">
            <li><Link href="/shop/home-living" className="hover:text-gold transition-colors">Home & Living</Link></li>
            <li><Link href="/shop/electronics" className="hover:text-gold transition-colors">Electronics</Link></li>
            <li><Link href="/shop/fashion" className="hover:text-gold transition-colors">Fashion</Link></li>
            <li><Link href="/shop" className="hover:text-gold transition-colors">All Products</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-paper text-[13px] font-semibold mb-4">Support</div>
          <ul className="flex flex-col gap-2.5 text-[14px] text-ink-200">
            <li><Link href="/track-order" className="hover:text-gold transition-colors">Track Order</Link></li>
            <li><Link href="/account" className="hover:text-gold transition-colors">My Account</Link></li>
            <li><a href="#" className="hover:text-gold transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <div className="text-paper text-[13px] font-semibold mb-4">Stay in the loop</div>
          <p className="text-[13.5px] text-ink-200 mb-3">One email a month — new arrivals and restocks, nothing else.</p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="you@example.com"
              className="bg-ink-800 border border-ink-600 rounded-sm px-3 py-2 text-[13.5px] text-paper placeholder:text-ink-400 outline-none focus:border-gold w-full"
            />
            <button type="submit" className="bg-gold text-white text-[13px] font-semibold px-4 rounded-sm hover:bg-gold-700 transition-colors shrink-0">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-ink-800">
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12.5px] text-ink-400">
          <span>&copy; {new Date().getFullYear()} store4home. All rights reserved.</span>
          <span>Karachi &middot; Lahore &middot; Islamabad</span>
        </div>
      </div>
    </footer>
  );
}
