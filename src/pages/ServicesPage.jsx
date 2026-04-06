import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react'
import AnimatedSection from '../components/ui/AnimatedSection'
import LazyImage from '../components/ui/LazyImage'

/* ─────────────────────────────────────────────
   WIDE-SCREEN STYLES
───────────────────────────────────────────── */
const wideScreenStyles = `

.ws-section-py { padding-top: 5rem; padding-bottom: 5rem; }

  @media (min-width: 768px) {
    .ws-section-py { padding-top: 6rem; padding-bottom: 6rem; }
  }
  @media (min-width: 1024px) {
    .ws-section-py { padding-top: 7rem; padding-bottom: 7rem; }
  }
    
  @media (min-width: 1536px) {
    .ws-container { max-width: 1800px; }
    .ws-section-title  { font-size: 3rem; margin-bottom: 1.5rem; }
    .ws-section-sub    { font-size: 1.25rem; margin-top: 1.25rem; }
    .ws-hero-text h1   { font-size: 4.5rem; }
    .ws-hero-text p    { font-size: 1.375rem; }
  }
  @media (min-width: 1920px) {
    .ws-container { max-width: 2100px; }
    .ws-section-title  { font-size: 3.75rem; margin-bottom: 1.75rem; }
    .ws-card-title  { font-size: 3rem; line-height: 3rem; margin-bottom: 1.75rem; }
    .ws-card-body  { font-size: 1.2rem; margin-bottom: 1.75rem; }
    .ws-section-sub    { font-size: 1.375rem; margin-top: 1.5rem; }
    .ws-hero-text h1   { font-size: 5.5rem; }
    .ws-hero-text p    { font-size: 1.5rem; }
    .ws-section-py     { padding-top: 8rem; padding-bottom: 8rem; }
  }
  @media (min-width: 2560px) {
    .ws-container { 
      max-width: 2560px;
      padding-left: 6rem;
      padding-right: 6rem;
    }
    .ws-section-title  { font-size: 5rem; margin-bottom: 2.25rem; }
    .ws-card-title  { font-size: 3.5rem; line-height: 3rem; margin-bottom: 1.75rem; }
    .ws-card-body  { font-size: 1.5rem; margin-bottom: 1.75rem; }
    .ws-section-sub    { font-size: 1.625rem; margin-top: 1.75rem; }
    .ws-hero-text h1   { font-size: 7rem; }
    .ws-hero-text p    { font-size: 1.75rem; }
    .ws-section-py     { padding-top: 11rem; padding-bottom: 11rem; }
  }
  @media (min-width: 1536px) {
    .ws-hero-video-panel { width: 49%; }
    .ws-hero-text h1 { margin-bottom: 1.75rem; }
    .ws-hero-text p  { margin-bottom: 2.5rem; }
  }
`

const coreServices = [
  {
    id: 'cleaning',
    title: 'Teeth Cleaning & Exams',
    img: 'tc.webp',
    desc: 'Regular professional cleanings and comprehensive oral exams are the foundation of good dental health.',
    bullets: ['Professional scaling and polishing', 'Full oral health examination', 'Digital X-rays when needed', 'Personalized home care advice'],
  },
  {
    id: 'emergency',
    title: 'Emergency Dentistry',
    img: 'em.webp',
    desc: 'Dental emergencies do not wait for a convenient time. We do our best to accommodate urgent situations the same day.',
    bullets: ['Same-day emergency appointments', 'Toothaches and infections', 'Broken or chipped teeth', 'Lost fillings or crowns'],
  },
  {
    id: 'fillings',
    title: 'Fillings & Crowns',
    img: 'crown.webp',
    desc: 'We use tooth-coloured composite fillings that blend seamlessly with your natural teeth.',
    bullets: ['Tooth-coloured composite fillings', 'Replacement of old metal fillings', 'Porcelain and composite crowns'],
  },
  {
    id: 'rootcanal',
    title: 'Root Canal Treatment',
    img: 'rc.webp',
    desc: 'Root canal treatment relieves pain and saves teeth that are severely infected or damaged.',
    bullets: ['Gentle, comfortable procedure', 'Relieves pain from infected teeth', 'Saves your natural tooth'],
  },
  {
    id: 'extractions',
    title: 'Extractions',
    img: 'ex.webp',
    desc: 'When a tooth cannot be saved, extraction is performed as gently as possible.',
    bullets: ['Simple and surgical extractions', 'Wisdom tooth removal', 'Local anesthetic for comfort'],
  },
  {
    id: 'children',
    title: "Children's Dentistry",
    img: 'chd.webp',
    desc: 'We love seeing young patients. Our team takes extra time to make children feel safe and comfortable.',
    bullets: ['Gentle, patient-paced appointments', 'Fluoride treatments', 'Fissure sealants'],
  },
]

