import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../../auth';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

interface RouteParams {
  params: Promise<{ id: string }>;
}

const UpdateAffiliateSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  referralCode: z.string()
    .min(3)
    .max(20)
    .regex(/^[A-Z0-9]+$/, 'Code must be uppercase alphanumeric')
    .optional(),
  password: z.string().min(6).optional(),
  company: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
});

// GET /api/admin/affiliates/[id] - Get single affiliate with recent assessments
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const affiliate = await prisma.affiliate.findUnique({
      where: { id },
      select: {
        id: true,
        referralCode: true,
        name: true,
        email: true,
        company: true,
        phone: true,
        isActive: true,
        notes: true,
        totalReferrals: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
        assessments: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          select: {
            id: true,
            tier: true,
            status: true,
            name: true,
            email: true,
            company: true,
            overallScore: true,
            createdAt: true,
          },
        },
      },
    });

    if (!affiliate) {
      return NextResponse.json({ error: 'Affiliate not found' }, { status: 404 });
    }

    return NextResponse.json(affiliate);
  } catch (error) {
    console.error('Error fetching affiliate:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/admin/affiliates/[id] - Update affiliate
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const validated = UpdateAffiliateSchema.parse(body);

    // Check if affiliate exists
    const existing = await prisma.affiliate.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Affiliate not found' }, { status: 404 });
    }

    // Check for email uniqueness if changing email
    if (validated.email && validated.email !== existing.email) {
      const emailExists = await prisma.affiliate.findUnique({
        where: { email: validated.email },
      });
      if (emailExists) {
        return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
      }
    }

    // Check for code uniqueness if changing code
    if (validated.referralCode && validated.referralCode !== existing.referralCode) {
      const codeExists = await prisma.affiliate.findUnique({
        where: { referralCode: validated.referralCode },
      });
      if (codeExists) {
        return NextResponse.json({ error: 'Referral code already exists' }, { status: 400 });
      }
    }

    // Build update data
    const updateData: Prisma.AffiliateUpdateInput = { ...validated };
    if (validated.password) {
      updateData.password = await bcrypt.hash(validated.password, 12);
    }

    const affiliate = await prisma.affiliate.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        referralCode: true,
        name: true,
        email: true,
        company: true,
        phone: true,
        isActive: true,
        notes: true,
        totalReferrals: true,
        createdAt: true,
        lastLoginAt: true,
      },
    });

    return NextResponse.json(affiliate);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Error updating affiliate:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/admin/affiliates/[id] - Delete affiliate
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Remove affiliate reference from assessments first
    await prisma.assessment.updateMany({
      where: { affiliateId: id },
      data: { affiliateId: null },
    });

    await prisma.affiliate.delete({ where: { id } });

    return NextResponse.json({ message: 'Affiliate deleted successfully' });
  } catch (error) {
    console.error('Error deleting affiliate:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
