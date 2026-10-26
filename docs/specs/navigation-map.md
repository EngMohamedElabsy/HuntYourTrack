# Planned Navigation Map

This document records the current GitHub US02 (#40) navigation scope. It is a product map, not a claim that these routes or screens already exist. The checked-in frontend currently redirects `index.html` to the authentication page.

## Sitemap

```text
Public
├── Home / Landing
└── Sign In / Create Account / Password Reset
    ├── Student Dashboard
    │   ├── Profile and CV
    │   ├── Internship Matches
    │   │   └── Internship Details / Application
    │   └── Learning Roadmap
    ├── Employer Dashboard
    │   ├── My Internships
    │   │   ├── Create Internship
    │   │   └── Applicants / Candidate Review
    │   └── Applicant Details
    └── Admin Dashboard
        ├── Platform Overview
        ├── User Management
        └── Employer Verification
```

## Shared application shell

- **Top navigation:** platform mark, current section, notifications, and account menu.
- **Sidebar:** role-specific primary destinations; on narrow screens it becomes a menu button that opens a labelled navigation drawer.
- **Main content:** page title, primary action, and the selected route's content.
- **Footer:** help/contact and legal links.
- **Responsive behavior:** keep top navigation available; collapse the sidebar behind a keyboard-operable menu button, close it with Escape, and return focus to its opener.

## Main user journeys

- **Student:** landing page → authentication → student dashboard → profile/CV or matched internship → details/application; the roadmap is available from the student dashboard.
- **Employer:** authentication → employer dashboard → create or manage an internship → review applicant details and choose an action.
- **Admin:** authentication → admin dashboard → employer verification queue → approve or reject with a reason.

## Current implementation status

Only the authentication frontend exists. The landing page, post-auth dashboards, role-aware navigation shell, route guards, and user journey destinations remain planned. The login/register/password-reset endpoint contract is documented in the root README; the API and session implementation are not present.

The user requested authentication as US01. The upstream GitHub issue list uses US08 (#46) for student authentication and US02 (#40) for this navigation map. Preserve issue state until the user asks to close it.
