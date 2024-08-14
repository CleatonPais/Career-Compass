import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import Navbar from "../../components/Common/Navbar";
import HeroSection from "./HeroSection";
import Footer from "../../components/Common/Footer";
import { green, red } from "@mui/material/colors";
import Card from "react-bootstrap/Card";
const InterviewDate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applicantDetails, setApplicantDetails] = useState(null);
  const [selectedInterviewDate, setSelectedInterviewDate] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const [primaryColor, setPrimaryColor] = useState("");
  const [primaryFontColor, setPrimaryFontColor] = useState("");
  const [secondaryFontColor, setSecondaryFontColor] = useState("");
  const [cardColor, setCardColor] = useState("");
  const [footerLinkColor, setFooterLinkColor] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // Fetch the CSS variables after component mounts
    const rootStyles = getComputedStyle(document.documentElement);
    setPrimaryColor(rootStyles.getPropertyValue("--primary-color").trim());
    setPrimaryFontColor(
      rootStyles.getPropertyValue("--primary-font-color").trim()
    );
    setSecondaryFontColor(
      rootStyles.getPropertyValue("--secondary-font-color").trim()
    );
    setCardColor(rootStyles.getPropertyValue("--card-color").trim());
    setFooterLinkColor(
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

  const handleConfirmInterview = async () => {
    if (!selectedInterviewDate) {
      setSnackbarMessage("Please select an interview date.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const [date, time] = selectedInterviewDate.split(" ");

    try {
      await axios.put(
        `http://localhost:5000/api/jobapplications/confirminterview/${id}`,
        { interview_dates: [{ date, time }] },
        {
          headers: {
            "x-auth-token": sessionStorage.getItem("user"),
          },
        }
      );
      setSnackbarMessage("Interview Confirmed Successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => navigate("/my_applications"), 2000);
    } catch (error) {
      setSnackbarMessage("Error confirming interview");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Error scheduling interview", error);
    }
  };

  if (!applicantDetails) {
    return <div>Loading...</div>;
  }

  const combinedList = [
    ...applicantDetails.job_id.skills.map((skill) => ({
      type: "Skill",
      value: skill,
    })),
    ...applicantDetails.job_id.requirements.map((requirement) => ({
      type: "Requirement",
      value: requirement,
    })),
  ];

  // Function to calculate opacity based on scroll position
  const getOpacity = () => {
    const maxOpacityScroll = 300; // Adjust this value to change the scroll range for full opacity
    const minOpacity = 0.3; // Set the minimum opacity value
    const opacity = Math.min(scrollPosition / maxOpacityScroll, 1);
    return Math.max(1 - opacity, minOpacity); // Calculate opacity based on scroll position, with minimum opacity
  };

  return (
    <div>
      <Navbar
        logo="/logo.png"
        primaryFontColor={primaryFontColor}
        primaryColor={primaryColor}
      />

      <HeroSection
        primaryFontColor={primaryFontColor}
        primaryColor={primaryColor}
        opacity={getOpacity()} // Pass calculated opacity to the component
      />

      <div className="container-fluid my-2" style={{ padding: "20px" }}>
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10 col-sm-12">
            <Card className="p-5" style={{ borderRadius: "80px" }}>
              <div className="text-center">
                <h1 className="mt-5" style={{ color: primaryColor }}>{applicantDetails.job_id.title}</h1>
                <h2 className="mt-5" style={{ color: primaryColor }}>
                  {applicantDetails.company_id.name}
                </h2>
                <h2 className="mt-5" style={{color:"black"}}>{applicantDetails.job_id.location.street}, {applicantDetails.job_id.location.city}, {applicantDetails.job_id.location.province}, {applicantDetails.job_id.location.country}, {applicantDetails.job_id.location.postalCode}</h2>
              </div>

              <div className="p-5 text-center" style={{ margin: "10px" }}>
                <h3 className="" style={{ color: "black" }}>
                  Skills, Experience and Qualifications
                </h3>
                <ul>
                  <li style={{ listStyleType: "none" }}>
                    {applicantDetails.job_id.description}
                  </li>
                  {combinedList.map((item, index) => (
                    <li style={{ listStyleType: "none" }} key={index}>
                      {item.value}
                    </li>
                  ))}
                </ul>
              </div>

              {applicantDetails.status === "Submitted" && (
                <div className="text-center">
                  <h3 style={{color: primaryColor}}>
                    Application under review. We will get back to you when we
                    make a decision.
                  </h3>
                </div>
              )}

              {applicantDetails.status === "Rejected" && (
                <div className="text-center">
                  <h3 style={{ color: "red" }}>
                    Application rejected. We have decided to move on with
                    another candidate.
                  </h3>
                </div>
              )}

              {applicantDetails.status === "Approved" && (
                <div className="text-center">
                  <h3 style={{ color: "green" }}>
                    Congratulations! We would like to offer you the position. We
                    will get in touch with you for the onboarding process.
                  </h3>
                </div>
              )}

              {applicantDetails.status === "Interview Scheduled" && (
                <div className="text-center">
                  <h3 style={{ color: primaryColor }}>
                    Congratulations! You have been shortlisted for the
                    interview.
                  </h3>
                  <h3 className="mt-4"> Interview details: </h3>
                  {applicantDetails.interview_details}
                  {applicantDetails.interview_dates &&
                  applicantDetails.interview_dates.length > 0 ? (
                    <>
                      {
                        <>
                          <h4 className="mt-4">
                            Please select an interview date
                          </h4>
                          <div className="mt-4">
                            <select
                              value={selectedInterviewDate}
                              onChange={(e) =>
                                setSelectedInterviewDate(e.target.value)
                              }
                            >
                              <option value="">Select a date</option>
                              {applicantDetails.interview_dates.map(
                                (date, index) => (
                                  <option
                                    key={index}
                                    value={`${date.date} ${date.time}`}
                                  >
                                    {new Date(date.date).toLocaleDateString()}{" "}
                                    at {date.time}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          <div className="mt-5">
                            <button
                              variant="contained"
                              style={{
                                backgroundColor: primaryColor,
                                color: primaryFontColor,
                                padding: "12px",
                                width: "250px",
                                borderRadius: "10px",
                                border: "1px solid",
                              }}
                              onClick={handleConfirmInterview}
                            >
                              Confirm Interview
                            </button>
                          </div>
                          <div className="mt-5">
                            <button
                              variant="contained"
                              style={{
                                backgroundColor: primaryFontColor,
                                color: primaryColor,
                                width: "250px",
                                padding: "12px",
                                borderRadius: "10px",
                                border: "1px solid",
                              }}
                              onClick={() => navigate(-1)}
                            >
                              Cancel
                            </button>
                          </div>
                        </>
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

              {applicantDetails.status === "Interview Confirmed" && (
                <div className="text-center">
                  <h3 style={{ color: primaryColor }}>
                    Congratulations! Your interview has been confirmed
                  </h3>
                  <h3 className="mt-4"> Interview details: </h3>
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
            </Card>
          </div>
          <div className="col-md-1"></div>
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
      </div>

      <Footer
        PrimaryColor={primaryColor}
        PrimaryFontColor={primaryFontColor}
        FooterLinkColor={footerLinkColor}
      />
    </div>
  );
};

export default InterviewDate;
