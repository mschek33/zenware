import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Seed sample projects
  const projects = [
    {
      name: 'Zenware Core',
      slug: 'zenware-core',
      tagline: 'AI-powered consciousness platform',
      description: 'A comprehensive platform for conscious AI development that bridges ancient wisdom with cutting-edge technology.',
      longDescription: 'Zenware Core represents the future of conscious technology development. Built on principles of spiritual awareness and ethical AI, this platform provides tools and frameworks for developers who want to create technology that serves humanity\'s highest good.',
      status: 'development' as const,
      category: 'ai' as const,
      tags: ['AI', 'Consciousness', 'Platform', 'Ethics'],
      techStack: ['Next.js', 'TypeScript', 'Prisma', 'OpenAI'],
      featured: true,
      demoUrl: 'https://core.zenware.ai',
      githubUrl: 'https://github.com/zenware/core'
    },
    {
      name: 'Regenerative Grid',
      slug: 'regenerative-grid',
      tagline: 'Sustainable energy management system',
      description: 'Smart grid system for renewable energy optimization and conscious resource management.',
      longDescription: 'The Regenerative Grid is a revolutionary approach to energy management that combines IoT sensors, AI prediction, and conscious design principles to create truly sustainable energy systems.',
      status: 'beta' as const,
      category: 'regenerative' as const,
      tags: ['Energy', 'Sustainability', 'IoT', 'Smart Grid'],
      techStack: ['React', 'Node.js', 'IoT', 'TensorFlow'],
      featured: true,
      demoUrl: 'https://grid.zenware.ai'
    },
    {
      name: 'Conscious Commerce',
      slug: 'conscious-commerce',
      tagline: 'Ethical marketplace platform',
      description: 'E-commerce platform designed for conscious businesses and sustainable products.',
      longDescription: 'Conscious Commerce reimagines online shopping with sustainability, ethics, and community at its core. Every transaction supports regenerative practices.',
      status: 'live' as const,
      category: 'consciousness' as const,
      tags: ['E-commerce', 'Sustainability', 'Ethics', 'Community'],
      techStack: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
      featured: false,
      demoUrl: 'https://commerce.zenware.ai'
    },
    {
      name: 'Sovereign Identity',
      slug: 'sovereign-identity',
      tagline: 'Decentralized identity management',
      description: 'Blockchain-based identity system that gives users complete control over their digital identity.',
      longDescription: 'Sovereign Identity leverages blockchain technology to create a truly decentralized identity system where users maintain complete ownership and control.',
      status: 'development' as const,
      category: 'sovereign' as const,
      tags: ['Blockchain', 'Identity', 'Privacy', 'Decentralization'],
      techStack: ['Ethereum', 'IPFS', 'React', 'Web3'],
      featured: false,
      githubUrl: 'https://github.com/zenware/sovereign-identity'
    }
  ]

  for (const project of projects) {
    const created = await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project
    })
    console.log(`Created/updated project: ${created.name}`)
  }

  // Seed sample services
  const services = [
    {
      name: 'AI Workflow Automation',
      slug: 'ai-workflow-automation',
      description: 'Intelligent automation solutions that adapt to your business processes with conscious AI principles.',
      features: ['Process Mining', 'Smart Workflows', 'Predictive Analytics', '24/7 Monitoring', 'Ethical AI Guidelines'],
      category: 'automation' as const,
      price: '$2,999/month',
      featured: true
    },
    {
      name: 'Conscious AI Advisory',
      slug: 'conscious-ai-advisory',
      description: 'Strategic AI consulting with ethical and consciousness-driven approaches for responsible technology adoption.',
      features: ['AI Strategy', 'Ethics Review', 'Implementation Planning', 'Training & Support', 'Consciousness Integration'],
      category: 'intelligence' as const,
      price: 'Custom',
      featured: false
    },
    {
      name: 'Regenerative Systems Design',
      slug: 'regenerative-systems-design',
      description: 'Design and build technology systems that regenerate rather than extract, creating positive impact.',
      features: ['Systems Thinking', 'Regenerative Design', 'Sustainability Metrics', 'Impact Measurement', 'Stakeholder Alignment'],
      category: 'business-intelligence' as const,
      price: 'Custom',
      featured: true
    }
  ]

  for (const service of services) {
    const created = await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service
    })
    console.log(`Created/updated service: ${created.name}`)
  }

  // Seed sample blog posts
  const blogPosts = [
    {
      title: 'The Future of Conscious AI',
      slug: 'future-of-conscious-ai',
      excerpt: 'Exploring how artificial intelligence can be developed with consciousness and ethics at its core.',
      content: `# The Future of Conscious AI

Artificial Intelligence is at a crossroads. We can choose to develop AI that serves humanity's highest good, or we can continue down a path of extraction and exploitation.

## What is Conscious AI?

Conscious AI represents a fundamental shift in how we approach artificial intelligence development. It's not just about making machines smarter - it's about imbuing them with awareness, ethics, and a deep respect for life.

## Key Principles

1. **Ethical Foundation**: Every AI system should be built on a foundation of ethics and respect for all life
2. **Transparency**: AI decisions should be explainable and transparent
3. **Regenerative Impact**: AI should create positive impact for all stakeholders
4. **Human Augmentation**: AI should enhance human capabilities, not replace them

## The Path Forward

The future of AI lies not in domination, but in collaboration. By developing conscious AI systems, we can create technology that truly serves humanity's evolution.`,
      published: true,
      category: 'conscious-tech',
      tags: ['AI', 'Consciousness', 'Ethics', 'Future']
    },
    {
      title: 'Building Regenerative Technology Systems',
      slug: 'building-regenerative-tech-systems',
      excerpt: 'How technology can contribute to healing and regeneration of our planet.',
      content: `# Building Regenerative Technology Systems

Traditional technology extracts value and creates waste. Regenerative technology creates value and heals systems.

## Design Principles

- **Life-Centered Design**: Put life at the center of all design decisions
- **Systems Thinking**: Consider the whole system, not just individual components
- **Regenerative Loops**: Create positive feedback loops that strengthen over time

## Implementation Strategies

1. Start with intention and purpose
2. Map stakeholder relationships
3. Design for regeneration from day one
4. Measure impact holistically

The future belongs to technology that gives back more than it takes.`,
      published: true,
      category: 'regenerative',
      tags: ['Regenerative', 'Systems', 'Design', 'Sustainability']
    }
  ]

  for (const post of blogPosts) {
    const created = await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: { ...post, publishedAt: post.published ? new Date() : null },
      create: { ...post, publishedAt: post.published ? new Date() : null }
    })
    console.log(`Created/updated blog post: ${created.title}`)
  }

  console.log('Database seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })