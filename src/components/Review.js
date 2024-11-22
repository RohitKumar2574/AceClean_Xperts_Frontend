import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Review.css";

export const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5001/reviews");
        // Adjust the endpoint as necessary
        setReviews(response.data);
      } catch (err) {
        setError("Error fetching reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="review">
      <div className="review-header">
        <h1>Our Customer Reviews</h1>
      </div>
      <div className="review-content">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review-item">
              <h2>{review.customerName}</h2>
              <p>{review.content}</p>
              <span>{review.rating} Stars</span>
            </div>
          ))
        ) : (
          <p>Oops! There are no reviews.</p> // Updated message
        )}
      </div>
    </div>
  );
};
