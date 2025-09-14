// components/sections/AcademicEducation.tsx

import { getEducation } from '@/lib/portfolio-config';

export function AcademicEducation() {
  const education = getEducation();

  return (
    <section id="academic-education" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-minimal">
        <div className="text-center mb-16">
          <h2 className="section-title robotic-title">EDUCATION</h2>
        </div>

        <div className="space-y-16">
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className="pb-10 border-b border-gray-200 dark:border-gray-700 last:border-b-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-5">
                <div>
                  <h3 className="text-2xl font-bold mb-1 robotic-subtitle">{edu.degree}</h3>
                  {edu.url ? (
                    <a 
                      href={edu.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-lg opacity-70 hover:opacity-100 hover:underline transition-all duration-300 cursor-pointer"
                    >
                      {edu.school}
                    </a>
                  ) : (
                    <p className="text-lg opacity-70">{edu.school}</p>
                  )}
                </div>
                <p className="text-sm uppercase tracking-wider opacity-50 mt-2 md:mt-0">{edu.date}</p>
              </div>
              <ul className="text-base leading-relaxed mt-4 space-y-1">
                {edu.description.map((bullet, bulletIndex) => (
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