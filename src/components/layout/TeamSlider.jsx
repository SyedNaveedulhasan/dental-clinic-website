import { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import AnimatedSection from '../ui/AnimatedSection'
import LazyImage from '../ui/LazyImage'

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

export default function TeamSlider() {
  const [activeTeam, setActiveTeam] = useState(0)
  const [cardWidth, setCardWidth] = useState(null)

  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const strideRef = useRef(0)
  const animRef = useRef(false)

  const measure = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const W = el.offsetWidth
    if (W === 0) return

    const gap = 32
    const cols = window.innerWidth >= 1280 ? 3 : window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1
    const cardW = (W - gap * (cols - 1)) / cols
    const stride = cardW + gap

    strideRef.current = stride
    setCardWidth(cardW)

    if (trackRef.current) {
      trackRef.current.style.transition = 'none'
      trackRef.current.style.transform = `translateX(-${stride}px)`
    }
  }, [])

  useEffect(() => {
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('resize', measure)
    measure() // initial call

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [measure])

  const slide = (dir) => {
    if (animRef.current) return
    animRef.current = true

    const track = trackRef.current
    const stride = strideRef.current

    track.style.transition = 'transform 0.48s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    track.style.transform = dir === 'next' ? `translateX(-${stride * 2}px)` : `translateX(0px)`

    setTimeout(() => {
      track.style.transition = 'none'
      track.style.transform = `translateX(-${stride}px)`

      setActiveTeam(cur =>
        dir === 'next' ? (cur + 1) % team.length : (cur - 1 + team.length) % team.length
      )
      setTimeout(() => { animRef.current = false }, 50)
    }, 480)
  }

  const goTo = (i) => {
    if (animRef.current || i === activeTeam) return
    if (trackRef.current) {
      trackRef.current.style.transition = 'none'
      trackRef.current.style.transform = `translateX(-${strideRef.current}px)`
    }
    setActiveTeam(i)
  }

  const slots = [-1, 0, 1, 2, 3].map((offset) => {
    const index = (activeTeam + offset + team.length * 10) % team.length
    return team[index]
  })

  // Responsive Heights (Fixed & Clean)
  const getContainerHeight = () => {
    if (window.innerWidth >= 2560) return '740px'
    if (window.innerWidth >= 1920) return '660px'
    if (window.innerWidth >= 1536) return '600px'
    return '510px'   // Normal screens
  }

  const getCardHeight = () => {
    if (window.innerWidth >= 2560) return '700px'
    if (window.innerWidth >= 1920) return '620px'
    if (window.innerWidth >= 1536) return '560px'
    return '480px'   // Normal screens
  }

  const getImageHeight = () => {
    if (window.innerWidth >= 2560) return '460px'
    if (window.innerWidth >= 1920) return '410px'
    if (window.innerWidth >= 1536) return '370px'
    return '270px'   // Normal screens
  }

  const cssWidth =
    window.innerWidth >= 1280 ? 'calc(33.333% - 22px)' :
    window.innerWidth >= 1024 ? 'calc(33.333% - 22px)' :
    window.innerWidth >= 768  ? 'calc(50% - 16px)' : '100%'

  return (
    <section className="ws-section-py py-24 bg-white overflow-hidden">
      <div className="ws-container max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20">

        <AnimatedSection animation="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="ws-section-title font-serif text-3xl md:text-4xl text-brand-900">
                Meet Our Team
              </h2>
              <p className="ws-section-sub font-sans text-brand-500 text-base md:text-lg max-w-md">
                Experienced, caring professionals who take the time to truly listen.
              </p>
            </div>

            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => slide('prev')}
                aria-label="Previous"
                className="w-11 h-11 rounded-full border-2 border-brand-200 hover:border-brand-500 hover:bg-brand-50 text-brand-600 flex items-center justify-center transition-all active:scale-90"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => slide('next')}
                aria-label="Next"
                className="w-11 h-11 rounded-full border-2 border-brand-200 hover:border-brand-500 hover:bg-brand-50 text-brand-600 flex items-center justify-center transition-all active:scale-90"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Main Container - Yeh important hai */}
        <div 
          ref={containerRef} 
          className="overflow-hidden"
          style={{ height: getContainerHeight() }}
        >
          <div 
            ref={trackRef} 
            className="flex gap-8 h-full" 
            style={{ willChange: 'transform' }}
          >
            {slots.map((member, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex flex-col bg-cream-50 rounded-3xl overflow-hidden border border-brand-100 hover:border-brand-300 hover:shadow-xl transition-all group"
                style={{
                  width: cardWidth !== null ? `${cardWidth}px` : cssWidth,
                  height: getCardHeight(),
                }}
              >
                {/* Image */}
                <div className="overflow-hidden" style={{ height: getImageHeight() }}>
                  <LazyImage
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Content */}
                <div className="p-8 md:p-9 flex-1 flex flex-col">
                  <h3 className="font-serif text-xl md:text-2xl text-brand-900 leading-tight">
                    {member.name}
                  </h3>
                  <p className="font-sans text-xs text-brand-500 font-semibold tracking-widest uppercase mt-1.5 mb-5">
                    {member.role}
                  </p>
                  <p className="font-sans text-brand-600 text-sm leading-relaxed flex-1">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-5">
          {team.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Team member ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === activeTeam ? 'bg-brand-600 w-8 h-3' : 'bg-brand-200 hover:bg-brand-400 w-3 h-3'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}