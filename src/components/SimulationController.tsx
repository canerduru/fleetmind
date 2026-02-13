import { useEffect } from 'react';
import { useFleetStore } from '../store/useFleetStore';
import { Button } from './ui/Button';
import { Play, Pause } from 'lucide-react';

export function SimulationController() {
  const { isSimulationRunning, toggleSimulation, updateTruckPositions } = useFleetStore();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isSimulationRunning) {
      interval = setInterval(() => {
        useFleetStore.getState().updateTruckPositions();
      }, 1000); // Update every second
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSimulationRunning]);

  return (
    <Button
      variant={isSimulationRunning ? "destructive" : "default"}
      onClick={toggleSimulation}
      className="gap-2"
    >
      {isSimulationRunning ? (
        <>
          <Pause className="h-4 w-4" /> Stop Simulation
        </>
      ) : (
        <>
          <Play className="h-4 w-4" /> Start Simulation
        </>
      )}
    </Button>
  );
}
