const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 }, // optional
  review: { type: String },                 // optional
  createdAt: { type: Date, default: Date.now },
  id: { type: Number,  required: true }
});

module.exports = mongoose.model('Review', reviewSchema);
