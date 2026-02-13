import { useState, useEffect } from "react";
import type { Truck } from "../types";
import { Button } from "./ui/Button";

interface TruckFormProps {
  initialData?: Truck;
  onSubmit: (truck: Truck) => void;
  onCancel: () => void;
}

export function TruckForm({ initialData, onSubmit, onCancel }: TruckFormProps) {
  // Default state for a new truck
  const [formData, setFormData] = useState<Truck>({
    id: "",
    driver: "",
    status: "idle",
    from: "",
    to: "",
    eta: new Date().toISOString().slice(0, 16), // Default to current time for input
    fuel_percent: 100,
    lat: 39.8283,
    lng: -98.5795,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        // Ensure eta is formatted for datetime-local input if it exists
        eta: initialData.eta ? new Date(initialData.eta).toISOString().slice(0, 16) : ""
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      // Parse numbers for numeric fields
      [name]: name === "fuel_percent" || name === "lat" || name === "lng" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Truck ID</label>
          <input
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
            disabled={!!initialData} // ID cannot be changed when editing
            className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Driver Name</label>
          <input
            name="driver"
            value={formData.driver}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
          >
            <option value="idle">Idle</option>
            <option value="on_route">On Route</option>
            <option value="delayed">Delayed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Fuel (%)</label>
          <input
            type="number"
            name="fuel_percent"
            value={formData.fuel_percent}
            onChange={handleChange}
            min="0"
            max="100"
            className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">From</label>
          <input
            name="from"
            value={formData.from}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <input
            name="to"
            value={formData.to}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">ETA</label>
        <input
          type="datetime-local"
          name="eta"
          value={formData.eta}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Latitude</label>
          <input
            type="number"
            step="any"
            name="lat"
            value={formData.lat}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Longitude</label>
          <input
            type="number"
            step="any"
            name="lng"
            value={formData.lng}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-input px-3 py-2 text-sm bg-background"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? "Update Truck" : "Add Truck"}
        </Button>
      </div>
    </form>
  );
}
