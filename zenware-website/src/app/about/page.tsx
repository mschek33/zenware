import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Link from 'next/link';
import { ArrowRight, Heart, Brain, Zap, Clock, Users, Globe, Award, Shield, CheckCircle } from 'lucide-react';
import { FadeIn, StaggerContainer, ScaleIn } from '@/components/animations/fade-in';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Conscious Technology',
      description: 'We believe technology should amplify human potential and well-being, not diminish it. Every line of code is written with intention.',
      color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300',
    },
    {
      icon: Brain,
      title: 'Deep Intelligence',
      description: 'Beyond artificial intelligence, we cultivate deep understanding of complex systems to create solutions that solve root causes.',
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
    },
    {
      icon: Zap,
      title: 'Regenerative Innovation',
      description: 'Our solutions are designed to be sustainable, efficient, and regenerative, contributing positively to the digital ecosystem.',
      color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
    },
  ];

  const milestones = [
    {
      year: '2015',
      title: 'The Inception',
      description: 'Started as a specialized consultancy for mission-critical maritime software.',
    },
    {
      year: '2018',
      title: 'Expansion',
      description: 'Expanded into enterprise AI solutions and custom software development.',
    },
    {
      year: '2021',
      title: 'Evolution',
      description: 'Rebranded to Zenware with a focus on conscious technology and regenerative systems.',
    },
    {
      year: '2024',
      title: 'New Earth',
      description: 'Launching our platform for decentralized, sovereign technology infrastructure.',
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
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-3xl animate-float dark:bg-purple-900/10" />
            <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl animate-float-delayed dark:bg-blue-900/10" />
          </div>

          <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
            <FadeIn>
              <h1 className="text-5xl md:text-7xl font-light tracking-tight text-zinc-900 mb-8 leading-tight dark:text-white">
                Our Path to{' '}
                <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-white/80 dark:to-white/50">
                  Consciousness
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl md:text-2xl text-zinc-600 font-light max-w-3xl mx-auto mb-12 leading-relaxed text-balance dark:text-zinc-400">
                We are a collective of engineers, designers, and visionaries building the operating system for a more conscious world.
              </p>
            </FadeIn>
            <FadeIn delay={0.4} className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-zinc-100 rounded-full text-sm font-medium text-zinc-600 dark:bg-my-dark-void/50 dark:text-zinc-300">founded 2015</span>
              <span className="px-4 py-2 bg-zinc-100 rounded-full text-sm font-medium text-zinc-600 dark:bg-my-dark-void/50 dark:text-zinc-300">remote-first</span>
              <span className="px-4 py-2 bg-zinc-100 rounded-full text-sm font-medium text-zinc-600 dark:bg-my-dark-void/50 dark:text-zinc-300">conscious-tech</span>
            </FadeIn>
          </div>
        </section>

        {/* Journey/Timeline Section */}
        <section className="py-24 bg-zinc-50 dark:bg-black/20">
          <div className="container mx-auto max-w-5xl px-4">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 mb-6 dark:text-white">The Journey So Far</h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-light dark:text-zinc-400">From maritime systems to planetary consciousness.</p>
            </FadeIn>

            <div className="relative">
              <div className="absolute left-[15px] top-0 bottom-0 w-px bg-zinc-200 md:left-1/2 md:-ml-px dark:bg-white/10" />

              <StaggerContainer staggerDelay={0.2}>
                {milestones.map((milestone, index) => (
                  <FadeIn key={index} direction={index % 2 === 0 ? 'right' : 'left'} className={`relative flex items-center mb-12 last:mb-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="flex-1 md:w-1/2" />
                    <div className="absolute left-0 w-8 h-8 rounded-full border-4 border-white bg-zinc-900 shadow-sm z-10 md:left-1/2 md:-ml-4 dark:border-my-dark-void dark:bg-white" />
                    <div className={`flex-1 md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <span className="text-sm font-medium text-purple-600 mb-1 block dark:text-purple-400">{milestone.year}</span>
                      <h3 className="text-xl font-medium text-zinc-900 mb-2 dark:text-white">{milestone.title}</h3>
                      <p className="text-zinc-600 font-light dark:text-zinc-400">{milestone.description}</p>
                    </div>
                  </FadeIn>
                ))}
              </StaggerContainer>
            </div>

            <FadeIn className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm mt-16 max-w-3xl mx-auto dark:bg-zinc-900 dark:border-white/5">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center flex-shrink-0 dark:bg-white">
                  <span className="text-white text-2xl font-light dark:text-black">Z</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-zinc-900 mb-2 dark:text-white">The Mission</h3>
                  <p className="text-zinc-600 font-light leading-relaxed dark:text-zinc-400">
                    To build the digital infrastructure for a new earth - systems that are sovereign, regenerative, and designed to support the evolution of human consciousness.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 mb-6 dark:text-white">
                Core Principles
              </h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-light dark:text-zinc-400">
                The foundation upon which we build every solution
              </p>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <ScaleIn key={index} className="p-8 rounded-3xl bg-white border border-black/5 shadow-sm group hover:shadow-lg transition-all duration-300 dark:bg-zinc-900 dark:border-white/5 dark:hover:bg-white/5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${value.color}`}>
                    <value.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-medium text-zinc-900 mb-3 dark:text-white">
                    {value.title}
                  </h3>
                  <p className="text-zinc-600 font-light leading-relaxed dark:text-zinc-400">
                    {value.description}
                  </p>
                </ScaleIn>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-zinc-50 dark:bg-black/20">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-900 mb-6 dark:text-white">
                Join the <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-white/80 dark:to-white/50">Collective</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl text-zinc-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed dark:text-zinc-400">
                Whether you're looking to transform your business or ready to contribute to the new paradigm, we're ready to listen.
              </p>
            </FadeIn>
            <FadeIn delay={0.4} className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <button className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white rounded-full font-medium text-lg transition-all duration-300 hover:bg-black hover:scale-105 shadow-sm inline-flex items-center justify-center dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                  Lets Talk
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </Link>
              <Link href="/solutions">
                <button className="w-full sm:w-auto px-8 py-4 bg-white border border-zinc-200 text-zinc-900 rounded-full font-medium text-lg transition-all duration-300 hover:bg-zinc-50 hover:border-zinc-300 inline-flex items-center justify-center dark:bg-transparent dark:border-white/20 dark:text-white dark:hover:bg-white/5">
                  View Our Work
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