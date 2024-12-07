import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { adminService } from '@/services/api';

interface Map {
  id: string;
  name: string;
  previewUrl?: string;
}

export function useMaps() {
  const [maps, setMaps] = useState<Map[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMaps = async () => {
      try {
        const response = await adminService.getMaps();
        if (response.data && Array.isArray(response.data)) {
          setMaps(response.data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch maps';
        setError(message);
        toast.error(message);
        setMaps([]); // Set empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaps();
  }, []);

  return { maps, isLoading, error };
}