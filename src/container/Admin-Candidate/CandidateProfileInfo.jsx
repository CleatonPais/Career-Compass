import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CircularProgress } from "@mui/material";
import "./AdminCandidatePage.css";
// import { Card } from "react-bootstrap";

const CandidateProfileInfo = () => {
  const { userId } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidateDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/userprofile/admin/user-profile-with-applications/${userId}`,
          {
            headers: {
              "x-auth-token": sessionStorage.getItem("user"),
            },
          }
        );
        setCandidate(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching candidate details", error);
        setLoading(false);
      }
    };

    fetchCandidateDetails();
  }, [userId]);

  if (loading) {
    return (
      <div className="loading">
        <CircularProgress />
      </div>
    );
  }

  if (!candidate) {
    return <div className="error">Error loading candidate details</div>;
  }

  const { userProfile, jobApplications } = candidate;
  const {
    address,
    experience,
    education,
    profileImage,
    firstName,
    lastName,
    skills,
    userId: user,
  } = userProfile;

  return (
    <div className="container-fluid my-2 p-sm-5">
      <div className="row">
        <div className="col-12 text-center p-5">
          <img
            src={`http://localhost:5000/uploads/${profileImage
              .split("\\")
              .pop()}`}
            alt="Profile"
            className="profile-image"
          />
          <h2 className="section-title">Personal Info</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="info-item">
                <label>First Name:</label>
                <input
                  className="text-color"
                  type="text"
                  value={firstName}
                  disabled
                />
              </div>
              <div className="info-item">
                <label>Email:</label>
                <input
                  className="text-color"
                  type="email"
                  value={user.email}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="info-item">
                <label>Last Name:</label>
                <input
                  className="text-color"
                  type="text"
                  value={lastName}
                  disabled
                />
              </div>
              <div className="info-item">
                <label>Skills:</label>
                <input
                  className="text-color"
                  type="text"
                  value={skills}
                  disabled
                />
              </div>
            </div>
          </div>

          <h2 className="section-title">Address</h2>
          <div className="row">
            <div className="col-md-6">
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
                <label>Country:</label>
                <input
                  className="text-color"
                  type="text"
                  value={address.country}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-6">
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
                <label>Postal:</label>
                <input
                  className="text-color"
                  type="text"
                  value={address.postalCode}
                  disabled
                />
              </div>
            </div>
          </div>

          <h2 className="section-title">Experience</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="info-item">
                <label>Job Title:</label>
                <input
                  className="text-color"
                  type="text"
                  value={experience.jobTitle}
                  disabled
                />
              </div>
              <div className="info-item">
                <label>Company:</label>
                <input
                  className="text-color"
                  type="text"
                  value={experience.company}
                  disabled
                />
              </div>
              <div className="info-item">
                <label>End Date:</label>
                <input
                  className="text-color"
                  type="text"
                  value={new Date(experience.endDate).toLocaleDateString()}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="info-item">
                <label>Job Description:</label>
                <input
                  className="text-color"
                  type="text"
                  value={experience.jobDescription}
                  disabled
                />
              </div>
              <div className="info-item">
                <label>Start Date:</label>
                <input
                  className="text-color"
                  type="text"
                  value={new Date(experience.startDate).toLocaleDateString()}
                  disabled
                />
              </div>
            </div>
          </div>

          <h2 className="section-title">Education</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="info-item">
                <label>Qualification:</label>
                <input
                  className="text-color"
                  type="text"
                  value={education.qualification}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="info-item">
                <label>Institute:</label>
                <input
                  className="text-color"
                  type="text"
                  value={education.institute}
                  disabled
                />
              </div>
              <div className="info-item">
                <label>End Date:</label>
                <input
                  className="text-color"
                  type="text"
                  value={new Date(education.endDate).toLocaleDateString()}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <h2 className="section-title text-center mb-4">
                Jobs Applied ({jobApplications ? jobApplications.length : 0})
              </h2>
            </div>

            {jobApplications && jobApplications.length > 0 ? (
              jobApplications.map((application) => (
                <div key={application._id} className="col-lg-4 col-md-6 mb-4">
                  <Card
                    className="card-container shadow-sm"
                    style={{ background: "#f5f5f5" }}
                  >
                    <div className="card-container">
                      <h4 className="card-title">
                        {application.job_id?.title || "Title not available"}
                      </h4>
                      <p className="">
                        <strong>Company:</strong>{" "}
                        {application.job_id?.company_id?.name ||
                          "Company not available"}
                      </p>
                      <p className="">
                        <strong>Role:</strong>{" "}
                        {application.job_id?.role || "Role not available"}
                      </p>
                      <p className="">
                        <strong>Salary:</strong>{" "}
                        {application.job_id?.salary || "Salary not available"}
                      </p>
                      <p className="">
                        <strong>Skills:</strong>{" "}
                        {application.job_id?.skills?.join(", ") ||
                          "Skills not available"}
                      </p>
                      <p className="">
                        <strong>Location:</strong>{" "}
                        {application.job_id?.location
                          ? `${application.job_id.location.street}, ${application.job_id.location.city}, ${application.job_id.location.province}, ${application.job_id.location.country}, ${application.job_id.location.postalCode}`
                          : "Location not available"}
                      </p>
                    </div>
                  </Card>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No job applications found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfileInfo;
