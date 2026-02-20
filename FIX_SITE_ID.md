# Fix: Site ID Format Issue

## The Problem

Your `.env` file has:
```
VITE_WIX_SITE_ID=https://contacttemplegatew.wixstudio.com/templegateway
```

**This is wrong!** Site ID should be a GUID (like `abc123-def456-...`), not a URL.

## How to Find Your Real Site ID

### Method 1: From Wix Dashboard
1. Go to **Wix Settings** → **General** → **Site Details**
2. Look for **Site ID** - it's a GUID format (e.g., `abc12345-def6-7890-abcd-ef1234567890`)
3. Copy that GUID

### Method 2: From Wix API
1. Go to **Wix Settings** → **Developer Tools** → **API Keys**
2. When creating/viewing API keys, you'll see your Site ID

### Method 3: From URL (sometimes)
- The Site ID might be in your Wix site URL, but it's usually not the full URL
- It's typically a GUID format

## Update Your .env File

**Backend .env** (for server.js):
```env
WIX_API_KEY=IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0...
WIX_SITE_ID=your-actual-site-id-guid-here
PORT=3001
```

**Frontend .env** (for Vite):
```env
VITE_USE_PROXY=true
VITE_PROXY_URL=http://localhost:3001
```

**Important:**
- Site ID is a GUID, not a URL
- Format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- Keep API keys in backend `.env` only (not frontend)

## Quick Fix Steps

1. **Find your Site ID** (see methods above)
2. **Update backend `.env`** with correct Site ID
3. **Update frontend `.env`** to use proxy
4. **Restart both servers**
