import React, { useState, useEffect } from "react";
import {
  Button,
  Pagination,
  LinearProgress,
  Box,
  Typography,
} from "@mui/material";
import { LocationOn, Schedule, Book } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FindJob.css";

const AllJobs = ({
  SecondaryFontColor,
  primaryColor,
  primaryFontColor,
  cardColor,
}) => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const token = sessionStorage.getItem("user");
      const userid = sessionStorage.getItem("user_id");
      const response = await axios.get(
        `http://localhost:5000/api/jobs/availablejobs/${userid}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      const reversedData = response.data.reverse();
      setJobs(reversedData);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleApplyClick = (job) => {
    navigate("/job-details", { state: { job } });
  };

  const getColor = (percentage) => {
    if (percentage < 25) return "red";
    if (percentage < 75) return "#eeee0f";
    return "green";
  };

  return (
    <div className="container mt-5 mt-md-0">
      <div className="row">
        <div className="col-md-12">
          <div
            className="heading-content text-center"
            style={{ marginBottom: "40px", marginTop: "40px" }}
          >
            <h1 style={{ color: SecondaryFontColor, marginBottom: "10px" }}>
              All Jobs
            </h1>
            <h6 style={{ color: SecondaryFontColor, marginBottom: "20px" }}>
              Browse through all available job positions.
            </h6>
          </div>
        </div>
        </div>
        <div className="row my-2 ">
          {currentJobs.map((job, index) => (
            <div key={index} className=" col-md-4 col-sm-12 mb-4">
              <div
                className="card position-relative"
                style={{
                   background: cardColor,
                  // borderRadius: "40px",
                  // height: "300px",
                  // padding: "5px",
                  // display: "flex",
                  // flexDirection: "column",
                  // justifyContent: "space-between", // Evenly distribute elements
                  // alignItems: "center",
                  borderRadius: "40px", // Match the border-radius
                  height: "300px", // Fixed height to match the second card
                  padding: "5px", // Padding similar to the second card
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between", // Evenly distribute elements
                  alignItems: "center", // Align items to the center
                  position: "relative",
                }}
              >
                <div className="card-body text-center">
                  <div>
                    <h5 className="card-text" style={{ fontWeight: "bold" }}>
                      {job.title}
                    </h5>
                    <p className="card-text">
                      <LocationOn style={{ marginRight: "8px" }} />
                      {job.location.city}
                    </p>
                    <p className="card-text">
                      <Schedule style={{ marginRight: "8px" }} />
                      {job.role}
                    </p>
                    <p className="card-text">
                      <Book style={{ marginRight: "8px" }} />
                      {job.skills.join(", ")}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "0",
                    }}
                  >
                    {job.skillMatch && (
                      <div style={{ width: "100%", margin:"20px auto" }}>
                        <Box
                          sx={{
                            width: "100%",
                            minWidth:"250px",
                            marginTop: "20px",
                            textAlign: "center",
                            position: "relative",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              width:"100%",
                              position: "absolute",
                              top: "50%", // Center vertically
                              left: "50%",
                              transform: "translate(-50%, -50%)", // Center horizontally and vertically
                              zIndex: 1, // Ensure text is above the progress bar
                              fontWeight: "bold",
                              color:"white !important",  // Make text bold
                            }}
                          >
                            {`${job.skillMatch.matchPercentage.toFixed(
                              2
                            )}% Match`}
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={job.skillMatch.matchPercentage}
                            sx={{
                              width:"100%",
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
                  <div className="d-flex justify-content-center">
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
                      onClick={() => handleApplyClick(job)}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {jobs.length > jobsPerPage && (
          <div className="d-flex justify-content-center mt-4">
            <Pagination
              count={Math.ceil(jobs.length / jobsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        )}
      
    </div>
  );
};

export default AllJobs;
