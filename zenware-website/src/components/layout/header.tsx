'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'AI Audit', href: '/assessment', highlight: true },
    { name: 'About', href: '/about', highlight: false },
    { name: 'Solutions', href: '/solutions', highlight: false },
    { name: 'Portfolio', href: '/portfolio', highlight: false },
    { name: 'Blog', href: '/blog', highlight: false },
  ];

  return (
    <header
      className={cn(
        "fixed top-4 left-0 right-0 z-50 transition-all duration-300 px-4 flex justify-center",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className={cn(
        "w-full max-w-6xl rounded-2xl transition-all duration-300 border backdrop-blur-md flex items-center justify-between px-6",
        scrolled
          ? "bg-white/80 border-black/5 shadow-sm py-3 dark:bg-black/60 dark:border-white/10"
          : "bg-transparent border-transparent py-4"
      )}>
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/ZenwareLogoSmall.png"
            alt="Zenware"
            width={340}
            height={96}
            className="h-24 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm px-4 py-2 rounded-full transition-all duration-300",
                item.highlight
                  ? "text-purple-700 bg-purple-100 hover:bg-purple-200 font-medium dark:text-purple-300 dark:bg-purple-900/30 dark:hover:bg-purple-900/50"
                  : "text-zinc-600 hover:text-black hover:bg-black/5 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/5"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center">
          <Button asChild className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-full px-6 transition-all duration-300 font-medium text-sm h-10 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
            <Link href="/contact">
              Get Started
            </Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-zinc-900 hover:bg-black/5 rounded-full w-10 h-10 dark:text-white dark:hover:bg-white/10"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-xl border border-black/5 rounded-2xl overflow-hidden shadow-xl animate-in fade-in slide-in-from-top-2 dark:bg-black/95 dark:border-white/10">
          <div className="p-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block px-4 py-3 rounded-xl transition-colors font-medium",
                  item.highlight
                    ? "text-purple-700 bg-purple-100 hover:bg-purple-200 dark:text-purple-300 dark:bg-purple-900/30 dark:hover:bg-purple-900/50"
                    : "text-zinc-600 hover:text-black hover:bg-black/5 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/5"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 px-4">
              <Button asChild className="w-full bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl h-11 font-medium dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}