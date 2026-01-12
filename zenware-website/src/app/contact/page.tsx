'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, Clock, MessageCircle, Calendar } from 'lucide-react';
import { FadeIn, ScaleIn } from '@/components/animations/fade-in';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    budgetRange: '',
    timeline: '',
    message: '',
  });

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');

    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      projectType: '',
      budgetRange: '',
      timeline: '',
      message: '',
    });

    setIsSubmitting(false);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', newsletterEmail);
    alert('Thank you for subscribing to our newsletter!');
    setNewsletterEmail('');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      description: 'Send us an email anytime',
      contact: 'info@zenware.io',
      href: 'mailto:info@zenware.io',
    },
    {
      icon: Phone,
      title: 'Phone',
      description: 'Call us for urgent matters',
      contact: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: 'Location',
      description: 'Remote-first, global reach',
      contact: 'Worldwide',
      href: '#',
    },
    {
      icon: Clock,
      title: 'Response Time',
      description: 'We respond within',
      contact: '24 hours',
      href: '#',
    },
  ];


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 md:pt-40">
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
                Let&apos;s Create Something{' '}
                <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-white/80 dark:to-white/50">
                  Extraordinary
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl md:text-2xl text-zinc-600 font-light max-w-3xl mx-auto mb-12 leading-relaxed text-balance dark:text-zinc-400">
                Ready to transform your vision into reality? We&apos;re here to help you build technology that serves consciousness and creates positive impact.
              </p>
            </FadeIn>

            <FadeIn delay={0.4} className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-zinc-200 shadow-sm dark:bg-white/10 dark:border-white/10">
                <MessageCircle className="w-5 h-5 text-zinc-900 mr-2 dark:text-white" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Free Consultation</span>
              </div>
              <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-zinc-200 shadow-sm dark:bg-white/10 dark:border-white/10">
                <Calendar className="w-5 h-5 text-zinc-900 mr-2 dark:text-white" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">24hr Response</span>
              </div>
              <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-zinc-200 shadow-sm dark:bg-white/10 dark:border-white/10">
                <Clock className="w-5 h-5 text-zinc-900 mr-2 dark:text-white" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">Global Availability</span>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="py-24 bg-zinc-50 dark:bg-black/20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
              {/* Form */}
              <FadeIn delay={0.2}>
                <div className="bg-white rounded-3xl p-8 md:p-12 border border-black/5 shadow-sm dark:bg-zinc-900 dark:border-white/5">
                  <h2 className="text-2xl md:text-3xl font-light text-zinc-900 mb-6 dark:text-white">
                    Start Your Project
                  </h2>
                  <p className="text-zinc-600 mb-8 font-light dark:text-zinc-400">
                    Tell us about your vision and we&apos;ll help you bring it to life with conscious technology.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-zinc-900 dark:text-zinc-200">Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Your full name"
                          className="bg-zinc-50 border-zinc-200 focus:ring-zinc-900 dark:bg-black/20 dark:border-white/10 dark:text-white dark:focus:ring-white/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-zinc-900 dark:text-zinc-200">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your@email.com"
                          className="bg-zinc-50 border-zinc-200 focus:ring-zinc-900 dark:bg-black/20 dark:border-white/10 dark:text-white dark:focus:ring-white/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-zinc-900 dark:text-zinc-200">Company</Label>
                        <Input
                          id="company"
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          placeholder="Your company name"
                          className="bg-zinc-50 border-zinc-200 focus:ring-zinc-900 dark:bg-black/20 dark:border-white/10 dark:text-white dark:focus:ring-white/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-zinc-900 dark:text-zinc-200">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          className="bg-zinc-50 border-zinc-200 focus:ring-zinc-900 dark:bg-black/20 dark:border-white/10 dark:text-white dark:focus:ring-white/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectType" className="text-zinc-900 dark:text-zinc-200">Project Type</Label>
                      <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                        <SelectTrigger className="bg-zinc-50 border-zinc-200 dark:bg-black/20 dark:border-white/10 dark:text-white">
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-zinc-900 dark:border-white/10">
                          <SelectItem value="ai-automation">AI Automation</SelectItem>
                          <SelectItem value="web-development">Web Development</SelectItem>
                          <SelectItem value="mobile-app">Mobile App</SelectItem>
                          <SelectItem value="enterprise-software">Enterprise Software</SelectItem>
                          <SelectItem value="blockchain">Blockchain/Web3</SelectItem>
                          <SelectItem value="consultation">Consultation</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="budgetRange" className="text-zinc-900 dark:text-zinc-200">Budget Range</Label>
                        <Select value={formData.budgetRange} onValueChange={(value) => handleInputChange('budgetRange', value)}>
                          <SelectTrigger className="bg-zinc-50 border-zinc-200 dark:bg-black/20 dark:border-white/10 dark:text-white">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-zinc-900 dark:border-white/10">
                            <SelectItem value="under-10k">Under $10,000</SelectItem>
                            <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                            <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                            <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                            <SelectItem value="100k-plus">$100,000+</SelectItem>
                            <SelectItem value="discuss">Let&apos;s discuss</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeline" className="text-zinc-900 dark:text-zinc-200">Timeline</Label>
                        <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                          <SelectTrigger className="bg-zinc-50 border-zinc-200 dark:bg-black/20 dark:border-white/10 dark:text-white">
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-zinc-900 dark:border-white/10">
                            <SelectItem value="asap">ASAP</SelectItem>
                            <SelectItem value="1-3-months">1-3 months</SelectItem>
                            <SelectItem value="3-6-months">3-6 months</SelectItem>
                            <SelectItem value="6-12-months">6-12 months</SelectItem>
                            <SelectItem value="12-plus-months">12+ months</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-zinc-900 dark:text-zinc-200">Message *</Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us about your project, goals, and how we can help..."
                        rows={6}
                        className="bg-zinc-50 border-zinc-200 focus:ring-zinc-900 dark:bg-black/20 dark:border-white/10 dark:text-white dark:focus:ring-white/20"
                      />
                    </div>

                    <button type="submit" className="w-full px-8 py-4 bg-zinc-900 text-white rounded-full font-medium text-lg transition-all duration-300 hover:bg-black hover:scale-[1.02] shadow-sm disabled:opacity-50 disabled:hover:scale-100 dark:bg-white dark:text-black dark:hover:bg-zinc-200" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>
              </FadeIn>

              {/* Contact Information */}
              <div className="space-y-12">
                <FadeIn delay={0.4}>
                  <h2 className="text-3xl font-light text-zinc-900 mb-6 dark:text-white">
                    Get In Touch
                  </h2>
                  <p className="text-zinc-600 mb-8 font-light dark:text-zinc-400">
                    Multiple ways to reach us. Choose what works best for you.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                    {contactMethods.map((method, index) => (
                      <ScaleIn key={index} delay={index * 0.1} className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm hover:shadow-md transition-shadow dark:bg-zinc-900 dark:border-white/5 dark:hover:bg-white/5">
                        <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center mb-4 dark:bg-white/10">
                          <method.icon className="w-6 h-6 text-zinc-900 dark:text-white" strokeWidth={1.5} />
                        </div>
                        <h3 className="font-medium text-zinc-900 mb-1 dark:text-white">{method.title}</h3>
                        <p className="text-sm text-zinc-500 mb-2 dark:text-zinc-500">{method.description}</p>
                        <a
                          href={method.href}
                          className="text-zinc-900 hover:text-zinc-600 font-medium transition-colors dark:text-white dark:hover:text-zinc-300"
                        >
                          {method.contact}
                        </a>
                      </ScaleIn>
                    ))}
                  </div>

                </FadeIn>

                {/* Newsletter Signup */}
                <FadeIn delay={0.6} className="bg-zinc-900 rounded-3xl p-8 md:p-12 text-center dark:bg-white">
                  <h3 className="text-2xl font-light text-white mb-4 dark:text-black">
                    Stay Connected
                  </h3>
                  <p className="text-zinc-400 mb-8 dark:text-zinc-600">
                    Get insights on conscious technology and new earth systems
                  </p>
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <Input
                      type="email"
                      placeholder="Your email address"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      required
                      className="bg-white/10 border-white/10 text-white placeholder-zinc-500 focus:ring-white/20 dark:bg-black/5 dark:border-black/5 dark:text-black dark:placeholder-zinc-500 dark:focus:ring-black/20"
                    />
                    <button type="submit" className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-colors dark:bg-black dark:text-white dark:hover:bg-zinc-800">
                      Subscribe
                    </button>
                  </form>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}