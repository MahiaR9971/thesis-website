import Link from 'next/link'

const navigation = {
  main: [
    { name: 'Education', href: '/education' },
    { name: 'Assess Community', href: '/assess' },
    { name: 'Action Plan', href: '/action-plan' },
    { name: 'Success Stories', href: '/stories' },
    { name: 'Help Center', href: '/help' },
  ],
  social: [
    {
      name: 'Contact Support',
      href: '/help#contact',
      description: 'Get help with using our tools'
    },
    {
      name: 'Community Forum',
      href: '/community',
      description: 'Connect with other families'
    },
    {
      name: 'Resource Library',
      href: '/resources',
      description: 'Access guides and documentation'
    },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <Link href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        
        <div className="mt-10 border-t border-gray-900/10 pt-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {navigation.social.map((item) => (
              <div key={item.name} className="text-center sm:text-left">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">{item.name}</h3>
                <p className="mt-1 text-sm leading-6 text-gray-600">{item.description}</p>
                <Link
                  href={item.href}
                  className="mt-2 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; {new Date().getFullYear()} Upward Mobility Tool. All rights reserved.
        </p>
      </div>
    </footer>
  )
}