import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes"; // Correct import for your routes
import useAuth from "./useAuth";

const AuthWrapper = ({ children }) => {
  useAuth();
  return children;
};

const App = () => {
  return (
    <div className="App">
      <Router>
        <AuthWrapper>
          <AppRoutes />
        </AuthWrapper>
      </Router>
    </div>
  );
};

export default App;
