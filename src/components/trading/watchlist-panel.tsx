'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Plus, Star } from 'lucide-react';

export function WatchlistPanel() {
  // Mock watchlist data
  const watchlist = [
    { symbol: 'AAPL', price: 175.25, change: 2.75, changePercent: 1.59, alert: true },
    { symbol: 'GOOGL', price: 2950.00, change: -25.50, changePercent: -0.86, alert: false },
    { symbol: 'MSFT', price: 415.30, change: 5.20, changePercent: 1.27, alert: true },
    { symbol: 'TSLA', price: 220.15, change: -3.85, changePercent: -1.72, alert: false },
    { symbol: 'AMZN', price: 155.80, change: 1.20, changePercent: 0.78, alert: false },
  ];

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;
  const formatChange = (change: number) => `${change >= 0 ? '+' : ''}${change.toFixed(2)}`;
  const formatPercent = (percent: number) => `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5" />
              <span>Watchlist</span>
            </CardTitle>
            <CardDescription>Your favorite stocks and alerts</CardDescription>
          </div>
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {watchlist.map((item) => (
            <div key={item.symbol} className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="font-semibold">{item.symbol}</div>
                  {item.alert && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatPrice(item.price)}
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
                    {formatChange(item.change)}
                  </span>
                </div>

                <div className={`text-sm ${item.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {formatPercent(item.changePercent)}
                </div>

                <Button size="sm" variant="ghost">
                  Trade
                </Button>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full">
              View All Watchlists
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

