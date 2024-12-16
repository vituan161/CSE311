import React, { useState } from "react";
import "./UpdateProfileForm.scss";
function UpdateProfileForm({ className, onClose }) {
  const [activeSection, setActiveSection] = useState("account");

  return (
    <div className={`update-profile-form ${className}`}>
      {/* sidebar content here */}
      <div className="sidebar">
        <div className="info">
          <img
            src="https://scontent.fsgn15-1.fna.fbcdn.net/v/t1.6435-1/100623009_614214899302021_9077219818804871168_n.jpg?stp=dst-jpg_s200x200&_nc_cat=111&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=6n_EFNYJCnYQ7kNvgERHhH9&_nc_zt=24&_nc_ht=scontent.fsgn15-1.fna&_nc_gid=AnK8d6fR0yB5NA2tJ30KD6A&oh=00_AYAUuNudJ6S8h5NxR0oOAqujAF4x2qnCZl2-aZiFLgLPBA&oe=676AA3C4"
            alt=""
          />
          <h3>Thuan Huynh</h3>
        </div>

        <ul>
          <li
            className={activeSection === "account" ? "active" : ""}
            onClick={() => setActiveSection("account")}
          >
            Account
          </li>
          <li
            className={activeSection === "password" ? "active" : ""}
            onClick={() => setActiveSection("password")}
          >
            Password
          </li>
          <li
            className={activeSection === "notification" ? "active" : ""}
            onClick={() => setActiveSection("notification")}
          >
            Notification
          </li>
        </ul>
      </div>
      {/* form content here */}
      <div className="form-content">
        {activeSection === "account" && (
          <div className="account-section">
            <h1>Account Settings</h1>
            <form>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea name="bio" id="bio" cols={50} rows={6}></textarea>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="update-btn">
                  Update
                </button>
                <button type="button" className="cancel-btn" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {activeSection === "password" && (
          <div className="password-section">
            <h2>Change Password</h2>
            <form>
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    placeholder="Enter your current password"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    placeholder="Enter your new password"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm your new password"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="update-btn">
                  Update Password
                </button>
                <button type="button" className="cancel-btn" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateProfileForm;
