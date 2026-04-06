import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Shield, Smile, Users } from 'lucide-react'
import AnimatedSection from '../components/ui/AnimatedSection'
import LazyImage from '../components/ui/LazyImage'
import TeamSlider from '../components/layout/TeamSlider'

/* ─────────────────────────────────────────────
   WIDE-SCREEN STYLES (Same as HomePage)
───────────────────────────────────────────── */
const wideScreenStyles = `
  /* ── 2XL (1536px) ── */
  @media (min-width: 1536px) {
    .ws-container { max-width: 1800px; }
    .ws-section-title  { font-size: 3rem; margin-bottom: 1.5rem; }
    .ws-section-sub    { font-size: 1.25rem; margin-top: 1.25rem; }
    .ws-card-title     { font-size: 1.5rem; }
    .ws-card-body      { font-size: 1.125rem; margin-top: 0.875rem; }
    .ws-hero-text h1   { font-size: 4.5rem; }
    .ws-hero-text p    { font-size: 1.375rem; }
  }

  /* ── 3XL (1920px) ── */
  @media (min-width: 1920px) {
    .ws-container { max-width: 2100px; }
    .ws-section-title  { font-size: 3.75rem; margin-bottom: 1.75rem; }
    .ws-section-sub    { font-size: 1.375rem; margin-top: 1.5rem; }
    .ws-card-title     { font-size: 1.75rem; }
    .ws-card-body      { font-size: 1.2rem; margin-top: 1rem; }
    .ws-hero-text h1   { font-size: 5.5rem; }
    .ws-hero-text p    { font-size: 1.5rem; }
    .ws-section-py     { padding-top: 8rem; padding-bottom: 8rem; }
  }

  /* ── 4XL / Ultra-wide (2560px) ── */
  @media (min-width: 2560px) {
    .ws-container { 
      max-width: 2560px;
      padding-left: 6rem;
      padding-right: 6rem;
    }
    .ws-section-title  { font-size: 5rem; margin-bottom: 2.25rem; }
    .ws-section-sub    { font-size: 1.625rem; margin-top: 1.75rem; }
    .ws-card-title     { font-size: 2.1rem; }
    .ws-card-body      { font-size: 1.375rem; margin-top: 1.25rem; }
    .ws-hero-text h1   { font-size: 7rem; }
    .ws-hero-text p    { font-size: 1.75rem; }
    .ws-section-py     { padding-top: 11rem; padding-bottom: 11rem; }
  }

  /* Hero adjustments */
  @media (min-width: 1536px) {
    .ws-hero-video-panel { width: 49%; }
    .ws-hero-text h1 { margin-bottom: 1.75rem; }
    .ws-hero-text p  { margin-bottom: 2.5rem; }
  }
  @media (min-width: 1920px) {
    .ws-hero-text h1 { margin-bottom: 2rem; }
    .ws-hero-text p  { margin-bottom: 3rem; }
  }
`

