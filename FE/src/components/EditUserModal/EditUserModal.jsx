import React, { useState,useEffect } from "react";
import "./EditUserModal.scss";
import axios from "axios";

const EditUserModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState(user);
  const [company, setCompany] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Call the save function from parent
  };

  const getAllCompanies = async () => {
    try {
      const response = await axios.get("https://localhost:7215/api/Companies", {
        headers: {
          Accept: "*/*",
        },
      });
      setCompany(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const putSeller = async (id) => {
    try {
      const response = await axios.put(
        `https://localhost:7215/api/Sellers/${id}`,
        null,
        {
          params: { CompanyId: selectedCompany },
          headers: {
            Authorization: `Bearer ${token.value}`,
            "Content-Type": "application/json",
          },
        }
      );
      window.alert(response.data);
    } catch (error) {
      console.error("Get failed:", error);
      window.alert("Follow failed");
    }
  };

  useEffect(() => {
    getAllCompanies();
  }, []);

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Company</label>
            <select onChange={(event) => console.log(event.target.value)}>
              <option value="">None</option>
              {company.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-actions">
            <button type="submit" className="save-btn">
              Save
            </button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
