import React from "react";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import  employerHeroImage from "../../assets/employerHeroImage.png" 

const EmployerDashboardHeader = ({ primaryColor, primaryFontColor,opacity }) => {
  return (
    <div className="container-fluid text-sm-center" style={{ background: primaryColor,opacity:opacity }}>
      <div className="row">
        <div className="col-md-6 col-sm-12 p-md-5 p-0">
          <div>
            <div className="hero-text px-lg-5 px-0 text-center text-md-start ">
              <h1 className="" style={{ color: primaryFontColor }}>
                Find The Perfect
              </h1>
              <h1 className="" style={{ color: primaryFontColor }}>
                Candidate For You
              </h1>
              <h6 className="my-4" style={{ color: primaryFontColor }}>
                Streamline your hiring process with our advanced <br /> matching tool
              </h6>
            </div>
            
          </div>
        </div>

        <div className="col-md-6 col-sm-12  mt-5 mt-md-0">
          <div className="hero-image">
          <div className="hero-image d-flex justify-content-center justify-content-md-end">
            <img src={employerHeroImage} alt="Hero" style={{ width: '70%', height: '70%' }} />
          </div>          
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboardHeader;
