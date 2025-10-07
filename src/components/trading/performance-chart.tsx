'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, BarChart3 } from 'lucide-react';

export function PerformanceChart() {
  // Mock performance data
  const performanceData = [
    { date: '2024-01-01', value: 100000 },
    { date: '2024-01-02', value: 101500 },
    { date: '2024-01-03', value: 100800 },
    { date: '2024-01-04', value: 102200 },
    { date: '2024-01-05', value: 103000 },
    { date: '2024-01-06', value: 102500 },
    { date: '2024-01-07', value: 104200 },
    { date: '2024-01-08', value: 105000 },
    { date: '2024-01-09', value: 104800 },
    { date: '2024-01-10', value: 106500 },
    { date: '2024-01-11', value: 107200 },
    { date: '2024-01-12', value: 108000 },
    { date: '2024-01-13', value: 107800 },
    { date: '2024-01-14', value: 109500 },
    { date: '2024-01-15', value: 110200 },
  ];

  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const currentValue = performanceData[performanceData.length - 1].value;
  const initialValue = performanceData[0].value;
  const totalReturn = currentValue - initialValue;
  const totalReturnPercent = (totalReturn / initialValue) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5" />
          <span>Performance Chart</span>
        </CardTitle>
        <CardDescription>Portfolio value over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{formatCurrency(currentValue)}</div>
              <div className="text-sm text-muted-foreground">Current Value</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${totalReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {formatCurrency(totalReturn)}
              </div>
              <div className="text-sm text-muted-foreground">Total Return</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${totalReturnPercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {totalReturnPercent.toFixed(2)}%
              </div>
              <div className="text-sm text-muted-foreground">Return %</div>
            </div>
          </div>

          {/* Simple Chart Visualization */}
          <div className="h-48 bg-muted/20 rounded-lg p-4">
            <div className="flex items-end justify-between h-full">
              {performanceData.map((point, index) => {
                const height = ((point.value - initialValue) / (currentValue - initialValue)) * 100;
                return (
                  <div key={point.date} className="flex flex-col items-center space-y-2">
                    <div
                      className={`w-2 rounded-t-sm ${
                        height >= 0 ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ height: `${Math.abs(height)}%` }}
                    />
                    {index % 3 === 0 && (
                      <div className="text-xs text-muted-foreground transform -rotate-45 origin-top-left">
                        {formatDate(point.date)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <div className="text-sm font-medium">Best Day</div>
              <div className="text-sm text-green-500">+2.3% (Jan 10)</div>
            </div>
            <div>
              <div className="text-sm font-medium">Worst Day</div>
              <div className="text-sm text-red-500">-1.8% (Jan 6)</div>
            </div>
            <div>
              <div className="text-sm font-medium">Volatility</div>
              <div className="text-sm text-muted-foreground">12.5%</div>
            </div>
            <div>
              <div className="text-sm font-medium">Sharpe Ratio</div>
              <div className="text-sm text-muted-foreground">1.24</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

