import React, { useEffect, useState } from "react";
import {
  Card,
  Pagination,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { LocationOn, Work, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminEmployerPage.css";

const EmployersListing = ({ primaryColor, cardColor, searchTerm }) => {
  const [employers, setEmployers] = useState([]);
  const [filteredEmployers, setFilteredEmployers] = useState([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedEmployerId, setSelectedEmployerId] = useState(null);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/profile/getAllEmployers",
          {
            headers: {
              "x-auth-token": sessionStorage.getItem("user"),
            },
          }
        );
        setEmployers(response.data);
        setFilteredEmployers(response.data);
      } catch (error) {
        console.error("Error fetching employers:", error);
      }
    };

    fetchEmployers();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = employers.filter(
        (employer) =>
          employer.companyName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          employer.companyDescription
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          employer.address?.city
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
      setFilteredEmployers(filtered);
    } else {
      setFilteredEmployers(employers);
    }
  }, [searchTerm, employers]);

  const handleCardClick = (empID) => {
    navigate(`/employer-profile/${empID}`);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEmployers = filteredEmployers.slice(startIndex, endIndex);

  const handleDeleteClick = (empID) => {
    setSelectedEmployerId(empID);
    setOpen(true);
    console.log(selectedEmployerId);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEmployerId(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/profile/deleteEmployerProfile/${selectedEmployerId}`,
        {
          headers: {
            "x-auth-token": sessionStorage.getItem("user"),
          },
        }
      );
      console.log(selectedEmployerId);
      const updatedEmployers = employers.filter(
        (employer) => employer.userId?._id !== selectedEmployerId
      );
      setEmployers(updatedEmployers);
      setFilteredEmployers(updatedEmployers);
      console.log(updatedEmployers);
      console.log("Employer deleted successfully");
      handleClose();
    } catch (error) {
      console.error("Error deleting employer:", error);
      handleClose();
    }
  };

  return (
    <div className="container-fluid my-2 p-5">
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <div className="text-center">
            <h2 style={{ color: primaryColor }}>Employers Listing</h2>
          </div>
          <div className="row">
            {paginatedEmployers.length === 0 ? (
              <div>There are no Employers at this time</div>
            ) : (
              paginatedEmployers.map((employer) => (
                <div className="col-md-4 mb-4" key={employer.userId?._id || employer.id}>
                  <Card
                    className="card-container"
                    style={{
                      background: cardColor,
                      minHeight: "225px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                    onClick={() => handleCardClick(employer.userId?._id)}
                  >
                    <IconButton
                      className="delete-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(employer.userId?._id);
                      }}
                    >
                      <Delete />
                    </IconButton>
                    <h5 className="card-title">{employer.companyName}</h5>
                    <div className="icon-text">
                      <Work className="mx-2" />
                      {employer.companyDescription || "No description provided"}
                    </div>
                    <div className="icon-text">
                      <LocationOn className="mx-2" />
                      {employer.address?.city || "No city provided"}, {employer.address?.country || "No country provided"}
                    </div>
                  </Card>
                </div>
              ))
            )}
          </div>
          <div className="d-flex justify-content-center mt-4">
            <Pagination
              count={Math.ceil(filteredEmployers.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this employer profile?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployersListing;
