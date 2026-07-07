import { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    id: 'skin',
    title: 'Advanced\nSkincare',
    tag: '01 — Skin',
    desc: 'Medical-grade facials, custom peel regimens, and cellular rejuvenation protocols. HydraFacial, Dermaplane, enzymatic peels — all tailored to your unique skin profile.',
    img: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=900&h=1200&dpr=1',
  },
  {
    id: 'laser',
    title: 'Laser\nTherapy',
    tag: '02 — Laser',
    desc: 'State-of-the-art laser technology for hair removal, skin resurfacing, pigmentation correction, and vascular lesions. IPL, CO₂ Fractional, Nd:YAG — precision at its finest.',
    img: 'https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&w=900&h=1200&dpr=1',
  },
  {
    id: 'injectables',
    title: 'Injectables\n& Fillers',
    tag: '03 — Injectables',
    desc: 'Natural, harmonious results through precision toxin and filler placement. Botox, Sculptra, Restylane, Juvederm — art-guided, evidence-based enhancement.',
    img: 'https://images.pexels.com/photos/7108344/pexels-photo-7108344.jpeg?auto=compress&cs=tinysrgb&w=900&h=1200&dpr=1',
  },
  {
    id: 'body',
    title: 'Body\nContouring',
    tag: '04 — Body',
    desc: 'Non-surgical fat reduction and skin tightening. CoolSculpting Elite, HIFU, radiofrequency lifting — sculpt your silhouette without downtime.',
    img: 'https://images.pexels.com/photos/4046567/pexels-photo-4046567.jpeg?auto=compress&cs=tinysrgb&w=900&h=1200&dpr=1',
  },
  {
    id: 'surgery',
    title: 'Surgical\nProcedures',
    tag: '05 — Surgery',
    desc: 'Minimally invasive and surgical cosmetic procedures by board-certified plastic surgeons. Rhinoplasty, blepharoplasty, liposuction — transformative, lasting results.',
    img: 'https://images.pexels.com/photos/4226122/pexels-photo-4226122.jpeg?auto=compress&cs=tinysrgb&w=900&h=1200&dpr=1',
  },
];

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="bg-warm-50">
      {/* Header */}
      <div
        ref={ref}
        className={`max-w-screen-xl mx-auto px-8 lg:px-14 pt-24 pb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <div>
          <div className="eyebrow text-champagne-600 mb-5">
            <span className="eyebrow-line" />
            <span>What We Offer</span>
          </div>
          <h2
            className="font-serif font-light text-warm-900 leading-[0.95]"
            style={{ fontSize: 'clamp(48px, 5vw, 80px)' }}
          >
            Treatments Crafted<br />
            <em className="italic text-blush-500">for Every Goal</em>
          </h2>
        </div>
        <p className="text-warm-500 text-sm leading-relaxed max-w-xs lg:mb-2">
          Hover each panel to explore — every treatment starts with a bespoke consultation.
        </p>
      </div>

      {/* Desktop: Horizontal accordion */}
      <div
        className="hidden lg:flex h-[70vh] min-h-[500px]"
        onMouseLeave={() => setHovered(null)}
      >
        {services.map((s, i) => {
          const isActive = hovered === i;
          const isInactive = hovered !== null && !isActive;
          return (
            <div
              key={s.id}
              className="service-panel relative overflow-hidden cursor-pointer group"
              style={{
                flex: hovered === null ? 1 : isActive ? 4.5 : 0.6,
              }}
              onMouseEnter={() => setHovered(i)}
            >
              {/* Image */}
              <img
                src={s.img}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                style={{ transform: isActive ? 'scale(1.05)' : 'scale(1.02)' }}
              />
              {/* Gradient */}
              <div
                className="absolute inset-0 transition-all duration-700"
                style={{
                  background: isActive
                    ? 'linear-gradient(to top, rgba(26,18,12,0.9) 0%, rgba(26,18,12,0.3) 50%, rgba(26,18,12,0.1) 100%)'
                    : 'linear-gradient(to top, rgba(26,18,12,0.7) 0%, rgba(26,18,12,0.4) 60%, rgba(26,18,12,0.2) 100%)',
                }}
              />

              {/* Collapsed: vertical label */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isInactive || isActive ? 'opacity-0' : 'opacity-100'}`}
              >
                <span
                  className="writing-vertical text-[11px] tracking-[0.3em] uppercase font-medium text-white/70"
                >
                  {s.tag}
                </span>
              </div>

              {/* Expanded: full content */}
              <div
                className={`absolute bottom-0 left-0 right-0 p-10 transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                <div className="text-[10px] tracking-[0.3em] uppercase font-medium text-champagne-400 mb-3">{s.tag}</div>
                <h3 className="font-serif text-4xl font-light text-white mb-4 leading-tight whitespace-pre-line">
                  {s.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-xs">{s.desc}</p>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase font-medium text-white border-b border-white/40 pb-0.5 hover:border-white transition-colors"
                >
                  Book This Treatment
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: vertical grid */}
      <div className="lg:hidden grid sm:grid-cols-2 gap-4 px-8 pb-16">
        {services.map((s) => (
          <div key={s.id} className="relative aspect-[4/5] overflow-hidden group cursor-pointer">
            <img
              src={s.img}
              alt={s.title}
              className="w-full h-full object-cover img-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-warm-900/85 via-warm-900/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="text-[10px] tracking-[0.25em] uppercase text-champagne-400 mb-1">{s.tag}</div>
              <h3 className="font-serif text-2xl font-light text-white leading-tight whitespace-pre-line">{s.title}</h3>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-3 inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-white/70 hover:text-white"
              >
                Book <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
