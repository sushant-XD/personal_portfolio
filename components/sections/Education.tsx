'use client';

import { getEducation } from '@/lib/portfolio-config';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';

export function Education() {
  const education = getEducation();
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { containerRef, visibleItems } = useStaggeredAnimation(education.length, 200);

  return (
    <section 
      id="academic-education" 
      ref={elementRef}
      className="section-padding bg-gray-50 dark:bg-gray-800"
    >
      <div className="container-minimal">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'scroll-visible' : 'scroll-hidden'
        }`}>
          <h2 className="section-title robotic-title">EDUCATION</h2>
        </div>

        <div ref={containerRef as any} className="space-y-16">
          {education.map((edu, index) => (
            <div
              key={edu.id}
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
                  <h3 className="text-2xl font-bold mb-1 robotic-subtitle">
                    {edu.url ? (
                      <a 
                        href={edu.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                      >
                        {edu.degree}
                      </a>
                    ) : (
                      edu.degree
                    )}
                  </h3>
                  <p className="text-lg opacity-70">
                    {edu.url ? (
                      <a 
                        href={edu.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                      >
                        {edu.school}
                      </a>
                    ) : (
                      edu.school
                    )}
                  </p>
                </div>
                <p className="text-sm uppercase tracking-wider opacity-50 mt-2 md:mt-0">
                  {edu.date}
                </p>
              </div>
              
              {edu.description && (
                <div className="mt-4">
                  <ul className="space-y-2">
                    {edu.description.map((desc, descIndex) => (
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
