import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Download, FileText, ClipboardList, Info } from 'lucide-react'
import AnimatedSection from '../components/ui/AnimatedSection'

/* Wide Screen Styles */
const wideScreenStyles = `
  @media (min-width: 1536px) {
    .ws-container { max-width: 1800px; }
    .ws-section-title  { font-size: 3rem; margin-bottom: 1.5rem; }
    .ws-section-sub    { font-size: 1.25rem; margin-top: 1.25rem; }
  }
  @media (min-width: 1920px) {
    .ws-container { max-width: 2100px; }
    .ws-section-title  { font-size: 3.75rem; margin-bottom: 1.75rem; }
    .ws-section-sub    { font-size: 1.375rem; margin-top: 1.5rem; }
    .ws-section-py     { padding-top: 8rem; padding-bottom: 8rem; }
  }
  @media (min-width: 2560px) {
    .ws-container { 
      max-width: 2560px;
      padding-left: 6rem;
      padding-right: 6rem;
    }
    .ws-section-title  { font-size: 5rem; margin-bottom: 2.25rem; }
    .ws-section-sub    { font-size: 1.625rem; margin-top: 1.75rem; }
    .ws-section-py     { padding-top: 11rem; padding-bottom: 11rem; }
  }
`

const steps = [
  { num: '01', title: 'Book Your Appointment', desc: 'Call us or book online. Let us know it is your first visit.' },
  { num: '02', title: 'Complete Your Forms', desc: 'Download and fill out the new patient forms below before arriving.' },
  { num: '03', title: 'Bring Your Information', desc: 'Bring a valid photo ID, insurance card, and list of medications.' },
  { num: '04', title: 'Meet Your Dentist', desc: 'Your dentist will complete a full oral exam and discuss your concerns.' },
]

const forms = [
  { title: 'New Patient Registration', desc: 'Personal details, contact information, and emergency contact.', icon: FileText },
  { title: 'Medical History Form', desc: 'Current medications, allergies, and past medical history.', icon: ClipboardList },
  { title: 'HIPAA Privacy Notice', desc: 'Your rights regarding your personal health information.', icon: Info },
  { title: 'Financial Agreement', desc: 'Payment policy and consent for dental treatment.', icon: FileText },
]

const insurance = [
  'Sun Life Financial', 'Manulife', 'Great-West Life', 'Blue Cross', 'Desjardins',
  'Green Shield Canada', 'SSQ Insurance', 'Empire Life', 'CGIC', 'ClaimSecure'
]

export default function NewPatientsPage() {
  return (
    <main className="overflow-x-hidden">
      <style>{wideScreenStyles}</style>

      {/* HERO */}
      <section className="relative py-24 md:py-32 bg-cream-100 overflow-hidden">
        <div className="absolute inset-0">
          <img src="clinic2.webp" alt="" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-cream-100 via-cream-100/80 to-transparent" />
        </div>
        <div className="ws-container max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20 relative">
          <AnimatedSection animation="fade-up" className="max-w-2xl">
            <p className="font-sans text-brand-500 text-sm font-semibold tracking-widest uppercase mb-3">New Patients</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-950 leading-tight mb-6">
              Your first visit, made easy.
            </h1>
            <p className="font-sans text-brand-600 text-lg md:text-xl leading-relaxed mb-8">
              Starting somewhere new should never be stressful. Here is everything you need to know before your first appointment at PrimeSmile.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="ws-btn flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-sans font-semibold px-7 py-3.5 rounded-full transition-all hover:shadow-lg">
                Book My First Visit <ArrowRight size={16} />
              </Link>
              <a href="#forms" className="ws-btn flex items-center gap-2 border-2 border-brand-300 text-brand-700 hover:bg-brand-50 font-sans font-medium px-7 py-3.5 rounded-full transition-all">
                Download Forms
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* STEPS */}
      <section className="ws-section-py py-20 bg-white">
        <div className="ws-container max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
          <AnimatedSection animation="fade-up" className="mb-16">
            <h2 className="ws-section-title font-serif text-3xl md:text-4xl text-brand-900">What to expect</h2>
            <p className="ws-section-sub font-sans text-brand-500 text-base md:text-lg max-w-lg">
              Four simple steps — from booking to your first appointment.
            </p>
          </AnimatedSection>
          <div className="ws-grid-gap grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <AnimatedSection key={step.num} animation="fade-up" delay={`delay-${i * 100}`}>
                <div className="bg-cream-50 border border-brand-100 rounded-2xl p-8 h-full hover:border-brand-300 hover:shadow-md transition-all">
                  <span className="font-serif text-5xl font-bold text-brand-200 block mb-6">{step.num}</span>
                  <h3 className="ws-card-title font-serif text-xl text-brand-900 mb-4">{step.title}</h3>
                  <p className="ws-card-body font-sans text-brand-600 text-base leading-relaxed">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FORMS */}
      <section id="forms" className="ws-section-py py-20 bg-cream-100">
        <div className="ws-container max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
          <AnimatedSection animation="fade-up" className="mb-16">
            <h2 className="ws-section-title font-serif text-3xl md:text-4xl text-brand-900">New Patient Forms</h2>
            <p className="ws-section-sub font-sans text-brand-500 text-base md:text-lg max-w-lg">
              Download and complete these forms before your visit to make check-in quicker.
            </p>
          </AnimatedSection>
          <div className="ws-grid-gap grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {forms.map((form, i) => (
              <AnimatedSection key={form.title} animation="fade-up" delay={`delay-${i * 75}`}>
                <div className="group bg-white border border-brand-100 hover:border-brand-400 rounded-2xl p-7 flex flex-col gap-5 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-xl bg-brand-100 group-hover:bg-brand-200 flex items-center justify-center transition-colors">
                    <form.icon size={24} className="text-brand-600" />
                  </div>
                  <div>
                    <h3 className="ws-card-title font-serif text-lg text-brand-900 mb-2">{form.title}</h3>
                    <p className="ws-card-body font-sans text-brand-500 text-base leading-relaxed">{form.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 font-sans text-sm font-semibold text-brand-600 group-hover:text-brand-800 transition-colors mt-auto">
                    <Download size={16} /> Download PDF
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* INSURANCE & CTA sections mein bhi ws-container aur ws-section-py add kar sakte hain */}

      {/* Final CTA */}
      <section className="ws-section-py py-20 bg-cream-100">
        <div className="ws-container max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20 text-center">
          <AnimatedSection animation="fade-up">
            <h2 className="ws-section-title font-serif text-3xl md:text-4xl text-brand-900 mb-4">Ready to get started?</h2>
            <p className="ws-section-sub font-sans text-brand-500 text-base md:text-lg mb-8 max-w-lg mx-auto">
              Book your first appointment online or give us a call.
            </p>
            <Link to="/contact" className="ws-btn inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-sans font-semibold px-8 py-4 rounded-full transition-all hover:shadow-lg text-base">
              Book My First Visit <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}