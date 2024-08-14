import React, { useState, useEffect } from "react";
import Navbar from "../../components/Common/Navbar";
import Footer from "../../components/Common/Footer";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { createJobApplication } from "../../Api/Profile";

const ApplyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const job = location.state?.job;

  const links = [
    { text: "Home", url: "#" },
    { text: "Find Job", url: "#" },
    { text: "Applications", url: "#" },
    { text: "Blog", url: "#" },
  ];

  const user_id = sessionStorage.getItem("user_id");
  const [primaryColor, setPrimaryColor] = useState("");
  const [primaryFontColor, setPrimaryFontColor] = useState("");
  const [secondaryFontColor, setSecondaryFontColor] = useState("");
  const [cardColor, setCardColor] = useState("");
  const [footerLinkColor, setFooterLinkColor] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    resume: null,
    coverLetter: null,
    portfolio: null,
  });
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    setPrimaryColor(rootStyles.getPropertyValue("--primary-color").trim());
    setPrimaryFontColor(rootStyles.getPropertyValue("--primary-font-color").trim());
    setSecondaryFontColor(rootStyles.getPropertyValue("--secondary-font-color").trim());
    setCardColor(rootStyles.getPropertyValue("--card-color").trim());
    setFooterLinkColor(rootStyles.getPropertyValue("--footer-link-color").trim());
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    if (!formData.resume) newErrors.resume = "Resume is required";
    if (!formData.coverLetter) newErrors.coverLetter = "Cover Letter is required";
    if (!formData.portfolio) newErrors.portfolio = "Portfolio is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      setSnackbarMessage("Please fill in all required fields.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const token = sessionStorage.getItem("user");
    const formDataWithFiles = new FormData();
    formDataWithFiles.append("job_id", job._id);
    formDataWithFiles.append("user_id", user_id);
    formDataWithFiles.append("company_id", job.company_id);
    formDataWithFiles.append("firstName", formData.firstName);
    formDataWithFiles.append("lastName", formData.lastName);
    formDataWithFiles.append("email", formData.email);
    formDataWithFiles.append("phoneNumber", formData.phoneNumber);
    formDataWithFiles.append("resume", formData.resume);
    formDataWithFiles.append("cover_letter", formData.coverLetter);
    formDataWithFiles.append("portfolio", formData.portfolio);

    try {
      const response = await createJobApplication(formDataWithFiles, token);
      if (response.status === 'Submitted') {
        setSnackbarMessage("Job Application Submitted Successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate("/find-job");
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting job application:", error);
      setSnackbarMessage("Failed to submit job application. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCancel = () => {
    navigate("/job-details", { state: { job } });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Navbar
        logo="/logo.png"
        links={links}
        primaryFontColor={primaryFontColor}
        primaryColor={primaryColor}
      />
      <div className="container mt-5">
        <h2 className="text-center mb-4" style={{ color: secondaryFontColor }}>Apply for {job.title}</h2>
        <form className="my-5">
          <h3 className="mt-5 text-center" style={{ color: secondaryFontColor }}>Personal Details</h3>
          <div className="row">
            <div className="mt-5 col-md-2"></div>
          <div className="mt-5 col-md-4">
            <TextField
              fullWidth
              variant="outlined"
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              error={!!errors.firstName}
              helperText={errors.firstName}
              style={{ marginBottom: "20px" }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </div>
          <div className="mt-5 col-md-4">
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              error={!!errors.email}
              helperText={errors.email}
              style={{ marginBottom: "20px" }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />
          </div>
          <div className="mt-5 col-md-2"></div>
          </div>
          <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 text-center">
            <h3 className="mt-5" style={{ color: secondaryFontColor }}>Upload Resume</h3>
          <div className="mt-3">
            <input
              accept="application/pdf, application/msword"
              style={{ display: "none" }}
              id="upload-resume"
              type="file"
              name="resume"
              onChange={handleFileChange}
              required
            />
            <label htmlFor="upload-resume">
              <Button
                variant="outlined"
                color="primary"
                component="span"
                fullWidth
                startIcon={<UploadFile />}
              >
                Upload Resume
              </Button>
            </label>
            {formData.resume && (
              <p className="mt-2">Selected File: {formData.resume.name}</p>
            )}
            {errors.resume && (
              <p className="text-danger mt-2">{errors.resume}</p>
            )}
          </div>
          <h3 className="mt-5" style={{ color: secondaryFontColor }}>Cover Letter</h3>
          <div className="mt-3">
            <input
              accept="application/pdf, application/msword"
              style={{ display: "none" }}
              id="upload-cover-letter"
              type="file"
              name="coverLetter"
              onChange={handleFileChange}
              required
            />
            <label htmlFor="upload-cover-letter">
              <Button
                variant="outlined"
                color="primary"
                component="span"
                fullWidth
                startIcon={<UploadFile />}
              >
                Upload Cover Letter
              </Button>
            </label>
            {formData.coverLetter && (
              <p className="mt-2">Selected File: {formData.coverLetter.name}</p>
            )}
            {errors.coverLetter && (
              <p className="text-danger mt-2">{errors.coverLetter}</p>
            )}
          </div>
          <h3 className="mt-5" style={{ color: secondaryFontColor }}>Portfolio</h3>
          <div className="mt-3">
            <input
              accept="application/pdf, application/msword, image/*"
              style={{ display: "none" }}
              id="upload-portfolio"
              type="file"
              name="portfolio"
              onChange={handleFileChange}
              required
            />
            <label htmlFor="upload-portfolio">
              <Button
                variant="outlined"
                color="primary"
                component="span"
                fullWidth
                startIcon={<UploadFile />}
              >
                Upload Portfolio
              </Button>
            </label>
            {formData.portfolio && (
              <p className="mt-2">Selected File: {formData.portfolio.name}</p>
            )}
            {errors.portfolio && (
              <p className="text-danger mt-2">{errors.portfolio}</p>
            )}
          </div>
          <div className="text-center mt-5" style={{ marginTop: "25px" }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: primaryFontColor,
                color: primaryColor,
                width: "150px",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid",
                marginRight: "50px",
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: primaryColor,
                color: primaryFontColor,
                width: "150px",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid",
              }}
              onClick={handleSubmit}
            >
              Apply
            </Button>
          </div></div>
          <div className="col-md-4"></div>
          </div>
          
          
        </form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
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

export default ApplyPage;
