import { NextRequest, NextResponse } from 'next/server'
import { auth } from '../../../../../../auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/admin/blog-posts/[id] - Get single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const blogPost = await prisma.blogPost.findUnique({
      where: { id }
    })

    if (!blogPost) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }

    return NextResponse.json(blogPost)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/admin/blog-posts/[id] - Update blog post
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
    const {
      title,
      slug,
      excerpt,
      content,
      image,
      published,
      category,
      tags
    } = body

    // Get current blog post to check if publishing status changed
    const currentPost = await prisma.blogPost.findUnique({
      where: { id }
    })

    if (!currentPost) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }

    // Check if slug already exists for other posts
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug }
    })

    if (existingPost && existingPost.id !== id) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    }

    // Set publishedAt if post is being published for the first time
    let publishedAt = currentPost.publishedAt
    if (published && !currentPost.published) {
      publishedAt = new Date()
    } else if (!published && currentPost.published) {
      publishedAt = null
    }

    const blogPost = await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt,
        content,
        image,
        published,
        category,
        tags,
        publishedAt
      }
    })

    return NextResponse.json(blogPost)
  } catch (error) {
    console.error('Error updating blog post:', error)
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/admin/blog-posts/[id] - Delete blog post
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
    await prisma.blogPost.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Blog post deleted successfully' })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}