'use client';

import { Link as ScrollLink } from 'react-scroll';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logo from '../public/dee.png';
import ThemeToggle from './ThemeToggle';
import { SquareArrowUpRight } from 'lucide-react';

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Articles', id: 'articles' },
  { label: 'Videos', id: 'videos' },
  { label: 'Contact', id: 'contact' },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-black flex justify-between items-center px-6 py-4">
      <Image src={logo} alt="Bheki Daweti" width={150} height={80} />

      <nav className="flex gap-6 items-center">
        {navLinks.map((link) =>
          isHome ? (
            // ✅ On homepage → smooth scroll
            <ScrollLink
              key={link.id}
              to={link.id}
              spy
              smooth
              offset={-80}
              duration={500}
              className="cursor-pointer hover:text-green-500"
            >
              {link.label}
            </ScrollLink>
          ) : (
            // ✅ On blog → navigate to homepage + anchor
            <Link
              key={link.id}
              href={`/#${link.id}`}
              className="hover:text-green-500"
            >
              {link.label}
            </Link>
          )
        )}

        <Link href="/blog" className="hover:text-green-500">
          Blog
        </Link>
        <Link href="https://eliftech.co.za" className="hover:text-green-500">
          <SquareArrowUpRight className="inline-block mr-2 h-4 w-4" />
          Shop
        </Link>

        <ThemeToggle />
      </nav>
    </header>
  );
}
