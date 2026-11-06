import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpDown, MapPin, Search, SearchX, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

import { EmptyState, Page, PageHeader } from "@/components/kit";
import { OpportunityGrid } from "@/components/opportunity-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  countByType,
  DEFAULT_FILTERS,
  filterOpportunities,
  OPPORTUNITIES,
  TRACK_LABEL,
  type City,
  type CompModel,
  type DurationBand,
  type Filters,
  type OpportunityType,
  type SortKey,
  type Standing,
  type Track,
} from "@/lib/opportunities";
import { cn } from "@/lib/utils";

const TRACK_VALUES: Track[] = ["cs-ai", "engineering", "bi"];

export const Route = createFileRoute("/explore")({
  validateSearch: (search: Record<string, unknown>): { track?: Track } => {
    const t = search["track"];
    return typeof t === "string" && (TRACK_VALUES as string[]).includes(t) ? { track: t as Track } : {};
  },
  head: () => ({
    meta: [
      { title: "Explore Opportunities — HuntYourTrack" },
      {
        name: "description",
        content: "Browse faculty-endorsed internships, fellowships and entry-level roles with live match scores.",
      },
      { property: "og:title", content: "Explore Opportunities — HuntYourTrack" },
      {
        property: "og:description",
        content: "Browse faculty-endorsed internships, fellowships and entry-level roles with live match scores.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ExplorePage,
});

const TYPE_OPTIONS: { value: OpportunityType; label: string }[] = [
  { value: "internship", label: "Summer Internship" },
  { value: "fellowship", label: "Training Fellowship" },
  { value: "junior", label: "Full-time Junior" },
];
const DURATIONS: { value: DurationBand; label: string }[] = [
  { value: "short", label: "4 – 8 weeks" },
  { value: "standard", label: "8 – 12 weeks" },
  { value: "coop", label: "3+ months" },
];
const COMP: { value: CompModel; label: string }[] = [
  { value: "paid", label: "Paid stipend" },
  { value: "free", label: "Free certified program" },
  { value: "credits", label: "Academic credits" },
];
const STANDING: { value: Standing; label: string }[] = [
  { value: "foundation", label: "1st / 2nd year" },
  { value: "senior", label: "3rd / 4th year" },
  { value: "graduate", label: "Recent graduate" },
];
const CITIES: { value: City; label: string }[] = [
  { value: "alexandria", label: "Alexandria" },
  { value: "cairo", label: "Cairo" },
  { value: "giza", label: "Giza" },
  { value: "remote", label: "Fully remote" },
];
const KEYWORDS = ["React", "Python", "C++", "Docker", "AWS", "SQL"];

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

const field =
  "h-10 w-full rounded-lg border border-input bg-card text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-2 border-t border-border pt-4">
      <p className="eyebrow">{title}</p>
      {children}
    </div>
  );
}

function Check({
  label,
  checked,
  onChange,
  count,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  count?: number;
}) {
  return (
    <label className="group flex cursor-pointer items-center justify-between py-1">
      <span className="flex items-center gap-2.5">
        <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 cursor-pointer accent-primary" />
        <span className={cn("text-sm transition-colors group-hover:text-foreground", checked ? "text-foreground" : "text-muted-foreground")}>
          {label}
        </span>
      </span>
      {count !== undefined && (
        <span className="rounded-md bg-secondary px-1.5 text-xs text-muted-foreground">{count}</span>
      )}
    </label>
  );
}

type SetFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => void;

function FilterPanel({ f, set }: { f: Filters; set: SetFilter }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <p className="eyebrow">Opportunity type</p>
        {TYPE_OPTIONS.map((t) => (
          <Check
            key={t.value}
            label={t.label}
            checked={f.types.includes(t.value)}
            onChange={() => set("types", toggle(f.types, t.value))}
            count={countByType(OPPORTUNITIES, t.value)}
          />
        ))}
      </div>
      <Group title="Work mode">
        <div className="grid grid-cols-3 gap-1 rounded-lg bg-background/60 p-1">
          {(["all", "Hybrid", "Remote"] as const).map((m) => (
            <Button key={m} size="xs" variant={f.mode === m ? "chip-active" : "ghost"} aria-pressed={f.mode === m} onClick={() => set("mode", m)}>
              {m === "all" ? "All" : m}
            </Button>
          ))}
        </div>
      </Group>
      <Group title="Program duration">
        {DURATIONS.map((d) => (
          <Check key={d.value} label={d.label} checked={f.durations.includes(d.value)} onChange={() => set("durations", toggle(f.durations, d.value))} />
        ))}
      </Group>
      <Group title="Compensation">
        {COMP.map((c) => (
          <Check key={c.value} label={c.label} checked={f.compModels.includes(c.value)} onChange={() => set("compModels", toggle(f.compModels, c.value))} />
        ))}
      </Group>
      <Group title="Academic standing">
        {STANDING.map((s) => (
          <Check key={s.value} label={s.label} checked={f.standings.includes(s.value)} onChange={() => set("standings", toggle(f.standings, s.value))} />
        ))}
      </Group>
      <Group title="Technical keywords">
        <div className="flex flex-wrap gap-1.5">
          {KEYWORDS.map((k) => {
            const active = f.keywords.includes(k);
            return (
              <Button key={k} size="xs" variant={active ? "chip-active" : "chip"} aria-pressed={active} onClick={() => set("keywords", toggle(f.keywords, k))}>
                {k}
              </Button>
            );
          })}
        </div>
      </Group>
    </div>
  );
}

function activeChips(f: Filters, set: SetFilter) {
  const chips: { label: string; clear: () => void }[] = [];
  if (f.query) chips.push({ label: `"${f.query}"`, clear: () => set("query", "") });
  if (f.city) chips.push({ label: CITIES.find((c) => c.value === f.city)!.label, clear: () => set("city", "") });
  if (f.track !== "all") chips.push({ label: TRACK_LABEL[f.track], clear: () => set("track", "all") });
  if (f.mode !== "all") chips.push({ label: f.mode, clear: () => set("mode", "all") });
  f.types.forEach((t) => chips.push({ label: TYPE_OPTIONS.find((o) => o.value === t)!.label, clear: () => set("types", f.types.filter((x) => x !== t)) }));
  f.durations.forEach((d) => chips.push({ label: DURATIONS.find((o) => o.value === d)!.label, clear: () => set("durations", f.durations.filter((x) => x !== d)) }));
  f.compModels.forEach((c) => chips.push({ label: COMP.find((o) => o.value === c)!.label, clear: () => set("compModels", f.compModels.filter((x) => x !== c)) }));
  f.standings.forEach((s) => chips.push({ label: STANDING.find((o) => o.value === s)!.label, clear: () => set("standings", f.standings.filter((x) => x !== s)) }));
  f.keywords.forEach((k) => chips.push({ label: k, clear: () => set("keywords", f.keywords.filter((x) => x !== k)) }));
  return chips;
}

function ExplorePage() {
  const search = Route.useSearch();
  const [f, setF] = useState<Filters>({ ...DEFAULT_FILTERS, track: search.track ?? "all" });
  const set: SetFilter = (key, value) => setF((prev) => ({ ...prev, [key]: value }));
  const reset = () => setF(DEFAULT_FILTERS);

  const results = useMemo(() => filterOpportunities(OPPORTUNITIES, f), [f]);
  const chips = activeChips(f, set);
  const sidebarCount = chips.length - (f.query ? 1 : 0) - (f.city ? 1 : 0) - (f.track !== "all" ? 1 : 0);

  return (
    <>
      <div className="relative overflow-hidden border-b border-border">
        <div className="bg-hero absolute inset-0" aria-hidden />
        <div className="bg-grid absolute inset-0" aria-hidden />
        <Page className="relative pb-8">
          <PageHeader
            eyebrow="Academic Year 2025/2026 · Summer placement cycle"
            title={<>Explore <span className="text-gradient">opportunities</span></>}
            description="Faculty-endorsed placements, fellowships and traineeships — ranked by how well they fit your track."
            actions={
              <div className="flex gap-2">
                <div className="panel px-4 py-2.5">
                  <p className="eyebrow">Open roles</p>
                  <p className="font-display text-xl font-semibold">{OPPORTUNITIES.length}</p>
                </div>
                <div className="panel px-4 py-2.5">
                  <p className="eyebrow">Avg. fit</p>
                  <p className="font-display text-xl font-semibold text-success">94%</p>
                </div>
              </div>
            }
          />

          <div className="panel mt-6 flex flex-col gap-3 p-3">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
              <div className="relative md:col-span-6">
                <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  aria-label="Search opportunities"
                  placeholder="Search title, tech stack or company…"
                  value={f.query}
                  onChange={(e) => set("query", e.target.value)}
                  className={`${field} pl-9 pr-3`}
                />
              </div>
              <div className="relative md:col-span-3">
                <MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <select aria-label="Location" value={f.city} onChange={(e) => set("city", e.target.value as City | "")} className={`${field} cursor-pointer appearance-none pl-9 pr-3`}>
                  <option value="">All locations</option>
                  {CITIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div className="relative md:col-span-3">
                <ArrowUpDown className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <select aria-label="Sort" value={f.sort} onChange={(e) => set("sort", e.target.value as SortKey)} className={`${field} cursor-pointer appearance-none pl-9 pr-3`}>
                  <option value="original">Sort: Featured</option>
                  <option value="match">Sort: Best match</option>
                  <option value="deadline">Sort: Closing soon</option>
                  <option value="newest">Sort: Newest</option>
                  <option value="stipend">Sort: Highest stipend</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="eyebrow mr-1">Track</span>
              <Button size="xs" variant={f.track === "all" ? "chip-active" : "chip"} aria-pressed={f.track === "all"} onClick={() => set("track", "all")}>
                All tracks
              </Button>
              {TRACK_VALUES.map((t) => (
                <Button key={t} size="xs" variant={f.track === t ? "chip-active" : "chip"} aria-pressed={f.track === t} onClick={() => set("track", f.track === t ? "all" : t)}>
                  {TRACK_LABEL[t]}
                </Button>
              ))}
            </div>
          </div>
        </Page>
      </div>

      <Page>
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12">
          <aside className="panel hidden p-5 md:sticky md:top-20 md:col-span-4 md:block lg:col-span-3" aria-label="Filters">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-base font-semibold">
                <SlidersHorizontal className="h-4 w-4 text-primary" aria-hidden /> Filters
              </h2>
              <Button variant="link" size="sm" onClick={reset}>Reset</Button>
            </div>
            <FilterPanel f={f} set={set} />
          </aside>

          <section aria-label="Opportunity results" className="flex flex-col gap-4 md:col-span-8 lg:col-span-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{results.length}</span> of{" "}
                <span className="font-semibold text-foreground">{OPPORTUNITIES.length}</span> positions
              </p>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden">
                    <SlidersHorizontal /> Filters
                    {sidebarCount > 0 && <Badge variant="primary">{sidebarCount}</Badge>}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto border-border bg-card">
                  <SheetHeader>
                    <SheetTitle className="text-left">Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">
                    <FilterPanel f={f} set={set} />
                    <p className="mt-6 text-sm text-muted-foreground">
                      {results.length} matching positions
                    </p>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {chips.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                {chips.map((c) => (
                  <button key={c.label} type="button" onClick={c.clear} className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary-soft px-2.5 py-1 text-xs text-primary hover:bg-primary/25">
                    {c.label} <X className="h-3 w-3" aria-label="Remove filter" />
                  </button>
                ))}
                <Button variant="link" size="sm" onClick={reset}>Clear all</Button>
              </div>
            )}

            {results.length ? (
              <OpportunityGrid items={results} className="lg:grid-cols-2" />
            ) : (
              <EmptyState
                icon={SearchX}
                title="No positions match these filters"
                description="Try removing a filter or broadening your search."
                action={<Button variant="outline" size="sm" onClick={reset}>Reset filters</Button>}
              />
            )}
          </section>
        </div>
      </Page>
    </>
  );
}
