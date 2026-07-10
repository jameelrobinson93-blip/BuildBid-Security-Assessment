import { useEffect, useState } from "react";
import API_URL from "../config.js";

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

    <div className="page">

      <h1>Customer Reviews</h1>

      <input
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
      />

      <br /><br />

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

      <br /><br />

      <textarea
        name="comment"
        rows="5"
        cols="60"
        placeholder="Write your review..."
        value={form.comment}
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={submitReview}>
        Submit Review
      </button>

      <hr />

      <h2>Recent Reviews</h2>

      {

        reviews.map((review) => (

          <div
            key={review.id}
            style={{
              border:"1px solid #ddd",
              padding:"15px",
              marginBottom:"15px",
              borderRadius:"8px"
            }}
          >

            <h3>{review.name}</h3>

            <p>

              Rating: {"★".repeat(review.rating)}

            </p>

            <p>

              {review.comment}

            </p>

            <small>

              {review.created_at}

            </small>

          </div>

        ))

      }

    </div>

  );

}

export default Reviews;