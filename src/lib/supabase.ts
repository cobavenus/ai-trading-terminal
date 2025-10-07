import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// =============================================================================
// AUTHENTICATION HELPERS
// =============================================================================

export const auth = {
  // Sign up a new user
  signUp: async (email: string, password: string, metadata?: { name?: string }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    return { data, error };
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  // Get current user
  getUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    return { data, error };
  },

  // Get current session
  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    return { data, error };
  },
};

// =============================================================================
// PORTFOLIO HELPERS
// =============================================================================

export const portfolio: any = {
  // Get user's portfolios
  getPortfolios: async (userId: string) => {
    const { data, error } = await supabase
      .from('portfolios')
      .select(`
        *,
        positions (*),
        trades (*)
      `)
      .eq('user_id', userId)
      .eq('is_active', true);

    return { data, error };
  },

  // Create new portfolio
  createPortfolio: async (portfolioData: {
    user_id: string;
    name: string;
    description?: string;
    balance?: number;
    currency?: string;
  }) => {
    const { data, error } = await supabase
      .from('portfolios')
      .insert(portfolioData)
      .select()
      .single();

    return { data, error };
  },

  // Update portfolio
  updatePortfolio: async (id: string, updates: Partial<typeof portfolio>) => {
    const { data, error } = await supabase
      .from('portfolios')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },
};

// =============================================================================
// TRADING HELPERS
// =============================================================================

export const trading = {
  // Get positions for a portfolio
  getPositions: async (portfolioId: string) => {
    const { data, error } = await supabase
      .from('positions')
      .select('*')
      .eq('portfolio_id', portfolioId);

    return { data, error };
  },

  // Create new position
  createPosition: async (positionData: {
    portfolio_id: string;
    symbol: string;
    quantity: number;
    avg_price: number;
    side: 'long' | 'short';
  }) => {
    const { data, error } = await supabase
      .from('positions')
      .insert(positionData)
      .select()
      .single();

    return { data, error };
  },

  // Create new trade
  createTrade: async (tradeData: {
    user_id: string;
    portfolio_id: string;
    symbol: string;
    side: 'buy' | 'sell';
    quantity: number;
    price: number;
    total: number;
    fees?: number;
    type?: 'market' | 'limit' | 'stop';
  }) => {
    const { data, error } = await supabase
      .from('trades')
      .insert(tradeData)
      .select()
      .single();

    return { data, error };
  },

  // Get trades for a portfolio
  getTrades: async (portfolioId: string, limit = 50) => {
    const { data, error } = await supabase
      .from('trades')
      .select('*')
      .eq('portfolio_id', portfolioId)
      .order('created_at', { ascending: false })
      .limit(limit);

    return { data, error };
  },
};

// =============================================================================
// MARKET DATA HELPERS
// =============================================================================

export const marketData = {
  // Get latest market data for symbols
  getLatestData: async (symbols: string[], limit = 100) => {
    const { data, error } = await supabase
      .from('market_data')
      .select('*')
      .in('symbol', symbols)
      .order('timestamp', { ascending: false })
      .limit(limit);

    return { data, error };
  },

  // Get historical data for a symbol
  getHistoricalData: async (
    symbol: string,
    startDate: Date,
    endDate: Date,
    limit = 1000
  ) => {
    const { data, error } = await supabase
      .from('market_data')
      .select('*')
      .eq('symbol', symbol)
      .gte('timestamp', startDate.toISOString())
      .lte('timestamp', endDate.toISOString())
      .order('timestamp', { ascending: false })
      .limit(limit);

    return { data, error };
  },

  // Search similar documents using vector similarity
  searchSimilar: async (query: string, limit = 5) => {
    // TODO: Implement vector similarity search
    // This would require a proper vector database setup
    return { data: [], error: null };
  },
};

// =============================================================================
// AI & RAG HELPERS
// =============================================================================

export const ai = {
  // Get AI interactions for a user
  getInteractions: async (userId: string, type?: string, limit = 50) => {
    let query = supabase
      .from('ai_interactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (type) {
      query = query.eq('type', type);
    }

    const { data, error } = await query;
    return { data, error };
  },

  // Create new AI interaction
  createInteraction: async (interactionData: {
    user_id: string;
    type: 'chat' | 'analysis' | 'recommendation';
    query: string;
    response: string;
    context?: Record<string, any>;
    sources?: Array<{ title: string; content: string; score: number }>;
    confidence?: number;
  }) => {
    const { data, error } = await supabase
      .from('ai_interactions')
      .insert(interactionData)
      .select()
      .single();

    return { data, error };
  },

  // Get trading recommendations for a symbol
  getRecommendations: async (symbol: string, limit = 10) => {
    const { data, error } = await supabase
      .from('ai_interactions')
      .select('*')
      .eq('type', 'recommendation')
      .contains('context', { symbol })
      .order('created_at', { ascending: false })
      .limit(limit);

    return { data, error };
  },
};

// =============================================================================
// NEWS & SENTIMENT HELPERS
// =============================================================================

export const news = {
  // Get latest news
  getLatestNews: async (symbols?: string[], limit = 20) => {
    let query = supabase
      .from('news')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(limit);

    if (symbols && symbols.length > 0) {
      query = query.overlaps('symbols', symbols);
    }

    const { data, error } = await query;
    return { data, error };
  },

  // Get news by sentiment
  getNewsBySentiment: async (
    sentiment: 'positive' | 'negative' | 'neutral',
    limit = 20
  ) => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('sentiment', sentiment)
      .order('published_at', { ascending: false })
      .limit(limit);

    return { data, error };
  },

  // Search news using vector similarity
  searchNews: async (query: string, limit = 10) => {
    // TODO: Implement vector similarity search for news
    // This would require a proper vector database setup
    return { data: [], error: null };
  },
};

// =============================================================================
// WATCHLIST HELPERS
// =============================================================================

export const watchlist = {
  // Get user's watchlists
  getWatchlists: async (userId: string) => {
    const { data, error } = await supabase
      .from('watchlists')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    return { data, error };
  },

  // Create new watchlist
  createWatchlist: async (watchlistData: {
    user_id: string;
    name: string;
    symbols: string[];
    is_public?: boolean;
  }) => {
    const { data, error } = await supabase
      .from('watchlists')
      .insert(watchlistData)
      .select()
      .single();

    return { data, error };
  },

  // Update watchlist
  updateWatchlist: async (id: string, updates: { name?: string; symbols?: string[]; isPublic?: boolean }) => {
    const { data, error } = await supabase
      .from('watchlists')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },
};

// =============================================================================
// REAL-TIME SUBSCRIPTIONS
// =============================================================================

export const realtime = {
  // Subscribe to price updates for symbols
  subscribeToPrices: (symbols: string[], callback: (payload: any) => void) => {
    const channel = supabase
      .channel('price_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'market_data',
          filter: `symbol=in.(${symbols.join(',')})`,
        },
        callback
      )
      .subscribe();

    return channel;
  },

  // Subscribe to news updates
  subscribeToNews: (callback: (payload: any) => void) => {
    const channel = supabase
      .channel('news_updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'news',
        },
        callback
      )
      .subscribe();

    return channel;
  },

  // Subscribe to portfolio updates
  subscribeToPortfolio: (portfolioId: string, callback: (payload: any) => void) => {
    const channel = supabase
      .channel(`portfolio_${portfolioId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'trades',
          filter: `portfolio_id=eq.${portfolioId}`,
        },
        callback
      )
      .subscribe();

    return channel;
  },
};

