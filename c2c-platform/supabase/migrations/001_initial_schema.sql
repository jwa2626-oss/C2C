-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enums
CREATE TYPE processing_status AS ENUM ('pending', 'transcribing', 'analysing', 'complete', 'error');
CREATE TYPE theme AS ENUM ('everyday_life', 'decision_making', 'imagining_better');
CREATE TYPE sentiment AS ENUM ('positive', 'negative', 'neutral', 'mixed');

-- Listeners table
CREATE TABLE listeners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  region TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listener_id UUID REFERENCES listeners(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  location TEXT NOT NULL,
  town TEXT NOT NULL,
  audio_file_1_url TEXT,
  audio_file_2_url TEXT,
  transcript TEXT,
  processing_status processing_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insights table
CREATE TABLE insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  theme theme NOT NULL,
  quote TEXT NOT NULL,
  summary TEXT NOT NULL,
  sentiment sentiment NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Survey data table
CREATE TABLE survey_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE UNIQUE,
  age_group TEXT,
  gender TEXT,
  ethnicity TEXT,
  employment_status TEXT,
  belonging_score DECIMAL(3,1) CHECK (belonging_score BETWEEN 1 AND 5),
  community_participation_score DECIMAL(3,1) CHECK (community_participation_score BETWEEN 1 AND 5),
  influence_score DECIMAL(3,1) CHECK (influence_score BETWEEN 1 AND 5),
  pride_score DECIMAL(3,1) CHECK (pride_score BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE listeners ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_data ENABLE ROW LEVEL SECURITY;

-- Policies: listeners can manage their own data
CREATE POLICY "Listeners can view own profile" ON listeners
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Listeners can insert own profile" ON listeners
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Listeners can update own profile" ON listeners
  FOR UPDATE USING (auth.uid() = user_id);

-- Conversations: listeners can manage their own conversations
CREATE POLICY "Listeners can view own conversations" ON conversations
  FOR SELECT USING (
    listener_id IN (SELECT id FROM listeners WHERE user_id = auth.uid())
  );

CREATE POLICY "Listeners can insert conversations" ON conversations
  FOR INSERT WITH CHECK (
    listener_id IN (SELECT id FROM listeners WHERE user_id = auth.uid())
  );

CREATE POLICY "Listeners can update own conversations" ON conversations
  FOR UPDATE USING (
    listener_id IN (SELECT id FROM listeners WHERE user_id = auth.uid())
  );

-- Insights: anyone authenticated can read insights (for dashboard)
CREATE POLICY "Authenticated users can read insights" ON insights
  FOR SELECT USING (auth.role() = 'authenticated');

-- Service role can insert insights (from API processing)
CREATE POLICY "Service role can insert insights" ON insights
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Survey data: accessible to authenticated users
CREATE POLICY "Authenticated users can read survey data" ON survey_data
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Listeners can insert survey data" ON survey_data
  FOR INSERT WITH CHECK (
    conversation_id IN (
      SELECT c.id FROM conversations c
      JOIN listeners l ON c.listener_id = l.id
      WHERE l.user_id = auth.uid()
    )
  );

-- Storage bucket for audio files
INSERT INTO storage.buckets (id, name, public) VALUES ('audio-files', 'audio-files', false);

CREATE POLICY "Authenticated users can upload audio" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'audio-files' AND auth.role() = 'authenticated');

CREATE POLICY "Users can read own audio" ON storage.objects
  FOR SELECT USING (bucket_id = 'audio-files' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Indexes for performance
CREATE INDEX idx_conversations_listener_id ON conversations(listener_id);
CREATE INDEX idx_conversations_town ON conversations(town);
CREATE INDEX idx_conversations_date ON conversations(date);
CREATE INDEX idx_insights_conversation_id ON insights(conversation_id);
CREATE INDEX idx_insights_theme ON insights(theme);
CREATE INDEX idx_insights_sentiment ON insights(sentiment);
CREATE INDEX idx_survey_data_conversation_id ON survey_data(conversation_id);
