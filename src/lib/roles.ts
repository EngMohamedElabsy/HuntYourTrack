export type Role = "guest" | "student" | "mentor" | "admin";

export type AppPath =
  | "/"
  | "/explore"
  | "/career-radar"
  | "/dashboard"
  | "/saved"
  | "/my-profile"
  | "/mentor"
  | "/admin";

export interface NavItem {
  to: AppPath;
  label: string;
}

export const ROLES: Role[] = ["guest", "student", "mentor", "admin"];

export const ROLE_META: Record<
  Role,
  { label: string; title: string; description: string; home: AppPath }
> = {
  guest: {
    label: "Guest",
    title: "Browsing as guest",
    description: "Explore public opportunities and tracks.",
    home: "/",
  },
  student: {
    label: "Student",
    title: "Mariam Hassan",
    description: "Track applications, match scores and saved roles.",
    home: "/dashboard",
  },
  mentor: {
    label: "Mentor",
    title: "Eng. Karim Mostafa",
    description: "Review interns, evaluate submissions, see analytics.",
    home: "/mentor",
  },
  admin: {
    label: "Admin",
    title: "Placement Office",
    description: "Manage users, approve listings, monitor the system.",
    home: "/admin",
  },
};

export const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  guest: [
    { to: "/", label: "Home" },
    { to: "/explore", label: "Explore" },
    { to: "/career-radar", label: "Career Radar" },
  ],
  student: [
    { to: "/", label: "Home" },
    { to: "/explore", label: "Explore" },
    { to: "/career-radar", label: "Career Radar" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/saved", label: "Saved" },
    { to: "/my-profile", label: "My Profile" },
  ],
  mentor: [
    { to: "/", label: "Home" },
    { to: "/explore", label: "Explore" },
    { to: "/career-radar", label: "Career Radar" },
    { to: "/mentor", label: "Mentor Dashboard" },
  ],
  admin: [
    { to: "/", label: "Home" },
    { to: "/explore", label: "Explore" },
    { to: "/career-radar", label: "Career Radar" },
    { to: "/admin", label: "Admin Console" },
  ],
};

/** Which roles may open a workspace page. Pages not listed are public. */
export const PAGE_ACCESS: Partial<Record<AppPath, Role>> = {
  "/dashboard": "student",
  "/saved": "student",
  "/my-profile": "student",
  "/mentor": "mentor",
  "/admin": "admin",
};

export function canAccess(role: Role, path: AppPath) {
  const required = PAGE_ACCESS[path];
  return !required || required === role;
}
