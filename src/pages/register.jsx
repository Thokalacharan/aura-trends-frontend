import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      await API.post("/users/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert("Registration Successful");

      navigate("/");

    } catch (error) {

      alert("Signup Failed");
      console.log(error);

    }
  };

  return (
    <div className="auth-page">

      <div className="left-side">

        <div className="brand">

          <h1>TaskFlow</h1>

          <p>
            Organize projects, manage teams, and boost productivity.
          </p>

        </div>

      </div>

      <div className="right-side">

        <form className="auth-card" onSubmit={handleSubmit}>

          <h2>Create Account</h2>

          <p className="subtitle">
            Start your professional journey today.
          </p>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Create password"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={handleChange}
            required
          />

          <button type="submit">
            Create Account
          </button>

          <p className="bottom-text">
            Already have an account?
            <Link to="/"> Login</Link>
          </p>

        </form>

      </div>

    </div>
  );
}

export default Register;