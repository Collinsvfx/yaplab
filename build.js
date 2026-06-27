const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('Error: index.html not found!');
  process.exit(1);
}

let content = fs.readFileSync(indexPath, 'utf8');

const url = process.env.SUPABASE_URL || 'INJECT_SUPABASE_URL';
const key = process.env.SUPABASE_ANON_KEY || 'INJECT_SUPABASE_ANON_KEY';

if (url === 'INJECT_SUPABASE_URL' || key === 'INJECT_SUPABASE_ANON_KEY') {
  console.warn('⚠️ WARNING: SUPABASE_URL or SUPABASE_ANON_KEY environment variables are missing.');
  console.warn('The application will build, but database synchronization will not function until configured.');
} else {
  console.log('✓ Successfully read credentials from environment variables.');
}

content = content.replace('INJECT_SUPABASE_URL', url);
content = content.replace('INJECT_SUPABASE_ANON_KEY', key);

fs.writeFileSync(indexPath, content);
console.log('✓ Successfully injected credentials into index.html for Vercel deployment!');
