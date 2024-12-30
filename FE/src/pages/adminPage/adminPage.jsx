import React, { useEffect, useState } from "react";
import "./adminPage.scss";
import { useSelector } from "react-redux";
import axios from "axios";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [showUserTable, setShowUserTable] = useState(true);
  const [showCompanyTable, setShowCompanyTable] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
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
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch all companies
  const getAllCompanies = async () => {
    try {
      const response = await axios.get("https://localhost:7215/api/Companies", {
        headers: {
          Accept: "*/*",
        },
      });
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
    getAllCompanies();
  }, []);

  // Delete user
  const deleteUser = async (userId) => {
    const sure = confirm(
      `Are you sure you want to delete the user with ID: ${userId} ?`
    );
    if (sure)
      try {
        await axios.delete(`https://localhost:7215/api/User/${userId}`, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
        setUsers(users.filter((user) => user.id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
  };

  // Delete company
  const deleteCompany = async (companyId) => {
    const sure = confirm(
      `Are you sure you want to delete the user with ID: ${companyId} ?`
    );
    if (sure)
      try {
        await axios.delete(
          `https://localhost:7215/api/Companies/${companyId}`,
          {
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
          }
        );
        setCompanies(companies.filter((company) => company.id !== companyId));
      } catch (error) {
        console.error("Error deleting company:", error);
      }
  };

  // Sorting function
  const requestSort = (key, data, setData) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
  };

  return (
    <div className="adminPage">
      <h1>Admin Page - Welcome, Admin!</h1>
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
      <div className="table-section">
        <button onClick={() => setShowUserTable(!showUserTable)}>
          {showUserTable ? "Hide Users" : "Show Users"}
        </button>
        {showUserTable && (
          <div className="userList">
            {users.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>
                      <button
                        onClick={() => requestSort("id", users, setUsers)}
                      >
                        ID
                      </button>
                    </th>
                    <th>
                      <button
                        onClick={() => requestSort("userName", users, setUsers)}
                      >
                        Username
                      </button>
                    </th>
                    <th>
                      <button
                        onClick={() => requestSort("email", users, setUsers)}
                      >
                        Email
                      </button>
                    </th>
                    <th>
                      <button
                        onClick={() => requestSort("role", users, setUsers)}
                      >
                        Role
                      </button>
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
                        <button
                          className="action-button delete-button"
                          onClick={() => deleteUser(user.id)}
                        >
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
        )}
      </div>
      <button className="add-company-btn">Add Company</button>
      {/* Company Table */}
      <div className="table-section">
        <button onClick={() => setShowCompanyTable(!showCompanyTable)}>
          {showCompanyTable ? "Hide Companies" : "Show Companies"}
        </button>
        {showCompanyTable && (
          <div className="companyList">
            {companies.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>
                      <button
                        onClick={() =>
                          requestSort("id", companies, setCompanies)
                        }
                      >
                        ID
                      </button>
                    </th>
                    <th>
                      <button
                        onClick={() =>
                          requestSort("name", companies, setCompanies)
                        }
                      >
                        Name
                      </button>
                    </th>
                    <th>
                      <button
                        onClick={() =>
                          requestSort("location", companies, setCompanies)
                        }
                      >
                        Location
                      </button>
                    </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map((company) => (
                    <tr key={company.id}>
                      <td>{company.id}</td>
                      <td>{company.name}</td>
                      <td>{company.address}</td>
                      <td>
                        <button
                          className="action-button delete-button"
                          onClick={() => deleteCompany(company.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Loading companies...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
