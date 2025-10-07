'use client';

import { Suspense } from 'react';
import { PortfolioSummary } from '@/components/trading/portfolio-summary';
import { PortfolioManager } from '@/components/trading/portfolio-manager';
import { TradeHistory } from '@/components/trading/trade-history';
import { PerformanceChart } from '@/components/trading/performance-chart';

export default function PortfolioPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Portfolio Management</h1>
        <p className="text-muted-foreground">
          Track your investments, manage positions, and analyze performance
        </p>
      </div>

      {/* Portfolio Overview */}
      <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
        <PortfolioSummary />
      </Suspense>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Portfolio Management */}
        <div className="space-y-8">
          <Suspense fallback={<div className="h-80 bg-muted animate-pulse rounded-lg" />}>
            <PortfolioManager />
          </Suspense>

          <Suspense fallback={<div className="h-96 bg-muted animate-pulse rounded-lg" />}>
            <PerformanceChart />
          </Suspense>
        </div>

        {/* Right Column - Trade History & Analytics */}
        <div className="space-y-8">
          <Suspense fallback={<div className="h-96 bg-muted animate-pulse rounded-lg" />}>
            <TradeHistory />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

