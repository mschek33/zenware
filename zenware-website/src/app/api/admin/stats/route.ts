import { NextRequest, NextResponse } from 'next/server'
import { auth } from '../../../../../auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/admin/stats - Get dashboard statistics
export async function GET(_request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [
      projectsCount,
      servicesCount,
      blogPostsCount,
      contactsCount,
      newslettersCount,
      usersCount
    ] = await Promise.all([
      prisma.project.count(),
      prisma.service.count(),
      prisma.blogPost.count(),
      prisma.contact.count(),
      prisma.newsletter.count(),
      prisma.user.count()
    ])

    const stats = {
      projects: projectsCount,
      services: servicesCount,
      blogPosts: blogPostsCount,
      contacts: contactsCount,
      newsletters: newslettersCount,
      users: usersCount
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}