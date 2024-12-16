import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Myspace } from '@/types';
import { spaceService } from '@/services/api';

export function useSpaces() {
  const [spaces, setSpaces] = useState<Myspace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await spaceService.getMySpaces();
        console.log(response.data.data);
        
        if (response.data ) {
          setSpaces(response.data?.data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch spaces';
        setError(message);
        toast.error(message);
        setSpaces([]); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  return { spaces, isLoading, error };
}