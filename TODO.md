# MCP-B Website - Setup & TODO Checklist

This document outlines all the tasks required to complete the MCP-B website setup and deployment.

## 🔑 1. Environment Setup

### Local Development (.env.local)
Location: `/newWebsite/.env.local`

**Status:** File exists but needs configuration

**Required Steps:**
1. Copy values from `.env.sample` if you haven't already
2. Fill in the following environment variables:

```bash
# Update this for local dev
NEXT_PUBLIC_WEBSITE_URL=http://localhost:3000

# Browserbase Configuration - REQUIRED for Live Demo
BROWSERBASE_API_KEY=          # Get from https://www.browserbase.com/
BROWSERBASE_PROJECT_ID=       # From Browserbase dashboard
BROWSERBASE_EXTENSION_ID=     # Upload extension first (see section 2)
BB_REGION=us-east-1          # Optional, defaults to us-east-1

# Cloudflare Turnstile - OPTIONAL (for abuse protection)
TURNSTILE_SECRET_KEY=                    # Get from Cloudflare dashboard
NEXT_PUBLIC_TURNSTILE_SITE_KEY=          # Get from Cloudflare dashboard
```

**How to get Browserbase credentials:**
1. Sign up at https://www.browserbase.com/
2. Create a new project
3. Go to Settings → API Keys to get your `BROWSERBASE_API_KEY`
4. Copy your Project ID from the dashboard → `BROWSERBASE_PROJECT_ID`
5. Upload the extension (see section 2) → `BROWSERBASE_EXTENSION_ID`

---

## 🧩 2. Upload MCP-B Chrome Extension to Browserbase

**Status:** ⚠️ BLOCKED - Extension needs to be uploaded

**What:** The live demo at `/mcp-b-playground` embeds a browser with the MCP-B Chrome extension pre-installed via Browserbase.

**Required Steps:**

### Step 1: Build/Package the Extension
```bash
# Navigate to your MCP-B extension source code
# (This may be in a separate repo - need to locate it)

# Build the extension
npm run build

# Create a .zip file of the built extension
# Include manifest.json and all necessary files
```

### Step 2: Upload to Browserbase
1. Go to https://www.browserbase.com/
2. Navigate to your project
3. Go to **Extensions** section
4. Click **Upload Extension**
5. Upload your extension `.zip` file
6. Copy the **Extension ID** that Browserbase provides
7. Add this ID to your `.env.local` as `BROWSERBASE_EXTENSION_ID`

**Note:** You'll need to know where the MCP-B extension source code is located. Check:
- Is it in a separate repository?
- Is it in the `oldWebsiteForReference` somewhere?
- Do you have a pre-built version ready?

---

## ☁️ 3. Cloudflare Workers Deployment Setup

### 3.1 Create Cloudflare R2 Buckets

**Status:** ⚠️ TODO - Buckets need to be created

**Required Steps:**
1. Log in to Cloudflare Dashboard
2. Go to **R2** section
3. Create two buckets:
   - **Production:** `mcp-b-cache`
   - **Preview:** `mcp-b-cache-preview`

**Why:** These buckets are used for Next.js Incremental Static Regeneration (ISR) caching.

### 3.2 Configure Environment Variables in Cloudflare

**Status:** ⚠️ TODO - Secrets need to be added

**Location:** Cloudflare Dashboard → Workers & Pages → mcp-b → Settings → Variables

**Add these as encrypted secrets:**
```
BROWSERBASE_API_KEY
BROWSERBASE_PROJECT_ID
BROWSERBASE_EXTENSION_ID
BB_REGION (optional, defaults to us-east-1)
TURNSTILE_SECRET_KEY (optional, for abuse protection)
```

**Add these as plain environment variables:**
```
NEXT_PUBLIC_WEBSITE_URL=https://mcp-b.ai
NEXT_PUBLIC_TURNSTILE_SITE_KEY (if using Turnstile)
```

**How to add:**
1. Go to Cloudflare Dashboard
2. Navigate to **Workers & Pages**
3. Select your `mcp-b` worker
4. Go to **Settings** → **Variables**
5. Add each variable:
   - Use **Encrypt** for API keys and secrets
   - Use **Text** for public variables

