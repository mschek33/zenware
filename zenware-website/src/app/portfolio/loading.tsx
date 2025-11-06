import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function PortfolioLoading() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="kortex-hero-short bg-noise">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="animate-pulse">
              <div className="h-16 bg-gray-700 rounded w-3/4 mx-auto mb-6"></div>
              <div className="h-6 bg-gray-700 rounded w-1/2 mx-auto mb-8"></div>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-8 bg-gray-700 rounded w-24"></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Project Gallery Loading */}
        <section className="kortex-section bg-grid-pattern">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 animate-pulse">
              <div className="h-12 bg-gray-700 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-700 rounded w-1/3 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="kortex-feature-card p-6 animate-pulse">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-6 bg-gray-700 rounded w-20"></div>
                    <div className="h-4 bg-gray-700 rounded w-16"></div>
                  </div>
                  <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
                  <div className="h-20 bg-gray-700 rounded mb-4"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-gray-700 rounded w-16"></div>
                    <div className="h-6 bg-gray-700 rounded w-16"></div>
                    <div className="h-6 bg-gray-700 rounded w-16"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <div className="h-8 bg-gray-700 rounded w-16"></div>
                      <div className="h-8 bg-gray-700 rounded w-16"></div>
                    </div>
                    <div className="h-8 bg-gray-700 rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Loading for other sections */}
        <section className="kortex-section-alt">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 animate-pulse">
              <div className="h-12 bg-gray-700 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-700 rounded w-1/3 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="kortex-feature-card p-8 animate-pulse">
                  <div className="h-6 bg-gray-700 rounded w-1/2 mb-4"></div>
                  <div className="h-20 bg-gray-700 rounded mb-4"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-gray-700 rounded w-16"></div>
                    <div className="h-6 bg-gray-700 rounded w-16"></div>
                  </div>
                  <div className="h-12 bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}