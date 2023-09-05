import express, { Request, Response, Router } from 'express';
import AdventureReviewModel from '../models/AdventureReview';

const router: Router = express.Router();

router.post('/submit', async (req: Request, res: Response) => {
  try {
    const { location, rating, comment } = req.body;

    // Create a new review object
    const newAdventureReview = new AdventureReviewModel({
      location,
      rating,
      comment,
    });

    // Save the review
    const result = await newAdventureReview.save();

    console.log('Review added successfully:', result);
    res.status(200).send('Review added successfully');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error adding review');
  }
});

export default router;
