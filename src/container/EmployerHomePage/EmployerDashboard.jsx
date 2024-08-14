import React, { useEffect, useState } from "react";
import Navbar from "../../components/Common/Navbar";
import EmployerDashboardHeader from "./EmployerDashboardHeader";
import Footer from "../../components/Common/Footer";
import JobPostings from "./JobPostings";

const EmployerDashboard = ({ name }) => {
  const links = [
    { text: "Home", url: "#" },
    { text: "Job Applications", url: "#" },
  ];
  const [primaryColor, setPrimaryColor] = useState("");
  const [primaryFontColor, setPrimaryFontColor] = useState("");
  const [secondaryFontColor, setSecondaryFontColor] = useState("");
  const [cardColor, setCardColor] = useState("");
  const [footerLinkColor, setFooterLinkColor] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);


  useEffect(() => {
    // Fetch the CSS variables after component mounts
    const rootStyles = getComputedStyle(document.documentElement);
    setPrimaryColor(rootStyles.getPropertyValue("--primary-color").trim());
    setPrimaryFontColor(
      rootStyles.getPropertyValue("--primary-font-color").trim()
    );
    setSecondaryFontColor(
      rootStyles.getPropertyValue("--secondary-font-color").trim()
    );
    setCardColor(rootStyles.getPropertyValue("--card-color").trim());
    setFooterLinkColor(
      rootStyles.getPropertyValue("--footer-link-color").trim()
    );
      // Handle scroll position
      const handleScroll = () => {
        setScrollPosition(window.scrollY); // Update scroll position state
      };
  
      window.addEventListener("scroll", handleScroll); // Add scroll event listener
  
      return () => {
        window.removeEventListener("scroll", handleScroll); // Clean up the event listener on unmount
      };
  }, []);

    // Function to calculate opacity based on scroll position
  const getOpacity = () => {
    const maxOpacityScroll = 300; // Adjust this value to change the scroll range for full opacity
    const minOpacity = 0.3; // Set the minimum opacity value
    const opacity = Math.min(scrollPosition / maxOpacityScroll, 1);
    return Math.max(1 - opacity, minOpacity); // Calculate opacity based on scroll position, with minimum opacity
  };
  return (
    <div>
      <Navbar
        logo="/logo.png"
        links={links}
        primaryFontColor={primaryFontColor}
        primaryColor={primaryColor}
      />
      <EmployerDashboardHeader
        primaryFontColor={primaryFontColor}
        primaryColor={primaryColor}
        opacity={getOpacity()} // Pass calculated opacity to the component
      />
      <div className="container mt-5">
        <JobPostings primaryFontColor={primaryFontColor} cardColor={cardColor} />
      </div>
      <Footer
        PrimaryColor={primaryColor}
        PrimaryFontColor={primaryFontColor}
        FooterLinkColor={footerLinkColor}
      />
    </div>
  );
};

export default EmployerDashboard;
