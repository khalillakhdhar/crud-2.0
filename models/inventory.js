// models/inventory.js
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: String,
  description: String,
  serialNumber: String,
  quantityAvailable: Number
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
