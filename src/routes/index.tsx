import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Cpu,
  Database,
  Palette,
  Radar,
  ShieldCheck,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";

import { MatchRing } from "@/components/kit";
import { OpportunityGrid } from "@/components/opportunity-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OPPORTUNITIES } from "@/lib/opportunities";
import { FIELD_TRACKS, type FieldTrack } from "@/lib/platform-data";
import { useRole, useSignInDialog } from "@/lib/saved-store";
import { ROLE_META } from "@/lib/roles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HuntYourTrack — Internships & career tracks for Damanhour University" },
      {
        name: "description",
        content:
          "Faculty-endorsed internships, match scores and career tracking for Engineering, Computer Science and Business students.",
      },
      { property: "og:title", content: "HuntYourTrack — Find the track that fits" },
      {
        property: "og:description",
        content:
          "Faculty-endorsed internships, match scores and career tracking for Engineering, Computer Science and Business students.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const FIELD_ICON: Record<FieldTrack["field"], LucideIcon> = {
  "Computer Science": Cpu,
  Engineering: Building2,
  Business: BriefcaseBusiness,
  Data: Database,
  Security: ShieldCheck,
  Design: Palette,
};

const VALUE_PROPS = [
  { icon: Target, title: "Match scores that mean something", body: "Every role is scored against your courses, skills and résumé — so you apply where you fit." },
  { icon: BadgeCheck, title: "Faculty-endorsed listings", body: "The placement office verifies each partner and role before it reaches students." },
  { icon: BarChart3, title: "Track every application", body: "See status from submission to offer, with deadlines and next steps in one dashboard." },
  { icon: Radar, title: "Career Radar insights", body: "Spot rising skills and in-demand tracks across every faculty before the cycle opens." },
];

const STATS = [
  { value: "136+", label: "Endorsed roles this cycle" },
  { value: "48", label: "Industry partners" },
  { value: "91%", label: "Average student fit" },
  { value: "2.4k", label: "Students & mentors" },
];

function TrackCard({ t }: { t: FieldTrack }) {
  const Icon = FIELD_ICON[t.field];
  const body = (
    <>
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <Badge variant="success">{t.avgMatch}% avg fit</Badge>
      </div>
      <p className="eyebrow mt-4">{t.field}</p>
      <h3 className="mt-1 text-lg font-semibold">{t.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {t.topSkills.slice(0, 3).map((s) => (
          <span key={s} className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">{s}</span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm">
        <span className="text-muted-foreground">
          <span className="font-semibold text-foreground">{t.openings}</span> openings
        </span>
        <span className="flex items-center gap-1 text-primary">
          {t.exploreTrack ? "View roles" : "See on radar"} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
      <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
        <BadgeCheck className="h-3.5 w-3.5 text-success" aria-hidden /> Endorsed by {t.endorsedBy}
      </p>
    </>
  );
  const cls = "group panel block p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40";
  return t.exploreTrack ? (
    <Link to="/explore" search={{ track: t.exploreTrack }} className={cls}>{body}</Link>
  ) : (
    <Link to="/career-radar" className={cls}>{body}</Link>
  );
}

function Landing() {
  const { role } = useRole();
  const { setOpen } = useSignInDialog();
  const featured = [...OPPORTUNITIES].sort((a, b) => b.match - a.match).slice(0, 3);
  const top = featured[0]!;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="bg-hero absolute inset-0" aria-hidden />
        <div className="bg-grid absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-2">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Badge variant="primary" className="mb-5">
              <Sparkles /> Summer 2026 placement cycle is open
            </Badge>
            <h1 className="text-4xl font-semibold leading-[1.05] md:text-6xl">
              Find the track that fits.{" "}
              <span className="text-gradient">Land the role that matters.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              HuntYourTrack connects Damanhour University students with faculty-endorsed internships
              across Engineering, Computer Science and Business — ranked by how well each one fits you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/explore">
                  Explore opportunities <ArrowRight />
                </Link>
              </Button>
              {role === "guest" ? (
                <Button variant="outline" size="lg" onClick={() => setOpen(true)}>
                  Sign in
                </Button>
              ) : (
                <Button asChild variant="outline" size="lg">
                  <Link to={ROLE_META[role].home}>Go to {ROLE_META[role].label.toLowerCase()} workspace</Link>
                </Button>
              )}
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-2xl font-semibold">{s.value}</dd>
                  <dd className="text-xs text-muted-foreground">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Product preview */}
          <div className="relative hidden lg:block" aria-hidden>
            {/* Orbit rings */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="orbit-spin relative h-[620px] w-[620px] rounded-full border border-border">
                <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground shadow-glow" />
              </div>
              <div className="absolute inset-[90px] rounded-full border border-dashed border-border [animation-direction:reverse] orbit-spin">
                <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-muted-foreground" />
              </div>
              <div className="absolute inset-[240px] rounded-full bg-foreground/5 blur-3xl" />
            </div>
            <div className="panel relative p-6 shadow-glow">
              <div className="flex items-center gap-4">
                <img src={top.logo} alt="" className="h-12 w-12 rounded-xl bg-foreground object-contain" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{top.company}</p>
                  <p className="font-display text-lg font-semibold">{top.title}</p>
                </div>
                <MatchRing value={top.match} size={64} />
              </div>
              <div className="mt-5 space-y-3">
                {[
                  ["Course alignment", 96],
                  ["Skill overlap", 89],
                  ["Résumé keywords", 84],
                ].map(([label, v]) => (
                  <div key={label as string}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="text-success">{v}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary">
                      <div className="bg-gradient-silver h-full rounded-full" style={{ width: `${v}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="panel absolute -bottom-8 -left-8 w-60 p-4">
              <p className="eyebrow">Application status</p>
              <div className="mt-3 flex items-center gap-2">
                {["Submitted", "Review", "Interview"].map((s, i) => (
                  <div key={s} className="flex-1">
                    <div className={`h-1.5 rounded-full ${i < 3 ? "bg-primary" : "bg-secondary"}`} />
                    <p className="mt-1 text-[10px] text-muted-foreground">{s}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="panel absolute -right-4 -top-6 flex items-center gap-2 px-3 py-2">
              <BadgeCheck className="h-4 w-4 text-success" />
              <span className="text-xs">Faculty-endorsed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">Why HuntYourTrack</p>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Built for students, trusted by faculty.</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_PROPS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="panel p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
                <Icon className="h-5 w-5 text-primary-foreground" aria-hidden />
              </span>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tracks */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Featured endorsed tracks</p>
              <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Every faculty, one place.</h2>
              <p className="mt-2 text-muted-foreground">
                Tracks are curated with each faculty so placements count toward your degree milestones.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/career-radar">Open Career Radar <Radar /></Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FIELD_TRACKS.map((t) => (
              <TrackCard key={t.id} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured roles */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Highest match this week</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Featured opportunities</h2>
          </div>
          <Button asChild variant="ghost">
            <Link to="/explore">View all roles <ArrowRight /></Link>
          </Button>
        </div>
        <div className="mt-8">
          <OpportunityGrid items={featured} className="md:grid-cols-2 lg:grid-cols-3" />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 md:p-14">
          <div className="bg-hero absolute inset-0" aria-hidden />
          <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold">Ready to hunt your track?</h2>
              <p className="mt-2 text-muted-foreground">
                Sign in with your university account to unlock match scores, saved roles and
                application tracking.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="hero" size="lg" onClick={() => setOpen(true)}>Sign in</Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/explore">Browse first</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
