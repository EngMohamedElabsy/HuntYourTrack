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

## AI Core Directives
1. **Always Update:** After successfully implementing any new feature, fixing a bug, or modifying the architecture, you MUST automatically edit this `CLAUDE.md` file to update the "Active Changelog & Task Tracker".
2. **Context First:** Always read this file silently before executing any new tasks to ensure alignment with the project architecture.
3. **Version Control & GitHub Sync:** After completing any task, adding a feature, or updating this tracking file, you MUST automatically use local `git` commands (`git add .`, `git commit -m "descriptive message"`) to commit your changes, and then immediately execute `git push origin main` to sync the work with the remote GitHub repository.