const values = [
  {
    icon: Heart,
    title: 'Genuinely Patient-Centred',
    desc: 'We take the time to listen, explain, and involve you in every decision about your care. No pressure, no rush.',
  },
  {
    icon: Shield,
    title: 'Honest & Transparent',
    desc: 'We only recommend what you actually need. Treatment plans and costs are always explained clearly and upfront.',
  },
  {
    icon: Smile,
    title: 'A Comfortable Environment',
    desc: 'Our studio is designed to feel calm and welcoming — not clinical and stressful. Your comfort matters to us.',
  },
  {
    icon: Users,
    title: 'Care for the Whole Family',
    desc: 'From young children to older adults, every member of your family is welcome here and treated with equal care.',
  },
]

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden">

      {/* Inject Wide Screen Styles */}
      <style>{wideScreenStyles}</style>

      {/* HERO */}
      <section className="relative bg-cream-100 overflow-hidden">
        {/* Mobile Image */}
        <div className="relative w-full pr-3 lg:hidden h-[40vh] min-h-[260px] max-h-[420px]">
          <div className="w-full h-full overflow-hidden" style={{ borderRadius: '0 0 6rem 0' }}>
            <img src="about.webp" alt="PrimeSmile studio" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Desktop Image */}
        <div className="ws-hero-video-panel absolute left-0 top-0 h-full w-[49%] hidden lg:block z-0">
          <div className="w-full h-[85vh] overflow-hidden" style={{ borderRadius: '0 0 12rem 0' }}>
            <img src="about.webp" alt="PrimeSmile studio" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Text Content */}
        <div className="relative z-10 w-full ws-container max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
          <div className="ws-section-py-hero py-10 md:py-14 lg:min-h-[88vh] lg:flex lg:items-center lg:justify-end lg:py-20">
            <div className="lg:w-[44%]">
              <AnimatedSection animation="fade-up">
                <p className="font-sans text-brand-500 text-sm font-semibold tracking-widest uppercase mb-3">
                  About Us
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl xl:text-6xl text-brand-950 leading-tight mb-6 md:mb-8">
                  The team behind your smile.
                </h1>
                <p className="font-sans text-brand-600 text-base md:text-lg xl:text-xl leading-relaxed mb-8 md:mb-10 max-w-lg">
                  A family dental studio built on trust, honesty, and the belief that going to the dentist should never feel like a chore.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/contact"
                    className="ws-btn flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-sans font-semibold px-6 md:px-7 py-3 md:py-3.5 rounded-full transition-all hover:shadow-lg text-sm md:text-base"
                  >
                    Book a Visit <ArrowRight size={16} />
                  </Link>
                  <Link
                    to="/services"
                    className="ws-btn flex items-center gap-2 border-2 border-brand-300 text-brand-700 hover:bg-brand-50 font-sans font-medium px-6 md:px-7 py-3 md:py-3.5 rounded-full transition-all text-sm md:text-base"
                  >
                    Our Services
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="ws-section-py pt-52 pb-20 bg-white overflow-hidden">
        <div className="ws-container max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20 grid lg:grid-cols-2 gap-14 items-center">
          <AnimatedSection animation="slide-right">
            <div
              className="relative flex justify-center items-end w-full"
              style={{ paddingRight: '14px', paddingBottom: '14px', height: 'min(520px, 70vw)' }}
            >
              <div
                className="absolute bg-brand-200"
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
              <div
                className="absolute overflow-hidden"
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
                  src="story.webp"
                  alt="Dental studio"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slide-left">
            <h2 className="ws-section-title font-serif text-3xl md:text-4xl text-brand-900 mb-6">Our Story</h2>
            <p className="ws-section-sub font-sans text-brand-600 text-base md:text-lg leading-relaxed mb-6">
              PrimeSmile was founded on a straightforward belief: that everyone deserves dental care that is thorough, honest, and delivered with genuine warmth.
            </p>
            <p className="ws-section-sub font-sans text-brand-600 text-base md:text-lg leading-relaxed mb-6">
              Our studio is designed to feel welcoming rather than clinical. We keep our team small on purpose — so you see the same familiar faces and never feel like just another chart number.
            </p>
            <Link to="/services" className="inline-flex items-center gap-2 font-sans font-semibold text-base text-brand-600 hover:text-brand-800 transition-colors">
              Explore our services <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* VALUES */}
      <section className="ws-section-py py-20 bg-cream-100">
        <div className="ws-container max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
          <AnimatedSection animation="fade-up" className="text-center mb-16">
            <h2 className="ws-section-title font-serif text-3xl md:text-4xl text-brand-900">What we stand for</h2>
            <p className="ws-section-sub font-sans text-brand-500 text-base md:text-lg max-w-md mx-auto">
              Four principles that guide everything we do at PrimeSmile.
            </p>
          </AnimatedSection>
          <div className="ws-grid-gap grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} animation="fade-up" delay={`delay-${i * 100}`}>
                <div className="bg-white rounded-2xl p-8 h-full border border-brand-100 hover:border-brand-300 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mb-6">
                    <v.icon size={24} className="text-brand-600" />
                  </div>
                  <h3 className="ws-card-title font-serif text-xl text-brand-900 mb-4">{v.title}</h3>
                  <p className="ws-card-body font-sans text-brand-500 text-base leading-relaxed">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <TeamSlider />

      {/* FINAL CTA */}
      <section className="ws-section-py py-20 bg-brand-700">
        <div className="ws-container max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20 text-center">
          <AnimatedSection animation="fade-up">
            <h2 className="ws-section-title font-serif text-3xl md:text-4xl text-white mb-4">Come see us.</h2>
            <p className="ws-section-sub font-sans text-brand-200 text-base md:text-lg mb-8 max-w-lg mx-auto">
              We are always welcoming new patients and their families. Book online or give us a call.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/contact" className="ws-btn flex items-center gap-2 bg-white text-brand-800 hover:bg-brand-50 font-sans font-semibold px-7 py-3.5 rounded-full transition-all">
                Book Online <ArrowRight size={16} />
              </Link>
              <Link to="/new-patients" className="ws-btn flex items-center gap-2 border-2 border-white/40 text-white hover:bg-white/10 font-sans font-medium px-7 py-3.5 rounded-full transition-all">
                New Patient Info
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </main>
  )
}