# HuntYourTrack - Software Engineering Graduation Project

## Project Overview
HuntYourTrack is an AI-powered platform bridging the gap between students and employers by intelligently matching student CVs with internship requirements and generating personalized learning roadmaps to cover skill gaps. It is designed as a graduation project for Software Engineering, requiring high standards of architecture and documentation.

## Tech Stack
- **Frontend:** React (Deployed on AWS S3)
- **Backend:** Node.js / Python (Orchestrated via Kubernetes - K8s)
- **Database:** MongoDB Atlas
- **Workflow Automation:** n8n
- **AI Engine:** Gemini API

## Build & Run Commands
- **Frontend:**
  - Install: `npm install`
  - Run: `npm start`
  - Build: `npm run build`
- **Backend:**
  - Setup: (To be defined based on Node.js/Python specific setup)
  - Run: (To be defined)
- **Deployment:**
  - K8s Cluster: `kubectl apply -f k8s/`

## Active Changelog & Task Tracker
- [x] Repository initialized.
- [x] Documentation (docs/) uploaded to GitHub.
- [x] CLAUDE.md initialized for project memory.
- [x] Initialize Frontend structure.
- [x] Initialize Backend API.
- [ ] Configure MongoDB Atlas connection.
- [ ] Integrate Gemini API.
- [ ] Setup n8n workflows.

## Architecture Notes
- Enterprise Software Architecture patterns are to be followed.
- Scalability managed via K8s.
- AI integration via Gemini for intelligent tracking/analysis.
- **Clean Code Standard:** 
  - All code must adhere to "Clean Code" principles (meaningful naming, single responsibility, and modularity).
  - Code must be continuously refactored for clarity and efficiency.
  - **Strict Language Policy:** No Arabic text is allowed in the code, variable names, or comments. All comments and documentation within the code MUST be written in professional English.


## AI Core Directives
1. **Always Update:** After successfully implementing any new feature, fixing a bug, or modifying the architecture, you MUST automatically edit this `CLAUDE.md` file to update the "Active Changelog & Task Tracker".
2. **Context First:** Always read this file silently before executing any new tasks to ensure alignment with the project architecture.
3. **Version Control & GitHub Sync:** After completing any task, adding a feature, or updating this tracking file, you MUST automatically use local `git` commands (`git add .`, `git commit -m "descriptive message"`) to commit your changes, and then immediately execute `git push origin main` to sync the work with the remote GitHub repository.
4. **Pre-Push Communication Protocol:** Before executing `git push`, the agent MUST write a detailed "Final Update Report" at the end of the `CLAUDE.md` file. This report must include:
   - **What was changed/added:** A clear summary of the technical changes.
   - **Reasoning:** Why these changes were made.
   - **Impact:** How this affects other team members or project components.
   The mandatory sequence is: `Implement` $\rightarrow$ `Update Tracker` $\rightarrow$ `Write Final Report in CLAUDE.md` $\rightarrow$ `Commit` $\rightarrow$ `Push`.
5. **Cross-Session Synchronization:** Upon starting any task, the agent MUST perform a differential analysis between the current codebase and the `Active Changelog` in `CLAUDE.md`. If discrepancies are found, the agent MUST first reconcile the state and update the tracker before proceeding.

## Tooling & Environment
### MCP Servers & Plugins
- **aws-core**: AWS management and infrastructure.
- **databases-on-aws (aurora-dsql)**: Database management.
- **browser-use**: Web interaction and automation.
- **figma**: Design to code and design system management.
- **canva**: Brand assets and creative design.

### Essential Skills
- **ui-ux-pro-max**: For high-end UI/UX design and implementation.
- **impeccable**: For frontend polishing and UX auditing.
- **frontend-design**: For structural frontend layout.
- **superpowers**: For advanced agent orchestration and task execution.
- **claude-security**: For security scanning and patching.

### Configuration
- **VPN/Proxy:** User uses Nekobox.
- **Git Settings:** `http.sslVerify false` and `http.postBuffer 524288000` are required for stable connection.

## Tooling & Environment (Comprehensive)
### MCP Servers & Plugins
- **aws-core**: AWS management, S3, K8s, and infrastructure.
- **databases-on-aws (aurora-dsql)**: Advanced SQL and database management.
- **browser-use**: Direct browser control via CDP for automation and scraping.
- **figma**: Design-to-code, Figma API, and design system sync.
- **canva**: Brand assets, creative design, and template management.
- **playwright**: Browser automation and testing.

### Essential Skills
- **ui-ux-pro-max**: AI-driven UI/UX design intelligence for web/mobile.
- **impeccable**: Frontend polishing, UX auditing, and visual hardening.
- **frontend-design**: Structural frontend layouts and design guidance.
- **superpowers**: Parallel agent orchestration and systematic debugging.
- **claude-security**: Full repository security scanning and patching.
- **dataviz**: Professional data visualization and dashboard design.
- **workflow-authoring**: Creating complex multi-agent orchestration scripts.

### Project Configuration
- **Standard:** All code must be Clean Code, English only, and synchronized via GitHub.
