import { create } from 'zustand';
import type { Truck, Alert } from '../types';
import { MOCK_TRUCKS, MOCK_ALERTS } from '../data/mockData';

interface FleetState {
  trucks: Truck[];
  alerts: Alert[];
  selectedTruckId: string | null;
  
  setTrucks: (trucks: Truck[]) => void;
  setAlerts: (alerts: Alert[]) => void;
  setSelectedTruck: (truckId: string | null) => void;
  addAlert: (alert: Alert) => void;
  updateTruckStatus: (truckId: string, status: Truck['status']) => void;
}

export const useFleetStore = create<FleetState>((set) => ({
  trucks: MOCK_TRUCKS,
  alerts: MOCK_ALERTS,
  selectedTruckId: null,

  setTrucks: (trucks) => set({ trucks }),
  setAlerts: (alerts) => set({ alerts }),
  setSelectedTruck: (truckId) => set({ selectedTruckId: truckId }),
  addAlert: (alert) => set((state) => ({ alerts: [alert, ...state.alerts] })),
  updateTruckStatus: (truckId, status) => set((state) => ({
    trucks: state.trucks.map(t => t.id === truckId ? { ...t, status } : t)
  }))
}));
