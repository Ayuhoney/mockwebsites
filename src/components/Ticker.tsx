const items = [
  'Skin Rejuvenation',
  'Laser Precision',
  'Dermal Fillers',
  'Body Sculpting',
  'Surgical Excellence',
  'Personalised Care',
  'Medical-Grade Results',
  'Board-Certified Specialists',
];

export default function Ticker() {
  const doubled = [...items, ...items];

  return (
    <div className="bg-warm-900 border-y border-warm-800 py-4 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-4">
            <span className="text-[11px] tracking-[0.28em] uppercase font-medium text-warm-200">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-champagne-500 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
