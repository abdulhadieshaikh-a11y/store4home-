import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="container-x py-16 md:py-24 flex justify-center">
      <div className="w-full max-w-[400px]">
        <h1 className="font-display text-[28px] mb-1.5 text-center">Create your account</h1>
        <p className="text-ink-400 text-[14px] text-center mb-8">Faster checkout, order tracking, saved addresses.</p>

        <form className="flex flex-col gap-4">
          <div>
            <label className="text-[13px] font-semibold block mb-1.5">Full name</label>
            <input type="text" required className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand" />
          </div>
          <div>
            <label className="text-[13px] font-semibold block mb-1.5">Email address</label>
            <input type="email" required className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand" />
          </div>
          <div>
            <label className="text-[13px] font-semibold block mb-1.5">Password</label>
            <input type="password" required className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand" />
          </div>
          <button type="submit" className="w-full bg-brand text-white font-semibold text-[14.5px] py-3.5 rounded-sm hover:bg-brand-700 transition-colors mt-2">
            Create account
          </button>
        </form>

        <p className="text-center text-[13.5px] text-ink-400 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-brand font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
