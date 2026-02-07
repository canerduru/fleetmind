import { useState } from 'react';
import { useFleetStore } from "../store/useFleetStore";
import { Badge } from "./ui/Badge";
import { cn } from "../lib/utils";
import type { Truck } from "../types";
import { Search } from "lucide-react";

export function TruckList() {
  const { trucks, selectedTruckId, setSelectedTruck } = useFleetStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<Truck['status'] | 'all'>('all');

  const getStatusColor = (status: Truck['status']) => {
    switch (status) {
      case 'on_route': return 'success';
      case 'delayed': return 'warning';
      case 'idle': return 'secondary';
      default: return 'default';
    }
  };

  const filteredTrucks = trucks.filter(truck => {
    const matchesSearch = truck.id.toLowerCase().includes(search.toLowerCase()) || 
                          truck.driver.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || truck.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col h-full border-r bg-card w-96">
      <div className="p-4 border-b space-y-4">
        <div>
          <h2 className="font-semibold text-lg">Fleet Status</h2>
          <div className="text-sm text-muted-foreground">
            {filteredTrucks.length} Active Vehicles
          </div>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search trucks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-input bg-background pl-8 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="all">All</option>
            <option value="on_route">On Route</option>
            <option value="delayed">Delayed</option>
            <option value="idle">Idle</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="divide-y">
          {filteredTrucks.length === 0 ? (
             <div className="p-8 text-center text-muted-foreground text-sm">
               No trucks found
             </div>
          ) : (
            filteredTrucks.map((truck) => (
              <div
                key={truck.id}
                className={cn(
                  "p-4 hover:bg-accent/50 cursor-pointer transition-colors",
                  selectedTruckId === truck.id && "bg-accent"
                )}
                onClick={() => setSelectedTruck(truck.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-sm">{truck.id}</span>
                  <Badge variant={getStatusColor(truck.status)}>
                    {truck.status.replace('_', ' ')}
                  </Badge>
                </div>
                <div className="text-sm font-medium mb-1">{truck.driver}</div>
                <div className="text-xs text-muted-foreground flex justify-between">
                  <span>To: {truck.to}</span>
                  <span>ETA: {new Date(truck.eta).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
