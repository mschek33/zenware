import { notFound } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Github, Calendar, Users, Code, Zap } from 'lucide-react';
import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import { FadeIn, StaggerContainer, ScaleIn } from '@/components/animations/fade-in';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Helper to get project by slug from static data
function getProject(slug: string) {
  return projects.find(p => p.slug === slug) || null;
}

// Helper to get related projects from static data
function getRelatedProjects(category: string, currentSlug: string) {
  return projects
    .filter(p => p.category === category && p.slug !== currentSlug)
    .sort((a, b) => (Number(b.featured) - Number(a.featured)))
    .slice(0, 3);
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  // Fetch project from static data
  const { slug } = await params
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  // Fetch related projects
  const relatedProjects = getRelatedProjects(project.category, project.slug);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'regenerative':
        return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800';
      case 'consciousness':
        return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800';
      case 'sovereign':
        return 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800';
      case 'ai':
        return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800';
      default:
        return 'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700';
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
        return 'bg-zinc-400';
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
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 md:pt-40">
        {/* Hero Section */}
        <section className="relative pb-24 overflow-hidden">
          {/* Ambient Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl animate-float opacity-40 dark:opacity-10 ${project.category === 'regenerative' ? 'bg-green-100 dark:bg-green-900' :
              project.category === 'consciousness' ? 'bg-blue-100 dark:bg-blue-900' :
                project.category === 'sovereign' ? 'bg-purple-100 dark:bg-purple-900' :
                  'bg-orange-100 dark:bg-orange-900'
              }`} />
          </div>

          <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
            <FadeIn>
              <div className="flex items-center justify-center mb-8">
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium border capitalize ${getCategoryColor(project.category)}`}>
                  {project.category}
                </span>
                <div className="flex items-center ml-4">
                  <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(project.status)} mr-2`}></div>
                  <span className="text-sm text-zinc-500 capitalize font-medium dark:text-zinc-400">{project.status}</span>
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-light tracking-tight text-zinc-900 mb-6 leading-tight dark:text-white">
                {project.name}
              </h1>
              {project.tagline && (
                <p className="text-xl md:text-2xl text-purple-600 mb-8 font-light dark:text-purple-400">
                  {project.tagline}
                </p>
              )}
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg text-zinc-600 max-w-3xl mx-auto mb-12 leading-relaxed font-light dark:text-zinc-400">
                {project.description}
              </p>
            </FadeIn>

            <FadeIn delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center">
              {project.demoUrl && (
                <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <button className="px-8 py-4 bg-zinc-900 text-white rounded-full font-medium transition-all duration-300 hover:bg-black hover:scale-105 shadow-sm inline-flex items-center justify-center dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Demo
                  </button>
                </Link>
              )}
              {project.githubUrl && (
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <button className="px-8 py-4 bg-white border border-zinc-200 text-zinc-900 rounded-full font-medium transition-all duration-300 hover:bg-zinc-50 hover:border-zinc-300 inline-flex items-center justify-center dark:bg-transparent dark:border-white/20 dark:text-white dark:hover:bg-white/5">
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </button>
                </Link>
              )}
              <Link href="/contact">
                <button className={`px-8 py-4 rounded-full font-medium transition-all duration-300 inline-flex items-center justify-center ${!project.demoUrl && !project.githubUrl
                  ? 'bg-zinc-900 text-white hover:bg-black hover:scale-105 shadow-sm dark:bg-white dark:text-black dark:hover:bg-zinc-200'
                  : 'bg-white border border-zinc-200 text-zinc-900 hover:bg-zinc-50 hover:border-zinc-300 dark:bg-transparent dark:border-white/20 dark:text-white dark:hover:bg-white/5'
                  }`}>
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-24 bg-zinc-50 dark:bg-black/20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <FadeIn>
                  <h2 className="text-3xl font-light text-zinc-900 mb-8 dark:text-white">
                    Project Overview
                  </h2>
                  <div className="prose prose-lg prose-zinc max-w-none dark:prose-invert">
                    <p className="text-zinc-600 font-light leading-relaxed dark:text-zinc-400">
                      {project.longDescription || project.description}
                    </p>
                    <p className="text-zinc-600 font-light leading-relaxed mt-6 dark:text-zinc-400">
                      This project represents a significant step forward in conscious technology,
                      combining cutting-edge technical capabilities with deep consideration for
                      human values and planetary wellbeing.
                    </p>
                    <p className="text-zinc-600 font-light leading-relaxed mt-6 dark:text-zinc-400">
                      Built with enterprise-grade reliability and designed for long-term sustainability,
                      this solution addresses real-world challenges while maintaining alignment with
                      conscious business practices.
                    </p>
                  </div>
                </FadeIn>
              </div>

              <FadeIn delay={0.2} className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm h-fit dark:bg-zinc-900 dark:border-white/5">
                <h3 className="text-xl font-medium text-zinc-900 mb-6 dark:text-white">
                  Project Details
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center mr-4 dark:bg-white/5">
                      <Calendar className="w-5 h-5 text-zinc-900 dark:text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium dark:text-zinc-500">Created</p>
                      <p className="font-medium text-zinc-900 dark:text-zinc-200">{new Date(project.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center mr-4 dark:bg-white/5">
                      <Code className="w-5 h-5 text-zinc-900 dark:text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium dark:text-zinc-500">Status</p>
                      <p className="font-medium capitalize text-zinc-900 dark:text-zinc-200">{project.status}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center mr-4 dark:bg-white/5">
                      <Users className="w-5 h-5 text-zinc-900 dark:text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium dark:text-zinc-500">Category</p>
                      <p className="font-medium capitalize text-zinc-900 dark:text-zinc-200">{project.category}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 mb-6 dark:text-white">
                Key Features
              </h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-light dark:text-zinc-400">
                Comprehensive capabilities designed for modern conscious businesses
              </p>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <ScaleIn key={index} className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-all duration-300 dark:bg-zinc-900 dark:border-white/5 dark:hover:bg-white/5">
                  <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center mb-4 dark:bg-white/10">
                    <Zap className="w-6 h-6 text-zinc-900 dark:text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-medium text-zinc-900 mb-2 dark:text-white">{feature}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Advanced capabilities that drive results
                  </p>
                </ScaleIn>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="py-24 bg-zinc-50 dark:bg-black/20">
          <div className="container mx-auto max-w-6xl px-4">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 mb-6 dark:text-white">
                Technology Stack
              </h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-light dark:text-zinc-400">
                Built with modern, reliable technologies for optimal performance
              </p>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FadeIn className="text-center bg-white p-8 rounded-3xl border border-black/5 shadow-sm dark:bg-zinc-900 dark:border-white/5">
                <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-6 dark:bg-white/10">
                  <Code className="w-8 h-8 text-zinc-900 dark:text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-zinc-900 mb-6 dark:text-white">Frontend</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {project.techStack.length > 0 ? project.techStack.slice(0, Math.ceil(project.techStack.length / 3)).map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-zinc-50 text-zinc-600 text-sm rounded-full border border-black/5 dark:bg-white/5 dark:text-zinc-300 dark:border-white/10">{tech}</span>
                  )) : (
                    <span className="px-3 py-1 bg-zinc-50 text-zinc-600 text-sm rounded-full border border-black/5 dark:bg-white/5 dark:text-zinc-300 dark:border-white/10">Next.js</span>
                  )}
                </div>
              </FadeIn>
              <FadeIn delay={0.1} className="text-center bg-white p-8 rounded-3xl border border-black/5 shadow-sm dark:bg-zinc-900 dark:border-white/5">
                <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-6 dark:bg-white/10">
                  <Zap className="w-8 h-8 text-zinc-900 dark:text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-zinc-900 mb-6 dark:text-white">Backend</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {project.techStack.length > 0 ? project.techStack.slice(Math.ceil(project.techStack.length / 3), Math.ceil(project.techStack.length * 2 / 3)).map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-zinc-50 text-zinc-600 text-sm rounded-full border border-black/5 dark:bg-white/5 dark:text-zinc-300 dark:border-white/10">{tech}</span>
                  )) : (
                    <span className="px-3 py-1 bg-zinc-50 text-zinc-600 text-sm rounded-full border border-black/5 dark:bg-white/5 dark:text-zinc-300 dark:border-white/10">Node.js</span>
                  )}
                </div>
              </FadeIn>
              <FadeIn delay={0.2} className="text-center bg-white p-8 rounded-3xl border border-black/5 shadow-sm dark:bg-zinc-900 dark:border-white/5">
                <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-6 dark:bg-white/10">
                  <Users className="w-8 h-8 text-zinc-900 dark:text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-zinc-900 mb-6 dark:text-white">Integration</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {project.techStack.length > 0 ? project.techStack.slice(Math.ceil(project.techStack.length * 2 / 3)).map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-zinc-50 text-zinc-600 text-sm rounded-full border border-black/5 dark:bg-white/5 dark:text-zinc-300 dark:border-white/10">{tech}</span>
                  )) : (
                    <>
                      <span className="px-3 py-1 bg-zinc-50 text-zinc-600 text-sm rounded-full border border-black/5 dark:bg-white/5 dark:text-zinc-300 dark:border-white/10">APIs</span>
                      <span className="px-3 py-1 bg-zinc-50 text-zinc-600 text-sm rounded-full border border-black/5 dark:bg-white/5 dark:text-zinc-300 dark:border-white/10">Webhooks</span>
                    </>
                  )}
                </div>
              </FadeIn>
            </StaggerContainer>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 mb-6 dark:text-white">
                Use Cases
              </h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-light dark:text-zinc-400">
                Perfect for various scenarios and business needs
              </p>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <ScaleIn key={index} className="text-center bg-white p-8 rounded-3xl border border-black/5 shadow-sm hover:shadow-lg transition-all duration-300 dark:bg-zinc-900 dark:border-white/5 dark:hover:bg-white/5">
                  <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mx-auto mb-6 dark:bg-white/5">
                    <useCase.icon className="w-8 h-8 text-zinc-900 dark:text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-medium text-zinc-900 mb-4 dark:text-white">
                    {useCase.title}
                  </h3>
                  <p className="text-zinc-600 font-light dark:text-zinc-400">
                    {useCase.description}
                  </p>
                </ScaleIn>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-24 bg-zinc-50 dark:bg-black/20">
            <div className="container mx-auto max-w-6xl px-4">
              <FadeIn className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 mb-6 dark:text-white">
                  Related Projects
                </h2>
                <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-light dark:text-zinc-400">
                  Explore other solutions in the {project.category} category
                </p>
              </FadeIn>

              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProjects.map((relatedProject) => (
                  <ScaleIn key={relatedProject.id} className="bg-white rounded-3xl border border-black/5 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 dark:bg-zinc-900 dark:border-white/5 dark:hover:bg-white/5">
                    <div className="p-8">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(relatedProject.category)}`}>
                        {relatedProject.category}
                      </span>
                      <h3 className="text-xl font-medium text-zinc-900 mt-4 mb-3 dark:text-white">
                        {relatedProject.name}
                      </h3>
                      <p className="text-zinc-600 mb-6 text-sm leading-relaxed font-light line-clamp-3 dark:text-zinc-400">
                        {relatedProject.description}
                      </p>
                      <Link href={`/solutions/${relatedProject.slug}`}>
                        <button className="text-sm font-medium text-zinc-900 hover:text-zinc-600 transition-colors inline-flex items-center dark:text-white dark:hover:text-zinc-300">
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                      </Link>
                    </div>
                  </ScaleIn>
                ))}
              </StaggerContainer>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto max-w-4xl text-center px-4">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-900 mb-6 dark:text-white">
                Ready to Get Started?
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl text-zinc-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed dark:text-zinc-400">
                Let&apos;s discuss how {project.name} can transform your business and create positive impact
              </p>
            </FadeIn>
            <FadeIn delay={0.4} className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <button className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white rounded-full font-medium text-lg transition-all duration-300 hover:bg-black hover:scale-105 shadow-sm inline-flex items-center justify-center dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                  Start Your Project
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </Link>
              <Link href="/solutions">
                <button className="w-full sm:w-auto px-8 py-4 bg-white border border-zinc-200 text-zinc-900 rounded-full font-medium text-lg transition-all duration-300 hover:bg-zinc-50 hover:border-zinc-300 inline-flex items-center justify-center dark:bg-transparent dark:border-white/20 dark:text-white dark:hover:bg-white/5">
                  Explore All Solutions
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)

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