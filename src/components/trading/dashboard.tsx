'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Activity, DollarSign, Percent } from 'lucide-react';
import { TradingChart } from './trading-chart';
import { MarketDataTable } from './market-data-table';
import { PortfolioOverview } from './portfolio-overview';

const POPULAR_SYMBOLS = [
  'AAPL', 'GOOGL', 'MSFT', 'TSLA', 'AMZN', 'META', 'NFLX', 'NVDA'
];

const TIMEFRAMES = [
  { value: '1m', label: '1M' },
  { value: '5m', label: '5M' },
  { value: '15m', label: '15M' },
  { value: '1h', label: '1H' },
  { value: '4h', label: '4H' },
  { value: '1d', label: '1D' },
  { value: '1w', label: '1W' },
];

export function TradingDashboard() {
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1d');
  const [isLoading, setIsLoading] = useState(true);

  // Generate mock data with fixed values to prevent hydration mismatches
  const generateMockData = (symbol: string) => {
    const data = [];
    const basePrices: { [key: string]: number } = {
      'AAPL': 150,
      'GOOGL': 2800,
      'MSFT': 400,
      'TSLA': 250,
      'AMZN': 3000,
    };

    const basePrice = basePrices[symbol] || 150;

    for (let i = 100; i >= 0; i--) {
      const timestamp = new Date();
      timestamp.setDate(timestamp.getDate() - i);

      // Use deterministic calculations instead of Math.random()
      const volatility = 0.02; // 2% volatility
      const trend = i * 0.001; // Slight upward trend
      const seasonal = Math.sin(i * 0.1) * 0.005; // Seasonal variation

      const price = basePrice * (1 + trend + seasonal + (i % 2 === 0 ? volatility : -volatility) * (i / 100));

      data.push({
        timestamp: timestamp.toISOString(),
        open: price * (1 + (Math.abs(i) % 3 - 1) * 0.001), // Small opening variation
        high: price * (1 + Math.abs(i % 5) * 0.002), // Higher high
        low: price * (1 - Math.abs(i % 5) * 0.002), // Lower low
        close: price,
        volume: Math.floor(500000 + i * 1000 + (i % 10) * 50000), // Volume with some pattern
      });
    }

    return data;
  };

  const [marketData, setMarketData] = useState<any[]>(() => generateMockData('AAPL'));

  // Mock data for demonstration
  useEffect(() => {
    setMarketData(generateMockData(selectedSymbol));
    setIsLoading(false);
  }, [selectedSymbol]);

  const currentPrice = marketData[marketData.length - 1]?.close || 0;
  const previousPrice = marketData[marketData.length - 2]?.close || currentPrice;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercent = (priceChange / previousPrice) * 100;

  return (
    <div className="space-y-6">
      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentPrice.toFixed(2)}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              {priceChange >= 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={priceChange >= 0 ? 'text-green-500' : 'text-red-500'}>
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volume</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(marketData[marketData.length - 1]?.volume / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground">
              Last 24h volume
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Cap</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.1T</div>
            <p className="text-xs text-muted-foreground">
              Total market value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">P/E Ratio</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28.5</div>
            <p className="text-xs text-muted-foreground">
              Price to earnings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Chart Section */}
      <Card className="col-span-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POPULAR_SYMBOLS.map((symbol) => (
                    <SelectItem key={symbol} value={symbol}>
                      {symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TIMEFRAMES.map((tf) => (
                    <SelectItem key={tf.value} value={tf.value}>
                      {tf.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Buy</Button>
                <Button variant="outline" size="sm">Sell</Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Badge variant={priceChange >= 0 ? 'default' : 'destructive'}>
                {priceChange >= 0 ? 'Bullish' : 'Bearish'}
              </Badge>
              <Badge variant="secondary">Live</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-96">
            <TradingChart
              data={marketData}
              symbol={selectedSymbol}
              timeframe={selectedTimeframe}
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs for additional data */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analysis">Technical Analysis</TabsTrigger>
          <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PortfolioOverview />
            <MarketDataTable symbols={POPULAR_SYMBOLS} />
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Technical Indicators</CardTitle>
              <CardDescription>
                Real-time technical analysis for {selectedSymbol}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">65</div>
                  <div className="text-sm text-muted-foreground">RSI</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">0.25</div>
                  <div className="text-sm text-muted-foreground">MACD</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">20</div>
                  <div className="text-sm text-muted-foreground">Bollinger</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">50</div>
                  <div className="text-sm text-muted-foreground">SMA</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fundamentals" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-semibold">Sector</div>
                  <div className="text-muted-foreground">Technology</div>
                </div>
                <div>
                  <div className="font-semibold">Industry</div>
                  <div className="text-muted-foreground">Consumer Electronics</div>
                </div>
                <div>
                  <div className="font-semibold">Employees</div>
                  <div className="text-muted-foreground">164,000</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-semibold">Revenue (TTM)</div>
                  <div className="text-muted-foreground">$394.3B</div>
                </div>
                <div>
                  <div className="font-semibold">Net Income</div>
                  <div className="text-muted-foreground">$100.0B</div>
                </div>
                <div>
                  <div className="font-semibold">Free Cash Flow</div>
                  <div className="text-muted-foreground">$85.0B</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

