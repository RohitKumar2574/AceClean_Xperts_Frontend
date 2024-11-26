import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Review.css";

export const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    review: "",
    rating: 0, // Default is 0 (no selection)
  });
  const [hoverRating, setHoverRating] = useState(0); // For hover effect
  const [errors, setErrors] = useState({});

  // Fetch reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5001/reviews");

        setReviews(response.data);
      } catch (err) {
        setError("Error fetching reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleStarClick = (rating) => {
    setForm({ ...form, rating }); // Set the selected rating
    setErrors({ ...errors, rating: "" }); // Clear any rating errors
  };

  const handleStarHover = (rating) => {
    setHoverRating(rating); // Temporarily highlight stars on hover
  };

  const handleStarLeave = () => {
    setHoverRating(0); // Reset hover state when the mouse leaves
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.review) newErrors.review = "Review is required.";
    if (!form.rating || form.rating < 1 || form.rating > 5)
      newErrors.rating = "Please select a rating.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      form.email = localStorage.getItem("email");
      const response = await axios.post("http://localhost:5001/reviews/add", form);
      alert("Review submitted successfully!");
      form.name = response.data.name;
      setReviews([ form, ...reviews]);
      setForm({ name: "", email: "", review: "", rating: 0 }); // Reset form
      setHoverRating(0); // Reset hover state
      setErrors({});
    } catch (err) {
      alert("Failed to submit the review.");
    }
  };

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="review-container">
      <div className="review">
        <div className="review-header">
          <h1>Our Customer Reviews</h1>
        </div>
        <div className="review-form">
          <h2>Write a Review</h2>
          <form onSubmit={handleSubmit}>
          
            <div className="form-group">
              <label htmlFor="review">Review</label>
              <textarea
                id="review"
                name="review"
                value={form.review}
                onChange={handleInputChange}
                placeholder="Write your review"
              ></textarea>
              {errors.review && (
                <span className="error-text">{errors.review}</span>
              )}
            </div>
            <div className="form-group">
              <label>Rating</label>
              <div
                className="rating-stars"
                onMouseLeave={handleStarLeave} // Reset hover effect
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <div
                    key={star}
                    className={`star ${
                      hoverRating >= star || form.rating >= star ? "filled" : ""
                    }`}
                    onMouseEnter={() => handleStarHover(star)} // Highlight stars on hover
                    onClick={() => handleStarClick(star)} // Set rating on click
                  ></div>
                ))}
              </div>
              {errors.rating && (
                <span className="error-text">{errors.rating}</span>
              )}
            </div>
            <button type="submit">Submit Review</button>
          </form>
        </div>
      </div>
      <div className="review-content">
        <h1>Recent reviews</h1>
        <div className="review-grid">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <span className="review-avatar">
                    {review?.name[0]?.toUpperCase()}
                  </span>
                  <h3>{review.name}</h3>
                </div>
                <p className="review-text">{review.review}</p>
                <div className="review-footer">
                  <span className="review-rating">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
      </div>
    </div>
  );
};
