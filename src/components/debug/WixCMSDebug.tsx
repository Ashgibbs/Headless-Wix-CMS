import { useCMSTours, useCMSTemples } from '@/hooks/useWixCMS';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Debug component to check Wix CMS connection
 * Add this temporarily to your pages to debug
 */
export function WixCMSDebug() {
  const { tours, isLoading: toursLoading, error: toursError, refetch: refetchTours } = useCMSTours();
  const { temples, isLoading: templesLoading, error: templesError, refetch: refetchTemples } = useCMSTemples();

  const isWixConfigured = !!import.meta.env.VITE_WIX_API_KEY;

  return (
    <Card className="m-4 border-2 border-yellow-500 bg-yellow-50">
      <CardHeader>
        <CardTitle>🔍 Wix CMS Debug Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <strong>Wix API Key Configured:</strong>{' '}
          {isWixConfigured ? '✅ Yes' : '❌ No'}
          {isWixConfigured && import.meta.env.VITE_WIX_API_KEY && (
            <span className="ml-2 text-xs text-gray-500">
              ({import.meta.env.VITE_WIX_API_KEY.substring(0, 20)}...)
            </span>
          )}
        </div>

        <div>
          <strong>Temples:</strong>
          <ul className="ml-4 mt-2">
            <li>Loading: {templesLoading ? '⏳ Yes' : '✅ No'}</li>
            <li>Count: {temples.length}</li>
            <li>Error: {templesError ? `❌ ${String(templesError)}` : '✅ None'}</li>
            <li>
              <Button size="sm" onClick={() => refetchTemples()} className="mt-2">
                Refresh Temples
              </Button>
            </li>
          </ul>
        </div>

        <div>
          <strong>Pilgrimage Packages:</strong>
          <ul className="ml-4 mt-2">
            <li>Loading: {toursLoading ? '⏳ Yes' : '✅ No'}</li>
            <li>Count: {tours.length}</li>
            <li>Error: {toursError ? `❌ ${String(toursError)}` : '✅ None'}</li>
            <li>
              <Button size="sm" onClick={() => refetchTours()} className="mt-2">
                Refresh Tours
              </Button>
            </li>
          </ul>
        </div>

        {tours.length > 0 && (
          <div>
            <strong>Tour Names:</strong>
            <ul className="ml-4 mt-2 list-disc">
              {tours.map((tour) => (
                <li key={tour.id}>{tour.name}</li>
              ))}
            </ul>
          </div>
        )}

        {temples.length > 0 && (
          <div>
            <strong>Temple Names (first 5):</strong>
            <ul className="ml-4 mt-2 list-disc">
              {temples.slice(0, 5).map((temple) => (
                <li key={temple.id}>{temple.name}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
