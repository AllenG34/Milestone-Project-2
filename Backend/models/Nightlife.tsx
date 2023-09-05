import mongoose, { Document, Model, Schema } from 'mongoose';

// Define an interface for your nightlife review document
interface INightlifeReview extends Document {
  location: string;
  rating: number;
  comment: string;
}

// Define the schema using TypeScript types
const nightlifeReviewSchema = new Schema<INightlifeReview>({
  location: String,
  rating: Number,
  comment: String,
});

// Define the model using TypeScript types
const NightlifeReviewModel: Model<INightlifeReview> = mongoose.model<INightlifeReview>(
  'NightlifeReview',
  nightlifeReviewSchema
);

export default NightlifeReviewModel;
