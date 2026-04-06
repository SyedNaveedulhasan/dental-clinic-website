import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Star, Phone, Heart, Shield, Smile, CheckCircle2,
  ArrowRight, Quote, ChevronDown, Clock, MapPin,
  ChevronLeft, ChevronRight
} from 'lucide-react'
import AnimatedSection from '../components/ui/AnimatedSection'
import LazyImage from '../components/ui/LazyImage'
import TeamSlider from '../components/layout/TeamSlider'
import GallerySlider from '../components/layout/GallerySlider'

/* ─────────────────────────────────────────────
   WIDE-SCREEN GLOBAL STYLES - Updated with better vertical spacing
───────────────────────────────────────────── */
const wideScreenStyles = `
  /* ── 2XL  (1536 px) ── */
  @media (min-width: 1536px) {
    .ws-container {
      max-width: 1800px;
    }
    .ws-hero-text h1   { font-size: 4.5rem;  }
    .ws-hero-text p    { font-size: 1.375rem; max-width: 640px; }
    
    .ws-section-title  { 
      font-size: 3rem;    
      margin-bottom: 1.5rem;     /* Increased gap */
    }
    .ws-section-sub    { 
      font-size: 1.25rem; 
      margin-top: 1.25rem;       /* Increased gap */
    }
    
    .ws-card-title     { font-size: 1.5rem;  }
    .ws-card-body      { 
      font-size: 1.125rem;
      margin-top: 0.875rem;      /* Card body gap */
    }
    
    .ws-btn            { padding: 1rem 2.25rem; font-size: 1.05rem; }
    .ws-service-img    { height: 18rem;       }
    .ws-feature-icon   { width: 3.5rem; height: 3.5rem; }
    .ws-testimonial-q  { font-size: 1.75rem; }
    .ws-hours-row      { font-size: 1.05rem; padding-top: 0.6rem; padding-bottom: 0.6rem; }
    .ws-faq-q          { font-size: 1.1rem;  }
    .ws-faq-a          { font-size: 1.05rem; }
    .ws-arch-wrap      { height: min(620px, 65vw); }
  }

  /* ── 3XL  (1920 px) ── */
  @media (min-width: 1920px) {
    .ws-container {
      max-width: 2100px;
    }
    .ws-hero-text h1   { font-size: 5.5rem;  }
    .ws-hero-text p    { font-size: 1.5rem;  max-width: 700px; }
    
    .ws-section-title  { 
      font-size: 3.75rem; 
      margin-bottom: 1.75rem;     /* Better spacing */
    }
    .ws-section-sub    { 
      font-size: 1.375rem;
      margin-top: 1.5rem;         /* Better spacing */
    }
    
    .ws-card-title     { font-size: 1.75rem; }
    .ws-card-body      { 
      font-size: 1.2rem;  
      margin-top: 1rem;           /* Improved card gap */
    }
    
    .ws-btn            { padding: 1.15rem 2.75rem; font-size: 1.15rem; border-radius: 9999px; }
    .ws-service-img    { height: 22rem;      }
    .ws-feature-icon   { width: 4rem; height: 4rem; }
    .ws-testimonial-q  { font-size: 2.1rem;  }
    .ws-hours-row      { font-size: 1.15rem; padding-top: 0.75rem; padding-bottom: 0.75rem; }
    .ws-faq-q          { font-size: 1.2rem;  }
    .ws-faq-a          { font-size: 1.15rem; }
    .ws-arch-wrap      { height: min(720px, 60vw); }
    
    .ws-hero-text h1 { margin-bottom: 1.75rem; }
    .ws-hero-text p  { margin-bottom: 2.5rem; }
  }

  /* ── 4XL / Ultra-wide  (2560 px) ── */
  @media (min-width: 2560px) {
    .ws-container {
      max-width: 2560px;
      padding-left: 6rem;
      padding-right: 6rem;
    }
    .ws-hero-text h1   { font-size: 7rem;    }
    .ws-hero-text p    { font-size: 1.75rem; max-width: 800px; }
    
    .ws-section-title  { 
      font-size: 5rem;    
      margin-bottom: 2.25rem;     /* Most generous spacing */
    }
    .ws-section-sub    { 
      font-size: 1.625rem;
      margin-top: 1.75rem;        /* Most generous spacing */
    }
    
    .ws-card-title     { font-size: 2.1rem;  }
    .ws-card-body      { 
      font-size: 1.375rem;
      margin-top: 1.25rem;        /* Improved */
    }
    
    .ws-btn            { padding: 1.35rem 3.25rem; font-size: 1.3rem; }
    .ws-service-img    { height: 28rem;      }
    .ws-feature-icon   { width: 5rem; height: 5rem; }
    .ws-testimonial-q  { font-size: 2.75rem; }
    .ws-hours-row      { font-size: 1.35rem; padding-top: 1rem; padding-bottom: 1rem; }
    .ws-faq-q          { font-size: 1.4rem;  }
    .ws-faq-a          { font-size: 1.35rem; }
    .ws-arch-wrap      { height: min(860px, 55vw); }
    
    .ws-hero-text h1 { margin-bottom: 2.25rem; }
    .ws-hero-text p  { margin-bottom: 3rem; }
  }

  /* Hero video section — desktop side panel always 49% */
  @media (min-width: 1536px) {
    .ws-hero-video-panel { width: 49%; }
  }

  /* Section vertical padding scales up */
  @media (min-width: 1920px) {
    .ws-section-py { padding-top: 8rem; padding-bottom: 8rem; }
    .ws-section-py-hero { min-height: 90vh; }
  }
  @media (min-width: 2560px) {
    .ws-section-py { padding-top: 11rem; padding-bottom: 11rem; }
  }

  /* Grid gaps */
  @media (min-width: 1920px) {
    .ws-grid-gap   { gap: 2.5rem; }
    .ws-grid-gap-v { gap: 5rem;   }
  }
  @media (min-width: 2560px) {
    .ws-grid-gap   { gap: 3.5rem; }
    .ws-grid-gap-v { gap: 7rem;   }
  }
`

