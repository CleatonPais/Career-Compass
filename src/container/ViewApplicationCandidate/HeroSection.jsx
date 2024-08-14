import React from "react";

const HeroSection = ({ primaryColor, primaryFontColor, opacity }) => {
  return (
    <div
      className="container-fluid"
      style={{ background: primaryColor, opacity: opacity }}
    >
      <div className="row">
        <div className="col-md-12 col-sm-12 p-md-5 p-0 ">
          <div className="text-center">
            <h1 className="" style={{ color: primaryFontColor }}>
              Your Job Application Status
            </h1>
            <p className="my-4" style={{ color: primaryFontColor }}>
              Track your job application progress and stay updated
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
