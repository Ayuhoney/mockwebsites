import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const values = [
  { n: '01', title: 'Evidence-Based', desc: 'Every treatment protocol is grounded in peer-reviewed clinical science.' },
  { n: '02', title: 'Artist\'s Eye', desc: 'Results that are naturally beautiful — harmonious with your unique features.' },
  { n: '03', title: 'Personalised Always', desc: 'No two journeys are alike. Your plan is built around you, not a template.' },
];

/* 3D tilt hook for the main image */
function use3dTilt(intensity = 10) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale(1.02) translateZ(6px)`;
  };

  const onMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform =
        'perspective(900px) rotateY(0deg) rotateX(0deg) scale(1) translateZ(0)';
    }
  };

  return { ref, onMouseMove, onMouseLeave };
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { ref: imageRef, onMouseMove, onMouseLeave } = use3dTilt(9);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="bg-warm-50 py-24 lg:py-36 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-8 lg:px-14">
        <div
          ref={sectionRef}
          className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-center"
        >
          {/* Left: 3D tilt image stack */}
          <div
            className={`relative transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
          >
            {/* Gold corner accent (static, behind) */}
            <div
              className="absolute -top-5 -left-5 w-20 h-20 pointer-events-none"
              style={{ border: '2px solid #C8A882', borderRight: 'none', borderBottom: 'none', zIndex: 0 }}
            />

            {/* Main image — 3D tilt on hover */}
            <div
              ref={imageRef}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              className="relative aspect-[3/4] overflow-hidden cursor-default"
              style={{
                transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                zIndex: 1,
              }}
            >
              <img
                src="https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&w=900&h=1200&dpr=1"
                alt="Treatment in progress"
                className="w-full h-full object-cover"
              />
              {/* Subtle shimmer on hover */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(255,255,255,0.04) 100%)',
                }}
              />
            </div>

            {/* Floating small image — independent 3D tilt */}
            <FloatingSmallImage />

            {/* Years badge — floats up */}
            <div
              className="absolute top-8 -left-4 lg:-left-8 text-white px-5 py-4"
              style={{
                background: '#1A120C',
                animation: visible ? 'orbFloat3 6s ease-in-out infinite' : 'none',
                animationDelay: '1s',
              }}
            >
              <div
                className="font-serif font-light"
                style={{ fontSize: 32, lineHeight: 1 }}
              >
                15
              </div>
              <div
                className="text-[9px] tracking-[0.25em] uppercase mt-0.5"
                style={{ color: '#A08E7E' }}
              >
                Years of<br />Excellence
              </div>
            </div>
          </div>

          {/* Right: Text content */}
          <div
            className={`transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          >
            <div className="eyebrow mb-8" style={{ color: '#B58E64' }}>
              <span className="eyebrow-line" />
              <span>Our Philosophy</span>
            </div>

            <h2
              className="font-serif font-light text-warm-900 leading-[0.95] mb-8"
              style={{ fontSize: 'clamp(44px, 4.5vw, 72px)' }}
            >
              Where Science<br />
              Meets <em className="italic text-blush-500">Artistry</em>
            </h2>

            <p className="text-warm-600 leading-relaxed mb-5 text-base">
              At Beauty Redefined, we believe aesthetic medicine should be invisible in the most beautiful way — you simply look like the best version of yourself.
            </p>
            <p className="text-warm-600 leading-relaxed mb-12 text-base">
              Led by Dr. Maria Sousa — trained in Paris, London, and New York — our team of board-certified specialists listens first, then crafts a bespoke protocol that delivers results while honoring your natural features.
            </p>

            <div className="space-y-6 mb-12">
              {values.map(({ n, title, desc }, i) => (
                <div
                  key={n}
                  className="flex gap-5 items-start"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(12px)',
                    transition: `opacity 0.6s ease, transform 0.6s ease`,
                    transitionDelay: `${400 + i * 100}ms`,
                  }}
                >
                  <span className="font-serif text-sm flex-shrink-0 pt-1" style={{ color: '#C8A882' }}>{n}</span>
                  <div>
                    <div className="font-medium text-warm-900 mb-1 text-sm">{title}</div>
                    <div className="text-warm-500 text-sm leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-dark group"
            >
              Meet Our Specialists
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Small floating image with its own 3D tilt */
function FloatingSmallImage() {
  const { ref, onMouseMove, onMouseLeave } = use3dTilt(14);
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="absolute -bottom-8 -right-4 lg:-right-10 w-48 lg:w-64 aspect-square overflow-hidden cursor-default"
      style={{
        border: '4px solid #FAF8F5',
        boxShadow: '0 20px 60px rgba(26,18,12,0.2)',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease',
        willChange: 'transform',
        zIndex: 2,
      }}
    >
      <img
        src="https://images.pexels.com/photos/3985337/pexels-photo-3985337.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1"
        alt="Premium skincare products"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
