import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const CreateAffiliateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  referralCode: z.string()
    .min(3, 'Code must be at least 3 characters')
    .max(20, 'Code must be at most 20 characters')
    .regex(/^[A-Z0-9]+$/, 'Code must be uppercase alphanumeric'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  company: z.string().optional(),
  phone: z.string().optional(),
  notes: z.string().optional(),
  isActive: z.boolean().optional().default(true),
});

// GET /api/admin/affiliates - List all affiliates
export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const affiliates = await prisma.affiliate.findMany({
      orderBy: { createdAt: 'desc' },
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

    return NextResponse.json(affiliates);
  } catch (error) {
    console.error('Error fetching affiliates:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/admin/affiliates - Create new affiliate
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validated = CreateAffiliateSchema.parse(body);

    // Check for existing email or code
    const existingEmail = await prisma.affiliate.findUnique({
      where: { email: validated.email },
    });
    if (existingEmail) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    const existingCode = await prisma.affiliate.findUnique({
      where: { referralCode: validated.referralCode },
    });
    if (existingCode) {
      return NextResponse.json({ error: 'Referral code already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(validated.password, 12);

    const affiliate = await prisma.affiliate.create({
      data: {
        name: validated.name,
        email: validated.email,
        referralCode: validated.referralCode,
        password: hashedPassword,
        company: validated.company || null,
        phone: validated.phone || null,
        notes: validated.notes || null,
        isActive: validated.isActive,
      },
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
      },
    });

    return NextResponse.json(affiliate, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Error creating affiliate:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
