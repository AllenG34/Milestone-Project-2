import express, { Request, Response, Router } from 'express';
import NightlifeReviewModel from '../models/Nightlife';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const reviews = await NightlifeReviewModel.find({});
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
    await new NightlifeReviewModel({
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
