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
      news: {
        Row: {
          created_at: string
          full_text: string
          id: string
          published_at: string
          title: string
          updated_at: string
          url: string
          user_repo_id: string
        }
        Insert: {
          created_at?: string
          full_text: string
          id?: string
          published_at: string
          title: string
          updated_at?: string
          url: string
          user_repo_id: string
        }
        Update: {
          created_at?: string
          full_text?: string
          id?: string
          published_at?: string
          title?: string
          updated_at?: string
          url?: string
          user_repo_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_user_repo_id_fkey"
            columns: ["user_repo_id"]
            isOneToOne: false
            referencedRelation: "user_repositories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          github_connected: boolean | null
          id: string
          role: string
          updated_at: string
          vercel_connected: boolean | null
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          github_connected?: boolean | null
          id: string
          role?: string
          updated_at?: string
          vercel_connected?: boolean | null
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          github_connected?: boolean | null
          id?: string
          role?: string
          updated_at?: string
          vercel_connected?: boolean | null
        }
        Relationships: []
      }
      questions: {
        Row: {
          created_at: string
          id: string
          question: string
          updated_at: string
          user_repo_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          question: string
          updated_at?: string
          user_repo_id: string
        }
        Update: {
          created_at?: string
          id?: string
          question?: string
          updated_at?: string
          user_repo_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "questions_user_repo_id_fkey"
            columns: ["user_repo_id"]
            isOneToOne: false
            referencedRelation: "user_repositories"
            referencedColumns: ["id"]
          },
        ]
      }
      repositories: {
        Row: {
          admin_id: string
          created_at: string
          description: string | null
          github_repo_url: string
          id: string
          is_template: boolean | null
          repo_name: string
          updated_at: string
        }
        Insert: {
          admin_id: string
          created_at?: string
          description?: string | null
          github_repo_url: string
          id?: string
          is_template?: boolean | null
          repo_name: string
          updated_at?: string
        }
        Update: {
          admin_id?: string
          created_at?: string
          description?: string | null
          github_repo_url?: string
          id?: string
          is_template?: boolean | null
          repo_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_repositories: {
        Row: {
          created_at: string
          deployed: boolean | null
          github_repo_url: string | null
          id: string
          original_repo_id: string
          repo_name: string
          subtitle: string | null
          title: string | null
          updated_at: string
          user_id: string
          vercel_url: string | null
        }
        Insert: {
          created_at?: string
          deployed?: boolean | null
          github_repo_url?: string | null
          id?: string
          original_repo_id: string
          repo_name: string
          subtitle?: string | null
          title?: string | null
          updated_at?: string
          user_id: string
          vercel_url?: string | null
        }
        Update: {
          created_at?: string
          deployed?: boolean | null
          github_repo_url?: string | null
          id?: string
          original_repo_id?: string
          repo_name?: string
          subtitle?: string | null
          title?: string | null
          updated_at?: string
          user_id?: string
          vercel_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_repositories_original_repo_id_fkey"
            columns: ["original_repo_id"]
            isOneToOne: false
            referencedRelation: "repositories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: { _user_id: string; _role: string }
        Returns: boolean
      }
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
