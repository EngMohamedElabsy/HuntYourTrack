import { useNavigate } from "@tanstack/react-router";
import { GraduationCap, Lock, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ROLE_META, type Role } from "@/lib/roles";
import { useHydrated, useRole, useSignInDialog } from "@/lib/saved-store";
import { cn } from "@/lib/utils";

const ROLE_ICON: Record<Exclude<Role, "guest">, LucideIcon> = {
  student: GraduationCap,
  mentor: Users,
  admin: ShieldCheck,
};

/** Switch role and land on that role's home page. */
export function useSwitchRole() {
  const { setRole } = useRole();
  const navigate = useNavigate();
  return (role: Role, opts: { navigate?: boolean } = { navigate: true }) => {
    setRole(role);
    if (opts.navigate !== false) navigate({ to: ROLE_META[role].home });
    toast.success(role === "guest" ? "Signed out" : `Signed in as ${ROLE_META[role].label}`, {
      description: ROLE_META[role].title,
    });
  };
}

export function SignInDialog() {
  const { open, setOpen } = useSignInDialog();
  const switchRole = useSwitchRole();
  const { role } = useRole();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md border-border bg-popover">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Sign in to HuntYourTrack</DialogTitle>
          <DialogDescription>
            Choose a demo account to preview each workspace.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          {(["student", "mentor", "admin"] as const).map((r) => {
            const Icon = ROLE_ICON[r];
            const meta = ROLE_META[r];
            return (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setOpen(false);
                  switchRole(r);
                }}
                className={cn(
                  "flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/50 hover:bg-accent",
                  role === r && "border-primary/60 bg-primary-soft",
                )}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="flex-1">
                  <span className="block font-medium">
                    {meta.label} <span className="text-muted-foreground">· {meta.title}</span>
                  </span>
                  <span className="block text-xs text-muted-foreground">{meta.description}</span>
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-center text-xs text-muted-foreground">
          University single sign-on will replace demo accounts.
        </p>
      </DialogContent>
    </Dialog>
  );
}

/** Renders children only for the required role; otherwise offers to switch. */
export function RoleGate({ role: required, children }: { role: Exclude<Role, "guest">; children: ReactNode }) {
  const { role } = useRole();
  const hydrated = useHydrated();
  const switchRole = useSwitchRole();

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="h-10 w-64 animate-pulse rounded-lg bg-secondary" />
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl bg-card" />
          ))}
        </div>
      </div>
    );
  }

  if (role === required) return <>{children}</>;

  const Icon = ROLE_ICON[required];
  const meta = ROLE_META[required];
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center">
      <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
        <Icon className="h-6 w-6" aria-hidden />
        <Lock className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-background p-0.5 text-muted-foreground" />
      </span>
      <h1 className="mt-5 text-2xl font-semibold">{meta.label} workspace</h1>
      <p className="mt-2 text-muted-foreground">
        This page is for {meta.label.toLowerCase()} accounts. {meta.description}
      </p>
      <Button variant="hero" className="mt-6" onClick={() => switchRole(required, { navigate: false })}>
        Continue as {meta.label}
      </Button>
    </div>
  );
}
