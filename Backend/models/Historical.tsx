import mongoose, { Document, Model, Schema } from 'mongoose';

interface IHistoricalReview extends Document {
  location: string;
  rating: number;
  comment: string;
}

const historicalReviewSchema = new Schema<IHistoricalReview>({
  location: String,
  rating: Number,
  comment: String,
});

const HistoricalReviewModel: Model<IHistoricalReview> = mongoose.model<IHistoricalReview>('HistoricalReview', historicalReviewSchema);

export default HistoricalReviewModel;
