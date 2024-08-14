import react from "react";

const Footer = ({ PrimaryFontColor, PrimaryColor, FooterLinkColor }) => {
  return (
    <div className="footer-content ">
      <div className="container-fluid">
        <div className="row" style={{ background: FooterLinkColor }}>
          <div className="container p-5">
            <div className="row" style={{ color: PrimaryFontColor }}>
              <div className="col-md-3 mt-5 mt-md-0">
                <div className="popularCategory">
                  <div className="popularCategoryHeading mb-4">
                    <h4 style={{}}>Popular Job Category</h4>
                  </div>
                  <div className="popularCategoryContent">
                    <h6>Software Engineering</h6>
                    <h6>Project Management</h6>
                    <h6>Healthcare</h6>
                    <h6>Marketing & Communication</h6>
                    <h6>Human Resources</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mt-5 mt-md-0">
                <div className="popularCategory">
                  <div className="popularCategoryHeading mb-4">
                    <h4>Popular Job Titles</h4>
                  </div>
                  <div className="popularCategoryContent">
                    <h6>Certified Medical Assistant</h6>
                    <h6>Project Management</h6>
                    <h6>Construction Manager</h6>
                    <h6>Front-End Web Developer</h6>
                    <h6>Financial Analyst</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mt-5 mt-md-0">
                <div className="popularCategory">
                  <div className="popularCategoryHeading mb-4">
                    <h4>Popular Job Locations</h4>
                  </div>
                  <div className="popularCategoryContent">
                    <h6>Toronto, CA</h6>
                    <h6>New York, USA</h6>
                    <h6>California, USA</h6>
                    <h6>Banglore, IND</h6>
                    <h6>Waterloo, CA</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mt-5 mt-md-0">
                <div className="popularCategory">
                  <div className="popularCategoryHeading mb-4">
                    <h4>Popular Job Searches</h4>
                  </div>
                  <div className="popularCategoryContent">
                    <h6>Web Developer</h6>
                    <h6>Fullstack</h6>
                    <h6>Administration</h6>
                    <h6>Team Leader</h6>
                    <h6>Writer</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid" style={{ background: PrimaryColor,color:PrimaryFontColor }}>
      <div className="row">
        <div className="col-md-12">
          <div className="left-footer-content p-0 p-md-3" style={{height:'80px'}}>
            <p className="mb-0 mt-3">&copy; 2024 Career compass. All Right Reserved.</p>
          </div>
          <div className="right-footer-content"></div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Footer;
