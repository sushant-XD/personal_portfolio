// types/index.ts
export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  details: string;
  link?: string;
  type: 'education' | 'experience';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  techStack: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface MediaArticle {
  title: string;
  publication: string;
  url: string;
  date: string;
}

export interface MediaCoverage {
  id: string;
  title: string;
  description: string;
  image: string;
  articles: MediaArticle[];
}

export interface ContactForm {
  name?: string;
  email: string;
  message: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    intro: string;
    email: string;
    location: string;
  };
  experiences: Experience[];
  projects: Project[];
  mediaCoverage: MediaCoverage[];
}