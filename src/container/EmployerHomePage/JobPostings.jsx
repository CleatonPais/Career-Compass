import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Pagination,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import { LocationOn, Schedule, Book, Delete } from "@mui/icons-material";
import CreateJobModal from "./CreateJobModal";
import UpdateJobModal from "./UpdateJobModal";
import axios from "axios";

const JobPostings = ({ primaryFontColor, cardColor }) => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [deleteJobId, setDeleteJobId] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const fetchJobs = async () => {
    try {
      const token = sessionStorage.getItem("user");
      const response = await axios.get("http://localhost:5000/api/jobs/all", {
        headers: {
          "x-auth-token": token,
        },
      });

      const reversedData = response.data.reverse();
      setJobs(reversedData);

      // setJobs(response.data);
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

  const handleCreateJobClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    fetchJobs();
  };

  const handleOpenUpdateModal = (job) => {
    setSelectedJob(job);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedJob(null);
    fetchJobs();
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const token = sessionStorage.getItem("user");
      await axios.delete(`http://localhost:5000/api/jobs/delete/${jobId}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      fetchJobs();
      setConfirmDialogOpen(false);
      showSnackbar("Job deleted successfully!", "success");
    } catch (error) {
      showSnackbar("Error deleting job", "error");
      console.error("Error deleting job:", error);
    }
  };

  const handleOpenConfirmDialog = (jobId) => {
    setDeleteJobId(jobId);
    setConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  return (
    <div className="mb-5" style={{ padding: "20px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="flex-grow-1 d-flex justify-content-center">
          <h2 className="text-center" style={{ color: "#5C6BC0" }}>
            Jobs
          </h2>
        </div>
        <Button
          variant="contained"
          style={{ backgroundColor: "#5C6BC0", color: "#FFFFFF" }}
          onClick={handleCreateJobClick}
        >
          Create Job
        </Button>
      </div>
      {jobs.length === 0 ? (
        <h3 className="text-center" style={{ color: primaryFontColor }}>
          No Job Created Yet
        </h3>
      ) : (
        <>
          <div className="row">
            {currentJobs.map((job) => (
              <div className="col-md-4 mb-4" key={job._id}>
                <Card
                  style={{
                    background: cardColor,
                    padding: "1rem",
                    borderRadius: "15px",
                    textAlign: "center",
                    position: "relative",
                    cursor: "pointer",
                    height:"225px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between", // Evenly distribute elements
                    alignItems: "center",
                  }}
                  onClick={() => handleOpenUpdateModal(job)}
                >
                  <IconButton
                    aria-label="delete"
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "red",
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the card click event from triggering delete
                      handleOpenConfirmDialog(job._id);
                    }}
                  >
                    <Delete />
                  </IconButton>
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
                    <LocationOn style={{ marginRight: "8px" }} />
                    <span>{job.location.city}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "16px",
                    }}
                  >
                    <Schedule style={{ marginRight: "8px" }} />
                    <span>{job.role}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Book style={{ marginRight: "8px" }} />
                    <span>{job.skills.join(", ")}</span>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center mt-4">
            <Pagination
              count={Math.ceil(jobs.length / jobsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </>
      )}
      <CreateJobModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        showSnackbar={showSnackbar}
      />
      <UpdateJobModal
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        jobData={selectedJob}
        showSnackbar={showSnackbar}
      />

      <Dialog open={confirmDialogOpen} onClose={handleCloseConfirmDialog}>
        <DialogTitle>Delete Job</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this job?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteJob(deleteJobId)}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default JobPostings;
