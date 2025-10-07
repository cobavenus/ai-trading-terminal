import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    const portfolio = await prisma.portfolio.findMany({
      where: { userId },
      include: {
        trades: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });
    
    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, symbol, quantity, averagePrice } = body;
    
    const portfolio = await prisma.portfolio.create({
      data: {
        userId,
        symbol,
        quantity,
        averagePrice
      }
    });
    
    return NextResponse.json({ portfolio }, { status: 201 });
  } catch (error) {
    console.error('Error creating portfolio entry:', error);
    return NextResponse.json(
      { error: 'Failed to create portfolio entry' },
      { status: 500 }
    );
  }
}
