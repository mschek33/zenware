import { NextRequest, NextResponse } from 'next/server'
import { auth } from '../../../../../auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/admin/services - Get all services
export async function GET(_request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(services)
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/admin/services - Create new service
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      name,
      slug,
      description,
      features,
      category,
      price,
      featured
    } = body

    // Check if slug already exists
    const existingService = await prisma.service.findUnique({
      where: { slug }
    })

    if (existingService) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    }

    const service = await prisma.service.create({
      data: {
        name,
        slug,
        description,
        features,
        category,
        price,
        featured
      }
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}