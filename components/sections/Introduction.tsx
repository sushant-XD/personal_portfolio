'use client';

import { getPersonalInfo } from '@/lib/portfolio-config';

export function Introduction() {
  const personalInfo = getPersonalInfo();
  
  const scrollToNext = () => {
    const nextSection = document.getElementById('academic-education');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="introduction" className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="container-minimal text-center">
        <div className="animate-fade-in-up">
          <h1 className="pixelated-name mb-10" data-text={personalInfo.name.replace(' ', '\n')}>
            {personalInfo.name.split(' ').map((word, index) => (
              <span key={index}>
                {word}
                {index === 0 && <br />}
              </span>
            ))}
          </h1>
          
          <p className="text-lg max-w-2xl mx-auto mb-10 text-balance">
            {personalInfo.bio}
          </p>

          <button
            onClick={scrollToNext}
            className="btn-minimal"
          >
            {personalInfo.ctaText}
          </button>
        </div>
      </div>
    </section>
  );
}
