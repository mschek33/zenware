import { NextRequest, NextResponse } from 'next/server'
import { auth } from '../../../../../../auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// PUT /api/admin/newsletters/[id] - Update newsletter subscription
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { subscribed } = body

    const newsletter = await prisma.newsletter.update({
      where: { id },
      data: { subscribed }
    })

    return NextResponse.json(newsletter)
  } catch (error) {
    console.error('Error updating newsletter:', error)
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json({ error: 'Newsletter not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/admin/newsletters/[id] - Delete newsletter subscriber
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    await prisma.newsletter.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Newsletter subscriber deleted successfully' })
  } catch (error) {
    console.error('Error deleting newsletter subscriber:', error)
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json({ error: 'Newsletter subscriber not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}