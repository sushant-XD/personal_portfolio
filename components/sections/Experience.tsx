'use client';

import { getExperience } from '@/lib/portfolio-config';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';

export function Experience() {
  const experiences = getExperience();
  const { elementRef, isVisible } = useScrollAnimation({ 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: false // Allow re-animation every time
  });
  const { containerRef, visibleItems } = useStaggeredAnimation(experiences.length, 200, false);

  return (
    <section 
      id="experience" 
      ref={elementRef}
      className="section-padding bg-white dark:bg-gray-900"
    >
      <div className="container-minimal">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'scroll-visible' : 'scroll-hidden'
        }`}>
          <h2 className="section-title robotic-title">EXPERIENCE</h2>
        </div>

        <div ref={containerRef as any} className="space-y-16">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`pb-10 border-b border-gray-200 dark:border-gray-600 last:border-b-0 transition-all duration-800 ${
                visibleItems[index] ? 'stagger-visible' : 'stagger-item'
              }`}
              style={{ 
                transitionDelay: `${index * 200}ms`,
                opacity: visibleItems[index] ? 1 : 0,
                transform: visibleItems[index] 
                  ? 'translateY(0) translateX(0)' 
                  : `translateY(30px) translateX(${index % 2 === 0 ? '-30px' : '30px'})`
              }}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-5">
                <div>
                  <h3 className="text-2xl font-bold mb-1 robotic-subtitle">{exp.title}</h3>
                  {exp.url ? (
                    <a 
                      href={exp.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lg opacity-70 hover:opacity-100 hover:underline transition-opacity duration-200 cursor-pointer"
                    >
                      {exp.company}
                    </a>
                  ) : (
                    <p className="text-lg opacity-70">{exp.company}</p>
                  )}
                </div>
                <p className="text-sm uppercase tracking-wider opacity-50 mt-2 md:mt-0">
                  {exp.date}
                </p>
              </div>
              
              {exp.description && (
                <div className="mt-4">
                  <ul className="space-y-2">
                    {exp.description.map((desc, descIndex) => (
                      <li 
                        key={descIndex} 
                        className="text-base leading-relaxed flex items-start"
                        style={{
                          opacity: visibleItems[index] ? 1 : 0,
                          transform: visibleItems[index] ? 'translateX(0)' : 'translateX(20px)',
                          transition: `all 0.6s ease ${(index * 200) + (descIndex * 100)}ms`
                        }}
                      >
                        <span className="text-blue-600 dark:text-blue-400 mr-3 mt-1">•</span>
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
