// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importer le middleware CORS

const Inventory = require('./models/inventory');

const app = express();
const PORT = process.env.PORT || 4000;
// Middleware pour activer CORS
app.use(cors());

// Middleware pour parser le JSON
app.use(bodyParser.json());
// Middleware pour parser le JSON


// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://khalillakhdharatc:i3YobGwbrZsp7K2u@cluster0.fquyznt.mongodb.net/materiel?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Routes CRUD pour l'inventaire
app.post('/api/inventory', async (req, res) => {
  try {
    const { name, description, serialNumber, quantityAvailable } = req.body;
    const newItem = await Inventory.create({ name, description, serialNumber, quantityAvailable });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/inventory', async (req, res) => {
  try {
    const items = await Inventory.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/inventory/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Inventory.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/inventory/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, serialNumber, quantityAvailable } = req.body;
    const updatedItem = await Inventory.findByIdAndUpdate(id, 
      { name, description, serialNumber, quantityAvailable }, 
      { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/inventory/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Inventory.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
