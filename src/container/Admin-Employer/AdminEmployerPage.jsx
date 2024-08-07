import React, { useEffect, useState } from "react";
import Navbar from "../../components/Common/Navbar";
import Footer from "../../components/Common/Footer";
import EmployerHeroSection from "../Admin-Employer/AdminEmployerHero"
import EmployersListing from "../Admin-Employer/EmployerListing"

const AdminEmployerPage = () => {
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
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div>
      <Navbar
        logo="/logo.png"
        links={links}
        primaryFontColor={primaryFontColor}
        primaryColor={primaryColor}
      />
      <EmployerHeroSection
        primaryFontColor={primaryFontColor}
        primaryColor={primaryColor}
        opacity={getOpacity()} // Pass calculated opacity to the component
        onSearch={handleSearch} // Pass the search function to the HeroSection
      />
      <EmployersListing
        primaryColor={primaryColor}
        cardColor={cardColor}
        searchTerm={searchTerm} // Pass the search term to the CandidatesListing
      />
      <Footer
        PrimaryColor={primaryColor}
        PrimaryFontColor={primaryFontColor}
        FooterLinkColor={footerLinkColor}
      />
    </div>
  );
}

export default AdminEmployerPage;