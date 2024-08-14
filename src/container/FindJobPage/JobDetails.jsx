import React, { useEffect, useState } from "react";
import Navbar from "../../components/Common/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import TextAndImageSection from "./TextAndImageSection";
import JobDeatilComponent from "./JobDeatilComponent";
import Footer from "../../components/Common/Footer";
import { Button } from "@mui/material"; // Import Button from MUI

const JobDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const job = location.state?.job;

  const handleLogout = () => {
    console.log("handleLogout");
    sessionStorage.removeItem("user");
    navigate("/");
  };

  const links = [
    { text: "Home", url: "#" },
    { text: "Find Job", url: "#" },
    { text: "Company", url: "#" },
    { text: "Blog", url: "#" },
    { text: "Logout", url: "#", onClick: handleLogout },
  ];

  const [primaryColor, setPrimaryColor] = useState("");
  const [primaryFontColor, setPrimaryFontColor] = useState("");
  const [secondaryFontColor, setSecondaryFontColor] = useState("");
  const [cardColor, setcardColor] = useState("");
  const [footerLinkColor, setfooterLinkColor] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    setPrimaryColor(rootStyles.getPropertyValue("--primary-color").trim());
    setPrimaryFontColor(rootStyles.getPropertyValue("--primary-font-color").trim());
    setSecondaryFontColor(rootStyles.getPropertyValue("--secondary-font-color").trim());
    setcardColor(rootStyles.getPropertyValue("--card-color").trim());
    setfooterLinkColor(rootStyles.getPropertyValue("--footer-link-color").trim());

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getOpacity = () => {
    const maxOpacityScroll = 300;
    const minOpacity = 0.3;
    const opacity = Math.min(scrollPosition / maxOpacityScroll, 1);
    return Math.max(1 - opacity, minOpacity);
  };

  const handleApplyClick = () => {
    navigate("/apply", { state: { job } });
  };

  return (
    <div>
      <Navbar
        logo="/logo.png"
        links={links}
        primaryFontColor={primaryFontColor}
        primaryColor={primaryColor}
      />
      <TextAndImageSection
        primaryColor={primaryColor}
        primaryFontColor={primaryFontColor}
        opacity={getOpacity()}
      />
      <JobDeatilComponent
        SecondaryFontColor={secondaryFontColor}
        primaryColor={primaryColor}
        primaryFontColor={primaryFontColor}
        CardColor={cardColor}
        job={job}
        handleApplyClick={handleApplyClick}
      />
      
      <Footer
        PrimaryColor={primaryColor}
        PrimaryFontColor={primaryFontColor}
        FooterLinkColor={footerLinkColor}
      />
    </div>
  );
};

export default JobDetails;
