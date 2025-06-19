require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const Product = require('./init/Product');
const Review = require('./init/Review');

app.use(express.json());
app.use(cors());

const products = [
  {
    id: 1,
    name: "Puma Casual Wear",
    description: "A comfortable and stylish Puma casual shoe, perfect for daily wear and casual outings with a sleek design and durable build.",
    price: 1230,
    rating: 4,
    src: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
  },
  {
    id: 2,
    name: "Nike Air Max Cool",
    description: "Experience ultimate comfort and performance with Nike Air Max, featuring advanced cushioning and a modern design.",
    price: 1450,
    rating: 5,
    src: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg"
  },
  {
    id: 3,
    name: "Adidas Running Shoe",
    description: "Lightweight and breathable running shoe by Adidas, designed for long-distance comfort and performance.",
    price: 1320,
    rating: 4,
    src: "https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg"
  },
  {
    id: 4,
    name: "Reebok Classic",
    description: "A timeless Reebok classic shoe that blends vintage style with modern-day comfort and support.",
    price: 1100,
    rating: 3,
    src: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg"
  },
  {
    id: 5,
    name: "Skechers Sport Sneaker",
    description: "Sporty, casual and ready for action—Skechers sneakers with memory foam cushioning for all-day comfort.",
    price: 1250,
    rating: 4,
    src: "https://images.pexels.com/photos/1027130/pexels-photo-1027130.jpeg"
  },
  {
    id: 6,
    name: "Converse All Star",
    description: "Iconic high-top Converse All Star shoes, a must-have for streetwear enthusiasts and casual fashion lovers.",
    price: 980,
    rating: 4,
    src: "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg"
  },
  {
    id: 7,
    name: "Woodland Leather Boots",
    description: "Rugged and stylish Woodland leather boots ideal for outdoor adventures and trekking with superior grip.",
    price: 1600,
    rating: 5,
    src: "https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg"
  },
  {
    id: 8,
    name: "Bata Office Shoe",
    description: "Formal and comfortable Bata shoes suitable for office wear, combining elegance and durability.",
    price: 1150,
    rating: 3,
    src: "https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg"
  },
  {
    id: 9,
    name: "Campus Sports Shoe",
    description: "Budget-friendly Campus sports shoes designed for gym workouts, walking, and everyday sports.",
    price: 890,
    rating: 4,
    src: "https://images.pexels.com/photos/786003/pexels-photo-786003.jpeg"
  },
  {
    id: 10,
    name: "Red Tape Casual Loafer",
    description: "Stylish Red Tape loafers with slip-on design, ideal for casual and semi-formal occasions.",
    price: 1350,
    rating: 4,
    src: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
  }
];

const PORT = process.env.PORT;

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
main().then(res => console.log("connected"));
main().catch(err => console.log(err));

app.listen(PORT, (req, res) => {
  console.log("listening");
})

app.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
})

app.get('/product/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await Product.findOne({ id: productId });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  }
  catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Server error" });
  }
})

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

app.post('/review-submitted', async (req, res) => {
  try {
    const { name, rating, review, id } = req.body;

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
    });

    const savedReview = await newReview.save();

    console.log(savedReview);
    return res.status(201).json({ message: "Review submitted successfully!" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});
