import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Leaf, Brain, Shield, Zap } from 'lucide-react';
import { PrismaClient } from '@prisma/client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solutions - Zenware | Conscious Technology Categories',
  description: 'Explore our comprehensive conscious technology solutions: Regenerative Systems, Consciousness Technology, Sovereign Infrastructure, and AI Integration Services.',
  keywords: 'conscious technology solutions, regenerative systems, consciousness technology, sovereign infrastructure, AI integration',
};

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

// Server-side data fetching using Prisma directly
const prisma = new PrismaClient()

async function getProjectsByCategory(): Promise<Record<string, Project[]>> {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' }
      ]
    })
    
    // Group projects by category
    const projectsByCategory: Record<string, Project[]> = {
      regenerative: [],
      consciousness: [],
      sovereign: [],
      ai: []
    }
    
    projects.forEach(project => {
      if (projectsByCategory[project.category]) {
        projectsByCategory[project.category].push(project)
      }
    })
    
    return projectsByCategory
  } catch (error) {
    console.error('Error fetching projects:', error)
    return { regenerative: [], consciousness: [], sovereign: [], ai: [] }
  }
}

export default async function Solutions() {
  // Fetch projects from database
  const projectsByCategory = await getProjectsByCategory()

  const solutionCategories = [
    {
      id: 'regenerative',
      title: 'Regenerative Systems',
      description: 'Technology that heals rather than extracts, creating sustainable value for all stakeholders',
      icon: Leaf,
      color: 'from-green-500 to-emerald-500',
      projects: projectsByCategory.regenerative,
    },
    {
      id: 'consciousness',
      title: 'Consciousness Technology',
      description: 'Platforms that support human growth, awareness, and authentic connection',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
      projects: projectsByCategory.consciousness,
    },
    {
      id: 'sovereign',
      title: 'Sovereign Infrastructure',
      description: 'Decentralized systems that empower communities and individual autonomy',
      icon: Shield,
      color: 'from-purple-500 to-indigo-500',
      projects: projectsByCategory.sovereign,
    },
    {
      id: 'ai',
      title: 'AI Integration Services',
      description: 'Intelligent automation that aligns with conscious business practices',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      projects: projectsByCategory.ai,
    },
  ];

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

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="kortex-hero-short bg-noise">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="kortex-hero-title text-white mb-6">
              Comprehensive Solutions for the{' '}
              <span className="kortex-text-gradient">
                New Earth
              </span>
            </h1>
            <p className="kortex-subtitle mb-8 max-w-3xl mx-auto">
              From regenerative real estate to conscious AI - technology that serves evolution
            </p>
            <button className="kortex-button-primary text-lg px-8 py-4">
              <Link href="/contact" className="flex items-center justify-center">
                Explore Custom Solutions
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </button>
          </div>
        </section>

        {/* Solution Categories */}
        <section className="kortex-section bg-grid-pattern">
          <div className="container mx-auto max-w-6xl">
            <div className="space-y-16">
              {solutionCategories.map((category) => (
                <div key={category.id} className="kortex-feature-card p-8 md:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
                    <div>
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mr-4`}>
                          <category.icon className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                          {category.title}
                        </h2>
                      </div>
                      <p className="text-lg text-gray-300 mb-6">
                        {category.description}
                      </p>
                      <button className="kortex-button">
                        <Link href={`/solutions/${category.id}`} className="flex items-center">
                          Learn More
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </button>
                    </div>
                    <div className="kortex-card p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Featured Projects
                      </h3>
                      <div className="space-y-4">
                        {category.projects.length > 0 ? (
                          category.projects.slice(0, 3).map((project) => (
                            <div key={project.id} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg">
                              <div>
                                <h4 className="font-medium text-white">{project.name}</h4>
                                <p className="text-sm text-gray-300">{project.tagline}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="kortex-badge-primary">
                                  {project.status}
                                </span>
                                <Link href={`/solutions/${project.slug}`}>
                                  <button className="kortex-button text-xs px-2 py-1">
                                    <ArrowRight className="w-4 h-4" />
                                  </button>
                                </Link>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-400 text-sm mb-3">No projects in this category yet</p>
                            <Link href="/contact">
                              <button className="kortex-button text-xs px-3 py-1">
                                Get In Touch
                                <ArrowRight className="w-3 h-3 ml-1" />
                              </button>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Approach Section */}
        <section className="kortex-section-alt">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="kortex-section-title text-white mb-4">
                Our Approach
              </h2>
              <p className="kortex-subtitle">
                How we integrate ancient wisdom with cutting-edge technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="kortex-feature-card p-8">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Conscious Design Process
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Deep understanding of your mission and values
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Integration of spiritual principles with technical requirements
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Regenerative impact assessment and optimization
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Community-centered development approach
                  </li>
                </ul>
              </div>

              <div className="kortex-feature-card p-8">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Enterprise-Grade Delivery
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Mission-critical reliability and security
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Scalable architecture for future growth
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Comprehensive documentation and training
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Ongoing support and evolution
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="kortex-section bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-purple-600/20">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="kortex-section-title text-white mb-6">
              Ready to Transform{' '}
              <span className="kortex-text-gradient">Your Vision?</span>
            </h2>
            <p className="kortex-subtitle mb-8 max-w-2xl mx-auto">
              Let's explore how we can bring your conscious technology vision to life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="kortex-button-primary text-lg px-8 py-4">
                <Link href="/contact" className="flex items-center justify-center">
                  Start Your Project
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </button>
              <button className="kortex-button text-lg px-8 py-4">
                <Link href="/portfolio" className="flex items-center justify-center">
                  View Portfolio
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