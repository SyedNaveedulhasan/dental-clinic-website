import { useState, useRef, useEffect, useCallback } from 'react'
import { MapPin } from 'lucide-react'
import AnimatedSection from '../ui/AnimatedSection'
import LazyImage from '../ui/LazyImage'

const galleryImages = [
  { src: '/dr1.webp',      alt: 'Reception area' },
  { src: '/recep2.webp',   alt: 'Treatment room' },
  { src: '/recep.webp',    alt: 'Waiting lounge' },
  { src: '/interior.webp', alt: 'Consultation room' },
  { src: '/hygen.webp',    alt: 'Dental suite' },
  { src: '/sink.webp',     alt: 'Front desk' },
  { src: '/dr2.webp',      alt: 'Modern equipment' },
]

export default function GallerySlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging,  setIsDragging]  = useState(false)
  const [cardWidth,   setCardWidth]   = useState(null)

  const containerRef = useRef(null)
  const trackRef     = useRef(null)
  const strideRef    = useRef(0)
  const animRef      = useRef(false)

  const dragStartX   = useRef(0)
  const dragCurrentX = useRef(0)
  const dragStartT   = useRef(0)

  const measure = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const W = el.offsetWidth
    if (W === 0) return

    const gap  = 2
    const cols = window.innerWidth >= 1280 ? 3 : window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1
    const cardW  = (W - gap * (cols - 1)) / cols
    const stride = cardW + gap

    strideRef.current = stride
    setCardWidth(cardW)

    if (trackRef.current) {
      trackRef.current.style.transition = 'none'
      trackRef.current.style.transform  = `translateX(-${stride}px)`
    }
  }, [])

  useEffect(() => {
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [measure])

  const slide = useCallback((dir) => {
    if (animRef.current) return
    animRef.current = true
    const track  = trackRef.current
    const stride = strideRef.current
    track.style.transition = 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    track.style.transform  = dir === 'next'
      ? `translateX(-${stride * 2}px)`
      : `translateX(0px)`

    setTimeout(() => {
      track.style.transition = 'none'
      track.style.transform  = `translateX(-${stride}px)`
      setActiveIndex(cur =>
        dir === 'next'
          ? (cur + 1) % galleryImages.length
          : (cur - 1 + galleryImages.length) % galleryImages.length
      )
      setTimeout(() => { animRef.current = false }, 30)
    }, 450)
  }, [])

  const onDragStart = (clientX) => {
    if (animRef.current) return
    dragStartX.current   = clientX
    dragCurrentX.current = clientX
    dragStartT.current   = Date.now()
    setIsDragging(true)
    if (trackRef.current) trackRef.current.style.transition = 'none'
  }

  const onDragMove = (clientX) => {
    if (!isDragging) return
    dragCurrentX.current = clientX
    if (trackRef.current)
      trackRef.current.style.transform = `translateX(${-strideRef.current + (clientX - dragStartX.current)}px)`
  }

  const onDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    const delta    = dragCurrentX.current - dragStartX.current
    const elapsed  = Date.now() - dragStartT.current
    const velocity = Math.abs(delta) / (elapsed || 1)

    if (Math.abs(delta) >= 15 || velocity >= 0.3) {
      slide(delta < 0 ? 'next' : 'prev')
    } else {
      if (trackRef.current) {
        trackRef.current.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        trackRef.current.style.transform  = `translateX(-${strideRef.current}px)`
      }
    }
  }

  const onMouseDown  = (e) => { e.preventDefault(); onDragStart(e.clientX) }
  const onMouseMove  = (e) => { if (isDragging) onDragMove(e.clientX) }
  const onMouseUp    = ()  => onDragEnd()
  const onMouseLeave = ()  => { if (isDragging) onDragEnd() }
  const onTouchStart = (e) => onDragStart(e.touches[0].clientX)
  const onTouchMove  = (e) => { e.preventDefault(); onDragMove(e.touches[0].clientX) }
  const onTouchEnd   = ()  => onDragEnd()

  const isMobile = window.innerWidth < 1024

  const cssWidth =
    window.innerWidth >= 1280 ? 'calc(33.333% - 2px)' :
    window.innerWidth >= 1024 ? 'calc(33.333% - 2px)' :
    window.innerWidth >= 640  ? 'calc(50% - 1px)'     : '100%'

  const slots = [-1, 0, 1, 2, 3].map(offset =>
    galleryImages[(activeIndex + offset + galleryImages.length * 10) % galleryImages.length]
  )

  return (
    <section className="ws-section-py py-20 bg-cream-50 overflow-hidden">
      <div className="ws-container max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20">

        <AnimatedSection animation="fade-up" className="text-center mb-14">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center">
              <MapPin size={22} className="text-brand-600" />
            </div>
          </div>
          <h2 className="ws-section-title font-serif text-3xl md:text-4xl text-brand-900">Step Inside</h2>
          <p className="ws-section-sub font-sans text-brand-500 text-base md:text-lg">
            Take a tour of our state-of-the-art facility.
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-up">
          <div
            ref={containerRef}
            className="overflow-hidden w-full"
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div 
              ref={trackRef} 
              className="flex" 
              style={{ gap: '2px', willChange: 'transform', userSelect: 'none' }}
            >
              {slots.map((img, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 overflow-hidden pointer-events-none"
                  style={{
                    width: cardWidth !== null ? `${cardWidth}px` : cssWidth,
                    aspectRatio: isMobile ? '3 / 2' : '5 / 4',
                  }}
                >
                  <LazyImage
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <div className="flex justify-center gap-2 mt-10">
          {galleryImages.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (animRef.current || i === activeIndex) return
                if (trackRef.current) {
                  trackRef.current.style.transition = 'none'
                  trackRef.current.style.transform  = `translateX(-${strideRef.current}px)`
                }
                setActiveIndex(i)
              }}
              aria-label={`Image ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex ? 'bg-brand-600 w-8 h-3' : 'bg-brand-200 hover:bg-brand-400 w-3 h-3'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}