import { Link } from 'react-router-dom'
import { Phone, MapPin, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      {/* CTA strip */}
      <div className="bg-brand-800 py-10 px-4">
        <div className="ws-container w-full max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="font-serif text-2xl md:text-3xl text-white">Ready for a healthier smile?</h3>
            <p className="font-sans text-brand-200 mt-1 text-base">Book online or call us — we are always happy to help.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:+15551234567"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-cream-200/40 text-cream-100 font-sans font-medium text-base hover:bg-white/10 transition-colors"
            >
              <Phone size={16} /> (555) 123-4567
            </a>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-950 font-sans font-semibold text-base transition-colors text-center"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>

      {/* Main grid — light */}
      <div className="bg-cream-200 px-4 py-14">
        <div className="ws-container w-full max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex flex-col gap-5">
            <Link to="/">
              <img
                src="/logo.svg"
                alt="PrimeSmile Logo"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="font-sans text-brand-700 text-base leading-relaxed">
              Friendly, thorough dental care for the whole family — in a calm and welcoming studio.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-brand-100 hover:bg-brand-200 flex items-center justify-center transition-colors"
              >
                <Facebook size={16} className="text-brand-700" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-brand-100 hover:bg-brand-200 flex items-center justify-center transition-colors"
              >
                <Instagram size={16} className="text-brand-700" />
              </a>
            </div>
          </div>

          {/* Practice links */}
          <div>
            <h4 className="font-serif text-brand-900 font-semibold mb-4 text-lg">Practice</h4>
            <ul className="flex flex-col gap-3">
              {[
                ['Home',         '/'],
                ['About',        '/about'],
                ['Services',     '/services'],
                ['New Patients', '/new-patients'],
                ['Contact',      '/contact'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="font-sans text-brand-600 text-base hover:text-brand-900 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h4 className="font-serif text-brand-900 font-semibold mb-4 text-lg">Services</h4>
            <ul className="flex flex-col gap-3">
              {[
                ['Teeth Cleaning',       '/services#cleaning'],
                ['Fillings & Crowns',    '/services#fillings'],
                ['Root Canals',          '/services#rootcanal'],
                ['Extractions',          '/services#extractions'],
                ['Emergency Care',       '/services#emergency'],
                ["Children's Dentistry", '/services#children'],
                ['Cosmetic Dentistry',   '/services#cosmetic'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="font-sans text-brand-600 text-base hover:text-brand-900 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-serif text-brand-900 font-semibold mb-4 text-lg">Location</h4>

            <div className="flex gap-2 mb-4">
              <MapPin size={15} className="text-brand-500 mt-0.5 shrink-0" />
              <p className="font-sans text-brand-600 text-base leading-relaxed">
                45 Pearl Street, Suite 2<br />
                Toronto, ON M5H 1J9
              </p>
            </div>

            <div className="flex gap-2">
              <Phone size={15} className="text-brand-500 mt-0.5 shrink-0" />
              <a
                href="tel:+15551234567"
                className="font-sans text-brand-600 text-base hover:text-brand-900 transition-colors"
              >
                (555) 123-4567
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar — dark */}
      <div className="bg-brand-950 py-5 px-4">
        <div className="ws-container w-full max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 xl:px-20 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm font-sans text-brand-500">
          <span>© {currentYear} PrimeSmile Dental Studio. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-400 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>

    </footer>
  )
}