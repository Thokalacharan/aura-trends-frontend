import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";

function Login() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await API.post(
        "/users/login",
        formData
      );

      console.log(res.data);

      const token = res.data.data.token;

      const user = res.data.data.user;

      localStorage.setItem("token", token);

      localStorage.setItem(
        "role",
        user.role
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
        "Invalid Credentials"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="left-side">

        <div className="brand">

          <h1>TaskFlow</h1>

          <p>
            Professional task management platform
            for modern teams.
          </p>

        </div>

      </div>

      <div className="right-side">

        <form
          className="auth-card"
          onSubmit={handleSubmit}
        >

          <h2>Welcome Back</h2>

          <p className="subtitle">
            Login to continue managing your workflow.
          </p>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">

            {loading
              ? "Loading..."
              : "Login"}

          </button>

          <p className="bottom-text">

            Don't have an account?

            <Link to="/register">
              Signup
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;