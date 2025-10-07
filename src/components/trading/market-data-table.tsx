'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MarketDataTableProps {
  symbols: string[];
}

export function MarketDataTable({ symbols }: MarketDataTableProps) {
  // Mock data for demonstration
  const marketData = symbols.map((symbol, index) => ({
    symbol,
    price: 100 + Math.random() * 200,
    change: (Math.random() - 0.5) * 10,
    changePercent: (Math.random() - 0.5) * 5,
    volume: Math.floor(Math.random() * 1000000) + 100000,
  }));

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

