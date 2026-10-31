# HuntYourTrack Global AI Skills Registry

This directory contains the verified, operational AI skills and tooling integration profiles designed to empower AI coding assistants (Claude, Codex, Antigravity) working on **HuntYourTrack**.

---

## 🛠️ Verified Active Skills

| Skill | Category | Primary Invocation / Role | Key Capabilities |
| :--- | :--- | :--- | :--- |
| **`open-design`** | UI/UX & Quality Gate | `od lint <file.html>`, `od tools directions` | Anti-slop HTML linter detecting generic AI tells (`#4F46E5`, emoji icons), enforces modern minimal design tokens. |
| **`graphify`** | Codebase Architecture | `graphify path <A> <B>`, `graphify explain <Node>` | Extracts AST dependencies and maps structural relationships across codebase modules. |
| **`design-system`** | Design Standard | `MASTER.md`, `huntyourtrack/` specs | HuntYourTrack canonical color tokens, typography (Poppins + Open Sans), 4.5:1 contrast ratios, and motion rules. |
| **`huntyourtrack-frontend`** | Domain Invariants | `SKILL.md` rules | Strict multi-faculty roadmap models, client-side session mocking, corporate deadline countdowns, teammate isolation rules. |
| **`diagram`** | Visual Modeling | Mermaid & SVG flow generation | Architectural diagrams, user flow charts, and sequence diagrams. |
| **`test-audit`** | QA & Test Harness | `npm test`, E2E audit scripts | Complete end-to-end verification, DOM assertions, WCAG contrast checks, dark mode token validation. |
| **`playwright-cli`** | Browser Automation | Headless/Headed test execution | Automates browser workflows, cross-role journey verification, and visual regression detection. |
| **`document-generate`** | Technical Writing | SRS & Sprint Reports | Produces structured engineering docs, API specifications, and pull request documentation. |
| **`design-review`** | UI/UX Review | Heuristics & A11y inspection | Scans frontend code for UX friction, touch targets, contrast failures, and responsive layout issues. |
| **`design-html`** | Frontend Generation | Semantic HTML/CSS drafting | Clean semantic markup following CSS variables and design system guidelines without frameworks. |
| **`autoplan`** | Implementation Planning | Step decomposition | Breaks down complex user stories into atomic commits and clear verification steps. |
| **`browse`** | Web Research | Documentation lookup | Headless browsing and documentation research. |
| **`make-pdf`** | Export & Delivery | Documentation export | Generates clean PDF reports for graduation project deliverables and submissions. |

---

## 🚀 How to Run and Verify Skills Locally

1. **Anti-Slop Linter (`open-design`):**
   ```bash
   od lint /home/elabsy/HuntYourTrack/frontend/index.html --json
   ```
2. **Codebase AST Analysis (`graphify`):**
   ```bash
   graphify --help
   ```
3. **Automated Test Audit (`test-audit` / `playwright`):**
   ```bash
   npm test
   ```
4. **Skills Synchronizer:**
   ```bash
   npm run setup:skills
   ```
