import React from "react";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faClock,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { LinearProgress, Box, Typography } from "@mui/material";
import { Button } from "@mui/material"; // Import Button from MUI

const JobDeatilComponent = ({
  job,
  SecondaryFontColor,
  primaryColor,
  primaryFontColor,
  CardColor,
  handleApplyClick,
  cardColor
}) => {
  const getColor = (percentage) => {
    if (percentage < 25) return "red";
    if (percentage < 75) return "#eeee0f";
    return "green";
  };

  return (
    <div className="container text-center mt-5">
      <div className="row text-center">
        <div className="col-md-4"></div>
        <div className="col-md-4 text-center">
          <Card
            style={{
              padding: "1rem",
              background: CardColor,
              borderRadius: "15px",
              textAlign: "center",
              position: "relative",
              minHeight: "300px",
            }}
          >
            <h5
              className="card-title"
              style={{ fontWeight: "bold", marginBottom: "16px" }}
            >
              {job.title}
            </h5>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <FontAwesomeIcon
                icon={faLocationArrow}
                style={{ marginRight: "8px" }}
              />
              <span>
               {job.location.city}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <FontAwesomeIcon icon={faClock} style={{ marginRight: "8px" }} />
              <span>{job.role}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon icon={faBook} style={{ marginRight: "8px" }} />
              <span>{job.skills.join(", ")}</span>
            </div>
            <div
              // style={{
              //   display: "block",
              //   justifyContent: "center",
              //   alignItems: "center",
              //   marginBottom: "0",
              // }}

              style={{
                display: "flex", // Flexbox for centering
                flexDirection: "column", // Stack children vertically
                justifyContent: "center", // Center children vertically
                alignItems: "center", // Center children horizontally
                marginBottom: "0", // Adjust as needed for spacing
                height: "100%", // Ensure it takes full height of the parent
              }}
            >
              {job.skillMatch && (
                <div style={{ width: "75%" }}>
                  <Box
                    sx={{
                      width: "100%",
                      marginTop: "20px",
                      textAlign: "center",
                      position: "relative",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        position: "absolute",
                        top: "50%", // Center vertically
                        left: "50%",
                        transform: "translate(-50%, -50%)", // Center horizontally and vertically
                        zIndex: 1, // Ensure text is above the progress bar
                        fontWeight: "bold",
                        color: "white !important", // Make text bold
                      }}
                    >
                      {`${job.skillMatch.matchPercentage.toFixed(2)}% Match`}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={job.skillMatch.matchPercentage}
                      sx={{
                        height: 15,
                        borderRadius: 5,
                        backgroundColor: "#b4b4b4",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: getColor(
                            job.skillMatch.matchPercentage
                          ),
                        },
                      }}
                    />
                  </Box>
                </div>
              )}
            </div>
            <div className="d-flex justify-content-center mt-4">
              <Button
                variant="contained"
                style={{
                  backgroundColor: primaryColor,
                  color: primaryFontColor,
                  width: "150px",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid",
                }}
                onClick={handleApplyClick}
              >
                Apply
              </Button>
            </div>
          </Card>
        </div>
        <div className="col-md-4"></div>
        
      </div>

    </div>
  );
};

export default JobDeatilComponent;
