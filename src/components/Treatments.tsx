import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const featured = {
  title: 'HydraFacial MD',
  tag: 'Signature Treatment',
  desc: 'Our most sought-after procedure. A four-step protocol that cleanses, exfoliates, extracts, and infuses skin with tailored serums — immediate, visible luminosity with zero downtime.',
  duration: '60 min',
  img: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1200&dpr=1',
};

const secondary = [
  {
    title: 'CO₂ Laser Resurfacing',
    tag: 'Laser',
    duration: '45–90 min',
    img: 'https://images.pexels.com/photos/8413261/pexels-photo-8413261.jpeg?auto=compress&cs=tinysrgb&w=700&h=500&dpr=1',
  },
  {
    title: 'Lip Augmentation',
    tag: 'Injectables',
    duration: '30 min',
    img: 'https://images.pexels.com/photos/7108344/pexels-photo-7108344.jpeg?auto=compress&cs=tinysrgb&w=700&h=500&dpr=1',
  },
  {
    title: 'CoolSculpting Elite',
    tag: 'Body',
    duration: '35–60 min',
    img: 'https://images.pexels.com/photos/4046567/pexels-photo-4046567.jpeg?auto=compress&cs=tinysrgb&w=700&h=500&dpr=1',
  },
  {
    title: 'Botox & Anti-Wrinkle',
    tag: 'Injectables',
    duration: '20 min',
    img: 'https://images.pexels.com/photos/3985337/pexels-photo-3985337.jpeg?auto=compress&cs=tinysrgb&w=700&h=500&dpr=1',
  },
];

/* 3D tilt + glare card wrapper */
function TiltCard({
  children,
  className = '',
  intensity = 12,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    el.style.transform = `perspective(900px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale(1.025) translateZ(8px)`;

    if (glareRef.current) {
      const gx = ((e.clientX - rect.left) / rect.width) * 100;
      const gy = ((e.clientY - rect.top) / rect.height) * 100;
      glareRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.18) 0%, transparent 60%)`;
      glareRef.current.style.opacity = '1';
    }
  };

  const onMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        'perspective(900px) rotateY(0deg) rotateX(0deg) scale(1) translateZ(0)';
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  const onMouseEnter = () => {
    /* Shimmer sweep on enter */
    const sh = shimmerRef.current;
    if (sh) {
      sh.style.animation = 'none';
      // force reflow
      void sh.offsetWidth;
      sh.style.animation = 'shimmerSweep 0.65s ease forwards';
    }
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      {/* Glare layer */}
      <div
        ref={glareRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 25,
          opacity: 0,
          transition: 'opacity 0.25s ease',
          pointerEvents: 'none',
        }}
      />
      {/* Shimmer sweep */}
      <div
        ref={shimmerRef}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '-60%',
          width: '40%',
          zIndex: 26,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
          pointerEvents: 'none',
          transform: 'skewX(-15deg)',
        }}
      />
      {children}
    </div>
  );
}

function OverlayCard({
  img, tag, title, duration, large = false,
}: {
  img: string; tag: string; title: string; duration: string; large?: boolean;
}) {
  const [hov, setHov] = useState(false);

  return (
    <TiltCard
      className={`relative overflow-hidden cursor-pointer ${large ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
      intensity={large ? 8 : 12}
    >
      <img
        src={img}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: hov ? 'scale(1.07)' : 'scale(1.01)',
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      />
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(26,18,12,0.82) 0%, rgba(26,18,12,0.1) 55%, transparent 100%)' }}
      />
      {/* Hover overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(26,18,12,0.48)',
          opacity: hov ? 1 : 0,
          transition: 'opacity 0.45s ease',
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      />
      {/* Content */}
      <div
        className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="text-[10px] tracking-[0.28em] uppercase mb-2" style={{ color: '#D9C09A' }}>{tag}</div>
        <h3
          className={`font-serif font-light text-white leading-tight mb-3 ${large ? 'text-3xl lg:text-4xl' : 'text-xl lg:text-2xl'}`}
        >
          {title}
        </h3>
        <div
          className="flex items-center justify-between"
          style={{
            opacity: hov ? 1 : 0,
            transform: hov ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          <span className="text-[11px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.55)' }}>
            {duration}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-white border-b border-white/50 pb-px">
            Book <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </TiltCard>
  );
}

export default function Treatments() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="treatments" className="bg-warm-100 py-24 lg:py-32">
      <div className="max-w-screen-xl mx-auto px-8 lg:px-14">
        <div
          ref={ref}
          className={`flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div>
            <div className="eyebrow mb-5" style={{ color: '#B58E64' }}>
              <span className="eyebrow-line" />
              <span>Signature Treatments</span>
            </div>
            <h2
              className="font-serif font-light text-warm-900 leading-[0.95]"
              style={{ fontSize: 'clamp(44px, 4.5vw, 72px)' }}
            >
              Most Loved<br />
              <em className="italic text-blush-500">Procedures</em>
            </h2>
          </div>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-ghost self-start md:self-auto whitespace-nowrap mb-2"
          >
            All Treatments
          </button>
        </div>

        {/* Editorial magazine grid */}
        <div
          className={`grid lg:grid-cols-3 gap-4 transition-all duration-700 delay-200 ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="lg:row-span-2">
            <OverlayCard {...featured} large />
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {secondary.map((t) => (
              <OverlayCard key={t.title} {...t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
