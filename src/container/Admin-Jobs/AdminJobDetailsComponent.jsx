import React from "react";
import {Card, Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faClock,
  faBook,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

const AdminJobDeatilComponent = ({
  job,
  SecondaryFontColor,
  primaryColor,
  primaryFontColor,
  CardColor,
  handleDeleteClick
}) => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <Card
            style={{
              background: CardColor,
              padding: "1rem",
              borderRadius: "15px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <h5
              className="card-title mt-3"
              style={{ fontWeight: "bold" }}
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
                {job.location.street}, {job.location.city},{" "}
                {job.location.province}, {job.location.country},{" "}
                {job.location.postalCode}
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
                marginBottom: "16px",
              }}
            >
              <FontAwesomeIcon icon={faBook} style={{ marginRight: "8px" }} />
              <span>{job.skills.join(", ")}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon
                icon={faCalendarAlt}
                style={{ marginRight: "8px" }}
              />
              <span>{new Date(job.expiry_date).toLocaleDateString()}</span>
            </div>
            <div className="d-flex justify-content-center mt-4" style={{ marginBottom: "20px", marginTop: "40px" }}>
        <Button
          variant="contained"
          style={{
            backgroundColor: primaryColor,
            color: primaryFontColor,
            width: "150px",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid"
          }}
          onClick={handleDeleteClick}
        >
          Delete
        </Button>
      </div>
          </Card>
        </div>
        <div className="col-md-4"></div>
        
      </div>
    </div>
  );
};

export default AdminJobDeatilComponent;
