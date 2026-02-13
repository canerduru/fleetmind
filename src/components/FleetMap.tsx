import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { useFleetStore } from '../store/useFleetStore';
import { Button } from './ui/Button';
import { Pencil } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapUpdater() {
  const { selectedTruckId, trucks } = useFleetStore();
  const map = useMap();

  useEffect(() => {
    if (selectedTruckId) {
      const truck = trucks.find(t => t.id === selectedTruckId);
      if (truck) {
        map.flyTo([truck.lat, truck.lng], 12, {
          duration: 1.5
        });
      }
    }
  }, [selectedTruckId, trucks, map]);

  return null;
}

export function FleetMap() {
  const { trucks, setSelectedTruck, searchQuery, statusFilter, openModal } = useFleetStore();

  // Calculate center based on trucks or default to US center
  const center: [number, number] = [39.8283, -98.5795]; 

  const filteredTrucks = trucks.filter(truck => {
    const matchesSearch = truck.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          truck.driver.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || truck.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-full w-full relative z-0">
      <MapContainer 
        center={center} 
        zoom={4} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater />
        {filteredTrucks.map((truck) => {
          // Generate a theoretical destination for demo purposes (e.g., +2 lat, +2 lng)
          // In a real app, this would be part of the truck data
          const destLat = truck.lat + (truck.id.length % 2 === 0 ? 2 : -2);
          const destLng = truck.lng + (truck.id.length % 3 === 0 ? 2 : -2);

          return (
            <div key={truck.id}>
              {/* Route Line for 'on_route' or 'delayed' trucks */}
              {(truck.status === 'on_route' || truck.status === 'delayed') && (
                <Polyline
                  positions={[[truck.lat, truck.lng], [destLat, destLng]]}
                  pathOptions={{
                    color: truck.status === 'delayed' ? 'red' : 'blue',
                    dashArray: '5, 10',
                    weight: 2,
                    opacity: 0.6
                  }}
                />
              )}

              <Marker
                position={[truck.lat, truck.lng]}
                eventHandlers={{
                  click: () => {
                    setSelectedTruck(truck.id);
                  },
                }}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{truck.id}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        title="Edit Truck"
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal('edit', truck);
                        }}
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-sm font-medium">{truck.driver}</p>
                    <div className="mt-2 text-xs space-y-1">
                      <p>Status: <span className="capitalize font-semibold">{truck.status.replace('_', ' ')}</span></p>
                      <p>Speed: 65 mph</p>
                      <p>ETA: {new Date(truck.eta).toLocaleTimeString()}</p>
                      <p>Route: {truck.from} → {truck.to}</p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </div>
          );
        })}
      </MapContainer>
    </div>
  );
}
