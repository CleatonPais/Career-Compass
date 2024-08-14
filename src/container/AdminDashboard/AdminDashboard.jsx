import React, { useEffect, useState } from "react";
import Navbar from "../../components/Common/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Common/Footer";
import AdminNewlyLoggedIn from "./AdminNewlyLoggedIn";
import AdminLatestJobPosting from "./AdminLatestJobPosting";
import TextAndImageSection from "./TextAndImageSection";
import AdminDashboardOverview from "./AdminDashboardOverview";
import './styles.css'; 


const AdminDashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("handleLogout");
    sessionStorage.removeItem("user");
    navigate("/");
  };

  const [primaryColor, setPrimaryColor] = useState("");
  const [primaryFontColor, setPrimaryFontColor] = useState("");
  const [secondaryFontColor, setSecondaryFontColor] = useState("");
  const [cardColor, setCardColor] = useState("");
  const [footerLinkColor, setFooterLinkColor] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
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

  return (
    <div>
      <Navbar
        logo="/logo.png"
        primaryFontColor={primaryFontColor}
        primaryColor={primaryColor}
      />
      <TextAndImageSection
        primaryColor={primaryColor}
        primaryFontColor={primaryFontColor}
        opacity={getOpacity()}
      />
      <AdminDashboardOverview
        primaryFontColor={primaryFontColor}
        primaryColor={primaryColor}
        secondaryFontColor={secondaryFontColor}
      />
      <AdminLatestJobPosting
        primaryFontColor={primaryFontColor}
        primaryColor={primaryColor}
        secondaryFontColor={secondaryFontColor}
      />
      <AdminNewlyLoggedIn
        primaryFontColor={primaryFontColor}
        primaryColor={primaryColor}
        secondaryFontColor={secondaryFontColor}
      />
      <Footer
        PrimaryColor={primaryColor}
        PrimaryFontColor={primaryFontColor}
        FooterLinkColor={footerLinkColor}
      />
    </div>
  );
};

export default AdminDashboard;
