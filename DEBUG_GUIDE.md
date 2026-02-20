# Debug Guide: Wix CMS Not Showing Data

## Quick Debugging Steps

### Step 1: Check Browser Console
1. Open your website
2. Press `F12` to open Developer Tools
3. Go to **Console** tab
4. Look for these messages:

**✅ Success Messages:**
```
🔍 Fetching tours from Wix CMS...
📦 Collection ID: Pilgrimage Packages DB
✅ Pilgrimage Packages Data Items:
📊 Total: X (where X > 0)
📝 Item Names: [your package names]
```

**❌ Error Messages:**
- "Wix Client ID is not configured" → Check `.env` file
- "Collection not found" → Check collection name matches exactly
- Network errors → Check OAuth permissions

### Step 2: Use Debug Component
The debug component is now added to your `/pilgrimage` page. It shows:
- ✅/❌ Wix Client ID status
- Loading state
- Data count
- Errors (if any)
- Refresh button

**To see it:**
1. Visit `/pilgrimage` page
2. Look for the yellow debug box at the top
3. Click "Refresh Tours" button to force reload

### Step 3: Verify Collection Name
**Critical:** Collection names must match EXACTLY (case-sensitive, including spaces)

Current settings in code:
- Temples: `TempleandToursDB`
- Tours: `Pilgrimage Packages DB` (note the spaces!)

**To verify:**
1. Go to Wix CMS → Content Manager
2. Check the exact collection ID (not display name)
3. Update `src/services/wixCMS.ts` line 40-41 if different

### Step 4: Check Data in Wix CMS
1. Go to Wix CMS → Content Manager → Pilgrimage Packages DB
2. Verify:
   - ✅ At least one item exists
   - ✅ Required fields are filled:
     - `name` (Text)
     - `duration` (Text)
     - `days` (Number)
     - `nights` (Number)
     - `description` (Text)

### Step 5: Check OAuth Permissions
1. Go to Wix Settings → Developer Tools → OAuth Apps
2. Click on your app
3. Verify:
   - ✅ Has read permissions for "Pilgrimage Packages DB" collection
   - ✅ Client ID matches your `.env` file

### Step 6: Force Refresh
The data is cached for 5 minutes. To see new data immediately:

**Option 1: Use Refresh Button**
- Click the "🔄 Refresh Data" button on `/pilgrimage` page

**Option 2: Browser Console**
```javascript
// Open browser console (F12) and run:
window.location.reload(true);
```

**Option 3: Clear Cache**
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

## Common Issues & Solutions

### Issue 1: "Total: 0" in Console
**Possible causes:**
- Collection name mismatch
- No data in Wix CMS
- OAuth permissions missing

**Solution:**
1. Check collection name matches exactly: `Pilgrimage Packages DB`
2. Verify data exists in Wix CMS
3. Check OAuth app permissions

### Issue 2: Data Shows in Console but Not on Page
**Possible causes:**
- Data structure mismatch
- Missing required fields
- Caching issue

**Solution:**
1. Check console logs for "Item Names" - do they show?
2. Verify field names match exactly (case-sensitive)
3. Click refresh button or wait 5 minutes

### Issue 3: "Collection not found" Error
**Solution:**
1. Verify collection ID in Wix CMS (not display name)
2. Check for typos or extra spaces
3. Update `COLLECTIONS.TOURS` in `src/services/wixCMS.ts`

### Issue 4: Old Data Still Showing
**Solution:**
- Data is cached for 5 minutes
- Click "Refresh Data" button
- Or wait 5 minutes for cache to expire

## Testing Checklist

- [ ] `.env` file exists with `VITE_WIX_CLIENT_ID`
- [ ] Dev server restarted after adding `.env`
- [ ] Collection name matches exactly: `Pilgrimage Packages DB`
- [ ] At least one item exists in Wix CMS
- [ ] Required fields filled in Wix CMS
- [ ] OAuth app has read permissions
- [ ] Browser console shows "Total: X" where X > 0
- [ ] Debug component shows data count > 0
- [ ] Refresh button works

## What to Check in Console

When you open browser console, you should see:

```
🔍 Fetching tours from Wix CMS...
📦 Collection ID: Pilgrimage Packages DB
✅ Pilgrimage Packages Data Items:
📊 Total: 1
📋 Item IDs: [some-id]
📝 Item Names: Your Package Name
🔍 Full Response: [object with items array]
```

If you see "Total: 0", check:
1. Collection name
2. Data exists in Wix CMS
3. OAuth permissions

## Still Not Working?

1. **Check the exact error** in browser console
2. **Verify collection ID** - it might be different from display name
3. **Test with a simple item** - add one with just required fields
4. **Check network tab** - see if API calls are being made
5. **Verify Client ID** - make sure it's correct in `.env`

## Remove Debug Component Later

Once everything works, remove the debug component from `src/pages/Pilgrimage.tsx`:
- Remove: `import { WixCMSDebug } from "@/components/debug/WixCMSDebug";`
- Remove: `<WixCMSDebug />` line
