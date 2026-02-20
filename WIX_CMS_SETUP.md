# Wix CMS Integration Setup Guide

This guide will help you connect your Wix CMS to your Temple Gateway website so that data entered in Wix CMS reflects on your frontend.

## Prerequisites

- A Wix account with a CMS plan
- Access to your Wix site's developer settings
- Your website project set up locally

## Step 1: Set Up Collections in Wix CMS

### 1.1 Create "Temples" Collection

1. Log in to your Wix account and go to your site's dashboard
2. Navigate to **Content Manager** → **Collections**
3. Click **+ New Collection** and name it `Temples`
4. Add the following fields to your collection:

| Field Name | Field Type | Required |
|------------|------------|----------|
| name | Text | Yes |
| deity | Text | Yes |
| deityName | Text | No |
| otherDeity | Text | No |
| famousFor | Text | No |
| district | Text | Yes |
| state | Text | Yes |
| latitude | Number (Decimal) | Yes |
| longitude | Number (Decimal) | Yes |
| content | Rich Text | No |
| slug | Text | No (auto-generated) |
| imageUrl | Image | No |
| galleryImages | Gallery | No |
| videoUrl | URL | No |

### 1.2 Create "PilgrimagePackages" Collection

1. Create another collection named `PilgrimagePackages`
2. Add the following fields:

| Field Name | Field Type | Required |
|------------|------------|----------|
| name | Text | Yes |
| slug | Text | No (auto-generated) |
| duration | Text | Yes |
| days | Number | Yes |
| nights | Number | Yes |
| groupSize | Text | No |
| rating | Number (Decimal) | No |
| description | Text | Yes |
| longDescription | Rich Text | No |
| templesCount | Number | No |
| citiesCovered | Text (Multi-line) | No |
| highlights | Text (Multi-line) | No |
| inclusions | Text (Multi-line) | No |
| itinerary | Reference (to Itinerary collection) or JSON | No |
| imageUrl | Image | No |
| galleryImages | Gallery | No |
| videoUrl | URL | No |

**Note:** For `citiesCovered`, `highlights`, and `inclusions`, you can enter them as comma-separated values or line-separated values. The code will handle both formats.

## Step 2: Get Your Wix Client ID (OAuth App)

1. Go to **Settings** → **Developer Tools** → **OAuth Apps**
2. Click **+ Create App**
3. Give it a name (e.g., "Temple Gateway CMS")
4. Select permissions:
   - **Read** access to your Collections (Temples and PilgrimagePackages)
