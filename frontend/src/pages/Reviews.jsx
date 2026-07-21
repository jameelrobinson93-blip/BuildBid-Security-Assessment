/* ==========================================================
   BUILDBID
   PUBLIC REVIEWS PAGE
   PART 1
========================================================== */

import { useEffect, useMemo, useState } from "react";
import API_URL from "../config";
import "./Reviews.css";

function Reviews() {

  /* ==========================================
      STATE
  ========================================== */

  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    rating: 5,
    comment: "",
  });

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  /* ==========================================
      LOAD REVIEWS
  ========================================== */

  useEffect(() => {

    loadReviews();

  }, []);

  async function loadReviews() {

    try {

      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/reviews`
      );

      const data = await response.json();

      setReviews(Array.isArray(data) ? data : []);

    } catch (err) {

      console.error(err);

      setError("Unable to load reviews.");

    } finally {

      setLoading(false);

    }

  }

  /* ==========================================
      HANDLE FORM
  ========================================== */

  function handleChange(e) {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  }

  /* ==========================================
      SUBMIT REVIEW
  ========================================== */

  async function submitReview() {

    if (!token) {

      alert("Please log in before leaving a review.");

      return;

    }

    if (!form.comment.trim()) {

      alert("Please write a review.");

      return;

    }

    try {

      setSubmitting(true);

      const response = await fetch(

        `${API_URL}/api/reviews`,

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,

          },

          body: JSON.stringify({

            rating: Number(form.rating),

            comment: form.comment,

          }),

        }

      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(

          data.message ||

          "Unable to submit review."

        );

      }

      alert("Thank you for your review!");

      setForm({

        rating: 5,

        comment: "",

      });

      loadReviews();

    } catch (err) {

      console.error(err);

      alert(err.message);

    } finally {

      setSubmitting(false);

    }

  }

  /* ==========================================
      REVIEW STATISTICS
  ========================================== */

  const averageRating = useMemo(() => {

    if (!reviews.length) return 0;

    const total = reviews.reduce(

      (sum, review) =>

        sum + Number(review.rating),

      0

    );

    return (total / reviews.length).toFixed(1);

  }, [reviews]);

  /* ==========================================
      START PAGE
  ========================================== */

  return (

    <div className="reviews-page">

      <section className="reviews-hero">

        <h1>

          Trusted By Homeowners

        </h1>

        <p>

          Read verified customer reviews and
          discover why homeowners choose
          BuildBid for trusted contractors.

        </p>

      </section>

      <div className="reviews-stats">

        <div className="stat-card">

          <h2>{averageRating}</h2>

          <span>Average Rating</span>

        </div>

        <div className="stat-card">

          <h2>{reviews.length}</h2>

          <span>Total Reviews</span>

        </div>

        <div className="stat-card">

          <h2>100%</h2>

          <span>Verified Customers</span>

        </div>

      </div>

      <section className="review-form">

        <h2>

          Leave a Review

        </h2>

        {!token && (

          <div className="login-warning">

            Please log in before submitting
            a review.

          </div>

        )}

        {token && (

          <>

            <div className="logged-in-user">

              Logged in as

              <strong>

                {" "}
                {user.first_name} {user.last_name}

              </strong>

            </div>

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

              placeholder="Tell other homeowners about your experience..."

              value={form.comment}

              onChange={handleChange}

            />

            <button

              onClick={submitReview}

              disabled={submitting}

            >

              {submitting

                ? "Submitting..."

                : "Submit Review"}

            </button>

          </>

        )}

      </section>

      <section className="reviews-grid">
                {loading ? (

          <div className="loading">

            Loading reviews...

          </div>

        ) : error ? (

          <div className="error-message">

            {error}

          </div>

        ) : reviews.length === 0 ? (

          <div className="empty-reviews">

            <h3>No reviews yet.</h3>

            <p>

              Be the first homeowner to share your
              experience with BuildBid.

            </p>

          </div>

        ) : (

          reviews.map((review) => (

            <div

              className="review-card"

              key={review.id}

            >

              <div className="review-header">

                <div>

                  <h3>

                    {review.first_name && review.last_name
                      ? `${review.first_name} ${review.last_name}`
                      : review.name || "Verified Customer"}

                  </h3>

                  <div className="review-stars">

                    {"★".repeat(Number(review.rating))}

                    {"☆".repeat(5 - Number(review.rating))}

                  </div>

                </div>

                <span className="review-date">

                  {review.created_at
                    ? new Date(
                        review.created_at
                      ).toLocaleDateString()
                    : ""}

                </span>

              </div>

              <p className="review-comment">

                {review.comment}

              </p>

            </div>

          ))

        )}

      </section>

    </div>

  );

}

export default Reviews;