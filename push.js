const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname);
const repoUrl = 'https://github.com/1-priyanshukumar/Greenbin.git';

async function main() {
  console.log('🌱 Initializing Git repository...');
  await git.init({ fs, dir });

  console.log('📦 Staging files...');
  const files = await getFiles(dir);
  for (const file of files) {
    const rel = path.relative(dir, file).replace(/\\/g, '/');
    if (rel.startsWith('.git/') || rel.startsWith('node_modules/') || rel.startsWith('frontend/node_modules/') || rel.startsWith('backend/node_modules/') || rel.startsWith('uploads/')) {
      continue;
    }
    await git.add({ fs, dir, filepath: rel });
  }

  console.log('📝 Creating initial commit...');
  const sha = await git.commit({
    fs,
    dir,
    author: {
      name: 'Priyanshu Kumar',
      email: 'priyanshu@example.com',
    },
    message: 'Initial commit: GreenBin AI-Powered Smart Waste Management Platform',
  });
  console.log('✅ Commit created:', sha);

  console.log(`\n==================================================`);
  console.log(`🔗 Ready to push to: ${repoUrl}`);
  console.log(`==================================================\n`);
}

function getFiles(dirPath) {
  let results = [];
  const list = fs.readdirSync(dirPath);
  list.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist' && file !== 'uploads') {
        results = results.concat(getFiles(filePath));
      }
    } else {
      results.push(filePath);
    }
  });
  return results;
}

main().catch(console.error);
