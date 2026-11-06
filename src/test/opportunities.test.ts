import { describe, expect, it } from "vitest";

import {
  countByType,
  DEFAULT_FILTERS,
  filterOpportunities,
  OPPORTUNITIES,
} from "@/lib/opportunities";

const ids = (f: Partial<typeof DEFAULT_FILTERS>) =>
  filterOpportunities(OPPORTUNITIES, { ...DEFAULT_FILTERS, ...f }).map((o) => o.id);

describe("opportunity filters", () => {
  it("shows all 6 listings by default in original order", () => {
    expect(ids({})).toEqual([
      "valeo-embedded",
      "cloud4work-devops",
      "ai-lab-ml-research",
      "fawry-backend",
      "raya-soc",
      "instabug-frontend",
    ]);
  });

  it("sidebar type counts match the original page (4 / 2 / 0)", () => {
    expect(countByType(OPPORTUNITIES, "internship")).toBe(4);
    expect(countByType(OPPORTUNITIES, "fellowship")).toBe(2);
    expect(countByType(OPPORTUNITIES, "junior")).toBe(0);
  });

  it("highest stipend puts Instabug ($500) then Valeo ($400) first", () => {
    expect(ids({ sort: "stipend" }).slice(0, 2)).toEqual(["instabug-frontend", "valeo-embedded"]);
  });

  it("approaching deadline puts the July 15 role first and Aug 02 last", () => {
    const r = ids({ sort: "deadline" });
    expect(r[0]).toBe("valeo-embedded");
    expect(r.at(-1)).toBe("ai-lab-ml-research");
  });

  it("remote work mode keeps only remote roles", () => {
    expect(ids({ mode: "Remote" })).toEqual(["cloud4work-devops", "instabug-frontend"]);
  });

  it("search matches company, title or stack", () => {
    expect(ids({ query: "kafka" })).toEqual(["fawry-backend"]);
    expect(ids({ query: "instabug" })).toEqual(["instabug-frontend"]);
  });
});
