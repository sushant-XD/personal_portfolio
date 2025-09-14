'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { getProjects } from '@/lib/portfolio-config';
import { Project } from '@/types/portfolio';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const projects = getProjects();

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <section id="projects" className="section-padding bg-white dark:bg-gray-900">
        <div className="container-minimal">
          <div className="text-center mb-16">
            <h2 className="section-title robotic-title">PROJECTS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="card-minimal animate-fade-in-up cursor-pointer hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
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
                  {selectedProject.links.map((link: any, index: number) => (
                    <a
                      key={index}
                      href={link.url}
                      className="btn-minimal text-xs"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ))}
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