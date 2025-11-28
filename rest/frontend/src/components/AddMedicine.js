import React, { useState } from 'react';

function AddMedicine({ onAdd }) {
  const initialFormState = { name: '', dosage: '', time: '' };
  const [formData, setFormData] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.dosage.trim() || !formData.time.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      await onAdd?.({
        name: formData.name.trim(),
        dosage: formData.dosage.trim(),
        time: formData.time.trim(),
      });
      setFormData(initialFormState);
    } catch (err) {
      console.error('Failed to add medicine', err);
      setError('Failed to add medicine. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="mb-6 space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <label className="block text-sm font-medium" htmlFor="name">
          Medicine Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="w-full border rounded px-3 py-2"
          placeholder="Enter medicine name"
          value={formData.name}
          onChange={handleChange}
          disabled={submitting}
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium" htmlFor="dosage">
          Dosage
        </label>
        <input
          id="dosage"
          name="dosage"
          type="text"
          className="w-full border rounded px-3 py-2"
          placeholder="e.g. 10mg"
          value={formData.dosage}
          onChange={handleChange}
          disabled={submitting}
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium" htmlFor="time">
          Time
        </label>
        <input
          id="time"
          name="time"
          type="text"
          className="w-full border rounded px-3 py-2"
          placeholder="e.g. 8:00 AM"
          value={formData.time}
          onChange={handleChange}
          disabled={submitting}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-60"
        disabled={submitting}
      >
        {submitting ? 'Saving...' : 'Add Medicine'}
      </button>
    </form>
  );
}

export default AddMedicine;