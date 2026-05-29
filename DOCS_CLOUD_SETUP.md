# Docs Cloud Setup

This PR connects the existing docs app to Docs Cloud without replacing the docs content.

## What this PR adds

- `docs.json` configures the docs root, draft PR publishing, and analytics.
- `docs.config.ts` wires the docs runtime to Docs Cloud analytics. If the repo already has `docs.config.tsx`, this PR updates that file instead.
- `.env.docs-cloud.example` documents the production environment variable the docs app needs.
- Analytics is enabled in `docs.json`; keep it enabled unless the project intentionally opts out.

## Finish the setup

1. Open Docs Cloud and go to Settings -> API Keys.
2. Create an API key with the default project, docs, and jobs scopes.
3. Add the key to production as `DOCS_CLOUD_API_KEY`.
4. Create or open the Docs Cloud analytics project for this repository and copy its project id.
5. Add that id to production as `NEXT_PUBLIC_DOCS_CLOUD_PROJECT_ID`.
6. If the host uses files, put the values in `.env.production`. If it uses managed secrets, add the same variables there instead.
7. Do not commit the real key. Keep `.env.docs-cloud.example` as the checked-in reference.

To opt out of analytics later, set `NEXT_PUBLIC_DOCS_CLOUD_ANALYTICS_ENABLED=false` in production.

## Config review

- Docs root: `apps/docs`
- Publish base branch: `main`
- Publish mode: `draft-pr`
- Preview deploys: not requested by this setup PR
- Analytics: enabled
