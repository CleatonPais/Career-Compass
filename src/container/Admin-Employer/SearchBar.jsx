import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    onSearch(input);
  };

  return (
    <div className="search-bar-container">
      <Form className="d-flex justify-content-center justify-content-start">
        <Form.Control
          type="search"
          placeholder="Search candidates..."
          className="me-2 home-form-search"
          aria-label="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            backgroundColor: "white",
            borderRadius: "25px",
            border: "none",
            paddingLeft: "15px",
            paddingRight: "15px",
            width: "300px",
            color: "black",
          }}
        />
         <span
            className="input-group-text"
            onClick={handleSearch}
            style={{ cursor: "pointer" ,background: "white"}}
          >
            <FontAwesomeIcon icon={faSearch} />
          </span>
      </Form>
    </div>
  );
};

export default SearchBar;
