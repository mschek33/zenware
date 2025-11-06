import { notFound } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Github, Calendar, Users, Code, Zap } from 'lucide-react';
import { PrismaClient } from '@prisma/client';
import type { Metadata } from 'next';

// Project interface to match database schema
interface Project {
  id: string
  name: string
  slug: string
  tagline?: string
  description: string
  longDescription?: string
  image?: string
  status: 'development' | 'beta' | 'live'
  category: 'regenerative' | 'consciousness' | 'sovereign' | 'ai'
  tags: string[]
  techStack: string[]
  demoUrl?: string
  githubUrl?: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

// Server-side data fetching using Prisma directly
const prisma = new PrismaClient()

async function getProject(slug: string): Promise<Project | null> {
  try {
    const project = await prisma.project.findUnique({
      where: { slug }
    })
    
    return project
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

async function getRelatedProjects(category: string, currentSlug: string): Promise<Project[]> {
  try {
    const projects = await prisma.project.findMany({
      where: {
        category: category as 'regenerative' | 'consciousness' | 'sovereign' | 'ai',
        slug: {
          not: currentSlug
        }
      },
      take: 3,
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' }
      ]
    })
    
    return projects
  } catch (error) {
    console.error('Error fetching related projects:', error)
    return []
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  // Fetch project from database
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  // Fetch related projects
  const relatedProjects = await getRelatedProjects(project.category, project.slug);

  const getCategoryColor = (category: string) => {
    return 'kortex-badge-primary';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-[#10b981]';
      case 'beta':
        return 'bg-[#f59e0b]';
      case 'development':
        return 'bg-[#8b5cf6]';
      default:
        return 'bg-[#6b7280]';
    }
  };

  const features = [
    'Advanced AI Integration',
    'Real-time Data Processing',
    'Scalable Architecture',
    'Mobile-First Design',
    'Enterprise Security',
    'API Integration',
    'Cloud Infrastructure',
    'Analytics Dashboard',
  ];

  const useCases = [
    {
      title: 'Small Teams',
      description: 'Perfect for startups and small organizations looking to scale their operations',
      icon: Users,
    },
    {
      title: 'Enterprise',
      description: 'Robust solution for large organizations with complex requirements',
      icon: Code,
    },
    {
      title: 'Automation',
      description: 'Ideal for businesses looking to automate repetitive processes',
      icon: Zap,
    },
  ];


  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="kortex-hero-short">
          <div className="container mx-auto max-w-4xl relative z-10">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <span className={getCategoryColor(project.category)}>
                  {project.category}
                </span>
                <div className="flex items-center ml-4">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)} mr-2`}></div>
                  <span className="text-sm text-[#a3a3a3] capitalize">{project.status}</span>
                </div>
              </div>
              <h1 className="kortex-hero-title text-[#ffffff] mb-4">
                {project.name}
              </h1>
              {project.tagline && (
                <p className="text-xl text-[#8b5cf6] mb-6 font-medium">
                  {project.tagline}
                </p>
              )}
              <p className="kortex-subtitle max-w-3xl mx-auto mb-8">
                {project.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {project.demoUrl && (
                  <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="kortex-button-primary">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Demo
                  </Link>
                )}
                {project.githubUrl && (
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="kortex-button">
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </Link>
                )}
                <Link href="/contact" className="kortex-button">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="kortex-section">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="kortex-subsection-title text-[#ffffff] mb-6">
                  Project Overview
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="kortex-body mb-6">
                    {project.longDescription || project.description}
                  </p>
                  <p className="kortex-body mb-6">
                    This project represents a significant step forward in conscious technology, 
                    combining cutting-edge technical capabilities with deep consideration for 
                    human values and planetary wellbeing.
                  </p>
                  <p className="kortex-body">
                    Built with enterprise-grade reliability and designed for long-term sustainability, 
                    this solution addresses real-world challenges while maintaining alignment with 
                    conscious business practices.
                  </p>
                </div>
              </div>
              <div className="kortex-feature-card">
                <h3 className="text-xl font-semibold text-[#ffffff] mb-6">
                  Project Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-[#8b5cf6] mr-3" />
                    <div>
                      <p className="text-sm text-[#a3a3a3]">Created</p>
                      <p className="font-medium text-[#ffffff]">{new Date(project.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Code className="w-5 h-5 text-[#8b5cf6] mr-3" />
                    <div>
                      <p className="text-sm text-[#a3a3a3]">Status</p>
                      <p className="font-medium capitalize text-[#ffffff]">{project.status}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-[#8b5cf6] mr-3" />
                    <div>
                      <p className="text-sm text-[#a3a3a3]">Category</p>
                      <p className="font-medium capitalize text-[#ffffff]">{project.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="kortex-section-alt">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="kortex-section-title text-[#ffffff] mb-4">
                Key Features
              </h2>
              <p className="kortex-body max-w-2xl mx-auto">
                Comprehensive capabilities designed for modern conscious businesses
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="kortex-card">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#ffffff] mb-2">{feature}</h3>
                  <p className="text-sm text-[#a3a3a3]">
                    Advanced capabilities that drive results
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="kortex-section">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="kortex-section-title text-[#ffffff] mb-4">
                Technology Stack
              </h2>
              <p className="kortex-body max-w-2xl mx-auto">
                Built with modern, reliable technologies for optimal performance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#ffffff] mb-4">Frontend</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {project.techStack.slice(0, 3).map((tech, index) => (
                    <span key={index} className="kortex-badge">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#ffffff] mb-4">Backend</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {project.techStack.slice(3, 6).map((tech, index) => (
                    <span key={index} className="kortex-badge">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#ffffff] mb-4">Integration</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="kortex-badge">APIs</span>
                  <span className="kortex-badge">Webhooks</span>
                  <span className="kortex-badge">Analytics</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="kortex-section-alt">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="kortex-section-title text-[#ffffff] mb-4">
                Use Cases
              </h2>
              <p className="kortex-body max-w-2xl mx-auto">
                Perfect for various scenarios and business needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <div key={index} className="kortex-card text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] rounded-xl flex items-center justify-center mx-auto mb-6">
                    <useCase.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#ffffff] mb-4">
                    {useCase.title}
                  </h3>
                  <p className="text-[#a3a3a3]">
                    {useCase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="kortex-section">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <h2 className="kortex-section-title text-[#ffffff] mb-4">
                  Related Projects
                </h2>
                <p className="kortex-body max-w-2xl mx-auto">
                  Explore other solutions in the {project.category} category
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProjects.map((relatedProject) => (
                  <div key={relatedProject.id} className="kortex-card">
                    <span className={getCategoryColor(relatedProject.category)}>
                      {relatedProject.category}
                    </span>
                    <h3 className="text-xl font-semibold text-[#ffffff] mt-4 mb-2">
                      {relatedProject.name}
                    </h3>
                    <p className="text-[#a3a3a3] mb-4">
                      {relatedProject.description}
                    </p>
                    <Link href={`/solutions/${relatedProject.slug}`} className="kortex-button">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="kortex-section-alt">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="kortex-section-title text-[#ffffff] mb-6">
              Ready to Get Started?
            </h2>
            <p className="kortex-subtitle mb-8 max-w-2xl mx-auto">
              Let's discuss how {project.name} can transform your business and create positive impact
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="kortex-button-primary">
                Start Your Project
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link href="/solutions" className="kortex-button">
                Explore All Solutions
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  try {
    const projects = await prisma.project.findMany({
      select: {
        slug: true
      }
    })
    
    return projects.map((project) => ({
      slug: project.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProject(params.slug)
  
  if (!project) {
    return {
      title: 'Project Not Found - Zenware',
      description: 'The requested project could not be found.'
    }
  }
  
  return {
    title: `${project.name} - Zenware | Conscious Technology Solution`,
    description: project.description,
    keywords: `${project.name}, ${project.category}, conscious technology, ${project.tags.join(', ')}`
  }
}