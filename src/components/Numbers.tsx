import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: '15+', label: 'Years of Clinical Experience', sub: 'Est. 2009, Paris' },
  { value: '8k+', label: 'Patients Transformed',         sub: 'Across 30+ countries' },
  { value: '40+', label: 'Treatment Protocols',           sub: 'Medical-grade only' },
  { value: '98%', label: 'Would Recommend',               sub: 'Based on 2,400 reviews' },
];

const DARK  = '#1A120C';
const DARK2 = '#3A2E27';
const MID   = '#5C4F45';
const LIGHT = '#E8DDD3';
const GOLD  = '#C8A882';

export default function Numbers() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ backgroundColor: DARK }} className="py-24">
      <div ref={ref} className="max-w-screen-xl mx-auto px-8 lg:px-14">

        <div className="flex items-center gap-6 mb-14">
          <div className="h-px flex-1" style={{ background: DARK2 }} />
          <div className="eyebrow" style={{ color: MID }}>
            <span>By The Numbers</span>
          </div>
          <div className="h-px flex-1" style={{ background: DARK2 }} />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {stats.map(({ value, label, sub }, i) => (
            <div
              key={label}
              style={{ opacity: visible ? 1 : 0, transition: `opacity 0.3s ease ${i * 120}ms` }}
            >
              <div
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(52px, 6vw, 88px)',
                  lineHeight: 1,
                  fontWeight: 300,
                  color: 'white',
                  marginBottom: '0.75rem',
                  animation: visible
                    ? `flipIn3d 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${i * 130}ms both`
                    : 'none',
                }}
              >
                {value}
              </div>

              <div
                style={{
                  height: 1,
                  width: visible ? '2.5rem' : '0px',
                  backgroundColor: GOLD,
                  marginBottom: '0.75rem',
                  transition: `width 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${200 + i * 130}ms`,
                }}
              />

              <div className="text-sm font-medium mb-1" style={{ color: LIGHT }}>{label}</div>
              <div className="text-[11px] tracking-[0.15em] uppercase" style={{ color: MID }}>{sub}</div>
            </div>
          ))}
        </div>

        <div
          className="mt-16 pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ borderTop: `1px solid ${DARK2}` }}
        >
          <p
            className="font-serif font-light max-w-xl leading-snug"
            style={{ fontSize: 'clamp(18px, 2vw, 26px)', color: '#D8CCBF' }}
          >
            Your transformation begins with a complimentary consultation — no obligation, complete discretion.
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-ghost-white flex-shrink-0"
          >
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
}
