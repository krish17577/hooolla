const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/medicinedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Medicine Schema
const medicineSchema = new mongoose.Schema({
  name: String,
  dosage: String,
  time: String,
  taken: { type: Boolean, default: false },
});

const Medicine = mongoose.model('Medicine', medicineSchema);

// Routes

// Get all medicines
app.get('/medicines', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new medicine
app.post('/medicines', async (req, res) => {
  try {
    const { name, dosage, time } = req.body;
    const newMedicine = new Medicine({ name, dosage, time });
    await newMedicine.save();
    res.status(201).json(newMedicine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark medicine as taken
app.put('/medicines/:id/take', async (req, res) => {
  try {
    const { id } = req.params;
    const medicine = await Medicine.findById(id);
    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }
    medicine.taken = true;
    await medicine.save();
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});