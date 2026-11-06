import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";

import { EmptyState, Page, PageHeader } from "@/components/kit";
import { OpportunityGrid } from "@/components/opportunity-card";
import { RoleGate } from "@/components/role-access";
import { Button } from "@/components/ui/button";
import { OPPORTUNITIES } from "@/lib/opportunities";
import { useSaved } from "@/lib/saved-store";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved Opportunities — HuntYourTrack" },
      { name: "description", content: "Your bookmarked internships, fellowships and entry-level roles on HuntYourTrack." },
      { property: "og:title", content: "Saved Opportunities — HuntYourTrack" },
      { property: "og:description", content: "Your bookmarked internships, fellowships and entry-level roles on HuntYourTrack." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <RoleGate role="student">
      <SavedPage />
    </RoleGate>
  ),
});

function SavedPage() {
  const { ids } = useSaved();
  const items = OPPORTUNITIES.filter((o) => ids.includes(o.id));

  return (
    <Page>
      <PageHeader
        eyebrow="Your shortlist"
        title="Saved opportunities"
        description="Roles you've bookmarked while exploring. Keep an eye on closing dates."
        actions={<Button asChild variant="outline"><Link to="/explore">Explore more</Link></Button>}
      />
      <div className="mt-8">
        {items.length ? (
          <OpportunityGrid items={items} className="md:grid-cols-2 xl:grid-cols-3" />
        ) : (
          <EmptyState
            icon={Bookmark}
            title="Nothing saved yet"
            description="Tap the bookmark on any opportunity to keep it here."
            action={<Button asChild variant="hero" size="sm"><Link to="/explore">Explore opportunities</Link></Button>}
          />
        )}
      </div>
    </Page>
  );
}
