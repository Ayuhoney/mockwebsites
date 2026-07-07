import { Instagram, Facebook, Youtube } from 'lucide-react';

const links = {
  Treatments: ['Advanced Skincare', 'Laser Therapy', 'Injectables', 'Body Contouring', 'Surgery'],
  Clinic:     ['About Us', 'Our Team', 'Technology & Equipment', 'Press & Awards', 'Careers'],
  Legal:      ['Privacy Policy', 'Terms of Service', 'Cookie Notice', 'Accessibility'],
};

export default function Footer() {
  return (
    <footer className="bg-warm-900 text-white">
      {/* Newsletter bar */}
      <div className="border-b border-warm-800">
        <div className="max-w-screen-xl mx-auto px-8 lg:px-14 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-serif text-xl font-light text-white mb-1">Stay in the know.</p>
            <p className="text-warm-500 text-sm">Clinic news, expert tips, and exclusive offers — delivered beautifully.</p>
          </div>
          <form className="flex gap-0 w-full md:w-auto min-w-72" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-warm-800 border border-warm-700 focus:border-warm-500 focus:outline-none text-warm-200 placeholder-warm-600 px-5 py-3 text-sm transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blush-500 hover:bg-blush-600 text-white text-xs tracking-[0.2em] uppercase font-medium transition-colors flex-shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-screen-xl mx-auto px-8 lg:px-14 pt-16 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 mb-14">
          {/* Brand */}
          <div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mb-5 text-left group block"
            >
              <div className="font-serif text-2xl font-light text-white tracking-[0.06em] mb-1">Beauty Redefined</div>
              <div className="text-[9px] tracking-[0.35em] uppercase text-warm-600">Skin · Laser · Surgery</div>
            </button>
            <p className="text-warm-500 text-sm leading-relaxed max-w-xs mb-8">
              Premium aesthetic medicine where science meets artistry. Board-certified specialists. Medical-grade technology. Deeply personal care.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className="w-10 h-10 border border-warm-800 hover:border-blush-500 flex items-center justify-center text-warm-600 hover:text-blush-400 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-[10px] tracking-[0.28em] uppercase font-medium text-warm-500 mb-5">{section}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <button className="text-sm text-warm-400 hover:text-white transition-colors text-left">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications bar */}
        <div className="border-t border-warm-800 pt-8 pb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            {['Board Certified', 'FDA Approved', 'ISO 9001', 'IAHRS Member'].map((cert) => (
              <span key={cert} className="text-[10px] tracking-[0.2em] uppercase text-warm-700 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-champagne-600" />
                {cert}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-warm-700">
            &copy; {new Date().getFullYear()} Beauty Redefined. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
