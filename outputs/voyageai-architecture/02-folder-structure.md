# Complete Folder Structure

```text
voyageai/
├─ .azure/                         # Local azd environment state; never committed with secrets
├─ .foundry/                       # Foundry metadata, eval suites and local result references
│  ├─ agent-metadata.yaml
│  ├─ suites/
│  ├─ datasets/
│  ├─ evaluators/
│  └─ results/
├─ .github/
│  ├─ CODEOWNERS
│  ├─ dependabot.yml
│  └─ workflows/
│     ├─ ci.yml
│     ├─ preview.yml
│     ├─ deploy.yml
│     ├─ database-migrate.yml
│     ├─ security-scan.yml
│     └─ rag-evaluation.yml
├─ .husky/
├─ apps/
│  ├─ web/
│  │  ├─ public/
│  │  │  ├─ brand/
│  │  │  ├─ icons/
│  │  │  ├─ images/
│  │  │  └─ manifest/
│  │  ├─ src/
│  │  │  ├─ app/
│  │  │  │  ├─ (marketing)/
│  │  │  │  │  ├─ page.tsx
│  │  │  │  │  ├─ features/page.tsx
│  │  │  │  │  ├─ destinations/page.tsx
│  │  │  │  │  ├─ pricing/page.tsx
│  │  │  │  │  ├─ about/page.tsx
│  │  │  │  │  ├─ privacy/page.tsx
│  │  │  │  │  └─ terms/page.tsx
│  │  │  │  ├─ (auth)/
│  │  │  │  │  ├─ sign-in/page.tsx
│  │  │  │  │  ├─ sign-up/page.tsx
│  │  │  │  │  ├─ verify/page.tsx
│  │  │  │  │  ├─ forgot-password/page.tsx
│  │  │  │  │  └─ error/page.tsx
│  │  │  │  ├─ (product)/
│  │  │  │  │  ├─ layout.tsx
│  │  │  │  │  ├─ dashboard/page.tsx
│  │  │  │  │  ├─ onboarding/page.tsx
│  │  │  │  │  ├─ trips/
│  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  ├─ new/page.tsx
│  │  │  │  │  │  └─ [tripId]/
│  │  │  │  │  │     ├─ layout.tsx
│  │  │  │  │  │     ├─ page.tsx
│  │  │  │  │  │     ├─ itinerary/page.tsx
│  │  │  │  │  │     ├─ map/page.tsx
│  │  │  │  │  │     ├─ weather/page.tsx
│  │  │  │  │  │     ├─ places/page.tsx
│  │  │  │  │  │     ├─ documents/page.tsx
│  │  │  │  │  │     ├─ activity/page.tsx
│  │  │  │  │  │     └─ settings/page.tsx
│  │  │  │  │  ├─ explore/
│  │  │  │  │  │  ├─ page.tsx
│  │  │  │  │  │  └─ [destinationSlug]/page.tsx
│  │  │  │  │  ├─ saved/page.tsx
│  │  │  │  │  ├─ notifications/page.tsx
│  │  │  │  │  └─ settings/
│  │  │  │  │     ├─ profile/page.tsx
│  │  │  │  │     ├─ preferences/page.tsx
│  │  │  │  │     ├─ security/page.tsx
│  │  │  │  │     ├─ integrations/page.tsx
│  │  │  │  │     └─ billing/page.tsx
│  │  │  │  ├─ admin/
│  │  │  │  │  ├─ layout.tsx
│  │  │  │  │  ├─ page.tsx
│  │  │  │  │  ├─ users/page.tsx
│  │  │  │  │  ├─ knowledge/page.tsx
│  │  │  │  │  ├─ ai-runs/page.tsx
│  │  │  │  │  ├─ feature-flags/page.tsx
│  │  │  │  │  └─ audit/page.tsx
│  │  │  │  ├─ api/
│  │  │  │  │  ├─ auth/[...nextauth]/route.ts
│  │  │  │  │  ├─ v1/
│  │  │  │  │  │  ├─ trips/
│  │  │  │  │  │  ├─ itinerary/
│  │  │  │  │  │  ├─ places/
│  │  │  │  │  │  ├─ weather/
│  │  │  │  │  │  ├─ ai/
│  │  │  │  │  │  ├─ knowledge/
│  │  │  │  │  │  ├─ uploads/
│  │  │  │  │  │  └─ notifications/
│  │  │  │  │  ├─ internal/
│  │  │  │  │  │  ├─ tools/
│  │  │  │  │  │  ├─ jobs/
│  │  │  │  │  │  └─ health/
│  │  │  │  │  └─ webhooks/
│  │  │  │  │     ├─ billing/
│  │  │  │  │     └─ auth/
│  │  │  │  ├─ auth.ts
│  │  │  │  ├─ error.tsx
│  │  │  │  ├─ global-error.tsx
│  │  │  │  ├─ layout.tsx
│  │  │  │  ├─ loading.tsx
│  │  │  │  ├─ not-found.tsx
│  │  │  │  ├─ robots.ts
│  │  │  │  └─ sitemap.ts
│  │  │  ├─ components/
│  │  │  │  ├─ ui/                # Generated shadcn/ui primitives only
│  │  │  │  ├─ shell/
│  │  │  │  ├─ marketing/
│  │  │  │  ├─ auth/
│  │  │  │  ├─ trips/
│  │  │  │  ├─ itinerary/
│  │  │  │  ├─ maps/
│  │  │  │  ├─ weather/
│  │  │  │  ├─ ai/
│  │  │  │  ├─ knowledge/
│  │  │  │  ├─ collaboration/
│  │  │  │  ├─ billing/
│  │  │  │  └─ shared/
│  │  │  ├─ features/
│  │  │  │  ├─ identity/
│  │  │  │  ├─ trips/
│  │  │  │  ├─ itinerary/
│  │  │  │  ├─ places/
│  │  │  │  ├─ ai-planning/
│  │  │  │  ├─ weather/
│  │  │  │  ├─ knowledge/
│  │  │  │  ├─ collaboration/
│  │  │  │  ├─ billing/
│  │  │  │  └─ notifications/
│  │  │  ├─ hooks/
│  │  │  ├─ lib/
│  │  │  │  ├─ auth/
│  │  │  │  ├─ http/
│  │  │  │  ├─ telemetry/
│  │  │  │  ├─ security/
│  │  │  │  ├─ validation/
│  │  │  │  └─ utilities/
│  │  │  ├─ providers/
│  │  │  ├─ styles/
│  │  │  ├─ instrumentation.ts
│  │  │  └─ middleware.ts
│  │  ├─ tests/
│  │  │  ├─ unit/
│  │  │  ├─ integration/
│  │  │  ├─ contract/
│  │  │  ├─ accessibility/
│  │  │  └─ e2e/
│  │  ├─ next.config.ts
│  │  └─ package.json
│  └─ worker/
│     ├─ src/
│     │  ├─ consumers/
│     │  ├─ jobs/
│     │  │  ├─ knowledge-ingestion/
│     │  │  ├─ embedding/
│     │  │  ├─ search-index/
│     │  │  ├─ weather-refresh/
│     │  │  ├─ notifications/
│     │  │  ├─ ai-evaluation/
│     │  │  └─ retention/
│     │  ├─ schedulers/
│     │  ├─ telemetry/
│     │  └─ main.ts
│     ├─ tests/
│     └─ package.json
├─ packages/
│  ├─ database/
│  │  ├─ prisma/
│  │  │  ├─ schema.prisma
│  │  │  ├─ migrations/
│  │  │  └─ seed/
│  │  ├─ src/
│  │  │  ├─ client/
│  │  │  ├─ repositories/
│  │  │  ├─ transactions/
│  │  │  └─ outbox/
│  │  └─ package.json
│  ├─ domain/
│  │  ├─ src/
│  │  │  ├─ identity/
│  │  │  ├─ trips/
│  │  │  ├─ itinerary/
│  │  │  ├─ places/
│  │  │  ├─ ai/
│  │  │  ├─ weather/
│  │  │  ├─ knowledge/
│  │  │  └─ shared/
│  │  └─ package.json
│  ├─ contracts/
│  │  ├─ src/
│  │  │  ├─ api/
│  │  │  ├─ events/
│  │  │  ├─ tools/
│  │  │  └─ schemas/
│  │  └─ package.json
│  ├─ ai/
│  │  ├─ src/
│  │  │  ├─ foundry/
│  │  │  ├─ agents/
│  │  │  ├─ prompts/
│  │  │  ├─ tools/
│  │  │  ├─ guardrails/
│  │  │  ├─ structured-output/
│  │  │  └─ evaluation/
│  │  └─ package.json
│  ├─ rag/
│  │  ├─ src/
│  │  │  ├─ ingestion/
│  │  │  ├─ parsing/
│  │  │  ├─ chunking/
│  │  │  ├─ embeddings/
│  │  │  ├─ indexing/
│  │  │  ├─ retrieval/
│  │  │  ├─ reranking/
│  │  │  └─ citations/
│  │  └─ package.json
│  ├─ weather/
│  │  ├─ src/
│  │  │  ├─ providers/
│  │  │  ├─ normalization/
│  │  │  ├─ advisories/
│  │  │  └─ caching/
│  │  └─ package.json
│  ├─ maps/
│  ├─ storage/
│  ├─ queue/
│  ├─ observability/
│  ├─ config/
│  ├─ email/
│  ├─ ui/
│  ├─ eslint-config/
│  └─ typescript-config/
├─ infra/
│  ├─ bicep/
│  │  ├─ main.bicep
│  │  ├─ modules/
│  │  │  ├─ front-door.bicep
│  │  │  ├─ container-apps.bicep
│  │  │  ├─ postgres.bicep
│  │  │  ├─ redis.bicep
│  │  │  ├─ storage.bicep
│  │  │  ├─ service-bus.bicep
│  │  │  ├─ key-vault.bicep
│  │  │  ├─ monitoring.bicep
│  │  │  ├─ foundry.bicep
│  │  │  └─ ai-search.bicep
│  │  └─ parameters/
│  ├─ scripts/
│  └─ policies/
├─ docs/
│  ├─ adr/
│  ├─ api/
│  ├─ data/
│  ├─ runbooks/
│  ├─ security/
│  └─ product/
├─ tests/
│  ├─ performance/
│  ├─ resilience/
│  └─ synthetic/
├─ tooling/
├─ azure.yaml
├─ components.json
├─ package.json
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
├─ turbo.json
├─ tsconfig.json
├─ eslint.config.mjs
├─ prettier.config.mjs
├─ commitlint.config.ts
├─ .env.example
├─ .gitignore
├─ SECURITY.md
└─ README.md
```

## Package boundary rules

- `packages/domain` has no framework, database, Azure or browser dependencies.
- `packages/contracts` contains versioned schemas shared by web, worker and tools.
- `packages/database` is the only package allowed to import the Prisma client.
- `packages/ai`, `rag`, `weather` and `maps` expose interfaces plus provider adapters.
- `apps/web` composes packages; it does not duplicate domain logic.
- `apps/worker` owns long-running and retryable tasks.
- Environment variables are parsed once through `packages/config`.

