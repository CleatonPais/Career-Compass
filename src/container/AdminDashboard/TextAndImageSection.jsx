import React from "react";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import  candidateHeroImg from "../../assets/candidateHeroImg.png" 
import { Search } from "@mui/icons-material";
import Searchbar from "../../components/Common/Searchbar";


const TextAndImageSection = ({ primaryColor, primaryFontColor,opacity}) => {
  return (
    <div className="container-fluid text-sm-center" style={{ background: primaryColor, opacity:opacity, height: "65vh"}}>
      <div className="row">
        <div className="col-md-6 col-sm-12 p-md-5 p-0">
          <div>
            <div className="hero-text px-lg-5 px-0 text-center text-md-start ">
              <h1 className="" style={{ color: primaryFontColor }}>
                Welcome to 
              </h1>
              <h1 className="" style={{ color: primaryFontColor }}>
                the Admin Dashboard
              </h1>
              <h6 className="" style={{ color: primaryFontColor }}>
                Review and manage Jobs, Candidates and Employers.
              </h6>
            </div>
            
          </div>

        </div>

        <div className="col-md-6 col-sm-12  mt-5 mt-md-0">
          <div className="hero-image">
          <div className="hero-image d-flex justify-content-center justify-content-md-end">
            <img src={candidateHeroImg} alt="Hero" style={{ width: '70%', height: '70%' }} />
          </div>          
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextAndImageSection;
