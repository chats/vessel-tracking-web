export interface Location {
  latitude: number;
  longitude: number;
}

export interface Voyage {
  id: string;
  voyage_id: string;
  ship_id: string;
  ship_name: string;
  departure_port: string;
  arrival_port: string;
  departure_time: string;
  arrival_time: string;
  status: 'completed' | 'in_progress' | 'pending' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Checkpoint {
  id: string;
  voyage_id: string;
  location: Location;
  timestamp: string;
  description: string;
  created_at: string;
}

export interface GpsTrack {
  id: string;
  voyage_id: string;
  location: Location;
  speed: number;
  heading: number;
  timestamp: string;
  created_at: string;
}

export interface VoyageData {
  voyage: Voyage;
  checkpoints: Checkpoint[];
  gps_tracks: GpsTrack[];
}

export interface VoyageResponse {
  count: number;
  data: VoyageData[];
}
