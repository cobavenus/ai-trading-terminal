'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity, Target } from 'lucide-react';

interface AnalyticsData {
  marketSentiment: {
    overall: 'bullish' | 'bearish' | 'neutral';
    confidence: number;
    indicators: {
      fearGreed: number;
      putCallRatio: number;
      vix: number;
    };
  };
  portfolioAnalytics: {
    diversification: number;
    riskLevel: 'low' | 'medium' | 'high';
    performance: {
      daily: number;
      weekly: number;
      monthly: number;
    };
  };
  predictions: {
    shortTerm: {
      direction: 'up' | 'down' | 'sideways';
      confidence: number;
      target: number;
    };
    longTerm: {
      direction: 'up' | 'down' | 'sideways';
      confidence: number;
      target: number;
    };
  };
}

export function AIAnalytics() {
  const analyticsData: AnalyticsData = {
    marketSentiment: {
      overall: 'bullish',
      confidence: 0.78,
      indicators: {
        fearGreed: 65,
        putCallRatio: 0.85,
        vix: 18.5,
      },
    },
    portfolioAnalytics: {
      diversification: 0.72,
      riskLevel: 'medium',
      performance: {
        daily: 2.3,
        weekly: -1.2,
        monthly: 8.7,
      },
    },
    predictions: {
      shortTerm: {
        direction: 'up',
        confidence: 0.83,
        target: 105,
      },
      longTerm: {
        direction: 'up',
        confidence: 0.65,
        target: 120,
      },
    },
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return 'text-green-600 bg-green-100';
      case 'bearish':
        return 'text-red-600 bg-red-100';
      case 'neutral':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getDirectionIcon = (direction: string) => {
    switch (direction) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <CardTitle>AI Analytics</CardTitle>
        </div>
        <CardDescription>
          Расширенная аналитика и прогнозы от ИИ
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="market" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="market">Рынок</TabsTrigger>
            <TabsTrigger value="portfolio">Портфель</TabsTrigger>
            <TabsTrigger value="predictions">Прогнозы</TabsTrigger>
          </TabsList>

          <TabsContent value="market" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Сентимент рынка</h4>
                <Badge className={getSentimentColor(analyticsData.marketSentiment.overall)}>
                  {analyticsData.marketSentiment.overall.toUpperCase()}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Индекс страха и жадности</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={analyticsData.marketSentiment.indicators.fearGreed} className="w-16" />
                    <span className="text-sm font-medium">{analyticsData.marketSentiment.indicators.fearGreed}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Put/Call Ratio</span>
                  <span className="text-sm font-medium">{analyticsData.marketSentiment.indicators.putCallRatio}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">VIX</span>
                  <span className="text-sm font-medium">{analyticsData.marketSentiment.indicators.vix}</span>
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Уверенность анализа:</span>
                  <span className="text-sm font-medium">
                    {(analyticsData.marketSentiment.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Диверсификация портфеля</h4>
                <Badge className={getRiskColor(analyticsData.portfolioAnalytics.riskLevel)}>
                  {analyticsData.portfolioAnalytics.riskLevel.toUpperCase()}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Уровень диверсификации</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={analyticsData.portfolioAnalytics.diversification * 100} className="w-16" />
                    <span className="text-sm font-medium">
                      {(analyticsData.portfolioAnalytics.diversification * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <div className={`text-lg font-bold ${analyticsData.portfolioAnalytics.performance.daily >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {analyticsData.portfolioAnalytics.performance.daily >= 0 ? '+' : ''}
                      {analyticsData.portfolioAnalytics.performance.daily}%
                    </div>
                    <div className="text-xs text-muted-foreground">День</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-bold ${analyticsData.portfolioAnalytics.performance.weekly >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {analyticsData.portfolioAnalytics.performance.weekly >= 0 ? '+' : ''}
                      {analyticsData.portfolioAnalytics.performance.weekly}%
                    </div>
                    <div className="text-xs text-muted-foreground">Неделя</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-bold ${analyticsData.portfolioAnalytics.performance.monthly >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {analyticsData.portfolioAnalytics.performance.monthly >= 0 ? '+' : ''}
                      {analyticsData.portfolioAnalytics.performance.monthly}%
                    </div>
                    <div className="text-xs text-muted-foreground">Месяц</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3">Короткосрочный прогноз</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getDirectionIcon(analyticsData.predictions.shortTerm.direction)}
                      <span className="text-sm">Направление</span>
                    </div>
                    <Badge variant="outline">
                      {analyticsData.predictions.shortTerm.direction.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Уверенность</span>
                    <span className="text-sm font-medium">
                      {(analyticsData.predictions.shortTerm.confidence * 100).toFixed(0)}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Целевой уровень</span>
                    <span className="text-sm font-medium">
                      ${analyticsData.predictions.shortTerm.target}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-3">Долгосрочный прогноз</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getDirectionIcon(analyticsData.predictions.longTerm.direction)}
                      <span className="text-sm">Направление</span>
                    </div>
                    <Badge variant="outline">
                      {analyticsData.predictions.longTerm.direction.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Уверенность</span>
                    <span className="text-sm font-medium">
                      {(analyticsData.predictions.longTerm.confidence * 100).toFixed(0)}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Целевой уровень</span>
                    <span className="text-sm font-medium">
                      ${analyticsData.predictions.longTerm.target}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
