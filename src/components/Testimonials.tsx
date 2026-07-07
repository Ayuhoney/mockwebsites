import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Alexandra M.',
    role: 'HydraFacial · Peel Regimen',
    location: 'Paris, France',
    text: 'Absolutely transformative. My skin has never looked better — and it happened gradually, naturally, without anyone noticing I "had something done". That\'s the art of this clinic.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
  },
  {
    name: 'Sofia R.',
    role: 'Laser Hair Removal · IPL',
    location: 'London, UK',
    text: 'From my very first consultation I felt completely understood. The team listened, explained every step, and the results speak for themselves. I cannot recommend this clinic enough.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
  },
  {
    name: 'Camille T.',
    role: 'Lip Filler · Botox',
    location: 'Monaco',
    text: 'I was so nervous about fillers. Dr. Sousa took an hour just to talk with me before recommending anything. The result is impeccable — I look like myself, only more rested and refined.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
  },
  {
    name: 'Isabelle P.',
    role: 'CoolSculpting · RF Lifting',
    location: 'Geneva, Switzerland',
    text: 'A sanctuary for the skin and for the soul. Every visit feels like a retreat — and the science behind everything they do is impressive. Real results, real care, real luxury.',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState<'left' | 'right'>('right');
  const [animating, setAnimating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const go = useCallback((direction: 'prev' | 'next') => {
    if (animating) return;
    setDir(direction === 'next' ? 'right' : 'left');
    setAnimating(true);
    setTimeout(() => {
      setActive((a) =>
        direction === 'next' ? (a + 1) % testimonials.length : (a - 1 + testimonials.length) % testimonials.length
      );
      setAnimating(false);
    }, 250);
  }, [animating]);

  useEffect(() => {
    const id = setInterval(() => go('next'), 5000);
    return () => clearInterval(id);
  }, [go]);

  const t = testimonials[active];

  return (
    <section id="testimonials" className="bg-warm-900 py-24 lg:py-36 overflow-hidden relative">
      {/* Decorative large quote mark */}
      <div
        className="absolute top-12 left-10 font-serif text-[200px] lg:text-[300px] leading-none text-white/[0.025] select-none pointer-events-none"
        style={{ fontFamily: 'Cormorant Garamond, serif' }}
      >
        "
      </div>

      <div ref={ref} className="max-w-screen-xl mx-auto px-8 lg:px-14 relative z-10">
        <div
          className={`flex flex-col lg:flex-row gap-14 lg:gap-20 items-start lg:items-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Left: Header + controls */}
          <div className="flex-shrink-0 lg:w-72">
            <div className="eyebrow text-warm-500 mb-6">
              <span className="eyebrow-line bg-warm-700" />
              <span>Client Stories</span>
            </div>
            <h2
              className="font-serif font-light text-white leading-[0.95] mb-10"
              style={{ fontSize: 'clamp(40px, 4vw, 60px)' }}
            >
              Real People,<br />
              <em className="italic text-blush-300">Real Results</em>
            </h2>

            {/* Navigation */}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => go('prev')}
                className="w-12 h-12 border border-warm-700 hover:border-warm-400 flex items-center justify-center text-warm-400 hover:text-white transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => go('next')}
                className="w-12 h-12 border border-warm-700 hover:border-warm-400 flex items-center justify-center text-warm-400 hover:text-white transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="text-warm-600 text-sm font-serif">
                {String(active + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
              </span>
            </div>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === active ? 'w-6 h-1.5 bg-blush-400' : 'w-1.5 h-1.5 bg-warm-700 hover:bg-warm-500'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: Testimonial content */}
          <div className="flex-1">
            <div
              className="transition-all duration-200"
              style={{
                opacity: animating ? 0 : 1,
                transform: animating
                  ? `translateX(${dir === 'right' ? '20px' : '-20px'})`
                  : 'translateX(0)',
              }}
            >
              {/* Quote */}
              <blockquote className="font-serif font-light text-white leading-[1.4] mb-10"
                style={{ fontSize: 'clamp(22px, 2.5vw, 34px)' }}
              >
                "{t.text}"
              </blockquote>

              {/* Client */}
              <div className="flex items-center gap-5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover object-top ring-2 ring-warm-700"
                />
                <div>
                  <div className="font-medium text-white text-base">{t.name}</div>
                  <div className="text-[11px] tracking-[0.2em] uppercase text-champagne-500 mt-0.5">{t.role}</div>
                  <div className="text-[11px] tracking-[0.15em] uppercase text-warm-500 mt-0.5">{t.location}</div>
                </div>
                <div className="ml-auto hidden md:flex flex-col items-end gap-1">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-champagne-400">★</span>
                    ))}
                  </div>
                  <span className="text-[10px] tracking-widest text-warm-600 uppercase">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom trust bar */}
        <div className="mt-20 pt-10 border-t border-warm-800 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { v: '4.9★', l: 'Average Rating' },
            { v: '2,400+', l: 'Verified Reviews' },
            { v: '98%', l: 'Recommend Us' },
            { v: '10yr', l: 'Avg. Client Loyalty' },
          ].map(({ v, l }) => (
            <div key={l}>
              <div className="font-serif text-3xl font-light text-white mb-1">{v}</div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-warm-600">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
