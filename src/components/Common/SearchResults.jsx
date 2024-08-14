import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Correct import for useNavigate
import Card from "react-bootstrap/Card";
import Button from "@mui/material/Button";
import { LocationOn, Schedule, Book } from "@mui/icons-material";
import Navbar from "../../components/Common/Navbar";
import Footer from "../../components/Common/Footer";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const jobs = location.state?.jobs || [];
  const userRole = sessionStorage.getItem("role");

  const links = [
    { text: "Home", url: "/" },
    { text: "Find Job", url: "/find-job" },
    { text: "Applications", url: "/applications" },
    { text: "Blog", url: "/blog" },
  ];

  const [primaryColor, setPrimaryColor] = React.useState("");
  const [primaryFontColor, setPrimaryFontColor] = React.useState("");
  const [secondaryFontColor, setSecondaryFontColor] = React.useState("");
  const [cardColor, setCardColor] = React.useState("");
  const [footerLinkColor, setFooterLinkColor] = React.useState("");

  React.useEffect(() => {
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
  }, []);

  return (
    <div>
      <Navbar
        logo="/logo.png"
        links={links}
        primaryFontColor={primaryFontColor}
        primaryColor={primaryColor}
      />
      <div className="container mt-5">
        <h2 className="text-center mb-4" style={{ color: secondaryFontColor }}>
          Search Results
        </h2>
        <div className="row">
          {jobs.length === 0 ? (
            <p className="text-center">No jobs found</p>
          ) : (
            jobs.map((job) => (
              <div className="col-md-4 mb-4" key={job._id}>
                <Card
                  style={{
                    background: cardColor,
                    padding: "1rem",
                    borderRadius: "15px",
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  <Card.Body>
                    <Card.Title>{job.title}</Card.Title>
                    <Card.Text>
                      <LocationOn style={{ marginRight: "8px" }} />
                      {job.location.city}
                    </Card.Text>
                    <Card.Text>
                      <Schedule style={{ marginRight: "8px" }} />
                      {job.role}
                    </Card.Text>
                    <Card.Text>
                      <Book style={{ marginRight: "8px" }} />
                      {job.skills.join(", ")}
                    </Card.Text>
                    {userRole === "candidate" ? (
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: primaryColor,
                          color: primaryFontColor,
                        }}
                        onClick={() => navigate("/apply", { state: { job } })}
                      >
                        Apply
                      </Button>
                    ) : userRole === "admin" ? (
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: primaryColor,
                          color: primaryFontColor,
                        }}
                        onClick={() => navigate("/admin_job_details", { state: { job } })}
                      >
                        Details
                      </Button>
                    ) : null}
                  </Card.Body>
                </Card>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer
        PrimaryColor={primaryColor}
        PrimaryFontColor={primaryFontColor}
        FooterLinkColor={footerLinkColor}
      />
    </div>
  );
};

export default SearchResults;
