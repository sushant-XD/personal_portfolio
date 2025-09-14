'use client';

import { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { getPersonalInfo } from '@/lib/portfolio-config';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const personalInfo = getPersonalInfo();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="nav-minimal">
      <div className="container-minimal">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight">
            {personalInfo.name.split(' ').map(word => word[0]).join('')}
          </div>

          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { name: 'ABOUT', id: 'introduction' },
                { name: 'EDUCATION', id: 'academic-education' },
                { name: 'EXPERIENCE', id: 'experience' },
                { name: 'SKILLS', id: 'skills' },
                { name: 'PROJECTS', id: 'projects' },
                { name: 'CONTACT', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="text-black dark:text-white hover:opacity-50 transition-minimal text-sm uppercase tracking-wider"
                >
                  {item.name}
                </button>
              ))}
            </nav>
            
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
