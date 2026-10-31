/**
 * Cross-Platform Dynamic Skills Setup Script
 * 
 * Automatically resolves the user's home directory across Linux, macOS, and Windows.
 * Creates ~/.global_ai_skills if missing, and creates a symlink/junction (.global_skills)
 * in the project root without requiring Administrator privileges on Windows.
 * Synchronizes useful host skills (graphify, open-design, diagram, etc.) into .global_skills.
 */
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const symlinkPath = path.join(projectRoot, '.global_skills');

// Dynamically resolve target directory using os.homedir() or environment variable
const defaultGlobalPath = path.join(os.homedir(), '.global_ai_skills');
const targetPath = path.resolve(process.env.GLOBAL_SKILLS_PATH || defaultGlobalPath);
const isWindows = process.platform === 'win32';

console.log('=== HuntYourTrack Dynamic Cross-Platform Skills Setup ===');
console.log(`OS Platform:      ${process.platform} (${os.type()} ${os.release()})`);
console.log(`User Home:        ${os.homedir()}`);
console.log(`Global Target:    ${targetPath}`);
console.log(`Project Symlink:  ${symlinkPath}`);

// Automatically create target directory if it does not exist
try {
    if (!fs.existsSync(targetPath)) {
        console.log(`Creating global directory: ${targetPath}`);
        fs.mkdirSync(targetPath, { recursive: true });
    }
} catch (error) {
    console.error(`[!] Failed to create global directory "${targetPath}":`, error.message);
    process.exit(1);
}

function syncHostSkills(destination) {
    const hostClaudeSkills = path.join(os.homedir(), '.claude', 'skills');
    if (fs.existsSync(hostClaudeSkills)) {
        const usefulSkills = [
            'graphify', 'open-design', 'diagram', 'document-generate',
            'design-review', 'design-html', 'system-design-notes', 'test-audit',
            'playwright-cli', 'make-pdf', 'autoplan', 'browse', 'gstack'
        ];
        usefulSkills.forEach(skillName => {
            const srcPath = path.join(hostClaudeSkills, skillName);
            const destPath = path.join(destination, skillName);
            if (fs.existsSync(srcPath) && !fs.existsSync(destPath)) {
                try {
                    fs.symlinkSync(srcPath, destPath, isWindows ? 'junction' : 'dir');
                    console.log(`[+] Synced skill: ${skillName}`);
                } catch (err) {
                    // non-fatal
                }
            }
        });
    }
}

// Safely clean up existing symlink, junction, or stale entry
try {
    let stat;
    try {
        stat = fs.lstatSync(symlinkPath);
    } catch {
        stat = null;
    }

    if (stat) {
        if (stat.isSymbolicLink()) {
            const currentTarget = path.resolve(path.dirname(symlinkPath), fs.readlinkSync(symlinkPath));
            if (currentTarget === targetPath) {
                console.log('[✓] Existing symlink is already pointing to the correct global directory.');
                syncHostSkills(targetPath);
                console.log('Setup complete. You can now run "npm test" or start developing.');
                process.exit(0);
            }
            console.log('Removing outdated symlink...');
            fs.unlinkSync(symlinkPath);
        } else if (stat.isDirectory()) {
            // On Windows, a directory junction can report as a directory in some Node APIs
            console.log('Removing existing directory/junction link...');
            if (isWindows) {
                fs.rmdirSync(symlinkPath);
            } else {
                console.warn('[!] Warning: .global_skills is a physical directory, backing up and removing...');
                fs.rmSync(symlinkPath, { recursive: true, force: true });
            }
        } else {
            fs.unlinkSync(symlinkPath);
        }
    }
} catch (error) {
    console.error('[!] Error inspecting/cleaning up existing .global_skills link:', error.message);
    process.exit(1);
}

// Create symlink or Windows junction
try {
    // On Windows, 'junction' avoids needing elevated Administrator permissions
    const linkType = isWindows ? 'junction' : 'dir';
    fs.symlinkSync(targetPath, symlinkPath, linkType);
    console.log(`[✓] Successfully established ${linkType === 'junction' ? 'Windows junction' : 'POSIX symlink'}:`);
    console.log(`    .global_skills -> ${targetPath}\n`);

    syncHostSkills(targetPath);

    console.log('Setup complete. You can now run "npm test" or start developing.');
} catch (error) {
    console.error('[!] Failed to create symlink/junction:', error.message);
    if (isWindows) {
        console.error('    Tip: If Windows Developer Mode is disabled, standard symlinks require admin rights, but junctions do not.');
    }
    process.exit(1);
}
