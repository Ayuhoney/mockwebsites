import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const WARM900   = 'rgba(26,18,12,';
const BLUSH_ORB = 'rgba(212,149,138,0.22)';
const GOLD_ORB  = 'rgba(200,168,130,0.16)';
const SOFT_ORB  = 'rgba(228,180,165,0.18)';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  const orb1Ref    = useRef<HTMLDivElement>(null);
  const orb2Ref    = useRef<HTMLDivElement>(null);
  const orb3Ref    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handler = (e: MouseEvent) => {
      const { width, height, left, top } = section.getBoundingClientRect();
      const x = (e.clientX - left) / width  - 0.5;
      const y = (e.clientY - top)  / height - 0.5;
      if (bgRef.current)   bgRef.current.style.transform   = `translate(${x * -14}px, ${y * -8}px) scale(1.06)`;
      if (textRef.current) textRef.current.style.transform = `translate(${x *  10}px, ${y *  6}px)`;
      if (orb1Ref.current) orb1Ref.current.style.transform = `translate(${x *  20}px, ${y * 12}px)`;
      if (orb2Ref.current) orb2Ref.current.style.transform = `translate(${x * -12}px, ${y * -20}px)`;
      if (orb3Ref.current) orb3Ref.current.style.transform = `translate(${x *  30}px, ${y * 16}px)`;
    };
    section.addEventListener('mousemove', handler, { passive: true });
    return () => section.removeEventListener('mousemove', handler);
  }, []);

  const slow = { transition: 'transform 0.8s cubic-bezier(0.2, 0, 0, 1)', willChange: 'transform' as const };
  const fast = { transition: 'transform 0.6s cubic-bezier(0.2, 0, 0, 1)', willChange: 'transform' as const };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[700px] flex overflow-hidden"
      style={{ backgroundColor: '#1A120C' }}
    >
      {/* Background image */}
      <div ref={bgRef} className="absolute inset-0" style={slow}>
        <img
          src="https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1"
          alt="Premium aesthetic clinic"
          className="w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${WARM900}0.92) 0%, ${WARM900}0.60) 45%, ${WARM900}0.18) 100%)` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to top, ${WARM900}0.65) 0%, transparent 45%)` }}
        />
      </div>

      {/* Top gradient — keeps navbar readable */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none z-[2]"
        style={{
          height: '140px',
          background: `linear-gradient(to bottom, ${WARM900}0.55) 0%, ${WARM900}0.15) 60%, transparent 100%)`,
        }}
      />

      {/* Floating orbs */}
      <div ref={orb1Ref} className="absolute pointer-events-none rounded-full z-[1]"
        style={{
          width: 340, height: 340, top: '12%', right: '18%',
          background: `radial-gradient(circle, ${BLUSH_ORB} 0%, transparent 70%)`,
          filter: 'blur(52px)',
          animation: 'orbFloat1 9s ease-in-out infinite',
          ...slow,
        }}
      />
      <div ref={orb2Ref} className="absolute pointer-events-none rounded-full z-[1]"
        style={{
          width: 460, height: 460, top: '42%', right: '6%',
          background: `radial-gradient(circle, ${GOLD_ORB} 0%, transparent 70%)`,
          filter: 'blur(70px)',
          animation: 'orbFloat2 13s ease-in-out infinite',
          transition: 'transform 1.6s cubic-bezier(0.2, 0, 0, 1)', willChange: 'transform',
        }}
      />
      <div ref={orb3Ref} className="absolute pointer-events-none rounded-full z-[1]"
        style={{
          width: 200, height: 200, bottom: '22%', right: '36%',
          background: `radial-gradient(circle, ${SOFT_ORB} 0%, transparent 70%)`,
          filter: 'blur(32px)',
          animation: 'orbFloat3 7s ease-in-out infinite',
          transition: 'transform 0.9s cubic-bezier(0.2, 0, 0, 1)', willChange: 'transform',
        }}
      />

      {/* Text content */}
      <div
        ref={textRef}
        className="relative z-10 w-full max-w-screen-xl mx-auto px-8 lg:px-14 flex flex-col justify-center"
        style={fast}
      >
        <div className="max-w-3xl">
          <div
            className={`eyebrow mb-8 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ color: 'rgba(255,255,255,0.55)', transitionDelay: '100ms' }}
          >
            <span className="eyebrow-line" />
            <span>Premium Aesthetic Clinic · Est. 2009</span>
          </div>

          <h1
            className={`font-serif font-light text-white leading-[0.92] tracking-[-0.02em] transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ fontSize: 'clamp(72px, 9vw, 128px)', transitionDelay: '250ms' }}
          >
            Beauty
            <br />
            <em className="not-italic text-blush-300">Redefined.</em>
          </h1>

          <p
            className={`text-base lg:text-lg font-light leading-relaxed mt-8 mb-12 max-w-lg transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ color: 'rgba(255,255,255,0.62)', transitionDelay: '450ms' }}
          >
            Science-backed aesthetics delivered with artistry. Board-certified specialists. Medical-grade results.
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '600ms' }}
          >
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-dark group"
            >
              Book Consultation
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-ghost-white"
            >
              Explore Treatments
            </button>
          </div>
        </div>
      </div>

      {/* Rotating circular badge */}
      <div
        className="hidden lg:block absolute bottom-32 right-14 z-20 cursor-pointer"
        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'scale(1)' : 'scale(0.8)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
          transitionDelay: '1000ms',
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{ border: '1px solid rgba(212,149,138,0.35)', animation: 'pulseRing 2.5s ease-out infinite' }}
        />
        <div className="animate-spin-slow">
          <svg viewBox="0 0 140 140" width="140" height="140">
            <defs>
              <path id="circlePath" d="M 70,70 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0" />
            </defs>
            <text fontSize="10.5" letterSpacing="3.5" fill="rgba(255,255,255,0.55)">
              <textPath href="#circlePath">BOOK NOW · PREMIUM CARE · EST. 2009 ·</textPath>
            </text>
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(212,149,138,0.22)', border: '1px solid rgba(212,149,138,0.45)' }}
          >
            <ArrowRight className="w-4 h-4 text-blush-300" style={{ transform: 'rotate(-45deg)' }} />
          </div>
        </div>
      </div>

      {/* Bottom stats bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-10 transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)', transitionDelay: '800ms' }}
      >
        <div className="max-w-screen-xl mx-auto px-8 lg:px-14 py-6 grid grid-cols-3 lg:grid-cols-5 gap-6 items-center">
          {[
            { value: '15+', label: 'Years of Excellence' },
            { value: '8,000+', label: 'Clients Served' },
            { value: '40+', label: 'Treatments' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="font-serif text-2xl lg:text-3xl font-light text-white">{value}</div>
              <div className="text-[10px] tracking-[0.2em] uppercase mt-0.5" style={{ color: 'rgba(255,255,255,0.42)' }}>
                {label}
              </div>
            </div>
          ))}
          <div className="hidden lg:flex col-span-2 items-center justify-end gap-3">
            <span className="w-1 h-1 rounded-full bg-blush-400" />
            <span className="text-[10px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Rated 4.9 · 2,400 Reviews
            </span>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hidden lg:flex absolute right-10 bottom-24 flex-col items-center gap-3 z-10">
        <span className="writing-vertical text-[10px] tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Scroll
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
