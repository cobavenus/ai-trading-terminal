'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, User, TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    action?: string;
    confidence?: number;
    symbol?: string;
    price?: number;
  };
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Здравствуйте! Я ваш AI-ассистент для торгового терминала. Я могу помочь с анализом рынка, рекомендациями по торговле и ответами на ваши вопросы о финансовых инструментах.',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Симуляция ответа AI
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(inputMessage),
        timestamp: new Date(),
        metadata: {
          action: 'analysis',
          confidence: 0.85,
        },
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('анализ') || lowerQuery.includes('анализируй')) {
      return 'На основе анализа рыночных данных, рекомендую обратить внимание на акции технологического сектора. AAPL показывает сильный восходящий тренд с поддержкой на уровне $150. RSI находится в зоне перекупленности (68), что предполагает возможную коррекцию в ближайшие дни.';
    }

    if (lowerQuery.includes('купить') || lowerQuery.includes('продать')) {
      return 'Для принятия решения о покупке/продаже рекомендую учитывать несколько факторов: технический анализ, фундаментальные показатели, новости и общий рыночный sentiment. Могу предоставить детальный анализ конкретного актива.';
    }

    if (lowerQuery.includes('риск') || lowerQuery.includes('риски')) {
      return 'Управление рисками критически важно в торговле. Рекомендую использовать стоп-лосс ордера, диверсифицировать портфель и никогда не инвестировать больше, чем можете позволить себе потерять. Максимальный риск на одну сделку не должен превышать 2-3% от капитала.';
    }

    return 'Интересный вопрос! Для более точного ответа, пожалуйста, уточните: хотите ли вы анализ конкретного актива, рекомендации по стратегии или помощь с управлением рисками?';
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-primary" />
          <CardTitle>AI Trading Assistant</CardTitle>
          <Badge variant="secondary" className="ml-auto">
            <Activity className="w-3 h-3 mr-1" />
            Online
          </Badge>
        </div>
        <CardDescription>
          AI-помощник для анализа рынка и торговых рекомендаций
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-muted'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'assistant' && (
                      <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.content}</p>
                      {message.metadata && (
                        <div className="mt-2 flex items-center space-x-2 text-xs opacity-70">
                          {message.metadata.confidence && (
                            <Badge variant="outline" className="text-xs">
                              Уверенность: {(message.metadata.confidence * 100).toFixed(0)}%
                            </Badge>
                          )}
                          {message.metadata.symbol && (
                            <Badge variant="outline" className="text-xs">
                              {message.metadata.symbol}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                    {message.type === 'user' && (
                      <User className="w-4 h-4 mt-1 flex-shrink-0" />
                    )}
                  </div>
                  {isMounted && (
                    <p className="text-xs opacity-60 mt-2">
                      {message.timestamp.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                      })}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              placeholder="Задайте вопрос о торговле или рынке..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
