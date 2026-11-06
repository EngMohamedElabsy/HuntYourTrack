import { Link } from "@tanstack/react-router";
import { Check, ChevronDown, Compass, GraduationCap, LogOut, Menu } from "lucide-react";
import { useState, type ReactNode } from "react";

import profileAvatar from "@/assets/profile-avatar.jpg.asset.json";
import { Initials } from "@/components/kit";
import { SignInDialog, useSwitchRole } from "@/components/role-access";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_BY_ROLE, ROLE_META, ROLES, type Role } from "@/lib/roles";
import { useRole, useSignInDialog } from "@/lib/saved-store";

function Brand() {
  return (
    <span className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
        <Compass className="h-4 w-4 text-primary-foreground" aria-hidden />
      </span>
      HuntYourTrack
    </span>
  );
}

function Avatar({ role }: { role: Role }) {
  if (role === "student")
    return <img src={profileAvatar.url} alt="" className="h-8 w-8 rounded-full object-cover" />;
  return <Initials name={ROLE_META[role].title} className="h-8 w-8" />;
}

function RoleMenu() {
  const { role } = useRole();
  const switchRole = useSwitchRole();
  const meta = ROLE_META[role];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-2 transition-colors hover:bg-accent"
          aria-label="Account and role menu"
        >
          <Avatar role={role} />
          <span className="hidden text-left leading-tight md:block">
            <span className="block text-xs font-medium">{meta.title}</span>
            <span className="block text-[11px] text-muted-foreground">{meta.label} view</span>
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 border-border bg-popover">
        <DropdownMenuLabel className="text-xs text-muted-foreground">Switch role view</DropdownMenuLabel>
        {ROLES.filter((r) => r !== "guest").map((r) => (
          <DropdownMenuItem key={r} onSelect={() => switchRole(r)} className="cursor-pointer">
            <span className="flex-1">
              <span className="block">{ROLE_META[r].label}</span>
              <span className="block text-xs text-muted-foreground">{ROLE_META[r].title}</span>
            </span>
            {role === r && <Check className="h-4 w-4 text-success" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => switchRole("guest")} className="cursor-pointer">
          <LogOut className="h-4 w-4" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { role } = useRole();
  const { setOpen: setSignInOpen } = useSignInDialog();
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = NAV_BY_ROLE[role];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
          <div className="flex items-center gap-6">
            <Link to="/" aria-label="HuntYourTrack home">
              <Brand />
            </Link>
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: true }}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  activeProps={{ className: "bg-primary-soft !text-primary font-medium" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {role === "guest" ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => setSignInOpen(true)}>
                  Sign in
                </Button>
                <Button asChild variant="hero" size="sm" className="hidden sm:inline-flex">
                  <Link to="/explore">Explore roles</Link>
                </Button>
              </>
            ) : (
              <RoleMenu />
            )}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 border-border bg-card">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <Brand />
                  </SheetTitle>
                </SheetHeader>
                <Badge variant="primary" className="mt-4 w-fit">
                  {ROLE_META[role].label} view
                </Badge>
                <nav className="mt-4 flex flex-col gap-1" aria-label="Mobile">
                  {nav.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      activeOptions={{ exact: true }}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                      activeProps={{ className: "bg-primary-soft !text-primary font-medium" }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-16 border-t border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <Brand />
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Career governance and academic tracking for faculty milestones and industrial
                placement.
              </p>
              <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-success">
                <GraduationCap className="h-4 w-4" aria-hidden />
                Damanhour University CS Affiliated
              </p>
            </div>
            <div>
              <h3 className="eyebrow mb-3">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/explore" className="hover:text-foreground">Explore Opportunities</Link></li>
                <li><Link to="/career-radar" className="hover:text-foreground">Career Radar</Link></li>
                <li><Link to="/dashboard" className="hover:text-foreground">Student Dashboard</Link></li>
                <li><Link to="/saved" className="hover:text-foreground">Saved Roles</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="eyebrow mb-3">Workspaces</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/mentor" className="hover:text-foreground">Mentor Dashboard</Link></li>
                <li><Link to="/admin" className="hover:text-foreground">Admin Console</Link></li>
                <li><Link to="/my-profile" className="hover:text-foreground">My Profile</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="eyebrow mb-3">Institutional Access</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Verified academic single sign-on for undergraduates, mentors and faculty advisors.
              </p>
              <Badge variant="outline" className="mt-3">Faculty Portal v3.0</Badge>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
            <p>© 2026 HuntYourTrack • Damanhour University CS. All rights reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-foreground">Academic Policy</a>
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Guidelines</a>
            </div>
          </div>
        </div>
      </footer>
      <SignInDialog />
    </div>
  );
}
