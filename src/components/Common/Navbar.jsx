import React, { useState, useEffect } from "react";
import { Navbar as BootstrapNavbar, Nav } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getUserProfile, getCompanyProfile } from "../../Api/Profile";
import defaultProfileImage from "../../assets/default.jpeg";
import "./Navbar.css"; 

const Navbar = ({ logo, primaryFontColor, primaryColor }) => {
  const role = sessionStorage.getItem("role");
  const location = useLocation();
  const navigate = useNavigate();
  if (!role) {
    navigate("/");
  }

  const [profileImage, setProfileImage] = useState(defaultProfileImage);

  useEffect(() => {
    const fetchProfileImage = async () => {
      const token = sessionStorage.getItem("user");
      // console.log("Token:", token);

      if (token) {
        try {
          if (role === "candidate") {
            const userProfile = await getUserProfile(token);
            // console.log("User Profile:", userProfile);
            if (userProfile.profileImage) {
              setProfileImage(userProfile.profileImage);
            }
          } else if (role === "company") {
            const companyProfile = await getCompanyProfile(token);
            // console.log("Company Profile:", companyProfile);
            if (companyProfile.companyLogo) {
              setProfileImage(companyProfile.companyLogo);
            }
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        console.log("No token found");
        if (!role) {
          navigate("/");
        }
      }
    };

    fetchProfileImage();
  }, [role]);

  const candidateLinks = [
    { text: "Home", url: "/candidate_home" },
    { text: "Find Job", url: "/find-job" },
    { text: "Applications", url: "/my_applications" },
    { text: "Logout", url: "/", onClick: () => sessionStorage.clear() },
  ];

  const employerLinks = [
    { text: "Home", url: "/home" },
    { text: "Job Applications", url: "/candidate_applications" },
    { text: "Logout", url: "/", onClick: () => sessionStorage.clear() },
  ];

  const adminLinks = [
    { text: "Dashboard", url: "/admin_dashboard" },
    { text: "Candidates", url: "/admin_candidates" },
    { text: "Jobs", url: "/admin_jobs" },
    { text: "Employers", url: "/admin_employers" },
    { text: "Logout", url: "/", onClick: () => sessionStorage.clear() },
  ];

  const links =
    role === "candidate"
      ? candidateLinks
      : role === "company"
      ? employerLinks
      : role === "admin"
      ? adminLinks
      : [];

  return (
    <BootstrapNavbar
      expand="lg"
      className="navbar-custom"
      style={{
        backgroundColor: primaryColor,
        position: "sticky",
        top: "0",
        width: "100%",
        zIndex: "999",
      }}
    >
      <BootstrapNavbar.Brand href="#home">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="m-auto navbar-nav-custom">
          {links.map((link, index) => (
            <Nav.Link
              key={index}
              href={link.url}
              className="navbar-link-custom"
              style={{
                // color: primaryFontColor,
                fontWeight: location.pathname === link.url ? "bold" : "normal",
                fontSize: location.pathname === link.url ? "18px " : "normal",
                // textDecoration: location.pathname === link.url ? " overline " : "normal",
                // textDecoration: location.pathname === link.url ? " underline " : "normal",
                backgroundColor: location.pathname === link.url ? " white " : "normal",
                color: location.pathname === link.url ? primaryColor : "white",
                borderRadius: location.pathname === link.url ? "10px" : "0",
              }}
              onClick={link.onClick}
            >
              {link.text}
            </Nav.Link>
          ))}
        </Nav>
        <Link
          to={role === "candidate" ? "/candidate_profile" : "/employer_profile"}
          className="navbar-profile-link"
        >
          <img
            src={profileImage || defaultProfileImage}
            alt="Profile"
            className="navbar-profile-image"
          />
        </Link>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;
