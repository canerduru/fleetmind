import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useFleetStore } from '../store/useFleetStore';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
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
  const { trucks, setSelectedTruck } = useFleetStore();

  // Calculate center based on trucks or default to US center
  const center: [number, number] = [39.8283, -98.5795]; 

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
        {trucks.map((truck) => (
          <Marker 
            key={truck.id} 
            position={[truck.lat, truck.lng]}
            eventHandlers={{
              click: () => {
                setSelectedTruck(truck.id);
              },
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg">{truck.id}</h3>
                <p className="text-sm font-medium">{truck.driver}</p>
                <div className="mt-2 text-xs">
                  <p>Status: <span className="capitalize">{truck.status.replace('_', ' ')}</span></p>
                  <p>Speed: 65 mph</p>
                  <p>ETA: {new Date(truck.eta).toLocaleTimeString()}</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
