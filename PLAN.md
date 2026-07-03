# Sort My Life — Product & Technical Plan

**One app to organise your whole life:** money, home, time, and the big life-admin
moments that usually live across five different apps, a spreadsheet, and a pile of
paper.

---

## 1. Vision & Goals

Most people manage their lives with a patchwork of tools: a banking app for money,
a shared note for chores, a calendar that only they can see, a mortgage calculator
they Google once a year, and a drawer full of documents they can never find.

**Sort My Life** brings all of this into one place, built around three principles:

1. **One home screen for everything** — a daily dashboard that answers: *What do I
   need to do today? What's coming up? How's my money looking?*
2. **Shareable by design** — households, couples, and families can share chores,
   budgets, calendars, and shopping lists with granular privacy controls.
3. **Proactive, not just passive** — the app nudges you: "Council tax is due
   Friday", "Your MOT expires in 3 weeks", "You're 80% through your eating-out
   budget and it's the 14th".

### Target users

- **Busy individuals** who want their admin in one place.
- **Couples / house-shares** splitting bills and chores.
- **Families** juggling school dates, activities, and household budgets.
- **New homeowners / renters** dealing with mortgages, utilities, and local services.

### Success metrics

- Weekly active usage of ≥3 modules per user (the "hub" bet only works if people
  use it for more than one thing).
- Retention: 40% of users still active at 90 days.
- Time-to-value: user gets a populated dashboard within 10 minutes of signup.

---

## 2. Feature Modules

### 2.1 Dashboard ("Today")

The landing screen. Configurable cards:

- Today's agenda (calendar events + chores due today).
- Budget snapshot (spend so far this month vs. plan, per category).
- Upcoming bills and renewals in the next 7 days.
- Quick actions: add expense, add event, tick off a chore, add to shopping list.
- Alerts: overdue chores, budget overspend warnings, documents/renewals expiring.

### 2.2 Budgeting & Money

Core money management without needing to be a full banking app on day one.

**Features**
- Monthly budgets by category (groceries, transport, eating out, subscriptions…)
  with custom categories and rollover options.
- Expense logging: quick manual entry, recurring transactions (rent, salary,
  subscriptions), and receipt-photo capture (OCR later).
- **Subscription tracker**: list all recurring payments, flag price rises, remind
  before free trials end and before annual renewals.
- Bill calendar: every bill mapped onto the shared calendar with due-date reminders.
- Savings goals: named pots ("Holiday", "Emergency fund") with target dates and
  progress bars.
- Shared budgets: household categories (rent, groceries) vs. private ones, with
  split tracking ("who owes whom") for house-shares.
- Reports: monthly spend breakdown, category trends, month-on-month comparison.

**Later (Phase 3+)**: open-banking integration (Plaid / TrueLayer) for automatic
transaction import and categorisation; net-worth tracking.

### 2.3 Household Chores (diarised)

Chores treated as first-class scheduled items, not a static list.

**Features**
- Chore library with sensible defaults (bins out, clean bathroom, water plants,
  change bedding, descale kettle…) plus custom chores.
