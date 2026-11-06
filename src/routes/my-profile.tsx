import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Mail, MapPin, Pencil, Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import profileAvatar from "@/assets/profile-avatar.jpg.asset.json";
import { MatchRing, Meter, Page, Panel } from "@/components/kit";
import { RoleGate } from "@/components/role-access";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RESUME_METRICS, STUDENT } from "@/lib/platform-data";

export const Route = createFileRoute("/my-profile")({
  head: () => ({
    meta: [
      { title: "My Profile — HuntYourTrack" },
      { name: "description", content: "Your academic profile, skills, résumé score and placement preferences." },
      { property: "og:title", content: "My Profile — HuntYourTrack" },
      { property: "og:description", content: "Your academic profile, skills, résumé score and placement preferences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <RoleGate role="student">
      <ProfilePage />
    </RoleGate>
  ),
});

const PREFS = ["Hybrid", "Remote", "Paid stipend", "Summer 2026", "Cairo / Giza", "Alexandria"];

function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [about, setAbout] = useState(STUDENT.about);
  const [draft, setDraft] = useState(STUDENT.about);
  const [skills, setSkills] = useState(STUDENT.skills);
  const [newSkill, setNewSkill] = useState("");
  const [prefs, setPrefs] = useState<string[]>(["Hybrid", "Paid stipend", "Summer 2026"]);

  const addSkill = () => {
    const s = newSkill.trim();
    if (!s || skills.some((x) => x.toLowerCase() === s.toLowerCase())) return;
    setSkills([...skills, s]);
    setNewSkill("");
    toast.success("Skill added", { description: `${s} will be used in match scores.` });
  };

  return (
    <Page>
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
        <div className="bg-hero h-28" aria-hidden />
        <div className="flex flex-col gap-4 px-6 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="-mt-12 flex items-end gap-4">
            <img src={profileAvatar.url} alt={STUDENT.name} className="h-24 w-24 rounded-2xl border-4 border-card object-cover" />
            <div className="pb-1">
              <h1 className="text-2xl font-semibold">{STUDENT.name}</h1>
              <p className="text-sm text-muted-foreground">{STUDENT.year}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><GraduationCap className="h-4 w-4" /> GPA {STUDENT.gpa}</span>
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {STUDENT.location}</span>
            <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> {STUDENT.email}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Panel
            title="About"
            action={
              !editing && (
                <Button variant="ghost" size="sm" onClick={() => { setDraft(about); setEditing(true); }}>
                  <Pencil /> Edit
                </Button>
              )
            }
          >
            {editing ? (
              <div className="space-y-3">
                <Textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={4} maxLength={500} className="border-input bg-background/50" />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => setEditing(false)}>Cancel</Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setAbout(draft.trim() || about);
                      setEditing(false);
                      toast.success("Profile updated");
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-foreground/90">{about}</p>
            )}
          </Panel>

          <Panel title="Skills" description="Used to calculate your match score on every listing">
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="inline-flex items-center gap-1 rounded-lg border border-primary/30 bg-primary-soft px-2.5 py-1 text-sm text-primary">
                  {s}
                  <button type="button" aria-label={`Remove ${s}`} onClick={() => setSkills(skills.filter((x) => x !== s))} className="rounded hover:text-foreground">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
            <form className="mt-4 flex gap-2" onSubmit={(e) => { e.preventDefault(); addSkill(); }}>
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                maxLength={40}
                placeholder="Add a skill, e.g. Kubernetes"
                aria-label="New skill"
                className="h-9 flex-1 rounded-lg border border-input bg-background/50 px-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <Button type="submit" variant="outline" size="default"><Plus /> Add</Button>
            </form>
          </Panel>

          <Panel title="Placement preferences" description="We'll prioritise roles that match these">
            <div className="flex flex-wrap gap-2">
              {PREFS.map((p) => {
                const on = prefs.includes(p);
                return (
                  <Button key={p} size="sm" variant={on ? "chip-active" : "chip"} aria-pressed={on} onClick={() => setPrefs(on ? prefs.filter((x) => x !== p) : [...prefs, p])}>
                    {p}
                  </Button>
                );
              })}
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Résumé score">
            <div className="flex items-center gap-4">
              <MatchRing value={STUDENT.resumeScore} size={80} />
              <div className="text-sm">
                <p className="font-medium">Mariam_Hassan_CV_2026.pdf</p>
                <p className="text-muted-foreground">Updated 12 days ago</p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {RESUME_METRICS.map((m) => (
                <div key={m.label}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-muted-foreground">{m.label}</span>
                    <span>{m.value}%</span>
                  </div>
                  <Meter value={m.value} tone={m.value >= 80 ? "success" : "primary"} />
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Interests">
            <div className="flex flex-wrap gap-2">
              {STUDENT.interests.map((i) => (
                <Badge key={i} variant="success">{i}</Badge>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </Page>
  );
}
