import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Temple, temples as initialTemples } from '@/data/temples';
import { Tour, tours as initialTours } from '@/data/tours';

// Initialize with existing data if localStorage is empty
export function useCMSTemples() {
  const [temples, setTemples] = useLocalStorage<Temple[]>('cms_temples', initialTemples);

  const addTemple = useCallback((temple: Omit<Temple, 'id' | 'slug'>) => {
    const newId = Math.max(...temples.map(t => t.id), 0) + 1;
    const slug = temple.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setTemples([...temples, { ...temple, id: newId, slug } as Temple]);
  }, [temples, setTemples]);

  const updateTemple = useCallback((id: number, updates: Partial<Temple>) => {
    setTemples(temples.map(t => t.id === id ? { ...t, ...updates } : t));
  }, [temples, setTemples]);

  const deleteTemple = useCallback((id: number) => {
    setTemples(temples.filter(t => t.id !== id));
  }, [temples, setTemples]);

  const getTemple = useCallback((id: number) => {
    return temples.find(t => t.id === id);
  }, [temples]);

  const resetToDefault = useCallback(() => {
    setTemples(initialTemples);
  }, [setTemples]);

  return {
    temples,
    addTemple,
    updateTemple,
    deleteTemple,
    getTemple,
    resetToDefault,
    setTemples
  };
}

export function useCMSTours() {
  const [tours, setTours] = useLocalStorage<Tour[]>('cms_tours', initialTours);

  const addTour = useCallback((tour: Omit<Tour, 'id'>) => {
    const newId = Math.max(...tours.map(t => t.id), 0) + 1;
    setTours([...tours, { ...tour, id: newId }]);
  }, [tours, setTours]);

  const updateTour = useCallback((id: number, updates: Partial<Tour>) => {
    setTours(tours.map(t => t.id === id ? { ...t, ...updates } : t));
  }, [tours, setTours]);

  const deleteTour = useCallback((id: number) => {
    setTours(tours.filter(t => t.id !== id));
  }, [tours, setTours]);

  const getTour = useCallback((id: number) => {
    return tours.find(t => t.id === id);
  }, [tours]);

  const resetToDefault = useCallback(() => {
    setTours(initialTours);
  }, [setTours]);

  return {
    tours,
    addTour,
    updateTour,
    deleteTour,
    getTour,
    resetToDefault,
    setTours
  };
}

// Export/Import functionality
export function useCMSExport() {
  const { temples } = useCMSTemples();
  const { tours } = useCMSTours();

  const exportData = useCallback(() => {
    const data = {
      temples,
      tours,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cms-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [temples, tours]);

  return { exportData };
}

export function useCMSImport() {
  const { setTemples } = useCMSTemples();
  const { setTours } = useCMSTours();

  const importData = useCallback((file: File): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          
          if (data.temples && Array.isArray(data.temples)) {
            setTemples(data.temples);
          }
          
          if (data.tours && Array.isArray(data.tours)) {
            setTours(data.tours);
          }
          
          resolve({ success: true, message: 'Data imported successfully!' });
        } catch {
          resolve({ success: false, message: 'Invalid JSON file format' });
        }
      };
      
      reader.onerror = () => {
        resolve({ success: false, message: 'Error reading file' });
      };
      
      reader.readAsText(file);
    });
  }, [setTemples, setTours]);

  return { importData };
}
