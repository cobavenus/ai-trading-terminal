import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol') || 'AAPL';
    
    // Mock AI recommendations - в реальном проекте здесь будет интеграция с OpenAI
    const mockRecommendations = {
      symbol,
      recommendation: Math.random() > 0.5 ? 'BUY' : 'SELL',
      confidence: Math.random() * 100,
      reasoning: 'AI analysis based on market trends and technical indicators',
      timestamp: new Date().toISOString()
    };
    
    return NextResponse.json({ recommendations: mockRecommendations });
  } catch (error) {
    console.error('Error fetching AI recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch AI recommendations' },
      { status: 500 }
    );
  }
}
