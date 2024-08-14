// profile.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/userprofile/getUserProfile`, {
      headers: { "x-auth-token": token },
    });
    console.log("getUserProfile Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const createUserProfile = async (formDataWithImage, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/userprofile/createUserProfile`,
      formDataWithImage,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token,
        },
      }
    );
    console.log("createUserProfile Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (id, formDataWithImage, token) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/userprofile/updateprofile/${id}`,
      formDataWithImage,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token,
        },
      }
    );
    // console.log("updateUserProfile Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const getCompanyProfile = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/profile/getcompanyprofile`, {
      headers: { "x-auth-token": token },
    });
    // console.log('getCompanyProfile Response:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching company profile:", error);
    throw error;
  }
};

export const createCompanyProfile = async (formDataWithImage, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/profile/createcompanyprofile`,
      formDataWithImage,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token,
        },
      }
    );
    console.log("createCompanyProfile Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating company profile:", error);
    throw error;
  }
};

export const updateCompanyProfile = async (id, formDataWithImage, token) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/profile/updatecompanyprofile/${id}`,
      formDataWithImage,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token,
        },
      }
    );
    console.log("updateCompanyProfile Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating company profile:", error);
    throw error;
  }
};

// New function to create job application
export const createJobApplication = async (formDataWithFiles, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/jobapplications/createjobapplication`,
      formDataWithFiles,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token,
        },
      }
    );
    console.log("createJobApplication Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating job application:", error);
    throw error;
  }
};

// function to fetch AdminDashboard
export const getAdminDashboard = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/getAdminDashboard`, {
      headers: { "x-auth-token": token }
    });
    console.log('getAdminDashboard Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching AdminDashboard:', error);
    throw error;
  }
};
