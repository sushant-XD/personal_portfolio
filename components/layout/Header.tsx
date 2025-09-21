'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { getPersonalInfo } from '@/lib/portfolio-config';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const personalInfo = getPersonalInfo();
  const router = useRouter();
  const pathname = usePathname();

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Hide header on blogs page
  const shouldHideHeader = isClient && pathname?.includes('/blogs');

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

  const scrollToTop = () => {
    // Check if we're on the home page
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to home page
      router.push('/');
    }
  };

  const handleNavigation = (item: { name: string; id?: string; route?: string }) => {
    if (item.route) {
      // Open blog route in new tab
      if (item.route === '/blogs') {
        window.open(item.route, '_blank');
      } else {
        router.push(item.route);
      }
    } else if (item.id) {
      scrollToSection(item.id);
    }
  };

  // Don't render header on blogs page
  if (shouldHideHeader) {
    return null;
  }

  // Also don't render if we haven't hydrated yet and might be on blogs page
  if (!isClient) {
    return null;
  }

  return (
    <header className="nav-minimal">
      <div className="container-minimal">
        <div className="flex items-center justify-between">
          <button 
            onClick={scrollToTop}
            className="text-2xl font-bold tracking-tight hover:opacity-70 transition-minimal cursor-pointer"
          >
            {personalInfo.name.split(' ').map(word => word[0]).join('')}
          </button>

          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { name: 'ABOUT', id: 'introduction' },
                { name: 'EDUCATION', id: 'academic-education' },
                { name: 'EXPERIENCE', id: 'experience' },
                { name: 'SKILLS', id: 'skills' },
                { name: 'PROJECTS', id: 'projects' },
                { name: 'BLOG', route: '/blogs' },
                { name: 'CONTACT', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item)}
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
