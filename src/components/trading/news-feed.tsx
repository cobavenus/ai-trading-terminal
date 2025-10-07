'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Newspaper, TrendingUp, TrendingDown, Search, Filter, ExternalLink, Clock } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: Date;
  url?: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  impact: 'high' | 'medium' | 'low';
  symbols: string[];
  category: 'market' | 'company' | 'economic' | 'crypto' | 'general';
}

export function NewsFeed() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSentiment, setSelectedSentiment] = useState('all');

  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'Apple представляет новые продукты на WWDC 2024',
      summary: 'Компания Apple анонсировала обновленную линейку продуктов, включая новые модели iPhone и улучшенные сервисы. Акции компании выросли на 2.3% после объявления.',
      source: 'Bloomberg',
      publishedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 минут назад
      url: 'https://example.com/news/1',
      sentiment: 'positive',
      impact: 'high',
      symbols: ['AAPL'],
      category: 'company',
    },
    {
      id: '2',
      title: 'ФРС сохраняет ключевую ставку без изменений',
      summary: 'Федеральная резервная система США решила сохранить текущий уровень процентной ставки. Рынок ожидал возможного снижения ставки.',
      source: 'Reuters',
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 часа назад
      sentiment: 'neutral',
      impact: 'medium',
      symbols: ['SPY', 'QQQ'],
      category: 'economic',
    },
    {
      id: '3',
      title: 'Tesla сообщает о росте поставок электромобилей',
      summary: 'Компания Tesla отчиталась о рекордном квартале по поставкам электромобилей. Аналитики отмечают улучшение производственных показателей.',
      source: 'CNBC',
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 часа назад
      sentiment: 'positive',
      impact: 'high',
      symbols: ['TSLA'],
      category: 'company',
    },
    {
      id: '4',
      title: 'Криптовалютный рынок показывает волатильность',
      summary: 'Биткоин и другие криптовалюты демонстрируют значительные колебания после новостей о регулировании. Инвесторы наблюдают за развитием ситуации.',
      source: 'CoinDesk',
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 часов назад
      sentiment: 'negative',
      impact: 'medium',
      symbols: ['BTC', 'ETH'],
      category: 'crypto',
    },
    {
      id: '5',
      title: 'Инфляция в США превысила ожидания аналитиков',
      summary: 'Опубликованные данные по инфляции оказались выше прогнозов экономистов. Это может повлиять на решения ФРС по монетарной политике.',
      source: 'Wall Street Journal',
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 часов назад
      sentiment: 'negative',
      impact: 'high',
      symbols: ['SPY', 'DIA'],
      category: 'economic',
    },
  ];

  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSentiment = selectedSentiment === 'all' || item.sentiment === selectedSentiment;

    return matchesSearch && matchesCategory && matchesSentiment;
  });

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Newspaper className="w-4 h-4 text-gray-600" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800';
      case 'negative':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'market':
        return 'bg-blue-100 text-blue-800';
      case 'company':
        return 'bg-purple-100 text-purple-800';
      case 'economic':
        return 'bg-green-100 text-green-800';
      case 'crypto':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} мин назад`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} ч назад`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} д назад`;
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Newspaper className="w-5 h-5 text-primary" />
          <CardTitle>Financial News</CardTitle>
        </div>
        <CardDescription>
          Последние новости финансовых рынков и компаний
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Filters */}
        <div className="p-4 border-b space-y-3">
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                placeholder="Поиск новостей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                <SelectItem value="market">Рынок</SelectItem>
                <SelectItem value="company">Компании</SelectItem>
                <SelectItem value="economic">Экономика</SelectItem>
                <SelectItem value="crypto">Крипта</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSentiment} onValueChange={setSelectedSentiment}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все настроения</SelectItem>
                <SelectItem value="positive">Позитивные</SelectItem>
                <SelectItem value="negative">Негативные</SelectItem>
                <SelectItem value="neutral">Нейтральные</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* News List */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {filteredNews.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Newspaper className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Новости не найдены</p>
                <p className="text-sm">Попробуйте изменить фильтры поиска</p>
              </div>
            ) : (
              filteredNews.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        {getSentimentIcon(item.sentiment)}
                        <h4 className="font-semibold text-sm leading-tight">{item.title}</h4>
                      </div>

                      <div className="flex items-center space-x-2 text-xs">
                        <Badge className={getCategoryColor(item.category)}>
                          {item.category}
                        </Badge>
                        <Badge className={getSentimentColor(item.sentiment)}>
                          {item.sentiment}
                        </Badge>
                        <Badge className={getImpactColor(item.impact)}>
                          {item.impact}
                        </Badge>
                      </div>
                    </div>

                    {item.url && (
                      <Button size="sm" variant="ghost" asChild>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </Button>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.summary}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">{item.source}</span>
                      {item.symbols.length > 0 && (
                        <div className="flex space-x-1">
                          {item.symbols.map((symbol) => (
                            <Badge key={symbol} variant="outline" className="text-xs">
                              {symbol}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimeAgo(item.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Показано {filteredNews.length} из {newsItems.length} новостей
            </span>
            <Button variant="outline" size="sm">
              Загрузить еще
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
