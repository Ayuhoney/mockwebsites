import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

const treatments = [
  'Advanced Skincare',
  'Laser Treatment',
  'Injectables & Fillers',
  'Body Contouring',
  'Surgical Procedure',
  'VIP Consultation',
  'Not Sure — Advise Me',
];

type Form = { name: string; email: string; phone: string; service: string; message: string };

export default function Booking() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState<Form>({ name: '', email: '', phone: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSent(true);
  };

  const input = 'w-full bg-transparent border-b border-warm-200 focus:border-warm-700 focus:outline-none text-warm-900 placeholder-warm-300 py-3.5 text-sm transition-colors duration-200';

  return (
    <section id="contact" className="bg-warm-50">
      <div ref={ref} className="max-w-screen-xl mx-auto">
        <div
          className={`grid lg:grid-cols-[1fr_1.1fr] min-h-[700px] transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Left: Dark image panel */}
          <div className="relative bg-warm-900 px-8 lg:px-14 py-20 flex flex-col justify-between overflow-hidden">
            <img
              src="https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=900&h=1200&dpr=1"
              alt="Clinic interior"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
            />
            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-warm-900/90 to-warm-900/60" />

            <div className="relative z-10">
              <div className="eyebrow text-warm-500 mb-10">
                <span className="eyebrow-line bg-warm-700" />
                <span>Get In Touch</span>
              </div>
              <h2
                className="font-serif font-light text-white leading-[0.95] mb-6"
                style={{ fontSize: 'clamp(40px, 4vw, 64px)' }}
              >
                Begin Your<br />
                <em className="italic text-blush-300">Transformation</em>
              </h2>
              <p className="text-warm-400 text-sm leading-relaxed max-w-xs">
                First consultation is complimentary. Complete discretion guaranteed. Our specialists respond within 24 hours.
              </p>
            </div>

            <div className="relative z-10 space-y-5">
              {[
                { Icon: Phone, v: '+1 (555) 234-5678', s: 'Mon–Sat · 9am–6pm' },
                { Icon: Mail, v: 'hello@beautyredefined.com', s: 'We reply within 24h' },
                { Icon: MapPin, v: '84 Avenue Montaigne, Paris', s: 'Private entrance available' },
              ].map(({ Icon, v, s }) => (
                <div key={v} className="flex items-start gap-4">
                  <div className="w-8 h-8 border border-warm-700 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-champagne-500" />
                  </div>
                  <div>
                    <div className="text-warm-200 text-sm">{v}</div>
                    <div className="text-warm-600 text-[11px] tracking-widest uppercase mt-0.5">{s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white px-8 lg:px-14 py-20 flex flex-col justify-center">
            {sent ? (
              <div className="text-center max-w-sm mx-auto">
                <div className="w-16 h-16 bg-blush-100 flex items-center justify-center mx-auto mb-6">
                  <ArrowRight className="w-7 h-7 text-blush-500" />
                </div>
                <h3 className="font-serif text-3xl font-light text-warm-900 mb-4">Message Received</h3>
                <p className="text-warm-500 leading-relaxed text-sm mb-8">
                  Thank you. Your consultation request is in our hands and we'll be in touch within 24 hours to confirm your appointment time.
                </p>
                <button onClick={() => setSent(false)} className="btn-ghost">
                  Send Another Request
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-3xl font-light text-warm-900 mb-10">Book a Consultation</h3>
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] tracking-[0.2em] uppercase text-warm-400 mb-2">Full Name *</label>
                      <input name="name" required value={form.name} onChange={onChange} placeholder="Your name" className={input} />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.2em] uppercase text-warm-400 mb-2">Email *</label>
                      <input name="email" type="email" required value={form.email} onChange={onChange} placeholder="you@email.com" className={input} />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] tracking-[0.2em] uppercase text-warm-400 mb-2">Phone</label>
                      <input name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="+1 555 000 0000" className={input} />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.2em] uppercase text-warm-400 mb-2">Treatment *</label>
                      <select name="service" required value={form.service} onChange={onChange} className={`${input} cursor-pointer`}>
                        <option value="" disabled>Select treatment</option>
                        {treatments.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-warm-400 mb-2">Your Goals or Concerns</label>
                    <textarea name="message" rows={4} value={form.message} onChange={onChange} placeholder="Tell us what you'd like to achieve..." className={`${input} resize-none`} />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-dark w-full justify-center mt-2 group"
                  >
                    {loading ? (
                      <span className="flex items-center gap-3">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </span>
                    ) : (
                      <>
                        Request Consultation
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] tracking-widest uppercase text-warm-300">
                    Complimentary · No Obligation · 100% Confidential
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
