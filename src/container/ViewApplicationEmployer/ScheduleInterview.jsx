import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import "../ViewApplicationEmployer/ApplicantDetails.css";
import Navbar from "../../components/Common/Navbar";
import Footer from "../../components/Common/Footer";

const ScheduleInterview = () => {
  const [primaryColor, setPrimaryColor] = useState("");
  const [primaryFontColor, setPrimaryFontColor] = useState("");
  const [secondaryFontColor, setSecondaryFontColor] = useState("");
  const [cardColor, setcardColor] = useState("");
  const [footerLinkColor, setfooterLinkColor] = useState("");

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
    setcardColor(rootStyles.getPropertyValue("--card-color").trim());
    setfooterLinkColor(
      rootStyles.getPropertyValue("--footer-link-color").trim()
    );
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();
  const [interviewDates, setInterviewDates] = useState([
    { date: "", time: "" },
    { date: "", time: "" },
    { date: "", time: "" },
  ]);
  const [interviewDetails, setInterviewDetails] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [errors, setErrors] = useState({});

  const handleSlotChange = (index, field, value) => {
    const newInterviewDates = interviewDates.slice();
    newInterviewDates[index][field] = value;
    setInterviewDates(newInterviewDates);
  };

  const validateFields = () => {
    const newErrors = {};
    interviewDates.forEach((slot, index) => {
      if (!slot.date) {
        newErrors[`date${index}`] = "Date is required";
      }
      if (!slot.time) {
        newErrors[`time${index}`] = "Time is required";
      }
    });

    if (!interviewDetails) {
      newErrors["interviewDetails"] = "Interview details are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSchedule = async () => {
    if (!validateFields()) {
      setSnackbarMessage("Please fill in all required fields.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/jobapplications/scheduleinterview/${id}`,
        {
          interview_dates: interviewDates,
          interview_details: interviewDetails,
        },
        {
          headers: {
            "x-auth-token": sessionStorage.getItem("user"),
          },
        }
      );
      setSnackbarMessage("Interview Scheduled Successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => navigate("/candidate_applications"), 2000);
    } catch (error) {
      setSnackbarMessage("Error scheduling interview");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Error scheduling interview", error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

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
            <h1>Candidate Application</h1>
            <p>Review and manage applications from potential candidates</p>
          </div>
          <div className="text-center my-5">
            <h2
              className=""
              style={{
                color: primaryColor,
                textAlign: "center",
                margin: "40px",
              }}
            >
              Schedule Interview
            </h2>
            <div
              className="download-items"
              style={{
                background: primaryFontColor,
                borderRadius: "15px",
                textAlign: "center",
              }}
            >
              {interviewDates.map((slot, index) => (
                <div key={index} style={{ margin: "20px" }}>
                  <TextField
                    label={`Date Option ${index + 1}`}
                    type="date"
                    value={slot.date}
                    onChange={(e) =>
                      handleSlotChange(index, "date", e.target.value)
                    }
                    style={{ marginRight: "8px", width: "20%" }}
                    InputLabelProps={{ shrink: true }}
                    error={!!errors[`date${index}`]}
                    helperText={errors[`date${index}`]}
                  />
                  <TextField
                    label="Time"
                    type="time"
                    value={slot.time}
                    onChange={(e) =>
                      handleSlotChange(index, "time", e.target.value)
                    }
                    style={{ width: "20%" }}
                    InputLabelProps={{ shrink: true }}
                    error={!!errors[`time${index}`]}
                    helperText={errors[`time${index}`]}
                  />
                </div>
              ))}
              <div className="text-center" style={{ margin: "20px" }}>
                <TextField
                  label="Interview Details"
                  type="text"
                  value={interviewDetails}
                  onChange={(e) => setInterviewDetails(e.target.value)}
                  style={{ width: "41%" }}
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.interviewDetails}
                  helperText={errors.interviewDetails}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                  alignItems: "center",
                }}
              >
                <button
                  variant="contained"
                  style={{
                    backgroundColor: primaryFontColor,
                    color: primaryColor,
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid",
                    margin: "30px",
                    width: "250px",
                  }}
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
                <button
                  variant="contained"
                  style={{
                    backgroundColor: primaryColor,
                    color: primaryFontColor,
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid",
                    margin: "30px",
                    width: "250px",
                  }}
                  onClick={handleSchedule}
                >
                  Confirm
                </button>
                
              </div>
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

export default ScheduleInterview;
