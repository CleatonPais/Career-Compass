import React, { useEffect, useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "../SignupPage/Register.css";

const RegisterPage = () => {
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
  const handleSigninClick = () => {
    navigate("/");
  };

  // variables used in form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
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
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      if (formData.password.length < 6) {
        newErrors.password =
          "Password should be at least 6 characters in length";
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.role) newErrors.role = "Role is required";

    return newErrors;
  };

  // function to call api
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Perform the registration logic here

      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/signup",
          formData
        );
        if (response.status === 200) {
          setAlert({ message: "Sign Up Successfull", severity: "success" });
          setTimeout(() => navigate("/"), 3000);
        } else {
          setAlert({ message: response.data.msg, severity: "error" });
        }
      } catch (error) {
        setAlert({ message: error.response.data.msg, severity: "error" });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="container-fluid" style={{ background: primaryColor }}>
      <div className="row">
        <div className="col-md-4  order-md-1 order-2 ">
          <div
            className="sidebar position-relative"
            style={{
              background: primaryColor,
              height: "100vh",
            }}
          >
            <div className="logo d-none d-md-block">
              <img
                src="./assets/img/career_compass_logo.png"
                alt="career compass logo"
                className="img-fluid"
              />
            </div>
            <div className="fluid-image ">
              <img
                src="./assets/img/home_page_icon.png"
                alt="home page icon"
                className="img-fluid position-absolute top-50 start-100 start-md-0 translate-middle "
              />
            </div>
          </div>
        </div>
        <div
          className="col-md-8 order-md-2 order-1 register-form-col"
          style={{
            background: primaryFontColor,
            padding: "0",
          }}
        >
          <div className="container-fluid mt-md-5 mt-0 ">
            <div className="row mt-md-5 mt-0 ">
              <div
                className=" d-sm-block d-md-none"
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
              <div className="heading text-center mt-5 mt-md-0">
                <h1>Create Account</h1>
              </div>
              <div className="col-md-2"></div>
              <div className="col-md-8 pt-5 mt-0 mt-md-5  ">
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
                  <div
                    className="registrationDetails"
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      flexWrap: "wrap",
                    }}
                  >
                    <div className="mb-3 text-center">
                      <TextField
                        type="text"
                        id="name"
                        label="Name"
                        variant="outlined"
                        name="name"
                        style={{ width: "250px" }}
                        value={formData.name}
                        onChange={handleInputChange}
                        error={!!errors.name}
                        helperText={errors.name}
                      />
                    </div>
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
                  </div>
                  <div
                    className="registrationDetails"
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      flexWrap: "wrap",
                    }}
                  >
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
                                {showPassword ? (
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
                  </div>
                  <div
                    className="ageDetails"
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      flexWrap: "wrap",
                    }}
                  >
                    <FormControl
                      style={{ width: "250px", marginBottom: "1rem" }}
                      error={!!errors.role}
                    >
                      <InputLabel id="role">Role</InputLabel>
                      <Select
                        labelId="role"
                        id="demo-role-select"
                        value={formData.role}
                        label="Role"
                        name="role"
                        onChange={handleInputChange}
                      >
                        <MenuItem value={"candidate"}>Job Seeker</MenuItem>
                        <MenuItem value={"company"}>Company</MenuItem>
                      </Select>
                      {errors.role && (
                        <p style={{ color: "red", fontSize: "0.75rem" }}>
                          {errors.role}
                        </p>
                      )}
                    </FormControl>
                  </div>
                  <div className="flex flex-col text-center items-center mt-0 mt-md-5 mb-5 pt-5">
                    <button
                      type="submit"
                      style={{
                        backgroundColor: primaryColor,
                        color: primaryFontColor,
                        width: "250px",
                        padding: "12px",
                        borderRadius: "10px",
                        border: "1px solid",
                      }}
                    >
                      Sign Up
                    </button>
                    <p className="self-center text-center mt-2">Or</p>
                    <button
                      type="submit"
                      onClick={handleSigninClick}
                      style={{
                        backgroundColor: primaryFontColor,
                        color: primaryColor,
                        width: "250px",
                        padding: "12px",
                        borderRadius: "10px",
                        border: "1px solid",
                      }}
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
