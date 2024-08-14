import React, { useEffect, useState } from "react";
import { TextField, InputAdornment, IconButton, Alert } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import "../LoginPage/login.css";
import axios from "axios";

const LoginPage = () => {
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
  const handleSignUpClick = () => {
    navigate("/register");
  };

  // variables used in form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState({ message: "", severity: "" });

  // password Visibility toogle
  const handleClickShowPassword = () => setShowPassword((show) => !show);

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

    if (Object.keys(newErrors).length === 0) {
      // console.log(formData);

      const email = formData.email;
      const password = formData.password;

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/login",
          { email, password },
          config
        );
        if (response.status === 200) {
          const { token, user_id } = response.data;
          const decodedToken = jwtDecode(token);
          const userRole = decodedToken.user.role;
          sessionStorage.setItem("user", token);
          sessionStorage.setItem("role", userRole);
          sessionStorage.setItem("user_id", user_id);
          setAlert({ message: "Login Successful", severity: "success" });
          // Navigate to different home pages based on the user role
          if (userRole === "candidate") {
            setTimeout(() => navigate("/candidate_home"), 3000);
          } else if (userRole === "company") {
            setTimeout(() => navigate("/home"), 3000);
          } else if (userRole === "admin") {
            setTimeout(() => navigate("/admin_dashboard"), 3000);
          }
          console.log("Resp. data", response.data);
        } else {
          setAlert({ message: response.data.msg, severity: "error" });
        }
      } catch (error) {
        if (error.response && error.response.data) {
          setAlert({ message: error.response.data.msg, severity: "error" });
        } else {
          console.log(error);
          setAlert({
            message: "An unexpected error occurred",
            severity: "error",
          });
        }
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="container-fluid" style={{ background: primaryColor }}>
      <div className="row">
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
        <div
          className="col-md-8 login-form-col "
          style={{
            background: primaryFontColor,
          }}
        >
          <div className="heading text-center mt-5">
            <h1 className="pt-3">Sign In</h1>
          </div>
          <div className="container mt-0 mt-md-4 ">
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6 mt-0 mt-md-4">
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
                  <div className="mb-3 mt-5 text-center">
                    <TextField
                      type="email"
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      name="email"
                      className="login-field"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </div>
                  <div className="mb-3 text-center">
                    <TextField
                      type={showPassword ? "text" : "password"}
                      id="outlined-basic"
                      label="Password"
                      variant="outlined"
                      name="password"
                      className="login-field"
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
                  <div className="flex text-center mb-3">
                    <a
                      href="/forgot_password"
                      className="text-sm login-forgot-pass"
                      style={{ color: primaryColor }}
                    >
                      Forgot Password?
                    </a>
                  </div>
                  <div className="flex flex-col mb-5 text-center items-center login-btns">
                    <button
                      type="submit"
                      style={{
                        backgroundColor: primaryColor,
                        color: primaryFontColor,
                        padding: "12px",
                        borderRadius: "10px",
                        border: "1px solid",
                      }}
                    >
                      Sign In
                    </button>
                    <p className="self-center text-center mt-2">Or</p>
                    <button
                      type="button"
                      onClick={handleSignUpClick}
                      style={{
                        backgroundColor: primaryFontColor,
                        color: primaryColor,
                        padding: "12px",
                        borderRadius: "10px",
                        border: "1px solid",
                      }}
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="sidebar"
            style={{
              background: primaryColor,
              height: "100vh",
              position: "relative",
            }}
          >
            <div className="logo d-none d-md-block">
              <img
                src="./assets/img/career_compass_logo.png"
                alt="career compass logo"
                className="img-fluid"
              />
            </div>
            <div className="fluid-image">
              <img
                src="./assets/img/chart_girl.png"
                alt="home page icon"
                className="img-fluid position-absolute top-50 start-0 translate-middle"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
