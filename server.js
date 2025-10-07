const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 4567;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/trades', async (req, res) => {
  try {
    const trades = await prisma.trade.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    res.json({ trades });
  } catch (error) {
    console.error('Error fetching trades:', error);
    res.status(500).json({ error: 'Failed to fetch trades' });
  }
});

app.post('/api/trades', async (req, res) => {
  try {
    const { symbol, quantity, price, type, userId } = req.body;
    
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
    
    res.status(201).json({ trade });
  } catch (error) {
    console.error('Error creating trade:', error);
    res.status(500).json({ error: 'Failed to create trade' });
  }
});

app.get('/api/portfolio', async (req, res) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    const portfolio = await prisma.portfolio.findMany({
      where: { userId },
      include: {
        trades: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });
    
    res.json({ portfolio });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
});

app.get('/api/market-data', (req, res) => {
  try {
    const { symbol = 'AAPL' } = req.query;
    
    // Mock market data
    const mockData = {
      symbol,
      price: Math.random() * 100 + 50,
      change: (Math.random() - 0.5) * 10,
      changePercent: (Math.random() - 0.5) * 5,
      volume: Math.floor(Math.random() * 1000000),
      timestamp: new Date().toISOString()
    };
    
    res.json({ data: mockData });
  } catch (error) {
    console.error('Error fetching market data:', error);
    res.status(500).json({ error: 'Failed to fetch market data' });
  }
});

app.get('/api/ai-recommendations', (req, res) => {
  try {
    const { symbol = 'AAPL' } = req.query;
    
    // Mock AI recommendations
    const mockRecommendations = {
      symbol,
      recommendation: Math.random() > 0.5 ? 'BUY' : 'SELL',
      confidence: Math.random() * 100,
      reasoning: 'AI analysis based on market trends and technical indicators',
      timestamp: new Date().toISOString()
    };
    
    res.json({ recommendations: mockRecommendations });
  } catch (error) {
    console.error('Error fetching AI recommendations:', error);
    res.status(500).json({ error: 'Failed to fetch AI recommendations' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api/`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down backend server...');
  await prisma.$disconnect();
  process.exit(0);
});
