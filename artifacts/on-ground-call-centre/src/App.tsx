import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Link, Route, Switch, useLocation } from "wouter";
import {
  Activity,
  BarChart3,
  Bell,
  Check,
  ChevronRight,
  Clock3,
  Headphones,
  History,
  LayoutDashboard,
  LifeBuoy,
  ListFilter,
  Mic,
  MicOff,
  Pause,
  Phone,
  Play,
  Search,
  Settings as SettingsIcon,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import "./index.css";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  accountTier: string;
  openIssues: number;
  orders: number;
  interactions: number;
};
type Call = {
  id: string;
  customerId: string;
  reason: string;
  priority: string;
  queuedAt: string;
  status: string;
  agent: string;
  durationSeconds: number;
  category: string;
  outcome: string;
  resolutionStatus: string;
  escalationReason: string;
  followUp: boolean;
  notes: string;
  completedAt: string;
};
type AppData = {
  customers: Customer[];
  calls: Call[];
  notes: Record<string, string>;
  preferences: {
    compact: boolean;
    notifications: boolean;
    dark: boolean;
    agent: string;
  };
};
const KEY = "onground-call-centre-demo-v1";
const DEMO_AGENT = "Jenny Wilson";
function demoTimestamp(
  daysAgo: number,
  hour: number,
  minute: number,
  second = 0,
) {
  const date = new Date();
  date.setHours(hour, minute, second, 0);
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
}
const seedCustomers: Customer[] = [
  {
    id: "CU-2041",
    name: "Maya Chen",
    email: "maya.chen@example.test",
    phone: "+1 (415) 555-0138",
    status: "Active",
    accountTier: "Premier",
    openIssues: 1,
    orders: 8,
    interactions: 4,
  },
  {
    id: "CU-2038",
    name: "Elliot Brooks",
    email: "elliot.brooks@example.test",
    phone: "+1 (212) 555-0184",
    status: "Active",
    accountTier: "Standard",
    openIssues: 0,
    orders: 3,
    interactions: 2,
  },
  {
    id: "CU-2035",
    name: "Sofia Alvarez",
    email: "sofia.alvarez@example.test",
    phone: "+1 (312) 555-0149",
    status: "Review",
    accountTier: "Premier",
    openIssues: 2,
    orders: 11,
    interactions: 7,
  },
  {
    id: "CU-2029",
    name: "Noah Williams",
    email: "noah.williams@example.test",
    phone: "+1 (206) 555-0112",
    status: "Active",
    accountTier: "Standard",
    openIssues: 0,
    orders: 2,
    interactions: 1,
  },
  {
    id: "CU-2017",
    name: "Amara Okafor",
    email: "amara.okafor@example.test",
    phone: "+1 (617) 555-0167",
    status: "Active",
    accountTier: "Plus",
    openIssues: 1,
    orders: 6,
    interactions: 5,
  },
  {
    id: "CU-2011",
    name: "Theo Martin",
    email: "theo.martin@example.test",
    phone: "+1 (303) 555-0196",
    status: "Active",
    accountTier: "Plus",
    openIssues: 0,
    orders: 4,
    interactions: 3,
  },
  {
    id: "CU-2004",
    name: "Priya Nair",
    email: "priya.nair@example.test",
    phone: "+1 (512) 555-0120",
    status: "Review",
    accountTier: "Standard",
    openIssues: 1,
    orders: 5,
    interactions: 2,
  },
  {
    id: "CU-1996",
    name: "Jonah Reed",
    email: "jonah.reed@example.test",
    phone: "+1 (404) 555-0171",
    status: "Active",
    accountTier: "Premier",
    openIssues: 0,
    orders: 9,
    interactions: 6,
  },
];
const seedCalls: Call[] = [
  {
    id: "CC-8412",
    customerId: "CU-2041",
    reason: "Refund status update",
    priority: "High",
    queuedAt: demoTimestamp(0, 9, 41),
    status: "Waiting",
    agent: "Unassigned",
    durationSeconds: 0,
    category: "",
    outcome: "",
    resolutionStatus: "",
    escalationReason: "",
    followUp: false,
    notes: "",
    completedAt: "",
  },
  {
    id: "CC-8411",
    customerId: "CU-2038",
    reason: "Change delivery address",
    priority: "Normal",
    queuedAt: demoTimestamp(0, 9, 44),
    status: "Waiting",
    agent: "Unassigned",
    durationSeconds: 0,
    category: "",
    outcome: "",
    resolutionStatus: "",
    escalationReason: "",
    followUp: false,
    notes: "",
    completedAt: "",
  },
  {
    id: "CC-8410",
    customerId: "CU-2035",
    reason: "Duplicate charge on invoice",
    priority: "Urgent",
    queuedAt: demoTimestamp(0, 9, 47),
    status: "Waiting",
    agent: "Unassigned",
    durationSeconds: 0,
    category: "",
    outcome: "",
    resolutionStatus: "",
    escalationReason: "",
    followUp: false,
    notes: "",
    completedAt: "",
  },
  {
    id: "CC-8409",
    customerId: "CU-2029",
    reason: "Product setup assistance",
    priority: "Normal",
    queuedAt: demoTimestamp(0, 9, 51),
    status: "Waiting",
    agent: "Unassigned",
    durationSeconds: 0,
    category: "",
    outcome: "",
    resolutionStatus: "",
    escalationReason: "",
    followUp: false,
    notes: "",
    completedAt: "",
  },
  {
    id: "CC-8408",
    customerId: "CU-2017",
    reason: "Subscription renewal question",
    priority: "High",
    queuedAt: demoTimestamp(0, 9, 54),
    status: "Waiting",
    agent: "Unassigned",
    durationSeconds: 0,
    category: "",
    outcome: "",
    resolutionStatus: "",
    escalationReason: "",
    followUp: false,
    notes: "",
    completedAt: "",
  },
  {
    id: "CC-8407",
    customerId: "CU-2011",
    reason: "Order tracking request",
    priority: "Normal",
    queuedAt: demoTimestamp(0, 10, 2),
    status: "Waiting",
    agent: "Unassigned",
    durationSeconds: 0,
    category: "",
    outcome: "",
    resolutionStatus: "",
    escalationReason: "",
    followUp: false,
    notes: "",
    completedAt: "",
  },
  {
    id: "CC-8406",
    customerId: "CU-2004",
    reason: "Account verification help",
    priority: "High",
    queuedAt: demoTimestamp(0, 10, 5),
    status: "Waiting",
    agent: "Unassigned",
    durationSeconds: 0,
    category: "",
    outcome: "",
    resolutionStatus: "",
    escalationReason: "",
    followUp: false,
    notes: "",
    completedAt: "",
  },
  {
    id: "CC-8405",
    customerId: "CU-1996",
    reason: "Return label request",
    priority: "Normal",
    queuedAt: demoTimestamp(0, 10, 11),
    status: "Waiting",
    agent: "Unassigned",
    durationSeconds: 0,
    category: "",
    outcome: "",
    resolutionStatus: "",
    escalationReason: "",
    followUp: false,
    notes: "",
    completedAt: "",
  },
  {
    id: "CC-8398",
    customerId: "CU-2035",
    reason: "Billing plan clarification",
    priority: "Normal",
    queuedAt: demoTimestamp(1, 14, 15),
    status: "Completed",
    agent: DEMO_AGENT,
    durationSeconds: 326,
    category: "Billing",
    outcome: "Information provided",
    resolutionStatus: "Resolved",
    escalationReason: "",
    followUp: false,
    notes: "Reviewed plan details and confirmed next invoice date.",
    completedAt: demoTimestamp(1, 14, 20, 26),
  },
  {
    id: "CC-8392",
    customerId: "CU-2017",
    reason: "Missing package",
    priority: "High",
    queuedAt: demoTimestamp(1, 11, 10),
    status: "Completed",
    agent: DEMO_AGENT,
    durationSeconds: 492,
    category: "Order support",
    outcome: "Replacement arranged",
    resolutionStatus: "Resolved",
    escalationReason: "",
    followUp: true,
    notes: "Carrier investigation started; replacement approved.",
    completedAt: demoTimestamp(1, 11, 18, 12),
  },
  {
    id: "CC-8386",
    customerId: "CU-2041",
    reason: "Payment method update",
    priority: "Normal",
    queuedAt: demoTimestamp(2, 15, 30),
    status: "Completed",
    agent: DEMO_AGENT,
    durationSeconds: 281,
    category: "Account",
    outcome: "Customer updated details",
    resolutionStatus: "Resolved",
    escalationReason: "",
    followUp: false,
    notes: "Secure update steps shared.",
    completedAt: demoTimestamp(2, 15, 34, 41),
  },
  {
    id: "CC-8379",
    customerId: "CU-2004",
    reason: "Service access issue",
    priority: "Urgent",
    queuedAt: demoTimestamp(2, 10, 2),
    status: "Completed",
    agent: DEMO_AGENT,
    durationSeconds: 648,
    category: "Technical support",
    outcome: "Escalated to specialist",
    resolutionStatus: "Escalated",
    escalationReason: "Specialist review needed",
    followUp: true,
    notes: "Access logs attached to specialist review.",
    completedAt: demoTimestamp(2, 10, 12, 50),
  },
];
function defaultData(): AppData {
  return {
    customers: seedCustomers,
    calls: seedCalls,
    notes: {},
    preferences: {
      compact: false,
      notifications: true,
      dark: false,
      agent: DEMO_AGENT,
    },
  };
}
function loadData(): AppData {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultData();
    const value = JSON.parse(raw);
    if (!Array.isArray(value.calls) || !Array.isArray(value.customers))
      return defaultData();
    return {
      ...defaultData(),
      ...value,
      preferences: { ...defaultData().preferences, ...value.preferences },
      notes: value.notes && typeof value.notes === "object" ? value.notes : {},
    } as AppData;
  } catch {
    return defaultData();
  }
}
type Store = {
  data: AppData;
  setData: (d: AppData) => void;
  toast: (msg: string, error?: boolean) => void;
  reset: () => void;
};
const StoreContext = createContext<Store | null>(null);
function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("Store not available");
  return value;
}
const navItems = [
  ["/", "Overview", LayoutDashboard],
  ["/workspace", "Call workspace", Headphones],
  ["/queue", "Waiting queue", ListFilter],
  ["/customers", "Customers", Users],
  ["/history", "Call history", History],
  ["/reports", "Reports", BarChart3],
  ["/settings", "Settings", SettingsIcon],
] as const;
const titleFor = (path: string) =>
  navItems.find(([url]) => url === path)?.[1] || "Overview";
