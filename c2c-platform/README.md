# C2C Listening Intelligence Platform

A digital platform that converts recorded community conversations into structured insights aligned with the three Coast-to-Coast listening themes.

## What it does

- **Listeners** upload audio recordings via a mobile-friendly web form
- Audio is **automatically transcribed** using OpenAI Whisper
- **Claude AI** extracts quotes, concerns, and insights tagged to three themes
- A **live dashboard** visualises patterns across communities
- **Reports** are generated for policymakers on demand

## The Three Listening Themes

| Theme | Description |
|---|---|
| **Everyday Life** | Day-to-day experiences, local services, housing, transport |
| **Decision Making** | Voice, power, trust in institutions, feeling heard |
| **Imagining Better** | Hopes, ideas, visions for a better community |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), Tailwind CSS |
| Backend | Supabase (auth, database, storage) |
| Transcription | OpenAI Whisper API |
| AI Analysis | Anthropic Claude (claude-sonnet-4-6) |
| Deployment | Vercel (recommended) |

---

## Getting Started

### 1. Clone and install

```bash
git clone <repo>
cd c2c-platform
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in:
- `NEXT_PUBLIC_SUPABASE_URL` – your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` – your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` – your Supabase service role key
- `OPENAI_API_KEY` – your OpenAI API key (for Whisper)
- `ANTHROPIC_API_KEY` – your Anthropic API key (for Claude)

### 3. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the migration in `supabase/migrations/001_initial_schema.sql` in the SQL editor
3. Enable email auth with magic links in Authentication settings

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Platform Modules

### 1. Listener Submission App (`/submit`)
- Four-step form: session details → participant demographics → exit survey → audio upload
- Magic link authentication
- Drag-and-drop audio file upload (MP3, WAV, M4A, OGG)
- Automatically triggers processing on submission

### 2. Audio Processing Engine (`/api/process`)
- Downloads uploaded audio from Supabase storage
- Transcribes using OpenAI Whisper (handles accents, long recordings)
- Saves transcript to database
- Updates processing status in real-time

### 3. AI Insight Extraction (`src/lib/insights.ts`)
- Sends transcripts to Claude with a specialised system prompt
- Extracts 5–15 insights per conversation
- Tags each insight with theme, quote, summary, and sentiment
- Returns structured JSON for storage

### 4. Data Warehouse (Supabase)

Four core tables:
- `listeners` – listener profiles
- `conversations` – session metadata + transcripts
- `insights` – extracted quotes and analysis
- `survey_data` – participant demographics and sentiment scores

### 5. Live Dashboard (`/`)
- Conversations by location (bar chart)
- Theme breakdown (Everyday Life / Decision Making / Imagining Better)
- Community sentiment scores (belonging, pride, influence, participation)
- Recent conversations with processing status
- Quote library preview

### 6. Insights Explorer (`/insights`)
- Full-text search across all quotes
- Filter by theme and sentiment
- Card-based display with town and date

### 7. Report Generator (`/reports`)
- One-click report for any town or all locations
- Claude synthesises insights into a structured briefing
- Sections: Overview, Major Concerns, Strengths, What People Want, Recommended Actions
- Download as text file

---

## Deployment

### Vercel (recommended)

1. Push to GitHub
2. Import to [vercel.com](https://vercel.com)
3. Add environment variables
4. Deploy

### Estimated costs (lean operation)

| Item | Cost |
|---|---|
| Vercel hosting | Free tier |
| Supabase | Free tier (up to 500MB) |
| OpenAI Whisper | ~£0.006/minute of audio |
| Anthropic Claude | ~£0.01-0.05 per conversation |

---

## Project Structure

```
c2c-platform/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Dashboard
│   │   ├── submit/               # Listener submission form
│   │   ├── conversations/        # All conversations list
│   │   ├── insights/             # Insights explorer
│   │   ├── reports/              # Report generator
│   │   ├── login/                # Magic link auth
│   │   └── api/
│   │       ├── process/          # Transcription + AI pipeline
│   │       └── report/           # Report generation
│   ├── components/
│   │   ├── dashboard/            # Dashboard widgets
│   │   ├── insights/             # Insights explorer
│   │   ├── submit/               # Submission form
│   │   └── ui/                   # Shared UI components
│   └── lib/
│       ├── supabase/             # DB client + types
│       ├── data.ts               # Data access layer
│       ├── transcription.ts      # Whisper integration
│       └── insights.ts           # Claude integration
└── supabase/
    └── migrations/
        └── 001_initial_schema.sql
```
