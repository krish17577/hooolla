export const fetchMedicines = () => fetch('http://localhost:5000/medicines').then(res => res.json());

export const addMedicine = (medicine) => fetch('http://localhost:5000/medicines', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(medicine),
});

export const markAsTaken = (id) => fetch(`http://localhost:5000/medicines/${id}/take`, {
  method: 'PUT',
});