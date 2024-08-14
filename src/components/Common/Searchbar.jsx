import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ListGroup from "react-bootstrap/ListGroup";

const Searchbar = () => {
  const [input, setInput] = useState("");
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [noJobsFound, setNoJobsFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("user");
        const response = await axios.get("http://localhost:5000/api/jobs/all", {
          headers: {
            "x-auth-token": token,
          },
        });
        setAllJobs(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filterJobs = (value) => {
    const lowercasedValue = value.toLowerCase();
    const titleSearchResult = allJobs.filter(
      (job) => job.title && job.title.toLowerCase().includes(lowercasedValue)
    );

    const locationSearchResult = allJobs.filter(
      (job) => job.location && job.location.city && job.location.city.toLowerCase().includes(lowercasedValue)
    );

    // Concatenate unique jobs from title and location search results
    const searchResult = [...new Set([...titleSearchResult, ...locationSearchResult])];

    setFilteredJobs(searchResult);
    setSuggestions(searchResult.slice(0, 5)); // Limit suggestions to 5 items
    setNoJobsFound(searchResult.length === 0 && !errorMessage); // Set noJobsFound based on search result
    setErrorMessage(""); // Clear error message when new input is given
  };

  const handleInputChange = (value) => {
    setInput(value);
    if (value.trim() !== "") {
      filterJobs(value);
    } else {
      setSuggestions([]);
      setNoJobsFound(false); // Reset noJobsFound when input is cleared
      setErrorMessage(""); // Clear error message when input is cleared
    }
  };

  const handleSearch = () => {
    if (input.trim() !== "") {
      if (filteredJobs.length > 0) {
        navigate("/search-jobs", { state: { jobs: filteredJobs } });
      } else {
        setErrorMessage("No jobs found for the given keyword.");
        setNoJobsFound(false); // Ensure noJobsFound message is hidden when showing error message
      }
    }
  };

  const handleSuggestionClick = (job) => {
    navigate("/search-jobs", { state: { jobs: [job] } });
    setInput(""); // Clear input after suggestion click
    setSuggestions([]); // Clear suggestions after suggestion click
    setNoJobsFound(false); // Reset noJobsFound after suggestion click
    setErrorMessage(""); // Clear error message after suggestion click
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="col-md-12 col-sm-12">
      <div className="searchbar-wrapper">
        <Form className="d-flex justify-content-center justify-content-md-start">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2 home-form-search"
            aria-label="Search"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              position: "relative"
            }}
          />
          <span
            className="input-group-text"
            onClick={handleSearch}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </Form>
        {suggestions.length > 0 && (
          <ListGroup
            style={{
              position: "absolute",
              width: "inherit",
              zIndex: 1000,
              maxHeight: "200px",
              overflow: "scroll"
            }}
          >
            {suggestions.map((job) => (
              <ListGroup.Item
                key={job._id}
                onClick={() => handleSuggestionClick(job)}
                action // Add action prop to make list items clickable
              >
                <div>
                  <strong>{job.title}</strong>
                </div>
                <div>{job.location.city}</div>
                <div>{job.role}</div>
                <div>{job.skills.join(", ")}</div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        {noJobsFound && !errorMessage && (
          <div style={{ width: "inherit", textAlign: "center", marginTop: "10px" }}>
            <p style={{ color: "white", fontWeight: "bold" }}>No jobs found</p>
          </div>
        )}
        {errorMessage && (
          <div style={{ width: "inherit", textAlign: "center", marginTop: "10px" }}>
            <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
