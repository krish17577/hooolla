import React from 'react';

function MedicineList({ medicines, onTake }) {
  return (
    <ul>
      {medicines.map((med) => (
        <li key={med.id} className="flex justify-between mb-2 p-2 border rounded items-center">
          <div>
            <div className="font-semibold">{med.name}</div>
            <div className="text-sm">Dosage: {med.dosage}</div>
            <div className="text-sm">Time: {med.time}</div>
          </div>
          <button
            className={`p-2 rounded ${med.taken ? 'bg-green-400' : 'bg-gray-300'}`}
            onClick={() => onTake(med.id)}
            disabled={med.taken}
          >
            {med.taken ? 'Taken' : 'Mark as Taken'}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default MedicineList;