import React, { useState, useEffect } from "react";
import Navbar from "../../components/Common/Navbar";
import Footer from "../../components/Common/Footer";
import { TextField, Button, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { createUserProfile, getUserProfile, updateUserProfile } from "../../Api/Profile";

const CandidateProfilePage = () => {
  const links = [
    { text: "Home", url: "#" },
    { text: "Find Job", url: "#" },
    { text: "Applications", url: "#" },
    { text: "Blog", url: "#" },
  ];

  const [primaryColor, setPrimaryColor] = useState("");
  const [primaryFontColor, setPrimaryFontColor] = useState("");
  const [secondaryFontColor, setSecondaryFontColor] = useState("");
  const [cardColor, setCardColor] = useState("");
  const [footerLinkColor, setFooterLinkColor] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    skills: "",
    address: {
      street: "",
      city: "",
      province: "",
      country: "",
      postalCode: "",
    },
    experience: {
      jobTitle: "",
      jobDescription: "",
      company: "",
      startDate: "",
      endDate: "",
    },
    education: {
      qualification: "",
      institute: "",
      endDate: "",
    },
  });

  const [profileImage, setProfileImage] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [profileId, setProfileId] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = sessionStorage.getItem("user");
      if (token) {
        try {
          const profile = await getUserProfile(token);
          setFormData({
            email: profile.userId.email,
            firstName: profile.firstName,
            lastName: profile.lastName,
            skills: profile.skills,
            address: profile.address,
            experience: profile.experience,
            education: profile.education,
          });
          setProfileImage(profile.profileImage);
          setProfileId(profile._id);
          console.log("ProfileID", profile._id);
          setIsUpdating(true); // Set to updating mode if profile exists
        } catch (error) {
          console.error("Error fetching profile data", error);
        }
      }
    };

    const rootStyles = getComputedStyle(document.documentElement);
    setPrimaryColor(rootStyles.getPropertyValue("--primary-color").trim());
    setPrimaryFontColor(rootStyles.getPropertyValue("--primary-font-color").trim());
    setSecondaryFontColor(rootStyles.getPropertyValue("--secondary-font-color").trim());
    setCardColor(rootStyles.getPropertyValue("--card-color").trim());
    setFooterLinkColor(rootStyles.getPropertyValue("--footer-link-color").trim());

    fetchProfileData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const [parent, child] = name.split(".");

    if (child) {
      setFormData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    // Clear error for the current field
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setFormData((prevData) => ({ ...prevData, profileImage: file }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.skills) newErrors.skills = "Skills are required";
    if (!formData.address.street) newErrors["address.street"] = "Street is required";
    if (!formData.address.city) newErrors["address.city"] = "City is required";
    if (!formData.address.province) newErrors["address.province"] = "Province is required";
    if (!formData.address.country) newErrors["address.country"] = "Country is required";
    if (!formData.address.postalCode) newErrors["address.postalCode"] = "Postal Code is required";
    if (!formData.experience.jobTitle) newErrors["experience.jobTitle"] = "Job Title is required";
    if (!formData.experience.jobDescription) newErrors["experience.jobDescription"] = "Job Description is required";
    if (!formData.experience.company) newErrors["experience.company"] = "Company is required";
    if (!formData.experience.startDate) newErrors["experience.startDate"] = "Start Date is required";
    if (!formData.experience.endDate) newErrors["experience.endDate"] = "End Date is required";
    if (!formData.education.qualification) newErrors["education.qualification"] = "Qualification is required";
    if (!formData.education.institute) newErrors["education.institute"] = "Institute is required";
    if (!formData.education.endDate) newErrors["education.endDate"] = "End Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append("firstName", formData.firstName);
      formDataWithImage.append("lastName", formData.lastName);
      formDataWithImage.append("skills", formData.skills);
      formDataWithImage.append("address[street]", formData.address.street);
      formDataWithImage.append("address[city]", formData.address.city);
      formDataWithImage.append("address[province]", formData.address.province);
      formDataWithImage.append("address[country]", formData.address.country);
      formDataWithImage.append("address[postalCode]", formData.address.postalCode);
      formDataWithImage.append("experience[jobTitle]", formData.experience.jobTitle);
      formDataWithImage.append("experience[jobDescription]", formData.experience.jobDescription);
      formDataWithImage.append("experience[company]", formData.experience.company);
      formDataWithImage.append("experience[startDate]", formData.experience.startDate);
      formDataWithImage.append("experience[endDate]", formData.experience.endDate);
      formDataWithImage.append("education[qualification]", formData.education.qualification);
      formDataWithImage.append("education[institute]", formData.education.institute);
      formDataWithImage.append("education[endDate]", formData.education.endDate);

      if (formData.profileImage) {
        formDataWithImage.append("profileImage", formData.profileImage);
      }

      const token = sessionStorage.getItem("user");

      if (isUpdating) {
        const response = await updateUserProfile(profileId, formDataWithImage, token);
        if (response) {
          alert("Profile updated successfully!");
        } else {
          alert("Failed to update profile. Please try again.");
        }
      } else {
        const response = await createUserProfile(formDataWithImage, token);
        if (response) {
          alert("Profile created successfully!");
          setIsUpdating(true);
          setProfileId(response._id); // Set the profile ID after creation
        } else {
          alert("Failed to create profile. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error during profile creation/update", error);
      alert("An error occurred while creating/updating the profile.");
    }
  };

  const handleCancel = () => {
    setFormData({
      email: "",
      firstName: "",
      lastName: "",
      skills: "",
      address: {
        street: "",
        city: "",
        province: "",
        country: "",
        postalCode: "",
      },
      experience: {
        jobTitle: "",
        jobDescription: "",
        company: "",
        startDate: "",
        endDate: "",
      },
      education: {
        qualification: "",
        institute: "",
        endDate: "",
      },
    });
    setProfileImage(null);
    setErrors({});
  };

  return (
    <div>
      <Navbar
        logo="/logo.png"
        links={links}
        primaryFontColor={primaryFontColor}
        primaryColor={primaryColor}
      />
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div className="text-center mb-4">
              <div style={{ position: "relative", display: "inline-block" }}>
                <div
                  style={{
                    borderRadius: "50%",
                    width: "200px",
                    height: "200px",
                    backgroundColor: "#e0e0e0",
                    backgroundImage: profileImage ? `url(${profileImage})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {!profileImage && <Edit style={{ fontSize: 50, color: "#fff" }} />}
                </div>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="icon-button-file"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="icon-button-file">
                  <IconButton
                    aria-label="upload picture"
                    component="span"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      backgroundColor: "white",
                      borderRadius: "50%",
                      
                    }}
                  >
                    <Edit />
                  </IconButton>
                </label>
              </div>
            </div>
            <div className="form-group text-center" style={{ marginTop: "25px" }}>
              <h2 className="mb-2" style={{ color: secondaryFontColor }}>Account</h2>
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                name="email"
                value={formData.email}
                InputProps={{ readOnly: true }}
                className="mb-3"
              />
            </div>
            <div className="form-group text-center" style={{ marginTop: "25px" }}>
              <h2 className="mb-2" style={{ color: secondaryFontColor }}>Personal Info</h2>
              <TextField
                fullWidth
                variant="outlined"
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="mb-3"
                required
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="mb-3"
                required
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Skills"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                className="mb-3"
                multiline
                rows={4}
                required
                error={!!errors.skills}
                helperText={errors.skills}
              />
            </div>
            <div className="form-group text-center" style={{ marginTop: "25px" }}>
              <h2 className="mb-2" style={{ color: secondaryFontColor }}>Address</h2>
              <TextField
                fullWidth
                variant="outlined"
                label="Street"
                name="address.street"
                value={formData.address.street}
                onChange={handleInputChange}
                className="mb-3"
                required
                error={!!errors["address.street"]}
                helperText={errors["address.street"]}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="City"
                name="address.city"
                value={formData.address.city}
                onChange={handleInputChange}
                className="mb-3"
                required
                error={!!errors["address.city"]}
                helperText={errors["address.city"]}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Province"
                name="address.province"
                value={formData.address.province}
                onChange={handleInputChange}
                className="mb-3"
                required
                error={!!errors["address.province"]}
                helperText={errors["address.province"]}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Country"
                name="address.country"
                value={formData.address.country}
                onChange={handleInputChange}
                className="mb-3"
                required
                error={!!errors["address.country"]}
                helperText={errors["address.country"]}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Postal Code"
                name="address.postalCode"
                value={formData.address.postalCode}
                onChange={handleInputChange}
                className="mb-3"
                required
                error={!!errors["address.postalCode"]}
                helperText={errors["address.postalCode"]}
              />
            </div>
            <div className="form-group text-center" style={{ marginTop: "25px" }}>
              <h2 className="mb-2" style={{ color: secondaryFontColor }}>Experience</h2>
              <TextField
                fullWidth
                variant="outlined"
                label="Job Title"
                name="experience.jobTitle"
                value={formData.experience.jobTitle}
                onChange={handleInputChange}
                className="mb-3"
                required
                error={!!errors["experience.jobTitle"]}
                helperText={errors["experience.jobTitle"]}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Job Description"
                name="experience.jobDescription"
                value={formData.experience.jobDescription}
                onChange={handleInputChange}
                className="mb-3"
                multiline
                rows={4}
                required
                error={!!errors["experience.jobDescription"]}
                helperText={errors["experience.jobDescription"]}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Company"
                name="experience.company"
                value={formData.experience.company}
                onChange={handleInputChange}
                className="mb-3"
                required
                error={!!errors["experience.company"]}
                helperText={errors["experience.company"]}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Start Date"
                name="experience.startDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.experience.startDate}
                onChange={handleInputChange}
                className="mb-3"
                required
                error={!!errors["experience.startDate"]}
                helperText={errors["experience.startDate"]}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="End Date"
                name="experience.endDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.experience.endDate}
                onChange={handleInputChange}
                className="mb-3"
                required
                error={!!errors["experience.endDate"]}
                helperText={errors["experience.endDate"]}
              />
            </div>
            <div className="form-group text-center" style={{ marginTop: "25px" }}>
              <h2 className="mb-2" style={{ color: secondaryFontColor }}>Education</h2>
              <TextField
                fullWidth
                variant="outlined"
                label="Qualification"
                name="education.qualification"
                value={formData.education.qualification}
                onChange={handleInputChange}
                className="mb-3"
                required
                error={!!errors["education.qualification"]}
                helperText={errors["education.qualification"]}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Institute"
                name="education.institute"
                value={formData.education.institute}
                onChange={handleInputChange}
                className="mb-3"
                required
                error={!!errors["education.institute"]}
                helperText={errors["education.institute"]}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="End Date"
                name="education.endDate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.education.endDate}
                onChange={handleInputChange}
                className="mb-3"
                required
                error={!!errors["education.endDate"]}
                helperText={errors["education.endDate"]}
              />
            </div>
            <div className="text-center mb-5" style={{ marginTop: "25px" }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: primaryFontColor,
                  color: primaryColor,
                  width: "250px",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid",
                  margin:"10px"
        
                }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: primaryColor,
                  color: primaryFontColor,
                  width: "250px",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid",
                  margin:"10px"
                }}
                onClick={handleSubmit}
              >
                {isUpdating ? "Update" : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer
        PrimaryColor={primaryColor}
        PrimaryFontColor={primaryFontColor}
        FooterLinkColor={footerLinkColor}
      />
    </div>
  );
};

export default CandidateProfilePage;
