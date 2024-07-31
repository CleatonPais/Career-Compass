import React, { useState, useEffect } from 'react';
import { Card, Pagination } from "@mui/material";
import { Work, AccessAlarmOutlined, Task, CheckCircle, Cancel, HourglassEmpty } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobApplicants = ({ primaryColor, cardColor }) => {
  const [applicants, setApplicants] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobapplications/getemployerjobapplications', {
          headers: {
            "x-auth-token": sessionStorage.getItem("user")
          }
        });
        setApplicants(response.data);
      } catch (error) {
        console.error('Error fetching applicants', error);
      }
    };

    fetchApplicants();
  }, []);

  const handleCardClick = (id, jobId) => {
    if (jobId) {
      navigate(`/applicant-details/${id}`);
    }
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const getBorderColor = (applicant) => {
    if (applicant.status === "Interview Confirmed" || applicant.status === "Approved") {
      return "1px solid green";
    } else if (applicant.status === "Rejected" || !applicant.job_id) {
      return "1px solid red";
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

  const applicantsPerPage = 10;
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
              <div>
                There are no applicants at this time
              </div>
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
                        border: getBorderColor(applicant),
                      }}
                      onClick={() => handleCardClick(applicant._id, applicant.job_id)}
                    >
                      <h5 className="card-title" style={{ fontWeight: "bold", marginBottom: "16px" }}>
                        {`${applicant.firstName} ${applicant.lastName}`}
                      </h5>
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "16px" }}>
                        <Work style={{ marginRight: "8px" }} />
                        {applicant.job_id ? applicant.job_id.title : "No Job Title"}
                      </div>
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "16px" }}>
                        <AccessAlarmOutlined style={{ marginRight: "8px" }} />
                        {applicant.job_id ? applicant.job_id.role : "No Job Role"}
                      </div>
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {getStatusIcon(applicant.status)}
                        {applicant.status}
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            )}
            <div className="d-flex justify-content-center mt-4">
              <Pagination
                count={Math.ceil(applicants.length / 10)}
                page={page}
                onChange={handleChangePage}
                color="primary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobApplicants;
