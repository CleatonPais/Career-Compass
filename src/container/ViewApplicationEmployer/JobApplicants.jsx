import React, { useState, useEffect } from "react";
import {
  Card,
  Pagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Box,
  Typography,
} from "@mui/material";
import {
  Work,
  AccessAlarmOutlined,
  CheckCircle,
  Cancel,
  HourglassEmpty,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JobApplicants = ({ primaryColor, cardColor }) => {
  const [applicants, setApplicants] = useState([]);
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [skillMatch, setSkillMatch] = useState(null);
  const [fitCategory, setFitCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/jobapplications/getemployerjobapplications",
          {
            headers: {
              "x-auth-token": sessionStorage.getItem("user"),
            },
          }
        );
        const reversedData = response.data.reverse();
        setApplicants(reversedData);
      } catch (error) {
        console.error("Error fetching applicants", error);
      }
    };

    fetchApplicants();
  }, []);

  const handleCardClick = (id, jobId) => {
    if (jobId) {
      navigate(`/applicant-details/${id}`);
    }
  };

  const handleSkillMatchClick = async (event, applicant) => {
    event.stopPropagation();

    console.log(applicant);
    console.log(applicant.user_id._id);
    console.log(applicant.job_id._id);

    // Extract the _id from candidateId and jobId
    const extractedCandidateId = applicant.user_id._id;
    const extractedJobId = applicant.job_id._id;

    console.log("Extracted candidateId:", extractedCandidateId);
    console.log("Extracted jobId:", extractedJobId);

    if (!extractedCandidateId || !extractedJobId) {
      console.log("Either extractedCandidateId or extractedJobId is null");
    } else {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/jobapplications/calculateskillmatch/${extractedCandidateId}/${extractedJobId}`,
          {
            headers: {
              "x-auth-token": sessionStorage.getItem("user"),
            },
          }
        );
        setSkillMatch(response.data.matchPercentage);
        setFitCategory(response.data.fitCategory);
        setOpenDialog(true);
      } catch (error) {
        console.error("Error fetching skill match data", error);
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const getBorderColor = (applicant) => {
    if (
      applicant.status === "Interview Confirmed" ||
      applicant.status === "Approved"
    ) {
      return "2px solid green";
    } else if (applicant.status === "Rejected" || !applicant.job_id) {
      return "2px solid red";
    } else {
      return "none";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Interview Confirmed":
      case "Approved":
        return <CheckCircle style={{ color: "green", marginRight: "8px" }} />;
      case "Rejected":
        return <Cancel style={{ color: "red", marginRight: "8px" }} />;
      default:
        return <HourglassEmpty style={{ color: "gray", marginRight: "8px" }} />;
    }
  };

  const getColor = (percentage) => {
    if (percentage < 25) return "red";
    if (percentage < 75) return "#eeee0f";
    return "green";
  };

  const applicantsPerPage = 9;
  const displayedApplicants = applicants.slice(
    (page - 1) * applicantsPerPage,
    page * applicantsPerPage
  );

  return (
    <div className="container-fluid my-2" style={{ padding: "20px" }}>
      <div className="row">
        <div className="col-md-12 col-sm-12 ">
          <div className="text-center">
            <h2 className="" style={{ color: primaryColor }}>
              Job Applicants
            </h2>
            {applicants.length === 0 ? (
              <div>There are no applicants at this time</div>
            ) : (
              <div className="row">
                {displayedApplicants.map((applicant) => (
                  <div className="col-md-4 mb-4" key={applicant._id}>
                    <Card
                      style={{
                        background: cardColor,
                        padding: "1rem",
                        borderRadius: "15px",
                        textAlign: "center",
                        position: "relative",
                        cursor: applicant.job_id ? "pointer" : "default",
                        marginTop: "10px",
                        height: "225px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around", // Evenly distributes elements
                        alignItems: "normal", // Center-aligns content horizontally
                        border: getBorderColor(applicant),
                      }}
                      onClick={() =>
                        handleCardClick(applicant._id, applicant.job_id)
                      }
                    >
                      <h4
                        className="card-title"
                        style={{ fontWeight: "bold", marginBottom: "16px" }}
                      >
                        {`${applicant.firstName} ${applicant.lastName}`}
                      </h4>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: "16px",
                        }}
                      >
                        <Work style={{ marginRight: "8px" }} />
                        {applicant.job_id
                          ? applicant.job_id.title
                          : "No Job Title"}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: "16px",
                        }}
                      >
                        <AccessAlarmOutlined style={{ marginRight: "8px" }} />
                        {applicant.job_id
                          ? applicant.job_id.role
                          : "No Job Role"}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {getStatusIcon(applicant.status)}
                        {applicant.status}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: "0",
                        }}
                      >
                        {applicant.job_id && !applicant.skillMatch?.error && (
                          <Box
                            sx={{
                              width: "70%",
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
                                color:"white" // Make text bold
                              }}
                            >
                              {`${applicant.skillMatch.matchPercentage.toFixed(
                                2
                              )}% Match`}
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={applicant.skillMatch.matchPercentage}
                              sx={{
                                height: 20,
                                borderRadius: 5,
                                backgroundColor: "#b4b4b4",
                                "& .MuiLinearProgress-bar": {
                                  backgroundColor: getColor(
                                    applicant.skillMatch.matchPercentage
                                  ),
                                },
                              }}
                            />
                          </Box>
                        )}
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            )}
            <div className="d-flex justify-content-center mt-4">
              <Pagination
                count={Math.ceil(applicants.length / 9)}
                page={page}
                onChange={handleChangePage}
                color="primary"
              />
            </div>
          </div>
        </div>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Skill Match Information</DialogTitle>
        <DialogContent>
          <p>Match Percentage: {skillMatch}%</p>
          <p>Fit Category: {fitCategory}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default JobApplicants;
