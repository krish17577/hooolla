import React, { useState, useEffect } from 'react';
import { fetchMedicines, addMedicine, markAsTaken } from './services/api';
import AddMedicine from './components/AddMedicine';
import MedicineList from './components/MedicineList';

function App() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    const data = await fetchMedicines();
    setMedicines(data);
  };

  const handleAdd = async (medicine) => {
    await addMedicine(medicine);
    loadMedicines();
  };

  const handleTake = async (id) => {
    await markAsTaken(id);
    loadMedicines();
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Medicine Reminder</h1>
      
      {/* AddMedicine component */}
      <AddMedicine onAdd={handleAdd} />

      {/* MedicineList component */}
      <MedicineList medicines={medicines} onTake={handleTake} />
    </div>
  );
}

export default App;