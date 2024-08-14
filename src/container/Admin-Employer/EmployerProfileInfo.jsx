import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Card } from "@mui/material";
import "./AdminEmployerPage.css";

const EmployerProfileInfo = () => {
  const { empID } = useParams(); // Get empID from URL
  const [employer, setEmployer] = useState(null);
  const [availableJobs, setavailableJobs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployerDetails = async () => {
      try {
        // Fetch the employer profile using the empID
        const response = await axios.get(
          `http://localhost:5000/api/profile/getEmployerAdmin/${empID}`,
          {
            headers: {
              "x-auth-token": sessionStorage.getItem("user"),
            },
          }
        );
        console.log("API Response:", response.data); // Log the full response for debugging
        setEmployer(response.data);
        setavailableJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employer details", error);
        setLoading(false);
      }
    };

    fetchEmployerDetails();
  }, [empID]);

  if (loading) {
    return (
      <div className="loading">
        <CircularProgress />
      </div>
    );
  }

  if (!employer) {
    return <div className="error">Error loading employer details</div>;
  }

  // Destructure profile and userId from employer

  const { profile } = employer;
  const { jobs } = availableJobs;
  const {
    address,
    companyLogo,
    companyName,
    companyDescription,
    industry,
    userId,
  } = profile;
  const email = userId ? userId.email : "Email not available";

  return (
    <div className="container-fluid my-2 p-sm-5">
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8 text-center p-5">
          <img
            src={`http://localhost:5000/uploads/${companyLogo
              .split("\\")
              .pop()}`}
            alt="Profile"
            className="profile-image"
          />
          <div className="info-item">
            <label>Email:</label>
            <input className="text-color" type="text" value={email} disabled />
          </div>
          <div className="info-item">
            <label>Company Name:</label>
            <input
              className="text-color"
              type="text"
              value={companyName}
              disabled
            />
          </div>
          <div className="info-item">
            <label>Description:</label>
            <input
              className="text-color"
              type="text"
              value={companyDescription}
              disabled
            />
          </div>
          <div className="info-item">
            <label>Industry:</label>
            <input
              className="text-color"
              type="text"
              value={industry}
              disabled
            />
          </div>

          <h2 className="section-title">Address</h2>
          <div className="row">
            <div className="col-md-12">
              <div className="info-item">
                <label>Street:</label>
                <input
                  className="text-color"
                  type="text"
                  value={address.street}
                  disabled
                />
              </div>
              <div className="info-item">
                <label>City:</label>
                <input
                  className="text-color"
                  type="text"
                  value={address.city}
                  disabled
                />
              </div>
              <div className="info-item">
                <label>Country:</label>
                <input
                  className="text-color"
                  type="text"
                  value={address.country}
                  disabled
                />
              </div>
              <div className="info-item">
                <label>Postal Code:</label>
                <input
                  className="text-color"
                  type="text"
                  value={address.postalCode}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-2"></div>

        {/* Jobs Section */}

        <div className="row text-center">
          <h2 className="section-title ">
            Jobs Posting ({jobs ? jobs.length : 0})
          </h2>
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job._id} className="col-lg-4 col-md-6 mb-4">
                <Card
                  className="card-container"
                  style={{ background: "#f5f5f5" }} // Replace with your cardColor or other styling
                >
                  <div className="card-content">
                    <h4 className="card-title">{job.title}</h4>
                    <p>
                      <strong>Description:</strong> {job.description}
                    </p>
                    <p>
                      <strong>Location:</strong> {job.location.city}
                    </p>
                    <p>
                      <strong>Salary:</strong> {job.salary}
                    </p>
                    <p>
                      <strong>Role:</strong> {job.role}
                    </p>
                    <p>
                      <strong>Skills:</strong> {job.skills.join(", ")}
                    </p>
                  </div>
                </Card>
              </div>
            ))
          ) : (
            <p>No jobs available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerProfileInfo;
