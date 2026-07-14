# Sort My Life — Product, Technical & Commercial Plan (v2)

**One app to run your whole life:** money, home, family, time, and the big
life-admin moments that today live across a dozen apps, a spreadsheet, and a
drawer full of paper.

**Launch region: United Kingdom.** Tax rules, local-area data, currency and
terminology target the UK first. A rules-as-data design (§6) keeps other regions
cheap to add later.

> **About this version.** v1 was a strong product sketch. v2 is written to stand
> up as the plan for a **paid-for SaaS business**: it adds competitive
> positioning, a concrete API integration strategy, a monetisation and
> unit-economics model, a go-to-market motion, and a sharper, de-risked roadmap.
> It is grounded in market research conducted July 2026 (competitors, UK
> open-data and commercial APIs, and consumer-subscription benchmarks). Where a
> figure needs re-checking before you build on it, it is flagged
> *(verify)*. A full source list sits in §16.

---

## 0. What changed since v1 — and why

The single most important lesson from the market is this: **broad "everything
apps" fail in the West unless they are anchored to one high-frequency habit.**
Revolut succeeded by staying a *super-app of finance*; standalone aggregators
with no anchor (Money Dashboard, 2023; Moneyhub's consumer app, closing 2026)
died. So v2 keeps v1's breadth as the *vision* but re-orders the *build* around a
narrow, daily-use wedge and a business model that doesn't depend on any single
module carrying the company.

Eight substantive changes:

1. **A named wedge.** v1's "MVP" was eight modules in three months — not an MVP.
   v2 leads with **the Household Command Centre** (shared calendar + chores +
   lists + renewals/bills), the daily-habit anchor, and treats calculators and
   local-area as *acquisition* surfaces, not launch-critical modules. (§5, §7)
2. **Money reframed as a *commitments tracker*, not a transaction tracker, until
   Open Banking lands.** Manual expense entry is the #1 churn driver in UK money
   apps; bills, subscriptions and renewals have known dates and amounts and need
   no bank connection. This makes the money module genuinely useful on day one
   without Open Banking. (§2.2, §7)
3. **Calculators recast as free SEO/acquisition assets, not paid features.**
   Take-home-pay and mortgage maths are commoditised (HMRC app, MoneySavingExpert
   do them free). They pull in traffic; the paywall lives elsewhere. (§2.6, §9)
4. **An explicit "connective-tissue" thesis.** The product is the *integration*,
   not any one module. v2 defines the cross-module automations that only work
   because the data lives together — the actual moat against best-in-class point
   apps. (§4)
5. **A real API strategy.** A costed, prioritised catalogue of ~30 UK open-data
   and commercial APIs, with the dated landmines that will break a naïve build
   (getAddress.io shut down Feb 2026; EPC service migration; Google Calendar
   CASA cost; NHS onboarding friction). (§8)
6. **Monetisation, pricing and unit economics.** Benchmark-anchored pricing
   (£49.99/yr household, annual-first), a second revenue line (trust-first
   switching), a B2B2C line (employee benefit / FS white-label), and a
   cost-per-user model. (§9, §10)
7. **Go-to-market.** How the first 10,000 households actually arrive — calculator
   SEO, the "moving house" wedge, life-event triggers — none of which v1
   mentioned. (§11)
8. **Sharper risks and decisions.** v1's open questions are answered (§15), and
   the risk table now covers platform, data-source fragility, trust, and AI-cost
   risk (§14).

---

## 1. Vision, positioning & who we serve

### The problem
A typical UK household runs its life on a banking app, a budgeting app, a shared
calendar, a chore app, a notes app, a meal planner, a pile of renewal emails, and
a drawer of documents nobody can find. Each is good at one thing and blind to the
others. Nobody owns "the whole picture."

### The bet
**Sort My Life (SML)** is the single home for a household's admin, built on three
principles:

1. **One home screen for everything** — a daily dashboard: *What do I need to do
   today? What's coming up? How's the money looking?*
2. **Shared by design** — couples, families and house-shares share chores,
   budgets, calendars and lists with granular, private-by-default controls.
3. **Proactive, not passive** — "Council tax is due Friday", "Your MOT expires in
   3 weeks", "You're 80% through the eating-out budget and it's the 14th."

### Why this can win where others didn't
The competitive scan (§3) shows a clear gap. The family-organiser leaders (Cozi,
FamilyWall, TimeTree) own calendar-and-lists but have **no money, no UK
local-data, no renewals intelligence**. The UK money apps (Emma, Snoop, Plum) own
budgeting but have **no household/chores/calendar** and are **distrusted for
aggressive monetisation**. The UK life-admin vaults (Doqit, SafeKeep) are tiny.
Nobody joins **money + household + local + documents** for a UK household — and
the UK's unusually rich open-data estate (§8) makes the local-intelligence layer
a genuine, defensible differentiator.

Positioning line: **"The operating system for your household."** Not a bank, not
a calendar — the connective layer above them.

### Target users
- **Couples & young families** running a joint household — the core wedge.
- **House-shares / flatmates** splitting bills and chores.
- **New movers / homeowners** dealing with mortgages, utilities, bin days,
  schools and local services — the highest-intent acquisition moment.
- **Side-hustlers & landlords** — pulled in by the April 2026 Making Tax Digital
  mandate (§9), a legally-forced, recurring hook.

### Success metrics (realistic, tiered)
v1's "40% retained at 90 days" is top-decile fantasy for a consumer app; benchmark
annual-plan Year-1 retention is ~44% and ~72% of annual subs cancel within the
year. Targets:

| Metric | Floor | Target | Stretch |
|---|---|---|---|
| Activation (populated dashboard + 2nd module used in 10 min) | 40% | 55% | 70% |
| D30 retention | 20% | 30% | 40% |
| Weekly active using ≥2 modules | 25% | 40% | 55% |
| Free → paid (install-to-paid) | 3% | 5% | 8% |
| Annual-plan share of paid | 50% | 65% | 75% |
| Month-1 subscription retention | 65% | 75% | 85% |

The **≥2-modules** metric is the whole thesis: the hub bet only works if people
use SML for more than one thing. Instrument it from day one.

---

## 2. Feature modules

Modules are grouped by build phase in §7. Each notes its **v1→v2 change** and, in
**bold**, the *connective-tissue* behaviours that make it more than a point app.

### 2.1 Dashboard ("Today")
The landing screen. Configurable cards: today's agenda (events + chores due);
budget snapshot (spend vs plan by category); bills & renewals in the next 7 days;
quick actions (add expense/event/chore/list item); alerts (overdue chores, budget
overspend, expiring documents/renewals).

**Connective tissue:** the dashboard is a *projection* over every module (§6), so
a mortgage-payment, a bin day, a passport expiry and a chore all surface in one
prioritised feed. **A single morning digest** ("here's your day + 3 things coming
up + 1 money nudge") is the retention engine — this is what no point app can do.

### 2.2 Money — reframed as **Commitments & Budgeting**
> **v1→v2:** v1 put Open Banking at Phase 4 while positioning money as
> transaction-tracking — a contradiction, since manual entry is the top churn
> driver. v2 leads with *commitments* (known dates/amounts, no bank needed) and
> adds OB later as an accelerant, not a dependency.

**MVP (no Open Banking required):**
- **Bill & renewal calendar** — rent/mortgage, council tax, utilities, insurance,
  subscriptions — each with a due date, amount and reminder. This is the money
  module's beating heart and needs no bank link.
- **Subscription tracker** — list recurring payments, flag price rises, warn
  before free trials end and annual renewals hit.
- **Budgets by category** with custom categories and rollover; quick manual
  expense entry and recurring transactions.
- **Savings goals** — named pots ("Holiday", "Emergency fund") with targets and
  progress.
- **Shared vs private** household categories, with simple "who owes whom"
  split-tracking for house-shares (inspired by *Flatastic*'s settle-up).

**Phase 3+ (Open Banking):** automatic transaction import & categorisation via an
**agent-of-AISP** integration (§8), net-worth tracking, and "spare-change →
savings/mortgage-overpayment" automation (inspired by *Sprive*).

**Connective tissue:** every bill due-date projects onto the calendar; a
renewal's end-date can trigger a *switching* prompt (§9); a mortgage scenario
(§2.6) feeds its monthly figure straight into the budget.

**Anti-patterns to avoid (from Emma/Plum complaints):** no gutting the free tier
retroactively, no surprise post-trial annual charges, no dark-pattern rate
asterisks, and reliable sync. Trust is the moat when you hold someone's whole life.

### 2.3 Household Chores (diarised)
Chores as first-class scheduled items, not a static list.
- Chore library with sensible UK defaults (bins out, descale kettle, bleed
  radiators…) plus custom chores.
- Recurrence: daily/weekly/monthly/seasonal, with flexible windows ("every 2
  weeks, any day that week").
- **Diary integration** — chores appear on the calendar and can be dragged to
  reschedule.
- **Assignment, rotation & fairness** — assign, auto-rotate ("bins alternate Sam
  ↔ Alex"), or "up for grabs"; a fairness view ("Sam did 12 this month, Alex
  did 4"). *(from OurHome's points economy + Nipto/Flatastic rotation.)*
- **Kid gamification (Phase 3):** star-value chores redeemable for rewards
  parents configure; morning/bedtime **routines** with streaks. *(from Skylight
  Chore Rewards / Hearth.)*
- Home-maintenance log: boiler serviced, filters changed, alarms tested — each
  auto-creating the next reminder.

**Connective tissue:** chores share the **one recurrence engine** (§6) with bills
and events; the maintenance log ties into the local **trusted-tradesperson**
directory (§2.5) and the document vault's warranty records (§2.7).

### 2.4 Calendar — the spine
Everything with a date lands here.
- Personal + shared household calendars, colour-coded layers you can toggle
  (events, chores, bills, key dates, local events).
- **Key dates**: birthdays, anniversaries, and renewals (passport, driving
  licence, MOT, car tax, insurance, tenancy end, fixed-rate-mortgage end) with
  long-lead reminders ("passport expires in 6 months — renew now to beat the
  rush").
- Natural-language quick-add ("Dentist Tuesday 3pm"; "Mum's birthday 12 March
  yearly") via an LLM (~£0.01/parse — §10).
- **External calendar sync**: **read-only import in MVP** (iCal/Google);
  two-way sync later once the economics justify the CASA/per-account cost (§8).
- Agenda / week / month views; "next 7 days" dashboard widget.

**Connective tissue:** the calendar is a **view over every module** (§6), not a
separate data silo — the reason a chore, a bill, and a passport expiry can share
one screen.

### 2.5 Local — **"What's around me"** (the UK differentiator)
Local context driven by the user's saved postcodes (home, work), leaning on the
UK's rich open data (§8). This is the layer competitors can't easily copy.
- **Bin collections** pushed to the calendar (see §8 for the pragmatic
  data strategy — this is genuinely hard).
- **Nearby essentials**: GPs, dentists, pharmacies, schools, recycling centres,
  supermarkets — hours and contact details.
- **Food hygiene ratings** on nearby restaurants/takeaways (FSA FHRS — free,
  trivial).
- **Area intelligence for movers** (doubles as mortgage-module research): crime
  (police.uk), schools & Ofsted (re-modelled for the Nov-2025 report cards),
  flood risk (Environment Agency), broadband (Ofcom), council-tax band, EPC,
  planning applications nearby.
- **Trusted-services directory**: save your plumber/electrician/cleaner with
  notes and last-used dates; ties into the maintenance log.
- **Alerts**: Met Office severe-weather warnings; roadworks where feeds exist.

**Connective tissue:** the "moving house" life-admin checklist (§2.7) pre-loads
this whole screen for a new postcode; area data feeds the mortgage/rent decision.

### 2.6 Calculators — Tax & Mortgage (free acquisition assets)
> **v1→v2:** these are **free forever** and double as **SEO landing pages** on the
> web app. They acquire; they don't monetise.

**UK tax calculator:** gross→net take-home with a full breakdown (Income Tax, NI,
pension relief/salary-sacrifice, student loans Plans 1/2/4/5 + PG); personal
allowance taper >£100k; Scottish bands vs rUK; tax-code entry; Marriage Allowance;
High Income Child Benefit Charge warning. **No HMRC API needed — the bands are
public; implement locally** (§8), versioned by tax year (§6).

**UK mortgage calculator:** repayment schedule (chart+table), affordability,
**Stamp Duty (SDLT) with Scottish LBTT and Welsh LTT**, overpayment modeller,
remortgage comparison, rent-vs-buy, LISA bonus modelling. Save a scenario → its
monthly payment feeds the budget, and "fixed rate ends" lands on the calendar
with a 6-month-ahead reminder.

**Making Tax Digital hook (Phase 3+):** from **6 April 2026** MTD for Income Tax
is mandatory for self-employed/landlords with gross income >£50k (>£30k from
2027, >£20k from 2028) — quarterly digital updates replace the annual return.
This is a *legally-forced, recurring* reason to open the app. **Note:** building
an MTD-recognised filing tool is a heavy compliance project (OAuth + mandatory
fraud-prevention headers + HMRC software recognition + penalties). Treat as a
Phase 4 "done-for-you" premium line or a partnership, **not** an MVP feature — but
capture the audience early with a free MTD-readiness checker and quarterly
reminders (which need no API).

### 2.7 Documents & the "everything else" modules
- **Document vault**: scans of passports, insurance, tenancy, warranties, MOTs.
  Each doc carries an expiry that auto-creates a calendar reminder. **Encryption
  decision (§13): encrypted-at-rest with server-side processing** (enables OCR &
  expiry extraction), *not* end-to-end — a deliberate trade of a marketing line
  for real features. Warranty tracker lives here (snap receipt → set length → get
  reminded). *(from Homer's warranty vault.)*
- **Shopping & to-do lists**: shared, real-time, recurring-item suggestions.
- **Meal planner → shopping list → budget** pipeline: plan the week, auto-generate
  an aisle-sorted list, feed estimated cost into the groceries budget, subtract
  pantry items to cut waste. **Grocery basket hand-off** to the user's chosen UK
  supermarket is a strong differentiator — see §8; *Mealia* (all four big grocers)
  is the benchmark and **Ocado is whitespace**.
- **Contacts & important numbers**: utility account numbers, policy numbers,
  emergency contacts — one secure card per provider.
- **Life-admin checklists / playbooks**: guided flows for moving house, new baby,
  changing jobs, bereavement — each generating tasks, calendar entries and
  document prompts. The **moving-house playbook** is the flagship (§11).
- **"Where things are" vault**: stopcock, boiler manual, wifi password, meter
  locations — small but beloved.

### 2.8 New feature ideas surfaced by research (candidate backlog)
Attributed to their inspiration; prioritised in the roadmap where they earn a slot.
- **AI "capture the mental load"** — forward an email, voice note or screenshot;
  the app turns it into an assigned task or dated event. *(Milo / Jam.)* High-
  differentiation, cheap on LLMs (§10).
- **"Ask your household"** — natural-language query over your own data ("when's
  the car insurance due and how much was it last year?"). *(RAG over the vault.)*
- **Couples / joint-finance mode** — a shared money view that isn't a joint
  account. *(Lumio, now a Lloyds partner.)*
- **Trust-first bill switching** — track contract-end dates and surface cheaper
  energy/broadband/mobile deals; execute the switch. *(Nous.)* Revenue line in §9.
- **Spare-change → savings/overpayment** automation once OB lands. *(Sprive.)*
- **"See your pay before payday"** and a read-only tax cockpit by deep-linking
  the official HMRC app. *(HMRC app.)*
- **Carpool / "who's driving"** as a shared family logistics type. *(Jam.)*
- **Always-on household display** mode (a tablet-optimised dashboard on the
  kitchen wall) — a cheap answer to Skylight/Hearth's £150–700 hardware. *(Hearth
  / Skylight, without the hardware.)*
- **Human-expert escalation** — upsell to an accredited accountant/mortgage
  broker for complex cases. *(TaxScouts/Taxfix.)* Ties to affiliate revenue (§9).

---

## 3. Competitive landscape

Full competitor detail (pricing, features, weaknesses, status) sits in the
research appendix (§16). The strategic summary:

### The four camps — and the gap between them

| Camp | Leaders | What they own | What they lack | Lesson for SML |
|---|---|---|---|---|
| **Family organisers** | Cozi, FamilyWall, TimeTree | Shared calendar, lists, some chores/meals | No money, no UK local-data, no renewals intelligence | Own the calendar+chores hub, then extend where they can't |
| **UK money apps** | Emma, Snoop, Plum, Monzo | Budgeting, Open Banking aggregation | No household/chores/calendar; **distrusted for aggressive upsell** | Be the trusted household money layer, not another aggregator |
| **Life-admin / vaults** | Doqit, SafeKeep (UK); Trustworthy (US) | Document storage + renewal reminders | Tiny; no calendar/chores/money/local | The UK mid-market (£40–50/yr) is wide open |
| **Local-area / property** | CrystalRoof (+StreetCheck), Locrating, bin-day apps | Area reports, schools, crime | Single-purpose, no daily use, no household | Fold local intelligence into a daily-use hub |

**The core insight:** every competitor is strong in one column and empty in the
others. SML's defensible position is the *row that spans all four* — and the UK
open-data local layer is the hardest column for a US-based family-organiser or a
finance-only app to copy.

### Hard-won lessons baked into this plan
- **Don't gut a free tier** (Cozi's May-2024 calendar paywall caused a ratings
  collapse; Emma's creep is its biggest reputational drag).
- **Per-family beats per-user pricing** (TimeTree's per-user premium is a
  persistent gripe; FamilyWall's per-family sub is better received).
- **Standalone aggregation is not a business** (Money Dashboard 2023; Moneyhub
  B2C 2026; Onedox 2019 — UK consumers won't pay for bill aggregation alone).
- **The "jack of all trades, master of none" risk is real** (FamilyWall's
  shallow modules). SML answers it with *depth via data integration*, not by
  matching every point app feature-for-feature.
- **Consolidation beats marketplaces** (Starling's marketplace fizzled; Monzo
  *bought* Habito). Owning the workflow beats linking out to it.

### Moats, honestly assessed
1. **Data integration across modules** — the connective tissue; hard to
   replicate because it requires all the modules to exist and share a model.
2. **UK local-data pipeline** — especially bin-day coverage, a maintenance moat
   nobody enjoys (§8).
3. **Trust** — a deliberately pro-consumer stance (transparent pricing,
   commission rebates) in a category where the incumbents are distrusted.
4. **Household network effects** — once a couple/family both use it and their
   shared history lives there, switching cost is high (the one thing point apps
   also enjoy, so we must earn it fast).

---

## 4. The connective-tissue thesis (why a hub, not a bundle)

A bundle of mediocre modules loses to best-in-class point apps. A *hub* wins only
if the modules talking to each other creates value none can alone. These are the
automations that justify SML's existence — build and market these first:

1. **Renewal → calendar → switch.** A detected renewal (insurance, energy,
   mortgage fixed-rate end) becomes a dated reminder *and* a money-saving prompt.
2. **Bill → budget → alert.** Known commitments populate the budget and drive
   "you're 80% through eating-out and it's the 14th."
3. **Mortgage scenario → budget + calendar.** Save a scenario; its payment feeds
   the budget and "fixed rate ends" lands with a 6-month lead.
4. **Document expiry → key date → reminder.** A passport/MOT scan's expiry
   auto-creates the renewal reminder.
5. **Meal plan → shopping list → grocery basket → groceries budget.** One flow
   from Tuesday's dinner to a priced basket at your supermarket.
6. **Move house → everything.** One playbook seeds the calendar, the local screen
   for the new postcode, the document checklist, and the utility-switch prompts.
7. **Chore + maintenance → tradesperson + warranty.** "Boiler service due" pulls
   your saved plumber and the boiler's warranty record.
8. **Morning digest.** One notification synthesising all of the above — the
   habit that makes SML a daily open, not a monthly chore.

Everything else is table stakes; *this* is the product.

---

## 5. The wedge & sequencing strategy

Rather than launch eight modules shallowly, launch the **Household Command
Centre** deeply, then expand along proven adjacencies.

- **Wedge (daily habit):** shared **Calendar + Chores + Lists + Bills/Renewals**.
  This is the highest-frequency, most-shareable, lowest-regulatory-risk surface,
  and it's where the family-organiser incumbents are beatable because they lack
  the money/renewals intelligence.
- **Acquisition surfaces (do early, cheap):** free **Tax & Mortgage calculators**
  as SEO landing pages, and a lightweight **Local/"moving house"** experience —
  both bring high-intent traffic without needing the full app.
- **Expansion (once the habit exists):** deepen **Money** (budgets → Open
  Banking), add **Documents/Vault**, **Meal planner**, **local depth**, then
  **households/roles** and **kid gamification**.
- **Monetisation turns on** when sharing + automation are compelling — sharing is
  the natural paywall (YNAB Together / Cozi Gold precedent).

---

## 6. Architecture & tech stack

### Recommended stack

| Layer | Choice | Rationale |
|---|---|---|
| Mobile | React Native (Expo) | One codebase iOS/Android; fast iteration |
| Web | Next.js (React) | Shares components/types with mobile via a monorepo; **SSR calculator pages are the SEO engine** |
| API | Node.js + TypeScript (NestJS or tRPC) | End-to-end type-safety with clients |
| Database | PostgreSQL (row-level security) | Relational fits budgets/chores/events; RLS enforces household scoping |
| Cache / queue | Redis + BullMQ | Recurrence generation, reminder fan-out, data-source refresh jobs |
| File storage | S3-compatible | Vault, receipts (encrypted at rest) |
| Auth | Managed (Clerk / Supabase Auth / Cognito) | Social login, MFA, household invites |
| Sync | **Buy, don't build** — PowerSync or ElectricSQL | Local-first sync is a company-killer to build; §15 |
| Push / email | OneSignal (free unlimited push) + SES/Resend | Cheap unified notifications (§10) |
| Billing | **RevenueCat** (IAP) **+ Stripe/Paddle** (web) | Unify entitlements, sell on web to save store fees (§9) |
| Maps/places | Geoapify or Mapbox; Overture for owned POI DB | Predictable pricing vs Google's per-SKU model (§8) |
| Analytics | PostHog (self-host) | Product metrics without selling data |
| LLM | Claude Haiku/Sonnet via API | Receipt OCR, NL entry, classification, RAG (§10) |

A **modular monolith** to start — one deployable API with clean module
boundaries (`money`, `chores`, `calendar`, `local`, `vault`, `notifications`,
`integrations`) — splitting services out only if scale demands. Calculators (tax,
mortgage) are **pure, versioned TypeScript packages** shared by client and server,
so they run offline and are unit-testable in isolation.

### Key engineering decisions
1. **One RFC 5545 (RRULE) recurrence engine** for chores, bills and events — do
   not build three.
2. **Rules-as-data for tax** — bands/thresholds in versioned JSON packs per region
   and tax year (UK first, Scottish bands as a sub-region); the engine is generic.
   Golden-file tests per tax year, validated against HMRC worked examples.
3. **Calendar as projection** — modules emit "date-bearing facts"; the calendar
   subscribes. Keeps modules decoupled and is *the* connective-tissue enabler.
4. **Local-first clients** with a bought sync layer, so the app is instant and
   works on the tube.
5. **An `integrations` gateway** — every external API sits behind an internal
   adapter with caching, rate-limit handling, and graceful degradation, so a
   dead data source hides a card rather than breaking a screen (§8, §14).

### High-level data model (unchanged core, extended)
```
User ─┬─ Membership ── Household (roles: owner / adult / child)
      ├─ Budget ── Category ── Transaction (recurring rule optional)
      ├─ Commitment (bill/subscription: due, amount, renews_at, price history)
      ├─ SavingsGoal
      ├─ Chore (recurrence, assignment strategy) ── ChoreOccurrence (due, done_by)
      ├─ MaintenanceItem ── MaintenanceLogEntry
      ├─ CalendarLayer ── Event (one-off | recurring | derived: bill/chore/renewal)
      ├─ KeyDate (type: birthday/renewal/expiry, lead_time)
      ├─ Document (encrypted-at-rest ref, expiry → KeyDate)
      ├─ List ── ListItem ; MealPlanEntry ; PantryItem
      ├─ SavedPlace / ServiceContact
      └─ Postcode (home/work) → drives the Local module
```
Derived events (a bill's due date, a chore occurrence, a document expiry) are
**projected** into the calendar, never duplicated.

---

## 7. Roadmap

Re-scoped to be credible. Timeboxes assume a small team (≈3–5 engineers) and are
deliberately more conservative than v1.

### Phase 0 — Foundations & acquisition assets (~6 weeks)
- Monorepo, auth, CI/CD, the `integrations` gateway skeleton, analytics.
- **Free web calculators live** (take-home pay + mortgage/SDLT) as SSR SEO pages —
  start ranking *before* the app ships.
- Waitlist + "moving house" landing page.

### Phase 1 — The Household Command Centre / MVP (~3–4 months)
Goal: a genuinely useful *daily* app for one household.
- Onboarding wizard (home postcode, GBP, UK tax year defaults).
- **Calendar** (events, key dates + reminders, **read-only** Google/iCal import).
- **Chores** (creation, recurrence, completion, calendar display, basic fairness).
- **Lists** (shared, real-time).
- **Money as commitments** (bill/renewal calendar, subscription tracker, manual
  budgets, savings goals) — **no Open Banking**.
- **Dashboard v1** + **morning digest** (the retention engine).
- **Notifications engine v1** (push + digest, quiet hours).
- Local v0: **bin days (manual + crowdsourced)** and **food hygiene ratings** —
  the two cheapest, highest-delight local wins.

### Phase 2 — Households, sharing & the paywall (~2–3 months)
- Household creation, invites, roles (owner/adult/child); shared chores with
  rotation and fairness view; kid-safe child view.
- Shared budgets and expense splitting ("who owes whom").
- **Local v1**: nearby essentials, crime, schools (report-card model), flood,
  broadband, council-tax band — the "moving house" screen.
- **Monetisation goes live** — Free vs **SML Premium (household)**; sharing +
  automation behind the paywall (§9).
- Web checkout (Stripe/Paddle) + RevenueCat entitlements.

### Phase 3 — Depth & intelligence (~3–4 months)
- **Open Banking** (agent-of-AISP): auto transaction import & categorisation;
  spare-change automation.
- **Document vault** with expiry reminders; warranty tracker.
- **Meal planner** → shopping list → budget; **grocery basket hand-off** (start
  with one grocer; Ocado is the differentiator target).
- **AI mental-load capture** (email/voice/screenshot → task/event) and
  **"ask your household"** RAG.
- **Kid gamification**; **home maintenance log**; **moving-house playbook**.
- Two-way calendar sync (once CASA/per-account economics justify it).
- **MTD-readiness** checker + quarterly reminders (free); paid filing/partnership
  evaluated.

### Phase 4 — Ecosystem & revenue expansion
- **Trust-first switching** (energy/broadband/mobile) — second revenue line (§9).
- **B2B2C**: employee-benefit distribution; FS/building-society white-label (§9).
- Smart-meter energy dashboard (Octopus/Hildebrand); area alerts (weather,
  roadworks); household-display mode; widgets; voice quick-add.
- Second-region groundwork (rules-as-data makes Ireland/US packs cheaper).

---

## 8. API & data-integration strategy

The UK's open-data estate is SML's unfair advantage — but it is littered with
landmines. This section is the costed, prioritised, de-risked plan. Fuller notes
in §16.

### 8.1 Priority tiers (build order by value ÷ effort)

**Tier 1 — integrate in Phase 1 (free, no-key or trivial, high delight):**
| API | Use | Auth / cost |
|---|---|---|
| **postcodes.io** | Geolocation backbone (postcode → lat/lng/ward/LSOA) | Free, no key, self-hostable |
| **FSA Food Hygiene (FHRS)** | Ratings on nearby food businesses | Free, no key |
| **data.police.uk** | Street-level crime for the local screen | Free, no key |
| **GOV.UK Bank Holidays JSON** | Calendar/reminder logic | Free, one endpoint |
| **NESO Carbon Intensity** | "Greenest time to run appliances" | Free, no key |
| **Environment Agency Flood-Monitoring** | Flood warnings + river levels | Free, no key |

**Tier 2 — Phase 2 (free key or moderate effort, high value):**
Companies House; TfL Unified API (London); Bus Open Data Service; GOV.UK Content
API (surface official guidance); HM Land Registry Price Paid + **EPC** (⚠ migrate
to the new "Get energy performance of buildings data" service — the old
opendatacommunities endpoint **retires 30 May 2026**); Ofcom broadband coverage;
Met Office DataHub site-specific forecast (⚠ free tier only 360 calls/day —
**cache aggressively**).

**Tier 3 — Phase 3+ (higher effort or user-consent flows):**
DVSA MOT History (OAuth 2.0; old API deprecated 1 Sep 2025) + DVLA Vehicle
Enquiry Service (⚠ **verify new registrations are open** — reported temporarily
closed) as a car-owner pair; Octopus Energy (tariffs open; consumption needs
user key); Hildebrand Glowmarkt/n3rgy (user's own smart-meter data via DCC —
consent friction); planning.data.gov.uk + PlanIt (planning applications).

### 8.2 Deliberately deprioritised (friction or cost outweighs value)
- **HMRC MTD/SA APIs** — heavy compliance (OAuth + mandatory fraud-prevention
  headers + software recognition + penalties). **The take-home-pay calculator
  needs no API — the bands are public; implement locally.** SA-deadline reminders
  are fixed dates. Defer real MTD filing to Phase 4 / partnership.
- **NHS Website Content + Service Search** — production access is onboarding-gated
  and the developer portal is mid-migration (old portal retiring Spring 2026).
  Plan lead-time; use OSM/Places for non-clinical "find a pharmacy" in the interim.
- **Benefits calculators** (entitledto, Policy in Practice) — accurate entitlement
  maths is **paid commercial licence only**. Descope to gov.uk signposting, or
  budget a licence if it becomes core.
- **Address autocomplete** — ⚠ **getAddress.io shut down 4 Feb 2026** (High Court
  ruling). Use **Ideal Postcodes** (autocomplete free, pay per resolved address)
  or Loqate; note **OS Places is excluded from OS Data Hub's free credit**, so
  it's a cost centre.
- **Electoral register, one.network, TV Licensing** — no usable open API.

### 8.3 The bin-day problem (handled honestly)
There is **no national bin-collection API**; ~380 councils each publish
differently. The pragmatic strategy, in order:
1. **Manual entry + crowdsourcing** as the always-works baseline (Phase 1).
2. **Official council feeds/iCal** where they exist (opportunistic).
3. **Open-source scraper datasets** (e.g. the UKBinCollectionData project, 160+
   councils) as an accelerant — with the explicit understanding that **scraper
   maintenance is the moat and the liability** (councils change sites; feeds
   break). Budget ongoing maintenance; **surface coverage gaps to users** ("no
   feed for your council yet — set it manually") rather than failing silently.

### 8.4 Commercial APIs (costed)
| Need | Choice | Cost signal |
|---|---|---|
| **Open Banking** (Phase 3) | Agent-of-AISP via TrueLayer/Plaid/Yapily | ~4–6 wks onboarding vs 3–6+ months for own licence; per-connection £ sales-gated. *(GoCardless's free 50-connection tier is **closed to new signups** since ~2025.)* |
| **Calendar sync** | MS Graph (free) direct; **Cronofy/Nylas** to absorb Google's **CASA** burden | Direct Google = ~$3k/yr CASA Tier 2 + eng; Cronofy/Nylas ≈ $0.69–$2 per connected account/mo |
| **Places/POI** | Geoapify or Mapbox (100k/mo free); **Overture** for an owned POI DB | Predictable vs Google's per-SKU model |
| **Receipt OCR** | **LLM vision (Claude Haiku / Gemini Flash)** | ~$0.0016/receipt — 10–50× cheaper than Veryfi/Taggun/Mindee |
| **Recipes** | Spoonacular (free → $29–149/mo) | Dev-friendly; UK grocer *price* data has no clean official API (Pepesto-style vendors or scraping) |
| **Grocery basket hand-off** | Per-grocer integration; Mealia/Cherrypick show it's feasible | Ocado = whitespace; grocers now build native recipe→basket, so **aggregate across grocers**, don't compete single-store |
| **Push / email / SMS** | OneSignal (free push) + SES/Resend; Twilio SMS only for 2FA | SMS ~4–5p each — push-first |

---

## 9. Monetisation & pricing

Three revenue lines, deliberately layered so no single one carries the company —
the mistake that killed the standalone aggregators.

### 9.1 Subscription (primary)
Benchmark-anchored: UK consumer-utility apps live in the **£30–80/yr** band;
hard-ish paywalls convert ~5× better than pure freemium on install-to-paid;
annual plans retain best; month-1 activation is the decisive lever.

| Tier | Price | Who | What's included |
|---|---|---|---|
| **Free** | £0 | Individuals, trial households | Full **calculators** (forever); personal calendar; basic chores & lists; bill/renewal reminders (capped count); local basics (bin day, food hygiene, crime); **one household of 2** |
| **SML Premium (Household)** | **£49.99/yr** (or £5.99/mo) | Couples & families | Unlimited household members; **all sharing** (shared budgets, chores rotation, expense splitting); Open Banking sync; document vault + expiry automation; meal planner + basket hand-off; full local intelligence; AI mental-load capture & "ask your household"; morning-digest customisation; priority support |
| **Family+** | **£79.99/yr** | Larger families | Premium for up to 6, kid gamification, more vault storage |

Design rules (from competitor failures): **annual-first** presentation with a
14–30 day trial; **never gut the free tier retroactively**; per-**household**, not
per-user; no surprise post-trial charges; transparent pricing. Sell on **web
checkout** (Stripe/Paddle) to recover ~30% of store commission, with RevenueCat
unifying web + IAP entitlements; enrol Apple Small Business Program (15%) and
Google's 15% tier (both apply under $1M). *(UK App Store external-link commission
relief does not yet apply — plan for 15% IAP in-app.)*

### 9.2 Trust-first switching (secondary, Phase 4)
The app *knows* renewal dates, so switching is a natural, high-relevance moment
(energy ~£30–40/switch, broadband ~£40–70, insurance per-lead). **Two models
considered; recommend the Nous-style trust play:** surface deals, execute
switches, and **rebate the commission to the user** (or run it commission-neutral
inside Premium) rather than the price-comparison "keep the commission" model —
because trust is SML's moat and the incumbents are distrusted precisely here. All
switching is **opt-in, disclosed, and never re-orders results for margin.**
Switching revenue is lumpy and seasonal — it complements, never replaces,
subscription.

### 9.3 B2B2C (tertiary, Phase 4) — the real path to SaaS scale
- **Employee financial-wellbeing benefit** — employers pay a per-seat fee to give
  staff SML Premium (a proven consumer-fintech distribution route that also slashes
  CAC).
- **FS / building-society white-label** — the household layer embedded in a bank's
  or lender's app (Legado's ~500k-user B2B2C playbook; Lumio↔Lloyds precedent).
  Owning the workflow is what Monzo paid for with Habito.

### 9.4 What we will *not* do
No selling of user data; no advertising; no dark-pattern trials. In a category
built on holding someone's whole life, **trust is the product** (Nous's explicit
stance, and the direct answer to Emma's reputational drag).

---

## 10. Unit economics (illustrative model)

Rough, benchmark-based — to be replaced with real cohort data post-launch.

**Cost to serve one active user / month:**
| Item | Estimate |
|---|---|
| Infra (compute, Postgres, storage, bandwidth) | ~£0.20–0.50 |
| LLM features (receipt OCR + NL entry + classification, Haiku-class) | **~£0.03–0.08** (≤£0.30 even at 5× usage) |
| Push/email (OneSignal free push + SES) | ~£0.01 |
| Open Banking data (paying users only, Phase 3) | per-connection, sales-gated — model at ~£0.10–0.30/connected user/mo *(verify)* |
| Calendar sync (paying users with sync) | ~£0.55–£1.50 if via Cronofy/Nylas; ~£0 via MS Graph + amortised CASA |
| **Blended cost/active user** | **~£0.30–£1.00** (higher for paying users with OB + sync) |

**Revenue & LTV:**
- Premium at £49.99/yr, sold annual-first. Store/processing take ~15% (IAP) or
  ~2–3% (web) → net ~£42–49/yr.
- Benchmark Year-1 realised LTV for a £4–5/mo app is ~£20–40/payer without strong
  retention; SML's household network effects + morning-digest habit target the
  upper end and beyond via annual mix.
- **Gross margin per paying user is healthy** (~£40 net revenue vs ~£3–12/yr
  serving cost). **The binding constraint is CAC and month-1 retention, not COGS.**
  AI cost — the thing people fear — is negligible.

**Implication:** obsess over (1) free→paid conversion, (2) annual-plan share, and
(3) month-1 activation. Keep Open Banking and paid calendar sync as *paying-tier*
costs so free users stay near-zero to serve.

---

## 11. Go-to-market

v1 had no GTM. The first 10,000 households arrive through three motions:

1. **Calculator SEO (evergreen, cheap).** Take-home-pay and mortgage/SDLT
   calculators are among the highest-volume UK personal-finance search terms and
   are classic organic-acquisition magnets. Ship them as fast SSR pages in Phase
   0, rank before the app launches, and convert calculator users into app
   sign-ups ("save this scenario → get a reminder when your fixed rate ends").
2. **The "moving house" wedge (high intent).** Movers are simultaneously choosing
   a mortgage, researching an area (schools/crime/broadband/bins), switching
   utilities, and updating documents — every SML module at once. A free
   moving-house checklist + area report is a high-intent front door; partner with
   conveyancers/estate agents and the digital-property-logbook ecosystem (RLBA,
   ~250k UK homes) for distribution.
3. **Life-event & seasonal triggers.** MTD deadline (Jan/April), tax-year end
   (April ISA/pension reminders), new-baby and new-job playbooks — content and
   product hooks aligned to moments of maximum life-admin pain.

Supporting: a genuinely useful free tier as its own funnel; referral mechanics
within households (every invite is an acquisition); B2B2C (§9.3) as the CAC-slashing
channel at scale. Paid acquisition stays secondary until organic CAC/LTV is proven.

---

## 12. Cross-cutting concerns

**Households & sharing.** A user belongs to zero or more households; chores, shared
budgets, calendars, lists and the vault can be household-scoped. Roles: owner,
adult, child (chores + family calendar only, no finances). Everything is
**private by default**; sharing is opt-in per item or category.

**Notifications engine.** One engine drives every reminder (bills, chores,
renewals, events, budget alerts) with per-module quiet hours, **digest mode**
(one 8am summary — the retention lever) vs individual pings, and channel choice
(push default; email; SMS reserved for 2FA/critical).

**Privacy & security.** Financial and document data encrypted at rest;
biometric/PIN app lock with a separate lock on money and vault. UK GDPR / DPA 2018
compliant; full data export (JSON/CSV) and account deletion; ICO registration.
Calculators carry "estimate, not advice" disclaimers showing their tax-year
version. Coarse location by default for local features. **Open Banking and any
future MTD work bring FCA/HMRC obligations — scope the regulatory perimeter before
building, not after** (§14).

**Offline & sync.** Local-first for lists, chores and calendar with background
sync (bought layer); calculators fully offline. Conflict resolution:
last-write-wins per field, tombstones for deletions.

**Accessibility & i18n.** WCAG 2.1 AA, dynamic type, screen-reader labels on all
charts; currency/date/tax rules driven by locale/region settings.

---

## 13. Key product decisions (resolved)

| Decision | Resolution | Why |
|---|---|---|
| Money module MVP scope | **Commitments-first** (bills/renewals/subs), OB in Phase 3 | Manual entry churns; known-date commitments need no bank link |
| Calculators | **Free forever, SEO assets** | Commoditised; they acquire, they don't monetise |
| Vault encryption | **Encrypted-at-rest + server-side processing**, not E2E | Enables OCR/expiry extraction; a real feature beats a marketing line |
| Calendar sync | **Read-only import MVP**, two-way in Phase 3 | Two-way needs CASA ($3k/yr) + per-account cost — earn it first |
| Pricing unit | **Per-household, annual-first** | Per-user is the top gripe; annual retains best |
| Sync layer | **Buy (PowerSync/ElectricSQL)** | Building sync is a company-killer |
| Bin-day data | **Manual + crowdsource primary; feeds/scrapers opportunistic** | No national API; scraper maintenance is a real cost |
| Four-nations tax | **Yes at launch** (Scottish bands, LBTT/LTT, rUK) | Rules-as-data makes it cheap; movers need it |
| Web app | **Ship alongside mobile** | Needed for SEO, web billing, desktop admin |

---

## 14. Risks & mitigations

| Risk | Mitigation |
|---|---|
| **Scope sprawl** — "everything app" ships nothing well | Strict wedge-first sequencing (§5); MVP is one household, commitments-only money, no OB; ruthless phase gates |
| **No daily habit** — hub used monthly, churns | Morning digest + shared calendar/chores as the daily anchor; instrument the ≥2-modules metric from day one |
| **Tax/mortgage figures wrong → user harm + liability** | Rules-as-data + golden-file tests per tax year vs HMRC worked examples; prominent "estimate only"; refresh packs each Budget |
| **Data-source fragility** (bin scrapers, council sites, API deprecations) | `integrations` gateway with caching + graceful degradation; hide a card rather than break a screen; surface coverage gaps to users; track the dated landmines in §8 |
| **Platform risk** (Apple/Google policy, commission, review) | Web checkout to reduce fee dependence; RevenueCat abstraction; enrol SBP/15% tiers; watch DMA/Billing-Choice changes |
| **Open Banking cost/compliance** | Defer to Phase 3; **agent-of-AISP**, not own licence; manual + recurring entry is the always-works fallback |
| **Trust breach / privacy mistake** | Private-by-default; explicit share flows; child role has no finance access; encryption at rest; penetration test before Phase 2; no data sale, ever |
| **Regulatory perimeter** (FCA for OB/switching, HMRC for MTD) | Scope perimeter before building each; partner/agent models to borrow compliance; keep non-regulated fallbacks |
| **LLM cost creep** | Haiku/Flash-class models, batch + prompt caching; cost is ~£0.03–0.30/user — monitored but not a threat |
| **Notification fatigue → uninstalls** | Digest-first defaults, per-module controls, "snooze all" |
| **CAC > LTV** | Organic-first (calculator SEO, moving-house wedge, referrals); B2B2C to slash CAC; don't scale paid until CAC/LTV proven |
| **Incumbent fast-follow** (Monzo/Revolut add household features) | Move fast on the UK local-data moat they won't prioritise; own the non-finance household surface they lack |

---

## 15. Open questions (v1) — resolved, plus new ones

**Resolved from v1:**
1. **Launch region** — UK, four-nations tax coverage at launch (rules-as-data
   makes Scottish bands + LBTT/LTT cheap; NI uses rUK income tax).
2. **Mobile vs web** — **ship both**; web is required for SEO calculators, billing
   and desktop admin.
3. **Kids' gamification** — **Phase 3**, not MVP.
4. **Sync layer** — **buy** (PowerSync/ElectricSQL).
5. **Bin-day strategy** — **manual + crowdsource primary**, feeds/scrapers
   opportunistic; scraper maintenance is a budgeted cost.

**New questions for this stage:**
1. **Wedge validation** — do target households actually adopt the calendar+chores+
   commitments combo as a *daily* habit? (Test with the Phase-1 cohort before
   funding Phase 3.)
2. **Willingness to pay** — is £49.99/yr/household the right point, and does
   sharing convert as the paywall? (A/B the trial length and price.)
3. **Switching revenue vs trust** — does surfacing deals dent trust even when
   commission is rebated? (Qualitative test in Phase 4.)
4. **B2B2C timing** — pursue the employee-benefit/white-label channel earlier
   (faster revenue, slower product focus) or later?
5. **Grocery basket depth** — is Ocado integration worth the build as a
   differentiator, or is a single-grocer hand-off enough for v1 of the meal module?

---

## 16. Research appendix — sources & competitor detail

This plan is grounded in market research conducted **July 2026**. Figures marked
*(verify)* or UNVERIFIED throughout rely on secondary sources or fast-moving data
and should be re-checked before you build on them.

### 16.1 Competitors researched (headline pricing/status)
- **Family organisers:** Cozi (Gold $39/yr, Max $79.99/yr; May-2024 free-tier
  paywall backlash), FamilyWall ($44.99/yr per family; most complete but shallow
  modules), TimeTree (£35/yr **per user**; calendar+chat only) — Cozi & FamilyWall
  now under OurFamilyWizard's "In Tandem" parent.
- **Chore apps:** Sweepy, Tody, Nipto, OurHome (relaunched by Elusios), Flatastic
  (settle-up), Maple (growing), Hearth Display ($699 + $9/mo), Skylight Calendar
  (hardware + $79/yr Plus), Jam & Milo (AI mental-load, US, premium-priced).
- **Meal/shopping:** Mealime, Paprika, Samsung Food, Jow, Bring!, AnyList,
  Listonic, KitchenPal; **UK grocery basket hand-off:** Mealia (all four grocers),
  Cherrypick (Tesco+Sainsbury's); Tesco/Sainsbury's now build native recipe→basket;
  **Ocado is unserved whitespace**.
- **UK money:** Emma (£4.99–14.99/mo; upsell-distrust), Snoop (£5.99/mo),
  Plum (£3.99–14.99/mo), Moneyhub (**closing B2C 2026**), HyperJar, Nous
  (commission-rebate model), Lumio (couples; Lloyds partner), YNAB, Cleo. **Money
  Dashboard closed 2023** — the standalone-aggregator cautionary tale.
- **Mortgage/tax:** Sprive (overpayment), Tembo, Habito (**acquired by Monzo,
  2026**), HMRC app, untied, TaxScouts→Taxfix, Coconut; **MTD ITSA mandate from
  6 April 2026**.
- **Local/property:** CrystalRoof (**acquired StreetCheck, Mar 2026**), Locrating
  (£8/mo school-move tool), police.uk, GOV.UK/Ofsted (**report cards from Nov
  2025**), bin-day apps + the UKBinCollectionData scraper ecosystem.
- **Life-admin/vaults:** Doqit (£39.99/yr — closest UK competitor), SafeKeep,
  RunMyHome, Trustworthy (US, $120–480/yr), Everplans, Legado (UK B2B2C),
  **Onedox (shut 2019 — UK won't pay for bill aggregation)**, Homer, Chimni.

### 16.2 Key dated landmines to design around
getAddress.io **shut down 4 Feb 2026**; EPC opendatacommunities **retires 30 May
2026** (use "Get energy performance of buildings data"); NHS developer portal
**migrating Spring 2026**; Ofsted **report cards from 10 Nov 2025** (old/new grades
not comparable, no clean API); DVSA MOT **old API deprecated 1 Sep 2025** (OAuth
now); DVLA VES new registrations **possibly closed — verify**; Met Office DataHub
**replaced DataPoint (2025)**, free tier 360 calls/day; GoCardless free
open-banking tier **closed to new signups**; Google Calendar restricted scope
needs **annual CASA (~$3k/yr)**; MTD ITSA **>£50k from April 2026**.

### 16.3 Benchmark headlines (RevenueCat State of Subscription Apps 2025/26)
Download→paid median **12.1% hard paywall vs 2.2% freemium**; trial→paid **9.8%
(high-priced) vs 4.3% (low-priced)**; **17–32 day trials convert best**; annual
plans retain ~44% but **~72% cancel within Year 1** (Month 1 = ~35% of those);
UK utility sweet spot **£30–80/yr**; web checkout recovers ~30% margin; AI apps
carry a **+41% LTV premium**.

### 16.4 Selected source URLs
Competitor pricing/status: cozi.com/cozi-gold, familywall.com/premium,
timetreeapp.com/intl/en/premium, help.emma-app.com, snoop.app/plus,
withplum.com/plans, nous.co/how-it-works, sprive.com, tembomoney.com,
mortgagestrategy.co.uk (Monzo/Habito), moneytothemasses.com (Money Dashboard),
crystalroof.co.uk/blog (StreetCheck acquisition), locrating.com, doqit.io,
trustworthy.com/pricing, joinlegado.com, mealia.co.uk, cherrypick.co.
UK/gov APIs: postcodes.io, api.ratings.food.gov.uk, data.police.uk/docs,
api.carbonintensity.org.uk, environment.data.gov.uk/flood-monitoring,
osdatahub.os.uk, get-energy-performance-data.communities.gov.uk,
developer.company-information.service.gov.uk, api.tfl.gov.uk,
data.bus-data.dft.gov.uk, documentation.history.mot.api.gov.uk,
datahub.metoffice.gov.uk, api.octopus.energy, developer.service.hmrc.gov.uk,
gov.uk/guidance/find-out-if-and-when-you-need-to-use-making-tax-digital-for-income-tax.
Commercial/benchmarks: truelayer.com/data, plaid.com/en-gb/pricing,
developers.google.com/maps/billing-and-pricing/march-2025, cronofy.com/api-pricing,
nylas.com/pricing, geoapify.com/pricing, veryfi.com/pricing, taggun.io/pricing,
spoonacular.com/food-api/pricing, onesignal.com/pricing, revenuecat.com/pricing,
revenuecat.com/state-of-subscription-apps, platform.claude.com/docs/en/about-claude/pricing.

> The full competitor tables, the complete ~30-API catalogue (auth/cost/limits per
> API), and the full benchmark digest that back this plan are retained in the
> project research notes and can be expanded into standalone appendices on request.
