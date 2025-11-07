# Cloudflare Turnstile Setup Guide

This guide explains how to set up Cloudflare Turnstile for bot protection on the MCP-B live demo.

## What is Cloudflare Turnstile?

Cloudflare Turnstile is a user-friendly CAPTCHA alternative that helps protect your application from bots and abuse. It provides a seamless verification experience that's invisible to most users while effectively blocking automated attacks.

## Why Use Turnstile for MCP-B?

The live browser demo at `/mcp-b-playground` creates real browser sessions via Browserbase, which can be expensive if abused. Turnstile helps prevent:

- **Automated abuse** - Bots repeatedly creating sessions
- **Resource exhaustion** - Malicious actors draining your Browserbase credits
- **Cost overruns** - Unexpected spikes in browser session costs

**When to Enable:**
- ✅ Before public launch or announcement
- ✅ After noticing suspicious usage patterns
- ✅ When costs become a concern
- ⚠️ Optional for development and testing

## How It Works

1. **User visits the live demo** - Turnstile widget appears before "Start Live Demo" button
2. **Automatic verification** - Turnstile verifies the user in the background (usually invisible)
3. **Token generation** - On success, a token is generated and sent with the API request
4. **Backend verification** - The server validates the token with Cloudflare before creating a browser session
5. **Session created** - If verification passes, the browser session is created

## Setup Instructions

### Step 1: Create a Turnstile Site

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Turnstile** in the left sidebar
3. Click **Add Site**
4. Configure your site:
   - **Site name:** MCP-B Live Demo
   - **Domain:** `mcp-b.ai` (or your domain)
   - **Widget Mode:** Managed (recommended)
5. Click **Create**

### Step 2: Get Your Keys

After creating the site, you'll receive:
- **Site Key** (public) - Used in the frontend
- **Secret Key** (private) - Used in the backend

### Step 3: Configure Local Development

1. Copy `.env.sample` to `.env.local` if you haven't already:
   ```bash
   cp .env.sample .env.local
   ```

2. Add your Turnstile keys to `.env.local`:
   ```bash
   # Cloudflare Turnstile (Optional - for abuse protection)
   TURNSTILE_SECRET_KEY=your_actual_secret_key_here
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_actual_site_key_here
   ```

3. Save the file

### Step 4: Configure Production (Cloudflare Workers)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages**
3. Select your **mcp-b** worker
4. Go to **Settings** → **Variables**
5. Add the following variables:

   **Encrypted Secrets:**
   - Name: `TURNSTILE_SECRET_KEY`
   - Value: Your Turnstile secret key
   - Check: ✅ Encrypt

   **Environment Variables:**
   - Name: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - Value: Your Turnstile site key
   - Type: Text (no encryption needed)

6. Click **Save**

### Step 5: Update wrangler.toml

In your `newWebsite/wrangler.toml`, uncomment and add your site key:

```toml
[vars]
NEXT_PUBLIC_WEBSITE_URL = "https://mcp-b.ai"
NEXT_PUBLIC_TURNSTILE_SITE_KEY = "your_turnstile_site_key_here"
```

**Note:** Only add the public site key here. The secret key should be added via the Cloudflare Dashboard as described in Step 4.

### Step 6: Test Locally

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000/mcp-b-playground`

3. You should see:
   - The Turnstile widget appear below the description
   - A verification challenge (or automatic verification)
   - After verification, the "Start Live Demo" button becomes clickable

4. Click "Start Live Demo" and verify:
   - The browser session starts successfully
   - Check the browser console for any errors

### Step 7: Deploy to Production

1. Build and deploy:
   ```bash
   npm run cf:build
   npm run cf:deploy
   ```

2. Test on your production URL

## Implementation Details

### Frontend (live-browser-demo.tsx)

The Turnstile widget is conditionally rendered:

```tsx
{state === "idle" && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
  <div className="mt-8 flex justify-center">
    <div
      className="cf-turnstile"
      data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
      data-callback="onTurnstileSuccess"
      data-theme="dark"
    ></div>
  </div>
)}
```

**Key Points:**
- Only renders if `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is configured
- Uses dark theme to match the MCP-B design
- Calls `onTurnstileSuccess` callback when verification completes

