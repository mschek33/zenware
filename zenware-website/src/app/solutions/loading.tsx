import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function Loading() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Section Skeleton */}
        <section className="kortex-hero-short bg-noise">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="animate-pulse">
              <div className="h-16 bg-gray-700 rounded-lg mb-6 mx-auto max-w-2xl"></div>
              <div className="h-6 bg-gray-600 rounded mb-8 mx-auto max-w-3xl"></div>
              <div className="h-12 bg-purple-600/30 rounded-lg mx-auto max-w-xs"></div>
            </div>
          </div>
        </section>

        {/* Solution Categories Skeleton */}
        <section className="kortex-section bg-grid-pattern">
          <div className="container mx-auto max-w-6xl">
            <div className="space-y-16">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="kortex-feature-card p-8 md:p-12 animate-pulse">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gray-600 rounded-lg mr-4"></div>
                        <div className="h-8 bg-gray-600 rounded flex-1 max-w-sm"></div>
                      </div>
                      <div className="h-4 bg-gray-600 rounded mb-2"></div>
                      <div className="h-4 bg-gray-600 rounded mb-2 w-3/4"></div>
                      <div className="h-4 bg-gray-600 rounded mb-6 w-1/2"></div>
                      <div className="h-10 bg-purple-600/30 rounded max-w-xs"></div>
                    </div>
                    <div className="kortex-card p-6">
                      <div className="h-6 bg-gray-600 rounded mb-4"></div>
                      <div className="space-y-4">
                        {[1, 2, 3].map((j) => (
                          <div key={j} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg">
                            <div className="flex-1">
                              <div className="h-4 bg-gray-600 rounded mb-2"></div>
                              <div className="h-3 bg-gray-600 rounded w-2/3"></div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="h-6 bg-purple-600/30 rounded px-3"></div>
                              <div className="h-8 w-8 bg-purple-600/30 rounded"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Approach Section Skeleton */}
        <section className="kortex-section-alt">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16 animate-pulse">
              <div className="h-10 bg-gray-600 rounded mb-4 mx-auto max-w-md"></div>
              <div className="h-4 bg-gray-600 rounded mx-auto max-w-lg"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="kortex-feature-card p-8 animate-pulse">
                  <div className="h-6 bg-gray-600 rounded mb-4"></div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="flex items-start">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div className="h-3 bg-gray-600 rounded flex-1"></div>
                      </div>
                    ))}
                  </div>
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