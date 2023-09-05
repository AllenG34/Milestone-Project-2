import mongoose, { Document, Model, Schema } from "mongoose";

// Define an interface for your adventure review document
interface IAdventureReview extends Document {
  location: string;
  rating: number;
  comment: string;
}

// Define the schema using TypeScript types
const adventureReviewSchema = new Schema<IAdventureReview>({
  location: String,
  rating: Number,
  comment: String,
});

// Define the model using TypeScript types
const AdventureReviewModel: Model<IAdventureReview> = mongoose.model<IAdventureReview>(
  "AdventureReview",
  adventureReviewSchema
);

export default AdventureReviewModel; // Default export
