import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/projects - Get all published projects for public portfolio
export async function GET(request: NextRequest) {
  try {
    // Get search params for filtering
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')

    // Build where clause
    const where: any = {}
    
    if (category && category !== 'all') {
      where.category = category
    }
    
    if (featured === 'true') {
      where.featured = true
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: [
        { featured: 'desc' }, // Featured projects first
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}