import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import './FoodPage.css';

interface Review {
  _id: string;
  restaurant: string;
  rating: string;
  comment: string;
}

const FoodPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<Review>({
    _id: '', // Add an empty string as a placeholder for _id
    restaurant: '',
    rating: '',
    comment: '',
  });
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/reviews/submit', newReview);
      fetchReviews();
      setNewReview({
        _id: '', // Reset _id to an empty string
        restaurant: '',
        rating: '',
        comment: '',
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get<{ reviews: Review[] }>('/api/reviews');
      setReviews(response.data.reviews);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const changeRating = (newRating: number) => {
    setRating(newRating);
    setNewReview({ ...newReview, rating: newRating.toString() });
  };

  return (
    <div className="food-page">
      <h1>Food Reviews</h1>
      <form onSubmit={handleSubmit} className="food-form">
        <label>
          Restaurant:
          <input
            type="text"
            value={newReview.restaurant}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewReview({ ...newReview, restaurant: e.target.value })
            }
          />
        </label>
        <label>
          Rating:
          <StarRatings
            rating={rating}
            starRatedColor="blue"
            changeRating={changeRating}
            numberOfStars={5}
            name="rating"
          />
        </label>
        <label>
          Comment:
          <textarea
            value={newReview.comment}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div className="reviews-container">
        <h2>Reviews:</h2>
        {reviews.map((review) => (
          <div key={review._id} className="review">
            <h3>{review.restaurant}</h3>
            <StarRatings
              rating={parseFloat(review.rating)}
              starRatedColor="blue"
              numberOfStars={5}
              starDimension="50px"
              starSpacing="2px"
            />
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodPage;
