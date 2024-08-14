import React from "react";

const HeroSection = ({ primaryColor, primaryFontColor, opacity }) => {
    return (
        <div className="container-fluid" style={{ background: primaryColor, opacity: opacity,}}>
            <div className="row">
                <div className="col-md-12 col-sm-12 p-md-5 p-0 ">
                    <div className="text-center">
                        <h1 className="" style={{ color: primaryFontColor }}>
                            Candidate Applications
                        </h1>
                        <p className="my-4" style={{ color: primaryFontColor }}>
                            Review and manage applications from potential candidates
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
