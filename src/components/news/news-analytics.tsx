'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity } from 'lucide-react';

interface NewsAnalyticsData {
  totalArticles: number;
  sentimentDistribution: {
    positive: number;
    negative: number;
    neutral: number;
  };
  topKeywords: {
    word: string;
    frequency: number;
    sentiment: 'positive' | 'negative' | 'neutral';
  }[];
  marketImpact: {
    high: number;
    medium: number;
    low: number;
  };
  trendingTopics: {
    topic: string;
    mentions: number;
    trend: 'up' | 'down' | 'stable';
  }[];
}

export function NewsAnalytics() {
  const analyticsData: NewsAnalyticsData = {
    totalArticles: 1247,
    sentimentDistribution: {
      positive: 45,
      negative: 25,
      neutral: 30,
    },
    topKeywords: [
      { word: 'Tesla', frequency: 89, sentiment: 'positive' },
      { word: 'Apple', frequency: 76, sentiment: 'positive' },
      { word: 'ФРС', frequency: 65, sentiment: 'neutral' },
      { word: 'инфляция', frequency: 58, sentiment: 'negative' },
      { word: 'криптовалюта', frequency: 45, sentiment: 'negative' },
    ],
    marketImpact: {
      high: 15,
      medium: 45,
      low: 40,
    },
    trendingTopics: [
      { topic: 'Технологический сектор', mentions: 234, trend: 'up' },
      { topic: 'Энергетика', mentions: 189, trend: 'down' },
      { topic: 'Финансовый сектор', mentions: 156, trend: 'stable' },
      { topic: 'Криптовалюты', mentions: 123, trend: 'up' },
    ],
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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-yellow-600" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <CardTitle>News Analytics</CardTitle>
        </div>
        <CardDescription>
          Анализ новостного потока и рыночных тенденций
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {analyticsData.totalArticles.toLocaleString('en-US')}
            </div>
            <div className="text-sm text-muted-foreground">Всего новостей</div>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {analyticsData.sentimentDistribution.positive}%
            </div>
            <div className="text-sm text-muted-foreground">Позитивные</div>
          </div>
        </div>

        {/* Sentiment Distribution */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Распределение настроений</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Позитивные</span>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={analyticsData.sentimentDistribution.positive} className="w-16" />
                <span className="text-sm font-medium">
                  {analyticsData.sentimentDistribution.positive}%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Нейтральные</span>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={analyticsData.sentimentDistribution.neutral} className="w-16" />
                <span className="text-sm font-medium">
                  {analyticsData.sentimentDistribution.neutral}%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">Негативные</span>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={analyticsData.sentimentDistribution.negative} className="w-16" />
                <span className="text-sm font-medium">
                  {analyticsData.sentimentDistribution.negative}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Keywords */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Популярные ключевые слова</h4>
          <div className="space-y-2">
            {analyticsData.topKeywords.map((keyword, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className={getSentimentColor(keyword.sentiment)}>
                    {keyword.sentiment}
                  </Badge>
                  <span className="text-sm font-medium">{keyword.word}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={(keyword.frequency / 100) * 100} className="w-12" />
                  <span className="text-sm text-muted-foreground">
                    {keyword.frequency}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Topics */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Трендовые темы</h4>
          <div className="space-y-2">
            {analyticsData.trendingTopics.map((topic, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getTrendIcon(topic.trend)}
                  <span className="text-sm">{topic.topic}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {topic.mentions} упоминаний
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Market Impact */}
        <div className="pt-4 border-t">
          <h4 className="font-semibold text-sm mb-3">Влияние на рынок</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-red-600">
                {analyticsData.marketImpact.high}%
              </div>
              <div className="text-xs text-muted-foreground">Высокое</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-600">
                {analyticsData.marketImpact.medium}%
              </div>
              <div className="text-xs text-muted-foreground">Среднее</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">
                {analyticsData.marketImpact.low}%
              </div>
              <div className="text-xs text-muted-foreground">Низкое</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
