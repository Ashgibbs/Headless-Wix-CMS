import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Temple } from '@/data/temples';

// Fix for default marker icons in Leaflet with bundlers
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface TempleMapProps {
  temples: Temple[];
  selectedTemple?: Temple | null;
  onTempleSelect?: (temple: Temple) => void;
}

const TempleMap = ({ temples, selectedTemple, onTempleSelect }: TempleMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    // Create map centered on India
    mapRef.current = L.map(mapContainer.current, {
      center: [20.5937, 78.9629], // Center of India [lat, lng]
      zoom: 5,
      scrollWheelZoom: true,
    });

    // Add OpenStreetMap tiles (completely free)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Add/update markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Custom icon for temples
    const createTempleIcon = (isSelected: boolean) => L.divIcon({
      className: 'custom-temple-marker',
      html: `
        <div style="
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: ${isSelected ? 'hsl(var(--primary))' : 'hsl(24, 95%, 43%)'};
          border: 3px solid white;
          box-shadow: 0 3px 10px rgba(0,0,0,0.3);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        ">
          <span style="color: white; font-size: 14px;">🛕</span>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14],
    });

    // Add markers for each temple
    temples.forEach(temple => {
      if (temple.latitude && temple.longitude) {
        const isSelected = selectedTemple?.id === temple.id;
        
        const marker = L.marker([temple.latitude, temple.longitude], {
          icon: createTempleIcon(isSelected),
        }).addTo(mapRef.current!);

        // Add popup
        const popupContent = `
          <div style="font-family: 'Lora', serif; padding: 8px; min-width: 180px;">
            <h3 style="font-family: 'Cinzel', serif; font-weight: 600; font-size: 14px; margin: 0 0 6px 0; color: hsl(24, 95%, 43%);">
              ${temple.name}
            </h3>
            <p style="font-size: 12px; color: #666; margin: 0;">
              ${temple.deity} • ${temple.state}
            </p>
            ${temple.famousFor ? `<p style="font-size: 11px; color: #888; margin: 6px 0 0 0; font-style: italic;">${temple.famousFor}</p>` : ''}
          </div>
        `;
        
        marker.bindPopup(popupContent, {
          closeButton: true,
          className: 'temple-popup',
        });

        // Handle click
        marker.on('click', () => {
          onTempleSelect?.(temple);
        });

        // Hover effects
        marker.on('mouseover', () => {
          marker.openPopup();
        });

        markersRef.current.push(marker);
      }
    });
  }, [temples, selectedTemple, onTempleSelect]);

  // Fly to selected temple
  useEffect(() => {
    if (mapRef.current && selectedTemple && selectedTemple.latitude && selectedTemple.longitude) {
      mapRef.current.flyTo([selectedTemple.latitude, selectedTemple.longitude], 12, {
        duration: 1.5,
      });
      
      // Open popup for selected temple
      const selectedMarker = markersRef.current.find((_, index) => 
        temples[index]?.id === selectedTemple.id
      );
      if (selectedMarker) {
        selectedMarker.openPopup();
      }
    }
  }, [selectedTemple, temples]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-card">
      <div ref={mapContainer} className="absolute inset-0 z-0" />
    </div>
  );
};

export default TempleMap;
