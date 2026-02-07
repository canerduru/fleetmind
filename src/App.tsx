import { Layout } from './components/Layout';
import { TruckList } from './components/TruckList';
import { FleetMap } from './components/FleetMap';
import { AlertFeed } from './components/AlertFeed';

function App() {
  return (
    <Layout>
      <div className="flex w-full h-full">
        {/* Truck List Sidebar - Internal width: w-96 */}
        <TruckList />

        {/* Map - Takes remaining space */}
        <div className="flex-1 relative z-0">
          <FleetMap />
        </div>

        {/* Alert Feed Sidebar - Internal width: w-80 */}
        <AlertFeed />
      </div>
    </Layout>
  );
}

export default App;
