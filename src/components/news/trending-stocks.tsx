'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Activity, Star, ExternalLink } from 'lucide-react';

interface TrendingStock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  newsCount: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  sector: string;
}

export function TrendingStocks() {
  const trendingStocks: TrendingStock[] = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 150.25,
      change: 2.45,
      changePercent: 1.66,
      volume: 45230000,
      marketCap: '2.34T',
      newsCount: 23,
      sentiment: 'positive',
      sector: 'Technology',
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      price: 245.80,
      change: -8.20,
      changePercent: -3.23,
      volume: 89340000,
      marketCap: '780.5B',
      newsCount: 45,
      sentiment: 'negative',
      sector: 'Consumer Discretionary',
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      price: 335.50,
      change: 4.75,
      changePercent: 1.44,
      volume: 28340000,
      marketCap: '2.49T',
      newsCount: 18,
      sentiment: 'positive',
      sector: 'Technology',
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corp.',
      price: 875.30,
      change: 15.80,
      changePercent: 1.84,
      volume: 52340000,
      marketCap: '2.15T',
      newsCount: 31,
      sentiment: 'positive',
      sector: 'Technology',
    },
    {
      symbol: 'META',
      name: 'Meta Platforms Inc.',
      price: 485.20,
      change: -2.30,
      changePercent: -0.47,
      volume: 18450000,
      marketCap: '1.24T',
      newsCount: 12,
      sentiment: 'neutral',
      sector: 'Technology',
    },
  ];

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 bg-green-100';
      case 'negative':
        return 'text-red-600 bg-red-100';
      case 'neutral':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    }
    if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return volume.toString();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-primary" />
            <CardTitle>Trending Stocks</CardTitle>
          </div>
          <Badge variant="secondary" className="text-xs">
            Live Updates
          </Badge>
        </div>
        <CardDescription>
          Акции с наибольшей активностью в новостях
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {trendingStocks.map((stock) => (
          <div key={stock.symbol} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold">{stock.symbol}</h4>
                  <span className="text-sm text-muted-foreground">{stock.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {stock.sector}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    {getSentimentIcon(stock.sentiment)}
                    <Badge className={getSentimentColor(stock.sentiment)}>
                      {stock.sentiment}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="text-sm text-muted-foreground">Цена</div>
                <div className="font-semibold">${stock.price}</div>
                <div className={`text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change} ({stock.changePercent}%)
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Объем</div>
                <div className="font-medium">{formatVolume(stock.volume)}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Капитализация</div>
                <div className="font-medium">${stock.marketCap}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Новости</div>
                <div className="font-medium">{stock.newsCount}</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Activity className="w-3 h-3" />
                <span>Обновлено: {new Date().toLocaleTimeString()}</span>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  График
                </Button>
                <Button size="sm" variant="outline">
                  Новости
                </Button>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Данные обновляются в реальном времени
            </span>
            <Button variant="outline" size="sm">
              Показать все
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
