# Cloudflare Workers Quick Start

Quick reference for deploying MCP-B to Cloudflare Workers.

## 🚀 Quick Deploy (First Time)

```bash
# 1. Set up environment files
./setup-env.sh

# 2. Install dependencies
npm install

# 3. Authenticate with Cloudflare
npx wrangler login

# 4. Build the project
npm run cf:build

# 5. Test locally (optional)
npm run cf:preview

# 6. Deploy to production
npm run cf:deploy
```

## ⚡ Quick Deploy (After Setup)

```bash
npm run cf:build && npm run cf:deploy
```

## 📋 Prerequisites Checklist

Before deploying, ensure you have:

- [ ] **R2 Buckets Created** (in Cloudflare Dashboard)
  - `mcp-b-cache` (production)
  - `mcp-b-cache-preview` (preview)

- [ ] **Browserbase Credentials** (from https://www.browserbase.com/)
  - API Key
  - Project ID
  - Extension ID (MCP-B Chrome extension uploaded)

- [ ] **Environment Variables in Cloudflare Workers**
  - `BROWSERBASE_API_KEY` (encrypted)
  - `BROWSERBASE_PROJECT_ID` (encrypted)
  - `BROWSERBASE_EXTENSION_ID` (encrypted)
  - `BB_REGION` (optional, encrypted)
  - `TURNSTILE_SECRET_KEY` (optional, encrypted)

## 🔧 Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Local Next.js development server |
| `npm run cf:build` | Build for Cloudflare Workers |
| `npm run cf:preview` | Preview locally with Wrangler |
| `npm run cf:deploy` | Deploy to production |
| `npx wrangler tail mcp-b` | View live production logs |
| `npx wrangler whoami` | Check Cloudflare authentication |

## 🆘 Troubleshooting

### Build fails
```bash
# Clear caches and rebuild
rm -rf .next .open-next node_modules
npm install
npm run cf:build
```

### Deploy fails with R2 error
- Verify buckets exist in Cloudflare R2 dashboard
- Check bucket names: `mcp-b-cache` and `mcp-b-cache-preview`
- Ensure buckets are in the same Cloudflare account

### Live demo doesn't work
- Check environment variables in Cloudflare Dashboard
- Verify Browserbase API key and extension ID
- Check logs: `npx wrangler tail mcp-b`

### Environment variables not working
- Add secrets in Cloudflare Dashboard: Workers → mcp-b → Settings → Variables
- Use "Encrypt" for sensitive values
- Re-deploy after adding: `npm run cf:deploy`

## 📚 Full Documentation

See [TASK-3-CLOUDFLARE-SETUP.md](../TASK-3-CLOUDFLARE-SETUP.md) for detailed instructions.

## 🔗 Useful Links

- [Cloudflare Dashboard](https://dash.cloudflare.com/)
- [Cloudflare R2](https://dash.cloudflare.com/?to=/:account/r2)
- [Cloudflare Workers](https://dash.cloudflare.com/?to=/:account/workers)
- [Browserbase](https://www.browserbase.com/)
- [Wrangler Docs](https://developers.cloudflare.com/workers/wrangler/)