function fmtDuration(s: number) {
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}
function fmtDate(s: string) {
  if (!s) return "—";
  return new Date(s).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
function fmtWait(queuedAt: string, now = Date.now()) {
  const queuedAtMs = Date.parse(queuedAt);
  if (!Number.isFinite(queuedAtMs)) return "—";
  const elapsedMinutes = Math.max(0, Math.floor((now - queuedAtMs) / 60000));
  const hours = Math.floor(elapsedMinutes / 60);
  const minutes = elapsedMinutes % 60;
  return hours ? `${hours}h${minutes ? ` ${minutes}m` : ""}` : `${minutes}m`;
}
function dayKey(value: string | Date) {
  const date = value instanceof Date ? value : new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function initials(name: string) {
  return name
    .split(" ")
    .map((x) => x[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
function Status({
  children,
  tone = "",
}: {
  children: ReactNode;
  tone?: string;
}) {
  return <span className={`status ${tone}`}>{children}</span>;
}
function Shell({ children }: { children: ReactNode }) {
  const [path] = useLocation();
  const { data, toast } = useStore();
  return (
    <div className={`shell ${data.preferences.compact ? "compact" : ""}`}>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">og</div>
          <span>On-Ground.ai</span>
        </div>
        <div className="nav-label">Operations</div>
        {navItems.map(([url, label, Icon]) => (
          <Link
            key={url}
            href={url}
            className={`nav-link ${path === url ? "active" : ""}`}
            data-testid={`link-nav-${label.toLowerCase().replaceAll(" ", "-")}`}
          >
            <Icon />
            <span>{label}</span>
            {url === "/queue" && (
              <span className="nav-count">
                {data.calls.filter((c) => c.status === "Waiting").length}
              </span>
            )}
          </Link>
        ))}
        <div className="sidebar-bottom">
          <div className="nav-label">Agent status</div>
          <div className="agent-mini">
            <div className="avatar">{initials(data.preferences.agent)}</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#3d4b62" }}>
                {data.preferences.agent}
              </div>
              <div style={{ fontSize: 10, color: "#8290a3", marginTop: 4 }}>
                <i className="agent-dot" />
                Available
              </div>
            </div>
          </div>
        </div>
      </aside>
      <main className="main">
        <div className="topbar">
          <div className="crumb">
            Operations&nbsp; / &nbsp;
            <strong style={{ color: "#586780" }}>{titleFor(path)}</strong>
          </div>
          <div className="top-actions">
            <button
              className="icon-btn"
              aria-label="Notifications"
              data-testid="button-notifications"
              onClick={() =>
                toast(
                  data.preferences.notifications
                    ? "No new operational alerts."
                    : "Notifications are turned off in preferences.",
                )
              }
            >
              <Bell size={16} />
            </button>
            <div className="agent-pill">
              <div
                className="avatar"
                style={{ width: 27, height: 27, borderRadius: 9 }}
              >
                {initials(data.preferences.agent)}
              </div>
              <span className="name">{data.preferences.agent}</span>
              <span className="agent-dot" />
            </div>
          </div>
        </div>
        {children}
      </main>
      <nav className="mobile-nav">
        {navItems
          .filter((_, i) => i < 5)
          .map(([url, label, Icon]) => (
            <Link
              key={url}
              href={url}
              className={path === url ? "active" : ""}
              data-testid={`mobile-nav-${label}`}
            >
              <Icon />
              <span>{label.split(" ")[0]}</span>
            </Link>
          ))}
      </nav>
    </div>
  );
}
function Heading({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">On-Ground.ai / Service desk</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {children && <div className="heading-actions">{children}</div>}
    </div>
  );
}
function PageCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={`card ${className}`}>{children}</section>;
}
function Dashboard() {
  const { data } = useStore();
  const waiting = data.calls.filter((c) => c.status === "Waiting");
  const done = data.calls.filter((c) => c.status === "Completed");
  const avg = done.length
    ? Math.round(done.reduce((a, c) => a + c.durationSeconds, 0) / done.length)
    : 0;
  const resolved = done.length
    ? Math.round(
        (done.filter((c) => c.resolutionStatus === "Resolved").length /
          done.length) *
          100,
      )
    : 0;
  const anchorValue = Math.max(
    0,
    ...data.calls.map((c) => new Date(c.completedAt || c.queuedAt).getTime()),
  );
  const anchor = new Date(anchorValue || Date.now());
  const chartDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(anchor);
    date.setDate(anchor.getDate() - 6 + index);
    const key = dayKey(date);
    return {
      key,
      label: date.toLocaleDateString("en-US", { weekday: "short" }),
      received: data.calls.filter((c) => dayKey(c.queuedAt) === key).length,
      handled: done.filter((c) => dayKey(c.completedAt) === key).length,
    };
  });
  const chartMax = Math.max(
    1,
    ...chartDays.flatMap((day) => [day.received, day.handled]),
  );
  const metrics = [
    ["Calls handled", done.length, "Across saved call records", Phone],
    [
      "Calls waiting",
      waiting.length,
      `${waiting.filter((c) => c.priority === "Urgent").length} urgent priority`,
      Headphones,
    ],
    [
      "Average handling time",
      fmtDuration(avg),
      "Across completed calls",
      Clock3,
    ],
    [
      "Resolution rate",
      `${resolved}%`,
      "Resolved on first contact",
      ShieldCheck,
    ],
  ] as const;
  return (
    <>
      <Heading
        title={`Good morning, ${data.preferences.agent || "Agent"}`}
        subtitle="Here’s the service desk at a glance. Keep the queue moving."
      >
        <Link href="/workspace" className="btn">
          <Headphones /> Open workspace
        </Link>
      </Heading>
      <div className="grid kpi-grid">
        {metrics.map(([label, value, note, Icon]) => (
          <PageCard key={label} className="kpi">
            <div className="kpi-label">{label}</div>
            <div className="kpi-value">{value}</div>
            <div className="kpi-note">{note}</div>
            <div className="kpi-icon">
              <Icon size={17} />
            </div>
          </PageCard>
        ))}
      </div>
      <div className="grid dashboard-grid">
        <PageCard>
          <div className="card-title">
            <div>
              <h2>Call activity</h2>
              <div className="subtle" style={{ marginTop: 4 }}>
                Calls received and handled across the latest 7 sample dates
              </div>
            </div>
            <Status tone="blue">Sample data</Status>
          </div>
          <div className="bar-chart" aria-label="Call volume chart">
            {chartDays.map((day) => (
              <div
                className="bar-col"
                key={day.key}
                title={`${day.label}: ${day.received} received, ${day.handled} handled`}
              >
                <div
                  className="bar"
                  style={{
                    height: `${Math.max(4, (day.received / chartMax) * 100)}%`,
                  }}
                />
                <div
                  className="bar secondary"
                  style={{
                    height: `${Math.max(4, (day.handled / chartMax) * 100)}%`,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="bar-labels">
            {chartDays.map((day) => (
              <span key={day.key}>{day.label}</span>
            ))}
          </div>
        </PageCard>
        <PageCard>
          <div className="card-title">
            <div>
              <h2>Queue snapshot</h2>
              <div className="subtle" style={{ marginTop: 4 }}>
                Waiting customers, by urgency
              </div>
            </div>
            <Link href="/queue" className="row-action">
              View queue <ChevronRight size={12} />
            </Link>
          </div>
          <div style={{ display: "flex", gap: 9, marginBottom: 15 }}>
            <div
              style={{
                flex: 1,
                padding: 12,
                background: "#fff5e6",
                borderRadius: 10,
              }}
            >
              <div style={{ fontSize: 10, color: "#a57a3e" }}>Urgent</div>
              <strong style={{ fontSize: 20, color: "#885f25" }}>
                {waiting.filter((c) => c.priority === "Urgent").length}
              </strong>
            </div>
            <div
              style={{
                flex: 1,
                padding: 12,
                background: "#eef2fa",
                borderRadius: 10,
              }}
            >
              <div style={{ fontSize: 10, color: "#7284a1" }}>High</div>
              <strong style={{ fontSize: 20, color: "#48608e" }}>
                {waiting.filter((c) => c.priority === "High").length}
              </strong>
            </div>
            <div
              style={{
                flex: 1,
                padding: 12,
                background: "#f3f6f9",
                borderRadius: 10,
              }}
            >
              <div style={{ fontSize: 10, color: "#8793a2" }}>Normal</div>
              <strong style={{ fontSize: 20, color: "#5d6a7d" }}>
                {waiting.filter((c) => c.priority === "Normal").length}
              </strong>
            </div>
          </div>
          <div className="activity">
            <i className="activity-dot" />
            <div>
              <strong>{done.length} calls completed</strong>
              <p>Call outcomes are reflected in history and reporting.</p>
            </div>
          </div>
          <div className="activity">
            <i className="activity-dot" style={{ background: "#dda652" }} />
            <div>
              <strong>
                {data.customers.filter((c) => c.openIssues > 0).length}{" "}
                customers with open issues
              </strong>
              <p>Review customer context before picking up.</p>
            </div>
          </div>
        </PageCard>
      </div>
      <div className="grid dashboard-grid">
        <PageCard>
          <div className="card-title">
            <h2>Recent calls</h2>
            <Link href="/history" className="row-action">
              Full history <ChevronRight size={12} />
            </Link>
          </div>
          <CallTable calls={done.slice().reverse().slice(0, 4)} compact />
        </PageCard>
        <PageCard>
          <div className="card-title">
            <h2>Recent activity</h2>
            <Activity size={16} color="#8898ad" />
          </div>
          {done
            .slice(-3)
            .reverse()
            .map((c) => (
              <ActivityItem key={c.id} call={c} />
            ))}
        </PageCard>
      </div>
    </>
  );
}
function ActivityItem({ call }: { call: Call }) {
  const { data } = useStore();
  const person = data.customers.find((c) => c.id === call.customerId);
  return (
    <div className="activity">
      <i className="activity-dot" />
      <div>
        <strong>
          {person?.name || "Customer"} · {call.outcome}
        </strong>
        <p>
          {fmtDate(call.completedAt)} · {fmtDuration(call.durationSeconds)} call
        </p>
      </div>
    </div>
  );
}
function CallTable({
  calls,
  compact = false,
}: {
  calls: Call[];
  compact?: boolean;
}) {
  const { data } = useStore();
  return (
    <div className="table-wrap">
      <table style={compact ? { minWidth: 530 } : undefined}>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Call reason</th>
            <th>Duration</th>
            <th>Outcome</th>
            {!compact && <th>Completed</th>}
          </tr>
        </thead>
        <tbody>
          {calls.map((c) => (
            <tr key={c.id} data-testid={`row-call-${c.id}`}>
              <td>
                <strong>
                  {data.customers.find((x) => x.id === c.customerId)?.name ||
                    "Unknown"}
                </strong>
                <div className="subtle">{c.id}</div>
              </td>
              <td>{c.reason}</td>
              <td>{fmtDuration(c.durationSeconds)}</td>
              <td>
                <Status
                  tone={c.resolutionStatus === "Escalated" ? "alert" : "good"}
                >
                  {c.outcome || c.resolutionStatus}
                </Status>
              </td>
              {!compact && <td>{fmtDate(c.completedAt)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function useCurrentMinute() {
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    let interval: number | undefined;
    const delay = 60000 - (Date.now() % 60000);
    const timeout = window.setTimeout(() => {
      setNow(Date.now());
      interval = window.setInterval(() => setNow(Date.now()), 60000);
    }, delay);
    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, []);
  return now;
}
function Queue({ workspace = false }: { workspace?: boolean }) {
  const { data } = useStore();
  const now = useCurrentMinute();
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("All priorities");
  const [selected, setSelectedState] = useState(() =>
    workspace ? sessionStorage.getItem("selectedCall") || "" : "",
  );
  const setSelected = (id: string) => {
    setSelectedState(id);
    if (workspace) sessionStorage.setItem("selectedCall", id);
  };
  const waiting = data.calls.filter((c) => c.status === "Waiting");
  const visible = waiting.filter((c) => {
    const name = data.customers.find((x) => x.id === c.customerId)?.name || "";
    return (
      `${name} ${c.reason} ${c.id}`
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (priority === "All priorities" || c.priority === priority)
    );
  });
  const active = selected
    ? data.calls.find((c) => c.id === selected)
    : undefined;
  return (
    <>
      <Heading
        title={workspace ? "Call workspace" : "Waiting queue"}
        subtitle={
          workspace
            ? "Work the next customer without losing your place in the queue."
            : "Search, prioritize, and select a waiting customer."
        }
      >
        <Status tone="blue">
          <span className="pulse" /> {waiting.length} waiting
        </Status>
      </Heading>
      {workspace ? (
        <div className="layout-two">
          <PageCard>
            <div className="card-title">
              <div>
                <h2>Waiting queue</h2>
                <div className="subtle" style={{ marginTop: 4 }}>
                  Select a record to load its context
                </div>
              </div>
            </div>
            <QueueFilters
              query={query}
              setQuery={setQuery}
              priority={priority}
              setPriority={setPriority}
            />
            <CallQueueList
              calls={visible}
              selected={selected}
              setSelected={setSelected}
            />
          </PageCard>
          <WorkspacePanel
            call={active}
            onSelectFirst={() => visible[0] && setSelected(visible[0].id)}
          />
        </div>
      ) : (
        <PageCard>
          <QueueFilters
            query={query}
            setQuery={setQuery}
            priority={priority}
            setPriority={setPriority}
          />
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Queue position</th>
                  <th>Customer</th>
                  <th>Reason</th>
                  <th>Priority</th>
                  <th>Waiting</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {visible.map((c, i) => {
                  const person = data.customers.find(
                    (x) => x.id === c.customerId,
                  );
                  return (
                    <tr
                      className={`queue-row ${selected === c.id ? "selected" : ""}`}
                      key={c.id}
                      onClick={() => setSelected(selected === c.id ? "" : c.id)}
                      data-testid={`queue-record-${c.id}`}
                    >
                      <td>
                        <strong>#{i + 1}</strong>
                      </td>
                      <td>
                        <strong>{person?.name}</strong>
                        <div className="subtle">{c.id}</div>
                      </td>
                      <td>{c.reason}</td>
                      <td>
                        <Priority value={c.priority} />
                      </td>
                      <td>{fmtWait(c.queuedAt, now)}</td>
                      <td>
                        <Status tone="wait">Waiting</Status>
                      </td>
                      <td>
                        <Link
                          href="/workspace"
                          className="row-action"
                          onClick={(e) => {
                            e.stopPropagation();
                            sessionStorage.setItem("selectedCall", c.id);
                          }}
                        >
                          Open workspace →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {visible.length === 0 && (
              <Empty
                title="No calls match these filters"
                text="Try a different search or priority."
              />
            )}
          </div>
          {selected && (
            <div className="notice" style={{ marginTop: 13 }}>
              Selected:{" "}
              {
                data.customers.find(
                  (x) =>
                    x.id ===
                    data.calls.find((c) => c.id === selected)?.customerId,
                )?.name
              }{" "}
              · {data.calls.find((c) => c.id === selected)?.reason}
            </div>
          )}
        </PageCard>
      )}
    </>
  );
}
function QueueFilters({
  query,
  setQuery,
  priority,
  setPriority,
}: {
  query: string;
  setQuery: (s: string) => void;
  priority: string;
  setPriority: (s: string) => void;
}) {
  return (
    <div className="toolbar">
      <div className="searchbox">
        <Search />
        <input
          className="field"
          placeholder="Search customer, reason, or call ID"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          data-testid="input-queue-search"
        />
      </div>
      <select
        className="select"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        data-testid="select-queue-priority"
      >
        <option>All priorities</option>
        <option>Urgent</option>
        <option>High</option>
        <option>Normal</option>
      </select>
    </div>
  );
}
function Priority({ value }: { value: string }) {
  return (
    <Status
      tone={value === "Urgent" ? "alert" : value === "High" ? "wait" : "blue"}
    >
      {value}
    </Status>
  );
}
function CallQueueList({
  calls,
  selected,
  setSelected,
}: {
  calls: Call[];
  selected: string;
  setSelected: (s: string) => void;
}) {
  const { data } = useStore();
  if (calls.length === 0)
    return (
      <Empty
        title="Queue is clear"
        text="Nothing is waiting with this filter."
      />
    );
  return (
    <div className="call-list">
      {calls.map((c, i) => {
        const p = data.customers.find((x) => x.id === c.customerId);
        return (
          <div
            className={`call-item ${selected === c.id ? "selected" : ""}`}
            onClick={() => setSelected(c.id)}
            key={c.id}
            data-testid={`select-call-${c.id}`}
          >
            <div className="call-item-head">
              <strong>{p?.name}</strong>
              <Priority value={c.priority} />
            </div>
            <p>{c.reason}</p>
            <div className="call-item-foot">
              <span>
                {c.id} · #{i + 1} in queue
              </span>
              <span>{fmtDate(c.queuedAt)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
function WorkspacePanel({
  call,
  onSelectFirst,
}: {
  call?: Call;
  onSelectFirst: () => void;
}) {
  const { data, setData, toast } = useStore();
  const person = data.customers.find((c) => c.id === call?.customerId);
  const [state, setState] = useState<"idle" | "running" | "held" | "ended">(
    "idle",
  );
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [category, setCategory] = useState("");
  const [outcome, setOutcome] = useState("");
  const [resolution, setResolution] = useState("");
  const [escalation, setEscalation] = useState("");
  const [followup, setFollowup] = useState(false);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    setState("idle");
    setMuted(false);
    setSeconds(call?.durationSeconds || 0);
    setCategory(call?.category || "");
    setOutcome(call?.outcome || "");
    setResolution(call?.resolutionStatus || "");
    setEscalation(call?.escalationReason || "");
    setFollowup(call?.followUp || false);
    setNote(call ? (data.notes[call.id] ?? call.notes) : "");
    setSaved(false);
  }, [call?.id]);
  useEffect(() => {
    if (state !== "running") return;
    const timer = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(timer);
  }, [state]);
  const update = (changes: Partial<Call>) => {
    if (!call) return;
    setData({
      ...data,
      calls: data.calls.map((c) =>
        c.id === call.id ? { ...c, ...changes } : c,
      ),
    });
  };
  const saveNote = () => {
    if (!call) return;
    if (!note.trim()) {
      toast("Add a note before saving.", true);
      return;
    }
    setData({
      ...data,
      notes: { ...data.notes, [call.id]: note.trim() },
      calls: data.calls.map((c) =>
        c.id === call.id ? { ...c, notes: note.trim() } : c,
      ),
    });
    toast("Call notes saved");
    setSaved(true);
  };
  const finish = () => {
    if (!call) return;
    if (call.status === "Completed") {
      toast("This call has already been completed.", true);
      return;
    }
    if (state !== "ended") {
      toast("End the simulated call before saving its disposition.", true);
      return;
    }
    if (!category || !outcome || !resolution) {
      toast("Choose a category, outcome, and resolution status.", true);
      return;
    }
    if (resolution === "Escalated" && !escalation.trim()) {
      toast("Add an escalation reason to continue.", true);
      return;
    }
    const stamp = new Date().toISOString();
    let didUpdate = false;
    const calls = data.calls.map((c) => {
      if (c.id !== call.id) return c;
      if (c.status === "Completed") {
        return c;
      }
      didUpdate = true;
      return {
        ...c,
        status: "Completed",
        agent: data.preferences.agent,
        durationSeconds: seconds,
        category,
        outcome,
        resolutionStatus: resolution,
        escalationReason: resolution === "Escalated" ? escalation : "",
        followUp: followup,
        notes: note.trim(),
        completedAt: stamp,
      };
    });
    if (!didUpdate) {
      toast("This call has already been completed.", true);
      return;
    }
    setData({
      ...data,
      calls,
      notes: { ...data.notes, [call.id]: note.trim() },
    });
    setState("idle");
    toast(`Disposition saved for ${person?.name || "customer"}`);
    setSaved(true);
  };
  if (!call)
    return (
      <PageCard>
        <div className="empty">
          <Headphones size={26} />
          <strong>Select a call to begin</strong>
          <span>
            Pick a customer from the waiting queue. Their account context will
            appear here.
          </span>
          <div style={{ marginTop: 16 }}>
            <button className="btn" onClick={onSelectFirst}>
              <Play /> Select next call
            </button>
          </div>
        </div>
        <div className="notice">
          Call controls are a frontend simulation only. No telephone network is
          connected.
        </div>
      </PageCard>
    );
  return (
    <div style={{ display: "grid", gap: 14, alignContent: "start" }}>
      <PageCard>
        <div className="card-title">
          <div className="live-label">
            {state === "running" ? (
              <>
                <i className="pulse" /> Call in progress
              </>
            ) : state === "held" ? (
              "Call on hold"
            ) : state === "ended" ? (
              "Call ended"
            ) : (
              "Ready to call"
            )}
          </div>
          <Status tone="blue">{call.id}</Status>
        </div>
        <div className="call-controls">
          <div className="timer">{fmtDuration(seconds)}</div>
          {state === "idle" && (
            <button
              className="btn"
              onClick={() => {
                if (call.status === "Completed") {
                  toast("This call is already complete.", true);
                  return;
                }
                setState("running");
              }}
              disabled={call.status === "Completed"}
              data-testid="button-start-call"
            >
              <Phone /> Start simulated call
            </button>
          )}
          {state === "running" && (
            <>
              <button
                className="btn secondary"
                onClick={() => setState("held")}
                data-testid="button-hold-call"
              >
                <Pause /> Hold
              </button>
              <button
                className="btn ghost"
                onClick={() => setMuted(!muted)}
                data-testid="button-mute-call"
              >
                {muted ? <Mic /> : <MicOff />} {muted ? "Unmute" : "Mute"}
              </button>
              <button
                className="btn danger"
                onClick={() => setState("ended")}
                data-testid="button-end-call"
              >
                <X /> End call
              </button>
            </>
          )}
          {state === "held" && (
            <>
              <button
                className="btn"
                onClick={() => setState("running")}
                data-testid="button-resume-call"
              >
                <Play /> Resume
              </button>
              <button className="btn ghost" onClick={() => setMuted(!muted)}>
                {muted ? <Mic /> : <MicOff />} {muted ? "Unmute" : "Mute"}
              </button>
              <button className="btn danger" onClick={() => setState("ended")}>
                <X /> End call
              </button>
            </>
          )}
          {state === "ended" && (
            <Status tone="good">
              <Check size={12} /> Ready for disposition
            </Status>
          )}
        </div>
        <div className="notice" style={{ marginTop: 14 }}>
          Simulation only — call controls do not connect to a real telephone
          network.
        </div>
      </PageCard>
      <PageCard>
        <div className="card-title">
          <h2>Customer context</h2>
          <Status tone={person?.status === "Review" ? "wait" : "good"}>
            {person?.status || "Unknown"}
          </Status>
        </div>
        <div className="context-header">
          <div className="avatar large">{initials(person?.name || "NA")}</div>
          <div>
            <div className="context-name">{person?.name}</div>
            <div className="subtle" style={{ marginTop: 4 }}>
              {person?.id} · {person?.accountTier} account
            </div>
          </div>
        </div>
        <div className="context-details">
          <div className="detail-chip">
            <span>Phone</span>
            <strong>{person?.phone}</strong>
          </div>
          <div className="detail-chip">
            <span>Email</span>
            <strong style={{ fontSize: 11 }}>{person?.email}</strong>
          </div>
          <div className="detail-chip">
            <span>Open issues</span>
            <strong>{person?.openIssues} open</strong>
          </div>
        </div>
        <div className="notice">
          Reason for call: <strong>{call.reason}</strong>
          <br />
          Customer has {person?.orders} orders and {person?.interactions}{" "}
          previous interactions.
        </div>
      </PageCard>
      <PageCard>
        <div className="card-title">
          <div>
            <h2>Call notes</h2>
            <div className="subtle" style={{ marginTop: 4 }}>
              Saved per call and retained on this device
            </div>
          </div>
          {saved && (
            <span className="feedback">
              <Check size={13} style={{ verticalAlign: "middle" }} /> Saved
            </span>
          )}
        </div>
        <textarea
          className="textarea"
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
            setSaved(false);
          }}
          placeholder="Capture the customer's request, steps taken, and any helpful details…"
          data-testid="textarea-call-notes"
        />
        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 9 }}
        >
          <button
            className="btn secondary small"
            onClick={saveNote}
            data-testid="button-save-notes"
          >
            Save notes
          </button>
        </div>
      </PageCard>
      <PageCard>
        <div className="card-title">
          <div>
            <h2>Disposition</h2>
            <div className="subtle" style={{ marginTop: 4 }}>
              Complete the call record once the conversation ends
            </div>
          </div>
        </div>
        <div className="form-grid">
          <Field
            label="Call category"
            value={category}
            set={setCategory}
            options={[
              "Billing",
              "Order support",
              "Account",
              "Technical support",
              "Product information",
              "Other",
            ]}
            placeholder="Select category"
          />
          <Field
            label="Call outcome"
            value={outcome}
            set={setOutcome}
            options={[
              "Information provided",
              "Customer updated details",
              "Refund issued",
              "Replacement arranged",
              "Issue resolved",
              "Escalated to specialist",
              "Unable to resolve",
            ]}
            placeholder="Select outcome"
          />
          <Field
            label="Resolution status"
            value={resolution}
            set={setResolution}
            options={[
              "Resolved",
              "Pending follow-up",
              "Escalated",
              "Unresolved",
            ]}
            placeholder="Select status"
          />
          {resolution === "Escalated" && (
            <div className="form-group">
              <label>Escalation reason *</label>
              <input
                className="field"
                value={escalation}
                onChange={(e) => setEscalation(e.target.value)}
                placeholder="Why does this need specialist support?"
                data-testid="input-escalation-reason"
              />
            </div>
          )}
          <div className="form-group full">
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={followup}
                onChange={(e) => setFollowup(e.target.checked)}
                data-testid="checkbox-follow-up"
              />{" "}
              Follow-up required
            </label>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 17,
            gap: 10,
          }}
        >
          <span className="subtle">
            {call.status === "Completed"
              ? "This record is already in history."
              : "Required fields are marked by their placeholder."}
          </span>
          <button
            className="btn"
            onClick={finish}
            disabled={call.status === "Completed"}
            data-testid="button-save-disposition"
          >
            <Check /> Save disposition
          </button>
        </div>
      </PageCard>
    </div>
  );
}
function Field({
  label,
  value,
  set,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  set: (s: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div className="form-group">
      <label>{label} *</label>
      <select
        className="select"
        value={value}
        onChange={(e) => set(e.target.value)}
        data-testid={`select-${label.toLowerCase().replaceAll(" ", "-")}`}
      >
        <option value="">{placeholder}</option>
        {options.map((x) => (
          <option key={x}>{x}</option>
        ))}
      </select>
    </div>
  );
}
function Empty({ title, text }: { title: string; text: string }) {
  return (
    <div className="empty">
      <Search size={22} />
      <strong>{title}</strong>
      <span>{text}</span>
    </div>
  );
}
function Customers() {
  const { data } = useStore();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Customer | null>(null);
  const visible = data.customers.filter((c) =>
    `${c.name} ${c.email} ${c.phone} ${c.id}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <>
      <Heading
        title="Customers"
        subtitle="A complete directory with useful account context."
      />
      <div className="layout-two">
        <PageCard>
          <div className="toolbar">
            <div className="searchbox">
              <Search />
              <input
                className="field"
                placeholder="Search customers"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                data-testid="input-customers-search"
              />
            </div>
          </div>
          <div className="call-list">
            {visible.map((c) => (
              <div
                className={`call-item ${selected?.id === c.id ? "selected" : ""}`}
                key={c.id}
                onClick={() => setSelected(c)}
                data-testid={`customer-record-${c.id}`}
              >
                <div className="call-item-head">
                  <strong>{c.name}</strong>
                  <Status tone={c.status === "Review" ? "wait" : "good"}>
                    {c.status}
                  </Status>
                </div>
                <p>
                  {c.id} · {c.accountTier} tier
                </p>
                <div className="call-item-foot">
                  <span>{c.openIssues} open issues</span>
                  <span>{c.interactions} interactions</span>
                </div>
              </div>
            ))}
          </div>
          {visible.length === 0 && (
            <Empty
              title="No customers found"
              text="Try another name, email, or customer ID."
            />
          )}
        </PageCard>
        <PageCard>
          {selected ? (
            <>
              <div className="card-title">
                <h2>Customer profile</h2>
                <Status tone={selected.status === "Review" ? "wait" : "good"}>
                  {selected.status}
                </Status>
              </div>
              <div className="context-header">
                <div className="avatar large">{initials(selected.name)}</div>
                <div>
                  <div className="context-name">{selected.name}</div>
                  <div className="subtle">{selected.id}</div>
                </div>
              </div>
              <div className="context-details">
                <div className="detail-chip">
                  <span>Account tier</span>
                  <strong>{selected.accountTier}</strong>
                </div>
                <div className="detail-chip">
                  <span>Open issues</span>
                  <strong>{selected.openIssues}</strong>
                </div>
                <div className="detail-chip">
                  <span>Orders</span>
                  <strong>{selected.orders}</strong>
                </div>
              </div>
              <div className="notice">
                {selected.email}
                <br />
                {selected.phone}
              </div>
              <hr className="section-rule" />
              <div className="card-title">
                <h2>Recent interactions</h2>
                <span className="subtle">{selected.interactions} total</span>
              </div>
              {data.calls
                .filter((c) => c.customerId === selected.id)
                .sort((a, b) => b.completedAt.localeCompare(a.completedAt))
                .map((c) => (
                  <ActivityItem key={c.id} call={c} />
                ))}
              {data.calls.filter((c) => c.customerId === selected.id).length ===
                0 && (
                <Empty
                  title="No interactions yet"
                  text="Completed calls will appear here."
                />
              )}
            </>
          ) : (
            <div className="empty">
              <Users size={25} />
              <strong>Select a customer</strong>
              <span>
                Choose a customer to review contact and interaction details.
              </span>
            </div>
          )}
        </PageCard>
      </div>
    </>
  );
}
function HistoryPage() {
  const { data } = useStore();
  const [query, setQuery] = useState("");
  const [resolution, setResolution] = useState("All resolutions");
  const [range, setRange] = useState("All time");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const today = dayKey(new Date());
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = dayKey(yesterdayDate);
  const completed = data.calls.filter((c) => c.status === "Completed");
  const calls = completed.filter((c) => {
    const name = data.customers.find((x) => x.id === c.customerId)?.name || "";
    const matches =
      `${name} ${c.reason} ${c.id} ${c.outcome}`
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (resolution === "All resolutions" || c.resolutionStatus === resolution);
    const completedDay = dayKey(c.completedAt);
    const matchesDate =
      range === "All time" ||
      (range === "Today" && completedDay === today) ||
      (range === "Yesterday" && completedDay === yesterday) ||
      (range === "Date range" &&
        (!startDate || completedDay >= startDate) &&
        (!endDate || completedDay <= endDate));
    return matches && matchesDate;
  });
  return (
    <>
      <Heading
        title="Call history"
        subtitle="Review completed conversations and saved dispositions."
      />
      <PageCard>
        <div className="toolbar">
          <div className="searchbox">
            <Search />
            <input
              className="field"
              placeholder="Search name, call ID, reason, or outcome"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              data-testid="input-history-search"
            />
          </div>
          <select
            className="select"
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
            data-testid="select-history-outcome"
          >
            <option>All resolutions</option>
            <option>Resolved</option>
            <option>Pending follow-up</option>
            <option>Escalated</option>
            <option>Unresolved</option>
          </select>
          <select
            className="select"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            data-testid="select-history-date"
          >
            <option>All time</option>
            <option>Today</option>
            <option>Yesterday</option>
            <option>Date range</option>
          </select>
          {range === "Date range" && (
            <>
              <input
                className="field"
                type="date"
                aria-label="History start date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                data-testid="input-history-start-date"
              />
              <input
                className="field"
                type="date"
                aria-label="History end date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                data-testid="input-history-end-date"
              />
            </>
          )}
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Call</th>
                <th>Customer</th>
                <th>Category</th>
                <th>Duration</th>
                <th>Agent</th>
                <th>Resolution</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {calls
                .slice()
                .reverse()
                .map((c) => (
                  <tr key={c.id}>
                    <td>
                      <strong>{c.id}</strong>
                      <div className="subtle">{c.reason}</div>
                    </td>
                    <td>
                      {data.customers.find((x) => x.id === c.customerId)?.name}
                    </td>
                    <td>{c.category}</td>
                    <td>{fmtDuration(c.durationSeconds)}</td>
                    <td>{c.agent}</td>
                    <td>
                      <Status
                        tone={
                          c.resolutionStatus === "Escalated"
                            ? "alert"
                            : c.resolutionStatus === "Resolved"
                              ? "good"
                              : "wait"
                        }
                      >
                        {c.resolutionStatus}
                      </Status>
                    </td>
                    <td>{fmtDate(c.completedAt)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          {calls.length === 0 && (
            <Empty
              title="No completed calls found"
              text="Calls appear here after their disposition is saved."
            />
          )}
        </div>
      </PageCard>
    </>
  );
}
function Reports() {
  const { data } = useStore();
  const done = data.calls.filter((c) => c.status === "Completed");
  const resolved = done.filter((c) => c.resolutionStatus === "Resolved").length;
  const escalated = done.filter(
    (c) => c.resolutionStatus === "Escalated",
  ).length;
  const follow = done.filter((c) => c.followUp).length;
  const other = done.filter(
    (c) => !["Resolved", "Escalated"].includes(c.resolutionStatus),
  ).length;
  const byCategory = Object.entries(
    done.reduce<Record<string, number>>(
      (o, c) => ({
        ...o,
        [c.category || "Uncategorized"]:
          (o[c.category || "Uncategorized"] || 0) + 1,
      }),
      {},
    ),
  ).sort((a, b) => b[1] - a[1]);
  const max = Math.max(1, ...byCategory.map((x) => x[1]));
  return (
    <>
      <Heading
        title="Reports"
        subtitle="Operational signals from the shared call records."
      />
      <div className="grid kpi-grid">
        {[
          ["Completed calls", done.length],
          ["Resolved", resolved],
          ["Escalated", escalated],
          ["Follow-up needed", follow],
        ].map(([label, value]) => (
          <PageCard key={label} className="kpi">
            <div className="kpi-label">{label}</div>
            <div className="kpi-value">{value}</div>
            <div className="kpi-note">Based on saved sample records</div>
            <div className="kpi-icon">
              <BarChart3 size={17} />
            </div>
          </PageCard>
        ))}
      </div>
      <div className="grid dashboard-grid">
        <PageCard>
          <div className="card-title">
            <div>
              <h2>Call outcomes</h2>
              <div className="subtle" style={{ marginTop: 4 }}>
                Disposition mix across {done.length} completed calls
              </div>
            </div>
          </div>
          {[
            ["Resolved", resolved, "#78b696"],
            ["Escalated", escalated, "#d57d82"],
            ["Other", other, "#9bb2dd"],
          ].map(([label, value, color]) => (
            <div
              key={label}
              style={{
                display: "grid",
                gridTemplateColumns: "90px 1fr 30px",
                gap: 12,
                alignItems: "center",
                margin: "16px 0",
              }}
            >
              <span style={{ fontSize: 12, color: "#67768c" }}>{label}</span>
              <div
                style={{
                  height: 9,
                  background: "#f0f3f7",
                  borderRadius: 20,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${done.length ? (Number(value) / done.length) * 100 : 0}%`,
                    background: String(color),
                    borderRadius: 20,
                  }}
                />
              </div>
              <strong style={{ fontSize: 12, color: "#495970" }}>
                {value}
              </strong>
            </div>
          ))}
          <div className="subtle">
            Follow-up is tracked separately and may overlap with the resolution
            status.
          </div>
        </PageCard>
        <PageCard>
          <div className="card-title">
            <div>
              <h2>Calls by category</h2>
              <div className="subtle" style={{ marginTop: 4 }}>
                Most common support topics
              </div>
            </div>
          </div>
          {byCategory.length ? (
            byCategory.map(([label, count]) => (
              <div key={label} style={{ margin: "14px 0" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                    marginBottom: 6,
                    color: "#5c6b81",
                  }}
                >
                  <span>{label}</span>
                  <strong>{count}</strong>
                </div>
                <div
                  style={{ height: 7, background: "#eef2f6", borderRadius: 10 }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${(count / max) * 100}%`,
                      background: "#718dbe",
                      borderRadius: 10,
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <Empty
              title="No call data yet"
              text="Complete calls to build a report."
            />
          )}
        </PageCard>
      </div>
      <div className="notice" style={{ marginTop: 16 }}>
        Reports are calculated from the fictional demo records stored in this
        browser. They are operational examples, not live service metrics.
      </div>
    </>
  );
}
function Settings() {
  const { data, setData, reset, toast } = useStore();
  const [agentName, setAgentName] = useState(data.preferences.agent);
  useEffect(() => setAgentName(data.preferences.agent), [data.preferences.agent]);
  const toggle = (key: "compact" | "notifications" | "dark") => {
    const preferences = { ...data.preferences, [key]: !data.preferences[key] };
    setData({ ...data, preferences });
    if (key === "dark")
      document.documentElement.classList.toggle("dark", preferences.dark);
    toast("Preference updated");
  };
  const saveAgentName = () => {
    const agent = agentName.trim() || DEMO_AGENT;
    setAgentName(agent);
    setData({ ...data, preferences: { ...data.preferences, agent } });
    toast("Agent name saved");
  };
  return (
    <>
      <Heading
        title="Settings"
        subtitle="Tune this local demo to your working preference."
      />
      <div
        className="grid"
        style={{ gridTemplateColumns: "minmax(0,1fr) minmax(280px,.7fr)" }}
      >
        <PageCard>
          <div className="card-title">
            <div>
              <h2>Workspace preferences</h2>
              <div className="subtle" style={{ marginTop: 4 }}>
                Saved in this browser
              </div>
            </div>
            <SettingsIcon size={17} color="#8191a6" />
          </div>
          <div className="setting-row">
            <div>
              <strong style={{ fontSize: 13 }}>Compact density</strong>
              <div className="subtle" style={{ marginTop: 4 }}>
                Use tighter spacing in record lists
              </div>
            </div>
            <button
              className={`switch ${data.preferences.compact ? "on" : ""}`}
              aria-label="Toggle compact density"
              onClick={() => toggle("compact")}
              data-testid="toggle-compact"
            />
          </div>
          <div className="setting-row">
            <div>
              <strong style={{ fontSize: 13 }}>Notifications</strong>
              <div className="subtle" style={{ marginTop: 4 }}>
                Show in-app operational notifications
              </div>
            </div>
            <button
              className={`switch ${data.preferences.notifications ? "on" : ""}`}
              aria-label="Toggle notifications"
              onClick={() => toggle("notifications")}
              data-testid="toggle-notifications"
            />
          </div>
          <div className="setting-row">
            <div>
              <strong style={{ fontSize: 13 }}>Dark appearance</strong>
              <div className="subtle" style={{ marginTop: 4 }}>
                Switch to a low-light workspace
              </div>
            </div>
            <button
              className={`switch ${data.preferences.dark ? "on" : ""}`}
              aria-label="Toggle dark appearance"
              onClick={() => toggle("dark")}
              data-testid="toggle-dark"
            />
          </div>
          <div className="setting-row">
            <div>
              <strong style={{ fontSize: 13 }}>Agent display name</strong>
              <div className="subtle" style={{ marginTop: 4 }}>
                Assigned to completed calls
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                className="field"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                aria-label="Agent display name"
                data-testid="input-agent-name"
                style={{ maxWidth: 180 }}
              />
              <button
                className="btn secondary small"
                onClick={saveAgentName}
                data-testid="button-save-agent-name"
              >
                Save
              </button>
            </div>
          </div>
        </PageCard>
        <div style={{ display: "grid", gap: 15, alignContent: "start" }}>
          <PageCard>
            <div className="card-title">
              <h2>Demo data</h2>
              <Activity size={17} color="#8393a8" />
            </div>
            <p className="subtle" style={{ lineHeight: 1.6 }}>
              Changes to calls, dispositions, preferences, and notes are stored
              only in localStorage on this device.
            </p>
            <button
              className="btn danger"
              onClick={() => {
                if (
                  window.confirm(
                    "Reset all demo changes and restore the original sample data?",
                  )
                ) {
                  reset();
                  toast("Demo data restored");
                }
              }}
              data-testid="button-reset-demo"
            >
              <Activity size={15} /> Reset demo data
            </button>
          </PageCard>
          <PageCard>
            <div className="card-title">
              <h2>About this simulation</h2>
              <ShieldCheck size={17} color="#8393a8" />
            </div>
            <div className="notice">
              Call start, hold, mute, and end controls are simulated in the
              browser. No real phone network, backend, or AI service is
              connected.
            </div>
          </PageCard>
        </div>
      </div>
    </>
  );
}
function NotFoundPage() {
  return (
    <div className="empty">
      <LifeBuoy size={26} />
      <strong>Page not found</strong>
      <Link className="row-action" href="/">
        Return to overview
      </Link>
    </div>
  );
}
function App() {
  const [data, setDataState] = useState<AppData>(loadData);
  const [message, setMessage] = useState<{
    text: string;
    error: boolean;
  } | null>(null);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch {
      setMessage({
        text: "Unable to save changes in this browser storage.",
        error: true,
      });
    }
  }, [data]);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", data.preferences.dark);
  }, [data.preferences.dark]);
  useEffect(() => {
    if (!message) return;
    const id = window.setTimeout(() => setMessage(null), 3000);
    return () => window.clearTimeout(id);
  }, [message]);
  const store = useMemo<Store>(
    () => ({
      data,
      setData: setDataState,
      toast: (text, error = false) => setMessage({ text, error }),
      reset: () => setDataState(defaultData()),
    }),
    [data],
  );
  return (
    <StoreContext.Provider value={store}>
      <Shell>
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/workspace" component={QueueWorkspace} />
          <Route path="/queue" component={QueuePage} />
          <Route path="/customers" component={Customers} />
          <Route path="/history" component={HistoryPage} />
          <Route path="/reports" component={Reports} />
          <Route path="/settings" component={Settings} />
          <Route component={NotFoundPage} />
        </Switch>
      </Shell>
      {message && (
        <div
          className={`toast ${message.error ? "error" : ""}`}
          role="status"
          data-testid="status-toast"
        >
          {message.text}
        </div>
      )}
    </StoreContext.Provider>
  );
}
function QueueWorkspace() {
  const id = sessionStorage.getItem("selectedCall") || "";
  return <Queue workspace key={id} />;
}
function QueuePage() {
  return <Queue />;
}
export default App;
