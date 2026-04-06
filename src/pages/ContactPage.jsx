import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, MapPin, Clock, CheckCircle2, ArrowRight, Loader2, AlertCircle } from 'lucide-react'
import AnimatedSection from '../components/ui/AnimatedSection'

/* ─────────────────────────────────────────────
   WIDE-SCREEN STYLES (Same as HomePage)
───────────────────────────────────────────── */
const wideScreenStyles = `
  /* ── 2XL (1536px) ── */
  @media (min-width: 1536px) {
    .ws-container { max-width: 1800px; }
    .ws-section-title  { font-size: 3rem; margin-bottom: 1.5rem; }
    .ws-section-sub    { font-size: 1.25rem; margin-top: 1.25rem; }
    .ws-hero-text h1   { font-size: 4.5rem; }
    .ws-hero-text p    { font-size: 1.375rem; }
  }

  /* ── 3XL (1920px) ── */
  @media (min-width: 1920px) {
    .ws-container { max-width: 2100px; }
    .ws-section-title  { font-size: 3.75rem; margin-bottom: 1.75rem; }
    .ws-section-sub    { font-size: 1.375rem; margin-top: 1.5rem; }
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

const hours = [
  { day: 'Monday',    time: '8:00 am – 6:00 pm', open: true },
  { day: 'Tuesday',   time: '8:00 am – 6:00 pm', open: true },
  { day: 'Wednesday', time: '8:00 am – 5:00 pm', open: true },
  { day: 'Thursday',  time: '8:00 am – 6:00 pm', open: true },
  { day: 'Friday',    time: '8:00 am – 4:00 pm', open: true },
  { day: 'Saturday',  time: '9:00 am – 3:00 pm', open: true },
  { day: 'Sunday',    time: 'Closed',             open: false },
]

export default function ContactPage() {
  const [form, setForm]           = useState({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors]       = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [apiError, setApiError]   = useState('')

  const change = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const validate = (formData) => {
    const errs = {}
    if (!formData.name.trim()) errs.name = 'Full name is required.'
    else if (formData.name.trim().length < 2) errs.name = 'Name must be at least 2 characters.'

    if (!formData.email.trim()) errs.email = 'Email address is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) 
      errs.email = 'Please enter a valid email.'

    if (!formData.phone.trim()) errs.phone = 'Phone number is required.'
    else if (!/^[\d\s\-()+]{7,15}$/.test(formData.phone.trim())) 
      errs.phone = 'Enter a valid phone number.'

    if (!formData.message.trim()) errs.message = 'Please write a message.'
    else if (formData.message.trim().length < 10) 
      errs.message = 'Message is too short.'

    return errs
  }

  const submit = async () => {
    const errs = validate(form)
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setErrors({})
    setApiError('')
    setLoading(true)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '853eb835-0c04-4d54-95cb-47e6b916c6f7',
          subject: 'New Contact Form Submission – PrimeSmile',
          from_name: 'PrimeSmile Website',
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setSubmitted(true)
        setForm({ name: '', email: '', phone: '', message: '' })
      } else {
        setApiError('Something went wrong. Please try again or call us directly.')
      }
    } catch {
      setApiError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (field) =>
    `w-full bg-cream-50 border rounded-xl px-5 py-3.5 font-sans text-base text-brand-900 placeholder-brand-300 focus:outline-none focus:border-brand-500 transition-colors ${
      errors[field] ? 'border-red-400 bg-red-50/30' : 'border-brand-200'
    }`

  return (
    <main className="overflow-x-hidden">
      {/* Wide Screen Styles */}
      <style>{wideScreenStyles}</style>

      {/* HERO */}
      <section className="relative py-24 md:py-32 bg-cream-100 overflow-hidden">
        <div className="absolute inset-0">
          <img src="contact.webp" alt="" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-cream-100 via-cream-100/80 to-transparent" />
        </div>

        <div className="relative ws-container max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
          <AnimatedSection animation="fade-up" className="max-w-xl">
            <p className="font-sans text-brand-500 text-sm font-semibold tracking-widest uppercase mb-3">Contact</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-950 leading-tight mb-6">
              Get in touch.
            </h1>
            <p className="font-sans text-brand-600 text-lg md:text-xl leading-relaxed">
              Book an appointment, ask a question, or just say hello. We respond quickly and we are always happy to help.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* QUICK CONTACT CARDS */}
      <section className="ws-section-py py-10 bg-white border-b border-brand-100">
        <div className="ws-container max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Phone,  label: 'Call Us',        sub: '(555) 123-4567',           href: 'tel:+15551234567' },
              { icon: MapPin, label: 'Find Us',        sub: '45 Pearl St, Toronto, ON', href: '#location' },
              { icon: Clock,  label: 'Open Saturdays', sub: '9:00 am – 3:00 pm',       href: '#hours' },
            ].map(item => (
              <AnimatedSection key={item.label} animation="fade-up">
                <a href={item.href} className="group flex items-center gap-4 bg-cream-50 hover:bg-brand-50 border border-brand-100 hover:border-brand-300 rounded-2xl p-6 transition-all hover:shadow-md">
                  <div className="w-11 h-11 rounded-xl bg-brand-100 group-hover:bg-brand-200 flex items-center justify-center shrink-0 transition-colors">
                    <item.icon size={19} className="text-brand-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-sans font-semibold text-brand-900 text-base">{item.label}</p>
                    <p className="font-sans text-brand-500 text-sm truncate">{item.sub}</p>
                  </div>
                  <ArrowRight size={16} className="text-brand-400 shrink-0 ml-auto group-hover:text-brand-600 transition-colors" />
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + INFO SECTION */}
      <section className="ws-section-py py-20 bg-white">
        <div className="ws-container max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20 grid lg:grid-cols-2 gap-16 items-start">

          {/* Contact Form */}
          <AnimatedSection animation="slide-right">
            <h2 className="ws-section-title font-serif text-3xl md:text-4xl text-brand-900 mb-8">Send Us a Message</h2>

            {submitted ? (
              <div className="bg-brand-50 border border-brand-200 rounded-2xl p-10 text-center">
                <CheckCircle2 size={48} className="text-brand-600 mx-auto mb-5" />
                <h3 className="font-serif text-2xl text-brand-900 mb-3">Message received!</h3>
                <p className="font-sans text-brand-600 text-base leading-relaxed">
                  Thanks for reaching out. We will get back to you within one business day.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div>
                  <label className="font-sans text-brand-700 text-base font-medium block mb-2">Full Name <span className="text-red-400">*</span></label>
                  <input type="text" name="name" value={form.name} onChange={change} className={inputClass('name')} />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-sans text-brand-700 text-base font-medium block mb-2">Email Address <span className="text-red-400">*</span></label>
                    <input type="email" name="email" value={form.email} onChange={change} className={inputClass('email')} />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="font-sans text-brand-700 text-base font-medium block mb-2">Phone Number <span className="text-red-400">*</span></label>
                    <input type="tel" name="phone" value={form.phone} onChange={change} className={inputClass('phone')} />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="font-sans text-brand-700 text-base font-medium block mb-2">Message <span className="text-red-400">*</span></label>
                  <textarea name="message" value={form.message} onChange={change} rows={6}
                    placeholder="How can we help you? Tell us about your visit..." 
                    className={inputClass('message') + ' resize-none'} />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                {apiError && (
                  <div className="flex items-start gap-3 text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3.5">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <span>{apiError}</span>
                  </div>
                )}

                <button
                  onClick={submit}
                  disabled={loading}
                  className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-sans font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-base mt-2">
                  {loading ? (
                    <><Loader2 size={18} className="animate-spin" /> Sending…</>
                  ) : (
                    <>Send Message <ArrowRight size={18} /></>
                  )}
                </button>
              </div>
            )}
          </AnimatedSection>

          {/* Sidebar Info */}
          <AnimatedSection animation="slide-left" className="flex flex-col gap-8">

            {/* Office Hours */}
            <div id="hours" className="bg-cream-50 border border-brand-100 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center">
                  <Clock size={20} className="text-brand-600" />
                </div>
                <h3 className="ws-card-title font-serif text-xl text-brand-900">Office Hours</h3>
              </div>
              {hours.map(({ day, time, open: isOpen }) => (
                <div key={day} className="flex justify-between py-3 border-b border-brand-100 last:border-0">
                  <span className="text-brand-700">{day}</span>
                  <span className={`font-medium ${isOpen ? 'text-brand-900' : 'text-brand-400 italic'}`}>{time}</span>
                </div>
              ))}
            </div>

            {/* Location */}
            <div id="location" className="bg-cream-50 border border-brand-100 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center">
                  <MapPin size={20} className="text-brand-600" />
                </div>
                <h3 className="ws-card-title font-serif text-xl text-brand-900">Our Location</h3>
              </div>
              <p className="font-sans text-brand-700 text-base mb-6 leading-relaxed">
                45 Pearl Street, Suite 2<br />Toronto, ON M5H 1J9
              </p>
              <div className="w-full h-80 rounded-2xl overflow-hidden border border-brand-100">
                <iframe
                  title="PrimeSmile Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.269!2d-79.3832!3d43.6489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d68bf33a9b%3A0x15edd8c4de1c7249!2s45%20Pearl%20St%2C%20Toronto%2C%20ON!5e0!3m2!1sen!2sca!4v1"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                />
              </div>
            </div>

            {/* Emergency */}
            <div className="bg-brand-700 rounded-2xl p-8 text-white">
              <h4 className="font-serif text-xl mb-3">Dental Emergency?</h4>
              <p className="font-sans text-brand-200 text-base leading-relaxed mb-6">
                We do our best to see emergency patients the same day, including Saturdays. Call us right away.
              </p>
              <a href="tel:+15551234567" className="inline-flex items-center gap-2 bg-white text-brand-800 hover:bg-brand-50 font-sans font-semibold text-base px-6 py-3 rounded-full transition-colors">
                <Phone size={16} /> Call (555) 123-4567
              </a>
            </div>

          </AnimatedSection>
        </div>
      </section>
    </main>
  )
}

// Helper function for input styling
const inputClass = (field, errors) => `
  w-full bg-cream-50 border rounded-xl px-5 py-3.5 font-sans text-base 
  placeholder-brand-300 focus:outline-none focus:border-brand-500 transition-colors
  ${errors[field] ? 'border-red-400 bg-red-50/30' : 'border-brand-200'}
`