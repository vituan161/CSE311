import React, { useEffect, useState } from "react";
import "./adminPage.scss";
import { useSelector } from "react-redux";
import axios from "axios";

function AdminPage() {
  const [users, setUsers] = useState([]); // State to hold user data
  const [showModal, setShowModal] = useState(false); // State to toggle modal visibility
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" }); // Sorting configuration
  const token = useSelector((state) => state.token);

  // Fetch all users
  const getAllUsers = async () => {
    try {
      const response = await axios.get("https://localhost:7215/api/User", {
        headers: {
          Authorization: `Bearer ${token.value}`,
          Accept: "*/*",
        },
      });
      setUsers(response.data); // Save the fetched data to state
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Sorting function
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setUsers(sortedUsers);
  };

  return (
    <div className="adminPage">
      <h1>Admin Page - Welcome, Admin!</h1>

      {/* Button to Open Modal */}
      <button onClick={() => setShowModal(true)} className="toggle-modal">
        Open Modal
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Modal Title</h2>
            <p>This is an empty modal.</p>
            <button onClick={() => setShowModal(false)} className="close-modal">
              Close
            </button>
          </div>
        </div>
      )}

      {/* User Table */}
      <div className="userList">
        {users.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>
                  <button onClick={() => requestSort("id")}>ID</button>
                </th>
                <th>
                  <button onClick={() => requestSort("userName")}>
                    Username
                  </button>
                </th>
                <th>
                  <button onClick={() => requestSort("email")}>Email</button>
                </th>
                <th>
                  <button onClick={() => requestSort("role")}>Role</button>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.role === 0 ? "Admin" : "User"}</td>
                  <td>
                    <button className="action-button edit-button">Edit</button>
                    <button className="action-button delete-button">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading users...</p>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
