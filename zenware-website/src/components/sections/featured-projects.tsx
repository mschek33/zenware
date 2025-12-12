'use client';

import Link from 'next/link';
import { ArrowRight, Code, Globe, Smartphone, Database } from 'lucide-react';
import { projects } from '@/data/projects';
import { FadeIn, StaggerContainer, ScaleIn } from '@/components/animations/fade-in';

export default function FeaturedProjects() {
  const featuredProjects = projects.filter(project => project.featured).slice(0, 3);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Web Development':
        return Globe;
      case 'Mobile App':
        return Smartphone;
      case 'Enterprise System':
        return Database;
      default:
        return Code;
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <FadeIn>
            <h2 className="mb-6 text-3xl font-light tracking-tight text-zinc-900 md:text-5xl dark:text-white">
              The Zenware <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Ecosystem</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="max-w-2xl mx-auto text-lg font-light text-zinc-600 dark:text-zinc-400">
              Showcasing our latest innovations in conscious technology and digital transformation.
            </p>
          </FadeIn>
        </div>

        <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => {
            const Icon = getCategoryIcon(project.category);
            return (
              <ScaleIn key={project.id} className="group relative flex flex-col overflow-hidden bg-white border rounded-3xl border-black/5 shadow-sm transition-all duration-300 hover:shadow-xl dark:bg-zinc-900 dark:border-white/5 dark:hover:bg-white/5">
                <div className="relative h-48 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-300 dark:text-zinc-600">
                    <Icon className="w-12 h-12" strokeWidth={1} />
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-medium text-zinc-600 bg-white/90 backdrop-blur-sm rounded-full border border-black/5 dark:bg-black/50 dark:text-zinc-300 dark:border-white/10">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-8">
                  <h3 className="mb-2 text-xl font-medium text-zinc-900 group-hover:text-purple-600 transition-colors dark:text-white dark:group-hover:text-purple-400">
                    {project.name}
                  </h3>
                  <p className="flex-1 mb-6 text-sm font-light leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-black/5 dark:border-white/5">
                    <div className="flex items-center space-x-2">
                      {project.demoUrl && (
                        <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <button className="text-xs px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200 transition-colors font-medium dark:bg-white/10 dark:text-white dark:hover:bg-white/20">
                            Demo
                          </button>
                        </Link>
                      )}
                    </div>
                    <Link href={`/solutions/${project.slug}`}>
                      <button className="text-xs flex items-center text-zinc-900 font-medium hover:text-zinc-600 transition-colors dark:text-white dark:hover:text-zinc-300">
                        Learn More
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </button>
                    </Link>
                  </div>
                </div>
              </ScaleIn>
            );
          })}
        </StaggerContainer>

        <div className="text-center mt-16">
          <Link href="/portfolio">
            <button className="inline-flex items-center justify-center px-8 py-4 bg-zinc-900 text-white rounded-full font-medium text-lg transition-all duration-300 hover:bg-black hover:scale-105 shadow-sm dark:bg-white dark:text-black dark:hover:bg-zinc-200">
              View All Projects
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}