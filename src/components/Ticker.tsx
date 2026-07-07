const items = [
  'Commercial Towers',
  'Residential Complexes',
  'Infrastructure',
  'Industrial Facilities',
  'Public Works',
  'Design-Build',
  'Renovation & Retrofit',
  'Structural Engineering',
];

export default function Ticker() {
  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden py-4"
      style={{ backgroundColor: '#EDE9E2', borderTop: '1px solid rgba(212,148,26,0.2)', borderBottom: '1px solid rgba(212,148,26,0.2)' }}
    >
      <div className="flex whitespace-nowrap animate-marquee">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-4">
            <span className="text-[11px] tracking-[0.3em] uppercase font-semibold text-stone-600">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rotate-45 bg-amber-500 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
