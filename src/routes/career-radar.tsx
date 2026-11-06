import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Flame, Radar, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { chartTheme, Meter, Page, PageHeader, Panel, StatCard } from "@/components/kit";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FIELD_TRACKS, SKILL_DEMAND, STUDENT } from "@/lib/platform-data";
import { useRole } from "@/lib/saved-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/career-radar")({
  head: () => ({
    meta: [
      { title: "Career Radar — HuntYourTrack" },
      { name: "description", content: "Demand, growth and top skills for every endorsed career track across faculties." },
      { property: "og:title", content: "Career Radar — HuntYourTrack" },
      { property: "og:description", content: "Demand, growth and top skills for every endorsed career track across faculties." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CareerRadar,
});

function CareerRadar() {
  const [selected, setSelected] = useState(FIELD_TRACKS[0]!.id);
  const track = FIELD_TRACKS.find((t) => t.id === selected)!;
  const { role } = useRole();
  const totalOpenings = FIELD_TRACKS.reduce((s, t) => s + t.openings, 0);
  const owned = STUDENT.skills.map((s) => s.toLowerCase());

  return (
    <Page>
      <PageHeader
        eyebrow="Market intelligence"
        title={<>Career <span className="text-gradient">Radar</span></>}
        description="Where demand is heading across every faculty track — updated weekly from partner listings."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard icon={Radar} label="Tracked tracks" value={FIELD_TRACKS.length} hint="Across 6 fields" />
        <StatCard icon={Flame} label="Open positions" value={totalOpenings} hint="This placement cycle" tone="warning" />
        <StatCard icon={TrendingUp} label="Fastest growing" value="+28%" hint="Computers & AI, year over year" tone="success" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <Panel title="Tracks" description="Select a track to inspect" className="lg:col-span-2">
          <div className="space-y-2">
            {FIELD_TRACKS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelected(t.id)}
                className={cn(
                  "w-full rounded-xl border p-3 text-left transition-colors",
                  t.id === selected ? "border-primary/50 bg-primary-soft" : "border-border hover:bg-accent",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{t.name}</span>
                  <Badge variant={t.growth >= 20 ? "success" : "outline"}>+{t.growth}%</Badge>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <Meter value={t.demand} className="flex-1" />
                  <span className="w-16 text-right text-xs text-muted-foreground">Demand {t.demand}</span>
                </div>
              </button>
            ))}
          </div>
        </Panel>

        <div className="space-y-6 lg:col-span-3">
          <Panel
            title={track.name}
            description={track.description}
            action={<Badge variant="primary">{track.field}</Badge>}
          >
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-background/50 p-3">
                <p className="text-xs text-muted-foreground">Openings</p>
                <p className="font-display text-2xl font-semibold">{track.openings}</p>
              </div>
              <div className="rounded-lg bg-background/50 p-3">
                <p className="text-xs text-muted-foreground">Avg. fit</p>
                <p className="font-display text-2xl font-semibold text-success">{track.avgMatch}%</p>
              </div>
              <div className="rounded-lg bg-background/50 p-3">
                <p className="text-xs text-muted-foreground">Growth</p>
                <p className="font-display text-2xl font-semibold">+{track.growth}%</p>
              </div>
            </div>
            <p className="eyebrow mb-2 mt-5">Top skills employers ask for</p>
            <div className="flex flex-wrap gap-2">
              {track.topSkills.map((s) => {
                const has = role === "student" && owned.includes(s.toLowerCase());
                return (
                  <Badge key={s} variant={has ? "success" : "outline"}>
                    {has && <BadgeCheck />} {s}
                  </Badge>
                );
              })}
            </div>
            {role === "student" && (
              <p className="mt-2 text-xs text-muted-foreground">Green skills are already on your profile.</p>
            )}
            <p className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
              <BadgeCheck className="h-3.5 w-3.5 text-success" /> Endorsed by {track.endorsedBy}
            </p>
            {track.exploreTrack && (
              <Button asChild variant="hero" size="sm" className="mt-5">
                <Link to="/explore" search={{ track: track.exploreTrack }}>
                  View open roles <ArrowRight />
                </Link>
              </Button>
            )}
          </Panel>

          <Panel title="Skill demand index" description="Share of listings requesting each skill">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SKILL_DEMAND} margin={{ left: -20, right: 8 }}>
                  <CartesianGrid stroke={chartTheme.grid} vertical={false} />
                  <XAxis dataKey="skill" stroke={chartTheme.axis} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke={chartTheme.axis} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip {...chartTheme.tooltip} />
                  <Bar dataKey="demand" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>
      </div>
    </Page>
  );
}
