import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Link from 'next/link';
import { ArrowRight, Brain, Globe, Shield, Zap, Database, Smartphone, CheckCircle } from 'lucide-react';
import { FadeIn, StaggerContainer, ScaleIn } from '@/components/animations/fade-in';

export default function Solutions() {
  const solutions = [
    {
      icon: Globe,
      title: 'Web Platforms',
      description: 'Scalable, high-performance web applications built on modern architectures.',
      benefits: ['Next.js & React', 'Global Content Delivery', 'SEO Optimized', 'Real-time Analytics'],
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
    },
    {
      icon: Smartphone,
      title: 'Mobile Applications',
      description: 'Native-feel mobile experiences that connect you with users anywhere.',
      benefits: ['iOS & Android', 'Offline Capabilities', 'Push Notifications', 'Cross-platform'],
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
    },
    {
      icon: Brain,
      title: 'AI Integration',
      description: 'Intelligent systems that automate workflows and unlock new insights.',
      benefits: ['Machine Learning', 'Process Automation', 'Predictive Analysis', 'Natural Language'],
      color: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security protocols to protect your most valuable assets.',
      benefits: ['Zero Trust Arch.', 'Data Encryption', 'Compliance Ready', '24/7 Monitoring'],
      color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
    },
    {
      icon: Database,
      title: 'Cloud Infrastructure',
      description: 'Resilient cloud architecture designed for theoretically infinite scale.',
      benefits: ['AWS & Azure', 'Auto-scaling', 'Disaster Recovery', 'Microservices'],
      color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300',
    },
    {
      icon: Zap,
      title: 'Rapid Prototyping',
      description: 'Quickly validate ideas with functional MVPs and iterative development.',
      benefits: ['Agile Process', 'User Testing', 'Fast Iteration', 'Market Ready'],
      color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300',
    },
  ];

  const approach = [
    {
      step: '01',
      title: 'Discovery',
      description: 'We dive deep into your vision, needs, and constraints to map the path forward.',
    },
    {
      step: '02',
      title: 'Architecture',
      description: 'Designing resilient, scalable systems that can grow with your conscious impact.',
    },
    {
      step: '03',
      title: 'Development',
      description: 'Iterative, transparent coding process with regular feedback and alignment.',
    },
    {
      step: '04',
      title: 'Evolution',
      description: 'Post-launch support and continuous improvement to ensure long-term success.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-32">
        {/* Hero Section */}
        <section className="relative pb-24 overflow-hidden">
          {/* Ambient Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-green-100/40 rounded-full blur-3xl animate-float dark:bg-green-900/10" />
            <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl animate-float-delayed dark:bg-blue-900/10" />
          </div>

          <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
            <FadeIn>
              <h1 className="text-5xl md:text-7xl font-light tracking-tight text-zinc-900 mb-8 leading-tight dark:text-white">
                Solutions for a{' '}
                <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-white/80 dark:to-white/50">
                  New Earth
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl md:text-2xl text-zinc-600 font-light max-w-3xl mx-auto mb-12 leading-relaxed text-balance dark:text-zinc-400">
                Holistic technology services designed to elevate your business and amplify your positive impact on the world.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <Link href="/contact">
                <button className="px-8 py-4 bg-zinc-900 text-white rounded-full font-medium text-lg transition-all duration-300 hover:bg-black hover:scale-105 shadow-lg shadow-zinc-900/10 inline-flex items-center dark:bg-white dark:text-black dark:hover:bg-zinc-200 dark:shadow-white/5">
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* Specialized Solutions Grid */}
        <section className="py-24 bg-zinc-50 dark:bg-black/20">
          <div className="container mx-auto max-w-6xl px-4">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 mb-6 dark:text-white">Our Expertise</h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-light dark:text-zinc-400">Comprehensive capabilities to bring your vision to life.</p>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution, index) => (
                <ScaleIn key={index} className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm group hover:shadow-lg transition-all duration-300 dark:bg-zinc-900 dark:border-white/5 dark:hover:bg-white/5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${solution.color}`}>
                    <solution.icon className="w-7 h-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-medium text-zinc-900 mb-3 dark:text-white">{solution.title}</h3>
                  <p className="text-zinc-600 mb-6 font-light leading-relaxed dark:text-zinc-400">{solution.description}</p>
                  <ul className="space-y-2">
                    {solution.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center text-sm text-zinc-500 font-medium dark:text-zinc-400">
                        <CheckCircle className="w-4 h-4 mr-2 text-zinc-300 dark:text-zinc-600" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </ScaleIn>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Featured Case Study */}
        <section className="py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <FadeIn>
              <div className="bg-zinc-900 rounded-3xl overflow-hidden relative border border-zinc-800 shadow-xl dark:bg-white dark:border-zinc-200">
                <div className="absolute inset-0 opacity-20 dark:opacity-10">
                  <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
                  <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/30 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
                </div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 p-12 lg:p-20 items-center">
                  <div>
                    <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white text-sm font-medium mb-6 border border-white/10 dark:bg-black/5 dark:text-black dark:border-black/5">Featured Project</span>
                    <h2 className="text-3xl md:text-5xl font-light text-white mb-6 leading-tight dark:text-zinc-900">
                      Revolutionizing Maritime Safety
                    </h2>
                    <p className="text-zinc-400 text-lg mb-8 font-light leading-relaxed dark:text-zinc-600">
                      We developed a comprehensive safety management system for one of the world&apos;s largest superyacht fleets, implementing IoT sensors and real-time analytics to ensure crew safety and operational efficiency.
                    </p>
                    <div className="flex flex-wrap gap-4 mb-8">
                      <span className="px-3 py-1 bg-black/30 rounded-lg text-sm text-zinc-300 border border-white/10 dark:bg-white/50 dark:text-zinc-600 dark:border-black/5">IoT Integration</span>
                      <span className="px-3 py-1 bg-black/30 rounded-lg text-sm text-zinc-300 border border-white/10 dark:bg-white/50 dark:text-zinc-600 dark:border-black/5">Real-time Data</span>
                      <span className="px-3 py-1 bg-black/30 rounded-lg text-sm text-zinc-300 border border-white/10 dark:bg-white/50 dark:text-zinc-600 dark:border-black/5">Mobile App</span>
                    </div>
                    <Link href="/portfolio/maritime-safety">
                      <button className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition-colors inline-flex items-center dark:bg-black dark:text-white dark:hover:bg-zinc-800">
                        View Case Study
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                  <div className="relative aspect-square lg:aspect-auto lg:h-full min-h-[300px] rounded-2xl overflow-hidden bg-zinc-800/50 border border-white/10 dark:bg-black/5 dark:border-black/5">
                    {/* Placeholder for project image */}
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-600 dark:text-zinc-400">
                      <Globe className="w-24 h-24 opacity-20" />
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Approach Section */}
        <section className="py-24 bg-zinc-50 dark:bg-black/20">
          <div className="container mx-auto max-w-6xl px-4">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 mb-6 dark:text-white">Our Approach</h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-light dark:text-zinc-400">Conscious development from concept to launch.</p>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {approach.map((step, index) => (
                <FadeIn key={index} className="relative p-6 bg-white rounded-3xl border border-black/5 dark:bg-zinc-900 dark:border-white/5">
                  <div className="text-5xl font-light text-zinc-100 mb-4 absolute top-4 right-4 dark:text-white/5">{step.step}</div>
                  <div className="relative z-10">
                    <div className="w-3 h-3 bg-zinc-900 rounded-full mb-6 dark:bg-white" />
                    <h3 className="text-xl font-medium text-zinc-900 mb-3 dark:text-white">{step.title}</h3>
                    <p className="text-sm text-zinc-600 leading-relaxed font-light dark:text-zinc-400">{step.description}</p>
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
                Ready to <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-white/80 dark:to-white/50">Build?</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl text-zinc-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed dark:text-zinc-400">
                Let's discuss how we can bring your vision to life with our comprehensive technology solutions.
              </p>
            </FadeIn>
            <FadeIn delay={0.4} className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <button className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white rounded-full font-medium text-lg transition-all duration-300 hover:bg-black hover:scale-105 shadow-sm inline-flex items-center justify-center dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                  Book a Discovery Call
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