import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Github, Code, Globe, Smartphone, Database } from 'lucide-react';
import { projects } from '@/data/projects';
import type { Metadata } from 'next';
import { FadeIn, StaggerContainer, ScaleIn } from '@/components/animations/fade-in';

export const metadata: Metadata = {
  title: 'Portfolio - Zenware | Conscious Technology Solutions',
  description: 'Explore our portfolio of conscious technology solutions, from enterprise superyacht systems to regenerative platforms. 15+ years of experience in innovative software development.',
  keywords: 'portfolio, conscious technology, software development, enterprise solutions, superyacht systems, regenerative technology',
};




export default function Portfolio() {
  // Use static data


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
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 md:pt-40">
        {/* Hero Section */}
        <section className="relative pb-24 overflow-hidden">
          {/* Ambient Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-3xl animate-float dark:bg-purple-900/10" />
            <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-pink-100/40 rounded-full blur-3xl animate-float-delayed dark:bg-pink-900/10" />
          </div>

          <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
            <FadeIn>
              <h1 className="text-5xl md:text-7xl font-light tracking-tight text-zinc-900 mb-8 leading-tight dark:text-white">
                Portfolio of{' '}
                <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-white/80 dark:to-white/50">
                  Innovation
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl md:text-2xl text-zinc-600 font-light max-w-3xl mx-auto mb-12 leading-relaxed text-balance dark:text-zinc-400">
                From enterprise superyacht systems to conscious technology platforms - a showcase of transformative solutions
              </p>
            </FadeIn>
            <FadeIn delay={0.4} className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="px-4 py-2 bg-white border border-black/5 rounded-full text-sm font-medium text-zinc-600 shadow-sm dark:bg-white/10 dark:text-zinc-300 dark:border-white/10">15+ Years Experience</span>
              <span className="px-4 py-2 bg-white border border-black/5 rounded-full text-sm font-medium text-zinc-600 shadow-sm dark:bg-white/10 dark:text-zinc-300 dark:border-white/10">100+ Projects</span>
              <span className="px-4 py-2 bg-white border border-black/5 rounded-full text-sm font-medium text-zinc-600 shadow-sm dark:bg-white/10 dark:text-zinc-300 dark:border-white/10">Microsoft Certified</span>
              <span className="px-4 py-2 bg-white border border-black/5 rounded-full text-sm font-medium text-zinc-600 shadow-sm dark:bg-white/10 dark:text-zinc-300 dark:border-white/10">Enterprise Grade</span>
            </FadeIn>
          </div>
        </section>

        {/* Project Gallery */}
        <section className="py-24 bg-zinc-50 dark:bg-black/20">
          <div className="container mx-auto max-w-6xl px-4">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-zinc-900 mb-6 dark:text-white">
                Conscious Technology Projects
              </h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-light dark:text-zinc-400">
                Innovative solutions for the new earth paradigm
              </p>
            </FadeIn>

            {projects.length > 0 ? (
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <ScaleIn key={project.id} className="group bg-white rounded-3xl border border-black/5 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 dark:bg-zinc-900 dark:border-white/5 dark:hover:bg-white/5">
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(project.category)}`}>
                          {project.category}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`}></div>
                          <span className="text-xs text-zinc-400 capitalize font-medium">{project.status}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-medium text-zinc-900 mb-2 group-hover:text-zinc-600 transition-colors dark:text-white dark:group-hover:text-zinc-300">
                        {project.name}
                      </h3>

                      {project.tagline && (
                        <p className="text-sm text-zinc-500 mb-4 font-medium dark:text-zinc-400">
                          {project.tagline}
                        </p>
                      )}

                      <p className="text-zinc-600 mb-6 line-clamp-3 text-sm leading-relaxed font-light dark:text-zinc-400">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.techStack.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="text-xs bg-zinc-50 text-zinc-500 px-2.5 py-1 rounded-full border border-black/5 dark:bg-white/5 dark:text-zinc-400 dark:border-white/5">
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="text-xs bg-zinc-50 text-zinc-500 px-2.5 py-1 rounded-full border border-black/5 dark:bg-white/5 dark:text-zinc-400 dark:border-white/5">
                            +{project.techStack.length - 3} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center space-x-2">
                          {project.demoUrl && (
                            <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                              <button className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors dark:text-zinc-500 dark:hover:text-white">
                                <ExternalLink className="w-4 h-4" />
                              </button>
                            </Link>
                          )}
                          {project.githubUrl && (
                            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <button className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors dark:text-zinc-500 dark:hover:text-white">
                                <Github className="w-4 h-4" />
                              </button>
                            </Link>
                          )}
                        </div>
                        <Link href={`/solutions/${project.slug}`}>
                          <button className="text-sm font-medium text-zinc-900 hover:text-zinc-600 transition-colors inline-flex items-center dark:text-white dark:hover:text-zinc-300">
                            Details
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </ScaleIn>
                ))}
              </StaggerContainer>
            ) : (
              <FadeIn className="text-center py-16">
                <div className="bg-white p-12 rounded-3xl border border-black/5 max-w-md mx-auto shadow-sm dark:bg-zinc-900 dark:border-white/5">
                  <h3 className="text-xl font-medium text-zinc-900 mb-4 dark:text-white">
                    No Projects Yet
                  </h3>
                  <p className="text-zinc-600 mb-8 font-light dark:text-zinc-400">
                    Projects will appear here once they are added through the admin panel.
                  </p>
                  <Link href="/contact">
                    <button className="px-6 py-3 bg-zinc-900 text-white rounded-full font-medium text-sm hover:bg-black transition-colors dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                      Get In Touch
                    </button>
                  </Link>
                </div>
              </FadeIn>
            )}
          </div>
        </section>

        {/* Enterprise Experience */}
        <section className="py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 mb-6 dark:text-white">
                Enterprise Experience
              </h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-light dark:text-zinc-400">
                Mission-critical software for the superyacht industry and corporate clients
              </p>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {enterpriseWork.map((work, index) => (
                <ScaleIn key={index} className="p-8 rounded-3xl bg-white border border-black/5 shadow-sm dark:bg-zinc-900 dark:border-white/5">
                  <h3 className="text-xl font-medium text-zinc-900 mb-4 dark:text-white">
                    {work.title}
                  </h3>
                  <p className="text-zinc-600 mb-6 font-light dark:text-zinc-400">
                    {work.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {work.technologies.map((tech, idx) => (
                      <span key={idx} className="text-xs bg-zinc-50 text-zinc-500 px-2.5 py-1 rounded-full border border-black/5 dark:bg-white/5 dark:text-zinc-400 dark:border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="bg-zinc-50 rounded-2xl p-4 border border-black/5 dark:bg-white/5 dark:border-white/5">
                    <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1 dark:text-zinc-400">Business Impact</p>
                    <p className="text-sm text-zinc-700 font-medium dark:text-zinc-200">{work.impact}</p>
                  </div>
                </ScaleIn>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Technical Expertise */}
        <section className="py-24 bg-zinc-50 dark:bg-black/20">
          <div className="container mx-auto max-w-6xl px-4">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 mb-6 dark:text-white">
                Technical Expertise
              </h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-light dark:text-zinc-400">
                Comprehensive skills across the full technology stack
              </p>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {expertise.map((area, index) => (
                <FadeIn key={index} className="text-center group">
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-black/5 group-hover:scale-110 transition-transform duration-300 dark:bg-zinc-900 dark:border-white/5">
                    <area.icon className="w-8 h-8 text-zinc-900 dark:text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-medium text-zinc-900 mb-4 dark:text-white">
                    {area.title}
                  </h3>
                  <div className="space-y-2">
                    {area.technologies.map((tech, idx) => (
                      <div key={idx} className="text-sm text-zinc-500 font-light dark:text-zinc-400">
                        {tech}
                      </div>
                    ))}
                  </div>
                </FadeIn>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-900 mb-6 dark:text-white">
                Ready to Build{' '}
                <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-white/80 dark:to-white/50">Something Amazing?</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl text-zinc-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed dark:text-zinc-400">
                Let&apos;s discuss how we can bring your vision to life with conscious technology
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
                  Explore Solutions
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