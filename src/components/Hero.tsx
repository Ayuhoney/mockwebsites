import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowDown, Play } from 'lucide-react';

const DARK = 'rgba(14,11,8,';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = () => {
      if (!bgRef.current) return;
      const y = window.scrollY;
      bgRef.current.style.transform = `translateY(${y * 0.38}px)`;
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen min-h-[720px] flex overflow-hidden">
      {/* Background image — parallax */}
      <div ref={bgRef} className="absolute inset-0 scale-110" style={{ willChange: 'transform' }}>
        <img
          src="https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
          alt="Modern architecture"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlays */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${DARK}0.88) 0%, ${DARK}0.60) 45%, ${DARK}0.30) 100%)` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${DARK}0.60) 0%, transparent 55%)` }} />
      </div>

      {/* Geometric accent lines */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {/* Top-right corner bracket */}
        <div className="absolute top-24 right-12 lg:right-20 hidden lg:block"
          style={{
            opacity: loaded ? 0.35 : 0,
            transition: 'opacity 1s ease 0.8s',
          }}
        >
          <div className="w-16 h-px bg-amber-400" />
          <div className="w-px h-16 bg-amber-400 ml-auto" />
        </div>
        {/* Bottom-left corner bracket */}
        <div className="absolute bottom-36 left-8 lg:left-14 hidden lg:block"
          style={{
            opacity: loaded ? 0.25 : 0,
            transition: 'opacity 1s ease 1s',
          }}
        >
          <div className="w-px h-12 bg-stone-300" />
          <div className="w-12 h-px bg-stone-300" />
        </div>
        {/* Grid dots */}
        <div className="absolute top-32 right-32 grid grid-cols-5 gap-4 hidden lg:grid"
          style={{ opacity: loaded ? 0.15 : 0, transition: 'opacity 1.2s ease 1.2s' }}
        >
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-stone-300" />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 lg:px-12 flex flex-col justify-center">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div
            className="eyebrow mb-8 text-stone-300"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.7s ease 0.15s',
            }}
          >
            <span className="eyebrow-line" />
            <span>Est. 2000 · Premium Construction & Architecture</span>
          </div>

          {/* Main headline */}
          <h1
            className="font-serif font-light leading-[0.9] tracking-tight mb-2"
            style={{ fontSize: 'clamp(68px, 9vw, 136px)' }}
          >
            <span
              className="block text-white"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s',
              }}
            >
              We Build
            </span>
            <span
              className="block text-amber-400"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1) 0.42s',
              }}
            >
              The Future.
            </span>
          </h1>

          {/* Description */}
          <p
            className="text-base lg:text-lg font-light leading-relaxed mt-8 mb-12 max-w-lg"
            style={{
              color: 'rgba(255,255,255,0.62)',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s ease 0.6s',
            }}
          >
            Award-winning design-build firm delivering landmark structures across 40+ countries. Engineering precision. Architectural vision. Lasting legacy.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 mb-16"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.7s ease 0.75s',
            }}
          >
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary group"
            >
              View Our Work
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-ghost group"
            >
              <Play className="w-4 h-4" />
              Our Story
            </button>
          </div>

          {/* Inline mini-stats */}
          <div
            className="flex gap-10 flex-wrap"
            style={{
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.7s ease 0.95s',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: '1.5rem',
            }}
          >
            {[
              { n: '25+', label: 'Years' },
              { n: '500+', label: 'Projects' },
              { n: '40', label: 'Countries' },
              { n: '$2.8B', label: 'Value Built' },
            ].map(({ n, label }) => (
              <div key={label}>
                <div className="font-serif text-2xl font-light text-white">{n}</div>
                <div className="text-[10px] tracking-[0.22em] uppercase text-stone-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side vertical tagline */}
      <div className="hidden xl:flex absolute right-10 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-4">
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-stone-400 to-transparent" />
        <div
          className="writing-vertical text-[9px] tracking-[0.35em] uppercase text-stone-400"
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.7s ease 1.2s' }}
        >
          Structura · Build · Design · Innovate
        </div>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-stone-400 to-transparent" />
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.7s ease 1.4s' }}
      >
        <div className="text-[9px] tracking-[0.3em] uppercase text-stone-400">Scroll</div>
        <ArrowDown className="w-4 h-4 text-amber-400 animate-bounce-slow" />
      </div>
    </section>
  );
}
