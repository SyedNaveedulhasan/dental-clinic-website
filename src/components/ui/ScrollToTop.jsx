import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto'
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    // Restore karo thodi der baad
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = ''
    }, 100)
  }, [pathname])
  return null
}