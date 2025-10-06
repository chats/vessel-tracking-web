import type { VoyageResponse } from '../../domain/entities/Voyage';
import { API_CONFIG } from './config';

export const voyageApi = {
  async getAllVoyages(): Promise<VoyageResponse> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (API_CONFIG.API_KEY) {
      headers['X-API-Key'] = API_CONFIG.API_KEY;
    }

    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.VOYAGES}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch voyages');
    }
    return response.json();
  },
};
