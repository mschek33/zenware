export interface Project {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  description: string;
  longDescription?: string;
  image?: string;
  status: 'development' | 'beta' | 'live';
  category: 'regenerative' | 'consciousness' | 'sovereign' | 'ai';
  tags: string[];
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  image?: string;
  published: boolean;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  category: 'automation' | 'intelligence' | 'business-intelligence';
  price?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType?: string;
  budgetRange?: string;
  timeline?: string;
  message: string;
}

export interface NewsletterForm {
  email: string;
  name?: string;
}