import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="container-x py-16 md:py-24 flex justify-center">
      <div className="w-full max-w-[400px]">
        <h1 className="font-display text-[28px] mb-1.5 text-center">Welcome back</h1>
        <p className="text-ink-400 text-[14px] text-center mb-8">Log in to track orders and check out faster.</p>

        <form className="flex flex-col gap-4">
          <div>
            <label className="text-[13px] font-semibold block mb-1.5">Email address</label>
            <input type="email" required className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[13px] font-semibold">Password</label>
              <a href="#" className="text-[12.5px] text-brand hover:underline">Forgot?</a>
            </div>
            <input type="password" required className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand" />
          </div>
          <button type="submit" className="w-full bg-brand text-white font-semibold text-[14.5px] py-3.5 rounded-sm hover:bg-brand-700 transition-colors mt-2">
            Log in
          </button>
        </form>

        <p className="text-center text-[13.5px] text-ink-400 mt-6">
          New to store4home?{' '}
          <Link href="/register" className="text-brand font-semibold hover:underline">
            Create an account
          </Link>
        </p>

        <div className="mt-8 pt-6 border-t border-line text-center">
          <Link href="/admin" className="text-[12.5px] text-ink-400 hover:text-brand">
            Store administrator? Go to dashboard &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