const features = [
  {
    icon: Heart,
    title: 'Friendly & Family-Owned',
    desc: 'We are a community-focused practice where every patient is treated like family — from toddlers to grandparents.',
  },
  {
    icon: Shield,
    title: 'Most Insurance Plans Accepted',
    desc: 'We work with most major dental insurance providers and will always help you understand your coverage before treatment.',
  },
  {
    icon: Smile,
    title: 'Comfortable Appointments',
    desc: 'Our calm, welcoming environment is designed to put anxious patients at ease. Your comfort is always our priority.',
  },
]

const services = [
  {
    title: 'Teeth Cleaning & Exams',
    desc: 'Comprehensive checkups and professional cleanings to keep your smile healthy between visits.',
    href: '/services#cleaning',
    img: 'cleaning.webp',
  },
  {
    title: 'Emergency Dentistry',
    desc: 'Prompt care for toothaches, broken teeth, and dental emergencies — when you need us most.',
    href: '/services#emergency',
    img: 'emergency2.webp',
  },
  {
    title: 'Fillings & Restorations',
    desc: 'Tooth-coloured fillings and crowns to restore damaged teeth comfortably and naturally.',
    href: '/services#fillings',
    img: 'restorative.webp',
  },
  {
    title: "Children's Dentistry",
    desc: 'Gentle, patient-centred care for children of all ages — building positive dental habits early.',
    href: '/services#children',
    img: 'children.webp',
  },
]

const testimonials = [
  { name: 'Sarah M.', text: 'The entire team is so warm and professional. I actually look forward to my cleaning appointments now — never thought I would say that!' },
  { name: 'David K.', text: 'My kids used to be terrified of the dentist. After their first visit here, they were asking when they could come back. Truly incredible staff.' },
  { name: 'Fatima A.', text: 'I came in with a dental emergency and they fit me in the same day. The care was fast, thorough, and completely painless. So grateful.' },
  { name: 'James T.', text: 'After years of avoiding the dentist, a friend recommended PrimeSmile. I wish I had found them sooner — zero judgement, only great care.' },
  { name: 'Priya L.', text: 'Been coming here for two years with my whole family. The quality and consistency of care is outstanding every single time.' },
]

const faqs = [
  {
    q: 'Are you accepting new patients?',
    a: 'Yes, we are always welcoming new patients and their families. You can book online or give us a call and we will find a time that works for you.',
  },
  {
    q: 'Do you accept dental insurance?',
    a: 'We work with most major dental insurance providers. Our team will help verify your coverage and explain your benefits clearly before any treatment begins.',
  },
  {
    q: 'How often should I get a dental checkup?',
    a: 'Most patients benefit from a cleaning and exam every six months. Your dentist may recommend a different schedule based on your individual oral health needs.',
  },
  {
    q: 'What should I do if I have a dental emergency?',
    a: 'Call our office right away. We do our best to accommodate dental emergencies the same day. If it is outside office hours, our voicemail will direct you to emergency contact information.',
  },
  {
    q: 'Do you see children?',
    a: 'Absolutely. We welcome patients of all ages, including young children. We take extra time with kids to make sure they feel comfortable and safe.',
  },
]

