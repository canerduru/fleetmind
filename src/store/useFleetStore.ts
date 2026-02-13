import { create } from 'zustand';
import type { Truck, Alert } from '../types';
import { MOCK_TRUCKS, MOCK_ALERTS } from '../data/mockData';

interface ModalState {
  isOpen: boolean;
  type: 'add' | 'edit';
  data?: Truck;
}

interface FleetState {
  trucks: Truck[];
  alerts: Alert[];
  selectedTruckId: string | null;
  searchQuery: string;
  statusFilter: Truck['status'] | 'all';
  modal: ModalState;
  
  setTrucks: (trucks: Truck[]) => void;
  setAlerts: (alerts: Alert[]) => void;
  setSelectedTruck: (truckId: string | null) => void;
  addAlert: (alert: Alert) => void;
  updateTruckStatus: (truckId: string, status: Truck['status']) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: Truck['status'] | 'all') => void;
  addTruck: (truck: Truck) => void;
  updateTruck: (truck: Truck) => void;
  deleteTruck: (truckId: string) => void;
  openModal: (type: 'add' | 'edit', data?: Truck) => void;
  closeModal: () => void;
}

export const useFleetStore = create<FleetState>((set) => ({
  trucks: MOCK_TRUCKS,
  alerts: MOCK_ALERTS,
  selectedTruckId: null,
  searchQuery: '',
  statusFilter: 'all',
  modal: { isOpen: false, type: 'add' },

  setTrucks: (trucks) => set({ trucks }),
  setAlerts: (alerts) => set({ alerts }),
  setSelectedTruck: (truckId) => set({ selectedTruckId: truckId }),
  addAlert: (alert) => set((state) => ({ alerts: [alert, ...state.alerts] })),
  updateTruckStatus: (truckId, status) => set((state) => ({
    trucks: state.trucks.map(t => t.id === truckId ? { ...t, status } : t)
  })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  addTruck: (truck) => set((state) => {
    // Generate an alert for new truck
    const newAlert: Alert = {
      id: `A-${Date.now()}`,
      truckId: truck.id,
      message: `New truck ${truck.id} added to fleet.`,
      type: 'info',
      timestamp: new Date().toISOString()
    };
    return {
      trucks: [...state.trucks, truck],
      alerts: [newAlert, ...state.alerts]
    };
  }),
  updateTruck: (truck) => set((state) => {
    // Check for status change to generate alert
    const existingTruck = state.trucks.find(t => t.id === truck.id);
    let newAlerts = state.alerts;

    if (existingTruck && existingTruck.status !== truck.status) {
      const alertType: Alert['type'] = truck.status === 'delayed' ? 'warning' : 'info';
      const statusText = truck.status.replace('_', ' ');
      const newAlert: Alert = {
        id: `A-${Date.now()}`,
        truckId: truck.id,
        message: `Truck ${truck.id} status changed to ${statusText}.`,
        type: alertType,
        timestamp: new Date().toISOString()
      };
      newAlerts = [newAlert, ...state.alerts];
    }

    return {
      trucks: state.trucks.map((t) => (t.id === truck.id ? truck : t)),
      alerts: newAlerts
    };
  }),
  deleteTruck: (truckId) => set((state) => ({
    trucks: state.trucks.filter((t) => t.id !== truckId)
  })),
  openModal: (type, data) => set({ modal: { isOpen: true, type, data } }),
  closeModal: () => set({ modal: { isOpen: false, type: 'add', data: undefined } })
}));
