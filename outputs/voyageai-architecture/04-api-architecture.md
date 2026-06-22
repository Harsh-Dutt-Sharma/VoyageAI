# API Architecture

## API styles

| Style | Use |
|---|---|
| React Server Components | Initial authenticated reads close to the page |
| Server Actions | UI-bound mutations that are not public integration contracts |
| REST `/api/v1` | Stable browser/mobile/integration contracts |
| Server-Sent Events | AI run progress and token/status streaming |
| Webhooks | Billing and identity provider events |
| Internal tool HTTP | Foundry tool calls protected by managed identity |
| Queue messages | Long-running, retryable and scheduled work |

All boundaries use versioned Zod schemas from `packages/contracts`. Domain objects and database records are not serialized directly.

## Public API surface

### Trips

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/v1/trips` | Cursor-paginated accessible trips |
| POST | `/api/v1/trips` | Create trip |
| GET | `/api/v1/trips/{tripId}` | Trip detail |
| PATCH | `/api/v1/trips/{tripId}` | Version-checked update |
| DELETE | `/api/v1/trips/{tripId}` | Archive or begin deletion |
| POST | `/api/v1/trips/{tripId}/invitations` | Invite collaborator |
| DELETE | `/api/v1/trips/{tripId}/members/{memberId}` | Remove member |

### Itinerary

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/v1/trips/{tripId}/itinerary` | Full normalized itinerary |
| POST | `/api/v1/trips/{tripId}/days` | Add day |
| PATCH | `/api/v1/itinerary-days/{dayId}` | Update or reorder day |
| POST | `/api/v1/itinerary-days/{dayId}/items` | Add item |
| PATCH | `/api/v1/itinerary-items/{itemId}` | Update item |
| POST | `/api/v1/itinerary-items/reorder` | Atomic bulk reorder |
| DELETE | `/api/v1/itinerary-items/{itemId}` | Remove item |

### Places and weather

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/v1/places/search` | Geocoded place search |
| GET | `/api/v1/places/{placeId}` | Normalized place detail |
| POST | `/api/v1/saved-places` | Save place |
| GET | `/api/v1/trips/{tripId}/weather` | Trip forecast and freshness |
| POST | `/api/v1/trips/{tripId}/weather/refresh` | Rate-limited refresh request |

### AI planning

| Method | Path | Purpose |
|---|---|---|
| POST | `/api/v1/ai/runs` | Start planning/refinement run |
| GET | `/api/v1/ai/runs/{runId}` | Poll status and result |
| GET | `/api/v1/ai/runs/{runId}/events` | SSE progress stream |
| POST | `/api/v1/ai/runs/{runId}/cancel` | Request cancellation |
| POST | `/api/v1/ai/proposals/{proposalId}/apply` | Apply validated proposal transactionally |
| POST | `/api/v1/ai/runs/{runId}/feedback` | Quality feedback |

### Knowledge and uploads

| Method | Path | Purpose |
|---|---|---|
| POST | `/api/v1/uploads/presign` | Short-lived direct upload authorization |
| POST | `/api/v1/trips/{tripId}/documents` | Register uploaded trip document |
| GET | `/api/v1/trips/{tripId}/documents` | List authorized documents |
| DELETE | `/api/v1/documents/{documentId}` | Delete and de-index |

## Foundry tool gateway

The agent can call only narrow, server-owned tools:

| Tool | Access |
|---|---|
| `get_trip_context` | Read one authorized trip projection |
| `search_travel_knowledge` | ACL-filtered RAG retrieval |
| `get_weather_forecast` | Normalized cached weather |
| `search_places` | Normalized place search |
| `estimate_travel_time` | Maps routing projection |
| `validate_itinerary` | Conflicts, opening hours, pace and weather checks |
| `create_plan_proposal` | Saves a draft proposal; never mutates itinerary |

Tool calls use managed identity, audience-restricted tokens, explicit JSON schemas, small payload limits and per-run authorization context. The browser cannot call these endpoints.

## Response conventions

Success responses include `data`, optional `meta`, request ID and resource version. Errors use RFC 9457 problem details with a stable VoyageAI error code.

Use:

- Cursor pagination, not offset pagination, for growing collections.
- `Idempotency-Key` on create/apply/refresh operations.
- `If-Match` or explicit version fields on collaborative mutations.
- `Cache-Control: private` for personalized responses.
- Short public caching only for curated destination pages.
- Request size, upload size, timeout and rate limits per route class.

## Authentication and authorization

1. Auth.js establishes the user session.
2. Route middleware performs coarse protection only.
3. Every use case resolves the authenticated principal.
4. Domain policies check trip membership, role, subscription entitlement and resource state.
5. Repository queries are scoped by authorized resource IDs.
6. Sensitive actions generate audit events.

Never rely on hidden UI controls or middleware alone for authorization.

## Async event contracts

Versioned events include:

- `trip.created.v1`
- `trip.updated.v1`
- `itinerary.changed.v1`
- `ai.run.requested.v1`
- `ai.run.completed.v1`
- `knowledge.document.registered.v1`
- `knowledge.document.deleted.v1`
- `weather.refresh.requested.v1`
- `notification.requested.v1`
- `user.erasure.requested.v1`

Consumers are idempotent, use exponential backoff with jitter, and dead-letter poison messages with an operator runbook.

