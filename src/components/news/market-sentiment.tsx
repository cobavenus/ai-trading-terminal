'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Activity, BarChart3 } from 'lucide-react';

interface SentimentData {
  overall: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  indicators: {
    fearGreed: number;
    putCallRatio: number;
    vix: number;
    socialSentiment: number;
  };
  breakdown: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

export function MarketSentiment() {
  const sentimentData: SentimentData = {
    overall: 'bullish',
    confidence: 0.78,
    indicators: {
      fearGreed: 65,
      putCallRatio: 0.85,
      vix: 18.5,
      socialSentiment: 72,
    },
    breakdown: {
      positive: 68,
      negative: 22,
      neutral: 10,
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

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'bearish':
        return <TrendingDown className="w-5 h-5 text-red-600" />;
      default:
        return <Activity className="w-5 h-5 text-yellow-600" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg">Market Sentiment</CardTitle>
          <div className="flex items-center space-x-2 ml-auto">
            {getSentimentIcon(sentimentData.overall)}
            <Badge className={getSentimentColor(sentimentData.overall)}>
              {sentimentData.overall.toUpperCase()}
            </Badge>
          </div>
        </div>
        <CardDescription>
          Текущее настроение рынка и ключевые индикаторы
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Key Indicators */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Fear & Greed Index</span>
              <span className="font-medium">{sentimentData.indicators.fearGreed}</span>
            </div>
            <Progress value={sentimentData.indicators.fearGreed} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Put/Call Ratio</span>
              <span className="font-medium">{sentimentData.indicators.putCallRatio}</span>
            </div>
            <Progress value={sentimentData.indicators.putCallRatio * 100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">VIX</span>
              <span className="font-medium">{sentimentData.indicators.vix}</span>
            </div>
            <Progress value={(sentimentData.indicators.vix / 50) * 100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Social Sentiment</span>
              <span className="font-medium">{sentimentData.indicators.socialSentiment}%</span>
            </div>
            <Progress value={sentimentData.indicators.socialSentiment} className="h-2" />
          </div>
        </div>

        {/* Sentiment Breakdown */}
        <div className="pt-4 border-t">
          <h4 className="font-semibold text-sm mb-3">Распределение настроений</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">
                {sentimentData.breakdown.positive}%
              </div>
              <div className="text-xs text-muted-foreground">Позитивные</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-600">
                {sentimentData.breakdown.neutral}%
              </div>
              <div className="text-xs text-muted-foreground">Нейтральные</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-600">
                {sentimentData.breakdown.negative}%
              </div>
              <div className="text-xs text-muted-foreground">Негативные</div>
            </div>
          </div>
        </div>

        {/* Confidence Level */}
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Уверенность анализа:</span>
            <div className="flex items-center space-x-2">
              <Progress value={sentimentData.confidence * 100} className="w-16" />
              <span className="text-sm font-medium">
                {(sentimentData.confidence * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
