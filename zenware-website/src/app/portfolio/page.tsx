import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Github, Code, Globe, Smartphone, Database } from 'lucide-react';
import { PrismaClient } from '@prisma/client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio - Zenware | Conscious Technology Solutions',
  description: 'Explore our portfolio of conscious technology solutions, from enterprise superyacht systems to regenerative platforms. 15+ years of experience in innovative software development.',
  keywords: 'portfolio, conscious technology, software development, enterprise solutions, superyacht systems, regenerative technology',
};

// Project interface to match database schema
interface Project {
  id: string
  name: string
  slug: string
  tagline?: string | null
  description: string
  longDescription?: string | null
  image?: string | null
  status: string
  category: string
  tags: string[]
  techStack: string[]
  demoUrl?: string | null
  githubUrl?: string | null
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

// Server-side data fetching using Prisma directly
const prisma = new PrismaClient()

async function getProjects(): Promise<Project[]> {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [
        { featured: 'desc' }, // Featured projects first
        { createdAt: 'desc' }
      ]
    })
    
    return projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export default async function Portfolio() {
  // Fetch projects from database
  const projects = await getProjects()

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'regenerative':
        return 'kortex-badge-primary border-green-500/30 text-green-300';
      case 'consciousness':
        return 'kortex-badge-primary border-blue-500/30 text-blue-300';
      case 'sovereign':
        return 'kortex-badge-primary border-purple-500/30 text-purple-300';
      case 'ai':
        return 'kortex-badge-primary border-orange-500/30 text-orange-300';
      default:
        return 'kortex-badge';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-green-500';
      case 'beta':
        return 'bg-yellow-500';
      case 'development':
        return 'bg-blue-500';
      default:
        return 'bg-gray-400';
    }
  };

  const expertise = [
    {
      icon: Code,
      title: 'Full-Stack Development',
      technologies: ['Next.js', 'React', 'Node.js', 'TypeScript', 'Python'],
    },
    {
      icon: Globe,
      title: 'Web Platforms',
      technologies: ['Progressive Web Apps', 'E-commerce', 'SaaS', 'Content Management'],
    },
    {
      icon: Smartphone,
      title: 'Mobile Solutions',
      technologies: ['React Native', 'Flutter', 'iOS', 'Android'],
    },
    {
      icon: Database,
      title: 'Backend Systems',
      technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'Microservices'],
    },
  ];

  const enterpriseWork = [
    {
      title: 'Fleet Management System',
      description: 'Mission-critical software for managing luxury superyacht fleets',
      technologies: ['C#', '.NET', 'SQL Server', 'Azure'],
      impact: 'Managing $500M+ in maritime assets',
    },
    {
      title: 'Crew Coordination Platform',
      description: 'Global crew scheduling and management for superyacht industry',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'WebSocket'],
      impact: 'Coordinating 1000+ crew members worldwide',
    },
    {
      title: 'Mobile Fleet App',
      description: 'Real-time yacht monitoring and communication system',
      technologies: ['React Native', 'GraphQL', 'MongoDB', 'Push Notifications'],
      impact: '24/7 monitoring of critical systems',
    },
    {
      title: 'Corporate Intranet',
      description: 'Enterprise collaboration and document management system',
      technologies: ['SharePoint', 'Power Platform', 'Teams Integration'],
      impact: 'Used by 500+ employees globally',
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="kortex-hero-short bg-noise">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="kortex-hero-title text-white mb-6">
              Portfolio of{' '}
              <span className="kortex-text-gradient">
                Innovation
              </span>
            </h1>
            <p className="kortex-subtitle mb-8 max-w-3xl mx-auto">
              From enterprise superyacht systems to conscious technology platforms - a showcase of transformative solutions
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <span className="kortex-badge-primary px-4 py-2">15+ Years Experience</span>
              <span className="kortex-badge-primary px-4 py-2">100+ Projects</span>
              <span className="kortex-badge-primary px-4 py-2">Microsoft Certified</span>
              <span className="kortex-badge-primary px-4 py-2">Enterprise Grade</span>
            </div>
          </div>
        </section>

        {/* Project Gallery */}
        <section className="kortex-section bg-grid-pattern">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="kortex-section-title text-white mb-4">
                Conscious Technology Projects
              </h2>
              <p className="kortex-subtitle max-w-2xl mx-auto">
                Innovative solutions for the new earth paradigm
              </p>
            </div>

            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                <div key={project.id} className="kortex-feature-card p-6 group">
                  <div className="">
                    <div className="flex items-center justify-between mb-4">
                      <span className={getCategoryColor(project.category)}>
                        {project.category}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`}></div>
                        <span className="text-sm text-gray-400 capitalize">{project.status}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {project.name}
                    </h3>
                    
                    {project.tagline && (
                      <p className="text-sm text-purple-300 mb-2 font-medium">
                        {project.tagline}
                      </p>
                    )}
                    
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0, 3).map((tech, index) => (
                        <span key={index} className="text-xs bg-[#2a2a2a] text-gray-400 px-2 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="text-xs bg-[#2a2a2a] text-gray-400 px-2 py-1 rounded-full">
                          +{project.techStack.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {project.demoUrl && (
                          <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <button className="kortex-button text-xs px-3 py-1">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Demo
                            </button>
                          </Link>
                        )}
                        {project.githubUrl && (
                          <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <button className="kortex-button text-xs px-3 py-1">
                              <Github className="w-3 h-3 mr-1" />
                              Code
                            </button>
                          </Link>
                        )}
                      </div>
                      <Link href={`/solutions/${project.slug}`}>
                        <button className="kortex-button-primary text-xs px-3 py-1">
                          Details
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="kortex-feature-card p-8 max-w-md mx-auto">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    No Projects Yet
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Projects will appear here once they are added through the admin panel.
                  </p>
                  <Link href="/contact">
                    <button className="kortex-button-primary">
                      Get In Touch
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Enterprise Experience */}
        <section className="kortex-section-alt">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="kortex-section-title text-white mb-4">
                Enterprise Experience
              </h2>
              <p className="kortex-subtitle max-w-2xl mx-auto">
                Mission-critical software for the superyacht industry and corporate clients
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {enterpriseWork.map((work, index) => (
                <div key={index} className="kortex-feature-card p-8">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {work.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {work.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {work.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs bg-[#2a2a2a] text-gray-400 px-2 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/30">
                    <p className="text-sm font-medium text-purple-300 mb-1">Business Impact</p>
                    <p className="text-sm text-gray-300">{work.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Expertise */}
        <section className="kortex-section bg-grid-pattern">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="kortex-section-title text-white mb-4">
                Technical Expertise
              </h2>
              <p className="kortex-subtitle max-w-2xl mx-auto">
                Comprehensive skills across the full technology stack
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {expertise.map((area, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 kortex-glow">
                    <area.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {area.title}
                  </h3>
                  <div className="space-y-2">
                    {area.technologies.map((tech, idx) => (
                      <div key={idx} className="text-sm text-gray-300">
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="kortex-section-alt bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-purple-600/20">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="kortex-section-title text-white mb-6">
              Ready to Build{' '}
              <span className="kortex-text-gradient">Something Amazing?</span>
            </h2>
            <p className="kortex-subtitle mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can bring your vision to life with conscious technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="kortex-button-primary text-lg px-8 py-4">
                <Link href="/contact" className="flex items-center justify-center">
                  Start Your Project
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </button>
              <button className="kortex-button text-lg px-8 py-4">
                <Link href="/solutions" className="flex items-center justify-center">
                  Explore Solutions
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}