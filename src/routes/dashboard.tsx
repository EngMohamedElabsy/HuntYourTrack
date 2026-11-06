import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bookmark, Briefcase, FileCheck2, Sparkles, Target } from "lucide-react";

import profileAvatar from "@/assets/profile-avatar.jpg.asset.json";
import { EmptyState, MatchRing, Meter, Page, Panel, StatCard } from "@/components/kit";
import { OpportunityCard } from "@/components/opportunity-card";
import { RoleGate } from "@/components/role-access";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, OPPORTUNITIES } from "@/lib/opportunities";
import {
  APPLICATION_STAGES,
  PAST_APPLICATIONS,
  RESUME_METRICS,
  SKILL_GAPS,
  STUDENT,
  type ApplicationStatus,
} from "@/lib/platform-data";
import { useApplied, useSaved } from "@/lib/saved-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Student Dashboard — HuntYourTrack" },
      { name: "description", content: "Your applications, match scores, saved internships and résumé alignment in one place." },
      { property: "og:title", content: "Student Dashboard — HuntYourTrack" },
      { property: "og:description", content: "Your applications, match scores, saved internships and résumé alignment in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <RoleGate role="student">
      <StudentDashboard />
    </RoleGate>
  ),
});

const STATUS_BADGE: Record<ApplicationStatus, { label: string; variant: "primary" | "warning" | "success" | "outline" }> = {
  submitted: { label: "Submitted", variant: "outline" },
  review: { label: "Under review", variant: "warning" },
  interview: { label: "Interview", variant: "primary" },
  offer: { label: "Offer", variant: "success" },
  closed: { label: "Closed", variant: "outline" },
};

function StageTrack({ status }: { status: ApplicationStatus }) {
  const idx = APPLICATION_STAGES.findIndex((s) => s.key === status);
  return (
    <div className="flex gap-1" aria-label={`Stage: ${STATUS_BADGE[status].label}`}>
      {APPLICATION_STAGES.map((s, i) => (
        <span
          key={s.key}
          title={s.label}
          className={cn("h-1.5 flex-1 rounded-full", i <= idx ? (status === "offer" ? "bg-success" : "bg-primary") : "bg-secondary")}
        />
      ))}
    </div>
  );
}

function StudentDashboard() {
  const applied = useApplied();
  const saved = useSaved();

  const live = OPPORTUNITIES.filter((o) => applied.ids.includes(o.id)).map((o) => ({
    id: o.id,
    title: o.title,
    company: o.company,
    match: o.match,
    status: "submitted" as ApplicationStatus,
    updated: "Just now",
  }));
  const applications = [...live, ...PAST_APPLICATIONS.map((a) => ({ ...a, updated: formatDate(a.updated) }))];
  const savedItems = OPPORTUNITIES.filter((o) => saved.ids.includes(o.id));
  const recommended = [...OPPORTUNITIES]
    .filter((o) => !applied.ids.includes(o.id))
    .sort((a, b) => b.match - a.match)
    .slice(0, 2);
  const avgMatch = Math.round(applications.reduce((s, a) => s + a.match, 0) / applications.length);
  const interviews = applications.filter((a) => a.status === "interview" || a.status === "offer").length;

  return (
    <Page>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <img src={profileAvatar.url} alt="" className="h-14 w-14 rounded-2xl object-cover ring-2 ring-primary/40" />
          <div>
            <p className="eyebrow">Student dashboard</p>
            <h1 className="text-2xl font-semibold md:text-3xl">Welcome back, {STUDENT.name.split(" ")[0]}</h1>
            <p className="text-sm text-muted-foreground">{STUDENT.year} · {STUDENT.university}</p>
          </div>
        </div>
        <Button asChild variant="hero">
          <Link to="/explore">Find new roles <ArrowRight /></Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Briefcase} label="Applications" value={applications.length} hint={`${live.length} this cycle`} />
        <StatCard icon={Target} label="Average match" value={<span className="text-success">{avgMatch}%</span>} hint="Across all applications" tone="success" />
        <StatCard icon={Sparkles} label="Interviews & offers" value={interviews} hint="Keep your calendar open" tone="warning" />
        <StatCard icon={Bookmark} label="Saved roles" value={savedItems.length} hint={<Link to="/saved" className="text-primary hover:underline">View saved</Link>} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel title="Application status" description="From submission to offer" className="lg:col-span-2">
          <div className="divide-y divide-border">
            {applications.map((a) => (
              <div key={a.id} className="grid items-center gap-3 py-4 sm:grid-cols-12">
                <div className="sm:col-span-5">
                  <p className="font-medium">{a.title}</p>
                  <p className="text-sm text-muted-foreground">{a.company}</p>
                </div>
                <div className="sm:col-span-2">
                  <Badge variant="success">{a.match}% fit</Badge>
                </div>
                <div className="sm:col-span-3">
                  <StageTrack status={a.status} />
                  <p className="mt-1 text-xs text-muted-foreground">Updated {a.updated}</p>
                </div>
                <div className="sm:col-span-2 sm:text-right">
                  <Badge variant={STATUS_BADGE[a.status].variant}>{STATUS_BADGE[a.status].label}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Résumé alignment" description="How your CV reads to partner recruiters">
          <div className="flex items-center gap-4">
            <MatchRing value={STUDENT.resumeScore} size={72} />
            <div>
              <p className="font-medium">Strong profile</p>
              <p className="text-sm text-muted-foreground">Top 18% of your cohort</p>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {RESUME_METRICS.map((m) => (
              <div key={m.label}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-muted-foreground">{m.label}</span>
                  <span className="font-medium">{m.value}%</span>
                </div>
                <Meter value={m.value} tone={m.value >= 80 ? "success" : m.value >= 70 ? "primary" : "warning"} />
              </div>
            ))}
          </div>
          <p className="eyebrow mb-2 mt-5">Close these gaps</p>
          <div className="flex flex-wrap gap-1.5">
            {SKILL_GAPS.map((g) => (
              <Badge key={g} variant="warning">{g}</Badge>
            ))}
          </div>
          <Button asChild variant="outline" size="sm" className="mt-5 w-full">
            <Link to="/my-profile"><FileCheck2 /> Improve profile</Link>
          </Button>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel
          title="Bookmarked internships"
          action={<Button asChild variant="ghost" size="sm"><Link to="/saved">See all</Link></Button>}
        >
          {savedItems.length ? (
            <div className="space-y-3">
              {savedItems.slice(0, 4).map((o) => (
                <div key={o.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <img src={o.logo} alt="" className="h-10 w-10 rounded-lg bg-foreground object-contain" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{o.title}</p>
                    <p className="text-xs text-muted-foreground">{o.company} · closes {formatDate(o.closes)}</p>
                  </div>
                  <Badge variant="success">{o.match}%</Badge>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Bookmark}
              title="No bookmarks yet"
              description="Save roles while exploring to compare them here."
              action={<Button asChild size="sm" variant="outline"><Link to="/explore">Explore</Link></Button>}
            />
          )}
        </Panel>

        <Panel title="Recommended for you" description="Highest match roles you haven't applied to">
          {recommended.length ? (
            <div className="grid gap-4">
              {recommended.map((o) => (
                <OpportunityCard key={o.id} o={o} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">You've applied to every open role — nice work.</p>
          )}
        </Panel>
      </div>
    </Page>
  );
}
