'use client';

import { Suspense } from 'react';
import { TradingDashboard } from '@/components/trading/dashboard';
import { MarketOverview } from '@/components/trading/market-overview';
import { WatchlistPanel } from '@/components/trading/watchlist-panel';

export default function TradingPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Trading Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time market data, advanced charting, and trading tools
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Trading Charts & Tools */}
        <div className="lg:col-span-2 space-y-8">
          <Suspense fallback={<div className="h-96 bg-muted animate-pulse rounded-lg" />}>
            <TradingDashboard />
          </Suspense>
        </div>

        {/* Right Column - Market Data & Watchlist */}
        <div className="space-y-8">
          <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
            <MarketOverview />
          </Suspense>

          <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
            <WatchlistPanel />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

