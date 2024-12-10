import React, { useState } from "react";
import axios from "axios";

function AddUser() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // To display success/error messages
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    ContactNo: "",
    Class: "",
    Section: "",
    faculty: false, // Determines if the user is a faculty member or student
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Reset messages

    try {
      // Send POST request with Axios
      const response = await axios.post("http://13.233.14.66:3002/add-user", formData);

      // On success
      setMessage("User added successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      // Handle errors
      setMessage("Error adding user. Please try again.");
      console.error("Error:", error.response || error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="adminLogin">
      <div className="adminLogin_inner">
        <div className="loginTxt">
            <h3>Welcome!</h3>
            <p>Please Add New User</p>
        </div>
        <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="inputWrap">
           
            <input
            type="text"
            id="username"
            name="username"
            className="inputField"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            required
            />
        </div>

        {/* Email */}
        <div className="inputWrap">
            
            <input
            type="email"
            id="email"
            name="email"
            className="inputField"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
            />
        </div>

        {/* Contact Number */}
        <div className="inputWrap">
           
            <input
            type="text"
            id="ContactNo"
            name="ContactNo"
            className="inputField"
            placeholder="Enter contact number"
            value={formData.ContactNo}
            onChange={handleChange}
            required
            />
        </div>

        {/* Class */}
        <div className="inputWrap">
          
            <input
            type="number"
            id="Class"
            name="Class"
            className="inputField"
            placeholder="Enter class (e.g., 6)"
            value={formData.Class}
            onChange={handleChange}
            required
            />
        </div>

        {/* Section */}
        <div className="inputWrap">
          
            <input
            type="text"
            id="Section"
            name="Section"
            className="inputField"
            placeholder="Enter section (e.g., A)"
            value={formData.Section}
            onChange={handleChange}
            required
            />
        </div>

        {/* Faculty Checkbox */}
        <div className="inputWrap checkWrap">
            <label className="inputLabel">
            <input
                type="checkbox"
                id="faculty"
                name="faculty"
                className="inputField"
                checked={formData.faculty}
                onChange={handleChange}
            />
            Faculty (Check if user is a Faculty Member)
            </label>
        </div>

        {/* Submit Button */}
        <div className="inputWrap">
            <button type="submit" className="submitButton commonBtn">
            Add User
            </button>
        </div>
        </form>
      </div>
   
    </div>
  );
}

export default AddUser;
