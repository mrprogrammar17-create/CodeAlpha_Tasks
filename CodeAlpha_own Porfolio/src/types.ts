/**
 * Types and Interfaces for Kamran Khan's Portfolio App
 */

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'frontend' | 'design' | 'tools';
  iconName: string; // lucide icon name
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: 'web' | 'design' | 'all';
  liveUrl?: string;
  githubUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  comment: string;
  avatar: string; // fallback initials or picsum if empty
  rating: number; // 1 to 5
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // lucide icon name
  features: string[];
}
