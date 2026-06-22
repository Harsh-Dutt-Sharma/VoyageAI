# VoyageAI — Production Architecture Blueprint

VoyageAI is a production-oriented travel planning platform built around Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Microsoft Foundry, live weather data, and retrieval-augmented generation (RAG).

This package is an implementation blueprint only. It intentionally contains no application code.

## Documents

1. [System architecture](./01-system-architecture.md)
2. [Complete folder structure](./02-folder-structure.md)
3. [Database schema](./03-database-schema.md)
4. [API architecture](./04-api-architecture.md)
5. [Frontend pages and components](./05-frontend-architecture.md)
6. [Microsoft Foundry, weather, and RAG](./06-ai-weather-rag.md)
7. [Security, operations, and delivery](./07-production-readiness.md)

## Recommended baseline

| Area | Choice |
|---|---|
| Web application | Next.js 15 App Router |
| Language | TypeScript with strict mode |
| UI | Tailwind CSS + shadcn/ui |
| Authentication | Auth.js with email/OAuth and database sessions |
| Transactional data | Azure Database for PostgreSQL Flexible Server |
| ORM and migrations | Prisma |
| Validation | Zod at every external boundary |
| AI orchestration | Microsoft Foundry Agent Service |
| RAG index | Azure AI Search, hybrid keyword/vector/semantic retrieval |
| Embeddings | Foundry-hosted embedding deployment |
| Object storage | Azure Blob Storage |
| Cache and rate limits | Azure Managed Redis |
| Background work | Azure Service Bus + worker service |
| Weather | Provider adapter; Azure Maps Weather or WeatherAPI/OpenWeather implementation |
| Observability | OpenTelemetry + Application Insights |
| Hosting | Azure Container Apps for web and worker |
| Infrastructure | Bicep, driven by Azure Developer CLI |

## Architectural stance

Start as a modular monolith with two deployable runtimes:

- `web`: Next.js UI, server-side application services, and public/internal HTTP endpoints.
- `worker`: ingestion, embedding, re-indexing, scheduled weather refreshes, and long-running AI jobs.

The modules share contracts and a database, but have explicit ownership boundaries. This preserves delivery speed while leaving clean extraction points for future services.

