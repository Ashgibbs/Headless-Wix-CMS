# Testing Wix CMS Integration

Follow these steps to test if your Wix CMS integration is working correctly.

## Prerequisites Checklist

- [ ] Created `.env` file in project root
- [ ] Added `VITE_WIX_CLIENT_ID` to `.env` file
- [ ] Created collections in Wix CMS: `TemplesDB` and `Pilgrimage Packages DB`
- [ ] Added at least one test item to each collection in Wix CMS
- [ ] OAuth App has read permissions for both collections

## Step 1: Verify Environment Setup

1. **Check your `.env` file exists** in the project root (same folder as `package.json`)
2. **Verify it contains:**
   ```env
   VITE_WIX_CLIENT_ID=your-actual-client-id-here
   ```
   Replace `your-actual-client-id-here` with your actual Client ID from Wix

3. **Restart your development server** (important!)
   ```bash
   # Stop the server (Ctrl+C) and restart:
   npm run dev
   ```

## Step 2: Add Test Data in Wix CMS

### For TemplesDB Collection:

1. Go to Wix CMS → Content Manager → TemplesDB
2. Click **+ New Item**
3. Add a test temple with these fields (minimum required):
   - **name**: "Test Temple"
   - **deity**: "Shiva"
   - **district**: "Test District"
   - **state**: "Test State"
   - **latitude**: 12.9716 (or any valid number)
   - **longitude**: 77.5946 (or any valid number)
4. Click **Save**

### For Pilgrimage Packages DB Collection:

1. Go to Wix CMS → Content Manager → Pilgrimage Packages DB
2. Click **+ New Item**
3. Add a test package with these fields:
   - **name**: "Test Tour Package"
   - **duration**: "3 Days / 2 Nights"
   - **days**: 3
   - **nights**: 2
   - **description**: "This is a test pilgrimage package"
4. Click **Save**

## Step 3: Test in Browser Console

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Open your website** in the browser (usually `http://localhost:8080`)

3. **Open Browser Developer Tools:**
   - Press `F12` or `Right-click → Inspect`
   - Go to the **Console** tab

4. **Check for errors:**
   - Look for any red error messages
   - Common errors:
     - "Wix Client ID is not configured" → Check your `.env` file
     - "Collection not found" → Check collection names match exactly
     - Network errors → Check internet connection and Wix permissions

5. **Look for success messages:**
   - You should see console logs like:
     ```
     Temples Data Items:
     Total: 1
     ```
     ```
     Pilgrimage Packages Data Items:
     Total: 1
     ```

## Step 4: Test on Website Pages

### Test Temples Page:

1. Navigate to `/temples` page on your website
2. **Expected result:**
   - Your test temple from Wix CMS should appear in the list
   - If you see "Test Temple" in the list, it's working! ✅

### Test Pilgrimage Page:

1. Navigate to `/pilgrimage` page on your website
2. **Expected result:**
   - Your test package from Wix CMS should appear
   - If you see "Test Tour Package", it's working! ✅

## Step 5: Verify Data Structure

The code expects specific field names in your Wix collections. Verify these match:

### TemplesDB Collection Fields:
- `name` (Text) - Required
- `deity` (Text) - Required
- `deityName` (Text) - Optional
- `otherDeity` (Text) - Optional
- `famousFor` (Text) - Optional
- `district` (Text) - Required
- `state` (Text) - Required
- `latitude` (Number) - Required
- `longitude` (Number) - Required
- `content` (Rich Text) - Optional
- `slug` (Text) - Optional (auto-generated if missing)
- `imageUrl` (Image) - Optional
- `galleryImages` (Gallery) - Optional
- `videoUrl` (URL) - Optional

### Pilgrimage Packages DB Collection Fields:
- `name` (Text) - Required
- `slug` (Text) - Optional (auto-generated if missing)
- `duration` (Text) - Required
- `days` (Number) - Required
- `nights` (Number) - Required
- `groupSize` (Text) - Optional
- `rating` (Number) - Optional
- `description` (Text) - Required
- `longDescription` (Rich Text) - Optional
- `templesCount` (Number) - Optional
- `citiesCovered` (Text or Multi-line) - Optional
- `highlights` (Text or Multi-line) - Optional
- `inclusions` (Text or Multi-line) - Optional
- `itinerary` (Reference or JSON) - Optional
- `imageUrl` (Image) - Optional
- `galleryImages` (Gallery) - Optional
- `videoUrl` (URL) - Optional

## Troubleshooting

### Issue: "Wix Client ID is not configured"
**Solution:**
1. Check `.env` file exists in project root
2. Verify `VITE_WIX_CLIENT_ID=your-client-id` is in the file
3. Restart dev server after adding/changing `.env`

### Issue: "Collection not found" or Empty Results
**Solution:**
1. Verify collection names match exactly:
   - `TemplesDB` (case-sensitive, no spaces)
   - `Pilgrimage Packages DB` (with spaces exactly as shown)
2. Check collection IDs in Wix CMS (not display names)
3. Verify OAuth app has read permissions

### Issue: Data Not Appearing on Website
**Solution:**
1. Check browser console for errors
2. Verify test data exists in Wix CMS
3. Wait a few seconds and refresh (5-minute cache)
4. Check field names match expected names (case-sensitive)

### Issue: Field Values Are Empty
**Solution:**
1. Verify field names in Wix CMS match exactly (case-sensitive)
2. Check field types match (Text, Number, etc.)
3. Ensure required fields have values

## Quick Test Script

You can also test directly in the browser console:

```javascript
// Test fetching temples
fetch('/api/temples') // Adjust based on your API setup
  .then(r => r.json())
  .then(data => console.log('Temples:', data))
  .catch(err => console.error('Error:', err));
```

Or check React Query cache:
1. Open React DevTools (if installed)
2. Check Query cache for `['wix-temples']` and `['wix-tours']`

## Success Indicators

✅ **Everything is working if:**
- No errors in browser console
- Test data appears on `/temples` page
- Test data appears on `/pilgrimage` page
- Console shows "Total: X" where X > 0
- Data updates when you add new items in Wix CMS (after cache expires)

## Next Steps After Testing

Once everything works:
1. Add your real temple data to Wix CMS
2. Add your real pilgrimage packages to Wix CMS
3. Remove test data
4. Start managing content through Wix CMS dashboard

---

**Need Help?** Check the browser console for detailed error messages. Most issues are related to:
- Missing or incorrect Client ID
- Collection name mismatches
- Missing field names or incorrect field types
- OAuth app permissions
