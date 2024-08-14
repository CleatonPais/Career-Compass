import React, { useEffect, useState } from "react";
import { TextField, InputAdornment, IconButton, Alert } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const ForgotPasswordPage = () => {
  // color theme
  const [primaryColor, setPrimaryColor] = useState("");
  const [primaryFontColor, setPrimaryFontColor] = useState("");
  const [secondaryFontColor, setSecondaryFontColor] = useState("");
  const [cardColor, setcardColor] = useState("");

  // apply color theme tot elements
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
  }, []);

  // variable to go to handle click and naviagte to other page
  const navigate = useNavigate();

  // variables used in form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState({ message: "", severity: "" });

  // password Visibility toogle
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  // function to remove error from text input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // function to validate form and call api
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password and Confirm Password do not match";
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/forgot-password",
          formData
        );
        if (response.status === 200) {
          setAlert({
            message: "Password Reset Successfull",
            severity: "success",
          });
          setTimeout(() => navigate("/"), 3000);
        } else {
          setAlert({ message: response.data.msg, severity: "error" });
        }
      } catch (error) {
        setAlert({ message: error.response.data.msg, severity: "error" });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="container-fluid" style={{ background: primaryColor }}>
      <div className="row d-md-block d-none" style={{ height: "40vh" }}>
        <div className="topbar" style={{ position: "relative" }}>
          <div className="col-md-4">
            <div className="logo">
              <img
                src="./assets/img/career_compass_logo.png"
                alt="career compass logo"
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="fluid-image">
              <img
                src="./assets/img/secure_files.png"
                alt="home page icon"
                className="img-fluid"
                style={{
                  position: "absolute",
                  top: "0%",
                  right: "0%",
                  width: "400px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="row forgot-pass-form"
        style={{ background: primaryFontColor, borderRadius: "40px 40px 0 0" }}
      >
        <div
          className="d-sm-block d-md-none"
          style={{ background: primaryColor }}
        >
          <div className="logo">
            <img
              src="./assets/img/career_compass_logo.png"
              alt="career compass logo"
              className=""
              style={{ height: "70px", width: "auto" }}
            />
          </div>
        </div>
        <div className="heading text-center mt-5">
          <h1>Forgot your Password?</h1>
        </div>
        <div className="col-md-3"></div>
        <div className="col-md-6 mt-5">
          <form onSubmit={handleSubmit}>
            {alert.message && (
              <Alert
                className="mb-3"
                severity={alert.severity}
                onClose={() => setAlert({ message: "", severity: "" })}
              >
                {alert.message}
              </Alert>
            )}
            <div className="mb-3 text-center">
              <TextField
                type="email"
                id="email"
                label="Email"
                variant="outlined"
                name="email"
                style={{ width: "250px" }}
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </div>
            <div className="mb-3 text-center">
              <TextField
                type={showPassword ? "text" : "password"}
                id="password"
                label="Password"
                variant="outlined"
                name="password"
                style={{ width: "250px" }}
                value={formData.password}
                onChange={handleInputChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="mb-3 text-center">
              <TextField
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                name="confirmPassword"
                style={{ width: "250px" }}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="flex flex-col mb-5 text-center items-center mt-5">
              <button
                type="submit"
                style={{
                  backgroundColor: primaryColor,
                  color: primaryFontColor,
                  width: "250px",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "1px solid",
                }}
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-3"></div>
      </div>
      <div className="row d-sm-block d-md-none" style={{ height: "50vh" }}>
        <div className="topbar" style={{ position: "relative" }}>
          <div className="col-md-12">
            <div className="fluid-image">
              <img
                src="./assets/img/secure_files.png"
                alt="home page icon"
                className="img-fluid"
                style={{ position: "absolute", top: "25%", right: "0%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
