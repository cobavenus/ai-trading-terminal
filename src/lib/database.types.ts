export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          id: string
          user_id: string
          type: string
          provider: string
          provider_account_id: string
          refresh_token: string | null
          access_token: string | null
          expires_at: number | null
          token_type: string | null
          scope: string | null
          id_token: string | null
          session_state: string | null
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          provider: string
          provider_account_id: string
          refresh_token?: string | null
          access_token?: string | null
          expires_at?: number | null
          token_type?: string | null
          scope?: string | null
          id_token?: string | null
          session_state?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          provider?: string
          provider_account_id?: string
          refresh_token?: string | null
          access_token?: string | null
          expires_at?: number | null
          token_type?: string | null
          scope?: string | null
          id_token?: string | null
          session_state?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      ai_documents: {
        Row: {
          id: string
          type: string
          title: string
          content: string
          metadata: Json | null
          embedding: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          type: string
          title: string
          content: string
          metadata?: Json | null
          embedding?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          type?: string
          title?: string
          content?: string
          metadata?: Json | null
          embedding?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      ai_interactions: {
        Row: {
          id: string
          user_id: string
          type: string
          query: string
          response: string
          context: Json | null
          sources: Json | null
          confidence: number | null
          accuracy: number | null
          feedback: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          query: string
          response: string
          context?: Json | null
          sources?: Json | null
          confidence?: number | null
          accuracy?: number | null
          feedback?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          query?: string
          response?: string
          context?: Json | null
          sources?: Json | null
          confidence?: number | null
          accuracy?: number | null
          feedback?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      api_usage: {
        Row: {
          id: string
          user_id: string | null
          endpoint: string
          method: string
          status: number
          duration: number
          timestamp: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          endpoint: string
          method: string
          status: number
          duration: number
          timestamp?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          endpoint?: string
          method?: string
          status?: number
          duration?: number
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_usage_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      economic_indicators: {
        Row: {
          id: string
          name: string
          value: number
          unit: string
          period: string
          published_at: string
          source: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          value: number
          unit: string
          period: string
          published_at: string
          source: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          value?: number
          unit?: string
          period?: string
          published_at?: string
          source?: string
          created_at?: string
        }
        Relationships: []
      }
      leaderboards: {
        Row: {
          id: string
          type: string
          period: string
          rankings: Json
          created_at: string
        }
        Insert: {
          id?: string
          type: string
          period: string
          rankings: Json
          created_at?: string
        }
        Update: {
          id?: string
          type?: string
          period?: string
          rankings?: Json
          created_at?: string
        }
        Relationships: []
      }
      market_data: {
        Row: {
          id: string
          symbol: string
          timestamp: string
          open: number
          high: number
          low: number
          close: number
          volume: number
          source: string
          indicators: Json | null
          embedding: string | null
          created_at: string
        }
        Insert: {
          id?: string
          symbol: string
          timestamp: string
          open: number
          high: number
          low: number
          close: number
          volume: number
          source: string
          indicators?: Json | null
          embedding?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          symbol?: string
          timestamp?: string
          open?: number
          high?: number
          low?: number
          close?: number
          volume?: number
          source?: string
          indicators?: Json | null
          embedding?: string | null
          created_at?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          id: string
          title: string
          content: string
          summary: string | null
          url: string | null
          published_at: string
          source: string
          symbols: string[]
          sentiment: string | null
          confidence: number | null
          embedding: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          summary?: string | null
          url?: string | null
          published_at: string
          source: string
          symbols: string[]
          sentiment?: string | null
          confidence?: number | null
          embedding?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          summary?: string | null
          url?: string | null
          published_at?: string
          source?: string
          symbols?: string[]
          sentiment?: string | null
          confidence?: number | null
          embedding?: string | null
          created_at?: string
        }
        Relationships: []
      }
      portfolios: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          balance: number
          currency: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          balance?: number
          currency?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          balance?: number
          currency?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolios_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      positions: {
        Row: {
          id: string
          portfolio_id: string
          symbol: string
          quantity: number
          avg_price: number
          current_price: number | null
          market_value: number | null
          pnl: number | null
          pnl_percent: number | null
          side: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          portfolio_id: string
          symbol: string
          quantity: number
          avg_price: number
          current_price?: number | null
          market_value?: number | null
          pnl?: number | null
          pnl_percent?: number | null
          side: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          portfolio_id?: string
          symbol?: string
          quantity?: number
          avg_price?: number
          current_price?: number | null
          market_value?: number | null
          pnl?: number | null
          pnl_percent?: number | null
          side?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "positions_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "portfolios"
            referencedColumns: ["id"]
          }
        ]
      }
      sessions: {
        Row: {
          id: string
          session_token: string
          user_id: string
          expires: string
        }
        Insert: {
          id?: string
          session_token: string
          user_id: string
          expires: string
        }
        Update: {
          id?: string
          session_token?: string
          user_id?: string
          expires?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      system_metrics: {
        Row: {
          id: string
          name: string
          value: number
          unit: string
          timestamp: string
        }
        Insert: {
          id?: string
          name: string
          value: number
          unit: string
          timestamp?: string
        }
        Update: {
          id?: string
          name?: string
          value?: number
          unit?: string
          timestamp?: string
        }
        Relationships: []
      }
      trades: {
        Row: {
          id: string
          user_id: string
          portfolio_id: string
          symbol: string
          side: string
          quantity: number
          price: number
          total: number
          fees: number
          type: string
          status: string
          executed_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          portfolio_id: string
          symbol: string
          side: string
          quantity: number
          price: number
          total: number
          fees?: number
          type?: string
          status?: string
          executed_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          portfolio_id?: string
          symbol?: string
          side?: string
          quantity?: number
          price?: number
          total?: number
          fees?: number
          type?: string
          status?: string
          executed_at?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trades_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "portfolios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trades_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      trading_strategies: {
        Row: {
          id: string
          name: string
          description: string
          parameters: Json
          performance: Json | null
          ai_optimized: boolean
          optimization_data: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          parameters: Json
          performance?: Json | null
          ai_optimized?: boolean
          optimization_data?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          parameters?: Json
          performance?: Json | null
          ai_optimized?: boolean
          optimization_data?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          type: string
          name: string
          description: string
          badge: string | null
          unlocked_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          name: string
          description: string
          badge?: string | null
          unlocked_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          name?: string
          description?: string
          badge?: string | null
          unlocked_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          id: string
          name: string | null
          email: string
          email_verified: string | null
          image: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name?: string | null
          email: string
          email_verified?: string | null
          image?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          email?: string
          email_verified?: string | null
          image?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      verification_tokens: {
        Row: {
          identifier: string
          token: string
          expires: string
        }
        Insert: {
          identifier: string
          token: string
          expires: string
        }
        Update: {
          identifier?: string
          token?: string
          expires?: string
        }
        Relationships: []
      }
      watchlists: {
        Row: {
          id: string
          user_id: string
          name: string
          symbols: string[]
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          symbols: string[]
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          symbols?: string[]
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "watchlists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

