import { items } from '@wix/data';
import { createClient, ApiKeyStrategy } from '@wix/sdk';

// Initialize Wix SDK
let wixClient: ReturnType<typeof createClient> | null = null;

/**
 * Initialize Wix client with API key strategy
 * For headless CMS data access, use ApiKeyStrategy instead of OAuthStrategy
 * Note: API keys in frontend may cause CORS issues - consider using a backend proxy
 */
export function initializeWixClient(apiKey: string, siteId?: string) {
  if (!wixClient) {
    // Site ID is REQUIRED for Wix API to work (MetaSite not found error without it)
    // However, this causes CORS issues in browser - use backend proxy instead
    const authConfig: any = { apiKey };
    if (siteId) {
      authConfig.siteId = siteId;
    } else {
      console.warn('⚠️ Site ID not provided. API calls may fail with "MetaSite not found" error.');
      console.warn('💡 Solution: Use a backend proxy or provide VITE_WIX_SITE_ID in .env');
    }
    
    wixClient = createClient({
      modules: { items },
      auth: ApiKeyStrategy(authConfig),
    });
  }
  return wixClient;
}

/**
 * Get Wix client instance
 */
export function getWixClient() {
  if (!wixClient) {
    const apiKey = import.meta.env.VITE_WIX_API_KEY;
    const siteId = import.meta.env.VITE_WIX_SITE_ID;
    
    if (!apiKey) {
      throw new Error('Wix API Key is not configured. Please set VITE_WIX_API_KEY in your .env file');
    }

    if (!siteId) {
      throw new Error('Wix Site ID is not configured. Please set VITE_WIX_SITE_ID (GUID) in your .env file');
    }

    // Common misconfig: users paste their site URL instead of the metasite GUID
    if (siteId.startsWith('http://') || siteId.startsWith('https://')) {
      throw new Error(
        `VITE_WIX_SITE_ID must be a GUID (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx), not a URL. Received: ${siteId}`
      );
    }
    
    wixClient = initializeWixClient(apiKey, siteId);
  }
  return wixClient;
}

/**
 * Collection names in Wix CMS
 * These should match your collection IDs in Wix CMS
 */
export const COLLECTIONS = {
  TEMPLES: 'TempleandToursDB', // Your Wix CMS collection ID
  TOURS: 'PilgrimagePackagesDB', // Your Wix CMS collection ID (note: spaces are preserved)
} as const;

/**
 * Example: Query data items from a collection
 * const dataItemsList = await myWixClient.items.query('PilgrimagePackagesDB').find();
 * console.log('My Data Items:');
 * console.log('Total: ', dataItemsList.items.length);
 * console.log(dataItemsList.items
 *   .map((item) => item.data._id)
 *   .join('\n')
 * );
 */

/**
 * Fetch all temples from Wix CMS
 */
export async function fetchTemples() {
  try {
    // Browsers can't call Wix APIs with ApiKeyStrategy due to CORS.
    // Use the local proxy when enabled.
    if (import.meta.env.VITE_USE_PROXY === 'true') {
      console.log('🔄 Using proxy to fetch temples...');
      const { fetchTemplesFromProxy } = await import('./wixCMSProxy');
      return await fetchTemplesFromProxy();
    }

    console.log('⚠️ Direct Wix API call (may fail due to CORS)...');
    const client = getWixClient();
    // Query data items using the query() method
    const dataItemsList = await client.items.query(COLLECTIONS.TEMPLES).find();
    
    console.log('Temples Data Items:');
    console.log('Total: ', dataItemsList.items.length);
    
    return dataItemsList.items.map((item: any) => {
      // Extract field values from Wix data item structure
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
        galleryImages: fields.galleryImages || fields.gallery?.map((img: any) => img.url || img) || [],
        videoUrl: fields.videoUrl || '',
      };
    });
  } catch (error) {
    console.error('Error fetching temples from Wix CMS:', error);
    throw error;
  }
}

/**
 * Fetch a single temple by ID or slug
 */
