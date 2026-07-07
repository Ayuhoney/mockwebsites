import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Structura delivered our 40-story corporate tower 3 weeks ahead of schedule — an extraordinary feat of project management and engineering. The quality exceeded every benchmark we set.",
    author: 'James Whitmore',
    title: 'CEO, Meridian Global Finance',
    company: 'MERIDIAN',
    location: 'Dubai, UAE',
    project: 'Apex Corporate Tower',
    rating: 5,
  },
  {
    quote: "The Harborview residential complex is a masterpiece. Structura's team brought a level of design sensitivity and technical rigor that we've never experienced with any other firm. Our residents are thrilled.",
    author: 'Lena Hoffmann',
    title: 'Director of Development, Horizon Group',
    company: 'HORIZON',
    location: 'Singapore',
    project: 'Harborview Residences',
    rating: 5,
  },
  {
    quote: "Building the Metro Central Bridge required solving engineering problems no one had tackled before. Structura's team found elegant solutions under immense pressure. A world-class engineering achievement.",
    author: 'Pieter Van Der Berg',
    title: 'Infrastructure Minister, Amsterdam Municipality',
    company: 'AMSTERDAM',
    location: 'Amsterdam, NL',
    project: 'Metro Central Bridge',
    rating: 5,
  },
  {
    quote: "From initial feasibility through commissioning, Structura managed every complexity with precision. Their integrated design-build approach saved us 18% against our original budget estimates.",
    author: 'Kenji Watanabe',
    title: 'Head of Real Estate, TechVision Corp',
    company: 'TECHVISION',
    location: 'Tokyo, Japan',
    project: 'Skyline Mixed-Use Complex',
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const go = (dir: 'prev' | 'next') => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive((a) => dir === 'next'
        ? (a + 1) % testimonials.length
        : (a - 1 + testimonials.length) % testimonials.length
      );
      setAnimating(false);
    }, 200);
  };

  const t = testimonials[active];

  return (
    <section className="bg-stone-100 py-28 overflow-hidden">
      <div ref={ref} className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div
              className="eyebrow text-stone-400 mb-6"
              style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.1s' }}
            >
              <span className="eyebrow-line" />
              <span>Client Voices</span>
            </div>
            <h2
              className="font-serif font-light text-stone-900 leading-[0.92]"
              style={{
                fontSize: 'clamp(38px, 5vw, 68px)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'all 0.7s ease 0.2s',
              }}
            >
              Trusted by<br />
              <em className="not-italic text-amber-600">Industry Leaders</em>
            </h2>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => go('prev')}
              className="w-12 h-12 flex items-center justify-center transition-all duration-200 text-stone-500 hover:text-stone-900"
              style={{ border: '1px solid rgba(106,96,80,0.2)', background: 'rgba(255,255,255,0.5)' }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => go('next')}
              className="w-12 h-12 flex items-center justify-center transition-all duration-200 text-stone-500 hover:text-stone-900"
              style={{ border: '1px solid rgba(106,96,80,0.2)', background: 'rgba(255,255,255,0.5)' }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <span className="text-stone-400 text-sm font-mono ml-2">
              {String(active + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Testimonial */}
        <div
          className="grid lg:grid-cols-[1fr_320px] gap-16 items-center"
          style={{ opacity: animating ? 0 : 1, transition: 'opacity 0.2s ease' }}
        >
          <div>
            {/* Stars */}
            <div className="flex gap-1 mb-8">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
              ))}
            </div>

            {/* Quote */}
            <blockquote
              className="font-serif font-light text-stone-800 leading-relaxed mb-10"
              style={{ fontSize: 'clamp(18px, 2.2vw, 28px)' }}
            >
              <span className="text-amber-500 text-5xl font-serif leading-none mr-1">"</span>
              {t.quote}
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-5">
              <div
                className="w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-sm text-white"
                style={{ background: '#D4941A' }}
              >
                {t.author.split(' ').map(w => w[0]).join('')}
              </div>
              <div>
                <div className="font-semibold text-stone-900 text-sm">{t.author}</div>
                <div className="text-stone-500 text-xs">{t.title}</div>
              </div>
            </div>
          </div>

          {/* Right — project card */}
          <div
            className="p-8"
            style={{
              background: 'white',
              border: '1px solid rgba(106,96,80,0.12)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
            }}
          >
            <div className="text-[9px] tracking-[0.3em] uppercase text-stone-400 mb-4">Project Reference</div>
            <div className="font-serif text-xl font-light text-stone-900 mb-2">{t.project}</div>
            <div className="h-px w-8 bg-amber-500 mb-4" />
            <div className="text-stone-500 text-xs mb-6">{t.location}</div>
            <div
              className="text-3xl font-bold tracking-[0.15em] text-stone-300"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              {t.company}
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === active ? '2rem' : '0.375rem',
                height: '0.25rem',
                background: i === active ? '#D4941A' : 'rgba(106,96,80,0.25)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
