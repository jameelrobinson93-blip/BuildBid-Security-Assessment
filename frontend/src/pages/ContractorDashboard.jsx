import { useEffect, useState } from "react";
import API_URL from "../config";
import "./Dashboard.css";

function ContractorDashboard() {

  const contractor = JSON.parse(localStorage.getItem("user"));

  const [jobs, setJobs] = useState([]);

  useEffect(() => {

    async function loadJobs() {

      try {

        const response = await fetch(
          `${API_URL}/api/contractor/jobs/${contractor.id}`
        );

        const data = await response.json();

        if (data.success) {

          setJobs(data.jobs);

        }

      } catch (err) {

        console.error(err);

      }

    }

    if (contractor) {

      loadJobs();

    }

  }, [contractor]);

  return (

    <div className="dashboard">

      <h1>Contractor Dashboard</h1>

      <p>
        View and manage incoming estimate requests.
      </p>

      {jobs.length === 0 ? (

        <p>No estimates assigned yet.</p>

      ) : (

        jobs.map((job) => (

          <div
            key={job.id}
            className="estimate-card"
          >

            <h3>{job.project_type}</h3>

            <p>
              <strong>Customer:</strong> {job.customer_name}
            </p>

            <p>
              <strong>Email:</strong> {job.customer_email}
            </p>

            <p>
              <strong>Budget:</strong> ${Number(job.budget).toLocaleString()}
            </p>

            <p>
              <strong>Status:</strong> {job.status}
            </p>

          </div>

        ))

      )}

    </div>

  );

}

export default ContractorDashboard;