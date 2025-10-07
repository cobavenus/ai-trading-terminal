'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MarketDataTableProps {
  symbols: string[];
}

export function MarketDataTable({ symbols }: MarketDataTableProps) {
  // Fixed mock data to prevent hydration mismatches
  const getMockData = (symbol: string) => {
    const mockPrices: { [key: string]: number } = {
      'AAPL': 157.13,
      'GOOGL': 244.86,
      'MSFT': 378.85,
      'TSLA': 248.42,
      'AMZN': 186.51,
      'META': 150.00,
      'NFLX': 150.00,
      'NVDA': 150.00,
    };

    // Deterministic pseudo-random function for consistent results
    const seededRandom = (seed: string) => {
      let hash = 0;
      for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
      }
      return Math.abs(hash) / 2147483647; // Normalize to [0, 1)
    };

    const basePrice = mockPrices[symbol] || 150.00;

    // Use deterministic seed based on symbol only
    const random1 = seededRandom(`${symbol}_change`);
    const random2 = seededRandom(`${symbol}_percent`);
    const random3 = seededRandom(`${symbol}_volume`);

    return {
      symbol,
      price: basePrice,
      change: (random1 - 0.5) * 2, // Small variation around 0
      changePercent: (random2 - 0.5) * 1,
      volume: Math.floor(random3 * 1000000) + 100000,
    };
  };

  const marketData = symbols.map(symbol => getMockData(symbol));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Data</CardTitle>
        <CardDescription>Real-time market information for popular stocks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {marketData.map((item) => (
            <div key={item.symbol} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center space-x-3">
                <div className="font-semibold">{item.symbol}</div>
                <div className="text-sm text-muted-foreground">
                  ${(item.price).toFixed(2)}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  {item.change >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={`text-sm ${item.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}
                  </span>
                </div>

                <div className={`text-sm ${item.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  ({item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%)
                </div>

                <Badge variant="outline" className="text-xs">
                  {(item.volume / 1000).toFixed(0)}K
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

