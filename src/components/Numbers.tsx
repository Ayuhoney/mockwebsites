import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const stats = [
  { value: 25,   suffix: '+', label: 'Years of Excellence',   sub: 'Est. 2000, global operations' },
  { value: 500,  suffix: '+', label: 'Projects Delivered',     sub: 'Across 40+ countries' },
  { value: 2.8,  suffix: 'B', label: 'Construction Value',     sub: 'USD total portfolio' },
  { value: 98,   suffix: '%', label: 'Client Satisfaction',    sub: 'Based on post-project surveys' },
];

function useCountUp(target: number, started: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(target < 10 ? parseFloat(current.toFixed(1)) : Math.round(current));
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);
  return count;
}

function StatCard({ value, suffix, label, sub, index, started }: {
  value: number; suffix: string; label: string; sub: string; index: number; started: boolean;
}) {
  const count = useCountUp(value, started);
  const display = value < 10 ? count.toFixed(1) : Math.round(count);

  return (
    <div
      style={{
        opacity: started ? 1 : 0,
        transform: started ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${index * 150}ms, transform 0.7s ease ${index * 150}ms`,
      }}
    >
      <div className="text-[11px] tracking-[0.3em] uppercase text-stone-400 mb-4 font-mono">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div
        className="font-serif font-light text-stone-900 flex items-start mb-3"
        style={{ fontSize: 'clamp(52px, 6vw, 92px)', lineHeight: 1 }}
      >
        <span>{display}</span>
        <span className="text-amber-600 text-3xl mt-3 ml-1 font-sans">{suffix}</span>
      </div>
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(to right, #D4941A, transparent)',
          width: started ? '3rem' : '0',
          marginBottom: '1rem',
          transition: `width 0.6s ease ${index * 150 + 400}ms`,
        }}
      />
      <div className="text-sm font-semibold text-stone-800 mb-1">{label}</div>
      <div className="text-[11px] tracking-[0.12em] uppercase text-stone-500">{sub}</div>
    </div>
  );
}

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
    <section className="bg-stone-100 py-28">
      <div ref={ref} className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
          <div>
            <div className="eyebrow text-stone-400 mb-6">
              <span className="eyebrow-line" />
              <span>By The Numbers</span>
            </div>
            <h2
              className="font-serif font-light text-stone-900 leading-[0.92]"
              style={{ fontSize: 'clamp(38px, 5vw, 68px)' }}
            >
              A Legacy Built on<br />
              <em className="not-italic text-amber-600">Scale & Precision</em>
            </h2>
          </div>
          <p className="text-stone-600 text-sm leading-relaxed max-w-xs">
            Two decades of delivering complex construction and engineering projects on every inhabited continent.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} index={i} started={visible} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-20 pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ borderTop: '1px solid rgba(106,96,80,0.15)' }}
        >
          <p className="font-serif font-light text-stone-700 max-w-lg leading-snug" style={{ fontSize: 'clamp(16px, 2vw, 22px)' }}>
            Every structure we build carries our commitment to engineering excellence and architectural integrity.
          </p>
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary flex-shrink-0 group"
          >
            See Our Work
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
