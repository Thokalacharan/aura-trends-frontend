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

  const [users, setUsers] = useState([]);

  const [tasks, setTasks] = useState([]);

  const role = localStorage.getItem("role");

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "low",
  });

  useEffect(() => {
    fetchUser();
    fetchUsers();
    fetchTasks();
  }, []);

  // FETCH USER
  const fetchUser = async () => {
    try {

      const res = await API.get("/users/me");

      setUser(res.data.data || res.data);

    } catch (error) {
      console.log(error);
    }
  };

  // FETCH USERS
  const fetchUsers = async () => {
    try {

      const res = await API.get("/users");

      const usersData =
        res.data?.data?.users ||
        res.data?.users ||
        res.data?.data ||
        [];

      setUsers(
        Array.isArray(usersData)
          ? usersData
          : []
      );

    } catch (error) {

      console.log(error);

      setUsers([]);
    }
  };

  // FETCH TASKS
  const fetchTasks = async () => {
    try {

      const res = await API.get("/tasks");

      console.log(res.data);

      const tasksData =
        res.data?.data?.tasks ||
        res.data?.tasks ||
        res.data?.data ||
        [];

      setTasks(
        Array.isArray(tasksData)
          ? tasksData
          : []
      );

    } catch (error) {

      console.log(error);

      setTasks([]);
    }
  };

  // CREATE TASK
  const createTask = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/tasks", {
        title: taskData.title,
        text: taskData.description,
        priority: taskData.priority,
        dueDate: new Date(),
      });

      console.log(res.data);

      alert("Task Created Successfully");

      setTaskData({
        title: "",
        description: "",
        priority: "low",
      });

      fetchTasks();

      setActiveSection("tasks");

    } catch (error) {

      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
        "Task Creation Failed"
      );
    }
  };

  // LOGOUT
  const logout = async () => {

    try {

      await API.post("/users/logout");

    } catch (error) {

      console.log(error);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <div className="dashboard">

      {/* SIDEBAR */}

      <div className="sidebar">

        <h2>Task Manager</h2>

        <ul>

          <li
            className={
              activeSection === "dashboard"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveSection("dashboard")
            }
          >
            <FaTachometerAlt />
            Dashboard
          </li>

          <li
            className={
              activeSection === "tasks"
                ? "active"
                : ""
            }
            onClick={() => {
              fetchTasks();
              setActiveSection("tasks");
            }}
          >
            <FaTasks />
            Manage Tasks
          </li>

          {role === "admin" && (
            <li
              className={
                activeSection === "create"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveSection("create")
              }
            >
              <FaPlusSquare />
              Create Task
            </li>
          )}

          <li
            className={
              activeSection === "team"
                ? "active"
                : ""
            }
            onClick={() => {
              fetchUsers();
              setActiveSection("team");
            }}
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
                <h3>{tasks.length}</h3>
                <p>Total Tasks</p>
              </div>

              <div className="card">
                <h3>{users.length}</h3>
                <p>Total Users</p>
              </div>

              <div className="card">
                <h3>{user?.name || "User"}</h3>
                <p>Logged In User</p>
              </div>

            </div>

            <div className="task-section">

              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <div
                    key={index}
                    className="task-card"
                  >
                    <h3>{task.title}</h3>

                    <p>
                      {task.text ||
                        task.description}
                    </p>

                    <span>
                      {task.priority}
                    </span>
                  </div>
                ))
              ) : (
                <p>No Tasks Available</p>
              )}

            </div>
          </>
        )}

        {/* MANAGE TASKS */}

        {activeSection === "tasks" && (
          <div>

            <h1>Manage Tasks</h1>

            <div className="task-section">

              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <div
                    key={index}
                    className="task-card"
                  >
                    <h3>{task.title}</h3>

                    <p>
                      {task.text ||
                        task.description}
                    </p>

                    <span>
                      {task.priority}
                    </span>
                  </div>
                ))
              ) : (
                <p>No Tasks Available</p>
              )}

            </div>

          </div>
        )}

        {/* CREATE TASK */}

        {activeSection === "create" && (
          <div className="create-task">

            <h1>Create Task</h1>

            <form
              className="task-form"
              onSubmit={createTask}
            >

              <input
                type="text"
                placeholder="Task Title"
                value={taskData.title}
                onChange={(e) =>
                  setTaskData({
                    ...taskData,
                    title: e.target.value,
                  })
                }
                required
              />

              <textarea
                placeholder="Task Description"
                value={taskData.description}
                onChange={(e) =>
                  setTaskData({
                    ...taskData,
                    description: e.target.value,
                  })
                }
                required
              />

              <select
                value={taskData.priority}
                onChange={(e) =>
                  setTaskData({
                    ...taskData,
                    priority: e.target.value,
                  })
                }
              >
                <option value="low">
                  Low
                </option>

                <option value="medium">
                  Medium
                </option>

                <option value="high">
                  High
                </option>

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

              {users.length > 0 ? (
                users.map((member, index) => (
                  <div
                    key={index}
                    className="member-card"
                  >
                    <h3>{member.name}</h3>

                    <p>{member.email}</p>
                  </div>
                ))
              ) : (
                <p>No Users Available</p>
              )}

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default Dashboard;