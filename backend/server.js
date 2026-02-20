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
    origin: "http://localhost:8080",
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

      return {
        id: item._id,
        name: f.title ?? "", // 🔥 IMPORTANT FIX
        duration: f.duration ?? "",
        state: f.state ?? "",
        zone: f.zone ?? "",
        placesCovered: typeof f.placesCovered === "string"
          ? f.placesCovered.split(",").map((p) => p.trim())
          : f.placesCovered ?? [],
        templesCovered: Number(f.templesCovered) || 0,
        inclusionsAndExclusions:
          f.inclusionsAndExclusions ?? "",
        itenary: f.itenary ?? "", // 🔥 MATCHING YOUR FIELD ID
        slug:
          f.slug ??
          f.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ??
          "",
      };
    });

    res.json(tours);
  } catch (error) {
    console.error("Tours Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ---------------- START SERVER ----------------

app.listen(PORT, () => {
  console.log(`\n✅ Backend running at http://localhost:${PORT}`);
});