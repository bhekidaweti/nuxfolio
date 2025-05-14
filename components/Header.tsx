'use client';
import { Link } from 'react-scroll';
import ThemeToggle from '../components/ThemeToggle';
import Image from 'next/image';
import logo from '../public/bheki-logo.png';

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
    <header className="w-full fixed top-0 left-0 z-50 bg-white dark:bg-black shadow flex justify-between items-center px-6 py-4">
      <div className="font-bold text-xl">
        <Image
                src={logo}
                alt="Bheki Daweti"
                width={150}
                height={80}
              />
        </div>
      <nav className="flex gap-6 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            spy={true}
            smooth={true}
            offset={-60}
            duration={500}
            className="cursor-pointer hover:text-green-500 dark:hover:text-green-300"
          >
            {link.label}
          </Link>
        ))}
         <ThemeToggle /> 
      </nav>
    </header>
  );
}