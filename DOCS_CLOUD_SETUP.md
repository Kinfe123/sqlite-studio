# Docs Cloud Setup

This PR connects the existing docs app to Docs Cloud without replacing the docs content.

## What this PR adds

- `docs.json` configures the docs root, draft PR publishing, and analytics.
- `.env.docs-cloud.example` documents the production environment variable the docs app needs.
- Analytics is enabled in `docs.json`; keep it enabled unless the project intentionally opts out.

## Finish the setup

1. Open Docs Cloud and go to Settings -> API Keys.
2. Create an API key with the default project, docs, and jobs scopes.
3. Add the key to production as `DOCS_CLOUD_API_KEY`.
4. If the host uses files, put the value in `.env.production`. If it uses managed secrets, add the same variable there instead.
5. Do not commit the real key. Keep `.env.docs-cloud.example` as the checked-in reference.

## Config review

- Docs root: `apps/docs`
- Publish base branch: `main`
- Publish mode: `draft-pr`
- Preview deploys: not requested by this setup PR
- Analytics: enabled
