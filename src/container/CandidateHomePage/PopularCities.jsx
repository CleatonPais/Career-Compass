import React from "react";
import "./CandidateHome.css";
import boston from "../../assets/boston.png";
import toronto from "../../assets/toronto.png";
import newyork from "../../assets/newyork.png";
import waterloo from "../../assets/waterloo.png";
import seattle from "../../assets/seattle.png";
import sanfransisco from "../../assets/sanfrancisco.png";
import sandiego from "../../assets/sandiego.png";
import chicago from "../../assets/chicago.png";

const PopularCities = ({ SecondaryFontColor, cardColor }) => {
  const categories = [
    {
      city: "Boston",
      country: "MA",
      positions: 1,
      image: boston,
    },
    {
      city: "New York",
      country: "USA",
      positions: 2,
      image: newyork,
    },
    {
      city: "Toronto",
      country: "",
      positions: 9,
      image: toronto,
    },
    {
      city: "Waterloo",
      country: "",
      positions: 2,
      image: waterloo,
    },
    {
      city: "Seattle",
      country: "WA",
      positions: 1,
      image: seattle,
    },
    {
      city: "San Francisco",
      country: "CA",
      positions: 2,
      image: sanfransisco,
    },
    {
      city: "San Diego",
      country: "CA",
      positions: 2,
      image: sandiego,
    },
    {
      city: "Chicago",
      country: "IL",
      positions: 0,
      image: chicago,
    },
  ];

  return (
    <div className="container mt-5 mt-md-0">
      <div className="row">
        <div className="col-md-12">
          <div className="heading-content text-center">
            <h1 style={{ color: SecondaryFontColor }}>Popular Cities</h1>
            <h6 style={{ color: SecondaryFontColor }}>
              Start your next carrer in a beautiful city.
            </h6>
          </div>
        </div>
        <div className="row my-2 my-md-5 justify-content-center justify-content-md-start">
          {categories.map((cat, index) => (
            <div key={index} className="col-lg-3 col-md-3 col-sm-6 col-xs-12 mb-4 mt-5 pt-5">
              <div
                className="card position-relative"
                style={{ background: cardColor, borderRadius: "40px" }}
              >
                <img
                  src={cat.image}
                  className="card-img-top position-absolute top-0 start-50 translate-middle"
                  alt="Job Image"
                  style={{ width: "150px" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-text mt-5 pt-4">
                    {cat.city}, {cat.country}
                  </h5>
                  <p className="card-text mb-5">
                    {cat.positions} Position available
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCities;
