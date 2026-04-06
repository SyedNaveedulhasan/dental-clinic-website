import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'

const serviceLinks = [
  { label: 'All Services',        href: '/services' },
  { label: 'General Dentistry',   href: '/services#general' },
  { label: 'Emergency Care',      href: '/services#emergency' },
  { label: 'Teeth Cleaning',      href: '/services#cleaning' },
  { label: 'Fillings & Crowns',   href: '/services#fillings' },
  { label: 'Root Canals',         href: '/services#rootcanal' },
  { label: 'Extractions',         href: '/services#extractions' },
  { label: "Children's Dentistry", href: '/services#children' },
  { label: 'Cosmetic Dentistry',  href: '/services#cosmetic' },
]

function ToothIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M18 3C13.5 3 9 6 9 11C9 14 10 16 10.5 18.5C11 21 11 24 10.5 27C10 29.5 10.5 33 13 33C15 33 15.5 30 16 27.5C16.5 25.5 17 24 18 24C19 24 19.5 25.5 20 27.5C20.5 30 21 33 23 33C25.5 33 26 29.5 25.5 27C25 24 25 21 25.5 18.5C26 16 27 14 27 11C27 6 22.5 3 18 3Z"
        fill="white"
        stroke="white"
        strokeWidth="0.5"
      />
      <path
        d="M13 8C13 8 14 7 16 7.5"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Dropdown({ items }) {
  return (
    <div className="absolute top-full left-0 mt-1 w-52 bg-white shadow-xl border border-brand-100 rounded-xl overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
      {items.map(item => (
        <Link 
          key={item.href} 
          to={item.href}
          className="block px-4 py-2.5 text-base text-brand-800 hover:bg-brand-50 hover:text-brand-700 transition-colors font-sans"
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [svcOpen, setSvcOpen]   = useState(false)
  const location = useLocation()

  useEffect(() => { 
    setOpen(false); 
    setSvcOpen(false) 
  }, [location])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const linkCls = ({ isActive }) =>
    `font-sans font-medium text-base transition-colors ${isActive ? 'text-brand-600' : 'text-brand-800 hover:text-brand-600'}`

  return (
    <>
      <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-cream-50'}`}>
        <nav className="ws-container w-full max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20 flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link to="/">
            <img src="/logo.svg" alt="PrimeSmile Dental Studio" className="h-12 w-auto" />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLink to="/about" className={linkCls}>About</NavLink>

            <div className="relative group">
              <button className="flex items-center gap-1 font-sans font-medium text-base text-brand-800 hover:text-brand-600 transition-colors">
                Services 
                <ChevronDown size={14} className="mt-0.5 transition-transform group-hover:rotate-180" />
              </button>
              <Dropdown items={serviceLinks} />
            </div>

            <NavLink to="/new-patients" className={linkCls}>New Patients</NavLink>
            <NavLink to="/contact" className={linkCls}>Contact</NavLink>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="tel:+15551234567" 
              className="flex items-center gap-1.5 font-sans text-base font-medium text-brand-700 hover:text-brand-900 transition-colors"
            >
              <Phone size={15} /> (555) 123-4567
            </a>
            <Link 
              to="/contact"
              className="bg-brand-600 hover:bg-brand-700 text-white font-sans font-semibold text-base px-5 py-2.5 rounded-full transition-all hover:shadow-md active:scale-95"
            >
              Book Online
            </Link>
          </div>

          {/* Mobile toggle */}
          <button 
            className="lg:hidden p-2 rounded-lg hover:bg-brand-50 text-brand-800 transition-colors" 
            onClick={() => setOpen(!open)} 
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile drawer */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-[560px] border-t border-brand-100' : 'max-h-0'} bg-white`}>
          <div className="px-4 py-4 flex flex-col gap-1">
            <NavLink to="/about" className="py-3 px-3 font-sans font-medium text-base text-brand-800 hover:bg-brand-50 rounded-lg transition-colors block">About</NavLink>

            <div>
              <button 
                className="w-full flex items-center justify-between py-3 px-3 font-sans font-medium text-base text-brand-800 hover:bg-brand-50 rounded-lg transition-colors"
                onClick={() => setSvcOpen(!svcOpen)}
              >
                Services 
                <ChevronDown size={16} className={`transition-transform ${svcOpen ? 'rotate-180' : ''}`} />
              </button>
              {svcOpen && (
                <div className="ml-4 flex flex-col gap-0.5 mt-1">
                  {serviceLinks.map(item => (
                    <Link 
                      key={item.href} 
                      to={item.href} 
                      className="py-2.5 px-3 text-base font-sans text-brand-600 hover:bg-brand-50 rounded-lg transition-colors block"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/new-patients" className="py-3 px-3 font-sans font-medium text-base text-brand-800 hover:bg-brand-50 rounded-lg transition-colors block">New Patients</NavLink>
            <NavLink to="/contact" className="py-3 px-3 font-sans font-medium text-base text-brand-800 hover:bg-brand-50 rounded-lg transition-colors block">Contact</NavLink>

            <div className="mt-3 flex flex-col gap-2 border-t border-brand-100 pt-4">
              <a href="tel:+15551234567" className="flex items-center justify-center gap-2 py-3 rounded-xl border border-brand-300 text-brand-700 font-sans font-medium text-base hover:bg-brand-50 transition-colors">
                <Phone size={16} /> (555) 123-4567
              </a>
              <Link to="/contact" className="flex items-center justify-center py-3 rounded-xl bg-brand-600 text-white font-sans font-semibold text-base hover:bg-brand-700 transition-colors">
                Book Online
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}