import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { blogPosts } from '@/data/blog-posts';
import { FadeIn, StaggerContainer, ScaleIn } from '@/components/animations/fade-in';

export default function Blog() {
  const featuredPost = blogPosts.find(post => post.published) || blogPosts[0];
  const otherPosts = blogPosts.filter(post => post.id !== featuredPost.id && post.published);

  const categories = [
    'All',
    'Conscious Technology',
    'AI Integration',
    'Regenerative Innovation',
    'Personal Transformation',
    'New Earth Systems',
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-32">
        {/* Hero Section */}
        <section className="relative pb-24 overflow-hidden">
          {/* Ambient Background Effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-3xl animate-float dark:bg-purple-900/10" />
            <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-3xl animate-float-delayed dark:bg-orange-900/10" />
          </div>

          <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
            <FadeIn>
              <h1 className="text-5xl md:text-7xl font-light tracking-tight text-zinc-900 mb-8 leading-tight dark:text-white">
                Insights on{' '}
                <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-white/80 dark:to-white/50">
                  Conscious Technology
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl md:text-2xl text-zinc-600 font-light max-w-3xl mx-auto mb-12 leading-relaxed text-balance dark:text-zinc-400">
                Exploring the intersection of technology, consciousness, and planetary healing
              </p>
            </FadeIn>
            <FadeIn delay={0.4} className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-white border border-black/5 rounded-full text-sm font-medium text-zinc-600 shadow-sm dark:bg-white/10 dark:text-zinc-300 dark:border-white/10">AI & Consciousness</span>
              <span className="px-4 py-2 bg-white border border-black/5 rounded-full text-sm font-medium text-zinc-600 shadow-sm dark:bg-white/10 dark:text-zinc-300 dark:border-white/10">Regenerative Systems</span>
              <span className="px-4 py-2 bg-white border border-black/5 rounded-full text-sm font-medium text-zinc-600 shadow-sm dark:bg-white/10 dark:text-zinc-300 dark:border-white/10">New Earth Vision</span>
              <span className="px-4 py-2 bg-white border border-black/5 rounded-full text-sm font-medium text-zinc-600 shadow-sm dark:bg-white/10 dark:text-zinc-300 dark:border-white/10">Personal Transformation</span>
            </FadeIn>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-24 bg-zinc-50 dark:bg-black/20">
          <div className="container mx-auto max-w-6xl px-4">
            <FadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 mb-4 dark:text-white">
                Featured Article
              </h2>
              <p className="text-lg text-zinc-600 font-light dark:text-zinc-400">
                Our latest insights on conscious technology
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white rounded-3xl border border-black/5 overflow-hidden shadow-sm dark:bg-zinc-900 dark:border-white/5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center mb-6 space-x-4">
                      <span className="px-3 py-1 bg-zinc-100 text-zinc-600 text-xs font-medium rounded-full uppercase tracking-wider dark:bg-white/10 dark:text-zinc-300">
                        {featuredPost.category.replace('-', ' ')}
                      </span>
                      <span className="text-zinc-400 text-sm font-light dark:text-zinc-500">
                        {formatDate(featuredPost.publishedAt || featuredPost.createdAt)}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-light text-zinc-900 mb-6 leading-tight dark:text-white">
                      {featuredPost.title}
                    </h3>
                    <p className="text-lg text-zinc-600 mb-8 leading-relaxed font-light dark:text-zinc-400">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center text-sm text-zinc-500 font-light dark:text-zinc-400">
                        <Clock className="w-4 h-4 mr-2" />
                        {getReadingTime(featuredPost.content)}
                      </div>
                      <Link href={`/blog/${featuredPost.slug}`}>
                        <button className="px-6 py-3 bg-zinc-900 text-white rounded-full font-medium text-sm transition-all duration-300 hover:bg-black hover:scale-105 inline-flex items-center dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                          Read Article
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="h-64 lg:h-auto bg-zinc-100 relative overflow-hidden dark:bg-zinc-800">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-orange-100/50 flex items-center justify-center dark:from-purple-900/20 dark:to-orange-900/20">
                      <span className="text-zinc-400 font-light dark:text-zinc-500">Featured Article Image</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-12 border-b border-zinc-100 dark:border-zinc-800">
          <div className="container mx-auto max-w-6xl px-4">
            <FadeIn>
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${category === 'All'
                      ? 'bg-zinc-900 text-white shadow-sm hover:bg-black dark:bg-white dark:text-black dark:hover:bg-zinc-200'
                      : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 dark:bg-white/5 dark:text-zinc-300 dark:border-white/10 dark:hover:bg-white/10'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-zinc-900 mb-6 dark:text-white">
                Latest Articles
              </h2>
              <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-light dark:text-zinc-400">
                Explore our thoughts on conscious technology and new earth systems
              </p>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post) => (
                <ScaleIn key={post.id} className="group flex flex-col h-full bg-white rounded-3xl border border-black/5 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 dark:bg-zinc-900 dark:border-white/5 dark:hover:bg-white/5">
                  <div className="h-48 bg-zinc-100 relative overflow-hidden dark:bg-zinc-800">
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center transition-transform duration-500 group-hover:scale-105 dark:from-zinc-800 dark:to-zinc-700">
                      <span className="text-zinc-400 font-light text-sm dark:text-zinc-500">Article Image</span>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider dark:text-zinc-400">
                        {post.category.replace('-', ' ')}
                      </span>
                      <span className="text-zinc-400 text-xs font-light dark:text-zinc-500">
                        {formatDate(post.publishedAt || post.createdAt)}
                      </span>
                    </div>
                    <h3 className="text-xl font-medium text-zinc-900 mb-3 group-hover:text-zinc-600 transition-colors leading-snug dark:text-white dark:group-hover:text-zinc-300">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-zinc-600 mb-6 line-clamp-3 text-sm leading-relaxed font-light flex-1 dark:text-zinc-400">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-zinc-50 dark:border-white/5">
                      <div className="flex items-center text-xs text-zinc-400 font-light dark:text-zinc-500">
                        <Clock className="w-3 h-3 mr-1.5" />
                        {getReadingTime(post.content)}
                      </div>
                      <Link href={`/blog/${post.slug}`} className="text-sm font-medium text-zinc-900 hover:text-zinc-600 transition-colors inline-flex items-center dark:text-white dark:hover:text-zinc-300">
                        Read More
                        <ArrowRight className="ml-1 w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </ScaleIn>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-24 bg-zinc-50 dark:bg-black/20">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-zinc-900 mb-6 dark:text-white">
                Stay Connected
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg text-zinc-600 mb-12 max-w-2xl mx-auto font-light dark:text-zinc-400">
                Get the latest insights on conscious technology and new earth systems delivered to your inbox
              </p>
            </FadeIn>
            <FadeIn delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:border-zinc-900 transition-all dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-zinc-500 dark:focus:border-white dark:focus:ring-white/20"
              />
              <button className="px-8 py-4 bg-zinc-900 text-white rounded-full font-medium hover:bg-black transition-all shadow-sm dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                Subscribe
              </button>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}