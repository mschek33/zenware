import Link from 'next/link';
import Image from 'next/image';

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
    <footer className="bg-background border-t border-black/5 pt-24 pb-12 dark:border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 space-y-8">
            <Link href="/" className="inline-block">
              <Image
                src="/ZenwareLogoSmall.png"
                alt="Zenware"
                width={160}
                height={45}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-zinc-500 font-light text-lg leading-relaxed max-w-sm dark:text-zinc-400">
              Conscious Technology for New Earth Systems. Bridging ancient wisdom with cutting-edge AI.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-zinc-500 hover:text-zinc-900 transition-colors dark:hover:text-white"
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
            <h3 className="text-sm font-medium text-zinc-900 mb-6 uppercase tracking-wider dark:text-white">Navigation</h3>
            <ul className="space-y-4">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-zinc-500 hover:text-zinc-900 transition-colors font-light dark:hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium text-zinc-900 mb-6 uppercase tracking-wider dark:text-white">Contact</h3>
            <ul className="space-y-4">
              {['info', 'automation', 'partners'].map((email) => (
                <li key={email}>
                  <Link
                    href={`mailto:${email}@zenware.io`}
                    className="text-zinc-500 hover:text-zinc-900 transition-colors font-light dark:hover:text-white"
                  >
                    {email}@zenware.io
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-6 dark:border-white/5">
          <p className="text-zinc-600 text-sm font-light dark:text-zinc-500">
            © {new Date().getFullYear()} Zenware. All rights reserved.
          </p>
          <div className="flex space-x-8">
            {navigation.legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-zinc-600 hover:text-zinc-900 text-sm transition-colors font-light dark:text-zinc-500 dark:hover:text-white"
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