import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { createClient, ApiKeyStrategy } from "@wix/sdk";
import { items } from "@wix/data";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// ---------------- LOAD ENV ----------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, "..", ".env") });

const WIX_API_KEY =
  process.env.WIX_API_KEY || process.env.VITE_WIX_API_KEY;
const WIX_SITE_ID =
  process.env.WIX_SITE_ID || process.env.VITE_WIX_SITE_ID;

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

// ---------------- WIX CLIENT ----------------

function getWixClient() {
  if (!WIX_API_KEY || !WIX_SITE_ID) {
    throw new Error("Missing Wix credentials in .env");
  }

  return createClient({
    modules: { items },
    auth: ApiKeyStrategy({
      apiKey: WIX_API_KEY,
      siteId: WIX_SITE_ID,
    }),
  });
}

// ---------------- WIX IMAGE EXTRACTOR ----------------
function getWixImageUrl(wixUrl) {
  if (!wixUrl) return "";
  if (typeof wixUrl !== "string") return "";
  if (wixUrl.startsWith("http")) return wixUrl;
  if (wixUrl.startsWith("wix:image://v1/")) {
    const parts = wixUrl.split("/");
    if (parts.length >= 4) {
      const uri = parts[3];
      return `https://static.wixstatic.com/media/${uri}`;
    }
  }
  return wixUrl;
}

// ---------------- SAFE FIELD EXTRACTOR ----------------

function extractFields(item) {
  return item.data && Object.keys(item.data).length > 0
    ? item.data
    : item;
}

// =====================================================
// ================= TEMPLES API =======================
// =====================================================

