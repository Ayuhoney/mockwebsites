import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Award, Globe, Shield } from 'lucide-react';

const highlights = [
  { icon: Award, value: '20+', label: 'Industry Awards', desc: 'International architecture & engineering recognition' },
  { icon: Globe,  value: '40',  label: 'Countries',       desc: 'Active projects spanning six continents' },
  { icon: Shield, value: 'ISO', label: '9001 Certified',  desc: 'Quality management system across all operations' },
];

export default function About() {
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

  return (
    <section id="about" className="bg-stone-50 py-28 overflow-hidden">
      <div ref={ref} className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — image */}
          <div
            className="relative"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s',
            }}
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
              <img
                src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=900&h=1100&dpr=1"
                alt="Structura construction site"
                className="w-full h-full object-cover img-zoom"
              />
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-400" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-400" />
            </div>

            {/* Floating badge */}
            <div
              className="absolute -bottom-6 -right-4 lg:-right-10 p-6 bg-stone-900 text-white"
              style={{ boxShadow: '0 20px 60px rgba(14,11,8,0.3)', minWidth: 180 }}
            >
              <div className="font-serif text-5xl font-light text-amber-400 leading-none mb-2">25</div>
              <div className="text-[9px] tracking-[0.3em] uppercase text-stone-400">Years of<br />Excellence</div>
            </div>
          </div>

          {/* Right — content */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s',
            }}
          >
            <div className="eyebrow text-stone-400 mb-6">
              <span className="eyebrow-line" />
              <span>Our Story</span>
            </div>

            <h2
              className="font-serif font-light text-stone-900 leading-[0.92] mb-8"
              style={{ fontSize: 'clamp(36px, 4.5vw, 62px)' }}
            >
              Engineering the World's<br />
              <em className="not-italic text-amber-600">Most Iconic Structures</em>
            </h2>

            <p className="text-stone-600 text-base leading-relaxed mb-5">
              Founded in 2000, Structura has grown from a regional design firm into a global construction powerhouse. We combine the precision of engineering with the vision of architecture — delivering projects that redefine skylines and communities.
            </p>
            <p className="text-stone-500 text-sm leading-relaxed mb-10">
              Our multidisciplinary team of 2,400 professionals operates across six continents, bringing local expertise and global standards to every project we undertake.
            </p>

            {/* Highlights */}
            <div className="space-y-5 mb-10">
              {highlights.map(({ icon: Icon, value, label, desc }) => (
                <div key={label} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(245,181,32,0.1)', border: '1px solid rgba(245,181,32,0.3)' }}
                  >
                    <Icon className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-stone-900 text-sm">{value}</span>
                      <span className="text-[10px] tracking-[0.2em] uppercase text-amber-600 font-semibold">{label}</span>
                    </div>
                    <p className="text-stone-500 text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-dark group"
            >
              Start a Project
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