const additionalServices = [
  { title: 'Night Guards', desc: 'Custom-fitted guards to protect teeth from grinding and clenching during sleep.' },
  { title: 'Sports Mouthguards', desc: 'Properly fitted protection for athletes of all ages.' },
  { title: 'Dentures', desc: 'Complete and partial dentures designed for a comfortable, natural-looking fit.' },
  { title: 'Bridges', desc: 'Fixed replacements for missing teeth.' },
  { title: 'Teeth Whitening', desc: 'Professional take-home whitening kits.' },
  { title: 'Composite Bonding', desc: 'Quick and affordable way to repair chips or gaps.' },
]

const faqs = [
  { q: 'Do fillings hurt?', a: 'With modern local anesthetic, you should feel no pain during the procedure.' },
  { q: 'How long does a cleaning take?', a: 'A routine cleaning and exam typically takes 45 to 60 minutes.' },
  { q: 'At what age should my child first visit the dentist?', a: 'We recommend a first visit around age one, or when the first tooth appears.' },
  { q: 'Is a root canal painful?', a: 'Most patients report the procedure feels similar to getting a filling.' },
]

const contentBgs = ['bg-cream-100', 'bg-brand-50', 'bg-cream-100', 'bg-brand-50', 'bg-cream-100', 'bg-brand-50']

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-brand-100 last:border-0">
      <button className="w-full flex items-center justify-between gap-4 py-5 text-left" onClick={() => setOpen(!open)}>
        <span className="font-sans font-medium text-brand-900 text-base">{q}</span>
        <ChevronDown size={18} className={`text-brand-500 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48 pb-5' : 'max-h-0'}`}>
        <p className="font-sans text-brand-600 text-base leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.replace('#', '')
    const el = document.getElementById(id)
    if (!el) return
    setTimeout(() => {
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 80
      const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight - 60
      window.scrollTo({ top, behavior: 'smooth' })
    }, 150)
  }, [hash])

  return (
    <main className="overflow-x-hidden">
      <style>{wideScreenStyles}</style>

      {/* HERO */}
      <section className="relative bg-cream-100 overflow-hidden">
        <div className="relative w-full pr-3 lg:hidden h-[40vh] min-h-[260px] max-h-[420px]">
          <div className="w-full h-full overflow-hidden" style={{ borderRadius: '0 0 6rem 0' }}>
            <img src="service.webp" alt="Dental care" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="ws-hero-video-panel absolute left-0 top-0 h-full w-[49%] hidden lg:block z-0">
          <div className="w-full h-[85vh] overflow-hidden" style={{ borderRadius: '0 0 12rem 0' }}>
            <img src="service.webp" alt="Dental care" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="relative z-10 w-full ws-container max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
          <div className="ws-section-py-hero py-10 md:py-14 lg:min-h-[88vh] lg:flex lg:items-center lg:justify-end lg:py-20">
            <div className="lg:w-[44%]">
              <AnimatedSection animation="fade-up">
                <p className="font-sans text-brand-500 text-sm font-semibold tracking-widest uppercase mb-3">Our Services</p>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-brand-950 leading-tight mb-6 md:mb-8">
                  Complete care for every smile.
                </h1>
                <p className="font-sans text-brand-600 text-base md:text-lg xl:text-xl leading-relaxed mb-8 md:mb-10 max-w-lg">
                  From routine checkups to same-day emergencies, we provide comprehensive general dentistry for patients of all ages.
                </p>
                <Link to="/contact" className="ws-btn inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-sans font-semibold px-6 md:px-7 py-3 md:py-3.5 rounded-full transition-all hover:shadow-lg text-sm md:text-base">
                  Book an Appointment <ArrowRight size={16} />
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* CORE SERVICES */}
      <section className="ws-section-py bg-white overflow-hidden">
        <div className="ws-container max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="ws-section-title font-serif text-3xl md:text-4xl text-brand-900">What we offer</h2>
            <p className="ws-section-sub font-sans text-brand-500 text-base md:text-lg max-w-md mx-auto">
              Comprehensive general dentistry for your whole family, delivered with care and clarity.
            </p>
          </AnimatedSection>
        </div>

        <div className="flex flex-col">
          {coreServices.map((s, i) => {
            const imageLeft = i % 2 === 0
            return (
              <AnimatedSection key={s.id} animation="fade-up">
                <div id={s.id} className={`flex flex-col lg:flex-row my-8 ${!imageLeft ? 'lg:flex-row-reverse' : ''} min-h-[420px]`}>
                  <div className="w-full lg:w-1/2 relative overflow-hidden min-h-[280px] lg:min-h-[420px]">
                    <div className="w-full h-full" style={{
                      borderRadius: imageLeft ? 'clamp(6rem, 12vw, 16rem) 0 0 clamp(6rem, 12vw, 16rem)' : '0 clamp(6rem, 12vw, 16rem) clamp(6rem, 12vw, 16rem) 0',
                      overflow: 'hidden'
                    }}>
                      <LazyImage src={s.img} alt={s.title} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className={`w-full lg:w-1/2 flex items-center ${contentBgs[i]}`}>
                    <div className="px-8 md:px-12 xl:px-16 py-12 md:py-14 max-w-xl 2xl:max-w-3xl">
                      <h3 className="ws-card-title font-serif text-2xl md:text-3xl text-brand-900 mb-4">{s.title}</h3>
                      <p className="ws-card-body font-sans text-brand-600 text-base md:text-lg leading-relaxed mb-6">{s.desc}</p>
                      <ul className="flex flex-col gap-3 mb-7">
                        {s.bullets.map(b => (
                          <li key={b} className="flex items-start gap-2.5">
                            <CheckCircle2 size={16} className="text-brand-500 mt-0.5 shrink-0" />
                            <span className="font-sans text-brand-700 text-base">{b}</span>
                          </li>
                        ))}
                      </ul>
                      <Link to="/contact" className="ws-btn inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-sans font-semibold px-6 py-3 rounded-full transition-all hover:shadow-md text-base">
                        Book Appointment <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </section>

      {/* ADDITIONAL SERVICES */}
      <section className="ws-section-py py-20 bg-cream-100">
        <div className="ws-container max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
          <AnimatedSection animation="fade-up" className="mb-16">
            <h2 className="ws-section-title font-serif text-3xl md:text-4xl text-brand-900">Additional Services</h2>
            <p className="ws-section-sub font-sans text-brand-500 text-base md:text-lg max-w-lg">
              We also offer a range of other treatments to cover all your dental needs in one place.
            </p>
          </AnimatedSection>
          <div className="ws-grid-gap grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((item, i) => (
              <AnimatedSection key={item.title} animation="fade-up" delay={`delay-${(i % 4) * 75}`}>
                <div className="bg-white rounded-2xl p-7 border border-brand-100 hover:border-brand-300 hover:shadow-md transition-all h-full">
                  <h4 className="font-serif text-lg text-brand-900 mb-3">{item.title}</h4>
                  <p className=" font-sans text-brand-500 text-base leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ws-section-py py-20 bg-white overflow-hidden">
        <div className="ws-container max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20 grid lg:grid-cols-2 gap-14 items-start">
          <AnimatedSection animation="slide-right">
            <h2 className="ws-section-title font-serif text-3xl md:text-4xl text-brand-900 mb-6">Common Questions</h2>
            <p className="ws-section-sub font-sans text-brand-500 text-base md:text-lg leading-relaxed mb-8">
              Thinking about a treatment? Here are honest answers to the questions we hear most often.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 font-sans font-semibold text-base text-brand-600 hover:text-brand-800 transition-colors">
              Ask us anything <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
          <AnimatedSection animation="slide-left">
            <div className="divide-y divide-brand-100">
              {faqs.map(faq => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="ws-section-py py-20 bg-brand-700">
        <div className="ws-container max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20 text-center">
          <AnimatedSection animation="fade-up">
            <h2 className="ws-section-title font-serif text-3xl md:text-4xl text-white mb-4">Not sure which service you need?</h2>
            <p className="ws-section-sub font-sans text-brand-200 text-base md:text-lg mb-8 max-w-lg mx-auto">
              Book a checkup and your dentist will assess everything and walk you through exactly what is recommended.
            </p>
            <Link to="/contact" className="ws-btn inline-flex items-center gap-2 bg-white text-brand-800 hover:bg-brand-50 font-sans font-semibold px-8 py-4 rounded-full transition-all hover:shadow-lg text-base">
              Book a Checkup <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}