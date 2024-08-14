import React from "react";
import Searchbar from "../../components/Common/Searchbar";

const AdminJobsHeader = ({ primaryColor, primaryFontColor, opacity }) => {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ background: primaryColor, opacity: opacity }}>
      <div className="row w-100">
        <div className="col-md-6 offset-md-3 col-sm-12 p-md-5 p-0 d-flex flex-column align-items-center text-center">
          <div className="hero-text">
            <h1 className="mb-4" style={{ color: primaryFontColor }}>
              All Jobs
            </h1>
            <h6 className="mb-4" style={{ color: primaryFontColor }}>
              Manage Jobs
            </h6>
          </div>
          <div className="search-bar w-100">
            <Searchbar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminJobsHeader;
