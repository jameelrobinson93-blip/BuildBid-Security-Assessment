import { useEffect, useState } from "react";
import API_URL from "../config.js";
import "./Reviews.css";

function Reviews() {

  const [reviews, setReviews] = useState([]);

  const [form, setForm] = useState({
    name: "",
    rating: 5,
    comment: ""
  });

  async function loadReviews() {

    try {

      const response = await fetch(
        `${API_URL}/api/reviews`
      );

      const data = await response.json();

      setReviews(data);

    } catch (error) {

      console.log(error);

    }

  }

  useEffect(() => {

    loadReviews();

  }, []);

  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  }

  async function submitReview() {

    try {

      const response = await fetch(
        `${API_URL}/api/reviews`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(form)
        }
      );

      const data = await response.json();

      alert(data.message);

      setForm({
        name: "",
        rating: 5,
        comment: ""
      });

      loadReviews();

    } catch (error) {

      console.log(error);

    }

  }

return (

  <div className="reviews-page">

    <div className="reviews-header">

      <h1>Homeowner Reviews</h1>

      <p>
        Read what homeowners are saying about their BuildBid experience,
        or leave a review after your project is complete.
      </p>

    </div>

    <div className="review-form">

      <h2>Leave a Review</h2>

      <input
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
      />

      <select
        name="rating"
        value={form.rating}
        onChange={handleChange}
      >
        <option value="5">★★★★★</option>
        <option value="4">★★★★☆</option>
        <option value="3">★★★☆☆</option>
        <option value="2">★★☆☆☆</option>
        <option value="1">★☆☆☆☆</option>
      </select>

      <textarea
        name="comment"
        rows="6"
        placeholder="Tell us about your experience..."
        value={form.comment}
        onChange={handleChange}
      />

      <button onClick={submitReview}>
        Submit Review
      </button>

    </div>

    <div className="reviews-grid">

      {reviews.map((review) => (

        <div
          className="review-card"
          key={review.id}
        >

          <div className="review-stars">

            {"★".repeat(review.rating)}

          </div>

          <p className="review-comment">

            "{review.comment}"

          </p>

          <h3>{review.name}</h3>

          <small>{review.created_at}</small>

        </div>

      ))}

    </div>

  </div>

);

}

export default Reviews;