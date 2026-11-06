import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  Briefcase,
  Check,
  CircleAlert,
  Info,
  Search,
  TrendingUp,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

import { chartTheme, Initials, Page, PageHeader, Panel, StatCard } from "@/components/kit";
import { RoleGate } from "@/components/role-access";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OPPORTUNITIES } from "@/lib/opportunities";
import {
  ADMIN_TREND,
  PENDING_LISTINGS,
  PLACEMENTS_BY_FIELD,
  SYSTEM_LOGS,
  USERS,
  type LogEntry,
  type PlatformUser,
  type UserRole,
} from "@/lib/platform-data";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Console — HuntYourTrack" },
      { name: "description", content: "Platform analytics, user management, listing approvals and system logs." },
      { property: "og:title", content: "Admin Console — HuntYourTrack" },
      { property: "og:description", content: "Platform analytics, user management, listing approvals and system logs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <RoleGate role="admin">
      <AdminConsole />
    </RoleGate>
  ),
});

const LOG_STYLE: Record<LogEntry["level"], { icon: typeof Info; className: string }> = {
  info: { icon: Info, className: "text-primary" },
  warn: { icon: AlertTriangle, className: "text-warning" },
  error: { icon: XCircle, className: "text-destructive" },
};

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

function AdminConsole() {
  const [users, setUsers] = useState<PlatformUser[]>(USERS);
  const [pending, setPending] = useState(PENDING_LISTINGS);
  const [logs, setLogs] = useState<LogEntry[]>(SYSTEM_LOGS);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | UserRole>("all");
  const [logFilter, setLogFilter] = useState<"all" | LogEntry["level"]>("all");
  const [approved, setApproved] = useState(0);

  const log = (level: LogEntry["level"], message: string) =>
    setLogs((prev) => [{ id: crypto.randomUUID(), level, message, time: now() }, ...prev]);

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter(
      (u) =>
        (roleFilter === "all" || u.role === roleFilter) &&
        (!q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)),
    );
  }, [users, query, roleFilter]);

  const toggleStatus = (u: PlatformUser) => {
    const next = u.status === "active" ? "suspended" : "active";
    setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, status: next } : x)));
    log(next === "suspended" ? "warn" : "info", `User ${u.name} ${next === "suspended" ? "suspended" : "reactivated"}`);
    toast(next === "suspended" ? "User suspended" : "User reactivated", { description: u.email });
  };

  const changeRole = (u: PlatformUser, role: UserRole) => {
    setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, role } : x)));
    log("info", `Role for ${u.name} changed to ${role}`);
    toast.success("Role updated", { description: `${u.name} is now ${role}` });
  };

  const decide = (id: string, ok: boolean) => {
    const item = pending.find((p) => p.id === id);
    if (!item) return;
    setPending((prev) => prev.filter((p) => p.id !== id));
    if (ok) setApproved((n) => n + 1);
    log(ok ? "info" : "warn", `Listing '${item.title}' (${item.company}) ${ok ? "approved and published" : "rejected"}`);
    toast[ok ? "success" : "error"](ok ? "Listing approved" : "Listing rejected", { description: `${item.title} · ${item.company}` });
  };

  const visibleLogs = logs.filter((l) => logFilter === "all" || l.level === logFilter);
  const activeUsers = users.filter((u) => u.status === "active").length;

  return (
    <Page>
      <PageHeader
        eyebrow="Admin console · Placement Office"
        title="System overview"
        description="Monitor platform health, manage accounts and keep listings trustworthy."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Total users" value="2,486" hint={`${activeUsers}/${users.length} sample accounts active`} />
        <StatCard icon={Briefcase} label="Live opportunities" value={136 + approved} hint={`${OPPORTUNITIES.length} featured on Explore`} tone="success" />
        <StatCard icon={TrendingUp} label="Applications (Jul)" value="1,120" hint="+17% vs June" />
        <StatCard icon={CircleAlert} label="Pending approvals" value={pending.length} hint="Listings awaiting review" tone="warning" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel title="Applications & placements" description="Monthly, 2026" className="lg:col-span-2">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ADMIN_TREND} margin={{ left: -10, right: 8 }}>
                <defs>
                  <linearGradient id="appsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="placeFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={chartTheme.grid} vertical={false} />
                <XAxis dataKey="month" stroke={chartTheme.axis} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={chartTheme.axis} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip {...chartTheme.tooltip} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="applications" name="Applications" stroke="var(--chart-1)" strokeWidth={2} fill="url(#appsFill)" />
                <Area type="monotone" dataKey="placements" name="Placements" stroke="var(--chart-2)" strokeWidth={2} fill="url(#placeFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Placements by field" description="Confirmed this year">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PLACEMENTS_BY_FIELD} layout="vertical" margin={{ left: 20, right: 12 }}>
                <CartesianGrid stroke={chartTheme.grid} horizontal={false} />
                <XAxis type="number" stroke={chartTheme.axis} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="field" stroke={chartTheme.axis} fontSize={11} tickLine={false} axisLine={false} width={90} />
                <Tooltip {...chartTheme.tooltip} />
                <Bar dataKey="value" name="Placements" fill="var(--chart-2)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <Tabs defaultValue="users" className="mt-6">
        <TabsList className="bg-card">
          <TabsTrigger value="users">User management</TabsTrigger>
          <TabsTrigger value="approvals">
            Approvals {pending.length > 0 && <Badge variant="warning" className="ml-1.5">{pending.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="logs">System logs</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Panel>
            <div className="mb-4 flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search name or email…"
                  aria-label="Search users"
                  className="h-9 w-full rounded-lg border border-input bg-background/50 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <Select value={roleFilter} onValueChange={(v) => setRoleFilter(v as "all" | UserRole)}>
                <SelectTrigger className="w-full border-input bg-background/50 sm:w-40" aria-label="Filter by role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-border bg-popover">
                  <SelectItem value="all">All roles</SelectItem>
                  <SelectItem value="Student">Students</SelectItem>
                  <SelectItem value="Mentor">Mentors</SelectItem>
                  <SelectItem value="Admin">Admins</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="-mx-5 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="pl-5">User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Field</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="pr-5 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((u) => (
                    <TableRow key={u.id} className="border-border">
                      <TableCell className="pl-5">
                        <div className="flex items-center gap-3">
                          <Initials name={u.name} />
                          <div>
                            <p className="font-medium">{u.name}</p>
                            <p className="text-xs text-muted-foreground">{u.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select value={u.role} onValueChange={(v) => changeRole(u, v as UserRole)}>
                          <SelectTrigger className="h-8 w-28 border-input bg-background/50 text-xs" aria-label={`Role for ${u.name}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="border-border bg-popover">
                            <SelectItem value="Student">Student</SelectItem>
                            <SelectItem value="Mentor">Mentor</SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{u.field}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{u.joined}</TableCell>
                      <TableCell>
                        <Badge variant={u.status === "active" ? "success" : "destructive"}>
                          {u.status === "active" ? "Active" : "Suspended"}
                        </Badge>
                      </TableCell>
                      <TableCell className="pr-5 text-right">
                        <Button size="xs" variant={u.status === "active" ? "destructive-soft" : "success-soft"} onClick={() => toggleStatus(u)}>
                          {u.status === "active" ? "Suspend" : "Reactivate"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredUsers.length === 0 && (
                    <TableRow className="border-border hover:bg-transparent">
                      <TableCell colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                        No users match your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="approvals">
          <Panel title="Opportunity approval queue" description="New partner listings need verification before students can see them">
            {pending.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted-foreground">Queue is empty — every listing has been reviewed.</p>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {pending.map((p) => (
                  <div key={p.id} className="rounded-xl border border-border bg-background/40 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium">{p.title}</p>
                        <p className="text-sm text-muted-foreground">{p.company}</p>
                      </div>
                      <Badge variant="primary">{p.field}</Badge>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span>Stipend: {p.stipend}</span>
                      <span>By {p.submittedBy}</span>
                      <span>{p.submitted}</span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="success" className="flex-1" onClick={() => decide(p.id, true)}>
                        <Check /> Approve
                      </Button>
                      <Button size="sm" variant="destructive-soft" className="flex-1" onClick={() => decide(p.id, false)}>
                        <X /> Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Panel>
        </TabsContent>

        <TabsContent value="logs">
          <Panel
            title="System logs"
            description="Latest events first — actions you take here are logged live"
            action={
              <div className="flex gap-1">
                {(["all", "info", "warn", "error"] as const).map((l) => (
                  <Button key={l} size="xs" variant={logFilter === l ? "chip-active" : "chip"} onClick={() => setLogFilter(l)}>
                    {l === "all" ? "All" : l}
                  </Button>
                ))}
              </div>
            }
          >
            <ul className="divide-y divide-border rounded-xl border border-border bg-background/40 font-mono text-xs">
              {visibleLogs.map((l) => {
                const { icon: Icon, className } = LOG_STYLE[l.level];
                return (
                  <li key={l.id} className="flex items-start gap-3 px-4 py-3">
                    <span className="w-12 shrink-0 text-muted-foreground">{l.time}</span>
                    <Icon className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${className}`} aria-label={l.level} />
                    <span className="text-foreground/90">{l.message}</span>
                  </li>
                );
              })}
            </ul>
          </Panel>
        </TabsContent>
      </Tabs>
    </Page>
  );
}
