import { useEffect, useRef, useState } from 'react';
import { Building2, Layers, BarChart3, Hammer, HardHat, RefreshCw, ChevronDown } from 'lucide-react';

const services = [
  {
    icon: Building2,
    title: 'Architecture & Design',
    desc: 'Visionary architectural concepts translated into iconic structures. From concept to construction drawings, we deliver designs that stand the test of time.',
    tags: ['BIM Modeling', 'Conceptual Design', 'Technical Drawing'],
  },
  {
    icon: HardHat,
    title: 'Structural Engineering',
    desc: 'Advanced structural analysis and engineering solutions for complex high-rise and large-span structures. Safety and efficiency in every calculation.',
    tags: ['Seismic Analysis', 'Load Engineering', 'Foundation Design'],
  },
  {
    icon: BarChart3,
    title: 'Project Management',
    desc: 'End-to-end construction management with rigorous cost control, scheduling, and quality assurance protocols to deliver on time and on budget.',
    tags: ['Scheduling', 'Cost Control', 'Risk Management'],
  },
  {
    icon: Layers,
    title: 'Interior Architecture',
    desc: 'Interior environments designed for human experience. Commercial, hospitality, and residential interiors that are both functional and inspiring.',
    tags: ['Space Planning', 'FF&E Selection', 'Lighting Design'],
  },
  {
    icon: Hammer,
    title: 'Civil Engineering',
    desc: 'Infrastructure engineering for roads, bridges, utilities, and earthworks. We handle the complex ground-up challenges of large-scale civil projects.',
    tags: ['Site Development', 'Drainage Systems', 'Road & Bridge'],
  },
  {
    icon: RefreshCw,
    title: 'Renovation & Retrofit',
    desc: 'Breathing new life into existing structures. Structural reinforcement, facade upgrades, MEP retrofit, and adaptive reuse projects.',
    tags: ['Structural Upgrade', 'MEP Retrofit', 'Adaptive Reuse'],
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="bg-stone-200 py-28">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div ref={ref} className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div
              className="eyebrow text-stone-500 mb-6"
              style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.1s' }}
            >
              <span className="eyebrow-line" />
              <span>What We Do</span>
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
              Full-Spectrum<br />
              <em className="not-italic text-amber-600">Construction Services</em>
            </h2>
          </div>
          <p
            className="text-stone-600 text-sm leading-relaxed max-w-sm"
            style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 0.35s' }}
          >
            From initial concept through final handover, our integrated team handles every phase with precision and expertise.
          </p>
        </div>

        {/* Service grid — desktop cards / mobile accordion */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(106,96,80,0.1)' }}>
          {services.map(({ icon: Icon, title, desc, tags }, i) => (
            <div
              key={title}
              className="group bg-stone-200 p-8 hover:bg-white transition-all duration-300 cursor-default"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: `all 0.6s ease ${i * 80 + 300}ms`,
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 flex items-center justify-center mb-6 transition-all duration-300"
                style={{ border: '1px solid rgba(212,148,26,0.4)', background: 'rgba(212,148,26,0.08)' }}
              >
                <Icon className="w-5 h-5 text-amber-600" />
              </div>

              <div className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-3 font-mono">
                {String(i + 1).padStart(2, '0')}
              </div>

              <h3 className="font-serif text-lg font-light text-stone-900 mb-3 group-hover:text-amber-700 transition-colors">
                {title}
              </h3>

              {/* Amber accent line */}
              <div
                className="h-px mb-4 transition-all duration-400"
                style={{
                  background: 'linear-gradient(to right, rgba(212,148,26,0.8), transparent)',
                  width: '0',
                }}
                ref={(el) => {
                  if (!el) return;
                  const parent = el.closest('.group');
                  parent?.addEventListener('mouseenter', () => { el.style.width = '2rem'; });
                  parent?.addEventListener('mouseleave', () => { el.style.width = '0'; });
                }}
              />

              <p className="text-stone-600 text-sm leading-relaxed mb-5">{desc}</p>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-[9px] tracking-[0.2em] uppercase text-stone-500"
                    style={{ border: '1px solid rgba(106,96,80,0.15)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile accordion */}
        <div className="md:hidden flex flex-col">
          {services.map(({ icon: Icon, title, desc, tags }, i) => (
            <div
              key={title}
              className="border-b border-stone-300"
              style={{ opacity: visible ? 1 : 0, transition: `opacity 0.5s ease ${i * 80}ms` }}
            >
              <button
                className="w-full flex items-center justify-between py-5 text-left"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span className="font-serif text-base text-stone-900">{title}</span>
                </div>
                <ChevronDown
                  className="w-4 h-4 text-stone-500 flex-shrink-0 transition-transform"
                  style={{ transform: expanded === i ? 'rotate(180deg)' : 'rotate(0)' }}
                />
              </button>
              {expanded === i && (
                <div className="pb-5">
                  <p className="text-stone-600 text-sm leading-relaxed mb-4">{desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 text-[9px] tracking-[0.2em] uppercase text-stone-500 border border-stone-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
