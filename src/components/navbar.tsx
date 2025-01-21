'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Globe, Menu, X } from 'lucide-react'

const navigation = [
  { name: 'Learn About Upward Mobility', href: '/education' },
  { name: 'Assess Community', href: '/assess' },
  { name: 'Action Plan', href: '/action-plan' },
  { name: 'Success Stories', href: '/stories' },
  { name: 'Help Center', href: '/help' },
]

const languages = [
  { code: 'en', name: 'English' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'am', name: 'አማርኛ' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(languages[0])

  return (
    <header className="bg-white">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        {/* Brand Text */}
        <div className="flex flex-1 justify-start">
          <Link href="/" className="p-1.5">
            <span className="text-2xl font-bold" style={{ color: '#2C4547' }}>
              Upward Mobility
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-6">
          {navigation.map((item, index) => (
            <div className="flex items-center" key={item.name}>
              <Link
                href={item.href}
                className="text-xl font-semibold leading-6 text-gray-900 hover:text-indigo-600"
              >
                {item.name}
              </Link>
              {/* Add a more prominent vertical divider except after the last item */}
              {index < navigation.length - 1 && (
                <div className="h-8 border-l-2 border-indigo-600 mx-6"></div>
              )}
            </div>
          ))}
        </div>

        {/* Language selector - Desktop */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-x-1 text-xl font-semibold leading-6 text-gray-900"
              onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
            >
              <Globe className="h-5 w-5" aria-hidden="true" />
              <span>{currentLanguage.name}</span>
            </button>

            {languageMenuOpen && (
              <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    className="block w-full px-4 py-2 text-left text-lg text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setCurrentLanguage(language)
                      setLanguageMenuOpen(false)
                    }}
                  >
                    {language.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-10">
            <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="text-2xl font-bold" style={{ color: '#2C4547' }}>
                    Upward Mobility
                  </span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-lg font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => {
                          setCurrentLanguage(language)
                          setMobileMenuOpen(false)
                        }}
                      >
                        {language.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
