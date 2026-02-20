# Quick Test Guide - Wix CMS Integration

## ✅ What You've Done:
- ✅ Created collections: `TemplesDB` and `Pilgrimage Packages DB`
- ✅ Set up Client ID in `.env`

## 🚀 Quick Test Steps:

### 1. Verify Your `.env` File
Make sure you have a `.env` file in your project root with:
```env
VITE_WIX_CLIENT_ID=your-actual-client-id-here
```

### 2. Restart Your Dev Server
```bash
# Stop current server (Ctrl+C) and run:
npm run dev
```

### 3. Add Test Data in Wix CMS

**In TemplesDB collection:**
- Add one temple with: name, deity, district, state, latitude, longitude

**In Pilgrimage Packages DB collection:**
- Add one package with: name, duration, days, nights, description

### 4. Check Browser Console
1. Open your website (usually `http://localhost:8080`)
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. Look for:
   - ✅ Success: "Temples Data Items: Total: X" (where X > 0)
   - ✅ Success: "Pilgrimage Packages Data Items: Total: X"
   - ❌ Error: Check error message and fix accordingly

### 5. Check Your Website Pages
- Visit `/temples` - should show your test temple
- Visit `/pilgrimage` - should show your test package

## 🔍 Common Issues:

**"Wix Client ID is not configured"**
→ Check `.env` file exists and has `VITE_WIX_CLIENT_ID=...`
→ Restart dev server

**Empty results or "Collection not found"**
→ Verify collection names match exactly:
   - `TemplesDB` (no spaces)
   - `Pilgrimage Packages DB` (with spaces)
→ Check OAuth app has read permissions

**Data not appearing**
→ Check browser console for errors
→ Verify test data exists in Wix CMS
→ Wait 5 minutes or refresh page (caching)

## 📝 Collection Names Updated:
The code now uses:
- `TemplesDB` for temples
- `Pilgrimage Packages DB` for tours

If your collection IDs are different, update them in `src/services/wixCMS.ts` line 40-41.
