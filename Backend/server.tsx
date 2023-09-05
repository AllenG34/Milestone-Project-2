
import express from 'express';
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3003;

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://maldolt:Pikachu1!@cluster0.5nvxwp6.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err: Error) => {
    console.log("Could not connect to MongoDB...");
    console.error(err); // Log the error for debugging
  });


// Parse JSON bodies
app.use(express.json());

// Define routes
const foodRoutes = require('./routes/foodRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const adventureRoutes = require('./routes/AdventureRoutes');
const adventureReviewRoutes = require('./routes/AdventureReviewRoutes');
const nightlifeRoutes = require('./routes/nightlifeRoutes');
const historicalRoutes = require('./routes/historical');
const shoppingRoutes = require('./routes/shoppingRoutes');

// Define expressRouter as a new variable to avoid redeclaration
const expressRouter = express.Router();

// Use routes with expressRouter
expressRouter.use('/api/foods', foodRoutes);
expressRouter.use('/api/reviews', reviewRoutes);
expressRouter.use('/api/adventure', adventureRoutes);
expressRouter.use('/api/adventureReviews', adventureReviewRoutes);
expressRouter.use('/api/nightlife', nightlifeRoutes);
expressRouter.use('/api/historical', historicalRoutes);
expressRouter.use('/api/shopping', shoppingRoutes);

// Use expressRouter as middleware
app.use(expressRouter);

// Serve static files
app.use(express.static(path.join(__dirname, 'nevada', 'build')));

// Catch-all route for handling React routing
app.get('*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, 'nevada', 'build', 'index.html'));
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
