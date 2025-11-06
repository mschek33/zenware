import { Shield, Brain, Network } from 'lucide-react';

export default function ValuePropositions() {
  const propositions = [
    {
      icon: Shield,
      title: 'Enterprise Excellence',
      description: 'Mission-critical reliability from superyacht industry experience',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Brain,
      title: 'Conscious Innovation',
      description: 'Technology designed with spiritual principles and regenerative focus',
      gradient: 'from-pink-500 to-purple-500',
    },
    {
      icon: Network,
      title: 'AI Integration',
      description: 'Pioneering conscious AI implementation for business transformation',
      gradient: 'from-purple-600 to-pink-600',
    },
  ];

  return (
    <section className="kortex-section-alt bg-grid-pattern">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="kortex-section-title text-white mb-6">
            Why Choose{' '}
            <span className="kortex-text-gradient">Zenware?</span>
          </h2>
          <p className="kortex-subtitle max-w-3xl mx-auto">
            Where enterprise excellence meets conscious innovation - technology that serves both business success and planetary healing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {propositions.map((prop, index) => (
            <div key={index} className="kortex-feature-card text-center group">
              <div className="relative mb-8">
                <div className={`w-24 h-24 bg-gradient-to-r ${prop.gradient} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300 kortex-glow`}>
                  <prop.icon className="w-12 h-12 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {prop.title}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}