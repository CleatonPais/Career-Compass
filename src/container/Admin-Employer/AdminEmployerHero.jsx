import React from "react";
import SearchBar from "./SearchBar";


const EmployerHeroSection = ({ primaryColor, primaryFontColor,opacity, onSearch }) => {
  return (
    <div className="container-fluid text-sm-center py-sm-3" style={{ background: primaryColor, opacity:opacity,}}>
      <div className="row">
        <div className="col-md-12 col-sm-12 p-md-5">
            <div className="hero-text px-lg-5 px-0 text-center ">
              <h1 className="" style={{ color: primaryFontColor }}>
                Employer
              </h1>
              <h6 className="mt-4" style={{ color: primaryFontColor }}>
                Manage and Review Employers. </h6>
            </div>
            <div className="search-bar p-lg-5 p-0">
            <SearchBar onSearch={onSearch} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerHeroSection;
