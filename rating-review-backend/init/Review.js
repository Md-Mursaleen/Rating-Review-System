const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  review: { type: String },
  createdAt: { type: Date, default: Date.now },
  id: { type: Number, required: true },
  photos: [{ type: String }]
});

module.exports = mongoose.model('Review', reviewSchema);
