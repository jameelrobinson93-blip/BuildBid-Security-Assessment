import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";

import {
  Star,
  Search,
  Eye,
  Trash2,
  CheckCircle,
  MessageSquare,
  Users,
  RefreshCw,
  ShieldCheck
} from "lucide-react";

export default function Reviews() {

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {

    // Future API call
    // loadReviews();

  }, []);

  const filteredReviews = reviews.filter((review) => {

    const matchesSearch =

      (review.name || "")
        .toLowerCase()
        .includes(search.toLowerCase())

      ||

      (review.review || "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =

      filter === "All"

        ? true

        : review.status === filter;

    return matchesSearch && matchesFilter;

  });

  return (

    <AdminLayout>

      <div className="admin-content">

        <div className="page-header">

          <div>

            <h1>Review Management</h1>

            <p>
              Moderate customer reviews and testimonials.
            </p>

          </div>

          <button className="primary-btn">

            <RefreshCw size={18} />

            Refresh

          </button>

        </div>

        <div className="dashboard-cards">

          <div className="dashboard-card">

            <div className="card-icon reviews">

              <MessageSquare size={30} />

            </div>

            <span>Total Reviews</span>

            <h1>{reviews.length}</h1>

            <p>Customer Feedback</p>

          </div>

          <div className="dashboard-card">

            <div className="card-icon users">

              <Star size={30} />

            </div>

            <span>5-Star Reviews</span>

            <h1>

              {
                reviews.filter(r => r.rating === 5).length
              }

            </h1>

            <p>Excellent Ratings</p>

          </div>

          <div className="dashboard-card">

            <div className="card-icon contractors">

              <CheckCircle size={30} />

            </div>

            <span>Approved</span>

            <h1>

              {
                reviews.filter(r => r.status === "Approved").length
              }

            </h1>

            <p>Visible Reviews</p>

          </div>

          <div className="dashboard-card">

            <div className="card-icon analytics">

              <ShieldCheck size={30} />

            </div>

            <span>Pending</span>

            <h1>

              {
                reviews.filter(r => r.status === "Pending").length
              }

            </h1>

            <p>Awaiting Approval</p>

          </div>

        </div>

        <div className="search-wrapper">

          <Search
            className="search-icon"
            size={20}
          />

          <input
            className="search-input"
            placeholder="Search reviews..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

        </div>

        <div className="filter-row">

          {["All","Approved","Pending"].map(item => (

            <button
              key={item}
              className={
                filter===item
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={()=>setFilter(item)}
            >

              {item}

            </button>

          ))}

        </div>

        <div className="activity-panel">

          {loading ? (

            <h2>Loading Reviews...</h2>

          ) : (

            <table>

              <thead>

                <tr>

                  <th>Customer</th>

                  <th>Rating</th>

                  <th>Review</th>

                  <th>Status</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {filteredReviews.length === 0 ? (

                  <tr>

                    <td
                      colSpan="5"
                      style={{
                        textAlign:"center",
                        padding:"60px"
                      }}
                    >

                      No reviews found.

                    </td>

                  </tr>

                ) : (

                  filteredReviews.map((review,index)=>(

                    <tr key={index}>

                      <td>

                        <div
                          style={{
                            display:"flex",
                            alignItems:"center",
                            gap:"15px"
                          }}
                        >

                          <div className="table-avatar">

                            <Users size={18}/>

                          </div>

                          <strong>

                            {review.name}

                          </strong>

                        </div>

                      </td>

                      <td>

                        {"⭐".repeat(review.rating)}

                      </td>

                      <td>

                        {review.review}

                      </td>

                      <td>

                        <span
                          className={`status-badge ${review.status?.toLowerCase()}`}
                        >

                          {review.status}

                        </span>

                      </td>

                      <td>

                        <div className="table-actions">

                          <button className="icon-btn view-btn">

                            <Eye size={18}/>

                          </button>

                          <button className="icon-btn approve-btn">

                            <CheckCircle size={18}/>

                          </button>

                          <button className="icon-btn delete-btn">

                            <Trash2 size={18}/>

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </AdminLayout>

  );

}