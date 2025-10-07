// =============================================================================
// CORE TYPES
// =============================================================================

export interface User {
  id: string;
  name?: string;
  email: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Portfolio {
  id: string;
  userId: string;
  name: string;
  description?: string;
  balance: number;
  currency: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  positions: Position[];
  trades: Trade[];
}

export interface Position {
  id: string;
  portfolioId: string;
  symbol: string;
  quantity: number;
  avgPrice: number;
  currentPrice?: number;
  marketValue?: number;
  pnl?: number;
  pnlPercent?: number;
  side: 'long' | 'short';
  createdAt: Date;
  updatedAt: Date;
}

export interface Trade {
  id: string;
  userId: string;
  portfolioId: string;
  symbol: string;
  side: 'buy' | 'sell';
  quantity: number;
  price: number;
  total: number;
  fees: number;
  type: 'market' | 'limit' | 'stop';
  status: 'pending' | 'executed' | 'cancelled';
  executedAt: Date;
  createdAt: Date;
}

export interface Watchlist {
  id: string;
  userId: string;
  name: string;
  symbols: string[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// =============================================================================
// MARKET DATA TYPES
// =============================================================================

export interface MarketData {
  id: string;
  symbol: string;
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  source: string;
  indicators?: Record<string, any>;
  embedding?: number[];
  createdAt: Date;
}

export interface News {
  id: string;
  title: string;
  content: string;
  summary?: string;
  url?: string;
  publishedAt: Date;
  source: string;
  symbols: string[];
  sentiment?: 'positive' | 'negative' | 'neutral';
  confidence?: number;
  embedding?: number[];
  createdAt: Date;
}

export interface EconomicIndicator {
  id: string;
  name: string;
  value: number;
  unit: string;
  period: string;
  publishedAt: Date;
  source: string;
  createdAt: Date;
}

export interface Quote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  timestamp: Date;
}

// =============================================================================
// AI & RAG TYPES
// =============================================================================

export interface AIInteraction {
  id: string;
  userId: string;
  type: 'chat' | 'analysis' | 'recommendation';
  query: string;
  response: string;
  context?: Record<string, any>;
  sources?: Array<{
    title: string;
    content: string;
    score: number;
  }>;
  confidence?: number;
  accuracy?: number;
  feedback?: string;
  createdAt: Date;
}

export interface AIDocument {
  id: string;
  type: 'research' | 'analysis' | 'strategy';
  title: string;
  content: string;
  metadata?: Record<string, any>;
  embedding: number[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TradingStrategy {
  id: string;
  name: string;
  description: string;
  parameters: Record<string, any>;
  performance?: Record<string, any>;
  aiOptimized: boolean;
  optimizationData?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface AIRecommendation {
  symbol: string;
  action: 'buy' | 'sell' | 'hold';
  confidence: number;
  reasoning: string;
  riskLevel: 'low' | 'medium' | 'high';
  timeframe: string;
  sources: string[];
  timestamp: Date;
}

// =============================================================================
// CHART & VISUALIZATION TYPES
// =============================================================================

export interface ChartData {
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TechnicalIndicator {
  name: string;
  values: number[];
  timestamps: Date[];
  parameters?: Record<string, any>;
}

export interface ChartConfig {
  symbol: string;
  timeframe: string;
  indicators: string[];
  theme: 'light' | 'dark';
  showVolume: boolean;
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// =============================================================================
// FORM TYPES
// =============================================================================

export interface CreatePortfolioForm {
  name: string;
  description?: string;
  balance: number;
  currency: string;
}

export interface CreateTradeForm {
  symbol: string;
  side: 'buy' | 'sell';
  quantity: number;
  price?: number;
  type: 'market' | 'limit' | 'stop';
  portfolioId: string;
}

export interface WatchlistForm {
  name: string;
  symbols: string[];
  isPublic?: boolean;
}

// =============================================================================
// ANALYTICS TYPES
// =============================================================================

export interface PortfolioPerformance {
  portfolioId: string;
  totalReturn: number;
  totalReturnPercent: number;
  dailyReturn: number;
  dailyReturnPercent: number;
  sharpeRatio?: number;
  maxDrawdown: number;
  winRate: number;
  totalTrades: number;
  period: string;
}

export interface MarketAnalysis {
  symbol: string;
  trend: 'bullish' | 'bearish' | 'sideways';
  strength: number;
  support: number;
  resistance: number;
  volume: 'high' | 'medium' | 'low';
  rsi: number;
  macd: {
    value: number;
    signal: number;
    histogram: number;
  };
}

// =============================================================================
// SYSTEM TYPES
// =============================================================================

export interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  timestamp: Date;
}

export interface ApiUsage {
  id: string;
  userId?: string;
  endpoint: string;
  method: string;
  status: number;
  duration: number;
  timestamp: Date;
}

// =============================================================================
// ERROR TYPES
// =============================================================================

export interface AppError {
  code: string;
  message: string;
  details?: Record<string, any>;
  stack?: string;
}

export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'AUTHENTICATION_ERROR'
  | 'AUTHORIZATION_ERROR'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'RATE_LIMIT_EXCEEDED'
  | 'SERVICE_UNAVAILABLE'
  | 'UNKNOWN_ERROR';

// =============================================================================
// WEBSOCKET TYPES
// =============================================================================

export interface WebSocketMessage {
  type: string;
  data: any;
  timestamp: Date;
}

export interface PriceUpdate extends WebSocketMessage {
  type: 'price_update';
  data: {
    symbol: string;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
  };
}

export interface NewsUpdate extends WebSocketMessage {
  type: 'news_update';
  data: News;
}

export interface TradeUpdate extends WebSocketMessage {
  type: 'trade_update';
  data: Trade;
}

