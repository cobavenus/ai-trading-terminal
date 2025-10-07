'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Wallet } from 'lucide-react';

export function PortfolioSummary() {
  // Mock portfolio data
  const portfolio = {
    totalValue: 125000,
    totalGain: 8500,
    totalGainPercent: 7.3,
    dayChange: 1250,
    dayChangePercent: 1.01,
    positionsCount: 12,
    cashBalance: 25000,
  };

  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;
  const formatPercent = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Wallet className="h-5 w-5" />
          <span>Portfolio Summary</span>
        </CardTitle>
        <CardDescription>Your overall investment performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold">{formatCurrency(portfolio.totalValue)}</div>
            <div className="text-sm text-muted-foreground">Total Value</div>
            <div className={`text-xs ${portfolio.totalGain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatPercent(portfolio.totalGainPercent)} all-time
            </div>
          </div>

          <div className="text-center">
            <div className={`text-2xl font-bold ${portfolio.totalGain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatCurrency(portfolio.totalGain)}
            </div>
            <div className="text-sm text-muted-foreground">Total Gain/Loss</div>
            <div className={`text-xs ${portfolio.totalGain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatPercent(portfolio.totalGainPercent)}
            </div>
          </div>

          <div className="text-center">
            <div className={`text-2xl font-bold ${portfolio.dayChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatCurrency(portfolio.dayChange)}
            </div>
            <div className="text-sm text-muted-foreground">Today's Change</div>
            <div className={`text-xs ${portfolio.dayChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatPercent(portfolio.dayChangePercent)}
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold">{formatCurrency(portfolio.cashBalance)}</div>
            <div className="text-sm text-muted-foreground">Cash Balance</div>
            <Badge variant="secondary">{portfolio.positionsCount} positions</Badge>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Performance Trend</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground ml-2">Last 5 days</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

