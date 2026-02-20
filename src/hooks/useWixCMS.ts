import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { fetchTemples, fetchTempleById, fetchTours, fetchTourById } from '@/services/wixCMS';
import { Temple } from '@/data/temples';
import { Tour } from '@/data/tours';
import { temples as initialTemples } from '@/data/temples';
import { tours as initialTours } from '@/data/tours';

// Query keys for React Query
export const queryKeys = {
  temples: ['temples'] as const,
  temple: (id: string | number) => ['temple', id] as const,
  tours: ['tours'] as const,
  tour: (id: string | number) => ['tour', id] as const,
};

/**
 * Hook to fetch all temples from Wix CMS
 * Falls back to initial data if Wix CMS is not configured
 */
export function useCMSTemples() {
  const queryClient = useQueryClient();
  const isWixConfigured = !!import.meta.env.VITE_WIX_API_KEY;

  const { data: temples = [], isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.temples,
    queryFn: async () => {
      if (isWixConfigured) {
        try {
          return await fetchTemples();
        } catch (err) {
          console.warn('Failed to fetch from Wix CMS, using fallback data:', err);
          return initialTemples;
        }
      }
      return initialTemples;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });

  const invalidateTemples = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: queryKeys.temples });
  }, [queryClient]);

  return {
    temples,
    isLoading,
    error,
    refetch,
    invalidateTemples,
    // For backward compatibility, keep these methods but they won't modify Wix CMS
    // To modify Wix CMS data, use the Wix CMS dashboard
    addTemple: useCallback(() => {
      console.warn('addTemple: To add temples, please use the Wix CMS dashboard');
    }, []),
    updateTemple: useCallback(() => {
      console.warn('updateTemple: To update temples, please use the Wix CMS dashboard');
      invalidateTemples();
    }, [invalidateTemples]),
    deleteTemple: useCallback(() => {
      console.warn('deleteTemple: To delete temples, please use the Wix CMS dashboard');
      invalidateTemples();
    }, [invalidateTemples]),
    getTemple: useCallback((id: number) => {
      return temples.find(t => t.id === id);
    }, [temples]),
    resetToDefault: useCallback(() => {
      console.warn('resetToDefault: This function is not available with Wix CMS');
    }, []),
    setTemples: useCallback(() => {
      console.warn('setTemples: To modify temples, please use the Wix CMS dashboard');
      invalidateTemples();
    }, [invalidateTemples]),
  };
}

/**
 * Hook to fetch a single temple by ID or slug
 */
export function useCMSTemple(idOrSlug: string | number) {
  const isWixConfigured = !!import.meta.env.VITE_WIX_API_KEY;

  const { data: temple, isLoading, error } = useQuery({
    queryKey: queryKeys.temple(idOrSlug),
    queryFn: async () => {
      if (isWixConfigured) {
        try {
          return await fetchTempleById(idOrSlug);
        } catch (err) {
          console.warn('Failed to fetch temple from Wix CMS:', err);
          // Fallback to initial data
          const fallback = initialTemples.find(
            t => t.id === Number(idOrSlug) || t.slug === idOrSlug
          );
          return fallback || null;
        }
      }
      // Fallback to initial data
      return initialTemples.find(
        t => t.id === Number(idOrSlug) || t.slug === idOrSlug
      ) || null;
    },
    enabled: !!idOrSlug,
    staleTime: 5 * 60 * 1000,
  });

  return { temple, isLoading, error };
}

/**
 * Hook to fetch all tours/pilgrimage packages from Wix CMS
 */
export function useCMSTours() {
  const queryClient = useQueryClient();
  const isWixConfigured = !!import.meta.env.VITE_WIX_API_KEY;

  const { data: tours = [], isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.tours,
    queryFn: async () => {
      if (isWixConfigured) {
        try {
          return await fetchTours();
        } catch (err) {
          console.warn('Failed to fetch from Wix CMS, using fallback data:', err);
          return initialTours;
        }
      }
      return initialTours;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const invalidateTours = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: queryKeys.tours });
  }, [queryClient]);

  return {
    tours,
    isLoading,
    error,
    refetch,
    invalidateTours,
    // For backward compatibility
    addTour: useCallback(() => {
      console.warn('addTour: To add tours, please use the Wix CMS dashboard');
    }, []),
    updateTour: useCallback(() => {
      console.warn('updateTour: To update tours, please use the Wix CMS dashboard');
      invalidateTours();
    }, [invalidateTours]),
    deleteTour: useCallback(() => {
      console.warn('deleteTour: To delete tours, please use the Wix CMS dashboard');
      invalidateTours();
    }, [invalidateTours]),
    getTour: useCallback((id: number) => {
      return tours.find(t => t.id === id);
    }, [tours]),
    resetToDefault: useCallback(() => {
      console.warn('resetToDefault: This function is not available with Wix CMS');
    }, []),
    setTours: useCallback(() => {
      console.warn('setTours: To modify tours, please use the Wix CMS dashboard');
      invalidateTours();
    }, [invalidateTours]),
  };
}

/**
 * Hook to fetch a single tour by ID or slug
 */
export function useCMSTour(idOrSlug: string | number) {
  const isWixConfigured = !!import.meta.env.VITE_WIX_API_KEY;

  const { data: tour, isLoading, error } = useQuery({
    queryKey: queryKeys.tour(idOrSlug),
    queryFn: async () => {
      if (isWixConfigured) {
        try {
          return await fetchTourById(idOrSlug);
        } catch (err) {
          console.warn('Failed to fetch tour from Wix CMS:', err);
          // Fallback to initial data
          const fallback = initialTours.find(
            t => t.id === Number(idOrSlug) || t.slug === idOrSlug
          );
          return fallback || null;
        }
      }
      // Fallback to initial data
      return initialTours.find(
        t => t.id === Number(idOrSlug) || t.slug === idOrSlug
      ) || null;
    },
    enabled: !!idOrSlug,
    staleTime: 5 * 60 * 1000,
  });

  return { tour, isLoading, error };
}

/**
 * Export functionality (exports current data from Wix CMS)
 */
export function useCMSExport() {
  const { temples } = useCMSTemples();
  const { tours } = useCMSTours();

  const exportData = useCallback(() => {
    const data = {
      temples,
      tours,
      exportedAt: new Date().toISOString(),
      version: '1.0',
      source: 'Wix CMS'
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
