export type Theme = "everyday_life" | "decision_making" | "imagining_better";
export type Sentiment = "positive" | "negative" | "neutral" | "mixed";
export type ProcessingStatus = "pending" | "transcribing" | "analysing" | "complete" | "error";

export interface Database {
  public: {
    Tables: {
      listeners: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          email: string;
          region: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          email: string;
          region?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          email?: string;
          region?: string | null;
          created_at?: string;
        };
      };
      conversations: {
        Row: {
          id: string;
          listener_id: string;
          date: string;
          location: string;
          town: string;
          audio_file_1_url: string | null;
          audio_file_2_url: string | null;
          transcript: string | null;
          processing_status: ProcessingStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          listener_id: string;
          date: string;
          location: string;
          town: string;
          audio_file_1_url?: string | null;
          audio_file_2_url?: string | null;
          transcript?: string | null;
          processing_status?: ProcessingStatus;
          created_at?: string;
        };
        Update: {
          id?: string;
          listener_id?: string;
          date?: string;
          location?: string;
          town?: string;
          audio_file_1_url?: string | null;
          audio_file_2_url?: string | null;
          transcript?: string | null;
          processing_status?: ProcessingStatus;
          created_at?: string;
        };
      };
      insights: {
        Row: {
          id: string;
          conversation_id: string;
          theme: Theme;
          quote: string;
          summary: string;
          sentiment: Sentiment;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          theme: Theme;
          quote: string;
          summary: string;
          sentiment: Sentiment;
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          theme?: Theme;
          quote?: string;
          summary?: string;
          sentiment?: Sentiment;
          created_at?: string;
        };
      };
      survey_data: {
        Row: {
          id: string;
          conversation_id: string;
          age_group: string | null;
          gender: string | null;
          ethnicity: string | null;
          employment_status: string | null;
          belonging_score: number | null;
          community_participation_score: number | null;
          influence_score: number | null;
          pride_score: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          age_group?: string | null;
          gender?: string | null;
          ethnicity?: string | null;
          employment_status?: string | null;
          belonging_score?: number | null;
          community_participation_score?: number | null;
          influence_score?: number | null;
          pride_score?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          age_group?: string | null;
          gender?: string | null;
          ethnicity?: string | null;
          employment_status?: string | null;
          belonging_score?: number | null;
          community_participation_score?: number | null;
          influence_score?: number | null;
          pride_score?: number | null;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      theme: Theme;
      sentiment: Sentiment;
      processing_status: ProcessingStatus;
    };
  };
}
