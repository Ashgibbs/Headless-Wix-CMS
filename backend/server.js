import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { createClient, ApiKeyStrategy } from '@wix/sdk';
import { items } from '@wix/data';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env from project root (where package.json is)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '..', '.env') });

// Support both WIX_* and VITE_WIX_* env vars (for shared .env)
const WIX_API_KEY = process.env.WIX_API_KEY || process.env.VITE_WIX_API_KEY;
const WIX_SITE_ID = process.env.WIX_SITE_ID || process.env.VITE_WIX_SITE_ID;

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

app.use(express.json());

// ---------------- HEALTH CHECK ----------------

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend proxy is running' });
});

// ---------------- CREATE WIX CLIENT ----------------

function getWixClient() {
  if (!WIX_API_KEY || !WIX_SITE_ID) {
    console.error('❌ Missing credentials:');
    console.error('   WIX_API_KEY:', WIX_API_KEY ? '✅ Set' : '❌ Missing');
    console.error('   WIX_SITE_ID:', WIX_SITE_ID ? '✅ Set' : '❌ Missing');
    throw new Error("WIX_API_KEY or WIX_SITE_ID missing in .env file. Backend needs these to connect to Wix CMS.");
  }

  return createClient({
    modules: { items },
    auth: ApiKeyStrategy({
      apiKey: WIX_API_KEY,
      siteId: WIX_SITE_ID,
    }),
  });
}

// ---------------- TOURS API ----------------

app.get('/api/tours', async (req, res) => {
  try {
    const client = getWixClient();

    console.log('🔍 Fetching tours...');
    const result = await client.items
      .query('PilgrimagePackagesDB') // make sure this is correct Collection ID
      .find();

    console.log(`✅ Found ${result.items.length} tours`);

    const tours = result.items.map((item) => {
      // Wix returns data in item.data object
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
    console.error('❌ Tours error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorDetails = error instanceof Error && 'details' in error ? error.details : null;
    
    res.status(500).json({ 
      error: errorMessage,
      details: errorDetails,
      message: 'Failed to fetch tours from Wix CMS. Check backend logs for details.'
    });
  }
});

// ---------------- TEMPLES API ----------------

app.get('/api/temples', async (req, res) => {
  try {
    const client = getWixClient();

    console.log('🔍 Fetching temples...');
    const result = await client.items
      .query('TempleandToursDB') // make sure this is correct Collection ID
      .find();

    console.log(`✅ Found ${result.items.length} temples`);

    const temples = result.items.map((item) => {
      // Wix returns data in item.data object
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
    console.error('❌ Temples error:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorDetails = error instanceof Error && 'details' in error ? error.details : null;
    
    res.status(500).json({ 
      error: errorMessage,
      details: errorDetails,
      message: 'Failed to fetch temples from Wix CMS. Check backend logs for details.'
    });
  }
});

// ---------------- START SERVER ----------------

app.listen(PORT, () => {
  console.log(`\n✅ Backend running at http://localhost:${PORT}`);
  console.log(`GET /health`);
  console.log(`GET /api/tours`);
  console.log(`GET /api/temples\n`);
});
