import React from "react";
import { Route, Routes } from "react-router-dom";
import CandidateHomePage from "./container/CandidateHomePage/CandidateHomePage";
import LoginContainer from "./container/LoginPage/LoginPage";
import ForgotPasswordContainer from "./container/LoginPage/ForgotPasswordPage";
import RegisterContainer from "./container/SignupPage/RegisterPage";
import CandidateProfileContainer from "./container/CandidateProfilePage/CandidateProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import EmployerDashboard from "./container/EmployerHomePage/EmployerDashboard";
import EmployerProfile from "./container/EmployerHomePage/EmployerProfile";
import CandidateApplications from "./container/ViewApplicationEmployer/CandidateApplications";
import ApplicantDetails from "./container/ViewApplicationEmployer/ApplicantDetails";
import ScheduleInterview from "./container/ViewApplicationEmployer/ScheduleInterview";
import MyApplications from "./container/ViewApplicationCandidate/MyApplications";
import InterviewDate from "./container/ViewApplicationCandidate/InterviewDate";
import FindJobContainer from "./container/FindJobPage/FindJob";
import SearchResults from "./components/Common/SearchResults";
import JobDetails from "./container/FindJobPage/JobDetails";
import ApplyPage from "./container/FindJobPage/ApplyPage";
import AdminDashboard from "./container/AdminDashboard/AdminDashboard";
import AdminCandidatePage from "./container/Admin-Candidate/AdminCandidatePage";
import CandidateProfile from "./container/Admin-Candidate/CandidateProfile";
import AdminJobsPage from "./container/Admin-Jobs/AdminJobsPage";
import AdminJobDetails from "./container/Admin-Jobs/AdminJobDetails";
import AdminEmployerPage from "./container/Admin-Employer/AdminEmployerPage";
import AdminEmployerProfile from "./container/Admin-Employer/AdminEmployerProfile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/candidate_home" element={<CandidateHomePage />} />
      <Route path="/home" element={<EmployerDashboard />} />
      <Route path="/" element={<LoginContainer />} />
      <Route path="/register" element={<RegisterContainer />} />
      <Route path="/forgot_password" element={<ForgotPasswordContainer />} />
      <Route
        path="/candidate_profile"
        element={<CandidateProfileContainer />}
      />
      <Route
        path="/candidate_applications"
        element={<CandidateApplications />}
      />
      <Route path="/applicant-details/:id" element={<ApplicantDetails />} />
      <Route path="/schedule-interview/:id" element={<ScheduleInterview />} />
      <Route path="/my_applications" element={<MyApplications />} />
      <Route path="/interview_date/:id" element={<InterviewDate />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <CandidateHomePage />
          </ProtectedRoute>
        }
      />
      <Route path="/employer_profile" element={<EmployerProfile />} />
      <Route path="/find-job" element={<FindJobContainer />} />
      <Route path="/search-jobs" element={<SearchResults />} />
      <Route path="/apply" element={<ApplyPage />} />
      <Route path="/job-details" element={<JobDetails />} />

      <Route
        path="/admin_dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin_candidates"
        element={
          <ProtectedRoute>
            <AdminCandidatePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/candidate-details/:userId"
        element={
          <ProtectedRoute>
            <CandidateProfile />
          </ProtectedRoute>
        }
      />
      <Route path="/admin_jobs" element={<AdminJobsPage />} />
      <Route path="/admin_job_details" element={<AdminJobDetails />} />

      <Route
        path="/admin_employers"
        element={
          <ProtectedRoute>
            <AdminEmployerPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer-profile/:empID"
        element={<AdminEmployerProfile />}
      />
    </Routes>
  );
};

export default AppRoutes;
