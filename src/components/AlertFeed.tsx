import { useFleetStore } from "../store/useFleetStore";
import { AlertCircle, Info } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function AlertFeed() {
  const { alerts, setSelectedTruck } = useFleetStore();

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="flex flex-col h-full border-l bg-card w-80">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">Alerts</h2>
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {alerts.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No active alerts
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex gap-3 p-3 rounded-lg border hover:bg-accent/50 cursor-pointer transition-colors"
              onClick={() => setSelectedTruck(alert.truckId)}
            >
              <div className="mt-0.5">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium mb-1">
                  {alert.truckId}
                </div>
                <div className="text-xs text-muted-foreground mb-2">
                  {alert.message}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
