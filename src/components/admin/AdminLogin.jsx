import React, { useState } from "react";
import axios from "axios"; // Import Axios

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // To handle loading state
  const [errorMessage, setErrorMessage] = useState(""); // To handle error messages

  // Toggle password visibility
  const handleTogglePassword = () => setShowPassword(!showPassword);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show loading while the request is being processed
    setLoading(true);
    setErrorMessage(""); // Reset any previous error messages

    try {
      // Send POST request to the backend API
      const response = await axios.post("http://13.233.14.66:3002/admin-login", {
        username,
        password,
      });

      // On success
      console.log("Admin Login Success:", response.data);
      alert("Login successful!");

      // Redirect user or handle further actions on successful login
    } catch (error) {
      // On error
      setErrorMessage("Invalid credentials, please try again.");
      console.error("Login Error:", error.response || error.message);
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  return (
    <div className="adminLogin">
      <div className="adminLogin_inner">
        <div className="loginTxt">
          <h3>Welcome! Admin</h3>
          <p>Please login with your credentials</p>
        </div>
        <form className="logInForm" onSubmit={handleSubmit}>
          <div className="inputWrap">
            <input
              type="text"
              name="loginEmail"
              id="loginEmail"
              className="loginEmail"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="inputWrap">
            <div className="iconInputWrap">
              <input
                type={showPassword ? "text" : "password"}
                name="loginPassword"
                id="loginPassword"
                className="loginPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i
                className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                onClick={handleTogglePassword}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          </div>

          {/* Display error message if any */}
          {errorMessage && <p className="errorMessage">{errorMessage}</p>}

          <div className="inputWrap btnWrap">
            <button type="submit" className="commonBtn" disabled={loading}>
              {loading ? "Logging in..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
