import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bookmark,
  CalendarClock,
  Check,
  CheckCircle2,
  Clock,
  FileText,
  MapPin,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { MatchRing } from "@/components/kit";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { formatDate, TRACK_LABEL, TYPE_LABEL, type Opportunity } from "@/lib/opportunities";
import { STUDENT } from "@/lib/platform-data";
import { useApplied, useRole, useSaved, useSignInDialog } from "@/lib/saved-store";
import { cn } from "@/lib/utils";

function SkillTags({ skills }: { skills: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {skills.map((s) => (
        <span key={s} className="rounded-md border border-border bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
          {s}
        </span>
      ))}
    </div>
  );
}

function Fact({ icon: Icon, label, value }: { icon: typeof Wallet; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/40 p-3">
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5" aria-hidden /> {label}
      </p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}

function List({ title, items, tone }: { title: string; items: string[]; tone: "primary" | "success" }) {
  return (
    <div>
      <h4 className="eyebrow mb-2">{title}</h4>
      <ul className="space-y-1.5">
        {items.map((i) => (
          <li key={i} className="flex gap-2 text-sm text-foreground/90">
            <CheckCircle2
              className={cn("mt-0.5 h-4 w-4 shrink-0", tone === "success" ? "text-success" : "text-primary")}
              aria-hidden
            />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Multi-step application flow with a success state. */
function ApplyDialog({
  o,
  open,
  onOpenChange,
}: {
  o: Opportunity;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const applied = useApplied();
  const { role } = useRole();
  const { setOpen: setSignIn } = useSignInDialog();
  const [step, setStep] = useState<1 | 2 | "done">(1);
  const [note, setNote] = useState("");
  const alreadyApplied = applied.ids.includes(o.id);

  const close = (v: boolean) => {
    onOpenChange(v);
    if (!v) setTimeout(() => setStep(1), 200);
  };

  const submit = () => {
    applied.add(o.id);
    setStep("done");
    toast.success("Application submitted", { description: `${o.title} · ${o.company}` });
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="max-w-md border-border bg-popover">
        {role !== "student" ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-display">Sign in to apply</DialogTitle>
              <DialogDescription>
                Applications are submitted from a student account so your match score and résumé are
                attached automatically.
              </DialogDescription>
            </DialogHeader>
            <Button
              variant="hero"
              onClick={() => {
                close(false);
                setSignIn(true);
              }}
            >
              Sign in
            </Button>
          </>
        ) : step === "done" || (alreadyApplied && step !== 2) ? (
          <div className="flex flex-col items-center py-4 text-center">
            <span className="flex h-16 w-16 animate-in zoom-in-50 items-center justify-center rounded-full bg-success-soft text-success duration-300">
              <CheckCircle2 className="h-9 w-9" aria-hidden />
            </span>
            <DialogTitle className="mt-4 font-display text-xl">Application submitted</DialogTitle>
            <DialogDescription className="mt-1">
              {o.company} will review your profile. You'll see status updates on your dashboard.
            </DialogDescription>
            <div className="mt-5 w-full rounded-xl border border-border bg-card p-4 text-left text-sm">
              <p className="font-medium">{o.title}</p>
              <p className="text-muted-foreground">{o.company}</p>
              <div className="mt-3 flex items-center justify-between">
                <Badge variant="success">{o.match}% match</Badge>
                <span className="text-xs text-muted-foreground">Decision by {formatDate(o.closes)}</span>
              </div>
            </div>
            <div className="mt-5 flex w-full gap-2">
              <Button variant="outline" className="flex-1" onClick={() => close(false)}>
                Keep exploring
              </Button>
              <Button asChild variant="hero" className="flex-1">
                <Link to="/dashboard" onClick={() => close(false)}>
                  Track status <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <p className="eyebrow">Step {step} of 2</p>
              <DialogTitle className="font-display text-xl">Apply — {o.title}</DialogTitle>
              <DialogDescription>{o.company} · {o.location}</DialogDescription>
            </DialogHeader>
            <div className="flex gap-1.5">
              <span className="h-1 flex-1 rounded-full bg-primary" />
              <span className={cn("h-1 flex-1 rounded-full", step === 2 ? "bg-primary" : "bg-secondary")} />
            </div>
            {step === 1 ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                  <MatchRing value={o.match} size={48} />
                  <div className="text-sm">
                    <p className="font-medium">{STUDENT.name}</p>
                    <p className="text-muted-foreground">{STUDENT.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 text-sm">
                  <FileText className="h-5 w-5 text-primary" aria-hidden />
                  <div className="flex-1">
                    <p className="font-medium">Mariam_Hassan_CV_2026.pdf</p>
                    <p className="text-xs text-muted-foreground">Résumé score {STUDENT.resumeScore}/100</p>
                  </div>
                  <Badge variant="success"><Check /> Attached</Badge>
                </div>
                <Button variant="hero" className="w-full" onClick={() => setStep(2)}>
                  Continue
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <label className="block text-sm font-medium" htmlFor={`note-${o.id}`}>
                  Why are you a good fit? <span className="text-muted-foreground">(optional)</span>
                </label>
                <Textarea
                  id={`note-${o.id}`}
                  rows={4}
                  value={note}
                  maxLength={600}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Share a project or experience relevant to this role…"
                  className="border-input bg-card"
                />
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button variant="hero" className="flex-1" onClick={submit}>
                    Submit application
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function OpportunityDetails({
  o,
  open,
  onOpenChange,
  onApply,
}: {
  o: Opportunity;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onApply: () => void;
}) {
  const saved = useSaved();
  const applied = useApplied();
  const isSaved = saved.ids.includes(o.id);
  const isApplied = applied.ids.includes(o.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-border bg-popover p-0">
        <div className="bg-hero border-b border-border p-6">
          <DialogHeader className="space-y-0">
            <div className="flex items-start gap-4">
              <img src={o.logo} alt="" className="h-14 w-14 rounded-xl border border-border bg-foreground object-contain" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-muted-foreground">{o.company}</p>
                <DialogTitle className="mt-0.5 font-display text-2xl leading-tight">{o.title}</DialogTitle>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" aria-hidden /> {o.location}
                </p>
              </div>
              <MatchRing value={o.match} size={64} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="primary">{TYPE_LABEL[o.type]}</Badge>
              {o.tracks.map((t) => (
                <Badge key={t} variant="outline">{TRACK_LABEL[t]}</Badge>
              ))}
              <Badge variant="success"><Sparkles /> Faculty-endorsed</Badge>
            </div>
          </DialogHeader>
        </div>

        <div className="space-y-6 p-6">
          <DialogDescription className="text-base text-foreground/90">{o.summary}</DialogDescription>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <Fact icon={Wallet} label="Compensation" value={o.compensation} />
            <Fact icon={Clock} label="Duration" value={`${o.weeks} weeks · ${o.mode}`} />
            <Fact icon={CalendarClock} label="Starts" value={formatDate(o.startDate)} />
            <Fact icon={CalendarClock} label="Applications close" value={formatDate(o.closes)} />
            <Fact icon={Users} label="Openings" value={`${o.openings} seats · ${o.applicants} applied`} />
            <Fact icon={Users} label="Mentor" value={o.mentor} />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <List title="What you'll do" items={o.responsibilities} tone="primary" />
            <List title="What we look for" items={o.requirements} tone="primary" />
          </div>
          <List title="Benefits" items={o.benefits} tone="success" />

          <div>
            <h4 className="eyebrow mb-2">Tech stack</h4>
            <SkillTags skills={o.skills} />
          </div>
        </div>

        <div className="sticky bottom-0 flex flex-wrap items-center justify-end gap-2 border-t border-border bg-popover/95 p-4 backdrop-blur">
          <Button variant="outline" onClick={() => saved.toggle(o.id)} aria-pressed={isSaved}>
            <Bookmark className={cn(isSaved && "fill-current text-primary")} aria-hidden />
            {isSaved ? "Saved" : "Save"}
          </Button>
          <Button variant={isApplied ? "success-soft" : "hero"} onClick={onApply}>
            {isApplied ? <><Check aria-hidden /> Applied</> : "Apply now"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function OpportunityCard({ o }: { o: Opportunity }) {
  const saved = useSaved();
  const applied = useApplied();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const isSaved = saved.ids.includes(o.id);
  const isApplied = applied.ids.includes(o.id);

  const toggleSave = () => {
    saved.toggle(o.id);
    toast(isSaved ? "Removed from Saved" : "Saved for later", { description: o.title });
  };

  return (
    <article className="group panel flex flex-col gap-4 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <img src={o.logo} alt={o.company} className="h-11 w-11 rounded-lg border border-border bg-foreground object-contain" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{o.company}</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" aria-hidden /> {o.location}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={cn("shrink-0", isSaved && "text-primary")}
          aria-label={`${isSaved ? "Unsave" : "Save"} ${o.title}`}
          aria-pressed={isSaved}
          onClick={toggleSave}
        >
          <Bookmark className={cn(isSaved && "fill-current")} aria-hidden />
        </Button>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="success"><Sparkles /> {o.match}% match</Badge>
          <Badge variant="outline">{TYPE_LABEL[o.type]}</Badge>
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-snug">{o.title}</h3>
      </div>

      <dl className="grid grid-cols-3 gap-2 rounded-lg bg-background/50 p-3 text-xs">
        <div>
          <dt className="text-muted-foreground">Compensation</dt>
          <dd className="mt-1 font-medium">{o.compensation}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Duration</dt>
          <dd className="mt-1 font-medium">{o.weeks} Weeks</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Format</dt>
          <dd className="mt-1 font-medium">{o.mode}</dd>
        </div>
      </dl>

      <SkillTags skills={o.skills} />

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <CalendarClock className="h-3.5 w-3.5" aria-hidden /> Closes {formatDate(o.closes)}
        </span>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setDetailsOpen(true)}>
            Details
          </Button>
          <Button size="sm" variant={isApplied ? "success-soft" : "default"} onClick={() => setApplyOpen(true)}>
            {isApplied ? <><Check aria-hidden /> Applied</> : "Apply"}
          </Button>
        </div>
      </div>

      <OpportunityDetails
        o={o}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onApply={() => {
          setDetailsOpen(false);
          setApplyOpen(true);
        }}
      />
      <ApplyDialog o={o} open={applyOpen} onOpenChange={setApplyOpen} />
    </article>
  );
}

export function OpportunityGrid({
  items,
  className = "sm:grid-cols-2",
}: {
  items: Opportunity[];
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-4", className)}>
      {items.map((o) => (
        <OpportunityCard key={o.id} o={o} />
      ))}
    </div>
  );
}
