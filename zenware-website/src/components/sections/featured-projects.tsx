import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';

export default function FeaturedProjects() {
  const featuredProjects = projects.filter(project => project.featured).slice(0, 9);

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
    <section className="kortex-section bg-grid-pattern">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="kortex-section-title text-white mb-6">
            The Zenware{' '}
            <span className="kortex-text-gradient">Ecosystem</span>
          </h2>
          <p className="kortex-subtitle max-w-2xl mx-auto">
            Interconnected solutions for the new earth paradigm
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <div key={project.id} className="kortex-feature-card overflow-hidden group">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`${getCategoryColor(project.category)} text-xs px-2 py-1 rounded-full`}>
                    {project.category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      project.status === 'live' ? 'bg-green-500' :
                      project.status === 'beta' ? 'bg-yellow-500' :
                      'bg-purple-400'
                    }`}></div>
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
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="text-xs bg-[#2a2a2a] text-gray-400 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-xs bg-[#2a2a2a] text-gray-400 px-2 py-1 rounded-full">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {project.demoUrl && (
                      <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <button className="kortex-button text-xs px-3 py-1">
                          Demo
                        </button>
                      </Link>
                    )}
                  </div>
                  <Link href={`/solutions/${project.slug}`}>
                    <button className="kortex-button-primary text-xs px-3 py-1">
                      Learn More
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="kortex-button-primary text-lg px-8 py-4">
            <Link href="/portfolio" className="flex items-center justify-center">
              View All Projects
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}