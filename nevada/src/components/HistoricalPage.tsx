import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import './HistoricalPage.css';

interface Review {
  _id: string;
  location: string;
  rating: string;
  comment: string;
}

const HistoricalPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<Review>({
    _id: '', // Add an empty string as a placeholder for _id
    location: '',
    rating: '',
    comment: '',
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/Historical/submit', newReview);
      fetchReviews();
      setNewReview({
        _id: '', // Reset _id to an empty string
        location: '',
        rating: '',
        comment: '',
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get<{ reviews: Review[] }>('/api/Historical/');
      setReviews(response.data.reviews);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const changeRating = (newRating: number) => {
    setNewReview({ ...newReview, rating: newRating.toString() });
  };

  return (
    <div className="historical-page">
      <h1>Historical Reviews</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Location:
          <input
            type="text"
            value={newReview.location}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewReview({ ...newReview, location: e.target.value })
            }
          />
        </label>
        <label>
          Rating:
          <StarRatings
            rating={Number(newReview.rating)}
            starRatedColor="gold"
            changeRating={changeRating}
            numberOfStars={5}
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
          <div key={review._id}>
            <h3>{review.location}</h3>
            <p>Rating: {review.rating}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoricalPage;
