# Browserbase Live Extension Setup Guide

> **⚠️ DEPRECATED:** The `/mcp-b-playground` page and Browserbase live demo feature have been removed from this website. For a live demo of MCP-B, please visit [mcp-ui.mcp-b.ai](https://mcp-ui.mcp-b.ai).
>
> This documentation is kept for reference purposes only.

This guide walks you through setting up the live browser demo with your MCP-B Chrome extension using Browserbase.

## Overview

The live demo allows visitors to try your Chrome extension in a real browser session embedded on your website. The implementation includes:

- **Live Browser Sessions**: Real Chrome instances with your extension pre-loaded
- **Interactive Controls**: Switch between view-only and interactive modes
- **Privacy-First**: No session recording or logging
- **Abuse Protection**: Optional Cloudflare Turnstile integration
- **Auto-Cleanup**: Sessions automatically end after 15 minutes

## Architecture

```
Visitor clicks "Start Demo"
         ↓
/api/browserbase/create-session
         ↓
Browserbase API creates session with extension
         ↓
Returns Live View URL
         ↓
<iframe> embeds the live browser session
```

## Prerequisites

1. **Browserbase Account**: Sign up at https://www.browserbase.com/
2. **Chrome Extension**: Your extension must be:
   - Manifest V3
   - Under 100 MB when zipped
   - Have content scripts (toolbar-only UIs won't be visible)
3. **Cloudflare Account**: For deployment and optional Turnstile

---

## Step 1: Upload Your Extension to Browserbase

### 1.1 Build Your Extension

If using Plasmo or similar:
```bash
npm run build -- --zip
# Output: build/chrome-mv3-prod.zip
```

### 1.2 Upload to Browserbase

```bash
curl --request POST \
  --url https://www.browserbase.com/v1/extensions \
  --header 'Content-Type: multipart/form-data' \
  --header "X-BB-API-Key: YOUR_API_KEY" \
  --form "file=@build/chrome-mv3-prod.zip"
```

**Response:**
```json
{
  "id": "ext_abc123...",
  "name": "your-extension.zip",
  "status": "uploaded"
}
```

Save the `id` - this is your `BROWSERBASE_EXTENSION_ID`.

### 1.3 Get Your Browserbase Credentials

From the Browserbase dashboard:
- **API Key**: Settings → API Keys
- **Project ID**: Projects → Your Project → ID

---

## Step 2: Configure Environment Variables

### 2.1 Local Development

Edit `.env.local` (already created):

```env
NEXT_PUBLIC_WEBSITE_URL=http://localhost:3000

# Browserbase - REQUIRED
BROWSERBASE_API_KEY=bb_live_abc123...
BROWSERBASE_PROJECT_ID=proj_xyz789...
BROWSERBASE_EXTENSION_ID=ext_abc123...
BB_REGION=us-east-1

# Turnstile (Optional - recommended for production)
TURNSTILE_SECRET_KEY=0x...
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x...
```

**Region Options:**
- `us-east-1` - US East Coast
- `us-west-2` - US West Coast
- `eu-central-1` - Europe
- `ap-southeast-1` - Asia Pacific

Choose the region closest to your users for best performance.

### 2.2 Production Deployment (Cloudflare Workers)

**Public Variables** (add to `wrangler.toml` or dashboard):
```toml
[vars]
NEXT_PUBLIC_WEBSITE_URL = "https://mcp-b.ai"
NEXT_PUBLIC_TURNSTILE_SITE_KEY = "0x..." # Optional
```

**Secret Variables** (add via Cloudflare Dashboard):

1. Go to: **Cloudflare Dashboard → Workers & Pages → mcp-b → Settings → Variables**
2. Add these as **encrypted secrets**:

```
BROWSERBASE_API_KEY
BROWSERBASE_PROJECT_ID
BROWSERBASE_EXTENSION_ID
BB_REGION
TURNSTILE_SECRET_KEY  # Optional
```

---

## Step 3: Turnstile Setup (Optional but Recommended)

Turnstile prevents abuse and is free with unlimited requests.

### 3.1 Get Turnstile Keys

1. Go to: https://dash.cloudflare.com/?to=/:account/turnstile
2. Create a new site
3. Get your **Site Key** (public) and **Secret Key** (private)

### 3.2 Add Turnstile to the Component

The `LiveBrowserDemo` component already has Turnstile support built in. To enable it:

1. Add the keys to your environment variables
2. The component will automatically use them if present
3. Add the Turnstile script to your layout (optional - for advanced widget customization)

---

## Step 4: Test Locally

### 4.1 Install Dependencies

```bash
cd /home/user/mcp-b/newWebsite
npm install
```

### 4.2 Run Development Server

```bash
npm run dev
```

### 4.3 Visit the Demo

Open: http://localhost:3000/mcp-b-playground

1. Click **"Start Live Demo"**
2. Wait for session to initialize (~5-10 seconds)
3. Browser session loads with your extension pre-installed
4. Toggle **Interactive Mode** to control the browser
5. Click **End Session** when done

---

## Step 5: Deploy to Cloudflare Workers

### 5.1 Build for Cloudflare

```bash
npm run cf:build
```

### 5.2 Preview Locally with Wrangler

```bash
npm run cf:preview
```

Test at the local URL provided (usually http://localhost:8787)

### 5.3 Deploy to Production

```bash
npm run cf:deploy
```

### 5.4 Add Environment Variables

If not already added, go to Cloudflare Dashboard and add all the secret variables listed in Step 2.2.

---

## Step 6: Extension Preparation Tips

### 6.1 Content Script Requirements

Live View shows the webpage, not Chrome's toolbar. Your extension should:

✅ **Use content scripts** to inject UI into the page
✅ **Show overlay/in-page UI** that's visible in the viewport
❌ **Avoid toolbar-only popups** (users won't see them)

### 6.2 Demo Experience

Consider:
- Pre-navigating to a known demo site
- Auto-activating your extension's features
- Providing clear visual indicators the extension is working
- Testing with `host_permissions` for your demo domains

### 6.3 Example Extension Pattern

```javascript
// content-script.js
// Inject visible UI into the page
const banner = document.createElement('div');
banner.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; ...';
banner.textContent = 'MCP-B Extension Active';
document.body.appendChild(banner);
```

---

## File Structure

```
newWebsite/
├── app/
│   ├── api/
│   │   └── browserbase/
│   │       ├── create-session/
│   │       │   └── route.ts          ← Session creation API
│   │       └── end-session/
│   │           └── route.ts          ← Session cleanup API
│   └── mcp-b-playground/
│       └── page.tsx                  ← Demo page
├── components/
│   └── live-browser-demo.tsx         ← Main demo component
├── .env.local                        ← Local env (gitignored)
├── .env.sample                       ← Template with docs
└── wrangler.toml                     ← Cloudflare config
```

---

## Troubleshooting

### Session Creation Fails

**Error: "Failed to create browser session"**
- ✅ Check `BROWSERBASE_API_KEY` is correct
- ✅ Check `BROWSERBASE_PROJECT_ID` exists
- ✅ Check `BROWSERBASE_EXTENSION_ID` is uploaded
- ✅ View Cloudflare Workers logs for detailed error

### Extension Not Visible

**Extension seems inactive in live session**
- ✅ Ensure extension uses **content scripts**
- ✅ Check `host_permissions` in manifest.json
- ✅ Test extension locally in Chrome first
- ✅ Verify extension uploaded successfully to Browserbase

### High Latency

**Browser session is slow/laggy**
- ✅ Change `BB_REGION` to be closer to your users
- ✅ Browserbase has regions in US, EU, and APAC
- ✅ Test different regions to find optimal performance

### Iframe Not Loading

**Iframe shows blank or error**
- ✅ Check browser console for CSP errors
- ✅ Verify `sandbox` attributes on iframe
- ✅ Check Browserbase session status via API
- ✅ Ensure debuggerFullscreenUrl is correct

### Turnstile Validation Failing

**"Turnstile verification failed"**
- ✅ Check `TURNSTILE_SECRET_KEY` is correct
- ✅ Verify site key matches domain (localhost vs production)
- ✅ Check Cloudflare Turnstile dashboard for errors

---

## API Reference

### POST /api/browserbase/create-session

**Request:**
```json
{
  "turnstileToken": "optional_token" // Optional if Turnstile enabled
}
```

**Response (Success):**
```json
{
  "sessionId": "sess_abc123",
  "liveViewUrl": "https://www.browserbase.com/...",
  "status": "RUNNING"
}
```

**Response (Error):**
```json
{
  "error": "Failed to create browser session"
}
```

### POST /api/browserbase/end-session

**Request:**
```json
{
  "sessionId": "sess_abc123"
}
```

**Response:**
```json
{
  "success": true
}
```

---

## Cost Considerations

### Browserbase Pricing

- Typical session: ~$0.05-0.10 (15 min max)
- Usage tracked per session duration
- Free tier available (check Browserbase pricing)

### Abuse Prevention

- **Turnstile**: Free, unlimited
- **Session timeout**: Auto-cleanup after 15 min
- **No recording**: `recordSession: false` saves costs
- **Rate limiting**: Consider adding if needed

---

## Security Checklist

✅ API keys stored as Cloudflare secrets (not in code)
✅ Turnstile server-side validation
✅ `recordSession: false` for privacy
✅ `logSession: false` for privacy
✅ Session timeout (15 minutes)
✅ Iframe sandbox attributes
✅ `keepAlive: false` for auto-cleanup
✅ CORS headers properly configured

---

## Next Steps

1. **Add Navigation Link**: Update your navbar to include `/mcp-b-playground`
2. **Customize Extension Experience**: Pre-navigate to a demo site
3. **Add Analytics**: Track demo usage (respecting privacy)
4. **Monitor Costs**: Watch Browserbase usage in dashboard
5. **A/B Test**: Test different regions for performance

---

## Resources

- **Browserbase Docs**: https://docs.browserbase.com/
- **Extension Upload**: https://docs.browserbase.com/guides/browser-extensions
- **Live View**: https://docs.browserbase.com/guides/live-view
- **Cloudflare Turnstile**: https://developers.cloudflare.com/turnstile/
- **OpenNext Cloudflare**: https://opennext.js.org/cloudflare

---

## Support

If you encounter issues:

1. Check Cloudflare Workers logs: `wrangler tail`
2. Check Browserbase dashboard for session status
3. Review browser console for client-side errors
4. Test API routes directly with curl/Postman

---

**Ready to go!** 🚀

Visit `/mcp-b-playground` to see your live demo in action!
