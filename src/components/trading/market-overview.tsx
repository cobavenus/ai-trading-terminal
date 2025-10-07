'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export function MarketOverview() {
  // Mock market data
  const indices = [
    { name: 'S&P 500', symbol: 'SPX', value: 4750, change: 25, changePercent: 0.53 },
    { name: 'NASDAQ', symbol: 'IXIC', value: 15200, change: -50, changePercent: -0.33 },
    { name: 'Dow Jones', symbol: 'DJIA', value: 38500, change: 100, changePercent: 0.26 },
    { name: 'Russell 2000', symbol: 'RUT', value: 2050, change: -15, changePercent: -0.73 },
  ];

  const formatValue = (value: number) => value.toLocaleString('en-US');
  const formatChange = (change: number) => `${change >= 0 ? '+' : ''}${change.toFixed(2)}`;
  const formatPercent = (percent: number) => `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <span>Market Overview</span>
        </CardTitle>
        <CardDescription>Major market indices and performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {indices.map((index) => (
            <div key={index.symbol} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center space-x-3">
                <div>
                  <div className="font-semibold">{index.name}</div>
                  <div className="text-sm text-muted-foreground">{index.symbol}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="font-semibold">{formatValue(index.value)}</div>
                </div>

                <div className="flex items-center space-x-2">
                  {index.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <div className="text-right">
                    <div className={`text-sm font-medium ${index.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {formatChange(index.change)}
                    </div>
                    <div className={`text-xs ${index.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {formatPercent(index.changePercent)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Market Status:</span>
              <Badge variant="default" className="bg-green-500">Open</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

