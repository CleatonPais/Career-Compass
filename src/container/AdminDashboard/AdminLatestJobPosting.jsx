import React from "react";
import LatestJobPosting from "../../assets/LatestJobPosting.png"
import { Button } from "@mui/material";


const AdminLatestJobPosting = ({ primaryColor, primaryFontColor,opacity}) => {

    return (
        <div className="container my-5 p-md-5" style={{ background: primaryColor, borderRadius: "40px", opacity:opacity}}>
            <div className="row">
                <div className="col-md-6 col-sm-12 px-0 px-md-5 text-center text-md-start">
                    <h1 className="mt-3" style={{ color: primaryFontColor }}>Check out</h1>
                    <h1 className="mt-3" style={{ color: primaryFontColor }}>the latest job</h1>
                    <h1 className="mt-3" style={{ color: primaryFontColor }}>posting.</h1>
                    <h6 className="mt-4" style={{ color: primaryFontColor }}>
                        Giving you a better pool of better jobs to choose from.
                    </h6>
                    <div className="viewMoreBtn mt-5">
                        <Button href="/admin_jobs"
                        style={{width:'250px', padding:'12px', background:primaryFontColor, borderRadius:'12px' , border:'none'}}>View Jobs</Button>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12 mt-5 mt-md-0">
                    <div className="hero-image">
                        <div className="hero-image d-flex justify-content-end">
                            <img src={LatestJobPosting} alt="Hero" style={{ width: '100%', height: '100%' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLatestJobPosting ;