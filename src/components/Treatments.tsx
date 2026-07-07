import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

type Category = 'All' | 'Commercial' | 'Residential' | 'Infrastructure' | 'Industrial';

const projects = [
  {
    id: 1,
    title: 'Apex Corporate Tower',
    category: 'Commercial' as Category,
    location: 'Dubai, UAE',
    year: '2023',
    area: '120,000 m²',
    img: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  },
  {
    id: 2,
    title: 'Harborview Residences',
    category: 'Residential' as Category,
    location: 'Singapore',
    year: '2022',
    area: '85,000 m²',
    img: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  },
  {
    id: 3,
    title: 'Metro Central Bridge',
    category: 'Infrastructure' as Category,
    location: 'Amsterdam, NL',
    year: '2023',
    area: '4.2 km span',
    img: 'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  },
  {
    id: 4,
    title: 'Titan Industrial Park',
    category: 'Industrial' as Category,
    location: 'Frankfurt, DE',
    year: '2021',
    area: '200,000 m²',
    img: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  },
  {
    id: 5,
    title: 'Skyline Mixed-Use Complex',
    category: 'Commercial' as Category,
    location: 'Tokyo, Japan',
    year: '2022',
    area: '160,000 m²',
    img: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  },
  {
    id: 6,
    title: 'Seaport Terminal T4',
    category: 'Infrastructure' as Category,
    location: 'Rotterdam, NL',
    year: '2023',
    area: '340,000 m²',
    img: 'https://images.pexels.com/photos/163726/belgium-antwerp-shipping-container-163726.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
  },
];

const categories: Category[] = ['All', 'Commercial', 'Residential', 'Infrastructure', 'Industrial'];

export default function Treatments() {
  const [active, setActive] = useState<Category>('All');
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

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  return (
    <section id="projects" className="bg-stone-50 py-28">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={ref} className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div>
            <div
              className="eyebrow text-stone-500 mb-5"
              style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.1s' }}
            >
              <span className="eyebrow-line" />
              <span>Featured Projects</span>
            </div>
            <h2
              className="font-serif font-light text-stone-900 leading-[0.92]"
              style={{
                fontSize: 'clamp(40px, 5vw, 72px)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'all 0.7s ease 0.2s',
              }}
            >
              Our Landmark<br />
              <em className="not-italic text-amber-500">Works</em>
            </h2>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="px-4 py-2 text-[11px] tracking-[0.2em] uppercase font-semibold transition-all duration-200"
                style={{
                  background: active === cat ? '#F5B520' : 'transparent',
                  color: active === cat ? '#0E0B08' : '#6A6050',
                  border: `1px solid ${active === cat ? '#F5B520' : '#D8D1C6'}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className="group relative overflow-hidden cursor-pointer"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.7s ease ${i * 100 + 300}ms`,
                aspectRatio: '4/3',
              }}
            >
              {/* Image */}
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover img-zoom"
              />

              {/* Category badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 text-[9px] tracking-[0.25em] uppercase font-semibold bg-amber-400 text-stone-900">
                  {project.category}
                </span>
              </div>

              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500"
                style={{
                  background: 'linear-gradient(to top, rgba(14,11,8,0.92) 0%, rgba(14,11,8,0.40) 45%, rgba(14,11,8,0.15) 100%)',
                }}
              >
                <div className="transform transition-all duration-400 group-hover:translate-y-0 translate-y-2">
                  <div className="text-[10px] tracking-[0.25em] uppercase text-amber-400 mb-2">
                    {project.location} · {project.year}
                  </div>
                  <h3 className="font-serif text-xl font-light text-white mb-1">{project.title}</h3>
                  <div className="text-[11px] tracking-[0.15em] uppercase text-stone-300 mb-4">{project.area}</div>

                  {/* View link — appears on hover */}
                  <div
                    className="flex items-center gap-2 text-amber-400 text-[11px] tracking-[0.2em] uppercase font-semibold"
                    style={{
                      opacity: 0,
                      transform: 'translateY(8px)',
                      transition: 'all 0.3s ease',
                    }}
                    ref={(el) => {
                      if (el) {
                        const parent = el.closest('.group');
                        parent?.addEventListener('mouseenter', () => {
                          el.style.opacity = '1';
                          el.style.transform = 'translateY(0)';
                        });
                        parent?.addEventListener('mouseleave', () => {
                          el.style.opacity = '0';
                          el.style.transform = 'translateY(8px)';
                        });
                      }
                    }}
                  >
                    View Project
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <button className="btn-outline group">
            View All Projects
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
