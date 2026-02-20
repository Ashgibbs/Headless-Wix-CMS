# Setup Backend Proxy - Fix CORS and MetaSite Errors

## The Problem

You're getting two errors:
1. **CORS Error**: Browser blocks API key requests
2. **MetaSite not found**: Site ID is required but causes CORS

**Solution**: Use a backend proxy server

## Quick Setup (5 minutes)

### Step 1: Install Backend Dependencies

```bash
npm install express cors dotenv @wix/sdk @wix/data
```

### Step 2: Create Backend Server File

Create `server.js` in your project root:

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for your frontend
app.use(cors({
  origin: 'http://localhost:8080', // Your Vite dev server
  credentials: true
}));

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Proxy endpoint for tours
app.get('/api/tours', async (req, res) => {
  try {
    const { createClient, ApiKeyStrategy } = require('@wix/sdk');
    const { items } = require('@wix/data');

    const client = createClient({
      modules: { items },
      auth: ApiKeyStrategy({
        apiKey: process.env.WIX_API_KEY,
        siteId: process.env.WIX_SITE_ID,
      }),
    });

    const dataItemsList = await client.items.query('Pilgrimage Packages DB').find();
    
    const tours = dataItemsList.items.map((item) => {
      const fields = item.data || {};
      return {
        id: item._id || item.data?._id || Date.now(),
        name: fields.name || '',
        slug: fields.slug || fields.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '',
        duration: fields.duration || '',
        days: parseInt(fields.days) || 0,
        nights: parseInt(fields.nights) || 0,
        groupSize: fields.groupSize || '',
        rating: parseFloat(fields.rating) || 0,
        description: fields.description || '',
        longDescription: fields.longDescription || fields.description || '',
        templesCount: parseInt(fields.templesCount) || 0,
        citiesCovered: Array.isArray(fields.citiesCovered) ? fields.citiesCovered : (fields.citiesCovered ? fields.citiesCovered.split(',').filter(Boolean) : []),
        highlights: Array.isArray(fields.highlights) ? fields.highlights : (fields.highlights ? fields.highlights.split('\n').filter(Boolean) : []),
        inclusions: Array.isArray(fields.inclusions) ? fields.inclusions : (fields.inclusions ? fields.inclusions.split('\n').filter(Boolean) : []),
        imageUrl: fields.imageUrl || fields.mainImage?.[0]?.url || '',
        galleryImages: fields.galleryImages || fields.gallery?.map((img) => img.url || img) || [],
        videoUrl: fields.videoUrl || '',
      };
    });

    res.json(tours);
  } catch (error) {
    console.error('Error fetching tours:', error);
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint for temples
app.get('/api/temples', async (req, res) => {
  try {
    const { createClient, ApiKeyStrategy } = require('@wix/sdk');
    const { items } = require('@wix/data');

    const client = createClient({
      modules: { items },
      auth: ApiKeyStrategy({
        apiKey: process.env.WIX_API_KEY,
        siteId: process.env.WIX_SITE_ID,
      }),
    });

    const dataItemsList = await client.items.query('TempleandToursDB').find();
    
    const temples = dataItemsList.items.map((item) => {
      const fields = item.data || {};
      return {
        id: item._id || item.data?._id || Date.now(),
        name: fields.name || '',
        deity: fields.deity || '',
        deityName: fields.deityName || '',
        otherDeity: fields.otherDeity || '',
        famousFor: fields.famousFor || '',
        district: fields.district || '',
        state: fields.state || '',
        latitude: parseFloat(fields.latitude) || 0,
        longitude: parseFloat(fields.longitude) || 0,
        content: fields.content || '',
        slug: fields.slug || fields.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '',
        imageUrl: fields.imageUrl || fields.mainImage?.[0]?.url || '',
        galleryImages: fields.galleryImages || fields.gallery?.map((img) => img.url || img) || [],
        videoUrl: fields.videoUrl || '',
      };
    });

    res.json(temples);
  } catch (error) {
    console.error('Error fetching temples:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend proxy server running on http://localhost:${PORT}`);
  console.log(`📡 Endpoints:`);
  console.log(`   GET /api/tours`);
  console.log(`   GET /api/temples`);
  console.log(`   GET /health`);
});
```

### Step 3: Create Backend .env File

Create `.env.server` or add to your existing `.env`:

```env
# Backend server config (for server.js)
WIX_API_KEY=your-api-key-here
WIX_SITE_ID=your-site-id-here
PORT=3001
```

**Important**: Keep API keys in backend `.env`, NOT in frontend `.env`

### Step 4: Update Frontend .env

Update your frontend `.env`:

```env
# Frontend config (for Vite)
VITE_USE_PROXY=true
VITE_PROXY_URL=http://localhost:3001
```

### Step 5: Add Script to package.json

Add this to your `package.json` scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "server": "node server.js",
    "dev:all": "concurrently \"npm run server\" \"npm run dev\""
  }
}
```

Install concurrently (optional, to run both servers):
```bash
npm install --save-dev concurrently
```

### Step 6: Run Both Servers

**Option A: Two terminals**
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend  
npm run dev
```

**Option B: One command** (if you installed concurrently)
```bash
npm run dev:all
```

### Step 7: Test

1. Visit `http://localhost:8080/pilgrimage`
2. Check browser console - should see success!
3. Check backend terminal - should see API calls

## How It Works

```
Frontend (Browser) 
    ↓ (fetch request)
Backend Proxy (Node.js)
    ↓ (API Key + Site ID)
Wix API
    ↓ (data)
Backend Proxy
    ↓ (JSON response)
Frontend (Browser)
```

**Benefits:**
- ✅ No CORS issues (backend makes the request)
- ✅ API keys stay secure (not exposed to browser)
- ✅ Site ID works properly
- ✅ Production-ready solution

## Troubleshooting

**Backend won't start:**
- Check Node.js version (need 18+)
- Verify dependencies installed
- Check `.env` file has correct values

**Frontend can't connect:**
- Verify backend is running on port 3001
- Check `VITE_PROXY_URL` matches backend URL
- Check CORS origin matches frontend URL

**Still getting errors:**
- Check backend console for detailed errors
- Verify API key and Site ID are correct
- Check collection names match exactly

## Production Deployment

For production:
1. Deploy backend to a server (Heroku, Railway, etc.)
2. Update `VITE_PROXY_URL` to production backend URL
3. Keep API keys in backend environment variables
4. Never expose API keys in frontend code