export async function fetchTempleById(idOrSlug: string | number) {
  try {
    const client = getWixClient();
    const isNumeric = !isNaN(Number(idOrSlug));
    
    // Query with filter to find specific item
    const dataItemsList = await client.items
      .query(COLLECTIONS.TEMPLES)
      .eq(isNumeric ? '_id' : 'slug', String(idOrSlug))
      .find();
    
    if (dataItemsList.items.length === 0) {
      return null;
    }
    
    const item = dataItemsList.items[0];
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
      galleryImages: fields.galleryImages || fields.gallery?.map((img: any) => img.url || img) || [],
      videoUrl: fields.videoUrl || '',
    };
  } catch (error) {
    console.error('Error fetching temple from Wix CMS:', error);
    throw error;
  }
}

/**
 * Fetch all tours/pilgrimage packages from Wix CMS
 */
export async function fetchTours() {
  try {
    // Browsers can't call Wix APIs with ApiKeyStrategy due to CORS.
    // Use the local proxy when enabled.
    if (import.meta.env.VITE_USE_PROXY === 'true') {
      console.log('🔄 Using proxy to fetch tours...');
      const { fetchToursFromProxy } = await import('./wixCMSProxy');
      return await fetchToursFromProxy();
    }

    console.log('⚠️ Direct Wix API call (may fail due to CORS)...');
    const client = getWixClient();
    const collectionId = COLLECTIONS.TOURS;
    
    console.log('🔍 Fetching tours from Wix CMS...');
    console.log('📦 Collection ID:', collectionId);
    
    // Query data items using the query() method
    const dataItemsList = await client.items.query(collectionId).find();
    
    console.log('✅ Pilgrimage Packages Data Items:');
    console.log('📊 Total: ', dataItemsList.items.length);
    console.log('📋 Item IDs:', dataItemsList.items
      .map((item) => item.data?._id || item._id)
      .join(', ')
    );
    console.log('📝 Item Names:', dataItemsList.items
      .map((item) => item.data?.name || 'No name')
      .join(', ')
    );
    console.log('🔍 Full Response:', dataItemsList);
    
    return dataItemsList.items.map((item: any) => {
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
        itinerary: Array.isArray(fields.itinerary) ? fields.itinerary.map((it: any) => ({
          day: parseInt(it.day) || 0,
          title: it.title || '',
          description: it.description || '',
          temples: Array.isArray(it.temples) ? it.temples : (it.temples ? it.temples.split(',').filter(Boolean) : []),
          cities: Array.isArray(it.cities) ? it.cities : (it.cities ? it.cities.split(',').filter(Boolean) : []),
        })) : [],
        imageUrl: fields.imageUrl || fields.mainImage?.[0]?.url || '',
        galleryImages: fields.galleryImages || fields.gallery?.map((img: any) => img.url || img) || [],
        videoUrl: fields.videoUrl || '',
      };
    });
  } catch (error) {
    console.error('Error fetching tours from Wix CMS:', error);
    throw error;
  }
}

/**
 * Fetch a single tour by ID or slug
 */
export async function fetchTourById(idOrSlug: string | number) {
  try {
    const client = getWixClient();
    const isNumeric = !isNaN(Number(idOrSlug));
    
    // Query with filter to find specific item
    const dataItemsList = await client.items
      .query(COLLECTIONS.TOURS)
      .eq(isNumeric ? '_id' : 'slug', String(idOrSlug))
      .find();
    
    if (dataItemsList.items.length === 0) {
      return null;
    }
    
    const item = dataItemsList.items[0];
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
      itinerary: Array.isArray(fields.itinerary) ? fields.itinerary.map((it: any) => ({
        day: parseInt(it.day) || 0,
        title: it.title || '',
        description: it.description || '',
        temples: Array.isArray(it.temples) ? it.temples : (it.temples ? it.temples.split(',').filter(Boolean) : []),
        cities: Array.isArray(it.cities) ? it.cities : (it.cities ? it.cities.split(',').filter(Boolean) : []),
      })) : [],
      imageUrl: fields.imageUrl || fields.mainImage?.[0]?.url || '',
      galleryImages: fields.galleryImages || fields.gallery?.map((img: any) => img.url || img) || [],
      videoUrl: fields.videoUrl || '',
    };
  } catch (error) {
    console.error('Error fetching tour from Wix CMS:', error);
    throw error;
  }
}
