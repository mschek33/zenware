import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { blogPosts } from '@/data/blog-posts';

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'conscious-tech':
        return 'kortex-badge-primary';
      case 'ai-integration':
        return 'kortex-badge-primary';
      case 'regenerative-innovation':
        return 'kortex-badge-primary';
      case 'personal-transformation':
        return 'kortex-badge-primary';
      case 'new-earth-systems':
        return 'kortex-badge-primary';
      default:
        return 'kortex-badge';
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="kortex-hero-short">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <h1 className="kortex-hero-title mb-6">
              Insights on{' '}
              <span className="kortex-text-gradient">
                Conscious Technology
              </span>
            </h1>
            <p className="kortex-subtitle mb-8 max-w-3xl mx-auto">
              Exploring the intersection of technology, consciousness, and planetary healing
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="kortex-badge-primary">AI & Consciousness</span>
              <span className="kortex-badge-primary">Regenerative Systems</span>
              <span className="kortex-badge-primary">New Earth Vision</span>
              <span className="kortex-badge-primary">Personal Transformation</span>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="kortex-section">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="kortex-section-title text-[#ffffff] mb-4">
                Featured Article
              </h2>
              <p className="kortex-body">
                Our latest insights on conscious technology
              </p>
            </div>

            <div className="kortex-feature-card">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    <span className="kortex-badge-primary">
                      {featuredPost.category.replace('-', ' ')}
                    </span>
                    <span className="text-[#a3a3a3] text-sm ml-4">
                      {formatDate(featuredPost.publishedAt || featuredPost.createdAt)}
                    </span>
                  </div>
                  <h3 className="kortex-subsection-title text-[#ffffff] mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="kortex-body mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-[#a3a3a3]">
                      <Clock className="w-4 h-4 mr-1" />
                      {getReadingTime(featuredPost.content)}
                    </div>
                    <Link href={`/blog/${featuredPost.slug}`} className="kortex-button-primary">
                      Read Article
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
                <div className="bg-[#111111] rounded-xl p-8 border border-[#2a2a2a]">
                  <div className="w-full h-48 bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-white">Featured Article Image</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {featuredPost.tags.map((tag, index) => (
                      <span key={index} className="kortex-badge">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="kortex-section-alt">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  className={category === 'All' ? 'kortex-button-primary' : 'kortex-button'}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="kortex-section">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="kortex-section-title text-[#ffffff] mb-4">
                Latest Articles
              </h2>
              <p className="kortex-body">
                Explore our thoughts on conscious technology and new earth systems
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post) => (
                <article key={post.id} className="kortex-card overflow-hidden">
                  <div className="w-full h-48 bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] flex items-center justify-center">
                    <span className="text-white">Article Image</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="kortex-badge-primary">
                        {post.category.replace('-', ' ')}
                      </span>
                      <span className="text-[#a3a3a3] text-sm">
                        {formatDate(post.publishedAt || post.createdAt)}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#ffffff] mb-3 hover:text-[#8b5cf6] transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-[#a3a3a3] mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-[#a3a3a3]">
                        <Clock className="w-4 h-4 mr-1" />
                        {getReadingTime(post.content)}
                      </div>
                      <Link href={`/blog/${post.slug}`} className="kortex-button text-sm">
                        Read More
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="kortex-section-alt">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="kortex-section-title text-[#ffffff] mb-6">
              Stay Connected
            </h2>
            <p className="kortex-subtitle mb-8 max-w-2xl mx-auto">
              Get the latest insights on conscious technology and new earth systems delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="kortex-input flex-1"
              />
              <button className="kortex-button-primary">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}