# CORS Error Solution Guide

## The Problem

Wix API blocks direct API key access from browsers due to CORS (Cross-Origin Resource Sharing) restrictions. This is a security feature.

## Solutions (Choose One)

### Solution 1: Remove Site ID (Quick Test)

I've updated the code to try without Site ID first. This might work for some operations.

**Try this first:**
1. Make sure your `.env` only has:
   ```env
   VITE_WIX_API_KEY=your-api-key
   ```
2. Remove or comment out `VITE_WIX_SITE_ID`
3. Restart dev server
4. Test again

### Solution 2: Backend Proxy (Recommended for Production)

Create a simple backend server that uses the API key and proxies requests.

**Steps:**

1. **Create backend server** (see `backend-proxy-example.js`)

2. **Install dependencies:**
   ```bash
   npm install express cors dotenv @wix/sdk @wix/data
   ```

3. **Create backend `.env`:**
   ```env
   WIX_API_KEY=your-api-key
   WIX_SITE_ID=your-site-id
   PORT=3001
   ```

4. **Run backend:**
   ```bash
   node backend-proxy-example.js
   ```

5. **Update frontend `.env`:**
   ```env
   VITE_USE_PROXY=true
   VITE_PROXY_URL=http://localhost:3001
   ```

6. **Restart frontend dev server**

### Solution 3: Use Wix REST API Directly (Alternative)

Instead of SDK, use REST API with fetch. Still might have CORS issues, but worth trying.

**Update `src/services/wixCMS.ts`:**

```typescript
export async function fetchTours() {
  try {
    const apiKey = import.meta.env.VITE_WIX_API_KEY;
    const siteId = import.meta.env.VITE_WIX_SITE_ID;
    
    const response = await fetch('https://www.wixapis.com/wix-data/v2/items/query', {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dataCollectionId: COLLECTIONS.TOURS,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    // Transform data...
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

**Note:** This will likely still have CORS issues, but worth trying.

### Solution 4: Use Vite Proxy (Development Only)

Configure Vite to proxy requests to Wix API.

**Update `vite.config.ts`:**

```typescript
export default defineConfig({
  // ... existing config
  server: {
    proxy: {
      '/api/wix': {
        target: 'https://www.wixapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/wix/, ''),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // Add API key header
            const apiKey = process.env.VITE_WIX_API_KEY;
            if (apiKey) {
              proxyReq.setHeader('Authorization', apiKey);
            }
          });
        },
      },
    },
  },
});
```

## Recommended Approach

**For Development:**
- Try Solution 1 first (remove Site ID)
- If that doesn't work, use Solution 4 (Vite proxy)

**For Production:**
- Use Solution 2 (Backend proxy) - most secure and reliable

## Testing

After applying a solution:

1. Restart dev server
2. Check browser console
3. Visit `/pilgrimage` page
4. Look for success messages
5. Verify data appears

## Current Status

I've updated the code to:
- ✅ Try without Site ID first (may help with CORS)
- ✅ Support proxy mode (if you set up backend)
- ✅ Better error logging

Try Solution 1 first, then move to Solution 2 if needed.
