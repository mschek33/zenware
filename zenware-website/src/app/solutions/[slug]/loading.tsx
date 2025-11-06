import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function Loading() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Section Skeleton */}
        <section className="kortex-hero-short">
          <div className="container mx-auto max-w-4xl relative z-10">
            <div className="text-center mb-8 animate-pulse">
              <div className="flex items-center justify-center mb-4">
                <div className="h-6 bg-purple-600/30 rounded px-3 mr-4"></div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-600 rounded-full mr-2"></div>
                  <div className="h-4 bg-gray-600 rounded w-20"></div>
                </div>
              </div>
              <div className="h-16 bg-gray-700 rounded-lg mb-4 mx-auto max-w-2xl"></div>
              <div className="h-6 bg-purple-600/30 rounded mb-6 mx-auto max-w-md"></div>
              <div className="h-4 bg-gray-600 rounded mb-8 mx-auto max-w-3xl"></div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="h-12 bg-purple-600/30 rounded mx-auto max-w-xs w-32"></div>
                <div className="h-12 bg-gray-600 rounded mx-auto max-w-xs w-32"></div>
                <div className="h-12 bg-gray-600 rounded mx-auto max-w-xs w-32"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section Skeleton */}
        <section className="kortex-section">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-pulse">
              <div className="lg:col-span-2">
                <div className="h-8 bg-gray-600 rounded mb-6 max-w-sm"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-600 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-600 rounded w-2/3"></div>
                </div>
              </div>
              <div className="kortex-feature-card">
                <div className="h-6 bg-gray-600 rounded mb-6"></div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-5 h-5 bg-purple-600/30 rounded mr-3"></div>
                      <div>
                        <div className="h-3 bg-gray-600 rounded mb-1 w-16"></div>
                        <div className="h-4 bg-gray-600 rounded w-24"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section Skeleton */}
        <section className="kortex-section-alt">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 animate-pulse">
              <div className="h-10 bg-gray-600 rounded mb-4 mx-auto max-w-sm"></div>
              <div className="h-4 bg-gray-600 rounded mx-auto max-w-lg"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="kortex-card animate-pulse">
                  <div className="w-12 h-12 bg-purple-600/30 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-600 rounded mb-2"></div>
                  <div className="h-3 bg-gray-600 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack Skeleton */}
        <section className="kortex-section">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 animate-pulse">
              <div className="h-10 bg-gray-600 rounded mb-4 mx-auto max-w-sm"></div>
              <div className="h-4 bg-gray-600 rounded mx-auto max-w-lg"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center animate-pulse">
                  <div className="w-16 h-16 bg-purple-600/30 rounded-xl mx-auto mb-4"></div>
                  <div className="h-6 bg-gray-600 rounded mb-4 mx-auto max-w-24"></div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-6 bg-gray-600 rounded px-3 w-16"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Skeleton */}
        <section className="kortex-section-alt">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 animate-pulse">
              <div className="h-10 bg-gray-600 rounded mb-4 mx-auto max-w-sm"></div>
              <div className="h-4 bg-gray-600 rounded mx-auto max-w-lg"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="kortex-card text-center animate-pulse">
                  <div className="w-16 h-16 bg-purple-600/30 rounded-xl mx-auto mb-6"></div>
                  <div className="h-6 bg-gray-600 rounded mb-4 mx-auto max-w-32"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-600 rounded"></div>
                    <div className="h-3 bg-gray-600 rounded w-3/4 mx-auto"></div>
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