import React from "react";
import candidaterightfit from "../../assets/yyy.png"
import { Button } from "@mui/material";


const AdminNewlyLoggedIn = ({ primaryColor, primaryFontColor, secondaryFontColor,opacity}) => {

    return (
        <div className="container my-5 p-md-5" style={{ background: 'white', borderRadius: "40px", opacity:opacity, border: '2px solid #ccc'}}>
            <div className="row">
            <div className="col-md-6 col-sm-12 mt-5 mt-md-0">
                    <div className="hero-image">
                        <div className="hero-image d-flex justify-content-end">
                            <img src={candidaterightfit} alt="Hero" style={{ width: '100%', height: '100%' }} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12 px-0 px-md-5 text-center text-md-start">
                    <h1 className="mt-3" style={{ color: secondaryFontColor }}>Watch out</h1>
                    <h1 className="mt-3" style={{ color: secondaryFontColor }}>Newly logged in</h1>
                    <h1 className="mt-3" style={{ color: secondaryFontColor }}>Candidates.</h1>
                    <h6 className="mt-4" style={{ color: secondaryFontColor }}>
                        Giving you a better pool of qualified candidates to choose from.
                    </h6>
                    <div className="viewMoreBtn mt-5">
                    <Button
                    href="/admin_candidates"
                      variant="contained"
                      style={{
                        backgroundColor: primaryColor,
                        color: primaryFontColor,
                        width: "250px",
                        padding: "12px",
                        borderRadius: "10px",
                        border: "1px solid"
                      }}
                      
                    >
                      View Candidates
                    </Button>                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default AdminNewlyLoggedIn;