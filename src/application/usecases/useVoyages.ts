import { useState, useEffect } from 'react';
import { VoyageData } from '../../domain/entities/Voyage';
import { voyageApi } from '../../infrastructure/api/voyageApi';

export const useVoyages = () => {
  const [voyages, setVoyages] = useState<VoyageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVoyages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await voyageApi.getAllVoyages();
      setVoyages(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVoyages();
  }, []);

  return { voyages, loading, error, refetch: fetchVoyages };
};
