import express, { Request, Response, Router } from 'express';
import ReviewModel from '../models/review';

// Your router code


const router: Router = express.Router();

router.post('/submit', async (req: Request, res: Response) => {
  try {
    const { restaurant, rating, comment } = req.body;

    // Create a new review object
    const newReview = new ReviewModel({
      restaurant,
      rating,
      comment,
    });

    // Save the review
    const result = await newReview.save();

    console.log('Review added successfully:', result);
    res.status(200).send('Review added successfully');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error adding review');
  }
});

export default router;
