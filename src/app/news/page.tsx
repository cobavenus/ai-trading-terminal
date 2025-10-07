'use client';

import { Suspense } from 'react';
import { NewsFeed } from '@/components/trading/news-feed';
import { MarketSentiment } from '@/components/news/market-sentiment';
import { NewsAnalytics } from '@/components/news/news-analytics';
import { TrendingStocks } from '@/components/news/trending-stocks';

export default function NewsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Financial News</h1>
        <p className="text-muted-foreground">
          Stay informed with real-time market news, sentiment analysis, and trending stocks
        </p>
      </div>

      {/* Market Sentiment Overview */}
      <Suspense fallback={<div className="h-32 bg-muted animate-pulse rounded-lg" />}>
        <MarketSentiment />
      </Suspense>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - News Feed */}
        <div className="lg:col-span-2 space-y-8">
          <Suspense fallback={<div className="h-96 bg-muted animate-pulse rounded-lg" />}>
            <NewsFeed />
          </Suspense>
        </div>

        {/* Right Column - Analytics & Trends */}
        <div className="space-y-8">
          <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
            <NewsAnalytics />
          </Suspense>

          <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
            <TrendingStocks />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

