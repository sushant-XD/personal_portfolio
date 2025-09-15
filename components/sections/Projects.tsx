'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { getProjects } from '@/lib/portfolio-config';
import { Project } from '@/types/portfolio';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const projects = getProjects();
  const { elementRef, isVisible } = useScrollAnimation({ 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    triggerOnce: false // Allow re-animation every time
  });
  const { containerRef, visibleItems } = useStaggeredAnimation(projects.length, 150, false);

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  // Dynamic layout classes based on project count
  const getGridClasses = () => {
    const count = projects.length;
    
    if (count === 1) {
      return "flex justify-center";
    } else if (count === 2) {
      return "grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto";
    } else if (count === 3) {
      return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto";
    } else if (count === 4) {
      return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10 max-w-7xl mx-auto";
    } else {
      // 5+ projects: responsive grid that maintains center alignment
      return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center";
    }
  };

  const getCardClasses = () => {
    const count = projects.length;
    const baseClasses = "card-minimal cursor-pointer";
    
    if (count === 1) {
      return `${baseClasses} max-w-md w-full`;
    }
    return baseClasses;
  };

  return (
    <>
      <section 
        id="projects" 
        ref={elementRef}
        className="section-padding bg-white dark:bg-gray-900"
      >
        <div className="container-minimal">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'scroll-visible' : 'scroll-hidden'
          }`}>
            <h2 className="section-title robotic-title">PROJECTS</h2>
          </div>

          <div ref={containerRef as any} className={getGridClasses()}>
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`${getCardClasses()} transition-all duration-800 ${
                  visibleItems[index] ? 'stagger-visible' : 'stagger-item'
                }`}
                style={{ 
                  animationDelay: `${index * 0.15}s`,
                  transitionDelay: visibleItems[index] ? `${index * 150}ms` : '0ms'
                }}
                onClick={() => openModal(project)}
              >
                <h3 className="text-xl font-bold mb-4 robotic-subtitle">{project.title}</h3>
                <p className="text-xs uppercase tracking-wider opacity-60 mb-5">{project.tech}</p>
                <p className="text-sm leading-relaxed mb-6">{project.description}</p>
                <div className="flex space-x-5">
                  <span className="text-xs text-black uppercase tracking-wider opacity-70">
                    Click to view details →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <Modal onClose={closeModal}>
          <div className="max-w-4xl mx-auto p-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2 robotic-title">{selectedProject.title}</h2>
              <p className="text-sm uppercase tracking-wider opacity-60">{selectedProject.tech}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover border border-gray-200 mb-6"
                />
                
                <h3 className="text-lg font-bold mb-4 robotic-subtitle">Key Features</h3>
                <ul className="space-y-2 mb-6">
                  {selectedProject.features.map((feature: string, index: number) => (
                    <li key={index} className="text-sm flex items-start">
                      <span className="text-black mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 robotic-subtitle">Project Details</h3>
                <p className="text-sm leading-relaxed mb-6">{selectedProject.fullDescription}</p>
                
                <h3 className="text-lg font-bold mb-4 robotic-subtitle">Technologies Used</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map((tech: string, index: number) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-xs uppercase tracking-wider border dark:border-gray-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4">
                  {selectedProject.links
                    .filter((link: any) => link.label.toLowerCase() !== 'documentation')
                    .map((link: any, index: number) => (
                      <a
                        key={index}
                        href={link.url}
                        className="btn-minimal text-xs"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ))
                  }
                </div>
              </div>
            </div>

            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-2xl hover:opacity-70 transition-minimal"
            >
              ×
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}