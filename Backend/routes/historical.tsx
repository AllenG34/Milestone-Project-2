import express, { Request, Response, Router } from 'express';
import HistoricalReviewModel from '../models/Historical';

// Your router code


const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const reviews = await HistoricalReviewModel.find({});
    res.send({ reviews });
  } catch (e) {
    console.error('reviews', e);
    res.status(500).send('Failure');
  }
});

router.post('/submit', async (req: Request, res: Response) => {
  try {
    const { location, rating, comment } = req.body;

    // Create a new review object
    await new HistoricalReviewModel({
      location,
      rating,
      comment,
    }).save();
    res.send('Success');
  } catch (e) {
    console.error(e);
    res.status(500).send('Failure');
  }
});

export default router;
