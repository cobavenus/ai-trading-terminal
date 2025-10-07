'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';

export function PortfolioOverview() {
  // Mock portfolio data
  const portfolioData = {
    totalValue: 125000,
    totalGain: 8500,
    totalGainPercent: 7.3,
    positions: [
      { symbol: 'AAPL', quantity: 50, avgPrice: 150, currentPrice: 175, pnl: 1250, pnlPercent: 16.7 },
      { symbol: 'GOOGL', quantity: 10, avgPrice: 2800, currentPrice: 2950, pnl: 1500, pnlPercent: 5.4 },
      { symbol: 'TSLA', quantity: 25, avgPrice: 200, currentPrice: 220, pnl: 500, pnlPercent: 10.0 },
    ]
  };

  const formatCurrency = (value: number) => `$${value.toLocaleString('en-US')}`;
  const formatPercent = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <PieChart className="h-5 w-5" />
          <span>Portfolio Overview</span>
        </CardTitle>
        <CardDescription>Your current investment positions and performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Portfolio Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{formatCurrency(portfolioData.totalValue)}</div>
              <div className="text-sm text-muted-foreground">Total Value</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${portfolioData.totalGain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatCurrency(portfolioData.totalGain)}
              </div>
              <div className="text-sm text-muted-foreground">Total Gain/Loss</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${portfolioData.totalGainPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatPercent(portfolioData.totalGainPercent)}
              </div>
              <div className="text-sm text-muted-foreground">Total Return</div>
            </div>
          </div>

          {/* Positions */}
          <div className="space-y-3">
            <h4 className="font-semibold">Current Positions</h4>
            {portfolioData.positions.map((position) => (
              <div key={position.symbol} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="font-semibold">{position.symbol}</div>
                  <div className="text-sm text-muted-foreground">
                    {position.quantity} shares @ {formatCurrency(position.avgPrice)}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-sm">
                    Current: {formatCurrency(position.currentPrice)}
                  </div>

                  <div className="flex items-center space-x-1">
                    {position.pnl >= 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${position.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {formatCurrency(position.pnl)} ({formatPercent(position.pnlPercent)})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="flex space-x-2">
            <button className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
              View Details
            </button>
            <button className="flex-1 border border-border px-4 py-2 rounded-md text-sm font-medium hover:bg-accent">
              Rebalance
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

