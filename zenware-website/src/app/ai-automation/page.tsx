import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Link from 'next/link';
import { ArrowRight, Cog, Brain, TrendingUp, CheckCircle, Clock, Users } from 'lucide-react';
import { FadeIn, StaggerContainer, ScaleIn } from '@/components/animations/fade-in';

export default function AIAutomation() {
  const services = [
    {
      icon: Cog,
      title: 'Process Automation',
      description: 'Streamline workflows and eliminate repetitive tasks',
      features: [
        'Custom workflow design',
        'Data integration & synchronization',
        'Smart decision trees',
        'Error handling & recovery',
        'Performance monitoring',
      ],
      color: 'text-blue-600 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/30',
    },
    {
      icon: Brain,
      title: 'Intelligent Quoting',
      description: 'AI-powered pricing and proposal generation',
      features: [
        'Complex pricing logic',
        'Dynamic quote generation',
        'Proposal automation',
        'Client customization',
        'Revenue optimization',
      ],
      color: 'text-purple-600 bg-purple-100 dark:text-purple-300 dark:bg-purple-900/30',
    },
    {
      icon: TrendingUp,
      title: 'Business Intelligence',
      description: 'Data-driven insights and predictive analytics',
      features: [
        'Predictive analytics',
        'Performance dashboards',
        'Trend analysis',
        'Decision support',
        'ROI optimization',
      ],
      color: 'text-green-600 bg-green-100 dark:text-green-300 dark:bg-green-900/30',
    },
  ];

  const process = [
    {
      number: '01',
      title: 'Discovery',
      description: 'Understanding your business and consciousness alignment',
      icon: Users,
    },
    {
      number: '02',
      title: 'Design',
      description: 'Creating AI solutions that serve your mission',
      icon: Brain,
    },
    {
      number: '03',
      title: 'Development',
      description: 'Building with enterprise-grade reliability',
      icon: Cog,
    },
    {
      number: '04',
      title: 'Integration',
      description: 'Seamless deployment and training',
      icon: CheckCircle,
    },
    {
      number: '05',
      title: 'Evolution',
      description: 'Ongoing optimization and expansion',
      icon: TrendingUp,
    },
  ];

  const caseStudies = [
    {
      title: 'Superyacht Management AI',
      description: 'Automated fleet coordination and resource optimization',
      results: ['90% reduction in manual coordination', '50% improvement in resource utilization', '24/7 autonomous operation'],
      industry: 'Maritime',
    },
    {
      title: 'Intelligent Quote Engine',
      description: 'AI-powered pricing for complex service packages',
      results: ['75% faster quote generation', '40% improvement in accuracy', '60% increase in conversion rates'],
      industry: 'Professional Services',
    },
    {
      title: 'Conscious Business Analytics',
      description: 'Holistic performance tracking with impact metrics',
      results: ['Real-time consciousness alignment scores', '35% improvement in decision quality', 'Integrated ESG reporting'],
      industry: 'Conscious Business',
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
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl animate-float dark:bg-blue-900/10" />
            <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-3xl animate-float-delayed dark:bg-purple-900/10" />
          </div>

          <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
            <FadeIn>
              <h1 className="text-5xl md:text-7xl font-light tracking-tight text-zinc-900 mb-8 leading-tight dark:text-white">
                Intelligent Automation for{' '}
                <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-white/80 dark:to-white/50">
                  Conscious Business
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl md:text-2xl text-zinc-600 font-light max-w-3xl mx-auto mb-12 leading-relaxed text-balance dark:text-zinc-400">
                Transform your operations with AI that aligns with your values and serves your mission
              </p>
            </FadeIn>
            <FadeIn delay={0.4} className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <button className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white rounded-full font-medium text-lg transition-all duration-300 hover:bg-black hover:scale-105 shadow-sm inline-flex items-center justify-center dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                  Get Started Today
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </Link>
              <Link href="#services">
                <button className="w-full sm:w-auto px-8 py-4 bg-white border border-zinc-200 text-zinc-900 rounded-full font-medium text-lg transition-all duration-300 hover:bg-zinc-50 hover:border-zinc-300 inline-flex items-center justify-center dark:bg-transparent dark:border-white/20 dark:text-white dark:hover:bg-white/5">
                  Explore Services
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-zinc-50 dark:bg-black/20">
          <div className="container mx-auto max-w-6xl px-4">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-zinc-900 mb-6 dark:text-white">
                AI Automation Services
              </h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-light dark:text-zinc-400">
                Comprehensive solutions to automate and optimize your business processes
              </p>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ScaleIn key={index} className="p-8 rounded-3xl bg-white border border-black/5 hover:border-black/10 transition-all duration-300 hover:shadow-lg dark:bg-zinc-900 dark:border-white/5 dark:hover:border-white/10 dark:hover:bg-white/5">
                  <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-medium text-zinc-900 mb-4 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-zinc-600 mb-8 leading-relaxed font-light dark:text-zinc-400">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-zinc-500 font-light dark:text-zinc-400">
                        <CheckCircle className="w-4 h-4 text-zinc-900 mr-3 flex-shrink-0 dark:text-white" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </ScaleIn>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 mb-6 dark:text-white">
                Our Implementation Process
              </h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-light dark:text-zinc-400">
                A proven methodology that ensures successful AI integration
              </p>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {process.map((step, index) => (
                <FadeIn key={index} className="text-center group">
                  <div className="relative mb-6 inline-block">
                    <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto border border-black/5 group-hover:scale-110 transition-transform duration-300 dark:bg-white/5 dark:border-white/10">
                      <step.icon className="w-8 h-8 text-zinc-900 dark:text-white" strokeWidth={1.5} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-zinc-900 rounded-full border-4 border-white flex items-center justify-center dark:bg-white dark:border-black">
                      <span className="text-xs font-bold text-white dark:text-black">{step.number}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-zinc-900 mb-2 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-zinc-500 text-sm font-light dark:text-zinc-400">
                    {step.description}
                  </p>
                </FadeIn>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-24 bg-zinc-50 dark:bg-black/20">
          <div className="container mx-auto max-w-6xl px-4">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-zinc-900 mb-6 dark:text-white">
                Success Stories
              </h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-light dark:text-zinc-400">
                Real results from our AI automation implementations
              </p>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <ScaleIn key={index} className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm hover:shadow-md transition-all duration-300 dark:bg-zinc-900 dark:border-white/5 dark:hover:bg-white/5">
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 bg-zinc-100 text-zinc-600 text-xs font-medium rounded-full dark:bg-white/10 dark:text-zinc-300">{study.industry}</span>
                    <Clock className="w-5 h-5 text-zinc-400" />
                  </div>
                  <h3 className="text-xl font-medium text-zinc-900 mb-3 dark:text-white">
                    {study.title}
                  </h3>
                  <p className="text-zinc-600 mb-8 leading-relaxed font-light dark:text-zinc-400">
                    {study.description}
                  </p>
                  <div className="space-y-3 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                    <h4 className="font-medium text-zinc-900 text-sm dark:text-white">Results:</h4>
                    {study.results.map((result, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-zinc-900 mr-2 mt-0.5 flex-shrink-0 dark:text-white" />
                        <span className="text-sm text-zinc-600 font-light dark:text-zinc-400">{result}</span>
                      </div>
                    ))}
                  </div>
                </ScaleIn>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-900 mb-6 dark:text-white">
                Ready to Automate{' '}
                <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-white/80 dark:to-white/50">Your Business?</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl text-zinc-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed dark:text-zinc-400">
                Let&apos;s discuss how AI automation can transform your operations while staying true to your values
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Link href="/contact">
                  <button className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white rounded-full font-medium text-lg transition-all duration-300 hover:bg-black hover:scale-105 shadow-sm inline-flex items-center justify-center dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                    Schedule Consultation
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </Link>
                <Link href="/portfolio">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white border border-zinc-200 text-zinc-900 rounded-full font-medium text-lg transition-all duration-300 hover:bg-zinc-50 hover:border-zinc-300 inline-flex items-center justify-center dark:bg-transparent dark:border-white/20 dark:text-white dark:hover:bg-white/5">
                    View Case Studies
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-6 bg-zinc-50 rounded-2xl border border-black/5 dark:bg-white/5 dark:border-white/5">
                  <h3 className="font-medium text-zinc-900 mb-1 dark:text-white">Free Discovery Call</h3>
                  <p className="text-zinc-500 text-sm font-light dark:text-zinc-400">30-minute consultation</p>
                </div>
                <div className="p-6 bg-zinc-50 rounded-2xl border border-black/5 dark:bg-white/5 dark:border-white/5">
                  <h3 className="font-medium text-zinc-900 mb-1 dark:text-white">Custom Solutions</h3>
                  <p className="text-zinc-500 text-sm font-light dark:text-zinc-400">Tailored to your needs</p>
                </div>
                <div className="p-6 bg-zinc-50 rounded-2xl border border-black/5 dark:bg-white/5 dark:border-white/5">
                  <h3 className="font-medium text-zinc-900 mb-1 dark:text-white">Ongoing Support</h3>
                  <p className="text-zinc-500 text-sm font-light dark:text-zinc-400">Continuous optimization</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}