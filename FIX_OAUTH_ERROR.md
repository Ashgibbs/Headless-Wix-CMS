# Fix: OAuth Error - Switching to API Key Authentication

## The Problem

You're getting this error:
```
Error: Failed to fetch tokens from OAuth API: appRuntimeKeys [at index 0] is invalid: appId is not a valid GUID
```

**Why this happens:**
- OAuth Strategy is for **user authentication** (when users log in)
- For **CMS data access** (reading/writing content), you need **API Keys**
- The Client ID you have is for OAuth apps, not for direct CMS access

## The Solution

We need to switch from OAuth to API Key authentication. Here's how:

### Step 1: Get Your API Key

1. Go to **Wix Settings** → **Developer Tools** → **API Keys**
2. Click **+ Create API Key**
3. Give it a name (e.g., "Temple Gateway CMS")
4. Select permissions:
   - **Read** access to your Collections:
     - `TempleandToursDB`
     - `Pilgrimage Packages DB`
5. Copy the **API Key** (not Client ID)

### Step 2: Get Your Site ID (Optional but Recommended)

1. Go to **Wix Settings** → **General** → **Site Details**
2. Copy your **Site ID** (it's a GUID like `abc123-def456-...`)

### Step 3: Update Your `.env` File

Replace your current `.env` file content with:

```env
VITE_WIX_API_KEY=your-actual-api-key-here
VITE_WIX_SITE_ID=your-site-id-here
```

**Important:**
- Use `VITE_WIX_API_KEY` (not `VITE_WIX_CLIENT_ID`)
- The API Key format is different from Client ID
- Site ID is optional but recommended for better performance

### Step 4: Restart Your Dev Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

### Step 5: Test Again

1. Visit `/pilgrimage` page
2. Check browser console - should see success messages
3. Check debug component - should show data count > 0

## What Changed in the Code

✅ Switched from `OAuthStrategy` to `ApiKeyStrategy`
✅ Changed environment variable from `VITE_WIX_CLIENT_ID` to `VITE_WIX_API_KEY`
✅ Added support for `VITE_WIX_SITE_ID` (optional)

## Security Note

⚠️ **Important:** API keys in frontend code are visible to users. For production:

1. **Option 1:** Create a backend API proxy that uses the API key
2. **Option 2:** Use OAuth with proper user authentication flow
3. **Option 3:** Accept that API keys are exposed (only if you've set proper permissions)

Since you only need **read** permissions for CMS data, exposing the API key is relatively safe, but not ideal for production.

## Still Getting Errors?

1. **"API Key is not configured"**
   → Check `.env` file has `VITE_WIX_API_KEY=...`
   → Restart dev server

2. **"Collection not found"**
   → Verify collection IDs match exactly
   → Check API key has read permissions for collections

3. **CORS errors**
   → API keys in frontend can cause CORS issues
   → Consider using a backend proxy

## Next Steps

Once API key is set up:
1. ✅ Update `.env` file
2. ✅ Restart dev server
3. ✅ Test on `/pilgrimage` page
4. ✅ Check console for success messages
5. ✅ Verify data appears on website
