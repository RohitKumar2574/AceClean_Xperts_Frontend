import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "../styles/Review.css";

export const Review = ({ showContentOnly = false }) => {
  const [reviews, setReviews] = useState([]); // All reviews
  const [latestReviews, setLatestReviews] = useState([]); // Latest 9 reviews
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalContent, setModalContent] = useState(null); // Modal content
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility
  const [form, setForm] = useState({
    name: "",
    email: "",
    review: "",
    rating: 0,
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5001/reviews");
        setReviews(response.data);

        // Set the latest 10 reviews
        setLatestReviews(response.data.slice(0, 9));
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
    setForm({ ...form, rating });
    setErrors({ ...errors, rating: "" });
  };

  const handleStarHover = (rating) => {
    setHoverRating(rating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
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
      const response = await axios.post(
        "http://localhost:5001/reviews/add",
        form
      );
      alert("Review submitted successfully!");

      const newReviews = [response.data, ...reviews];
      setReviews(newReviews);

      // Update latest reviews
      setLatestReviews(newReviews.slice(0, 10));

      setForm({ name: "", email: "", review: "", rating: 0 });
      setHoverRating(0);
      setErrors({});
    } catch (err) {
      alert("Failed to submit the review.");
    }
  };

  const handleOpenModal = (review) => {
    setModalContent(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>{error}</div>;

  // Carousel settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="review-container">
      {showContentOnly ? (
        <div className="review-carousel">
          <h1>What Our Customers Say</h1>
          <Slider {...sliderSettings}>
            {reviews.map((review, index) => (
              <div key={index} className="review-card-wrapper">
                <div
                  className="review-card"
                  onClick={() => handleOpenModal(review)}
                  title="Click to view full review"
                >
                  <div className="review-header">
                    <span className="review-avatar">
                      {review?.name[0]?.toUpperCase()}
                    </span>
                    <h3>{review.name}</h3>
                  </div>
                  <p className="review-text">
                    {review.review.length > 30
                      ? `${review.review.slice(0, 30)}...`
                      : review.review}
                  </p>
                  <div className="review-footer">
                    <span className="review-rating">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <>
          <div className="review">
            <div className="review-header"></div>
            <div className="review-form">
              <h2>Write a Review</h2>
              <form onSubmit={handleSubmit}>
                <div className="review-form-group">
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
                <div className="review-form-group">
                  <label>Rating</label>
                  <div className="rating-stars" onMouseLeave={handleStarLeave}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className={`star ${
                          hoverRating >= star || form.rating >= star
                            ? "filled"
                            : ""
                        }`}
                        onMouseEnter={() => handleStarHover(star)}
                        onClick={() => handleStarClick(star)}
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
            <h1>Recent Reviews</h1>
            <div className="review-grid">
              {latestReviews.map((review, index) => (
                <div
                  key={index}
                  className="review-card"
                  onClick={() => handleOpenModal(review)}
                  title="Click to view full review"
                >
                  <div className="review-header">
                    <span className="review-avatar">
                      {review?.name[0]?.toUpperCase()}
                    </span>
                    <h3>{review.name}</h3>
                  </div>
                  <p className="review-text">
                    {review.review.length > 30
                      ? `${review.review.slice(0, 30)}...`
                      : review.review}
                  </p>
                  <div className="review-footer">
                    <span className="review-rating">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={handleCloseModal}>
              &times;
            </button>
            <h2>{modalContent?.name}'s Review</h2>
            <p>{modalContent?.review}</p>
          </div>
        </div>
      )}
    </div>
  );
};
