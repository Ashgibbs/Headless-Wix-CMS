/**
 * Backend Proxy Server Example
 * 
 * This is a simple Express.js server that acts as a proxy between your frontend
 * and Wix CMS API, avoiding CORS issues.
 * 
 * To use this:
 * 1. Install dependencies: npm install express cors dotenv
 * 2. Create a .env file with: WIX_API_KEY=your-key, WIX_SITE_ID=your-site-id
 * 3. Run: node backend-proxy-example.js
 * 4. Update frontend to call http://localhost:3001/api/tours instead of Wix directly
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;

// Enable CORS for your frontend
app.use(cors({
  origin: 'http://localhost:8080', // Your frontend URL
  credentials: true
}));

app.use(express.json());

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
  console.log(`Backend proxy server running on http://localhost:${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  GET /api/tours`);
  console.log(`  GET /api/temples`);
});
