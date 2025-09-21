'use client';

import { useRouter } from 'next/navigation';
import { getPersonalInfo, getContact } from '@/lib/portfolio-config';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function Introduction() {
  const personalInfo = getPersonalInfo();
  const contact = getContact();
  const router = useRouter();
  const { elementRef, isVisible } = useScrollAnimation({ 
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px', // Trigger earlier for smoother transition
    triggerOnce: false 
  });
  
  const scrollToNext = () => {
    const nextSection = document.getElementById('experience');
    if (nextSection) {
      // Add a small delay to make the transition feel more intentional
      setTimeout(() => {
        nextSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 200);
    }
  };

  return (
    <section 
      id="introduction" 
      ref={elementRef}
      className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900"
    >
      <div className="container-minimal text-center">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'scroll-visible' : 'scroll-hidden'
        }`}>
          <h1 className="pixelated-name mb-10" data-text={personalInfo.name.replace(' ', '\n')}>
            {personalInfo.name.split(' ').map((word, index) => (
              <span key={index}>
                {word}
                {index === 0 && <br />}
              </span>
            ))}
          </h1>
          
          <p className={`text-lg max-w-2xl mx-auto mb-10 text-balance transition-all duration-1000 delay-300 ${
            isVisible ? 'scroll-visible' : 'scroll-hidden'
          }`}>
            {personalInfo.bio}
          </p>

          {/* Social Links */}
          <div className={`flex justify-center items-center mb-10 transition-all duration-1000 delay-400 ${
            isVisible ? 'scroll-visible' : 'scroll-hidden'
          }`}>
            {Object.entries(contact.social).map(([platform, url], index, array) => (
              url && (
                <div key={platform} className="flex items-center">
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-black dark:text-white hover:opacity-50 transition-minimal text-sm uppercase tracking-wider"
                  >
                    {platform}
                  </a>
                  {(index < array.length - 1 && url && array[index + 1][1]) || index === array.length - 1 ? (
                    <div className="w-0.5 h-4 bg-black dark:bg-white mx-6"></div>
                  ) : null}
                </div>
              )
            ))}
            
            {/* Blogs Link */}
            <div className="flex items-center">
              <button
                onClick={() => window.open('/blogs', '_blank')}
                className="text-black dark:text-white hover:opacity-50 transition-minimal text-sm uppercase tracking-wider"
              >
                blog
              </button>
            </div>
          </div>

          <button
            onClick={scrollToNext}
            className={`btn-minimal transition-all duration-1000 delay-500 ${
              isVisible ? 'scroll-visible-scale' : 'scroll-hidden-scale'
            }`}
            style={{
              transition: 'background-color 0.6s ease-out, color 0.6s ease-out, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
            {personalInfo.ctaText}
          </button>
        </div>
      </div>
    </section>
  );
}
