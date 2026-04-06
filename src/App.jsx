import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ui/ScrollToTop'

const HomePage       = lazy(() => import('./pages/HomePage'))
const AboutPage      = lazy(() => import('./pages/AboutPage'))
const ServicesPage   = lazy(() => import('./pages/ServicesPage'))
const NewPatientsPage= lazy(() => import('./pages/NewPatientsPage'))
const ContactPage    = lazy(() => import('./pages/ContactPage'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-100">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
        <p className="font-sans text-brand-600 text-sm tracking-wide">Loading…</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"             element={<HomePage />} />
          <Route path="/about"        element={<AboutPage />} />
          <Route path="/services"     element={<ServicesPage />} />
          <Route path="/new-patients" element={<NewPatientsPage />} />
          <Route path="/contact"      element={<ContactPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  )
}
