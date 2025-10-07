'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Activity, Target, Zap, Calendar } from 'lucide-react';

interface Prediction {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  predictedPrice: number;
  confidence: number;
  timeframe: '1D' | '1W' | '1M' | '3M';
  direction: 'up' | 'down' | 'sideways';
  reasoning: string;
  risk: 'low' | 'medium' | 'high';
  timestamp: Date;
}

export function MarketPredictions() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const predictions: Prediction[] = [
    {
      id: '1',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      currentPrice: 150.25,
      predictedPrice: 165.00,
      confidence: 0.84,
      timeframe: '1M',
      direction: 'up',
      reasoning: 'Сильные фундаментальные показатели и позитивный технический анализ',
      risk: 'medium',
      timestamp: new Date(),
    },
    {
      id: '2',
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      currentPrice: 245.80,
      predictedPrice: 220.00,
      confidence: 0.76,
      timeframe: '1W',
      direction: 'down',
      reasoning: 'Коррекция после недавнего роста, RSI в зоне перекупленности',
      risk: 'high',
      timestamp: new Date(),
    },
    {
      id: '3',
      symbol: 'MSFT',
      name: 'Microsoft Corp.',
      currentPrice: 335.50,
      predictedPrice: 345.00,
      confidence: 0.69,
      timeframe: '3M',
      direction: 'up',
      reasoning: 'Стабильный рост облачных сервисов Azure',
      risk: 'low',
      timestamp: new Date(),
    },
  ];

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

  const getDirectionColor = (direction: string) => {
    switch (direction) {
      case 'up':
        return 'text-green-600 bg-green-100';
      case 'down':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
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

  const getTimeframeColor = (timeframe: string) => {
    switch (timeframe) {
      case '1D':
        return 'bg-red-100 text-red-800';
      case '1W':
        return 'bg-yellow-100 text-yellow-800';
      case '1M':
        return 'bg-blue-100 text-blue-800';
      case '3M':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateChange = (current: number, predicted: number): number => {
    return ((predicted - current) / current) * 100;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-primary" />
          <CardTitle>Market Predictions</CardTitle>
        </div>
        <CardDescription>
          AI-прогнозы движения цен на акции и индексы
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {predictions.map((prediction) => {
          const priceChange = calculateChange(prediction.currentPrice, prediction.predictedPrice);

          return (
            <div key={prediction.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold">{prediction.symbol}</h4>
                    <span className="text-sm text-muted-foreground">{prediction.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getTimeframeColor(prediction.timeframe)}>
                      {prediction.timeframe}
                    </Badge>
                    <Badge className={getRiskColor(prediction.risk)}>
                      {prediction.risk.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <div className="text-sm text-muted-foreground">Текущая цена</div>
                  <div className="font-semibold">${prediction.currentPrice}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getDirectionIcon(prediction.direction)}
                    <span className="text-sm">Прогноз</span>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${prediction.predictedPrice}
                    </div>
                    <div className={`text-xs ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Уверенность прогноза:</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={prediction.confidence * 100} className="w-16" />
                    <span className="text-sm font-medium">
                      {(prediction.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <strong>Обоснование:</strong> {prediction.reasoning}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {isMounted && (
                    <span>Обновлено: {new Date(prediction.timestamp).toLocaleString('en-US')}</span>
                  )}
                </div>
                <Button size="sm" variant="outline">
                  Подробнее
                </Button>
              </div>
            </div>
          );
        })}

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
              AI Models Active
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
