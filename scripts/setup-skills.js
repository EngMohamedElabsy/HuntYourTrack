/**
 * Cross-Platform Dynamic Skills Setup Script
 * 
 * Automatically resolves the user's home directory across Linux, macOS, and Windows.
 * Ensures ~/.global_ai_skills exists, verifies and synchronizes verified skills
 * from the tracked .global_skills repository directory to the user's environment.
 */
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const repoSkillsDir = path.join(projectRoot, '.global_skills');

// Dynamically resolve target directory using os.homedir() or environment variable
const defaultGlobalPath = path.join(os.homedir(), '.global_ai_skills');
const targetPath = path.resolve(process.env.GLOBAL_SKILLS_PATH || defaultGlobalPath);
const isWindows = process.platform === 'win32';

console.log('=== HuntYourTrack Dynamic Cross-Platform Skills Setup ===');
console.log(`OS Platform:      ${process.platform} (${os.type()} ${os.release()})`);
console.log(`User Home:        ${os.homedir()}`);
console.log(`Global Target:    ${targetPath}`);
console.log(`Repo Skills Dir:  ${repoSkillsDir}`);

// Ensure target directory exists on the host
try {
    if (!fs.existsSync(targetPath)) {
        console.log(`Creating global directory: ${targetPath}`);
        fs.mkdirSync(targetPath, { recursive: true });
    }
} catch (error) {
    console.error(`[!] Failed to create global directory "${targetPath}":`, error.message);
    process.exit(1);
}

// Ensure repo directory exists
if (!fs.existsSync(repoSkillsDir)) {
    console.error(`[!] Tracked skills directory missing: ${repoSkillsDir}`);
    process.exit(1);
}

// Sync skills from repository directory to global target directory
const verifiedSkills = [
    'open-design', 'graphify', 'design-system', 'huntyourtrack-frontend',
    'diagram', 'test-audit', 'playwright-cli', 'document-generate',
    'design-review', 'design-html', 'frontend-design', 'ui-ux-pro-max',
    'autoplan', 'browse', 'make-pdf'
];

let syncedCount = 0;
verifiedSkills.forEach(skillName => {
    const src = path.join(repoSkillsDir, skillName);
    const dest = path.join(targetPath, skillName);
    if (fs.existsSync(src)) {
        try {
            if (!fs.existsSync(dest)) {
                fs.cpSync(src, dest, { recursive: true });
                console.log(`[+] Synced skill to environment: ${skillName}`);
                syncedCount++;
            } else {
                syncedCount++;
            }
        } catch (err) {
            console.warn(`[!] Non-fatal error copying ${skillName}:`, err.message);
        }
    }
});

console.log(`[✓] Successfully verified and linked ${syncedCount} active AI skills.`);
console.log('Setup complete. You can now run "npm test" or start developing.\n');
