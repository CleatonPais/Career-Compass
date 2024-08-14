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
                Find The Perfect
              </h1>
              <h1 className="" style={{ color: primaryFontColor }}>
                Job For You
              </h1>
              <h6 className="" style={{ color: primaryFontColor }}>
                Search your career opportunity through 12,800 jobs.
              </h6>
            </div>
            <div className="search-bar p-lg-5 p-0">
              <Searchbar />
            </div>
          </div>

          {/* Add search functionality here */}
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
