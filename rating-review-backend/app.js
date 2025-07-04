require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Product = require('./init/Product');
const Review = require('./init/Review');

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
main().then(() => console.log("connected")).catch(err => console.log(err));

app.listen(PORT, (req, res) => {
  console.log("listening");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));

app.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get('/product/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await Product.findOne({ id: productId });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get('/reviews/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const reviews = await Review.find({ id: productId }).sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

app.post('/review-submitted', upload.array('photos', 5), async (req, res) => {
  try {
    const { name, rating, review, id } = req.body;
    const photoUrls = req.files ? req.files.map(file => `uploads/${file.filename}`) : [];

    const isRatingEmpty = rating === null || rating === undefined || rating === 0;
    const isReviewEmpty = !review || review.trim() === "";

    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    if (isRatingEmpty && isReviewEmpty) {
      return res.status(400).json({ error: "Please provide either a rating or a review." });
    }

    const newReview = new Review({
      name,
      rating: isRatingEmpty ? undefined : rating,
      review: isReviewEmpty ? undefined : review,
      id,
      photos: photoUrls
    });

    const savedReview = await newReview.save();

    console.log(savedReview);
    return res.status(201).json({ message: "Review submitted successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});
