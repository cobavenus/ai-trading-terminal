'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign, AlertTriangle, Target, Save, Settings, BarChart3, Bell } from 'lucide-react';

export function TradingSettings() {
  const [settings, setSettings] = useState({
    defaultOrderType: 'market',
    maxPositionSize: 10000,
    stopLossPercentage: 5,
    takeProfitPercentage: 10,
    autoStopLoss: true,
    autoTakeProfit: true,
    riskWarning: true,
    confirmLargeOrders: true,
    enableTrailingStop: false,
    defaultTimeframe: '1D',
    showVolumeProfile: true,
    enableAlerts: true,
    alertPriceChange: 2,
    alertVolumeSpike: 50,
  });

  const handleSave = () => {
    // Здесь будет логика сохранения настроек
    console.log('Saving trading settings:', settings);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <CardTitle>Настройки торговли</CardTitle>
        </div>
        <CardDescription>
          Конфигурация торговых параметров и автоматизации
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Order Settings */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <h4 className="font-semibold text-sm">Настройки ордеров</h4>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="orderType">Тип ордера по умолчанию</Label>
              <Select value={settings.defaultOrderType} onValueChange={(value) => setSettings(prev => ({ ...prev, defaultOrderType: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market">Рыночный</SelectItem>
                  <SelectItem value="limit">Лимитный</SelectItem>
                  <SelectItem value="stop">Стоп-ордер</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxPosition">Максимальный размер позиции ($)</Label>
              <Input
                id="maxPosition"
                type="number"
                value={settings.maxPositionSize}
                onChange={(e) => setSettings(prev => ({ ...prev, maxPositionSize: parseInt(e.target.value) || 0 }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stopLoss">Стоп-лосс (%)</Label>
              <Input
                id="stopLoss"
                type="number"
                value={settings.stopLossPercentage}
                onChange={(e) => setSettings(prev => ({ ...prev, stopLossPercentage: parseInt(e.target.value) || 0 }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="takeProfit">Тейк-профит (%)</Label>
              <Input
                id="takeProfit"
                type="number"
                value={settings.takeProfitPercentage}
                onChange={(e) => setSettings(prev => ({ ...prev, takeProfitPercentage: parseInt(e.target.value) || 0 }))}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Automation */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <h4 className="font-semibold text-sm">Автоматизация</h4>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Автоматический стоп-лосс</Label>
                <div className="text-sm text-muted-foreground">
                  Автоматически размещать стоп-лосс ордера
                </div>
              </div>
              <Switch
                checked={settings.autoStopLoss}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoStopLoss: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Автоматический тейк-профит</Label>
                <div className="text-sm text-muted-foreground">
                  Автоматически размещать тейк-профит ордера
                </div>
              </div>
              <Switch
                checked={settings.autoTakeProfit}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoTakeProfit: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Трейлинг-стоп</Label>
                <div className="text-sm text-muted-foreground">
                  Автоматически следовать за ценой
                </div>
              </div>
              <Switch
                checked={settings.enableTrailingStop}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableTrailingStop: checked }))}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Safety */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <h4 className="font-semibold text-sm">Безопасность</h4>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Предупреждения о рисках</Label>
                <div className="text-sm text-muted-foreground">
                  Показывать предупреждения перед торговлей
                </div>
              </div>
              <Switch
                checked={settings.riskWarning}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, riskWarning: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Подтверждение крупных ордеров</Label>
                <div className="text-sm text-muted-foreground">
                  Запрашивать подтверждение для ордеров &gt; $10,000
                </div>
              </div>
              <Switch
                checked={settings.confirmLargeOrders}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, confirmLargeOrders: checked }))}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Chart Settings */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <h4 className="font-semibold text-sm">Настройки графиков</h4>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timeframe">Таймфрейм по умолчанию</Label>
              <Select value={settings.defaultTimeframe} onValueChange={(value) => setSettings(prev => ({ ...prev, defaultTimeframe: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1 минута</SelectItem>
                  <SelectItem value="5m">5 минут</SelectItem>
                  <SelectItem value="15m">15 минут</SelectItem>
                  <SelectItem value="1h">1 час</SelectItem>
                  <SelectItem value="4h">4 часа</SelectItem>
                  <SelectItem value="1D">1 день</SelectItem>
                  <SelectItem value="1W">1 неделя</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="volumeProfile">Профиль объема</Label>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Показывать профиль объема</span>
                <Switch
                  checked={settings.showVolumeProfile}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, showVolumeProfile: checked }))}
                />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Alerts */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <h4 className="font-semibold text-sm">Уведомления</h4>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Уведомления о ценах</Label>
                <div className="text-sm text-muted-foreground">
                  Получать уведомления при изменении цен
                </div>
              </div>
              <Switch
                checked={settings.enableAlerts}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableAlerts: checked }))}
              />
            </div>

            {settings.enableAlerts && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priceChange">Изменение цены (%)</Label>
                  <Input
                    id="priceChange"
                    type="number"
                    value={settings.alertPriceChange}
                    onChange={(e) => setSettings(prev => ({ ...prev, alertPriceChange: parseInt(e.target.value) || 0 }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="volumeSpike">Спайк объема (%)</Label>
                  <Input
                    id="volumeSpike"
                    type="number"
                    value={settings.alertVolumeSpike}
                    onChange={(e) => setSettings(prev => ({ ...prev, alertVolumeSpike: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4">
          <Button onClick={handleSave} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Сохранить настройки
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
