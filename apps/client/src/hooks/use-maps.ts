import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { authService } from '@/services/api';




type element = {
id:string;
static:boolean;
thumbnail:string;
width:number;
height:number;
createdAt:string;
updatedAt:string;
}

type elements = {
  id:string;
  mapId:string;
  elementId:string;
  createdAt:string;
  updatedAt:string;
  x:number;
  y:number;
  element:element;
}

interface Map {
  id: string;
  name: string;
  thumbnail?: string;
  width: number;
  height: number;
elements: elements[];
createdAt: string;
updatedAt: string;
}

export function useMaps() {
  const [maps, setMaps] = useState<Map[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMaps = async () => {
      try {
        const response = await authService.getMaps();
        console.log(response)
        if (response.data && Array.isArray(response.data?.data?.maps)) {
          setMaps(response.data?.data?.maps);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch maps';
        setError(message);
        toast.error(message);
        setMaps([]); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaps();
  }, []);

  return { maps, isLoading, error };
}