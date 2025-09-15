'use client';

import { getSkills } from '@/lib/portfolio-config';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';

export function SkillsSection() {
  const skills = getSkills();
  const { elementRef, isVisible } = useScrollAnimation({ 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: false // Allow re-animation every time
  });
  const { containerRef, visibleItems } = useStaggeredAnimation(skills.length, 150, false);

  // Dynamic grid classes based on number of skills
  const getGridClasses = (count: number) => {
    if (count === 1) return 'grid grid-cols-1 max-w-md mx-auto';
    if (count === 2) return 'grid grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto';
    if (count === 3) return 'grid grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto';
    if (count === 4) return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto';
    if (count === 5) return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-7xl mx-auto';
    if (count === 6) return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto';
    // For more than 6, use responsive grid
    return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto';
  };

  return (
    <section 
      id="skills" 
      ref={elementRef}
      className="section-padding bg-gray-50 dark:bg-gray-800"
    >
      <div className="container-minimal">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'scroll-visible' : 'scroll-hidden'
        }`}>
          <h2 className="section-title robotic-title">SKILLS</h2>
        </div>

        <div ref={containerRef as any} className={`${getGridClasses(skills.length)} gap-8`}>
          {skills.map((skill, idx) => (
            <div
              key={skill.name}
              className={`skill-item-dynamic transition-all duration-800 ${
                visibleItems[idx] ? 'stagger-visible' : 'stagger-item'
              }`}
              style={{ 
                transitionDelay: visibleItems[idx] ? `${idx * 150}ms` : '0ms'
              }}
            >
              <h3 className="font-bold mb-4 text-lg robotic-subtitle">{skill.name}</h3>
              <p className="text-sm opacity-70 leading-relaxed">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}