'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Activity, Target, Zap, Brain } from 'lucide-react';

interface Insight {
  id: string;
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  type: 'technical' | 'fundamental' | 'sentiment';
  symbol?: string;
  timestamp: Date;
}

export function AIInsights() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const insights: Insight[] = [
    {
      id: '1',
      title: 'Технический прорыв AAPL',
      description: 'Акции Apple пробили сопротивление на уровне $155 с высоким объемом торгов. Это подтверждает восходящий тренд.',
      confidence: 0.87,
      impact: 'high',
      type: 'technical',
      symbol: 'AAPL',
      timestamp: new Date(),
    },
    {
      id: '2',
      title: 'Сентимент рынка улучшается',
      description: 'Положительные новости из технологического сектора способствуют росту оптимизма инвесторов.',
      confidence: 0.72,
      impact: 'medium',
      type: 'sentiment',
      timestamp: new Date(),
    },
    {
      id: '3',
      title: 'Фундаментальный анализ TSLA',
      description: 'Снижение затрат на производство электромобилей улучшает маржу прибыли Tesla.',
      confidence: 0.79,
      impact: 'medium',
      type: 'fundamental',
      symbol: 'TSLA',
      timestamp: new Date(),
    },
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'technical':
        return <Activity className="w-4 h-4" />;
      case 'fundamental':
        return <Target className="w-4 h-4" />;
      case 'sentiment':
        return <Brain className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'technical':
        return 'bg-blue-100 text-blue-800';
      case 'fundamental':
        return 'bg-green-100 text-green-800';
      case 'sentiment':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-primary" />
          <CardTitle>AI Insights</CardTitle>
        </div>
        <CardDescription>
          Искусственный интеллект анализирует рынок и предоставляет ключевые insights
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {insights.map((insight) => (
          <div key={insight.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                {getInsightIcon(insight.type)}
                <h4 className="font-semibold text-sm">{insight.title}</h4>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getTypeColor(insight.type)}>
                  {insight.type}
                </Badge>
                <div className={`w-2 h-2 rounded-full ${getImpactColor(insight.impact)}`} />
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              {insight.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {insight.symbol && (
                  <Badge variant="outline" className="text-xs">
                    {insight.symbol}
                  </Badge>
                )}
                {isMounted && (
                  <span className="text-xs text-muted-foreground">
                    {insight.timestamp.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false
                    })}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">Уверенность:</span>
                <Progress
                  value={insight.confidence * 100}
                  className="w-16 h-2"
                />
                <span className="text-xs font-medium">
                  {(insight.confidence * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {isMounted && (
                <>Последнее обновление: {new Date().toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false
                })}</>
              )}
            </span>
            <Badge variant="secondary" className="text-xs">
              <Zap className="w-3 h-3 mr-1" />
              AI Active
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
