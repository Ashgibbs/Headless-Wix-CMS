import { useState, useEffect, useCallback } from 'react';

// Custom event name for same-tab storage updates
const STORAGE_EVENT_NAME = 'local-storage-update';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get stored value or use initial
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Listen for storage changes from other tabs AND same-tab custom events
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing storage event for key "${key}":`, error);
        }
      }
    };

    // Custom event listener for same-tab updates
    const handleCustomStorageChange = (e: CustomEvent<{ key: string; value: T }>) => {
      if (e.detail.key === key) {
        setStoredValue(e.detail.value);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(STORAGE_EVENT_NAME, handleCustomStorageChange as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(STORAGE_EVENT_NAME, handleCustomStorageChange as EventListener);
    };
  }, [key]);

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    setStoredValue(prev => {
      const valueToStore = value instanceof Function ? value(prev) : value;
      
      // Save to localStorage
      try {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        
        // Dispatch custom event for same-tab listeners
        window.dispatchEvent(new CustomEvent(STORAGE_EVENT_NAME, {
          detail: { key, value: valueToStore }
        }));
      } catch (error) {
        console.error(`Error saving to localStorage key "${key}":`, error);
      }
      
      return valueToStore;
    });
  }, [key]);

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
      
      // Dispatch custom event for removal
      window.dispatchEvent(new CustomEvent(STORAGE_EVENT_NAME, {
        detail: { key, value: initialValue }
      }));
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
}

// Hook for managing admin session
export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('cms_admin_auth', false);
  const [adminPassword] = useLocalStorage('cms_admin_password', 'admin123'); // Default password

  const login = useCallback((password: string) => {
    if (password === adminPassword) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, [adminPassword, setIsAuthenticated]);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, [setIsAuthenticated]);

  return { isAuthenticated, login, logout };
}
