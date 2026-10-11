# On-Ground.ai Call Centre

A frontend-only, fictional call-centre staff workspace for handling an inbound queue, customer context, call notes, dispositions, history, and reports.

This application is the `artifacts/on-ground-call-centre` package inside the pnpm workspace rooted at the repository root. It has no backend, authentication, real telephony connection, shared database, or real customer data.

## Features

- Dashboard metrics, activity, queue snapshot, and reports derived from the same call records.
- Searchable waiting queue with priority filtering and timestamp-based elapsed wait times.
- Simulated start, hold, resume, mute, end, notes, and validated disposition workflow.
- Customer directory and completed-call history with search and resolution filters.
- Local browser persistence for demo calls, notes, dispositions, and workspace preferences.
- Responsive sidebar and compact mobile navigation.
- Reset action that restores the fictional rolling demo data and default preferences.

## Technology

- React 19, TypeScript, and Vite
- Wouter routing
- Tailwind CSS and application CSS
- Lucide React icons
- pnpm workspace tooling

## Repository structure

```text
On-Groundai-Call-Centre-App/
  artifacts/
    on-ground-call-centre/   # this application
      src/App.tsx            # state model, routes, and screens
      src/index.css          # theme and responsive styles
  package.json               # workspace commands
  pnpm-workspace.yaml
```

## Prerequisites

- Node.js 20 or later
- pnpm 9 or later

## Install and run

Run the following from the workspace root (`On-Groundai-Call-Centre-App`):

```sh
pnpm install
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/on-ground-call-centre run dev
```

On Windows PowerShell:

```powershell
$env:PORT=5173; $env:BASE_PATH="/"; pnpm --filter @workspace/on-ground-call-centre run dev
```

Vite prints the local URL after it starts. `PORT` and `BASE_PATH` are required by the Vite configuration; `BASE_PATH` is normally `/` for local use.

## Checks and production preview

From the workspace root:

```sh
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/on-ground-call-centre run typecheck
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/on-ground-call-centre run build
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/on-ground-call-centre run serve
```

The workspace-wide checks are also available through:

```sh
pnpm run typecheck
pnpm run build
```

## Demo workflow

1. Open **Waiting queue** or **Call workspace** and select a fictional queued call.
2. Start the simulated call, then hold/resume or mute it if desired.
3. End the call, add notes, choose category, outcome, and resolution, and supply an escalation reason when escalating.
4. Save the disposition. The record moves from the queue to history and is reflected in dashboard metrics and reports.
5. Change agent preferences in **Settings** or use **Reset demo data** to return to the seed dataset.

## Demo data and persistence

The seeded data is fictional. It uses a rolling demo timeline so the queue and historical filters remain useful when the application is opened later. The app stores changes only in this browser under `onground-call-centre-demo-v1`; data is not shared across users or devices. Malformed saved data falls back to the seed dataset.

## Known limitations and disclosure

- The application simulates call controls and does not connect to PSTN, VoIP, a CRM, or any external service.
- Reports are illustrative operational summaries derived only from local fictional records.
- Browser storage can be cleared by the user or browser, which removes saved demo changes.
- AI assistance was used to help generate and improve this code and documentation.