const team = [
  {
    name: 'Dr. Emily Tremblay',
    role: 'Founder & General Dentist',
    bio: 'Trained at the University of Toronto Faculty of Dentistry with a passion for gentle, patient-centred care. Dr. Tremblay founded PrimeSmile to create a dental home where every patient feels genuinely comfortable.',
    img: 't2.webp',
  },
  {
    name: 'Dr. James Bouchard',
    role: 'General Dentist',
    bio: 'Experienced in all aspects of general and family dentistry. Dr. Bouchard is known for his clear communication, steady hands, and ability to put even the most anxious patients completely at ease.',
    img: 't1.webp',
  },
  {
    name: 'Dr. Claire Mackenzie',
    role: 'General Dentist',
    bio: 'Dedicated to preventive care and helping patients of all ages build lifelong healthy habits. Dr. Mackenzie brings warmth and clinical excellence to every appointment.',
    img: 't3.webp',
  },
  {
    name: 'Dr. Ryan Leblanc',
    role: 'General & Emergency Dentist',
    bio: 'Trained at McGill University with a focus on emergency and restorative care. Dr. Leblanc is known for his calm presence and ability to relieve pain quickly and gently.',
    img: 't4.webp',
  },
  {
    name: 'Dr. Sophie Gagnon',
    role: 'General Dentist',
    bio: 'A graduate of UBC, Dr. Gagnon specialises in preventive care and family dentistry. Patients love her patient approach and the way she puts nervous visitors completely at ease.',
    img: 't5.webp',
  },
]

