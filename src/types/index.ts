export type TruckStatus = 'on_route' | 'delayed' | 'idle';

export interface Truck {
  id: string;
  driver: string;
  status: TruckStatus;
  from: string;
  to: string;
  eta: string;
  fuel_percent: number;
  lat: number;
  lng: number;
}

export type AlertType = 'info' | 'warning' | 'critical';

export interface Alert {
  id: string;
  truckId: string;
  message: string;
  type: AlertType;
  timestamp: string;
}
