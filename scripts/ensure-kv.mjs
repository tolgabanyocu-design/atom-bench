// Creates the AUDIO KV namespace once (if missing) and writes its id into wrangler.toml.
import fs from 'node:fs';
const acct = process.env.CLOUDFLARE_ACCOUNT_ID, token = process.env.CLOUDFLARE_API_TOKEN, title = 'atom-bench-audio';
const api = (p, o = {}) => fetch('https://api.cloudflare.com/client/v4/accounts/' + acct + p, {...o, headers: {Authorization: 'Bearer ' + token, 'content-type': 'application/json'}}).then(r => r.json());
let list = await api('/storage/kv/namespaces?per_page=100');
if (!list.success) { console.error(JSON.stringify(list.errors)); process.exit(1); }
let ns = list.result.find(n => n.title === title);
if (!ns) { const c = await api('/storage/kv/namespaces', {method: 'POST', body: JSON.stringify({title})}); if (!c.success) { console.error(JSON.stringify(c.errors)); process.exit(1); } ns = c.result; console.log('created KV', title); }
fs.writeFileSync('wrangler.toml', fs.readFileSync('wrangler.toml', 'utf8').replace('__KV_AUDIO_ID__', ns.id));
console.log('KV ready');
