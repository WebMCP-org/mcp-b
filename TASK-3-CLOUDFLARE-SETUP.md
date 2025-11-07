# Task 3: Cloudflare Workers Deployment Setup Guide

This guide walks you through setting up and deploying the MCP-B website to Cloudflare Workers.

## 📋 Prerequisites

Before starting, ensure you have:
- [ ] Cloudflare account with Workers enabled
- [ ] Browserbase account with API credentials (see Task 2 in TODO.md)
- [ ] Node.js and npm installed
- [ ] Git repository access

## 🔧 Task 3.1: Create Cloudflare R2 Buckets

R2 buckets are required for Next.js Incremental Static Regeneration (ISR) caching.

### Steps:

1. **Log in to Cloudflare Dashboard**
   - Go to https://dash.cloudflare.com/
   - Select your account

2. **Navigate to R2**
   - Click on "R2" in the left sidebar
   - Or go to: https://dash.cloudflare.com/?to=/:account/r2

3. **Create Production Bucket**
   - Click "Create bucket"
   - Bucket name: `mcp-b-cache`
   - Location: Choose closest to your users (e.g., US East)
   - Click "Create bucket"

4. **Create Preview Bucket**
   - Click "Create bucket" again
   - Bucket name: `mcp-b-cache-preview`
   - Location: Same as production bucket
   - Click "Create bucket"

### Verification:

✅ You should now see two buckets in your R2 dashboard:
- `mcp-b-cache` (production)
- `mcp-b-cache-preview` (preview/staging)

**Note:** These bucket names match the configuration in `wrangler.toml`:
```toml
[[r2_buckets]]
binding = "NEXT_INC_CACHE_R2_BUCKET"
bucket_name = "mcp-b-cache"
preview_bucket_name = "mcp-b-cache-preview"
```

---

## 🔐 Task 3.2: Configure Environment Variables

Environment variables need to be set up in two places: local development and Cloudflare Workers production.

### 3.2.1: Local Development Setup

For local development with `npm run dev`:

1. **Copy the environment template**
   ```bash
   cd newWebsite
   cp .env.sample .env.local
   ```

2. **Edit `.env.local` with your actual values**
   ```bash
   # Update with your Browserbase credentials
   BROWSERBASE_API_KEY=bb_live_xxxxx
   BROWSERBASE_PROJECT_ID=your_project_id
   BROWSERBASE_EXTENSION_ID=ext_xxxxx
   BB_REGION=us-east-1

   # Optional: Add Turnstile keys if you have them
   TURNSTILE_SECRET_KEY=your_secret_key
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key
   ```

3. **Test locally**
   ```bash
   npm run dev
   # Visit http://localhost:3000/mcp-b-playground
   ```

### 3.2.2: Wrangler Local Development Setup

For local preview with `npm run cf:preview`:

1. **Copy the Wrangler environment template**
   ```bash
   cd newWebsite
   cp .dev.vars.sample .dev.vars
   ```

2. **Edit `.dev.vars` with your actual values**
   ```bash
   # Same values as .env.local but without NEXT_PUBLIC prefix
   BROWSERBASE_API_KEY=bb_live_xxxxx
   BROWSERBASE_PROJECT_ID=your_project_id
   BROWSERBASE_EXTENSION_ID=ext_xxxxx
   BB_REGION=us-east-1
   TURNSTILE_SECRET_KEY=your_secret_key
   ```

3. **Test with Wrangler**
   ```bash
   npm run cf:build
   npm run cf:preview
   ```

### 3.2.3: Cloudflare Workers Production Setup

For production deployment, add environment variables to Cloudflare Dashboard:

1. **Navigate to Workers Settings**
   - Go to https://dash.cloudflare.com/
   - Click "Workers & Pages"
   - Find or create the `mcp-b` worker
   - Go to "Settings" → "Variables"

2. **Add Encrypted Variables (Secrets)**

   Click "Add variable" and set each as **Encrypted**:

   | Variable Name | Example Value | Description |
   |---------------|---------------|-------------|
   | `BROWSERBASE_API_KEY` | `bb_live_xxxxx` | Browserbase API key |
   | `BROWSERBASE_PROJECT_ID` | `your_project_id` | Browserbase project ID |
   | `BROWSERBASE_EXTENSION_ID` | `ext_xxxxx` | MCP-B extension ID |
   | `BB_REGION` | `us-east-1` | Browserbase region (optional) |
   | `TURNSTILE_SECRET_KEY` | `your_secret_key` | Turnstile secret (optional) |

