import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Solutions', href: '/solutions' },
      { name: 'AI Automation', href: '/ai-automation' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    social: [
      { name: 'LinkedIn', href: 'https://linkedin.com/company/zenware' },
      { name: 'Medium', href: 'https://medium.com/@zenware' },
    ],
  };

  return (
    <footer className="bg-[#0a0a0a] text-white border-t border-[#2a2a2a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <span className="text-xl font-bold">Zenware</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md text-lg">
              Conscious Technology for New Earth Systems. Bridging ancient wisdom with cutting-edge AI to create regenerative, sovereign, and decentralized systems.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Navigation</h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link
                  href="mailto:info@zenware.io"
                  className="hover:text-purple-400 transition-colors"
                >
                  info@zenware.io
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:automation@zenware.io"
                  className="hover:text-purple-400 transition-colors"
                >
                  automation@zenware.io
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:partners@zenware.io"
                  className="hover:text-purple-400 transition-colors"
                >
                  partners@zenware.io
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-[#2a2a2a]" />

        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Zenware. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {navigation.legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}