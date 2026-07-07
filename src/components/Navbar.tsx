import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Services',     id: 'services'     },
  { label: 'About',        id: 'about'        },
  { label: 'Treatments',   id: 'treatments'   },
  { label: 'Testimonials', id: 'testimonials' },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); // set initial state
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-warm-50/96 backdrop-blur-xl border-b border-warm-200/70 shadow-md shadow-warm-900/5'
            : 'bg-gradient-to-b from-black/55 via-black/15 to-transparent'
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-8 lg:px-14 flex items-center justify-between h-[72px]">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col leading-none"
          >
            <span
              className={`font-serif text-[22px] font-light tracking-[0.08em] transition-colors duration-300 ${
                scrolled ? 'text-warm-900' : 'text-white'
              }`}
            >
              Beauty Redefined
            </span>
            <span
              className={`font-sans text-[9px] tracking-[0.35em] uppercase mt-0.5 transition-colors duration-300 ${
                scrolled ? 'text-champagne-600' : 'text-white/70'
              }`}
            >
              Skin · Laser · Surgery
            </span>
          </button>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-10">
            {links.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => go(id)}
                className={`text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-200 ${
                  scrolled
                    ? 'text-warm-700 hover:text-blush-500'
                    : 'text-white hover:text-blush-300'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => go('contact')}
              className={`hidden lg:inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-medium px-6 py-2.5 transition-all duration-300 ${
                scrolled
                  ? 'bg-warm-900 text-warm-50 hover:bg-blush-600'
                  : 'bg-white/15 backdrop-blur-sm text-white border border-white/40 hover:bg-white/25 hover:border-white/60'
              }`}
            >
              Book Now
            </button>
            <button
              onClick={() => setOpen(!open)}
              className={`lg:hidden transition-colors ${
                scrolled ? 'text-warm-800' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          open ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundColor: 'rgba(26,18,12,0.65)' }}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 bottom-0 w-72 flex flex-col pt-24 px-10 transition-transform duration-300 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ backgroundColor: '#FAF8F5' }}
        >
          <nav className="flex flex-col gap-7">
            {links.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => go(id)}
                className="text-left font-serif text-2xl font-light text-warm-800 hover:text-blush-500 transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => go('contact')}
            className="mt-10 btn-dark self-start"
          >
            Book Consultation
          </button>

          {/* Teal accent line */}
          <div className="mt-auto mb-10">
            <div className="h-px w-12 bg-champagne-500 mb-4" />
            <p className="text-warm-500 text-xs tracking-widest uppercase">Est. 2009 · Paris</p>
          </div>
        </div>
      </div>
    </>
  );
}
