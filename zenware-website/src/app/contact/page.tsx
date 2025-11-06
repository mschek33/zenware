'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, Clock, MessageCircle, Calendar } from 'lucide-react';

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

  const specializedEmails = [
    {
      title: 'AI Automation',
      email: 'automation@zenware.io',
      description: 'For AI automation and process optimization projects',
    },
    {
      title: 'Partnerships',
      email: 'partners@zenware.io',
      description: 'For collaboration and partnership opportunities',
    },
    {
      title: 'Media',
      email: 'media@zenware.io',
      description: 'For press inquiries and media requests',
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="kortex-hero-short">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <h1 className="kortex-hero-title mb-6">
              Let's Create Something{' '}
              <span className="kortex-text-gradient">
                Extraordinary
              </span>
            </h1>
            <p className="kortex-subtitle mb-8 max-w-3xl mx-auto">
              Ready to transform your vision into reality? We're here to help you build technology that serves consciousness and creates positive impact.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center bg-[#1a1a1a]/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-[#2a2a2a]">
                <MessageCircle className="w-5 h-5 text-[#8b5cf6] mr-2" />
                <span className="text-sm font-medium text-[#e5e5e5]">Free Consultation</span>
              </div>
              <div className="flex items-center bg-[#1a1a1a]/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-[#2a2a2a]">
                <Calendar className="w-5 h-5 text-[#8b5cf6] mr-2" />
                <span className="text-sm font-medium text-[#e5e5e5]">24hr Response</span>
              </div>
              <div className="flex items-center bg-[#1a1a1a]/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-[#2a2a2a]">
                <Clock className="w-5 h-5 text-[#8b5cf6] mr-2" />
                <span className="text-sm font-medium text-[#e5e5e5]">Global Availability</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="kortex-section">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <h2 className="kortex-subsection-title text-[#ffffff] mb-6">
                  Start Your Project
                </h2>
                <p className="kortex-body mb-8">
                  Tell us about your vision and we'll help you bring it to life with conscious technology.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="projectType">Project Type</Label>
                    <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="budgetRange">Budget Range</Label>
                      <Select value={formData.budgetRange} onValueChange={(value) => handleInputChange('budgetRange', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-10k">Under $10,000</SelectItem>
                          <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                          <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                          <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                          <SelectItem value="100k-plus">$100,000+</SelectItem>
                          <SelectItem value="discuss">Let's discuss</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timeline">Timeline</Label>
                      <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
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

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us about your project, goals, and how we can help..."
                      rows={6}
                    />
                  </div>

                  <button type="submit" className="kortex-button-primary w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="kortex-subsection-title text-[#ffffff] mb-6">
                  Get In Touch
                </h2>
                <p className="kortex-body mb-8">
                  Multiple ways to reach us. Choose what works best for you.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {contactMethods.map((method, index) => (
                    <div key={index} className="kortex-card text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] rounded-lg flex items-center justify-center mx-auto mb-4">
                        <method.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-[#ffffff] mb-2">{method.title}</h3>
                      <p className="text-sm text-[#a3a3a3] mb-2">{method.description}</p>
                      <a
                        href={method.href}
                        className="text-[#8b5cf6] hover:text-[#a855f7] font-medium transition-colors"
                      >
                        {method.contact}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="kortex-feature-card mb-8">
                  <h3 className="text-lg font-semibold text-[#ffffff] mb-4">
                    Specialized Contact
                  </h3>
                  <div className="space-y-4">
                    {specializedEmails.map((contact, index) => (
                      <div key={index} className="bg-[#111111] rounded-lg p-4 border border-[#2a2a2a]">
                        <h4 className="font-medium text-[#ffffff] mb-1">{contact.title}</h4>
                        <p className="text-sm text-[#a3a3a3] mb-2">{contact.description}</p>
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-[#8b5cf6] hover:text-[#a855f7] text-sm font-medium transition-colors"
                        >
                          {contact.email}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="kortex-feature-card">
                  <h3 className="text-lg font-semibold text-[#ffffff] mb-4">
                    Stay Connected
                  </h3>
                  <p className="text-[#a3a3a3] mb-4">
                    Get insights on conscious technology and new earth systems
                  </p>
                  <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Your email address"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      required
                      className="kortex-input"
                    />
                    <button type="submit" className="kortex-button-primary w-full">
                      Subscribe to Newsletter
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}