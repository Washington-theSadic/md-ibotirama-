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
      admins: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_super_admin: boolean
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          is_super_admin?: boolean
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_super_admin?: boolean
        }
        Relationships: []
      }
      carousel_images: {
        Row: {
          carousel: string
          created_at: string | null
          display_order: number
          id: string
          image_url: string
        }
        Insert: {
          carousel: string
          created_at?: string | null
          display_order: number
          id?: string
          image_url: string
        }
        Update: {
          carousel?: string
          created_at?: string | null
          display_order?: number
          id?: string
          image_url?: string
        }
        Relationships: []
      }
      prices: {
        Row: {
          active: boolean
          id: number
          price_a: number
          price_b: number
          price_c: number | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean
          id?: number
          price_a?: number
          price_b?: number
          price_c?: number | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean
          id?: number
          price_a?: number
          price_b?: number
          price_c?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      pricing: {
        Row: {
          adhesion_fee: number
          commission_percentage: number
          id: string
          show_pricing: boolean
          updated_at: string | null
        }
        Insert: {
          adhesion_fee?: number
          commission_percentage?: number
          id?: string
          show_pricing?: boolean
          updated_at?: string | null
        }
        Update: {
          adhesion_fee?: number
          commission_percentage?: number
          id?: string
          show_pricing?: boolean
          updated_at?: string | null
        }
        Relationships: []
      }
      site_links: {
        Row: {
          active: boolean
          display_order: number
          id: string
          name: string
          section: string
          updated_at: string | null
          url: string
        }
        Insert: {
          active?: boolean
          display_order: number
          id?: string
          name: string
          section: string
          updated_at?: string | null
          url: string
        }
        Update: {
          active?: boolean
          display_order?: number
          id?: string
          name?: string
          section?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      videos: {
        Row: {
          id: number
          title: string
          updated_at: string | null
          video_url: string
        }
        Insert: {
          id: number
          title: string
          updated_at?: string | null
          video_url: string
        }
        Update: {
          id?: number
          title?: string
          updated_at?: string | null
          video_url?: string
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
