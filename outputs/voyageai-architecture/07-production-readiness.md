# Production Readiness

## Security

- Front Door WAF, TLS-only ingress, secure headers and bot/rate protections.
- Managed identities between Azure services; secrets only in Key Vault.
- Private endpoints and restricted egress for production data services where feasible.
- Separate subscriptions or strongly isolated resource groups for production.
- Least-privilege RBAC and workload-specific identities for web, worker and Foundry tools.
- Encryption in transit and at rest; envelope encryption for selected sensitive fields.
- CSRF protection for cookie-authenticated mutations and strict origin checks.
- Content Security Policy with nonce-based script controls.
- Malware scanning and MIME verification for uploads.
- Dependency, container, IaC, secret and license scanning in CI.
- Audit trail for authorization, admin, export, deletion and AI proposal application.

## Privacy and governance

- Data classification for account, trip, location, document, billing and AI data.
- Explicit retention schedules by table, blob container, search index and telemetry type.
- User export and deletion workflows with cross-system completion tracking.
- Regional deployment and data residency documented before production.
- Provider agreements and licensing reviewed for maps, weather and partner content.
- AI logs default to redacted/minimized storage with bounded retention.
- Consent and preference versions are auditable.

## Reliability targets

Suggested launch objectives:

| Capability | Target |
|---|---|
| Core trip reads/writes | 99.9% monthly availability |
| AI planning initiation | 99.5% excluding model/provider regional incidents |
| P95 core API latency | under 500 ms for uncached transactional calls |
| AI progress acknowledgement | under 2 seconds |
| Recovery point objective | 15 minutes or better |
| Recovery time objective | 2 hours or better |

Use zone-redundant services where supported, PostgreSQL point-in-time recovery, Blob versioning/soft delete, IaC-rebuildable infrastructure and tested restoration drills.

## Observability

Correlate browser, Next.js, worker, Service Bus, Foundry tool and provider calls with one trace/request ID.

Track:

- Availability, latency, errors and saturation.
- Database pool, slow queries, locks and replication/backup health.
- Queue age, retries and dead-letter counts.
- Foundry latency, token use, tool failures, safety blocks and cost.
- Retrieval zero-result rate, citation coverage and index freshness.
- Weather cache hit rate, provider errors and quota.
- Product funnels: trip creation, plan completion, proposal application and retention.

Logs use structured fields and never accept arbitrary prompt/document content.

## Testing pyramid

| Layer | Coverage |
|---|---|
| Unit | Domain rules, normalization, advisory rules and validators |
| Integration | PostgreSQL repositories, Redis, queues, Blob and provider adapters |
| Contract | REST schemas, events, Foundry tools and provider fixtures |
| Component | Complex itinerary, map fallback and proposal review interactions |
| E2E | Auth, create trip, generate plan, review/apply, invite collaborator |
| Accessibility | Automated checks plus keyboard/screen-reader scenarios |
| Performance | Read/write APIs, SSE fan-out, ingestion and retrieval |
| Resilience | Provider timeouts, queue duplication, stale weather and index rollback |
| AI evaluation | Groundedness, constraints, citation and safety regression |

External services use recorded fixtures in CI and limited live smoke tests in protected environments.

## Delivery pipeline

1. Formatting, type checking and linting.
2. Unit and contract tests.
3. Dependency, secret, SAST and IaC scans.
4. Build immutable web and worker images with SBOM and provenance.
5. Provision/update preview infrastructure.
6. Run database compatibility checks and preview migrations.
7. Run E2E, accessibility and AI evaluation suites.
8. Require approval for production.
9. Apply backward-compatible migrations.
10. Deploy canary revision, run synthetic checks, then shift traffic.
11. Monitor release indicators and automatically stop/rollback on thresholds.

Database changes use expand-and-contract migrations. Search changes use blue/green indexes. Foundry prompts, agent versions, structured-output schemas and evaluators are versioned together.

## Environment model

| Environment | Purpose |
|---|---|
| Local | Containerized dependencies or approved shared dev resources |
| Preview | Per-pull-request web preview with isolated lightweight state |
| Development | Shared integration and live provider testing |
| Staging | Production-like release candidate and load/evaluation testing |
| Production | Locked-down customer workload |

Do not share production data, search indexes, storage containers, model threads or credentials with non-production environments.

## Key architectural decisions to record

Create ADRs before implementation for:

1. Azure hosting topology and network isolation.
2. Foundry Basic versus Standard Agent Setup.
3. Auth provider and enterprise identity requirements.
4. Weather and maps providers, quotas and licensing.
5. Billing provider and entitlement model.
6. Public versus private knowledge sources.
7. RAG index partitioning and retention.
8. AI content retention and redaction policy.
9. Collaboration conflict strategy.
10. Multi-region and disaster-recovery posture.

## Implementation sequence

1. Repository, CI, configuration and observability foundations.
2. Identity, authorization policies and database migrations.
3. Trip and itinerary vertical slice.
4. Maps/place abstraction and itinerary map.
5. Weather adapter, cache and deterministic advisories.
6. Foundry project, model deployment, tool gateway and structured proposals.
7. RAG ingestion, private ACL retrieval and citations.
8. Collaboration, notifications and activity.
9. Billing, admin and governance workflows.
10. Load, resilience, security and AI release gates.