### 3.3 Deploy to Cloudflare Workers

**Status:** ⚠️ TODO - First deployment needed

**Required Steps:**
```bash
cd newWebsite

# Build for Cloudflare Workers
npm run cf:build

# Deploy to production
npm run cf:deploy
```

**On first deployment, you may need to:**
1. Authenticate with Cloudflare: `npx wrangler login`
2. Confirm your account and project settings

---

## 🌐 4. Domain & DNS Configuration

**Status:** ⚠️ TODO - Domain routing needs setup

**Current Configuration:**
- Custom domain routes are commented out in `wrangler.toml`
- Default Workers URL will be used initially

**Required Steps:**

### Option A: Use Workers URL (Quick Start)
- After deployment, Cloudflare will provide a `*.workers.dev` URL
- No DNS setup required
- Good for testing before custom domain

### Option B: Custom Domain (Production)
1. In `wrangler.toml`, uncomment these lines:
   ```toml
   routes = [
     { pattern = "mcp-b.ai", custom_domain = true },
     { pattern = "www.mcp-b.ai", custom_domain = true }
   ]
   ```

2. In Cloudflare Dashboard:
   - Go to **Workers & Pages** → **mcp-b** → **Settings** → **Domains & Routes**
   - Add custom domain: `mcp-b.ai`
   - Add custom domain: `www.mcp-b.ai`

3. DNS Configuration:
   - Ensure `mcp-b.ai` is managed by Cloudflare DNS
   - DNS records will be automatically created by Workers
   - Verify DNS propagation

---

## 🎨 5. Content Migration from Old Website

**Status:** ⚠️ IN PROGRESS - Template setup complete, content needs migration

**Current State:**
- ✅ New website has modern Next.js template
- ✅ Basic structure in place (navbar, footer, routes)
- ⚠️ Content needs to be migrated from `oldWebsiteForReference`

**Pages that exist in template:**
- `/` - Homepage
- `/about` - About page
- `/blog` - Blog listing
- `/blog/[slug]` - Blog posts
- `/careers` - Careers page
- `/contact` - Contact page
- `/mcp-b-playground` - Live demo (NEW!)
- `/playground` - Playground page
- `/pricing` - Pricing page
- `/sign-in` - Sign in page
- `/sign-up` - Sign up page

**TODO - Review and Update Content:**
1. Review each page in `oldWebsiteForReference/src`
2. Update content in `newWebsite/app/*` to match MCP-B branding
3. Migrate any missing pages
4. Update constants in `newWebsite/constants/` (careers, FAQs, pricing, etc.)
5. Migrate blog posts to `newWebsite/data/`
6. Update images in `newWebsite/public/`

---

## 🔒 6. Optional: Cloudflare Turnstile (Bot Protection)

**Status:** ✅ COMPLETE - Ready to enable when needed

**What:** Adds CAPTCHA-like protection to the live demo to prevent abuse.

**What was implemented:**
1. ✅ Turnstile script loading in root layout (only loads if site key is configured)
2. ✅ Turnstile widget rendering in live-browser-demo component
3. ✅ Token state management and callback handling
4. ✅ Widget reset logic when session ends
5. ✅ Backend verification already in place in `/api/browserbase/create-session`
6. ✅ Environment variable configuration in wrangler.toml and .env.sample
7. ✅ Comprehensive setup documentation in `TURNSTILE_SETUP.md`

**To enable Turnstile:**
1. Go to Cloudflare Dashboard → **Turnstile**
2. Create a new site
3. Get your **Site Key** and **Secret Key**
4. Add to environment variables:
   - Local: Add to `.env.local`
   - Production: Add to Cloudflare Workers environment variables (see `TURNSTILE_SETUP.md`)
5. Update `wrangler.toml` with your site key
6. Deploy: `npm run cf:build && npm run cf:deploy`

**When to enable:**
- ✅ Before public announcement (recommended)
- ✅ After launch if you notice abuse
- ✅ When costs become a concern

