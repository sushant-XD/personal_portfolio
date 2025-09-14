export interface PersonalInfo {
  name: string;
  initials: string;
  title: string;
  bio: string;
  ctaText: string;
}

export interface Metadata {
  title: string;
  description: string;
  keywords: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  date: string;
  description: string[];
  url?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  date: string;
  description: string[];
  url?: string;
}

export interface Skill {
  name: string;
  description: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: number;
  title: string;
  tech: string;
  description: string;
  fullDescription: string;
  image: string;
  features: string[];
  technologies: string[];
  links: ProjectLink[];
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export interface Contact {
  title: string;
  description: string;
  email: string;
  phone?: string;
  location?: string;
  social: SocialLinks;
}

export interface PortfolioConfig {
  personal: PersonalInfo;
  metadata: Metadata;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  contact: Contact;
}