app.get("/api/temples", async (req, res) => {
  try {
    const client = getWixClient();

    const result = await client.items
      .query("TempleandToursDB")
      .find();

    const temples = result.items.map((item) => {
      const f = extractFields(item);

      return {
        id: item._id,
        name: f.name ?? "",
        deity: f.deity ?? "",
        deityName: f.deity_name_in_temple ?? "",
        otherDeity: f.other_deity ?? "",
        famousFor: f.famous_for ?? "",
        openTime: f.open_time ?? "",
        belief: f.belief ?? "",
        address1: f.address1 ?? "",
        address2: f.address2 ?? "",
        town: f.town ?? "",
        district: f.district ?? "",
        state: f.state ?? "",
        country: f.country ?? "",
        pincode: f.pincode ?? "",
        latitude: Number(f.latitude) || 0,
        longitude: Number(f.longitude) || 0,
        content: f.content ?? "",
        // Media fields
        imageUrl: getWixImageUrl(f.image_fld), // 🔥 UPDATED TO MATCH WIX FIELD ID "image_fld"
        slug:
          f.slug ??
          f.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ??
          "",
      };
    });

    res.json(temples);
  } catch (error) {
    console.error("Temples Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/temples/:idOrSlug", async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const client = getWixClient();
    const isNumeric = !isNaN(Number(idOrSlug));

    const result = await client.items
      .query("TempleandToursDB")
      .eq(isNumeric ? "_id" : "slug", String(idOrSlug))
      .find();

    if (result.items.length === 0) {
      return res.status(404).json({ error: "Temple not found" });
    }

    const item = result.items[0];
    const f = extractFields(item);

    res.json({
      id: item._id,
      name: f.name ?? "",
      deity: f.deity ?? "",
      deityName: f.deity_name_in_temple ?? "",
      otherDeity: f.other_deity ?? "",
      famousFor: f.famous_for ?? "",
      openTime: f.open_time ?? "",
      belief: f.belief ?? "",
      address1: f.address1 ?? "",
      address2: f.address2 ?? "",
      town: f.town ?? "",
      district: f.district ?? "",
      state: f.state ?? "",
      country: f.country ?? "",
      pincode: f.pincode ?? "",
      latitude: Number(f.latitude) || 0,
      longitude: Number(f.longitude) || 0,
      content: f.content ?? "",
      imageUrl: getWixImageUrl(f.image_fld),
      slug: f.slug ?? f.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ?? "",
    });
  } catch (error) {
    console.error("Temple Detail Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// =====================================================
// ================= TOURS API =========================
// =====================================================

app.get("/api/tours", async (req, res) => {
  try {
    const client = getWixClient();

    const result = await client.items
      .query("PilgrimagePackagesDB")
      .find();

    const tours = result.items.map((item) => {
      const f = extractFields(item);

      console.log("Raw Wix Item Data:", f);
      return {
        id: item._id,
        name: f.title || f.name || "",
        imageUrl: getWixImageUrl(f.image),
        duration: f.duration || "",
        state: f.state || "",
        zone: f.zone || "",
        description: f.description || "",
        placesCovered: typeof f.placesCovered === "string"
          ? f.placesCovered.split(",").map((p) => p.trim())
          : f.placesCovered ?? [],
        citiesCovered: Array.isArray(f.citiesCovered) ? f.citiesCovered : (f.citiesCovered ? f.citiesCovered.split(',').filter(Boolean) : []),
        templesCovered: (f.templesCovered) || 0,
        templesCount: parseInt(f.templeCount || f.templesCount || f.templesCovered) || 0,
        inclusionsAndExclusions: f.inclusionsAndExclusions || "",
        itenary: f.itenary || "",
        itinerary: Array.isArray(f.itinerary) ? f.itinerary.map((it) => ({
          day: parseInt(it.day) || 0,
          title: it.title || "",
          description: it.description || "",
          temples: Array.isArray(it.temples) ? it.temples : (it.temples ? it.temples.split(',').filter(Boolean) : []),
          cities: Array.isArray(it.cities) ? it.cities : (it.cities ? it.cities.split(',').filter(Boolean) : []),
        })) : [],
        slug:
          f.slug ||
          (f.title || f.name)?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
          "",
      };
    });

    res.json(tours);
  } catch (error) {
    console.error("Tours Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/tours/:idOrSlug", async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const client = getWixClient();
    const isNumeric = !isNaN(Number(idOrSlug));

    const result = await client.items
      .query("PilgrimagePackagesDB")
      .eq(isNumeric ? "_id" : "slug", String(idOrSlug))
      .find();

    if (result.items.length === 0) {
      return res.status(404).json({ error: "Tour not found" });
    }

    const item = result.items[0];
    const f = extractFields(item);

    res.json({
      id: item._id,
      name: f.title || f.name || "",
      imageUrl: getWixImageUrl(f.image),
      duration: f.duration || "",
      days: parseInt(f.days) || 0,
      nights: parseInt(f.nights) || 0,
      groupSize: f.groupSize || "",
      rating: parseFloat(f.rating) || 0,
      state: f.state || "",
      zone: f.zone || "",
      description: f.description || "",
      longDescription: f.longDescription || f.description || "",
      placesCovered: typeof f.placesCovered === "string"
        ? f.placesCovered.split(",").map((p) => p.trim())
        : f.placesCovered ?? [],
      citiesCovered: Array.isArray(f.citiesCovered) ? f.citiesCovered : (f.citiesCovered ? f.citiesCovered.split(',').filter(Boolean) : []),
      templesCovered: Number(f.templesCovered) || 0,
      templesCount: parseInt(f.templeCount || f.templesCount || f.templesCovered) || 0,
      highlights: Array.isArray(f.highlights) ? f.highlights : (f.highlights ? f.highlights.split('\n').filter(Boolean) : []),
      inclusions: Array.isArray(f.inclusions) ? f.inclusions : (f.inclusions ? f.inclusions.split('\n').filter(Boolean) : []),
      inclusionsAndExclusions: f.inclusionsAndExclusions || "",
      itenary: f.itenary || "",
      itinerary: Array.isArray(f.itinerary) ? f.itinerary.map((it) => ({
        day: parseInt(it.day) || 0,
        title: it.title || "",
        description: it.description || "",
        temples: Array.isArray(it.temples) ? it.temples : (it.temples ? it.temples.split(',').filter(Boolean) : []),
        cities: Array.isArray(it.cities) ? it.cities : (it.cities ? it.cities.split(',').filter(Boolean) : []),
      })) : [],
      slug: f.slug || (f.title || f.name)?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "",
    });
  } catch (error) {
    console.error("Tour Detail Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ---------------- START SERVER ----------------

app.listen(PORT, () => {
  console.log(`\n✅ Backend running at http://localhost:${PORT}`);
});