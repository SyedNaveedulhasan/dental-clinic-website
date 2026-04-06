import useScrollAnimation from '../../hooks/useScrollAnimation'

/**
 * Wraps children in a div that animates when scrolled into view.
 * animation: 'fade-up' | 'fade-in' | 'slide-right' | 'slide-left'
 * delay: tailwind delay class e.g. 'delay-100'
 */
export default function AnimatedSection({
  children,
  animation = 'fade-up',
  delay = '',
  className = '',
  threshold = 0.12,
}) {
  const [ref, visible] = useScrollAnimation(threshold)

  const animMap = {
    'fade-up':    'animate-fade-up',
    'fade-in':    'animate-fade-in',
    'slide-right':'animate-slide-right',
    'slide-left': 'animate-slide-left',
  }

  return (
    <div
      ref={ref}
      className={`transition-all ${visible ? animMap[animation] + ' ' + delay : 'opacity-0'} ${className}`}
    >
      {children}
    </div>
  )
}
