import { PortfolioConfig } from '@/types/portfolio';
import portfolioData from '@/data/portfolio-config.json';

export function getPortfolioConfig(): PortfolioConfig {
  return portfolioData as PortfolioConfig;
}

export function getPersonalInfo() {
  return getPortfolioConfig().personal;
}

export function getEducation() {
  return getPortfolioConfig().education;
}

export function getExperience() {
  return getPortfolioConfig().experience;
}

export function getSkills() {
  return getPortfolioConfig().skills;
}

export function getProjects() {
  return getPortfolioConfig().projects;
}

export function getContact() {
  return getPortfolioConfig().contact;
}

export function getMetadata() {
  return getPortfolioConfig().metadata;
}