**Documentation:** See `newWebsite/TURNSTILE_SETUP.md` for detailed setup instructions

---

## 📝 7. Testing Checklist

**Status:** ⚠️ TODO - Test before production

**Local Testing:**
```bash
cd newWebsite
npm run dev

# Test these features:
# - Homepage loads
# - All pages render correctly
# - Dark/light mode toggle works
# - Blog posts load
# - /mcp-b-playground loads (will fail without Browserbase keys)
```

**Cloudflare Preview Testing:**
```bash
cd newWebsite
npm run cf:build
npm run cf:preview

# Test in preview environment before deploying
```

**Production Testing (after deploy):**
- [ ] All pages load correctly
- [ ] Dark/light mode works
- [ ] Blog posts render
- [ ] Live demo at `/mcp-b-playground` works with extension
- [ ] SEO meta tags are correct
- [ ] Mobile responsiveness
- [ ] Performance (check Lighthouse scores)

---

## 📦 8. Build & Deployment Commands Reference

```bash
# Local development
npm run dev                # Standard dev server
npm run dev:turbopack      # Faster dev server with Turbopack

# Lint
npm run lint

# Cloudflare Workers deployment
npm run cf:build           # Build for Workers (REQUIRED before preview/deploy)
npm run cf:preview         # Preview locally with Wrangler
npm run cf:deploy          # Deploy to production
```

---

## 🚀 Quick Start Checklist

Use this for a quick deployment:

- [ ] **Step 1:** Set up Browserbase account
- [ ] **Step 2:** Upload MCP-B extension to Browserbase
- [ ] **Step 3:** Fill in `.env.local` with Browserbase credentials
- [ ] **Step 4:** Test locally: `npm run dev`
- [ ] **Step 5:** Create R2 buckets in Cloudflare
- [ ] **Step 6:** Add environment variables to Cloudflare Workers
- [ ] **Step 7:** Build: `npm run cf:build`
- [ ] **Step 8:** Deploy: `npm run cf:deploy`
- [ ] **Step 9:** Test live demo at production URL
- [ ] **Step 10:** Configure custom domain (optional)

---

## ❓ Common Issues & Solutions

### Issue: "Failed to create browser session" in live demo
**Solution:**
- Check Browserbase API key is correct
- Verify extension ID is set
- Ensure extension was uploaded to Browserbase
- Check Browserbase account credits/limits

### Issue: Build fails with OpenNext errors
**Solution:**
- Ensure you're in `newWebsite` directory
- Run `npm install` to update dependencies
- Clear `.next` and `.open-next` folders
- Try `npm run cf:build` again

### Issue: Environment variables not working in production
**Solution:**
- Verify secrets are set in Cloudflare Dashboard
- Use "Encrypt" for sensitive values
- Re-deploy after adding variables

### Issue: Custom domain not working
**Solution:**
- Ensure domain is in Cloudflare DNS
- Uncomment routes in `wrangler.toml`
- Wait for DNS propagation (up to 24 hours)
- Check Workers → Custom Domains settings

---

## 📚 Documentation References

- **Browserbase Docs:** https://www.browserbase.com/docs
- **Cloudflare Workers:** https://developers.cloudflare.com/workers/
- **Cloudflare R2:** https://developers.cloudflare.com/r2/
- **OpenNext Cloudflare:** https://opennext.js.org/cloudflare
- **Next.js 15 Docs:** https://nextjs.org/docs
- **MCP-B Docs:** See `mcp-b-docs-for-reference.txt`

---

## 🎯 Priority Order

1. **HIGH PRIORITY** - Required for live demo to work:
   - Upload extension to Browserbase
   - Set up environment variables
   - Deploy to Cloudflare Workers

2. **MEDIUM PRIORITY** - Required for production:
   - Create R2 buckets
   - Configure custom domain
   - Content migration
   - Testing

3. **LOW PRIORITY** - Nice to have:
   - Turnstile setup
   - Performance optimization
   - Analytics

---

**Last Updated:** November 6, 2025
**Working Directory:** `/home/user/mcp-b/newWebsite`
