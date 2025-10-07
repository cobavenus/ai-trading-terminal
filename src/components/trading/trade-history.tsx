'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, History } from 'lucide-react';

export function TradeHistory() {
  // Mock trade history data
  const trades = [
    {
      id: '1',
      symbol: 'AAPL',
      side: 'buy',
      quantity: 50,
      price: 150.25,
      total: 7512.50,
      timestamp: '2024-01-15T10:30:00Z',
      status: 'executed'
    },
    {
      id: '2',
      symbol: 'GOOGL',
      side: 'sell',
      quantity: 10,
      price: 2800.00,
      total: 28000.00,
      timestamp: '2024-01-14T15:45:00Z',
      status: 'executed'
    },
    {
      id: '3',
      symbol: 'TSLA',
      side: 'buy',
      quantity: 25,
      price: 200.00,
      total: 5000.00,
      timestamp: '2024-01-13T09:15:00Z',
      status: 'pending'
    },
  ];

  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <History className="h-5 w-5" />
          <span>Recent Trades</span>
        </CardTitle>
        <CardDescription>Your latest trading activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trades.map((trade) => (
            <div key={trade.id} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${trade.side === 'buy' ? 'bg-green-500' : 'bg-red-500'}`} />
                <div>
                  <div className="font-semibold">{trade.symbol}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(trade.timestamp)}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-semibold">
                  {trade.side === 'buy' ? '+' : '-'}{trade.quantity} @ {formatCurrency(trade.price)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatCurrency(trade.total)}
                </div>
              </div>

              <Badge variant={trade.status === 'executed' ? 'default' : 'secondary'}>
                {trade.status}
              </Badge>
            </div>
          ))}

          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full">
              View All Trades
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

