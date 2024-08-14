import React, { useEffect, useState } from "react";
import { Modal, Box, TextField, Button, MenuItem } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";

const UpdateJobModal = ({ isOpen, onClose, jobData, showSnackbar }) => {
  const { register, handleSubmit, formState: { errors }, setValue, reset, setError } = useForm();

  const [primaryColor, setPrimaryColor] = useState("");
  const [primaryFontColor, setPrimaryFontColor] = useState("");
  const [secondaryFontColor, setSecondaryFontColor] = useState("");
  const [cardColor, setCardColor] = useState("");
  const [footerLinkColor, setFooterLinkColor] = useState("");

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    setPrimaryColor(rootStyles.getPropertyValue("--primary-color").trim());
    setPrimaryFontColor(rootStyles.getPropertyValue("--primary-font-color").trim());
    setSecondaryFontColor(rootStyles.getPropertyValue("--secondary-font-color").trim());
    setCardColor(rootStyles.getPropertyValue("--card-color").trim());
    setFooterLinkColor(rootStyles.getPropertyValue("--footer-link-color").trim());
  }, []);

  useEffect(() => {
    if (isOpen && jobData) {
      reset({
        _id: jobData._id,
        title: jobData.title,
        description: jobData.description,
        skills: jobData.skills.join(", "),
        role: jobData.role,
        requirements: jobData.requirements.join(", "),
        salary: jobData.salary,
        street: jobData.location.street,
        city: jobData.location.city,
        province: jobData.location.province,
        country: jobData.location.country,
        postalCode: jobData.location.postalCode,
        expiry_date: jobData.expiry_date.substring(0, 10),
      });
    }
  }, [isOpen, jobData, reset]);

  const validateData = (data) => {
    const errors = {};

    if (!data.title) errors.title = "Title is required";
    if (!data.description) errors.description = "Description is required";
    if (!data.skills) errors.skills = "Skills are required";
    if (!data.role) errors.role = "Role is required";
    if (!data.requirements) errors.requirements = "Requirements are required";
    if (!data.salary || isNaN(data.salary) || Number(data.salary) <= 0) errors.salary = "A positive salary is required";
    if (!data.street || !data.city || !data.province || !data.country || !data.postalCode) {
      errors.location = "All location fields are required";
    }
    if (!data.expiry_date) errors.expiry_date = "Expiry date is required";
    else if (new Date(data.expiry_date) <= new Date()) errors.expiry_date = "Expiry date must be in the future";

    return errors;
  };

  const onSubmit = async (data) => {
    const errors = validateData(data);
    if (Object.keys(errors).length > 0) {
      // Set errors on form fields
      for (const [field, message] of Object.entries(errors)) {
        setError(field, { type: "manual", message });
      }
      return;
    }

    // Format skills and requirements as arrays
    const formattedData = {
      ...data,
      skills: data.skills.split(',').map(skill => skill.trim()),
      requirements: data.requirements.split(',').map(requirement => requirement.trim()),
      location: {
        street: data.street,
        city: data.city,
        province: data.province,
        country: data.country,
        postalCode: data.postalCode
      }
    };

    try {
      const token = sessionStorage.getItem("user");
      const response = await axios.put(`http://localhost:5000/api/jobs/update/${data._id}`, formattedData, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      });
      if (response.status === 200) {
        showSnackbar("Job updated successfully!", "success");
        onClose(); 
      } else {
        showSnackbar("Failed to update job", "error");
        console.error("Failed to update job:", response.data);
      }
    } catch (error) {
      showSnackbar("Error updating job", "error");
      console.error("Error updating job:", error);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="update-job-modal"
      aria-describedby="update-job-form"
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          borderRadius: "25px",
          boxShadow: 24,
          p: 4,
          width: "55%",
          maxHeight: "90vh",
          overflowY: "auto",
          padding:"50px"
        }}
      >
        <h2 id="update-job-modal" style={{ color: primaryColor, marginBottom: "1.5rem", textAlign: "center" }}>Update Job</h2>
        <form id="update-job-form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            margin="normal"
            id="title"
            name="title"
            label={<span>Title <span style={{ color: "red" }}>*</span></span>}
            variant="outlined"
            {...register("title", { required: "Title is required" })}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            id="description"
            name="description"
            label={<span>Description <span style={{ color: "red" }}>*</span></span>}
            multiline
            rows={4}
            variant="outlined"
            {...register("description", { required: "Description is required" })}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            id="skills"
            name="skills"
            label={<span>Skills (comma-separated) <span style={{ color: "red" }}>*</span></span>}
            variant="outlined"
            {...register("skills", { required: "Skills are required" })}
            error={!!errors.skills}
            helperText={errors.skills?.message}
          />
          <TextField
            select
            fullWidth
            margin="normal"
            id="role"
            name="role"
            label={<span>Select Role <span style={{ color: "red" }}>*</span></span>}
            variant="outlined"
            {...register("role", { required: "Role is required" })}
            error={!!errors.role}
            helperText={errors.role?.message}
          >
            <MenuItem value="Full-Time">Full Time</MenuItem>
            <MenuItem value="Part-Time">Part Time</MenuItem>
            <MenuItem value="Seasonal">Seasonal</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
          </TextField>
          <TextField
            fullWidth
            margin="normal"
            id="requirements"
            name="requirements"
            label={<span>Requirements (comma-separated) <span style={{ color: "red" }}>*</span></span>}
            variant="outlined"
            {...register("requirements", { required: "Requirements are required" })}
            error={!!errors.requirements}
            helperText={errors.requirements?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            id="salary"
            name="salary"
            label={<span>Salary <span style={{ color: "red" }}>*</span></span>}
            variant="outlined"
            {...register("salary", { 
              required: "Salary is required", 
              validate: value => !isNaN(value) && Number(value) > 0 || "A positive salary is required" 
            })}
            error={!!errors.salary}
            helperText={errors.salary?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            id="street"
            name="street"
            label={<span>Street <span style={{ color: "red" }}>*</span></span>}
            variant="outlined"
            {...register("street", { required: "Street is required" })}
            error={!!errors.street}
            helperText={errors.street?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            id="city"
            name="city"
            label={<span>City <span style={{ color: "red" }}>*</span></span>}
            variant="outlined"
            {...register("city", { required: "City is required" })}
            error={!!errors.city}
            helperText={errors.city?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            id="province"
            name="province"
            label={<span>Province <span style={{ color: "red" }}>*</span></span>}
            variant="outlined"
            {...register("province", { required: "Province is required" })}
            error={!!errors.province}
            helperText={errors.province?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            id="country"
            name="country"
            label={<span>Country <span style={{ color: "red" }}>*</span></span>}
            variant="outlined"
            {...register("country", { required: "Country is required" })}
            error={!!errors.country}
            helperText={errors.country?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            id="postalCode"
            name="postalCode"
            label={<span>Postal Code <span style={{ color: "red" }}>*</span></span>}
            variant="outlined"
            {...register("postalCode", { required: "Postal Code is required" })}
            error={!!errors.postalCode}
            helperText={errors.postalCode?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            id="expiry_date"
            name="expiry_date"
            label={<span>Expiry Date <span style={{ color: "red" }}>*</span></span>}
            type="date"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            {...register("expiry_date", { 
              required: "Expiry date is required",
              validate: value => new Date(value) > new Date() || "Expiry date must be in the future"
            })}
            error={!!errors.expiry_date}
            helperText={errors.expiry_date?.message}
          />
          <div className="mt-5" style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: primaryFontColor,
                color: primaryColor,
                width: "250px",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid",
              }}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: primaryColor,
                color: primaryFontColor,
                width: "250px",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid",
              }}
            >
              Update
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateJobModal;