- Recurrence rules: daily / weekly / monthly / seasonal ("gutter clean every
  autumn"), with flexible scheduling ("every 2 weeks, any day that week").
- **Diary integration**: chores appear on the calendar alongside events, and can
  be dragged to reschedule.
- Assignment & rotation: assign to household members, auto-rotate ("bins
  alternate between Sam and Alex"), or "up for grabs".
- Completion tracking: streaks, a fairness view ("Sam did 12 chores this month,
  Alex did 4"), and gentle nudges for overdue items.
- Home maintenance log: record when the boiler was serviced, filters changed,
  smoke alarms tested — with auto-created reminders for the next occurrence.
- Optional gamification for families: points and rewards for kids' chores.

### 2.4 Calendar

The spine of the app — everything with a date lands here.

**Features**
- Personal + shared household calendars with colour-coded layers you can toggle:
  events, chores, bills, key dates, local events.
- **Key personal dates**: birthdays, anniversaries, renewals (passport, driving
  licence, car MOT/tax, insurance, tenancy end, fixed-rate mortgage end) with
  long-lead reminders ("passport expires in 6 months — renew now to avoid the rush").
- Meetings & appointments with location, notes, and travel-time warnings.
- Two-way sync with Google Calendar / Apple Calendar / Outlook (read-only import
  in MVP, full two-way sync later).
- Natural-language quick add: "Dentist Tuesday 3pm", "Mum's birthday 12 March
  every year".
- Agenda, week, and month views; "next 7 days" widget on the dashboard.

### 2.5 Tax Calculator

Quick answers to "what will I actually take home?" and "what do I owe?"

**Features**
- Income tax & take-home pay calculator: salary in → net pay out, with breakdown
  of income tax, social/national insurance, pension contributions, and student
  loan repayments.
- Region-aware rule packs (start with one region — e.g. UK or US — behind a
  config-driven rules engine so other regions can be added without code rewrites;
  tax-year versioned so historical years remain correct).
- Self-employment estimator: rough tax set-aside guidance for freelancers
  ("put aside ~£X per invoice").
- Scenario comparison: "what if I get a £3k raise?", "what if I increase pension
  contributions to 8%?"
- Key tax dates (filing deadlines, payment-on-account dates) pushed to the calendar.
- Clear disclaimer: estimates only, not financial advice.

### 2.6 Mortgage Calculator

**Features**
- Repayment calculator: loan amount, rate, term → monthly payment, total interest,
  full amortisation schedule (chart + table).
- Affordability estimator: income + deposit → indicative borrowing range.
- Overpayment modeller: "pay £100/month extra → mortgage-free 4 years earlier,
  save £X interest".
- Remortgage comparison: current deal vs. a new rate, including fees and the
  cost of doing nothing when a fixed rate ends.
- Rent-vs-buy comparison over a chosen horizon.
- Integration hooks: save a scenario, put "fixed rate ends" on the calendar with
  a 6-month-ahead reminder, and feed the monthly payment into the budget module.

### 2.7 What's In My Area

Local context for daily life, driven by the user's saved locations (home, work).

**Features**
- Nearby essentials: GPs/doctors, dentists, pharmacies, schools, gyms, libraries,
  recycling centres, supermarkets — with opening hours and contact details
  (Google Places or OpenStreetMap/Overpass API).
- **Bin collection days** (where councils publish them) pushed to the calendar.
- Local events feed: markets, fairs, community events (Eventbrite/council feeds).
- Area stats for movers: crime stats, school ratings, transport links, broadband
  availability — doubles as research when using the mortgage module.
- Local services directory: save trusted plumbers, electricians, cleaners with
  notes and last-used dates; tie into home maintenance log.
- Alerts: severe weather warnings, planned roadworks/utility outages where feeds
  exist.

### 2.8 Additional modules (the "anything else useful")

- **Document vault**: encrypted storage for scans of passports, insurance
  policies, tenancy agreements, warranties, MOT certificates. Each document can
  carry an expiry date that auto-creates a calendar reminder. (Warranty tracker
  lives here: snap the receipt, set the warranty length, get reminded before it
  lapses.)
- **Shopping & to-do lists**: shared, real-time lists (groceries, DIY, packing
  lists) with recurring-item suggestions.
- **Meal planner**: plan the week's meals, auto-generate the grocery list, feed
  the estimated cost into the groceries budget.
- **Contacts & important numbers**: emergency contacts, utility account numbers,
  policy numbers, in one secure card per provider.
- **Life admin checklists**: guided playbooks for big events — moving house,
  having a baby, changing jobs, bereavement admin — each generating tasks,
  calendar entries, and document prompts.
- **Notes & vault of "where things are"**: stopcock location, boiler manual,
  wifi password, meter locations.

---

## 3. Cross-Cutting Concerns

### Households & sharing
- A user belongs to zero or more **households**. Chores, shared budgets, shared
  calendars, shopping lists, and the document vault can be scoped to a household.
- Roles: owner, adult member, child (limited view — chores and family calendar
  only, no finances).
- Everything defaults to **private**; sharing is opt-in per item or per category.

### Notifications engine
One unified engine drives all reminders (bills, chores, renewals, events, budget
alerts) with per-module quiet hours, digest mode ("one summary at 8am" vs.
individual pings), and channel choice (push, email).

### Privacy & security
- Financial and document data encrypted at rest; documents client-side encrypted
  where feasible.
- No selling of data; local-area features use coarse location by default.
- Biometric/PIN app lock, with a separate lock on the money and vault modules.
- Full data export (JSON/CSV) and account deletion (GDPR/CCPA compliant).
- Calculators carry "estimate, not advice" disclaimers; tax rule packs display
  their tax-year version.

### Offline & sync
Local-first storage for lists, chores, and calendar with background sync;
calculators work fully offline. Conflict resolution: last-write-wins per field,
with tombstones for deletions.

### Accessibility & i18n
WCAG 2.1 AA, dynamic type, screen-reader labels on all charts; currency, date
format, and tax rules driven by locale/region settings.

---

## 4. Architecture & Tech Stack

### Recommended stack

| Layer | Choice | Rationale |
|---|---|---|
| Mobile app | React Native (Expo) | One codebase for iOS/Android; fast iteration |
| Web app | Next.js (React) | Shares components/types with mobile via a monorepo |
| API | Node.js (NestJS or tRPC) + TypeScript | End-to-end type safety with the clients |
| Database | PostgreSQL | Relational fits budgets/chores/events; row-level security for household scoping |
| Cache/queues | Redis + a job queue (BullMQ) | Recurring-chore generation, reminder fan-out |
| File storage | S3-compatible object store | Document vault, receipt images |
| Auth | Managed auth (Auth0/Supabase/Cognito) | Social login, MFA, household invites |
| Push | FCM + APNs via one service | Unified notification engine |
| Maps/places | Google Places or OpenStreetMap | "What's in my area" |
| Analytics | Privacy-respecting (PostHog self-hosted) | Product metrics without selling data |

A **modular monolith** to start (one deployable API with clean module boundaries:
`money`, `chores`, `calendar`, `local`, `vault`, `notifications`), splitting out
services only if scale demands it. Calculators (tax, mortgage) are pure,
versioned TypeScript packages shared by client and server so they run offline
and are unit-testable in isolation.

### High-level data model (core entities)

```
User ─┬─ Membership ── Household
      │
      ├─ Account/Budget ── Category ── Transaction (recurring rule optional)
      ├─ SavingsGoal
      ├─ Subscription (renews_at, price history)
      │
      ├─ Chore (recurrence rule, assignment strategy) ── ChoreOccurrence (due, done_by)
      ├─ MaintenanceItem ── MaintenanceLogEntry
      │
      ├─ CalendarLayer ── Event (one-off | recurring | derived: bill/chore/renewal)
      ├─ KeyDate (type: birthday/renewal/expiry, lead_time)
      │
      ├─ Document (encrypted blob ref, expiry → KeyDate)
      ├─ List ── ListItem
      ├─ MealPlanEntry
      └─ SavedPlace / ServiceContact
```

Derived events (a bill's due date, a chore occurrence, a document expiry) are
projected into the calendar rather than duplicated — the calendar is a **view**
over the other modules plus native events.

### Key engineering decisions

1. **Recurrence engine**: one shared RFC 5545 (RRULE)-based engine for chores,
   bills, and events — do not build three.
2. **Rules-as-data for tax**: tax bands/thresholds live in versioned JSON packs
   per region and tax year; the engine is generic.
3. **Calendar as projection**: modules emit "date-bearing facts"; the calendar
   subscribes. Keeps modules decoupled.
4. **Local-first clients** with a sync protocol, so the app is instant and works
   on the tube.

---

## 5. Roadmap

### Phase 1 — MVP (~3 months)
Goal: a genuinely useful daily app for one person.
- Auth, profiles, onboarding wizard (region, currency, home location, first budget).
- Dashboard v1.
- Budgeting: categories, manual expenses, recurring transactions, monthly report.
- Chores: creation, recurrence, completion, calendar display.
- Calendar: events, key personal dates with reminders, Google Calendar import.
- Mortgage calculator (repayment + overpayment).
- Tax calculator for the launch region (take-home pay).
- Notifications engine v1 (push + digest).

### Phase 2 — Households & local (~2 months)
- Household creation, invites, roles; shared chores with rotation and fairness view.
- Shared budgets and expense splitting.
- Shopping/to-do lists (shared, real-time).
- What's In My Area v1: nearby essentials + local events; bin days where available.
- Subscription tracker; bill calendar.

### Phase 3 — Depth (~3 months)
- Document vault with expiry reminders; warranty tracker.
- Meal planner wired to grocery list and budget.
- Home maintenance log; life-admin checklists (moving house first).
- Two-way calendar sync; natural-language quick add.
- Tax: self-employment estimator, scenario comparison; second region pack.
- Mortgage: affordability, remortgage comparison, rent-vs-buy.

### Phase 4 — Intelligence & integrations
- Open banking import + auto-categorisation.
- Smart suggestions: "you always buy milk Mondays", seasonal chore prompts,
  "your fixed rate ends in 6 months — here's what a 1% rise costs you".
- Area alerts (weather, roadworks); school-ratings/crime layers for movers.
- Widgets (iOS/Android home screen), voice-assistant quick add, wearables.

---

## 6. Monetisation

- **Free tier**: full calculators, budgeting with manual entry, chores, calendar,
  one household of 2, limited document vault (10 docs).
- **Premium (~£4.99/mo or £39.99/yr)**: unlimited household members, open-banking
  sync, unlimited vault + client-side encryption, meal planner, life-admin
  playbooks, priority local data (bin days, alerts).
- **Family plan**: premium for up to 6 members.
- No ads, no data selling — trust is the product.

## 7. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Scope sprawl — "everything app" ships nothing well | Strict phasing; MVP is single-user and manual-entry only |
| Tax/mortgage figures wrong → user harm + liability | Rules-as-data with golden-file tests per tax year; prominent "estimate only" disclaimers; annual review process |
| Local data (bin days, events) patchy by region | Degrade gracefully: hide cards where no data; let users add manual schedules |
| Household sharing privacy mistakes | Private-by-default; explicit share flows; child role has no finance access; penetration test before Phase 2 launch |
| Open banking cost/compliance | Deferred to Phase 4; manual + recurring entry is the fallback that always works |
| Notification fatigue → uninstalls | Digest-first defaults, per-module controls, "snooze all" |

## 8. Open Questions

1. **Launch region** for tax rules and local-area data (UK vs. US changes both) —
   the rules-engine design keeps this cheap to decide late, but marketing can't wait.
2. Mobile-first only for MVP, or ship the web app simultaneously?
3. Should kids' chore gamification be MVP-adjacent (strong family appeal) or Phase 3?
4. Build vs. buy for the sync layer (e.g. PowerSync/ElectricSQL vs. custom).
