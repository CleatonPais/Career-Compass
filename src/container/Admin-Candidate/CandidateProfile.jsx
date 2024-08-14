import React, { useEffect, useState } from "react";
import CandidateProfileHeroSection from "./CandidateProfileHero"
import CandidateProfileInfo from "./CandidateProfileInfo";


const CandidateProfile = ({}) => {

    return (
        <div>
            <CandidateProfileHeroSection/>
            <CandidateProfileInfo className="p-5"/>
        </div>
        
    )
}



export default CandidateProfile;