/**
 * Cross-platform script to dynamically link global AI skills to the local workspace.
 * Resolves ~/.global_ai_skills and symlinks it to .global_skills in the project root.
 */
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const symlinkPath = path.join(projectRoot, '.global_skills');
const defaultGlobalPath = path.join(os.homedir(), '.global_ai_skills');
const targetPath = process.env.GLOBAL_SKILLS_PATH || defaultGlobalPath;

console.log('--- HuntYourTrack Global Skills Setup ---');
console.log(`Target global directory: ${targetPath}`);
console.log(`Symlink location:        ${symlinkPath}`);

if (!fs.existsSync(targetPath)) {
    console.warn('\n[!] Warning: Global skills directory not found on this machine.');
    console.warn(`    Expected location: ${targetPath}`);
    console.warn('    Please create it using:');
    console.warn(`        mkdir -p "${targetPath}"\n`);
    console.warn('    You can also set the GLOBAL_SKILLS_PATH environment variable to point to a custom directory.\n');
}

try {
    // Check if symlink already exists or is broken
    let existing;
    try {
        existing = fs.lstatSync(symlinkPath);
    } catch {
        existing = null;
    }

    if (existing) {
        if (existing.isSymbolicLink()) {
            const currentTarget = fs.readlinkSync(symlinkPath);
            if (path.resolve(currentTarget) === path.resolve(targetPath)) {
                console.log('[✓] Symlink .global_skills is already up to date.');
                process.exit(0);
            }
            fs.unlinkSync(symlinkPath);
        } else if (existing.isDirectory()) {
            console.error('[!] Error: .global_skills already exists as a regular directory. Please back up and remove it.');
            process.exit(1);
        } else {
            fs.unlinkSync(symlinkPath);
        }
    }

    // Create directory symlink (cross-platform 'junction' type on Windows, default on POSIX)
    const symlinkType = os.platform() === 'win32' ? 'junction' : 'dir';
    fs.symlinkSync(targetPath, symlinkPath, symlinkType);
    console.log('[✓] Successfully created symlink: .global_skills -> ' + targetPath);
} catch (error) {
    console.error('[!] Failed to create symlink:', error.message);
    process.exit(1);
}
