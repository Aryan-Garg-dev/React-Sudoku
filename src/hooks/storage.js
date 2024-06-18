import { useEffect } from 'react';

export function useLocalStorage(key, value) {
  useEffect(() => {
    if (value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);
}