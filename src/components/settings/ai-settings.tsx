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
import { Brain, Zap, Target, Save, Settings, Bot, Bell } from 'lucide-react';

export function AISettings() {
  const [settings, setSettings] = useState({
    enableAIAssistant: true,
    enableMarketAnalysis: true,
    enableSentimentAnalysis: true,
    enableRiskAssessment: true,
    aiModel: 'gpt-3.5-turbo',
    maxTokens: 2000,
    temperature: 0.7,
    autoRefresh: true,
    refreshInterval: 30,
    enableNotifications: true,
    confidenceThreshold: 0.75,
    enableRAG: true,
    ragDocuments: 100,
  });

  const handleSave = () => {
    // Здесь будет логика сохранения настроек
    console.log('Saving AI settings:', settings);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-primary" />
          <CardTitle>Настройки ИИ</CardTitle>
        </div>
        <CardDescription>
          Конфигурация AI-функций и моделей машинного обучения
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* AI Features */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Bot className="w-4 h-4" />
            <h4 className="font-semibold text-sm">Функции ИИ</h4>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>AI Ассистент</Label>
                <div className="text-sm text-muted-foreground">
                  Включить персонального AI-помощника для вопросов
                </div>
              </div>
              <Switch
                checked={settings.enableAIAssistant}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableAIAssistant: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Анализ рынка</Label>
                <div className="text-sm text-muted-foreground">
                  Автоматический анализ рыночных тенденций
                </div>
              </div>
              <Switch
                checked={settings.enableMarketAnalysis}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableMarketAnalysis: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Анализ настроений</Label>
                <div className="text-sm text-muted-foreground">
                  Анализ новостей и социального сентимента
                </div>
              </div>
              <Switch
                checked={settings.enableSentimentAnalysis}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableSentimentAnalysis: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Оценка рисков</Label>
                <div className="text-sm text-muted-foreground">
                  Автоматическая оценка рисков портфеля
                </div>
              </div>
              <Switch
                checked={settings.enableRiskAssessment}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableRiskAssessment: checked }))}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* AI Model Settings */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <h4 className="font-semibold text-sm">Модель ИИ</h4>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="aiModel">Модель</Label>
              <Select value={settings.aiModel} onValueChange={(value) => setSettings(prev => ({ ...prev, aiModel: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                  <SelectItem value="claude-3">Claude 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxTokens">Максимум токенов</Label>
              <Input
                id="maxTokens"
                type="number"
                value={settings.maxTokens}
                onChange={(e) => setSettings(prev => ({ ...prev, maxTokens: parseInt(e.target.value) || 0 }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="temperature">Температура (креативность)</Label>
            <Input
              id="temperature"
              type="number"
              min="0"
              max="1"
              step="0.1"
              value={settings.temperature}
              onChange={(e) => setSettings(prev => ({ ...prev, temperature: parseFloat(e.target.value) || 0 }))}
            />
          </div>
        </div>

        <Separator />

        {/* RAG Settings */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <h4 className="font-semibold text-sm">RAG Система</h4>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Включить RAG</Label>
                <div className="text-sm text-muted-foreground">
                  Использовать retrieval-augmented generation
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.enableRAG}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableRAG: checked }))}
                />
                {settings.enableRAG && (
                  <Badge variant="secondary" className="text-xs">
                    Активно
                  </Badge>
                )}
              </div>
            </div>

            {settings.enableRAG && (
              <div className="space-y-2">
                <Label htmlFor="ragDocuments">Количество документов</Label>
                <Input
                  id="ragDocuments"
                  type="number"
                  value={settings.ragDocuments}
                  onChange={(e) => setSettings(prev => ({ ...prev, ragDocuments: parseInt(e.target.value) || 0 }))}
                />
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Update Settings */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <h4 className="font-semibold text-sm">Обновления</h4>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Автообновление</Label>
                <div className="text-sm text-muted-foreground">
                  Автоматически обновлять данные
                </div>
              </div>
              <Switch
                checked={settings.autoRefresh}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoRefresh: checked }))}
              />
            </div>

            {settings.autoRefresh && (
              <div className="space-y-2">
                <Label htmlFor="refreshInterval">Интервал обновления (сек)</Label>
                <Input
                  id="refreshInterval"
                  type="number"
                  value={settings.refreshInterval}
                  onChange={(e) => setSettings(prev => ({ ...prev, refreshInterval: parseInt(e.target.value) || 0 }))}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="confidenceThreshold">Порог уверенности</Label>
              <Input
                id="confidenceThreshold"
                type="number"
                min="0"
                max="1"
                step="0.05"
                value={settings.confidenceThreshold}
                onChange={(e) => setSettings(prev => ({ ...prev, confidenceThreshold: parseFloat(e.target.value) || 0 }))}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Notifications */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <h4 className="font-semibold text-sm">Уведомления ИИ</h4>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Уведомления о insights</Label>
              <div className="text-sm text-muted-foreground">
                Получать уведомления о важных AI insights
              </div>
            </div>
            <Switch
              checked={settings.enableNotifications}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableNotifications: checked }))}
            />
          </div>
        </div>

        <div className="pt-4">
          <Button onClick={handleSave} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Сохранить настройки ИИ
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
