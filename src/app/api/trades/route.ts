import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const trades = await prisma.trade.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    
    return NextResponse.json({ trades });
  } catch (error) {
    console.error('Error fetching trades:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trades' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symbol, quantity, price, type, userId } = body;
    
    const trade = await prisma.trade.create({
      data: {
        symbol,
        quantity,
        price,
        type,
        userId,
        status: 'PENDING'
      }
    });
    
    return NextResponse.json({ trade }, { status: 201 });
  } catch (error) {
    console.error('Error creating trade:', error);
    return NextResponse.json(
      { error: 'Failed to create trade' },
      { status: 500 }
    );
  }
}
