# Frontend Page and Component Architecture

## Rendering strategy

- Server Components by default for page shells, authenticated reads and SEO content.
- Client Components only for interaction, browser APIs, maps, drag-and-drop, streaming and local optimistic state.
- Server Actions for tightly coupled form mutations.
- Route handlers for stable API contracts, streaming, webhooks and external integrations.
- Suspense boundaries around trip summary, weather, map and AI panels.
- URL state for filters, selected day, map viewport and shareable exploration state.

## Page map

### Marketing

- Home: value proposition, planner demo, social proof, featured destinations and call to action.
- Features: AI planning, collaboration, weather-aware planning and trusted sources.
- Destination directory and SEO destination detail.
- Pricing, about, privacy and terms.

### Authentication and onboarding

- Sign in, sign up, verification, recovery and auth error.
- Onboarding wizard: home location, interests, pace, budget, dietary and accessibility preferences.

### Product

- Dashboard: upcoming trips, drafts, recent activity, saved places and quick AI start.
- Trips index: status filters, cards/table and archived trips.
- New trip wizard: destination, dates, party, budget, interests and generation preference.
- Trip overview: summary, collaborators, planning progress, alerts and shortcuts.
- Itinerary: day timeline, drag/reorder, item editor, conflicts and AI copilot.
- Map: synchronized map/list, route lines and day/category filters.
- Weather: forecast timeline, confidence/freshness and itinerary advisories.
- Places: recommendations, search, filters and save/add actions.
- Documents: uploads, processing state, source scope and deletion.
- Activity: collaboration audit feed and comments.
- Trip settings: details, members, permissions, export and deletion.
- Explore: curated and personalized destination discovery.
- User settings: profile, preferences, security, integrations and billing.

### Administration

- Operational overview.
- User and account support.
- Knowledge sources, revisions and ingestion jobs.
- AI run diagnostics with redacted content.
- Feature flags and audit viewer.

## Component hierarchy

```text
RootLayout
├─ ThemeProvider
├─ SessionProvider
├─ Query/MutationProvider
├─ TelemetryProvider
├─ ToastProvider
└─ RouteGroupLayout
   ├─ MarketingShell
   │  ├─ MarketingHeader
   │  ├─ MainContent
   │  └─ MarketingFooter
   └─ ProductShell
      ├─ AppSidebar
      │  ├─ Brand
      │  ├─ PrimaryNavigation
      │  ├─ TripSwitcher
      │  └─ AccountMenu
      ├─ ProductHeader
      │  ├─ Breadcrumbs
      │  ├─ CommandPaletteTrigger
      │  ├─ NotificationCenter
      │  └─ UserMenu
      └─ PageContent
```

### Trip page

```text
TripLayout
├─ TripHeader
│  ├─ EditableTripTitle
│  ├─ TripDateRange
│  ├─ MemberAvatars
│  ├─ ShareDialog
│  └─ TripActions
├─ TripNavigation
└─ TripPage
   ├─ TripStatusSummary
   ├─ WeatherAlertBanner
   ├─ PlanningProgress
   ├─ NextItems
   ├─ MiniMap
   └─ AICopilotLauncher
```

### Itinerary page

```text
ItineraryPage
├─ ItineraryToolbar
│  ├─ DaySelector
│  ├─ ViewModeToggle
│  ├─ ConflictIndicator
│  └─ GeneratePlanButton
├─ ItineraryWorkspace
│  ├─ DayTimeline
│  │  └─ ItineraryItemCard[]
│  │     ├─ TimeRange
│  │     ├─ PlaceSummary
│  │     ├─ WeatherBadge
│  │     ├─ BookingStatus
│  │     └─ ItemActions
│  ├─ ContextMap
│  └─ AICopilotPanel
│     ├─ Conversation
│     ├─ SourceCitations
│     ├─ ToolProgress
│     └─ ProposalReview
└─ ItineraryItemSheet
```

### AI proposal review

```text
ProposalReview
├─ ProposalSummary
├─ ValidationStatus
├─ DayDiff[]
│  ├─ AddedItems
│  ├─ ChangedItems
│  └─ RemovedItems
├─ CitationDrawer
├─ CostAndPaceSummary
└─ ReviewActions
   ├─ ApplyProposal
   ├─ RefineProposal
   └─ RejectProposal
```

## State ownership

| State | Owner |
|---|---|
| Authenticated resource data | Server Components and server cache |
| Mutable remote data | API/server actions with optimistic UI |
| Form state | React Hook Form + Zod |
| Ephemeral UI state | Local component state |
| Shareable filters and selection | URL search parameters |
| AI streaming state | Run store scoped to run ID |
| Map viewport and selected markers | Map feature context |

Avoid a global client store until a concrete cross-route state problem exists.

## Design system

- shadcn/ui primitives are copied into `components/ui` and treated as owned source.
- Semantic VoyageAI components live outside `ui`.
- Design tokens cover color, type, spacing, radii, shadows, motion and data visualization.
- Every interactive control supports keyboard use, visible focus and accessible naming.
- Target WCAG 2.2 AA.
- Reduced motion, high contrast, responsive touch targets and screen-reader announcements are first-class.
- Maps always have an equivalent list/timeline experience.

## Performance budgets

- Keep client JavaScript off informational and server-rendered surfaces.
- Lazy-load maps, rich editors and drag-and-drop.
- Use responsive image optimization and explicit dimensions.
- Prevent waterfalls by co-locating server reads and parallelizing independent requests.
- Virtualize long itinerary/activity lists.
- Track Core Web Vitals by route, device class and release.

