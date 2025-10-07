# AI Trading Terminal

> 🚀 AI-powered trading terminal with RAG system for financial analysis and algorithmic trading

[![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue.svg)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-2.38.0-green.svg)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black.svg)](https://vercel.com/)
[![MLX](https://img.shields.io/badge/MLX-Apple_Metal-orange.svg)](https://github.com/ml-explore/mlx)

## 📋 Описание

AI Trading Terminal - это современная торговая платформа с искусственным интеллектом, предназначенная для анализа финансовых рынков, тестирования торговых стратегий и получения персонализированных рекомендаций. Платформа сочетает в себе мощь больших языковых моделей с локальными вычислениями на Apple Silicon через MLX framework.

## ✨ Основные возможности

### 📊 Реал-тайм торговые графики
- Интерактивные финансовые графики с интеграцией TradingView
- Поддержка множества таймфреймов и индикаторов
- Кастомизация цветов и стилей

### 🤖 AI-анализ с RAG системой
- Контекстуальные торговые рекомендации на основе исторических данных
- Анализ новостей и sentiment analysis с FinBERT
- Локальные MLX модели для приватности данных

### 💼 Бумажная торговля
- Виртуальные торговые счета для тестирования стратегий
- Реалистичное моделирование рыночных условий
- Отслеживание производительности и статистика

### 🌐 Мульти-активная поддержка
- Акции, криптовалюты, форекс и товары
- Интеграция с множеством данных провайдеров
- Реал-тайм котировки и новости

## 🏗️ Архитектура

### Frontend
- **Next.js 14** с App Router
- **TypeScript** для типобезопасности
- **Tailwind CSS + DaisyUI** для стилизации
- **Zustand + Jotai** для управления состоянием

### Backend
- **Supabase** для базы данных и аутентификации
- **PostgreSQL с pgvector** для векторного поиска
- **Prisma ORM** для работы с данными
- **Vercel Edge Functions** для API

### AI & ML
- **OpenAI GPT** для генерации рекомендаций
- **MLX + FinBERT** для локального анализа
- **Metal Performance Shaders** для GPU ускорения
- **RAG система** на базе Supabase pgvector

## 🚀 Быстрый старт

### Предварительные требования

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Apple Silicon Mac** (для локальных MLX моделей)
- **Git** для клонирования репозитория

### Установка

1. **Клонируйте репозиторий**
   ```bash
   git clone https://github.com/your-username/ai-trading-terminal.git
   cd ai-trading-terminal
   ```

2. **Установите зависимости**
   ```bash
   npm install
   ```

3. **Настройте переменные окружения**
   ```bash
   cp .env.example .env.local
   ```

   Заполните `.env.local`:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # OpenAI
   OPENAI_API_KEY=your_openai_api_key

   # Trading Data APIs
   ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key
   POLYGON_API_KEY=your_polygon_key
   MARKETAUX_API_KEY=your_marketaux_key
   FINNHUB_API_KEY=your_finnhub_key

   # NextAuth
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Настройте базу данных**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Запустите приложение**
   ```bash
   npm run dev
   ```

6. **Откройте браузер**
   ```
   http://localhost:3000
   ```

## 📁 Структура проекта

```
ai-trading-terminal/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API маршруты
│   │   ├── components/     # React компоненты
│   │   ├── hooks/         # Кастомные хуки
│   │   ├── lib/           # Утилиты и конфигурация
│   │   └── types/         # TypeScript типы
│   ├── components/        # Переиспользуемые компоненты
│   │   ├── ui/           # Базовые UI компоненты
│   │   ├── trading/      # Торговые компоненты
│   │   ├── ai/          # AI компоненты
│   │   └── layout/      # Компоненты макета
│   ├── services/        # Сервисы и API клиенты
│   ├── utils/          # Вспомогательные функции
│   └── styles/         # Глобальные стили
├── prisma/             # Prisma схема и миграции
├── scripts/           # Скрипты для настройки
├── docs/             # Документация
└── public/          # Статические файлы
```

## 🔧 Конфигурация

### Supabase настройка

1. Создайте проект в [Supabase](https://supabase.com)
2. Включите pgvector расширение в Database > Extensions
3. Создайте таблицы согласно схеме в `prisma/schema.prisma`

### API ключи

Получите бесплатные API ключи:

- [Alpha Vantage](https://www.alphavantage.co/support/#api-key) (500 запросов/день бесплатно)
- [Polygon.io](https://polygon.io) (бесплатный тариф)
- [MarketAux](https://www.marketaux.com) (бесплатный тариф)
- [Finnhub](https://finnhub.io) (60 запросов/минуту бесплатно)

## 🤖 AI возможности

### RAG система

Платформа использует Retrieval-Augmented Generation для контекстуальных рекомендаций:

```typescript
// Пример использования RAG
const recommendation = await aiService.getTradingRecommendation({
  symbol: 'AAPL',
  context: 'technical_analysis',
  userQuery: 'Стоит ли покупать акции Apple?'
});
```

### Локальные модели

Используйте MLX для локального анализа на Apple Silicon:

```python
# Анализ sentiment новостей
from mlx_lm import load

model, tokenizer = load("mlx-community/finbert-sentiment")
sentiment = analyze_financial_sentiment(news_text)
```

## 📈 Торговые функции

### Поддерживаемые активы

- **Акции**: NYSE, NASDAQ, MOEX
- **Криптовалюты**: BTC, ETH, популярные альткоины
- **Форекс**: Основные валютные пары
- **Товары**: Золото, нефть, другие сырьевые активы

### Индикаторы

- **Технические**: RSI, MACD, Bollinger Bands, Moving Averages
- **Фундаментальные**: P/E, EPS, Dividend Yield
- **Кастомные**: Корреляционный анализ, паттерн-распознавание

## 🚀 Деплой

### Vercel (рекомендуется)

1. Подключите репозиторий к [Vercel](https://vercel.com)
2. Настройте переменные окружения
3. Деплой автоматически при пуше в main ветку

```bash
# Установка Vercel CLI
npm i -g vercel

# Деплой
vercel --prod
```

### Другие платформы

Платформа также может быть развернута на:
- **Netlify**
- **Railway**
- **Render**
- **Самостоятельный сервер**

## 📊 Мониторинг и аналитика

- **Vercel Analytics** для отслеживания производительности
- **Supabase Dashboard** для мониторинга базы данных
- **Custom метрики** для торговых операций

## 🔒 Безопасность

- **NextAuth.js** для аутентификации
- **Supabase RLS** для безопасности данных
- **Rate limiting** на API эндпоинты
- **Input validation** с Zod схемами

## 🧪 Тестирование

```bash
# Запуск тестов
npm test

# Тесты в режиме наблюдения
npm run test:watch

# Проверка типов
npm run type-check
```

## 🤝 Разработка

### Рабочий процесс

1. Создайте ветку для новой функциональности
2. Напишите тесты
3. Реализуйте функциональность
4. Запустите линтер и тесты
5. Создайте Pull Request

### Code Style

- **ESLint** + **Prettier** для форматирования кода
- **TypeScript** strict режим
- **Conventional Commits** для сообщений коммитов

## 📚 Дополнительная документация

- [API документация](./docs/api/README.md)
- [Руководство по деплою](./docs/deployment/README.md)
- [Руководство разработчика](./docs/development/README.md)
- [Архитектурные решения](./docs/ARCHITECTURE.md)

## 💰 Стоимость

### Бесплатный тариф
- **Vercel**: 100GB bandwidth, 6000 мин build time
- **Supabase**: 500MB база, 2GB bandwidth
- **OpenAI**: $5/месяц на API вызовы

### Масштабирование
- **Vercel Pro**: $20/месяц
- **Supabase Pro**: $25/месяц
- **Дополнительные API**: по мере использования

## 🆘 Поддержка

- **Документация**: [Wiki проекта](https://github.com/your-username/ai-trading-terminal/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-username/ai-trading-terminal/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/ai-trading-terminal/discussions)

## 📄 Лицензия

Этот проект лицензирован под MIT License - см. [LICENSE](LICENSE) файл для подробностей.

## 🙏 Благодарности

- [Next.js](https://nextjs.org/) за фреймворк
- [Supabase](https://supabase.com/) за backend и базу данных
- [TradingView](https://www.tradingview.com/) за графики
- [MLX](https://github.com/ml-explore/mlx) за локальные AI модели
- [OpenAI](https://openai.com/) за AI возможности

---

⭐ **Не забудьте поставить звездочку проекту, если он вам понравился!**

