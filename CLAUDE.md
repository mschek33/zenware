# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a Next.js-based business website for Zenware, a conscious technology company. The main application is located in the `zenware-website/` directory.

**Key directories:**
- `zenware-website/src/app/` - Next.js App Router pages
- `zenware-website/src/components/` - React components organized by type (forms, layout, sections, ui)
- `zenware-website/src/data/` - Static data (blog posts, projects)
- `zenware-website/src/lib/` - Utility functions
- `zenware-website/src/types/` - TypeScript type definitions
- `zenware-website/prisma/` - Database schema and migrations
- `zenware-website/public/` - Static assets

## Common Commands

Run these commands from the `zenware-website/` directory:

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture Overview

**Frontend Stack:**
- Next.js 15 with App Router
- React 19 with TypeScript
- Tailwind CSS for styling
- Radix UI for accessible components
- Lucide React for icons

**Backend/Data:**
- Prisma ORM with SQL Server database
- Form handling with React Hook Form + Zod validation
- Static data stored in TypeScript files

**Key Features:**
- Responsive design with mobile-first approach
- Component-based architecture using shadcn/ui patterns
- Database models for users, contacts, newsletters, projects, blog posts, and services
- SEO-optimized with proper metadata

## Development Notes

**Styling:**
- Uses Tailwind CSS with custom CSS variables for theming
- Components follow shadcn/ui patterns
- Implements Kortex-inspired dark theme with purple-to-pink gradients
- Custom classes like `kortex-nav` and `kortex-button-primary` are part of a comprehensive design system
- Detailed style guide available in `zenware-website/STYLE_GUIDE.md` with:
  - Complete color palette (dark backgrounds, purple/pink accents)
  - Typography hierarchy (hero titles, section titles, body text)
  - Component styles (cards, buttons, forms, badges)
  - Layout patterns (hero sections, standard sections)
  - Animations and effects (float, fadeIn, pulse-glow)
  - Responsive design patterns
  - Brand consistency guidelines

**Navigation:**
- Fixed header with responsive mobile menu
- Main navigation: Home, About, Solutions, AI Automation, Portfolio, Blog, Contact
- Dynamic routing for solutions with slug-based pages

**Database Schema:**
- User management with contact form submissions
- Newsletter subscription system
- Project showcase with categories (regenerative, consciousness, sovereign, ai)
- Blog system with publishing workflow
- Service offerings with feature lists

**Content Management:**
- Project data configured in `src/data/projects.ts`
- Blog posts in `src/data/blog-posts.ts`
- Database-driven content for dynamic features

## Business Context

Zenware is positioned as a conscious technology company that bridges enterprise excellence with spiritual principles. The website showcases:
- AI automation services for businesses
- Regenerative technology solutions
- Portfolio of conscious technology projects
- Thought leadership content on conscious technology