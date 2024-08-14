import React, { useEffect, useState } from "react";
import Navbar from "../../components/Common/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../../components/Common/Footer";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert } from "@mui/material";
import AdminJobsHeader from "./AdminJobsHeader";
import AdminJobDeatilComponent from "./AdminJobDetailsComponent";
import axios from 'axios';

const AdminJobDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const job = location.state?.job;

  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

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

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = sessionStorage.getItem("user");
      await axios.delete(`http://localhost:5000/api/jobs/delete/${job._id}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      console.log("Job deleted:", job);
      navigate("/admin_jobs");
      showSnackbar("Job deleted successfully!", "success");
    } catch (error) {
      showSnackbar("Error deleting job", "error");
      console.error("Error deleting job:", error);
    }
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
      <AdminJobDeatilComponent
        SecondaryFontColor={secondaryFontColor}
        primaryColor={primaryColor}
        primaryFontColor={primaryFontColor}
        CardColor={cardColor}
        job={job}
        handleDeleteClick={handleDeleteClick}
      />
      <Footer
        PrimaryColor={primaryColor}
        PrimaryFontColor={primaryFontColor}
        FooterLinkColor={footerLinkColor}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this job?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminJobDetails;