3. **Add Plain Text Variables**

   These are already set in `wrangler.toml` but can be overridden:

   | Variable Name | Value | Description |
   |---------------|-------|-------------|
   | `NEXT_PUBLIC_WEBSITE_URL` | `https://mcp-b.ai` | Public website URL |
   | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | `your_site_key` | Turnstile site key (optional) |

4. **Save and Deploy**
   - Click "Save and deploy"
   - Variables will be available after next deployment

### Environment Variables Reference

| Variable | Required | Where Used | Description |
|----------|----------|------------|-------------|
| `BROWSERBASE_API_KEY` | ✅ Yes | API routes | Authenticates with Browserbase |
| `BROWSERBASE_PROJECT_ID` | ✅ Yes | API routes | Browserbase project identifier |
| `BROWSERBASE_EXTENSION_ID` | ✅ Yes | API routes | MCP-B Chrome extension ID |
| `BB_REGION` | ⚪ Optional | API routes | Browserbase region (default: us-east-1) |
| `TURNSTILE_SECRET_KEY` | ⚪ Optional | API routes | Cloudflare Turnstile secret key |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | ⚪ Optional | Frontend | Cloudflare Turnstile site key |
| `NEXT_PUBLIC_WEBSITE_URL` | ⚪ Optional | SEO/Config | Website URL (default: https://mcp-b.ai) |

---

## 🚀 Task 3.3: Deploy to Cloudflare Workers

Now that R2 buckets and environment variables are set up, deploy to Cloudflare Workers.

### First-Time Setup

1. **Install dependencies**
   ```bash
   cd newWebsite
   npm install
   ```

2. **Authenticate with Cloudflare**
   ```bash
   npx wrangler login
   ```

   This will:
   - Open a browser window
   - Ask you to log in to Cloudflare
   - Grant Wrangler access to your account

3. **Verify wrangler.toml configuration**

   The `wrangler.toml` should already be configured:
   - Worker name: `mcp-b`
   - R2 buckets: `mcp-b-cache` and `mcp-b-cache-preview`
   - Compatibility date: `2025-11-06`
   - Node.js compatibility enabled

### Build and Deploy

1. **Build for Cloudflare Workers**
   ```bash
   npm run cf:build
   ```

   This will:
   - Run `next build`
   - Generate OpenNext build in `.open-next/` directory
   - Prepare static assets for Cloudflare

   **Expected output:**
   ```
   ✓ Building Next.js app...
   ✓ Generating OpenNext output...
   ✓ Build complete in .open-next/
   ```

2. **Preview locally (optional but recommended)**
   ```bash
   npm run cf:preview
   ```

   This starts a local Wrangler server:
   - Tests the build locally before deploying
   - Uses `.dev.vars` for environment variables
   - Accessible at `http://localhost:8788`

   **Test checklist:**
   - [ ] Homepage loads
   - [ ] Navigation works
   - [ ] `/mcp-b-playground` loads (may need Browserbase credentials)
   - [ ] Dark/light mode toggle works

3. **Deploy to production**
   ```bash
   npm run cf:deploy
   ```

   This will:
   - Upload your worker code to Cloudflare
   - Upload static assets
   - Bind R2 buckets
   - Deploy to your Workers URL

   **Expected output:**
   ```
   ✓ Uploading worker bundle...
   ✓ Uploading assets...
   ✓ Deployment complete!

   Published mcp-b
    https://mcp-b.your-subdomain.workers.dev
   ```

4. **Test production deployment**

   Visit your Workers URL and test:
   - [ ] Homepage loads correctly
   - [ ] All pages are accessible
   - [ ] `/mcp-b-playground` works with live demo
   - [ ] API routes respond correctly
   - [ ] Static assets load (images, CSS, JS)

### Subsequent Deployments

After the initial setup, deploying is simple:

```bash
cd newWebsite

# Make your changes...

# Build and deploy
npm run cf:build
npm run cf:deploy
```

---

## 🔍 Troubleshooting

### Build Fails

**Problem:** `npm run cf:build` fails with errors

**Solutions:**
- Ensure you're in the `newWebsite` directory
- Delete `.next` and `.open-next` folders: `rm -rf .next .open-next`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run lint`

### Deploy Fails: R2 Bucket Not Found

**Problem:** Deployment fails with "R2 bucket not found"

**Solutions:**
- Verify bucket names in Cloudflare R2 dashboard match `wrangler.toml`
- Bucket names must be exactly: `mcp-b-cache` and `mcp-b-cache-preview`
- Check that buckets are in the same Cloudflare account as your Worker

### Deploy Fails: Authentication Error

**Problem:** Wrangler can't authenticate

**Solutions:**
- Run `npx wrangler login` again
- Check you're logged in: `npx wrangler whoami`
- Ensure you have Workers permissions in your Cloudflare account

### Live Demo Doesn't Work

**Problem:** `/mcp-b-playground` shows errors or doesn't load browser

**Solutions:**
- Check Browserbase API credentials in Cloudflare Workers settings
- Verify extension ID is correct
- Check Browserbase account has available credits
- Look at Worker logs: `npx wrangler tail mcp-b`
- Test API endpoint directly: `curl https://your-worker.workers.dev/api/browserbase/create-session`

### Environment Variables Not Working

**Problem:** Environment variables are undefined in production

**Solutions:**
- Verify secrets are set in Cloudflare Dashboard (Workers → Settings → Variables)
- Use "Encrypt" option for sensitive values (API keys, secrets)
- Re-deploy after adding variables: `npm run cf:deploy`
- Check variable names match exactly (case-sensitive)

### Preview Works but Production Fails

**Problem:** Local preview works but deployed version fails

**Solutions:**
- Check production environment variables are set correctly
- Verify R2 buckets exist and are accessible
- Check Worker logs: `npx wrangler tail mcp-b`
- Ensure domain/routing is configured correctly

---

## 📊 Deployment Checklist

Use this checklist to verify Task 3 is complete:

### 3.1 R2 Buckets
- [ ] Created `mcp-b-cache` bucket
- [ ] Created `mcp-b-cache-preview` bucket
- [ ] Verified buckets appear in Cloudflare R2 dashboard

### 3.2 Environment Variables
- [ ] Created `.env.local` with Browserbase credentials
- [ ] Created `.dev.vars` with Browserbase credentials
- [ ] Added all secrets to Cloudflare Workers (Dashboard → Variables)
- [ ] Verified variables are encrypted/encrypted correctly

### 3.3 Deployment
- [ ] Installed dependencies (`npm install`)
- [ ] Authenticated with Wrangler (`npx wrangler login`)
- [ ] Built successfully (`npm run cf:build`)
- [ ] Previewed locally (`npm run cf:preview`)
- [ ] Deployed to production (`npm run cf:deploy`)
- [ ] Tested production URL
- [ ] Verified live demo works at `/mcp-b-playground`

---

## 📝 Next Steps

After completing Task 3, you can:

1. **Configure Custom Domain** (Task 4)
   - Uncomment domain routes in `wrangler.toml`
   - Add custom domains in Cloudflare Dashboard
   - Set up DNS records

2. **Monitor Your Deployment**
   - View logs: `npx wrangler tail mcp-b`
   - Check analytics in Cloudflare Dashboard
   - Monitor R2 storage usage

3. **Set Up CI/CD** (Optional)
   - Automate deployments with GitHub Actions
   - Use Wrangler in CI/CD pipelines
   - Deploy on push to main branch

4. **Enable Turnstile** (Optional, Task 6)
   - Add bot protection to live demo
   - Reduce abuse and costs

---

## 🔗 Useful Commands

```bash
# Development
npm run dev              # Local Next.js dev server
npm run dev:turbopack    # Faster dev server with Turbopack

# Cloudflare Workers
npm run cf:build         # Build for Workers
npm run cf:preview       # Preview locally with Wrangler
npm run cf:deploy        # Deploy to production

# Wrangler
npx wrangler login       # Authenticate with Cloudflare
npx wrangler whoami      # Check logged-in account
npx wrangler tail mcp-b  # View live logs
npx wrangler dev         # Alternative preview command
```

---

## 📚 Documentation Links

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare R2 Docs](https://developers.cloudflare.com/r2/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
- [OpenNext Cloudflare](https://opennext.js.org/cloudflare)
- [Browserbase Docs](https://www.browserbase.com/docs)

---

**Last Updated:** November 7, 2025
**Task Status:** Ready for implementation
**Prerequisites:** Tasks 1 and 2 should be completed first
