import { Suspense } from 'react';
import { TradingDashboard } from '@/components/trading/dashboard';
import { MarketOverview } from '@/components/trading/market-overview';
import { NewsFeed } from '@/components/trading/news-feed';
import { AIAssistant } from '@/components/ai/ai-assistant';
import { PortfolioSummary } from '@/components/trading/portfolio-summary';
import { WatchlistPanel } from '@/components/trading/watchlist-panel';

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          AI Trading Terminal
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Advanced trading platform with AI-powered analysis, real-time market data,
          and intelligent investment recommendations.
        </p>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Portfolio & Trading */}
        <div className="lg:col-span-2 space-y-8">
          <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
            <PortfolioSummary />
          </Suspense>

          <Suspense fallback={<div className="h-96 bg-muted animate-pulse rounded-lg" />}>
            <TradingDashboard />
          </Suspense>

          <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
            <WatchlistPanel />
          </Suspense>
        </div>

        {/* Right Column - Market & AI */}
        <div className="space-y-8">
          <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
            <MarketOverview />
          </Suspense>

          <Suspense fallback={<div className="h-96 bg-muted animate-pulse rounded-lg" />}>
            <NewsFeed />
          </Suspense>

          <Suspense fallback={<div className="h-80 bg-muted animate-pulse rounded-lg" />}>
            <AIAssistant />
          </Suspense>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Trading Tools</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need for successful trading, from real-time charts to AI-powered insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
              📊
            </div>
            <h3 className="font-semibold">Real-time Charts</h3>
            <p className="text-sm text-muted-foreground">
              Interactive TradingView charts with technical indicators and drawing tools.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
              🤖
            </div>
            <h3 className="font-semibold">AI Analysis</h3>
            <p className="text-sm text-muted-foreground">
              RAG-powered recommendations based on market data and news sentiment.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
              💼
            </div>
            <h3 className="font-semibold">Paper Trading</h3>
            <p className="text-sm text-muted-foreground">
              Practice trading with virtual money and test your strategies risk-free.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
              📱
            </div>
            <h3 className="font-semibold">Mobile Ready</h3>
            <p className="text-sm text-muted-foreground">
              Fully responsive design works perfectly on all devices and screen sizes.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-muted/50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Trading?</h2>
        <p className="text-muted-foreground mb-6">
          Join thousands of traders using AI-powered insights to make better investment decisions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Get Started Free
          </button>
          <button className="border border-border px-6 py-3 rounded-lg font-medium hover:bg-accent transition-colors">
            View Demo
          </button>
        </div>
      </div>
    </div>
  );
}

