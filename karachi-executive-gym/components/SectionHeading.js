export default function SectionHeading({ id, eyebrow, title, children, align = 'left', className = '' }) {
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}>
      <p className={`eyebrow ${centered ? 'justify-center' : ''}`} data-reveal>
        {eyebrow}
      </p>
      <h2 id={id} className="h-section mt-6 text-balance" data-reveal style={{ '--reveal-delay': '80ms' }}>
        {title}
      </h2>
      {children ? (
        <div className={`lede mt-6 text-pretty ${centered ? 'mx-auto max-w-xl' : 'max-w-xl'}`} data-reveal style={{ '--reveal-delay': '160ms' }}>
          {children}
        </div>
      ) : null}
    </div>
  );
}
