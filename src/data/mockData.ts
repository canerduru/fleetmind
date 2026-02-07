import type { Truck, Alert } from '../types';

export const MOCK_TRUCKS: Truck[] = [
  {
    id: "T-023",
    driver: "Mike Chen",
    status: "on_route",
    from: "New York",
    to: "Boston",
    eta: "2026-02-08 14:30",
    fuel_percent: 67,
    lat: 41.5,
    lng: -73.2
  },
  {
    id: "T-045",
    driver: "Sarah Johnson",
    status: "delayed",
    from: "Miami",
    to: "Atlanta",
    eta: "2026-02-08 18:45",
    fuel_percent: 34,
    lat: 28.8,
    lng: -81.5
  },
  {
    id: "T-012",
    driver: "Carlos Martinez",
    status: "idle",
    from: "Chicago",
    to: "Detroit",
    eta: "2026-02-08 12:00",
    fuel_percent: 89,
    lat: 41.8,
    lng: -87.6
  }
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: "A-001",
    truckId: "T-023",
    message: "Truck T-023 departed New York",
    type: "info",
    timestamp: "2026-02-08T09:00:00Z"
  },
  {
    id: "A-002",
    truckId: "T-045",
    message: "Truck T-045 delayed 15min due to traffic",
    type: "warning",
    timestamp: "2026-02-08T10:30:00Z"
  },
  {
    id: "A-003",
    truckId: "T-012",
    message: "Truck T-012 finished loading",
    type: "info",
    timestamp: "2026-02-08T11:00:00Z"
  }
];
