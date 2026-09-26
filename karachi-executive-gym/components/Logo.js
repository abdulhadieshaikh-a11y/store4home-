// Wordmark: a accent monogram tile paired with a tracked, two-line name.
export default function Logo({ className = '' }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden="true">
        <rect x="0.75" y="0.75" width="38.5" height="38.5" fill="none" stroke="#E50914" strokeWidth="1.5" />
        <path d="M11 10h4.2v8.6L23.4 10h5.3l-8.9 9.3L29.4 30h-5.4l-7-7.8-1.8 1.9V30H11z" fill="#fff" />
        <rect x="11" y="32.5" width="18.4" height="1.6" fill="#E50914" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="font-display text-[0.95rem] font-extrabold uppercase tracking-[0.04em] text-white"
          style={{ fontStretch: '110%' }}
        >
          Karachi Executive
        </span>
        <span className="mt-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.42em] text-accent-light">
          Gym
        </span>
      </span>
    </span>
  );
}
