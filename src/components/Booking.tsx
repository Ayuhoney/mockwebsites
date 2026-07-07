import { useState } from 'react';
import { ArrowRight, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
};

const projectTypes = [
  'Commercial Tower',
  'Residential Complex',
  'Infrastructure / Civil',
  'Industrial Facility',
  'Renovation / Retrofit',
  'Interior Architecture',
  'Other',
];

const budgets = [
  'Under $1M',
  '$1M – $10M',
  '$10M – $50M',
  '$50M – $200M',
  '$200M+',
  'Not yet determined',
];

const inputCls = `
  w-full bg-stone-50 border border-stone-200
  focus:border-amber-400 focus:outline-none
  text-stone-900 placeholder-stone-400
  px-4 py-3 text-sm transition-colors
`.trim();

export default function Booking() {
  const [form, setForm] = useState<FormData>({
    name: '', company: '', email: '', phone: '', projectType: '', budget: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-stone-50">
      <div className="max-w-screen-xl mx-auto grid lg:grid-cols-[420px_1fr]">

        {/* Left — dark info panel */}
        <div className="bg-stone-900 px-10 py-20 flex flex-col">
          <div className="eyebrow text-stone-600 mb-8">
            <span className="eyebrow-line" />
            <span>Get in Touch</span>
          </div>

          <h2
            className="font-serif font-light text-white leading-[0.92] mb-8"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
          >
            Let's Build<br />
            <em className="not-italic text-amber-400">Something Great</em>
          </h2>

          <p className="text-stone-400 text-sm leading-relaxed mb-12">
            Whether you're planning a landmark tower or a precision renovation, our team is ready to discuss your vision. Reach out for a complimentary initial consultation.
          </p>

          {/* Contact details */}
          <div className="space-y-6 mb-12">
            {[
              { icon: Phone, label: '+1 (555) 200 4800', sub: 'Mon–Fri, 8am–6pm' },
              { icon: Mail,  label: 'projects@structura.com', sub: 'Typically reply within 24h' },
              { icon: MapPin, label: '350 Park Avenue, New York', sub: 'NY 10022, United States' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-start gap-4">
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                  style={{ border: '1px solid rgba(245,181,32,0.25)', background: 'rgba(245,181,32,0.06)' }}
                >
                  <Icon className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{label}</div>
                  <div className="text-stone-500 text-xs mt-0.5">{sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Credibility bar */}
          <div
            className="mt-auto pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            {['ISO 9001 Certified', 'Licensed in 40+ Countries', 'Award-Winning Team'].map((item) => (
              <div key={item} className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rotate-45 bg-amber-400 flex-shrink-0" />
                <span className="text-stone-400 text-xs tracking-[0.12em] uppercase">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="px-10 lg:px-16 py-20 bg-white">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <CheckCircle className="w-14 h-14 text-amber-400 mb-6" />
              <h3 className="font-serif text-3xl font-light text-stone-900 mb-3">Thank You</h3>
              <p className="text-stone-500 text-sm max-w-xs leading-relaxed">
                Your inquiry has been received. A senior project consultant will be in touch within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl">
              <h3 className="font-serif text-2xl font-light text-stone-900 mb-8">Project Inquiry</h3>

              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">Full Name *</label>
                  <input required type="text" placeholder="John Anderson" className={inputCls} value={form.name} onChange={set('name')} />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">Company</label>
                  <input type="text" placeholder="Your Organisation" className={inputCls} value={form.company} onChange={set('company')} />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">Email Address *</label>
                  <input required type="email" placeholder="you@company.com" className={inputCls} value={form.email} onChange={set('email')} />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">Phone</label>
                  <input type="tel" placeholder="+1 555 000 0000" className={inputCls} value={form.phone} onChange={set('phone')} />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">Project Type *</label>
                  <select required className={inputCls} value={form.projectType} onChange={set('projectType')}>
                    <option value="">Select type…</option>
                    {projectTypes.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">Estimated Budget</label>
                  <select className={inputCls} value={form.budget} onChange={set('budget')}>
                    <option value="">Select range…</option>
                    {budgets.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-2">Project Brief</label>
                <textarea
                  rows={5}
                  placeholder="Describe your project — scope, location, timeline, any specific requirements…"
                  className={`${inputCls} resize-none`}
                  value={form.message}
                  onChange={set('message')}
                />
              </div>

              <button type="submit" className="btn-primary group w-full justify-center sm:w-auto">
                Submit Inquiry
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <p className="text-stone-400 text-xs mt-5 leading-relaxed">
                By submitting, you agree to our Privacy Policy. We'll never share your details with third parties.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
