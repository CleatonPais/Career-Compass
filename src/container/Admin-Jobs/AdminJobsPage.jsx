import React, { useEffect, useState } from "react";
import Navbar from "../../components/Common/Navbar";
import { useNavigate } from "react-router-dom";
import AdminJobsHeader from "./AdminJobsHeader";
import AdminAllJobs from "./AdminAllJobs";
import Footer from "../../components/Common/Footer";


const AdminJobsPage = ({ name }) => {
  const navigate = useNavigate();
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
    // Fetch the CSS variables after component mounts
    const rootStyles = getComputedStyle(document.documentElement);
    setPrimaryColor(rootStyles.getPropertyValue("--primary-color").trim());
    setPrimaryFontColor(
      rootStyles.getPropertyValue("--primary-font-color").trim()
    );
    setSecondaryFontColor(
      rootStyles.getPropertyValue("--secondary-font-color").trim()
    );
    setcardColor(rootStyles.getPropertyValue("--card-color").trim());
    setfooterLinkColor(
      rootStyles.getPropertyValue("--footer-link-color").trim()
    );

    // Handle scroll position
    const handleScroll = () => {
      setScrollPosition(window.scrollY); 
    };

    window.addEventListener("scroll", handleScroll); 

    return () => {
      window.removeEventListener("scroll", handleScroll); 
    };

  }, []);

// Function to calculate opacity based on scroll position
const getOpacity = () => {
  const maxOpacityScroll = 300; 
  const minOpacity = 0.3; 
  const opacity = Math.min(scrollPosition / maxOpacityScroll, 1);
  return Math.max(1 - opacity, minOpacity); 
};

  return (
    <div>
     
      <Navbar
        logo="/logo.png"
        links={links}
        primaryFontColor={primaryFontColor}
        primaryColor={primaryColor}
      />
      <AdminJobsHeader
        primaryColor={primaryColor}
        primaryFontColor={primaryFontColor}
        opacity={getOpacity()} 
      />
      <AdminAllJobs
        SecondaryFontColor={secondaryFontColor}
        primaryColor={primaryColor}
        primaryFontColor={primaryFontColor}
        CardColor={cardColor}
      />
      
      <Footer
        PrimaryColor={primaryColor}
        PrimaryFontColor={primaryFontColor}
        FooterLinkColor={footerLinkColor}
      />
    </div>
  );
};

export default AdminJobsPage;
