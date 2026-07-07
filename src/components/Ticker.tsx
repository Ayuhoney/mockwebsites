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
      style={{ backgroundColor: '#1C1810', borderTop: '1px solid rgba(245,181,32,0.12)', borderBottom: '1px solid rgba(245,181,32,0.12)' }}
    >
      <div className="flex whitespace-nowrap animate-marquee">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-4">
            <span className="text-[11px] tracking-[0.3em] uppercase font-semibold text-stone-300">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rotate-45 bg-amber-400 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
