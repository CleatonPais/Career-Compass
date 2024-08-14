import React from "react";
import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import "./AdminEmployerPage.css";

const EmployerProfileHeroSection = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="container-fluid">
      <div className="row bacground-color">
        <div className="col-md-12 col-sm-12 p-md-5 p-0">
          <IconButton className="back-button" onClick={handleBackClick}>
            <ArrowBack />
          </IconButton>
          <div className="hero-text px-lg-5 px-0 text-center">
            <h1 className="primary-font">
              Employer Profile
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfileHeroSection;
