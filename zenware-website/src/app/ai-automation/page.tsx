import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Cog, Brain, TrendingUp, CheckCircle, Clock, Users } from 'lucide-react';

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
      color: 'from-blue-500 to-cyan-500',
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
      color: 'from-purple-500 to-indigo-500',
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
      color: 'from-green-500 to-emerald-500',
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
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="kortex-hero-short bg-noise">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="kortex-hero-title text-white mb-6">
              Intelligent Automation for{' '}
              <span className="kortex-text-gradient">
                Conscious Business
              </span>
            </h1>
            <p className="kortex-subtitle mb-8 max-w-3xl mx-auto">
              Transform your operations with AI that aligns with your values and serves your mission
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="kortex-button-primary text-lg px-8 py-4">
                <Link href="/contact" className="flex items-center justify-center">
                  Get Started Today
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </button>
              <button className="kortex-button text-lg px-8 py-4">
                <Link href="#services" className="flex items-center justify-center">
                  Explore Services
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="kortex-section bg-grid-pattern">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="kortex-section-title text-white mb-4">
                AI Automation Services
              </h2>
              <p className="kortex-subtitle max-w-2xl mx-auto">
                Comprehensive solutions to automate and optimize your business processes
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="kortex-feature-card p-8 group">
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-6 kortex-glow`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="kortex-section-alt">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="kortex-section-title text-white mb-4">
                Our Implementation Process
              </h2>
              <p className="kortex-subtitle max-w-2xl mx-auto">
                A proven methodology that ensures successful AI integration
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {process.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 kortex-glow">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#111111] rounded-full border-2 border-purple-500 flex items-center justify-center">
                      <span className="text-xs font-bold text-purple-300">{step.number}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="kortex-section bg-grid-pattern">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="kortex-section-title text-white mb-4">
                Success Stories
              </h2>
              <p className="kortex-subtitle max-w-2xl mx-auto">
                Real results from our AI automation implementations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <div key={index} className="kortex-feature-card p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="kortex-badge-primary">{study.industry}</span>
                    <Clock className="w-5 h-5 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {study.title}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {study.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white text-sm">Results:</h4>
                    {study.results.map((result, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{result}</span>
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
              Ready to Automate{' '}
              <span className="kortex-text-gradient">Your Business?</span>
            </h2>
            <p className="kortex-subtitle mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how AI automation can transform your operations while staying true to your values
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="kortex-button-primary text-lg px-8 py-4">
                <Link href="/contact" className="flex items-center justify-center">
                  Schedule Consultation
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </button>
              <button className="kortex-button text-lg px-8 py-4">
                <Link href="/portfolio" className="flex items-center justify-center">
                  View Case Studies
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="kortex-card p-4">
                <h3 className="font-semibold text-white mb-1">Free Discovery Call</h3>
                <p className="text-gray-300 text-sm">30-minute consultation</p>
              </div>
              <div className="kortex-card p-4">
                <h3 className="font-semibold text-white mb-1">Custom Solutions</h3>
                <p className="text-gray-300 text-sm">Tailored to your needs</p>
              </div>
              <div className="kortex-card p-4">
                <h3 className="font-semibold text-white mb-1">Ongoing Support</h3>
                <p className="text-gray-300 text-sm">Continuous optimization</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}