### Backend (api/browserbase/create-session/route.ts)

The API route verifies the token:

```typescript
if (process.env.TURNSTILE_SECRET_KEY && turnstileToken) {
  const verifyResponse = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: turnstileToken,
      }),
    }
  );

  const verifyResult = await verifyResponse.json();
  if (!verifyResult.success) {
    return NextResponse.json(
      { error: "Turnstile verification failed" },
      { status: 400 }
    );
  }
}
```

**Key Points:**
- Verification only happens if both `TURNSTILE_SECRET_KEY` and `turnstileToken` are present
- If verification fails, the session creation is blocked
- If no secret key is configured, Turnstile is bypassed (for development)

## Disabling Turnstile

To disable Turnstile (e.g., for local development without bot protection):

1. **Local:** Remove or comment out the Turnstile keys in `.env.local`
2. **Production:** Remove the variables from Cloudflare Workers settings

The application will work normally without Turnstile - the widget simply won't appear.

## Troubleshooting

### Issue: Turnstile widget not appearing

**Possible causes:**
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is not set
- Turnstile script failed to load
- Browser blocking the script (ad blockers, privacy extensions)

**Solution:**
1. Check browser console for errors
2. Verify environment variable is set: `console.log(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY)`
3. Temporarily disable ad blockers
4. Check Network tab for failed script loads

### Issue: "Turnstile verification failed" error

**Possible causes:**
- Invalid secret key
- Token expired (tokens are single-use)
- Network issues reaching Cloudflare API

**Solution:**
1. Verify `TURNSTILE_SECRET_KEY` is correct in your environment
2. Check server logs for detailed error messages
3. Ensure your server can reach `challenges.cloudflare.com`

### Issue: Widget appears but doesn't verify

**Possible causes:**
- Incorrect site key
- Domain mismatch (site key is bound to specific domains)
- Browser compatibility issues

**Solution:**
1. Verify `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is correct
2. Check that your domain matches the Turnstile site configuration
3. Test in a different browser
4. Check Cloudflare Turnstile dashboard for analytics

### Issue: Works locally but not in production

**Possible causes:**
- Environment variables not set in Cloudflare Workers
- Site key domain restrictions

**Solution:**
1. Double-check all environment variables in Cloudflare Dashboard
2. Ensure your production domain is added to the Turnstile site configuration
3. Re-deploy after adding variables: `npm run cf:deploy`

## Testing Checklist

Before marking Turnstile as complete, verify:

- [ ] Widget appears on `/mcp-b-playground` page when idle
- [ ] Verification completes (automatically or with challenge)
- [ ] Token is sent to the API endpoint
- [ ] Backend successfully verifies the token
- [ ] Browser session is created after verification
- [ ] Widget resets when session ends
- [ ] Error handling works (try with invalid keys)
- [ ] Works without Turnstile keys (for development)
- [ ] Production deployment has correct environment variables

## Additional Resources

- **Cloudflare Turnstile Docs:** https://developers.cloudflare.com/turnstile/
- **Turnstile Dashboard:** https://dash.cloudflare.com/?to=/:account/turnstile
- **Turnstile Widget Options:** https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/
- **Turnstile API Reference:** https://developers.cloudflare.com/turnstile/get-started/server-side-validation/

## Cost Considerations

Cloudflare Turnstile is **free** for most use cases:
- ✅ **Free:** Up to 1 million verifications per month
- ✅ **Free:** No credit card required
- 💰 **Paid:** Enterprise features available if needed

This is much more cost-effective than paying for abused Browserbase sessions!

## Security Best Practices

1. **Never commit secret keys** - Always use environment variables
2. **Use encrypted secrets** - In Cloudflare Dashboard, check "Encrypt" for `TURNSTILE_SECRET_KEY`
3. **Rotate keys periodically** - Generate new keys every few months
4. **Monitor usage** - Check Cloudflare Turnstile dashboard for suspicious patterns
5. **Configure domain restrictions** - Limit site key to your production domains

---

**Status:** ✅ Turnstile is now fully configured and ready to use!

If you encounter issues, refer to the troubleshooting section or check the Cloudflare Turnstile documentation.
