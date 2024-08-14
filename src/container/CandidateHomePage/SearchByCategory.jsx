// import React from "react";
// import { Carousel, Card } from "react-bootstrap"; // Import Bootstrap Carousel
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faBullhorn,
//   faLaptopCode,
//   faTasks,
//   faChartLine,
//   faBusinessTime,
// } from "@fortawesome/free-solid-svg-icons";
// import { array } from "prop-types";
// import './CandidateHome.css';

// const SearchByCategory = ({ SecondaryFontColor, CardColor }) => {
//   const categories = [
//     {
//       icon: faBullhorn,
//       title: "Marketing & Communication",
//       subtitle: "0 open position",
//     },
//     {
//       icon: faLaptopCode,
//       title: "Software Engineering",
//       subtitle: "2 open positions",
//     },
//     {
//       icon: faTasks,
//       title: "Project Management",
//       subtitle: "2 open positions",
//     },
//     {
//       icon: faBusinessTime,
//       title: "Business Development",
//       subtitle: "0 open positions",
//     },
//     {
//       icon: faBusinessTime,
//       title: "Business Development",
//       subtitle: "5 open positions",
//     },
//     {
//       icon: faBusinessTime,
//       title: "Business Development",
//       subtitle: "8 open positions",
//     },
//   ];
//   const chunkArray = (array, chunksize) => {
//     const result = [];
//     for (let i = 0; i < array.length; i += chunksize) {
//       result.push(array.slice(i, i + chunksize));
//     }
//     return result;
//   };

//   const categoryChunks = chunkArray(categories, 4);

//   return (
//     <div className="container my-5">
//         <div className="row">
//         <div className="col-md-12 pt-5">
//         <div className="heading-content">
//           <h1 style={{ color: SecondaryFontColor }}>Search By Category</h1>
//           <h6 style={{ color: SecondaryFontColor }}>
//             Search your career opportunity with our categories
//           </h6>
//         </div>
//       </div>
//       <div className="col-md-12 ">
//         <div className="allCategory text-end">
//           <h6 href="#" style={{ color: SecondaryFontColor }}>
//             All Categories
//           </h6>
//         </div>
//       </div>
//       <div className="col-md-12 p-5">
//         <Carousel>
//           {categoryChunks.map((chunk, index) => (
//             <Carousel.Item key={index}>
//               <div className="d-flex justify-content-around flex-sm-wrap">
//                 {chunk.map((category, idx) => (
//                   <Card
//                     key={idx}
//                     style={{
//                       width: "18rem",
//                       height: "15rem",
//                       background: CardColor,
//                       borderRadius: "60px",
//                     }}
//                   >
//                     <Card.Body className="text-center p-5">
//                       <FontAwesomeIcon
//                         icon={category.icon}
//                         style={{ fontSize: "50px", color: "" }}
//                       />
//                       <Card.Title
//                         className="mt-4 align-items-center"
//                         style={{ color: "" }}
//                       >
//                         {category.title}
//                       </Card.Title>
//                       <Card.Text
//                         className="d-flext align-items-end"
//                         style={{ color: "" }}
//                       >
//                         {category.subtitle}
//                       </Card.Text>
//                     </Card.Body>
//                   </Card>
//                 ))}
//               </div>
//             </Carousel.Item>
//           ))}
//         </Carousel>
//       </div>
//         </div>
      

      
//     </div>
//   );
// };

// export default SearchByCategory;


import React, { useState, useEffect } from "react";
import { Carousel, Card } from "react-bootstrap"; // Import Bootstrap Carousel
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faLaptopCode,
  faTasks,
  faChartLine,
  faBusinessTime,
} from "@fortawesome/free-solid-svg-icons";
import './CandidateHome.css';

const SearchByCategory = ({ SecondaryFontColor, CardColor }) => {
  const categories = [
    {
      icon: faBullhorn,
      title: "Marketing & Communication",
      subtitle: "0 open position",
    },
    {
      icon: faLaptopCode,
      title: "Software Engineering",
      subtitle: "2 open positions",
    },
    {
      icon: faTasks,
      title: "Project Management",
      subtitle: "2 open positions",
    },
    {
      icon: faBusinessTime,
      title: "Business Development",
      subtitle: "0 open positions",
    },
    {
      icon: faBusinessTime,
      title: "Business Development",
      subtitle: "5 open positions",
    },
    {
      icon: faBusinessTime,
      title: "Business Development",
      subtitle: "8 open positions",
    },
    {
      icon: faBusinessTime,
      title: "Business Development",
      subtitle: "5 open positions",
    },
    {
      icon: faBusinessTime,
      title: "Business Development",
      subtitle: "8 open positions",
    },
  ];

  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const [chunkSize, setChunkSize] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setChunkSize(4); // xl
      } else if (window.innerWidth >= 992) {
        setChunkSize(3); // lg
      } else if (window.innerWidth >= 768) {
        setChunkSize(2); // md
      } else {
        setChunkSize(1); // sm and xs
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categoryChunks = chunkArray(categories, chunkSize);

  return (
    <div className="container my-2 my-md-5">
      <div className="row">
        <div className="col-md-12 pt-5">
          <div className="heading-content text-center text-md-start">
            <h1 style={{ color: SecondaryFontColor }}>Search By Category</h1>
            <h6 style={{ color: SecondaryFontColor }}>
              Search your career opportunity with our categories
            </h6>
          </div>
        </div>
        <div className="col-md-12 ">
          <div className="allCategory text-center text-md-end">
            <h6 style={{ color: SecondaryFontColor }}>
              All Categories
            </h6>
          </div>
        </div>
        <div className="col-md-12 p-0 p-md-5">
          <Carousel>
            {categoryChunks.map((chunk, index) => (
              <Carousel.Item key={index}>
                <div className="d-flex justify-content-around flex-sm-wrap">
                  {chunk.map((category, idx) => (
                    <Card
                      key={idx}
                      style={{
                        width: "18rem",
                        height: "15rem",
                        background: CardColor,
                        borderRadius: "60px",
                      }}
                    >
                      <Card.Body className="text-center p-5">
                        <FontAwesomeIcon
                          icon={category.icon}
                          style={{ fontSize: "50px", color: "" }}
                        />
                        <Card.Title
                          className="mt-4 align-items-center"
                          style={{ color: "" }}
                        >
                          {category.title}
                        </Card.Title>
                        <Card.Text
                          className="d-flext align-items-end"
                          style={{ color: "" }}
                        >
                          {category.subtitle}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default SearchByCategory;
