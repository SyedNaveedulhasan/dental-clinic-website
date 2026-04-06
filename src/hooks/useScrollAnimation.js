import { useEffect, useRef, useState } from 'react'

export default function useScrollAnimation(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let obs
    const timer = setTimeout(() => {
      obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true)
            obs.unobserve(el)
          }
        },
        { threshold }
      )
      obs.observe(el)
    }, 200) // scroll settle hone ka wait

    return () => {
      clearTimeout(timer)
      obs?.disconnect()
    }
  }, [threshold])

  return [ref, visible]
}