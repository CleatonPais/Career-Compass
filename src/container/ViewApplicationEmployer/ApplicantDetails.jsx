import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  TextField,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Download } from "@mui/icons-material";
import axios from "axios";
import "../ViewApplicationEmployer/ApplicantDetails.css";
import Navbar from "../../components/Common/Navbar";
import { textAlign } from "@mui/system";
import Footer from "../../components/Common/Footer";
import { red } from "@mui/material/colors";

const ApplicantDetails = () => {
  const [primaryColor, setPrimaryColor] = useState("");
  const [primaryFontColor, setPrimaryFontColor] = useState("");
  const [secondaryFontColor, setSecondaryFontColor] = useState("");
  const [cardColor, setcardColor] = useState("");
  const [footerLinkColor, setfooterLinkColor] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const [applicantDetails, setApplicantDetails] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    setPrimaryColor(rootStyles.getPropertyValue("--primary-color").trim());
    setPrimaryFontColor(
      rootStyles.getPropertyValue("--primary-font-color").trim()
    );
    setSecondaryFontColor(
      rootStyles.getPropertyValue("--secondary-font-color").trim()
    );
    setcardColor(rootStyles.getPropertyValue("--card-color").trim());
    setfooterLinkColor(
      rootStyles.getPropertyValue("--footer-link-color").trim()
    );

    const fetchApplicantDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/jobapplications/jobapplication/${id}`,
          {
            headers: {
              "x-auth-token": sessionStorage.getItem("user"),
            },
          }
        );
        setApplicantDetails(response.data);
      } catch (error) {
        console.error("Error fetching applicant details", error);
      }
    };

    fetchApplicantDetails();
  }, [id]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleScheduleInterview = () => {
    navigate(`/schedule-interview/${id}`);
  };

  const handleRejectApplication = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/jobapplications/rejectapplication/${id}`,
        {},
        {
          headers: {
            "x-auth-token": sessionStorage.getItem("user"),
          },
        }
      );
      setSnackbarMessage("Application Rejected");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setTimeout(() => navigate("/candidate_applications"), 2000);
    } catch (error) {
      console.error("Error rejecting application", error);
      setSnackbarMessage("Error rejecting application");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleApproveApplication = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/jobapplications/approveapplication/${id}`,
        {},
        {
          headers: {
            "x-auth-token": sessionStorage.getItem("user"),
          },
        }
      );
      setSnackbarMessage("Application Approved");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => navigate("/candidate_applications"), 2000);
    } catch (error) {
      console.error("Error rejecting application", error);
      setSnackbarMessage("Error approving application");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  if (!applicantDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <div className="row">
        <Navbar
          logo="/logo.png"
          primaryFontColor={primaryFontColor}
          primaryColor={primaryColor}
        />
        <div className="col-md-12">
          <div
            className="applicant-heding"
            style={{ color: primaryFontColor, backgroundColor: primaryColor }}
          >
            <h1>Review Candidate Application</h1>
            <p>Review and manage applications from potential candidates</p>
          </div>
          <div className="text-center applicant-details">
            <h2
              className=""
              style={{
                color: primaryColor,
                textAlign: "center",
                margin: "50px",
              }}
            >
              Job Role:&nbsp; {" "}
              {applicantDetails.job_id ? applicantDetails.job_id.title : " "}
            </h2>
            <div
              style={{
                background: primaryFontColor,
                padding: "1rem",
                borderRadius: "15px",
                textAlign: "center",
                position: "relative",
                cursor: "pointer",
                margin: "50px",
              }}
            >
              <h3
                className="card-title"
                style={{
                  fontWeight: "bold",
                  margin: "15px",
                  color: primaryColor,
                }}
              >
                {/* {applicantDetails.user_id.name} */}
                Personal Details
              </h3>
              <div className="personal-details mt-5 " style={{}}>
                <TextField
                  type="text"
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  name="First Name"
                  className="login-field"
                  value={applicantDetails.firstName}
                  style={{ marginBottom: "16px" }}
                  disabled
                />
                <TextField
                  type="text"
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  name="Last Name"
                  className="login-field"
                  value={applicantDetails.lastName}
                  style={{ marginBottom: "16px" }}
                  disabled
                />
              </div>
              <div className="personal-details">
                <TextField
                  type="text"
                  id="outlined-basic"
                  variant="outlined"
                  name="First Name"
                  className="login-field"
                  label="Email"
                  value={applicantDetails.email}
                  style={{ marginBottom: "16px" }}
                  disabled
                />
                <TextField
                  type="text"
                  id="outlined-basic"
                  variant="outlined"
                  name="First Name"
                  className="login-field"
                  label="Phone number"
                  value={applicantDetails.phoneNumber}
                  style={{ marginBottom: "16px" }}
                  disabled
                />
              </div>

              <div className="download-items">
                <div style={{ marginBottom: "16px" }}>
                  <a
                    href={`http://localhost:5000/uploads/${applicantDetails.resume
                      .split("\\")
                      .pop()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <IconButton color="primary">
                      <Download />
                    </IconButton>
                    Resume
                  </a>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <a
                    href={`http://localhost:5000/uploads/${applicantDetails.cover_letter
                      .split("\\")
                      .pop()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <IconButton color="primary">
                      <Download />
                    </IconButton>
                    Cover Letter
                  </a>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <a
                    href={`http://localhost:5000/uploads/${applicantDetails.portfolio
                      .split("\\")
                      .pop()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <IconButton color="primary">
                      <Download />
                    </IconButton>
                    Portfolio
                  </a>
                </div>
              </div>

              <div className="my-5">
                <h4>Application Status: {applicantDetails.status} </h4>
                
              </div>

              {applicantDetails.status === "Interview Confirmed" && (
                <div className="text-center">
                  <h3 className="mt-5"> Interview details: </h3>
                  {applicantDetails.interview_details}
                  {applicantDetails.interview_dates &&
                  applicantDetails.interview_dates.length > 0 ? (
                    <>
                      {
                        <div className="mt-4">
                          <h4>Interview Date</h4>
                          <p>
                            {new Date(
                              applicantDetails.interview_dates[0].date
                            ).toLocaleDateString()}{" "}
                            at {applicantDetails.interview_dates[0].time}
                          </p>
                        </div>
                      }
                    </>
                  ) : (
                    <div>
                      <h4>No Interview Dates Available</h4>
                      <p>
                        There are no interview dates scheduled at the moment.
                      </p>
                    </div>
                  )}
                </div>
              )}
              {(applicantDetails.status === "Submitted" ||
                applicantDetails.status === "Interview Scheduled" ||
                applicantDetails.status === "Interview Confirmed") && (
                <button
                  variant="contained"
                  style={{
                    backgroundColor: "#d50000",
                    color: primaryFontColor,
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid",
                    margin: "10px",
                  }}
                  onClick={handleRejectApplication}
                >
                  Reject Candidate
                </button>
              )}

              {applicantDetails.status === "Submitted" && (
                <button
                  variant="contained"
                  style={{
                    backgroundColor: primaryFontColor,
                    color: primaryColor,
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid",
                    margin: "10px",
                  }}
                  onClick={handleScheduleInterview}
                >
                  Schedule Interview
                </button>
              )}

              {(applicantDetails.status === "Submitted" ||
                applicantDetails.status === "Interview Scheduled" ||
                applicantDetails.status === "Interview Confirmed") && (
                <button
                  variant="contained"
                  style={{
                    backgroundColor: "#00c853",
                    color: primaryFontColor,
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid",
                    margin: "10px",
                  }}
                  onClick={handleApproveApplication}
                >
                  Approve Candidate
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Footer
        PrimaryColor={primaryColor}
        PrimaryFontColor={primaryFontColor}
        FooterLinkColor={footerLinkColor}
      />
    </div>
  );
};

export default ApplicantDetails;
