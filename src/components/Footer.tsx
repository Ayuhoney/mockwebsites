import { Linkedin, Twitter, Instagram } from 'lucide-react';

const columns = {
  Services: ['Architecture & Design', 'Structural Engineering', 'Project Management', 'Interior Architecture', 'Civil Engineering', 'Renovation & Retrofit'],
  Projects: ['Commercial Towers', 'Residential Complexes', 'Infrastructure', 'Industrial Facilities', 'Public Works'],
  Company:  ['About Structura', 'Our Team', 'Careers', 'Press & Awards', 'Sustainability', 'Contact Us'],
};

export default function Footer() {
  return (
    <footer className="bg-stone-200 text-stone-900">
      {/* CTA banner */}
      <div style={{ background: '#D4941A' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-serif text-xl font-light text-white">Ready to break ground?</p>
            <p className="text-amber-100 text-sm">Speak with a senior project consultant today.</p>
          </div>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 bg-stone-900 text-white px-6 py-3 text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-stone-800 transition-colors flex-shrink-0"
          >
            Get a Free Consultation
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 pt-16 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 mb-16">
          {/* Brand */}
          <div>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="mb-6 text-left block">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-7 h-7 flex-shrink-0">
                  <div className="absolute inset-0 border border-stone-600 rotate-45 scale-75" />
                  <div className="absolute inset-[5px] bg-stone-600 rotate-45 scale-75" />
                </div>
                <span className="font-sans font-bold text-stone-900 tracking-[0.2em] text-sm">STRUCTURA</span>
              </div>
              <div className="text-[9px] tracking-[0.3em] uppercase text-stone-500">Build · Design · Innovate</div>
            </button>

            <p className="text-stone-600 text-sm leading-relaxed max-w-xs mb-8">
              Global construction and architecture firm delivering landmark structures across 40+ countries since 2000.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                <button
                  key={i}
                  className="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-amber-600 transition-colors"
                  style={{ border: '1px solid rgba(106,96,80,0.15)', background: 'white' }}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(columns).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-[10px] tracking-[0.3em] uppercase font-semibold text-stone-500 mb-5">{section}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <button className="text-sm text-stone-600 hover:text-stone-900 transition-colors text-left">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(106,96,80,0.15)' }}
        >
          <div className="flex flex-wrap items-center gap-6">
            {['ISO 9001', 'Board Certified Engineers', 'LEED Certified', 'FIDIC Member'].map((cert) => (
              <span key={cert} className="text-[10px] tracking-[0.18em] uppercase text-stone-500 flex items-center gap-2">
                <span className="w-1 h-1 rotate-45 bg-amber-500 flex-shrink-0" />
                {cert}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-stone-500">
            © {new Date().getFullYear()} Structura Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
