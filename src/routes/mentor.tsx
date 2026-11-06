import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck, Gauge, Star, Users } from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

import { chartTheme, Initials, Meter, Page, PageHeader, Panel, StatCard } from "@/components/kit";
import { RoleGate } from "@/components/role-access";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { INTERNS, MENTOR_WEEKLY, SUBMISSIONS, type Intern, type Submission } from "@/lib/platform-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mentor")({
  head: () => ({
    meta: [
      { title: "Mentor Dashboard — HuntYourTrack" },
      { name: "description", content: "Track assigned interns, evaluate submissions and review performance analytics." },
      { property: "og:title", content: "Mentor Dashboard — HuntYourTrack" },
      { property: "og:description", content: "Track assigned interns, evaluate submissions and review performance analytics." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <RoleGate role="mentor">
      <MentorDashboard />
    </RoleGate>
  ),
});

const STATUS: Record<Intern["status"], { label: string; variant: "success" | "primary" | "warning" }> = {
  ahead: { label: "Ahead", variant: "success" },
  "on-track": { label: "On track", variant: "primary" },
  attention: { label: "Needs attention", variant: "warning" },
};

function EvaluateDialog({
  submission,
  intern,
  onClose,
  onSubmit,
}: {
  submission: Submission | null;
  intern: Intern | undefined;
  onClose: () => void;
  onSubmit: (score: number, feedback: string) => void;
}) {
  const [score, setScore] = useState(8);
  const [feedback, setFeedback] = useState("");
  return (
    <Dialog open={!!submission} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md border-border bg-popover">
        {submission && (
          <>
            <DialogHeader>
              <p className="eyebrow">{submission.kind}</p>
              <DialogTitle className="font-display text-xl">{submission.title}</DialogTitle>
              <DialogDescription>
                Submitted by {intern?.name} · {submission.submitted}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">Score</span>
                  <span className="font-display text-lg font-semibold text-success">{score}/10</span>
                </div>
                <div className="grid grid-cols-10 gap-1">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setScore(n)}
                      aria-label={`Score ${n}`}
                      aria-pressed={score === n}
                      className={cn(
                        "h-8 rounded-md text-xs font-medium transition-colors",
                        n <= score ? "bg-success-soft text-success" : "bg-secondary text-muted-foreground hover:bg-accent",
                      )}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="feedback" className="mb-2 block text-sm font-medium">Feedback</label>
                <Textarea
                  id="feedback"
                  rows={4}
                  maxLength={600}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="What went well, and what to improve next…"
                  className="border-input bg-card"
                />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button
                variant="success"
                onClick={() => {
                  onSubmit(score, feedback.trim());
                  setFeedback("");
                  setScore(8);
                }}
              >
                Submit evaluation
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function MentorDashboard() {
  const [submissions, setSubmissions] = useState(SUBMISSIONS);
  const [active, setActive] = useState<Submission | null>(null);
  const internById = (id: string) => INTERNS.find((i) => i.id === id);

  const pending = submissions.filter((s) => s.status === "pending");
  const reviewed = submissions.filter((s) => s.status === "reviewed");
  const avgRating = (INTERNS.reduce((s, i) => s + i.rating, 0) / INTERNS.length).toFixed(1);
  const avgProgress = Math.round(INTERNS.reduce((s, i) => s + i.progress, 0) / INTERNS.length);

  const evaluate = (score: number, feedback: string) => {
    if (!active) return;
    setSubmissions((prev) => prev.map((s) => (s.id === active.id ? { ...s, status: "reviewed", score, feedback } : s)));
    toast.success("Evaluation sent", { description: `${internById(active.internId)?.name} will be notified.` });
    setActive(null);
  };

  return (
    <Page>
      <PageHeader
        eyebrow="Mentor workspace · Valeo Egypt"
        title="Good evening, Karim"
        description="Your cohort at a glance — evaluate pending work and spot interns who need support."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Assigned interns" value={INTERNS.length} hint="3 programs" />
        <StatCard icon={ClipboardCheck} label="Pending reviews" value={pending.length} hint="Aim for 48h turnaround" tone="warning" />
        <StatCard icon={Star} label="Average rating" value={avgRating} hint="Out of 5.0" tone="success" />
        <StatCard icon={Gauge} label="Cohort progress" value={`${avgProgress}%`} hint="Of program milestones" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel title="Assigned interns" className="lg:col-span-2">
          <div className="-mx-5 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="pl-5">Intern</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead className="w-40">Progress</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="pr-5">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {INTERNS.map((i) => (
                  <TableRow key={i.id} className="border-border">
                    <TableCell className="pl-5">
                      <div className="flex items-center gap-3">
                        <Initials name={i.name} />
                        <div>
                          <p className="font-medium">{i.name}</p>
                          <p className="text-xs text-muted-foreground">Active {i.lastActive}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{i.program}</p>
                      <p className="text-xs text-muted-foreground">{i.track}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Meter value={i.progress} tone={i.status === "attention" ? "warning" : "success"} />
                        <span className="w-9 text-xs text-muted-foreground">{i.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1 text-sm">
                        <Star className="h-3.5 w-3.5 fill-warning text-warning" /> {i.rating}
                      </span>
                    </TableCell>
                    <TableCell className="pr-5">
                      <Badge variant={STATUS[i.status].variant}>{STATUS[i.status].label}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Panel>

        <Panel title="Submissions">
          <Tabs defaultValue="pending">
            <TabsList className="grid w-full grid-cols-2 bg-background/60">
              <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
              <TabsTrigger value="reviewed">Reviewed ({reviewed.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="mt-4 space-y-2">
              {pending.length === 0 && (
                <p className="py-8 text-center text-sm text-muted-foreground">All caught up 🎉</p>
              )}
              {pending.map((s) => (
                <div key={s.id} className="rounded-xl border border-border p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">{s.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {internById(s.internId)?.name} · {s.submitted}
                      </p>
                    </div>
                    <Badge variant="outline">{s.kind}</Badge>
                  </div>
                  <Button size="sm" className="mt-3 w-full" onClick={() => setActive(s)}>
                    Evaluate
                  </Button>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="reviewed" className="mt-4 space-y-2">
              {reviewed.map((s) => (
                <div key={s.id} className="rounded-xl border border-border p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">{s.title}</p>
                      <p className="text-xs text-muted-foreground">{internById(s.internId)?.name}</p>
                    </div>
                    <Badge variant="success">{s.score}/10</Badge>
                  </div>
                  {s.feedback && <p className="mt-2 text-xs text-muted-foreground">“{s.feedback}”</p>}
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Average evaluation score" description="Cohort mean per week (out of 10)">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MENTOR_WEEKLY} margin={{ left: -20, right: 8 }}>
                <defs>
                  <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={chartTheme.grid} vertical={false} />
                <XAxis dataKey="week" stroke={chartTheme.axis} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis domain={[5, 10]} stroke={chartTheme.axis} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip {...chartTheme.tooltip} />
                <Area type="monotone" dataKey="score" stroke="var(--chart-2)" strokeWidth={2} fill="url(#scoreFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Milestone completion by intern" description="Share of program tasks completed">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={INTERNS.map((i) => ({ name: i.name.split(" ")[0], progress: i.progress }))} margin={{ left: -20, right: 8 }}>
                <CartesianGrid stroke={chartTheme.grid} vertical={false} />
                <XAxis dataKey="name" stroke={chartTheme.axis} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={chartTheme.axis} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip {...chartTheme.tooltip} />
                <Bar dataKey="progress" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <EvaluateDialog
        submission={active}
        intern={active ? internById(active.internId) : undefined}
        onClose={() => setActive(null)}
        onSubmit={evaluate}
      />
    </Page>
  );
}
