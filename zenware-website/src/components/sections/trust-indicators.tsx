import { Award, Shield, Users } from 'lucide-react';

export default function TrustIndicators() {
  const indicators = [
    {
      icon: Shield,
      title: 'Mission-Critical Software',
      description: 'Running on the world\'s largest superyachts',
      highlight: 'Superyacht Industry',
    },
    {
      icon: Award,
      title: 'Microsoft Certified',
      description: 'Solutions Developer with proven expertise',
      highlight: 'Enterprise Grade',
    },
    {
      icon: Users,
      title: 'Enterprise Clients',
      description: 'Across multiple industries worldwide',
      highlight: 'Global Reach',
    },
  ];

  return (
    <section className="kortex-section-alt">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="kortex-section-title text-white mb-6">
            Trusted by{' '}
            <span className="kortex-text-gradient">Industry Leaders</span>
          </h2>
          <p className="kortex-subtitle max-w-2xl mx-auto">
            Enterprise-grade solutions with a track record of success in mission-critical environments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {indicators.map((indicator, index) => (
            <div key={index} className="kortex-feature-card text-center group">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300 kortex-glow">
                  <indicator.icon className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="mb-6">
                <div className="text-2xl font-bold text-white mb-2">
                  {indicator.highlight}
                </div>
                <div className="text-sm text-purple-300 font-medium">
                  {indicator.title}
                </div>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                &quot;{indicator.description}&quot;
              </p>
            </div>
          ))}
        </div>

        {/* Additional Trust Elements */}
        <div className="mt-16 text-center">
          <div className="kortex-card p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">500M+</div>
                <div className="text-purple-300 font-medium">Assets Protected</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">15+</div>
                <div className="text-purple-300 font-medium">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">24/7</div>
                <div className="text-purple-300 font-medium">System Reliability</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}