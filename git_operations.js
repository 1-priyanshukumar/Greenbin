const fs = require('fs');
const path = require('path');
const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');

const dir = 'c:\\Users\\rajku\\greenbin';
const repoUrl = 'https://github.com/1-priyanshukumar/Greenbin.git';

async function main() {
    let token = '';
    const tokenPath = path.join(dir, '.git_token.tmp');
    if (fs.existsSync(tokenPath)) {
        token = fs.readFileSync(tokenPath, 'utf8').trim();
    } else {
        console.error('Token file not found');
        process.exit(1);
    }

    const mode = process.argv[2] || 'push';

    console.log(`Starting git ${mode} to ${repoUrl}...`);

    const author = {
        name: '1-priyanshukumar',
        email: 'priyanshu@example.com'
    };

    // Helper to walk directory and stage files
    async function stageAll(dirPath, relativePath = '') {
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });
        for (const entry of entries) {
            const entryRelPath = path.join(relativePath, entry.name).replace(/\\/g, '/');
            if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === '.git_token.tmp' || entry.name === 'get_git_cred.ps1') {
                continue;
            }
            if (entry.isDirectory()) {
                await stageAll(path.join(dirPath, entry.name), entryRelPath);
            } else {
                try {
                    await git.add({ fs, dir, filepath: entryRelPath });
                } catch (e) {
                    console.error(`Error adding ${entryRelPath}:`, e.message);
                }
            }
        }
    }

    if (mode === 'push' || mode === 'sync') {
        console.log('Staging files...');
        await stageAll(dir);
        
        console.log('Committing changes...');
        try {
            let sha = await git.commit({
                fs,
                dir,
                author,
                message: 'Update GreenBin project - full stack application'
            });
            console.log('Committed:', sha);
        } catch (e) {
            console.log('Commit note:', e.message);
        }

        console.log('Pushing to GitHub remote main branch...');
        try {
            let pushResult = await git.push({
                fs,
                http,
                dir,
                remote: 'origin',
                ref: 'main',
                url: repoUrl,
                onAuth: () => ({ username: token }),
                force: true
            });
            console.log('Push result:', JSON.stringify(pushResult));
            console.log('Successfully pushed to GitHub repository!');
        } catch (e) {
            console.error('Push failed, attempting master branch...', e.message);
            try {
                let pushResult = await git.push({
                    fs,
                    http,
                    dir,
                    remote: 'origin',
                    ref: 'master',
                    url: repoUrl,
                    onAuth: () => ({ username: token }),
                    force: true
                });
                console.log('Push result (master):', JSON.stringify(pushResult));
                console.log('Successfully pushed to master branch!');
            } catch (err2) {
                console.error('Push failed:', err2);
            }
        }
    }

    if (mode === 'pull') {
        console.log('Pulling latest from GitHub...');
        try {
            await git.fetch({
                fs,
                http,
                dir,
                url: repoUrl,
                ref: 'main',
                onAuth: () => ({ username: token }),
                singleBranch: true
            });
            await git.checkout({
                fs,
                dir,
                ref: 'main',
                force: true
            });
            console.log('Successfully pulled latest changes!');
        } catch (e) {
            console.error('Pull error:', e.message);
        }
    }
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
