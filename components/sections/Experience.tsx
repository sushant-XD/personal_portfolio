// components/sections/Experience.tsx

import { getExperience } from '@/lib/portfolio-config';

export function Experience() {
  const experiences = getExperience();

  return (
    <section id="experience" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-minimal">
        <div className="text-center mb-16">
          <h2 className="section-title robotic-title">EXPERIENCE</h2>
        </div>

        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="pb-10 border-b border-gray-200 last:border-b-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-5">
                <div>
                  <h3 className="text-2xl font-bold mb-1 robotic-subtitle">{exp.title}</h3>
                  {exp.url ? (
                    <a 
                      href={exp.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lg opacity-70 hover:opacity-100 hover:underline transition-all duration-300 cursor-pointer"
                    >
                      {exp.company}
                    </a>
                  ) : (
                    <p className="text-lg opacity-70">{exp.company}</p>
                  )}
                </div>
                <p className="text-sm uppercase tracking-wider opacity-50 mt-2 md:mt-0">{exp.date}</p>
              </div>
              <ul className="text-base leading-relaxed mt-4 space-y-2">
                {exp.description.map((bullet, bulletIndex) => (
                  <li key={bulletIndex} className="flex items-start">
                    <span className="text-black dark:text-white mr-3 mt-1">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