const hours = [
  { day: 'Monday',    time: '8:00 am – 6:00 pm' },
  { day: 'Tuesday',   time: '8:00 am – 6:00 pm' },
  { day: 'Wednesday', time: '8:00 am – 5:00 pm' },
  { day: 'Thursday',  time: '8:00 am – 6:00 pm' },
  { day: 'Friday',    time: '8:00 am – 4:00 pm' },
  { day: 'Saturday',  time: '9:00 am – 3:00 pm' },
  { day: 'Sunday',    time: 'Closed' },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-brand-100 last:border-0">
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="ws-faq-q font-sans font-medium text-brand-900 text-base">{q}</span>
        <ChevronDown size={18} className={`text-brand-500 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-56 pb-5' : 'max-h-0'}`}>
        <p className="ws-faq-a font-sans text-brand-600 text-base leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [activeTeam, setActiveTeam] = useState(0)

  const prevTestimonial = () =>
    setActiveTestimonial(i => (i - 1 + testimonials.length) % testimonials.length)
  const nextTestimonial = () =>
    setActiveTestimonial(i => (i + 1) % testimonials.length)

  const prevTeam = () =>
    setActiveTeam(i => (i - 1 + team.length) % team.length)
  const nextTeam = () =>
    setActiveTeam(i => (i + 1) % team.length)

  const visibleTeam = [0, 1, 2].map(offset => team[(activeTeam + offset) % team.length])

  return (
    <main className="overflow-x-hidden">

      {/* Inject wide-screen styles once */}
      <style>{wideScreenStyles}</style>

      {/* ── HERO ── */}
      <section className="relative bg-cream-100 overflow-hidden">

        {/* Mobile Video */}
        <div className="relative w-full lg:hidden h-[40vh] min-h-[260px] max-h-[420px]">
          <div className="w-full h-full overflow-hidden" style={{ borderRadius: '6rem 0 6rem 0' }}>
            <video src="hero1.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Desktop Video */}
        <div className="ws-hero-video-panel absolute left-0 top-0 h-full w-[49%] hidden lg:block z-0">
          <div className="w-full h-[85vh] overflow-hidden" style={{ borderRadius: '0 0 12rem 0' }}>
            <video src="hero1.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Text — RIGHT */}
        <div className="relative z-10 w-full ws-container max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
          <div className="ws-section-py-hero py-10 md:py-14 lg:min-h-[88vh] lg:flex lg:items-center lg:justify-end lg:py-20">
            <div className="ws-hero-text lg:w-[46%]">
              <AnimatedSection animation="fade-up" delay="delay-100">
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-brand-950 leading-tight mb-6 md:mb-8">
                  Dental care your whole family can trust.
                </h1>
              </AnimatedSection>
              <AnimatedSection animation="fade-up" delay="delay-200">
                <p className="font-sans text-brand-600 text-base md:text-lg xl:text-xl leading-relaxed mb-8 md:mb-10">
                  Comprehensive general dentistry in a calm, welcoming studio. From routine cleanings to emergency care — we are here for every smile in your family.
                </p>
              </AnimatedSection>
              <AnimatedSection animation="fade-up" delay="delay-300">
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/contact"
                    className="ws-btn flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-sans font-semibold px-6 md:px-7 py-3 md:py-3.5 rounded-full transition-all hover:shadow-lg active:scale-95 text-sm md:text-base"
                  >
                    Book an Appointment <ArrowRight size={16} />
                  </Link>
                  <a
                    href="tel:+15551234567"
                    className="ws-btn flex items-center gap-2 border-2 border-brand-300 text-brand-700 hover:bg-brand-50 font-sans font-medium px-6 md:px-7 py-3 md:py-3.5 rounded-full transition-all text-sm md:text-base"
                  >
                    <Phone size={16} /> (555) 123-4567
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="ws-section-py py-20 bg-white">
        <div className="ws-container max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="ws-section-title font-serif text-3xl md:text-4xl text-brand-900">
              Why patients choose PrimeSmile
            </h2>
            <p className="ws-section-sub font-sans text-brand-500 text-base md:text-lg max-w-xl mx-auto">
              We believe a great dental experience starts long before the chair — with honesty, warmth, and clear communication.
            </p>
          </AnimatedSection>
          <div className="ws-grid-gap grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} animation="fade-up" delay={`delay-${i * 100}`}>
                <div className="ws-feature-card group bg-cream-50 hover:bg-brand-50 border border-brand-100 rounded-2xl p-8 transition-all duration-300 hover:shadow-md">
                  <div className="ws-feature-icon w-12 h-12 rounded-xl bg-brand-100 group-hover:bg-brand-200 flex items-center justify-center mb-6 transition-colors">
                    <f.icon size={22} className="text-brand-600" />
                  </div>
                  <h3 className="ws-card-title font-serif text-xl text-brand-900 mb-4">{f.title}</h3>
                  <p className="ws-card-body font-sans text-brand-500 text-base leading-relaxed">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="ws-section-py py-20 bg-cream-100">
        <div className="ws-container max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
          <AnimatedSection animation="fade-up" className="mb-16">
            <h2 className="ws-section-title font-serif text-3xl md:text-4xl text-brand-900">Our Services</h2>
            <p className="ws-section-sub font-sans text-brand-500 text-base md:text-lg max-w-lg">
              Everything your family needs for lifelong oral health — all under one roof.
            </p>
          </AnimatedSection>
          <div className="ws-grid-gap grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} animation="fade-up" delay={`delay-${i * 75}`}>
                <Link
                  to={s.href}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brand-200/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="ws-service-img overflow-hidden h-64">
                    <LazyImage
                      src={s.img}
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="ws-service-card-body p-7">
                    <h3 className="ws-card-title font-serif text-lg text-brand-900 mb-4">{s.title}</h3>
                    <p className="ws-card-body font-sans text-brand-500 text-base leading-relaxed">{s.desc}</p>
                    <span className="inline-flex items-center gap-1 mt-5 font-sans text-sm font-semibold text-brand-600 group-hover:gap-2 transition-all">
                      Learn more <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection animation="fade-up" className="mt-12 text-center">
            <Link
              to="/services"
              className="ws-section-sub inline-flex items-center gap-2 font-sans font-semibold text-base text-brand-600 hover:text-brand-800 transition-colors"
            >
              View all services <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="ws-section-py py-20 bg-brand-800">
        <div className="ws-container max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-brand-300" fill="currentColor" />
              ))}
            </div>
            <h2 className="ws-section-title font-serif text-3xl md:text-4xl text-white">
              What our patients say
            </h2>
            <p className="ws-section-sub font-sans text-brand-300 text-base">
              500+ five-star reviews on Google
            </p>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto" style={{ maxWidth: 'min(56rem, 75%)' }}>
            <div className="text-center mb-12">
              <Quote size={40} className="ws-quote-icon text-brand-600 mx-auto mb-6" />
              <p className="ws-testimonial-q font-serif text-xl md:text-2xl text-white leading-relaxed italic">
                "{testimonials[activeTestimonial].text}"
              </p>
              <p className="ws-card-body font-sans text-brand-300 mt-6 font-medium text-base">
                — {testimonials[activeTestimonial].name}
              </p>
            </div>
            <div className="flex items-center justify-center gap-5">
              <button
                onClick={prevTestimonial}
                aria-label="Previous review"
                className="w-10 h-10 rounded-full border-2 border-brand-600 hover:bg-brand-600 text-brand-300 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-90"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    aria-label={`Review ${i + 1}`}
                    className={`ws-dot rounded-full transition-all duration-300 ${
                      i === activeTestimonial
                        ? 'ws-dot-active bg-brand-400 w-8 h-3'
                        : 'bg-brand-700 hover:bg-brand-500 w-3 h-3'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                aria-label="Next review"
                className="w-10 h-10 rounded-full border-2 border-brand-600 hover:bg-brand-600 text-brand-300 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-90"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM + GALLERY SLIDERS ── */}
      <TeamSlider />
      <GallerySlider />

      {/* ── FAQ ── */}
      <section className="ws-section-py pt-48 pb-20 bg-cream-100 overflow-hidden">
        <div className="ws-container max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20 grid lg:grid-cols-2 ws-grid-gap-v gap-14 items-center">

          {/* LEFT — Arch Image */}
          <AnimatedSection animation="slide-right">
            <div
              className="ws-arch-wrap relative flex justify-center items-end w-full"
              style={{ paddingRight: '14px', paddingBottom: '14px', height: 'min(520px, 70vw)' }}
            >
              {/* Shadow arch */}
              <div
                className="ws-arch-shadow absolute bg-brand-200"
                style={{
                  borderRadius: '999px 999px 15px 15px',
                  width: 'min(520px, 85%)',
                  height: 'calc(min(520px, 70vw) + 88px)',
                  bottom: '-1px',
                  left: '50%',
                  transform: 'translateX(calc(-50% + 18px))',
                  zIndex: 0,
                }}
              />
              {/* Main arch */}
              <div
                className="ws-arch-img absolute overflow-hidden"
                style={{
                  borderRadius: '999px 999px 0 0',
                  width: 'min(525px, 85%)',
                  height: 'calc(min(520px, 70vw) + 85px)',
                  bottom: '14px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 1,
                }}
              >
                <img
                  src="faq.webp"
                  alt="Dental clinic"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
            </div>
          </AnimatedSection>

          {/* RIGHT — FAQs */}
          <AnimatedSection animation="slide-left">
            <h2 className="ws-section-title font-serif text-3xl md:text-4xl text-brand-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="ws-section-sub font-sans text-brand-500 text-base md:text-lg leading-relaxed mb-10">
              Have a question? We have answers. If you do not see what you are looking for,{' '}
              <a
                href="tel:+15551234567"
                className="font-semibold text-brand-600 hover:text-brand-800 transition-colors inline-flex items-center gap-1"
                style={{ verticalAlign: 'middle' }}
              >
                <Phone size={15} /> call us directly.
              </a>
            </p>
            <div className="divide-y divide-brand-100">
              {faqs.map(faq => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* ── FINAL CTA + HOURS ── */}
      <section className="ws-section-py py-20 bg-brand-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="time.webp" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="ws-container relative max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20 grid lg:grid-cols-2 ws-grid-gap gap-12 items-center">
          <AnimatedSection animation="slide-right">
            <h2 className="ws-section-title font-serif text-3xl md:text-4xl text-white mb-6">
              Ready to book your visit?
            </h2>
            <p className="ws-section-sub font-sans text-brand-200 text-base md:text-lg leading-relaxed mb-8">
              Call us, book online, or just stop by. We are always happy to help you find a time that works.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="ws-btn flex items-center gap-2 bg-white text-brand-800 hover:bg-brand-50 font-sans font-semibold px-7 py-3.5 rounded-full transition-all hover:shadow-md"
              >
                Book Online <ArrowRight size={16} />
              </Link>
              <a
                href="tel:+15551234567"
                className="ws-btn flex items-center gap-2 border-2 border-white/40 text-white hover:bg-white/10 font-sans font-medium px-7 py-3.5 rounded-full transition-all"
              >
                <Phone size={16} /> Call Us
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slide-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-7 border border-white/20">
              <div className="flex items-center gap-2 mb-6">
                <Clock size={18} className="text-brand-300" />
                <h3 className="ws-card-title font-serif text-white text-xl">Office Hours</h3>
              </div>
              {hours.map(({ day, time }) => (
                <div
                  key={day}
                  className="ws-hours-row flex justify-between font-sans text-base py-2 border-b border-white/10 last:border-0"
                >
                  <span className="text-brand-200">{day}</span>
                  <span className={time === 'Closed' ? 'text-brand-500' : 'text-white'}>{time}</span>
                </div>
              ))}
              <div className="flex items-start gap-2 mt-6 pt-5 border-t border-white/20">
                <MapPin size={16} className="text-brand-300 mt-0.5 shrink-0" />
                <p className="ws-card-body font-sans text-brand-200 text-base">
                  45 Pearl Street, Suite 2<br />Toronto, ON M5H 1J9
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </main>
  )
}