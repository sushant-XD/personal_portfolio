'use client';

import { getPersonalInfo } from '@/lib/portfolio-config';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function Introduction() {
  const personalInfo = getPersonalInfo();
  const { elementRef, isVisible } = useScrollAnimation({ 
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px', // Trigger earlier for smoother transition
    triggerOnce: false 
  });
  
  const scrollToNext = () => {
    const nextSection = document.getElementById('academic-education');
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
