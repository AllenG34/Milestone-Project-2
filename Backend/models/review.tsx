import mongoose, { Document, Model, Schema } from 'mongoose';

interface IReview extends Document {
  restaurant: string;
  rating: number;
  comment: string;
}

const reviewSchema = new Schema<IReview>({
  restaurant: String,
  rating: Number,
  comment: String,
});

const ReviewModel: Model<IReview> = mongoose.model<IReview>('Review', reviewSchema);

export default ReviewModel;
