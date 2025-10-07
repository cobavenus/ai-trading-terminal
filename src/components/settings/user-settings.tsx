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
import { User, Bell, Shield, Palette, Globe, Save } from 'lucide-react';

export function UserSettings() {
  const [settings, setSettings] = useState({
    name: 'Иван Петров',
    email: 'ivan@example.com',
    timezone: 'Europe/Moscow',
    language: 'ru',
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    autoSave: true,
    twoFactorAuth: false,
  });

  const handleSave = () => {
    // Здесь будет логика сохранения настроек
    console.log('Saving settings:', settings);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-primary" />
          <CardTitle>Настройки профиля</CardTitle>
        </div>
        <CardDescription>
          Управление личной информацией и предпочтениями
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm">Личная информация</h4>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                value={settings.name}
                onChange={(e) => setSettings(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timezone">Часовой пояс</Label>
              <Select value={settings.timezone} onValueChange={(value) => setSettings(prev => ({ ...prev, timezone: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Moscow">Москва (UTC+3)</SelectItem>
                  <SelectItem value="Europe/London">Лондон (UTC+0)</SelectItem>
                  <SelectItem value="America/New_York">Нью-Йорк (UTC-5)</SelectItem>
                  <SelectItem value="Asia/Tokyo">Токио (UTC+9)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Язык</Label>
              <Select value={settings.language} onValueChange={(value) => setSettings(prev => ({ ...prev, language: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ru">Русский</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        {/* Notifications */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <h4 className="font-semibold text-sm">Уведомления</h4>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email уведомления</Label>
                <div className="text-sm text-muted-foreground">
                  Получать уведомления о важных событиях на email
                </div>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push уведомления</Label>
                <div className="text-sm text-muted-foreground">
                  Получать уведомления в браузере
                </div>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, pushNotifications: checked }))}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Appearance */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Palette className="w-4 h-4" />
            <h4 className="font-semibold text-sm">Внешний вид</h4>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Темная тема</Label>
              <div className="text-sm text-muted-foreground">
                Использовать темную цветовую схему
              </div>
            </div>
            <Switch
              checked={settings.darkMode}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, darkMode: checked }))}
            />
          </div>
        </div>

        <Separator />

        {/* Privacy & Security */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <h4 className="font-semibold text-sm">Безопасность</h4>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Автосохранение</Label>
                <div className="text-sm text-muted-foreground">
                  Автоматически сохранять изменения
                </div>
              </div>
              <Switch
                checked={settings.autoSave}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoSave: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Двухфакторная аутентификация</Label>
                <div className="text-sm text-muted-foreground">
                  Дополнительный уровень защиты аккаунта
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, twoFactorAuth: checked }))}
                />
                {settings.twoFactorAuth && (
                  <Badge variant="secondary" className="text-xs">
                    Включено
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Account Status */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <h4 className="font-semibold text-sm">Статус аккаунта</h4>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-lg font-bold text-green-600">Активен</div>
              <div className="text-xs text-muted-foreground">Статус</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-lg font-bold text-blue-600">Премиум</div>
              <div className="text-xs text-muted-foreground">План</div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button onClick={handleSave} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Сохранить изменения
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
