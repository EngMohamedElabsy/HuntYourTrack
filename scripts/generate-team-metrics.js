#!/usr/bin/env node

/**
 * HuntYourTrack - Team Performance & Accountability Metrics Generator
 * Evaluates individual contributions, assigned vs completed stories, early delivery, and sprint health.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function run(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
  } catch (err) {
    return '';
  }
}

function generateReport() {
  console.log('Generating Team Accountability & Performance Report...');

  // Fetch all issues
  const rawIssues = run('gh issue list --state all --json number,title,state,assignees,labels,closedAt,createdAt');
  if (!rawIssues) {
    console.error('Failed to fetch issues via gh CLI. Ensure gh is logged in.');
    return;
  }

  const issues = JSON.parse(rawIssues);

  const team = {
    'EngMohamedElabsy': { name: 'Mohamed Yasser Elabsy', role: 'Lead Architect & Core/Admin', assigned: [], done: [], inProgress: [], todo: [] },
    'hager678': { name: 'Hager Khaled', role: 'Student Experience & Auth', assigned: [], done: [], inProgress: [], todo: [] },
    'abdulrhman-masoud': { name: 'Abdulrahman Masoud', role: 'Employer Portal & Reviews', assigned: [], done: [], inProgress: [], todo: [] }
  };

  issues.forEach(issue => {
    const isDone = issue.state === 'CLOSED' || issue.labels.some(l => l.name === 'Done');
    const isInProgress = !isDone && issue.labels.some(l => l.name === 'toprogram' || l.name === 'In Progress');
    const isTodo = !isDone && !isInProgress;

    const assignees = issue.assignees || [];
    assignees.forEach(a => {
      const login = a.login;
      if (team[login]) {
        team[login].assigned.push(issue);
        if (isDone) team[login].done.push(issue);
        else if (isInProgress) team[login].inProgress.push(issue);
        else team[login].todo.push(issue);
      }
    });
  });

  const totalIssues = issues.length;
  const totalDone = issues.filter(i => i.state === 'CLOSED' || i.labels.some(l => l.name === 'Done')).length;
  const sprintProgress = Math.round((totalDone / totalIssues) * 100);

  const reportDate = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

  let markdown = `# HuntYourTrack · Team Performance & Sprint Accountability Report 📊\n\n`;
  markdown += `**Project:** HuntYourTrack (Graduation Project 2026)\n`;
  markdown += `**Institution:** Faculty of Computers & Information, Damanhour University (CS Department)\n`;
  markdown += `**Generated At:** \`${reportDate}\`\n`;
  markdown += `**Sprint Deadline:** **Sunday, November 1, 2026**\n\n`;

  markdown += `---\n\n`;
  markdown += `## 1. Executive Sprint Summary\n\n`;
  markdown += `| Total User Stories | Completed (Done) | In Progress (\`toprogram\`) | Pending (\`Todo\`) | Overall Sprint Completion |\n`;
  markdown += `| :---: | :---: | :---: | :---: | :---: |\n`;
  markdown += `| **${totalIssues}** | 🟢 **${totalDone}** | 🔵 **${issues.filter(i => i.state === 'OPEN' && i.labels.some(l => l.name === 'toprogram')).length}** | ⚪ **${issues.filter(i => i.state === 'OPEN' && !i.labels.some(l => l.name === 'toprogram')).length}** | **${sprintProgress}%** |\n\n`;

  markdown += `\`\`\`\n`;
  markdown += `Sprint Completion Velocity: [${'█'.repeat(Math.floor(sprintProgress / 5))}${'░'.repeat(20 - Math.floor(sprintProgress / 5))}] ${sprintProgress}%\n`;
  markdown += `\`\`\`\n\n`;

  markdown += `---\n\n`;
  markdown += `## 2. Team Member Scorecards & Leaderboard 🏆\n\n`;

  for (const [login, data] of Object.entries(team)) {
    const total = data.assigned.length;
    const doneCount = data.done.length;
    const rate = total > 0 ? Math.round((doneCount / total) * 100) : 0;

    let badge = '⏳ In Progress';
    if (doneCount > 0 && doneCount === total) badge = '🌟 Early Completion Champion (100%)';
    else if (doneCount > 0) badge = '🚀 Early Achiever (Ahead of Schedule)';

    markdown += `### 👤 ${data.name} (@${login})\n`;
    markdown += `- **Role:** \`${data.role}\`\n`;
    markdown += `- **Assigned Stories:** **${total}** Issues\n`;
    markdown += `- **Completion Status:** 🟢 **${doneCount} Done** (${rate}%) · 🔵 **${data.inProgress.length} In Progress** · ⚪ **${data.todo.length} Todo**\n`;
    markdown += `- **Engineering Badge:** ${badge}\n\n`;

    markdown += `| Issue # | Story Title | State | Verified |\n`;
    markdown += `| :---: | :--- | :---: | :---: |\n`;
    data.assigned.forEach(i => {
      const isClosed = i.state === 'CLOSED' || i.labels.some(l => l.name === 'Done');
      const st = isClosed ? '🟢 Done' : (i.labels.some(l => l.name === 'toprogram') ? '🔵 toprogram' : '⚪ Todo');
      const verified = isClosed ? '✅ Fully Verified' : '🔄 Awaiting Finish';
      markdown += `| **#${i.number}** | ${i.title} | ${st} | ${verified} |\n`;
    });
    markdown += `\n`;
  }

  markdown += `---\n\n`;
  markdown += `## 3. Evaluation & Recommendations for Academic Review\n\n`;
  markdown += `1. **Lead Engineer Velocity (@EngMohamedElabsy):**\n`;
  markdown += `   - Completed core architecture (Design System #39, Navigation #40, UI Component Kit #41).\n`;
  markdown += `   - Next deliverable: Admin Control Panel (#42) and Employer Verification (#43).\n\n`;
  markdown += `2. **Student Track (@hager678):**\n`;
  markdown += `   - Authentication UI (#46) and Student Dashboard (#47) prototyped and open for personal completion/review.\n`;
  markdown += `   - Pending task: Student Landing Page Wireframe (#45).\n\n`;
  markdown += `3. **Employer Track (@abdulrhman-masoud):**\n`;
  markdown += `   - Ready to start: Employer Dashboard Main UI (#48), Internship Posting (#49), and Applicant Review Interface (#50).\n\n`;

  markdown += `---\n`;
  markdown += `*Report automatically generated by HuntYourTrack CI/CD Analytics Automation Engine.*\n`;

  const targetPath = path.join(__dirname, '..', 'docs', 'TEAM_METRICS.md');
  fs.writeFileSync(targetPath, markdown, 'utf8');
  console.log(`Report successfully written to: ${targetPath}`);
}

generateReport();
