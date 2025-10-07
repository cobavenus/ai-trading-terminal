'use client';

import { Suspense } from 'react';
import { AIAssistant } from '@/components/ai/ai-assistant';
import { AIInsights } from '@/components/ai/ai-insights';
import { AIAnalytics } from '@/components/ai/ai-analytics';
import { MarketPredictions } from '@/components/ai/market-predictions';

export default function AIPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">AI Trading Assistant</h1>
        <p className="text-muted-foreground">
          Get intelligent market insights, trading recommendations, and AI-powered analysis
        </p>
      </div>

      {/* AI Assistant Chat */}
      <Suspense fallback={<div className="h-96 bg-muted animate-pulse rounded-lg" />}>
        <AIAssistant />
      </Suspense>

      {/* AI Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - AI Insights */}
        <div className="space-y-8">
          <Suspense fallback={<div className="h-80 bg-muted animate-pulse rounded-lg" />}>
            <AIInsights />
          </Suspense>

          <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
            <MarketPredictions />
          </Suspense>
        </div>

        {/* Right Column - AI Analytics */}
        <div className="space-y-8">
          <Suspense fallback={<div className="h-96 bg-muted animate-pulse rounded-lg" />}>
            <AIAnalytics />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

