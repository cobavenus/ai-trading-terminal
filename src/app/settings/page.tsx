'use client';

import { Suspense } from 'react';
import { UserSettings } from '@/components/settings/user-settings';
import { TradingSettings } from '@/components/settings/trading-settings';
import { AISettings } from '@/components/settings/ai-settings';
import { NotificationSettings } from '@/components/settings/notification-settings';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Customize your trading experience and manage your preferences
        </p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - User & Trading Settings */}
        <div className="space-y-8">
          <Suspense fallback={<div className="h-80 bg-muted animate-pulse rounded-lg" />}>
            <UserSettings />
          </Suspense>

          <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
            <TradingSettings />
          </Suspense>
        </div>

        {/* Right Column - AI & Notifications */}
        <div className="space-y-8">
          <Suspense fallback={<div className="h-80 bg-muted animate-pulse rounded-lg" />}>
            <AISettings />
          </Suspense>

          <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
            <NotificationSettings />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

