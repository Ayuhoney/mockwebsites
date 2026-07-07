import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

const links = [
  { label: 'Projects', id: 'projects' },
  { label: 'Services', id: 'services' },
  { label: 'About',    id: 'about' },
  { label: 'Contact',  id: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(246,244,240,0.95)'
            : 'linear-gradient(to bottom, rgba(246,244,240,0.85) 0%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(212,148,26,0.15)' : 'none',
        }}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group">
            <div className="flex items-center gap-3">
              {/* Mark */}
              <div className="relative w-8 h-8 flex-shrink-0">
                <div className="absolute inset-0 border border-amber-500 rotate-45 scale-75 transition-transform group-hover:rotate-[135deg] duration-500" />
                <div className="absolute inset-[5px] bg-amber-500 rotate-45 scale-75" />
              </div>
              <div>
                <div className="font-sans font-bold text-stone-900 tracking-[0.22em] text-sm leading-none">STRUCTURA</div>
                <div className="font-sans text-[9px] tracking-[0.3em] text-stone-500 uppercase leading-none mt-0.5">Build · Design · Innovate</div>
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {links.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="amber-underline text-[11px] font-semibold tracking-[0.22em] uppercase text-stone-600 hover:text-stone-900 transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => scrollTo('contact')}
              className="btn-primary group"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-stone-900"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className="fixed inset-0 z-40 lg:hidden transition-all duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(246,244,240,0.9)' }}
          onClick={() => setOpen(false)}
        />
        <div
          className="absolute top-0 right-0 bottom-0 w-72 flex flex-col p-8 pt-24"
          style={{
            backgroundColor: '#F6F4F0',
            borderLeft: '1px solid rgba(212,148,26,0.2)',
            transform: open ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <nav className="flex flex-col gap-6 mb-10">
            {links.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left text-lg font-serif font-light text-stone-800 hover:text-amber-600 transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>
          <button onClick={() => scrollTo('contact')} className="btn-primary justify-center">
            Get a Quote <ArrowRight className="w-4 h-4" />
          </button>
          <div className="mt-auto pt-8 text-[10px] tracking-[0.2em] uppercase text-stone-400">
            © 2024 Structura
          </div>
        </div>
      </div>
    </>
  );
}
