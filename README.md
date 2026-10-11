# On-Ground.ai Call Centre

A polished, frontend-only call-centre workspace for managing fictional customer calls from queue to disposition. It is designed as a realistic internal-support dashboard with queue triage, customer context, simulated call controls, persistent notes, history, and reporting.

## Highlights

- **Operational dashboard** with queue, completed-call, resolution-rate, and handling-time metrics.
- **Waiting queue** with search, priority filtering, and timestamp-based wait times.
- **Call workspace** with simulated start, hold, resume, mute, end, note-taking, and disposition controls.
- **Validated dispositions** for category, outcome, resolution, escalation reason, and follow-up status.
- **Customer directory** with account context and interaction information.
- **Call history** with search, resolution, today, yesterday, and custom date-range filters.
- **Reports** derived from saved fictional call records.
- **Persistent local demo data** using browser `localStorage`, including a one-click reset.
- **Responsive interface** with desktop sidebar navigation and a mobile bottom navigation bar.

## Technology

- React 19
- TypeScript
- Vite
- Wouter
- Tailwind CSS
- Lucide React
- pnpm workspace

## Project structure

```text
.
├── artifacts/
│   └── on-ground-call-centre/  # Main React application
│       ├── src/App.tsx         # Application state, workflow, routes, and screens
│       ├── src/index.css       # Theme and responsive styles
│       └── README.md           # Detailed application documentation
├── lib/                        # Shared workspace packages
├── package.json                # Workspace scripts
└── pnpm-workspace.yaml
```

## Getting started

### Prerequisites

- Node.js 20 or later
- pnpm 9 or later

### Install

```bash
pnpm install
```

### Run locally

From the repository root:

```bash
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/on-ground-call-centre run dev
```

On Windows PowerShell:

```powershell
$env:PORT=5173
$env:BASE_PATH="/"
pnpm --filter @workspace/on-ground-call-centre run dev
```

Open the local URL printed by Vite.

## Quality checks

```bash
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/on-ground-call-centre run typecheck
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/on-ground-call-centre run build
```

## Demo workflow

1. Open **Waiting queue** or **Call workspace**.
2. Select a queued fictional call.
3. Start the simulated call and optionally use hold, resume, or mute.
4. End the call, capture notes, and complete the required disposition.
5. Review the completed record in **Call history** and **Reports**.
6. Use **Settings** to change local preferences or reset the fictional demo data.

## Data and limitations

All customers, calls, reports, and outcomes are fictional. The project does not include a backend, authentication, real telephony service, CRM connection, shared database, or real customer information. Changes are stored only in the current browser through `localStorage`.

For more detailed setup and application-specific documentation, see the [application README](./artifacts/on-ground-call-centre/README.md).

## AI disclosure

AI assistance was used to help develop and document this project.
