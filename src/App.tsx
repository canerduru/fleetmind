import { Layout } from './components/Layout';
import { TruckList } from './components/TruckList';
import { FleetMap } from './components/FleetMap';
import { AlertFeed } from './components/AlertFeed';
import { Modal } from './components/ui/Modal';
import { TruckForm } from './components/TruckForm';
import { useFleetStore } from './store/useFleetStore';

function App() {
  const { modal, closeModal, addTruck, updateTruck } = useFleetStore();

  const handleFormSubmit = (truck: any) => {
    if (modal.type === 'edit') {
      updateTruck(truck);
    } else {
      addTruck(truck);
    }
    closeModal();
  };

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

      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.type === 'edit' ? "Edit Truck" : "Add New Truck"}
      >
        {modal.isOpen && (
          <TruckForm
            initialData={modal.data}
            onSubmit={handleFormSubmit}
            onCancel={closeModal}
          />
        )}
      </Modal>
    </Layout>
  );
}

export default App;
