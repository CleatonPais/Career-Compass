import React from "react";
import candidaterightfit from "../../assets/yyy.png"


const CandidateRightFitDialog = ({ primaryColor, primaryFontColor,opacity}) => {

    return (
        <div className="container my-5 p-md-5" style={{ background: primaryColor, borderRadius: "40px", opacity:opacity}}>
            <div className="row">
                <div className="col-md-6 col-sm-12 px-0 px-md-5 text-center text-md-start">
                    <h1 className="mt-3" style={{ color: primaryFontColor }}>See Right away</h1>
                    <h1 className="mt-3" style={{ color: primaryFontColor }}>Wheather candidates</h1>
                    <h1 className="mt-3" style={{ color: primaryFontColor }}>are the right fit.</h1>
                    <h6 className="mt-4" style={{ color: primaryFontColor }}>
                        Giving you a better pool of qualified candidates to choose from.
                    </h6>
                    <div className="viewMoreBtn mt-5">
                        <button href="" style={{width:'250px', padding:'12px', background:primaryFontColor, borderRadius:'12px' , border:'none'}}>View More</button>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12 mt-5 mt-md-0">
                    <div className="hero-image">
                        <div className="hero-image d-flex justify-content-end">
                            <img src={candidaterightfit} alt="Hero" style={{ width: '100%', height: '100%' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CandidateRightFitDialog;