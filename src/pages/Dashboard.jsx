import { useState, useEffect } from "react";
import "../styles/dashboard.css";
import API from "../services/api";

import {
  FaTachometerAlt,
  FaTasks,
  FaPlusSquare,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

function Dashboard() {

  const [activeSection, setActiveSection] = useState("dashboard");

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await API.get("/users/me");
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
  try {
    await API.post("/users/logout");
  } catch (error) {
    console.log(error);
  }

  localStorage.removeItem("token");
  window.location.href = "/";
};

  return (
    <div className="dashboard">

      {/* SIDEBAR */}

      <div className="sidebar">

        <h2>Task Manager</h2>

        <ul>

          <li
            className={activeSection === "dashboard" ? "active" : ""}
            onClick={() => setActiveSection("dashboard")}
          >
            <FaTachometerAlt />
            Dashboard
          </li>

          <li
            className={activeSection === "tasks" ? "active" : ""}
            onClick={() => setActiveSection("tasks")}
          >
            <FaTasks />
            Manage Tasks
          </li>

          <li
            className={activeSection === "create" ? "active" : ""}
            onClick={() => setActiveSection("create")}
          >
            <FaPlusSquare />
            Create Task
          </li>

          <li
            className={activeSection === "team" ? "active" : ""}
            onClick={() => setActiveSection("team")}
          >
            <FaUsers />
            Team Members
          </li>

          <li onClick={logout}>
            <FaSignOutAlt />
            Logout
          </li>

        </ul>

      </div>

      {/* MAIN CONTENT */}

      <div className="main-content">

        {/* DASHBOARD */}

        {activeSection === "dashboard" && (
          <>
            <div className="top-cards">

              <div className="card">
                <h3>18</h3>
                <p>Total Tasks</p>
              </div>

              <div className="card">
                <h3>11</h3>
                <p>Pending Tasks</p>
              </div>

              <div className="card">
                <h3>5</h3>
                <p>In Progress</p>
              </div>

              <div className="card">
                <h3>2</h3>
                <p>Completed</p>
              </div>

            </div>

            <div className="task-section">

              <div className="task-card">
                <h3>Design Homepage</h3>
                <p>Create modern responsive homepage UI.</p>
                <span className="pending">Pending</span>
              </div>

              <div className="task-card">
                <h3>API Integration</h3>
                <p>Connect frontend with backend APIs.</p>
                <span className="progress">In Progress</span>
              </div>

              <div className="task-card">
                <h3>Authentication</h3>
                <p>Implement login and signup functionality.</p>
                <span className="completed">Completed</span>
              </div>

            </div>
          </>
        )}

        {/* MANAGE TASKS */}

        {activeSection === "tasks" && (
          <div>
            <h1>Manage Tasks</h1>

            <div className="task-section">

              <div className="task-card">
                <h3>Frontend Development</h3>
                <p>Build responsive React frontend.</p>
                <span className="progress">In Progress</span>
              </div>

              <div className="task-card">
                <h3>Backend API</h3>
                <p>Create Express APIs.</p>
                <span className="pending">Pending</span>
              </div>

            </div>
          </div>
        )}

        {/* CREATE TASK */}

        {activeSection === "create" && (
          <div className="create-task">

            <h1>Create Task</h1>

            <form
  className="task-form"
  onSubmit={(e) => {
    e.preventDefault();
    alert("Task Created Successfully");
  }}
>

              <input type="text" placeholder="Task Title" />

              <textarea placeholder="Task Description"></textarea>

              <select>
                <option>Low Priority</option>
                <option>Medium Priority</option>
                <option>High Priority</option>
              </select>

              <button type="submit">
                Create Task
              </button>

            </form>

          </div>
        )}

        {/* TEAM MEMBERS */}

        {activeSection === "team" && (
          <div>

            <h1>Team Members</h1>

            <div className="team-grid">

              <div className="member-card">
                <h3>Charan</h3>
                <p>Frontend Developer</p>
              </div>

              <div className="member-card">
                <h3>Payal</h3>
                <p>Backend Developer</p>
              </div>

              <div className="member-card">
                <h3>Gokul</h3>
                <p>Project Manager</p>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default Dashboard;
