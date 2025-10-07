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
import { Bell, Smartphone, Mail, MessageSquare, Save, AlertTriangle, TrendingUp } from 'lucide-react';

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    priceAlerts: true,
    volumeAlerts: true,
    newsAlerts: true,
    aiInsights: true,
    portfolioUpdates: false,
    marketOpen: true,
    marketClose: false,
    emailFrequency: 'immediate',
    soundEnabled: true,
    vibrationEnabled: true,
    quietHours: false,
    quietStart: '22:00',
    quietEnd: '08:00',
  });

  const handleSave = () => {
    // Здесь будет логика сохранения настроек
    console.log('Saving notification settings:', settings);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-primary" />
          <CardTitle>Настройки уведомлений</CardTitle>
        </div>
        <CardDescription>
          Управление уведомлениями и оповещениями системы
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Notification Channels */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4" />
            <h4 className="font-semibold text-sm">Каналы уведомлений</h4>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div className="space-y-0.5">
                  <Label>Email уведомления</Label>
                  <div className="text-sm text-muted-foreground">
                    Получать уведомления на электронную почту
                  </div>
                </div>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Smartphone className="w-4 h-4 text-muted-foreground" />
                <div className="space-y-0.5">
                  <Label>Push уведомления</Label>
                  <div className="text-sm text-muted-foreground">
                    Уведомления в браузере и мобильном приложении
                  </div>
                </div>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, pushNotifications: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                <div className="space-y-0.5">
                  <Label>SMS уведомления</Label>
                  <div className="text-sm text-muted-foreground">
                    Критически важные уведомления по SMS
                  </div>
                </div>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, smsNotifications: checked }))}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Alert Types */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <h4 className="font-semibold text-sm">Типы уведомлений</h4>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Уведомления о ценах</Label>
                <div className="text-sm text-muted-foreground">
                  Оповещения при достижении целевых цен
                </div>
              </div>
              <Switch
                checked={settings.priceAlerts}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, priceAlerts: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Уведомления об объемах</Label>
                <div className="text-sm text-muted-foreground">
                  Оповещения о необычном объеме торгов
                </div>
              </div>
              <Switch
                checked={settings.volumeAlerts}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, volumeAlerts: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Новости и события</Label>
                <div className="text-sm text-muted-foreground">
                  Важные новости и корпоративные события
                </div>
              </div>
              <Switch
                checked={settings.newsAlerts}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, newsAlerts: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>AI Insights</Label>
                <div className="text-sm text-muted-foreground">
                  Важные insights от искусственного интеллекта
                </div>
              </div>
              <Switch
                checked={settings.aiInsights}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, aiInsights: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Обновления портфеля</Label>
                <div className="text-sm text-muted-foreground">
                  Изменения в вашем инвестиционном портфеле
                </div>
              </div>
              <Switch
                checked={settings.portfolioUpdates}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, portfolioUpdates: checked }))}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Market Events */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <h4 className="font-semibold text-sm">Рыночные события</h4>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Открытие рынка</Label>
                <div className="text-sm text-muted-foreground">
                  Уведомление об открытии торговой сессии
                </div>
              </div>
              <Switch
                checked={settings.marketOpen}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, marketOpen: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Закрытие рынка</Label>
                <div className="text-sm text-muted-foreground">
                  Уведомление о закрытии торговой сессии
                </div>
              </div>
              <Switch
                checked={settings.marketClose}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, marketClose: checked }))}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Email Settings */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <h4 className="font-semibold text-sm">Настройки email</h4>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emailFrequency">Частота уведомлений</Label>
            <Select value={settings.emailFrequency} onValueChange={(value) => setSettings(prev => ({ ...prev, emailFrequency: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Мгновенно</SelectItem>
                <SelectItem value="hourly">Каждый час</SelectItem>
                <SelectItem value="daily">Ежедневно</SelectItem>
                <SelectItem value="weekly">Еженедельно</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* Sound & Vibration */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <h4 className="font-semibold text-sm">Звук и вибрация</h4>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Звуковые уведомления</Label>
                <div className="text-sm text-muted-foreground">
                  Включить звуковые сигналы для уведомлений
                </div>
              </div>
              <Switch
                checked={settings.soundEnabled}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, soundEnabled: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Вибрация</Label>
                <div className="text-sm text-muted-foreground">
                  Вибрация при уведомлениях на мобильных устройствах
                </div>
              </div>
              <Switch
                checked={settings.vibrationEnabled}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, vibrationEnabled: checked }))}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Quiet Hours */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <div className="space-y-0.5">
                <Label>Тихие часы</Label>
                <div className="text-sm text-muted-foreground">
                  Отключить уведомления в указанное время
                </div>
              </div>
            </div>
            <Switch
              checked={settings.quietHours}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, quietHours: checked }))}
            />
          </div>

          {settings.quietHours && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quietStart">Начало</Label>
                <Input
                  id="quietStart"
                  type="time"
                  value={settings.quietStart}
                  onChange={(e) => setSettings(prev => ({ ...prev, quietStart: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quietEnd">Конец</Label>
                <Input
                  id="quietEnd"
                  type="time"
                  value={settings.quietEnd}
                  onChange={(e) => setSettings(prev => ({ ...prev, quietEnd: e.target.value }))}
                />
              </div>
            </div>
          )}
        </div>

        <div className="pt-4">
          <Button onClick={handleSave} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Сохранить настройки уведомлений
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
