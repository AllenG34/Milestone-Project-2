import express, { Request, Response, Router } from "express";
import { Document } from "mongoose";
import AdventureReviewModel from "../models/AdventureReview";

const router: Router = express.Router();

// Define the AdventureReview document interface
interface IAdventureReview extends Document {
  location: string;
  rating: number;
  comment: string;
}

router.get("/", async (req: Request, res: Response) => {
  try {
    const reviews: IAdventureReview[] = await AdventureReviewModel.find({});
    res.send({ reviews });
  } catch (e) {
    console.error("reviews", e);
    res.status(500).send("Failure");
  }
});

router.post("/submit", async (req: Request, res: Response) => {
  try {
    const { location, rating, comment }: IAdventureReview = req.body;

    // Create a new review object
    await new AdventureReviewModel({
      location,
      rating,
      comment,
    }).save();
    res.send("Success");
  } catch (e) {
    console.error(e);
    res.status(500).send("Failure");
  }
});

export default router;
