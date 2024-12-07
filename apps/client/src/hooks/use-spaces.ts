import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Space } from '@/types';
import { spaceService } from '@/services/api';

export function useSpaces() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await spaceService.getMySpaces();
        if (response.data && Array.isArray(response.data)) {
          setSpaces(response.data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch spaces';
        setError(message);
        toast.error(message);
        setSpaces([]); // Set empty array on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  return { spaces, isLoading, error };
}