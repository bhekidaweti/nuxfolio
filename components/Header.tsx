'use client';
import { Link as ScrollLink } from 'react-scroll';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/dee.png';
import ThemeToggle from './ThemeToggle';
import { SquareArrowUpRight } from 'lucide-react';

const navLinks = [
  { label: 'Home', to: 'home' },
  { label: 'Skills', to: 'skills' },
  { label: 'Projects', to: 'projects' },
  { label: 'Articles', to: 'articles' },
  { label: 'Videos', to: 'videos' },
  { label: 'Contact', to: 'contact' },
];

export default function Header() {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-black flex justify-between items-center px-6 py-4">
        <Image
                src={logo}
                alt="Bheki Daweti"
                width={150}
                height={80}
              />
      <nav className="flex gap-6 items-center">
        {navLinks.map((link) => (
          <ScrollLink
            key={link.to}
            to={link.to}
            spy={true}
            smooth={true}
            offset={-60}
            duration={500}
            className="cursor-pointer hover:text-green-500 dark:hover:text-green-300"
          >
            {link.label}
          </ScrollLink>
        ))}
        <Link
          href="/blog"
          className="cursor-pointer hover:text-green-500 dark:hover:text-green-300"
        >
         <SquareArrowUpRight className="inline-block mr-2 h-3 w-3"/>     
          Blog
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}