5. Copy the **Client ID** (you'll need this in the next step)
   - Format: `f3c8af61-a10e-456f-b38e-deb64c1d09df`

## Step 3: Configure Your Website

### 3.1 Create Environment File

1. In your project root, create a `.env` file (copy from `.env.example` if it exists)
2. Add your Wix Client ID:

```env
VITE_WIX_CLIENT_ID=f3c8af61-a10e-456f-b38e-deb64c1d09df
```

**Important:** 
- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- Replace the example Client ID with your actual Client ID from Wix

### 3.2 Verify Collection Names

The code expects these exact collection IDs (not display names):
- `Temples` (or your actual collection ID)
- `PilgrimagePackagesDB` (or your actual collection ID)

**Important:** Use the Collection ID, not the display name. You can find the Collection ID in Wix CMS:
1. Go to Content Manager → Collections
2. Click on your collection
3. Look at the URL or collection settings for the ID

If you used different collection IDs, update them in `src/services/wixCMS.ts`:

```typescript
export const COLLECTIONS = {
  TEMPLES: 'YourTempleCollectionID',
  TOURS: 'PilgrimagePackagesDB', // Your actual collection ID
} as const;
```

## Step 4: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Add some test data in Wix CMS:
   - Go to your Wix Content Manager
   - Add a temple entry with all required fields
   - Save it

3. Check your website:
   - The temple should appear on your `/temples` page
   - If it doesn't appear immediately, wait a few seconds (caching) or refresh

4. Check browser console:
   - Open Developer Tools (F12)
   - Look for any errors related to Wix CMS
   - If you see "Wix API Key is not configured", check your `.env` file

## Step 5: Data Management

### Adding/Editing Data

**Important:** With Wix CMS integration, you should manage your data through the Wix CMS dashboard, not through the website's admin panel.

1. **To add temples:**
   - Go to Wix CMS → Temples collection
   - Click **+ New Item**
   - Fill in all fields
   - Click **Save**

2. **To edit temples:**
   - Go to Wix CMS → Temples collection
   - Click on the temple you want to edit
   - Make changes
   - Click **Save**

3. **To add pilgrimage packages:**
   - Go to Wix CMS → PilgrimagePackages collection
   - Follow the same process as temples

### Data Sync

- Changes in Wix CMS will automatically reflect on your website
- The website caches data for 5 minutes to improve performance
- To force a refresh, users can refresh the page
- The code automatically falls back to initial data if Wix CMS is unavailable

## Troubleshooting

### Data Not Appearing

1. **Check Client ID:**
   - Verify `VITE_WIX_CLIENT_ID` is set in `.env`
   - Restart your dev server after adding/changing `.env`
   - Ensure the Client ID format is correct (e.g., `f3c8af61-a10e-456f-b38e-deb64c1d09df`)

2. **Check Collection IDs:**
   - Ensure collection IDs match exactly: `Temples` and `PilgrimagePackagesDB` (or your actual IDs)
   - Check for typos or case sensitivity issues
   - Use Collection IDs, not display names

3. **Check Field Names:**
   - Verify field names in Wix CMS match the expected names
   - Field names are case-sensitive

4. **Check Permissions:**
   - Ensure your OAuth app has read permissions for the collections
   - Verify the Client ID is correct and hasn't been revoked

5. **Check Browser Console:**
   - Open Developer Tools (F12)
   - Look for error messages
   - Check Network tab for failed API requests

### Common Errors

**Error: "Wix Client ID is not configured"**
- Solution: Add `VITE_WIX_CLIENT_ID` to your `.env` file and restart the dev server
- Make sure you're using the Client ID from OAuth Apps, not an API Key

**Error: "Collection not found"**
- Solution: Verify collection names match exactly in Wix CMS and in `wixCMS.ts`

**Error: "Failed to fetch from Wix CMS"**
- Solution: Check your internet connection and Wix OAuth app permissions
- Verify your Client ID is correct and has read permissions for the collections
- Check browser console for detailed error messages
- The app will fall back to initial data automatically

## Advanced Configuration

### Custom Collection Names

If you want to use different collection names, update `src/services/wixCMS.ts`:

```typescript
export const COLLECTIONS = {
  TEMPLES: 'YourCustomName',
  TOURS: 'YourCustomTourName',
} as const;
```

### Cache Duration

To change how long data is cached, update the `staleTime` in `src/hooks/useCMSData.ts`:

```typescript
staleTime: 5 * 60 * 1000, // Change to your preferred duration in milliseconds
```

### Site ID (if required)

Some Wix plans may require a Site ID. If needed, add it to `.env`:

```env
VITE_WIX_SITE_ID=your-site-id-here
```

You can find your Site ID in Wix Settings → General → Site Details.

## Migration from LocalStorage

If you were previously using localStorage for data management:

1. Export your existing data using the Export function in the admin panel
2. Import it into Wix CMS manually or use Wix's import feature
3. Once data is in Wix CMS, remove the old localStorage data (optional)

## Support

For issues with:
- **Wix CMS:** Check [Wix Developer Documentation](https://dev.wix.com/docs/go-headless)
- **Integration:** Check browser console for error messages
- **Data Structure:** Verify field names and types match the expected format

## Next Steps

1. ✅ Set up collections in Wix CMS
2. ✅ Get API key and configure `.env`
3. ✅ Test with sample data
4. ✅ Migrate existing data to Wix CMS
5. ✅ Start managing content through Wix CMS dashboard

Your website is now connected to Wix CMS! Any changes you make in Wix CMS will automatically appear on your website.
