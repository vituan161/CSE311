import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./UpdateProfileForm.scss";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";
function UpdateProfileForm({ className, onClose }) {
  const [activeSection, setActiveSection] = useState("account");
  const profile = useSelector((state) => state.profile);
  const account = useSelector((state) => state.account);
  const [firstName, setFirstName] = useState(profile.FirstName);
  const [lastName, setLastName] = useState(profile.LastName);
  const [ImageURL, setImageURL] = useState(profile.ImageURL[0]);
  const [DoB, setDoB] = useState(profile.DoB);
  const [IdentificationNumber, setIdentificationNumber] = useState(
    profile.IdentiticationNumber
  );
  const [address, setAddress] = useState(profile.Address);
  const [email, setEmail] = useState(account.email);
  const [phoneNumber, setPhoneNumber] = useState(profile.Phone);
  const [bio, setBio] = useState(profile.Description);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {
      FirstName: firstName,
      LastName: lastName,
      ImageURL: [ImageURL],
      DoB: DoB,
      IdentiticationNumber: IdentificationNumber,
      Address: address,
      Phone: phoneNumber,
      Description: bio,
    };
    console.log(data);
  };

  const resetlocalValue = () => {
    setFirstName(profile.FirstName);
    setLastName(profile.LastName);
    setImageURL(profile.ImageURL);
    setDoB(profile.DoB);
    setIdentificationNumber(profile.IdentiticationNumber);
    setAddress(profile.Address);
    setEmail(account.email);
    setPhoneNumber(profile.Phone);
    setBio(profile.Description);
  };

  const handleCancel = () => {
    onClose();
    resetlocalValue();
  };

  return (
    <div className={`wraparound ${className}`}>
      <div className={`update-profile-form ${className}`}>
        {/* sidebar content here */}
        <div className="sidebar">
          <div className="info">
            <img src={profile.ImageURL[0]} alt="" />
            <h3>{profile.LastName + " " + profile.FirstName}</h3>
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
              <h1>Profile Settings</h1>
              <form>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="Enter your first name"
                      defaultValue={firstName}
                      onInput={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Enter your last name"
                      defaultValue={lastName}
                      onInput={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="Dob">Date of Birth</label>
                    <input
                      type="text"
                      id="Dob"
                      placeholder="Enter your date of birth"
                      defaultValue={DoB}
                      onInput={(e) => setDoB(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="IdentificationNumber">
                      Identification Number
                    </label>
                    <input
                      type="text"
                      id="IdentificationNumber"
                      disabled
                      placeholder="Enter your Identification Number"
                      defaultValue={IdentificationNumber}
                      onInput={(e) => setIdentificationNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="Address">Address</label>
                    <input
                      type="text"
                      id="Address"
                      placeholder="Enter your address"
                      defaultValue={address}
                      onInput={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="ImageURL">Avatar ImageURL</label>
                    <div style={{flex:1, display: "flex", flexDirection: "collumn" }}>
                      <img
                        src={ImageURL}
                        alt=""
                        style={{ width: "70px", height: "70px" }}
                      />
                      <input
                        type="text"
                        id="ImageURL"
                        placeholder="Enter your image link"
                        defaultValue={ImageURL}
                        onInput={(e) => setImageURL(e.target.value)}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      disabled
                      placeholder="Enter your email"
                      defaultValue={email}
                      onInput={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      placeholder="Enter your phone number"
                      defaultValue={phoneNumber}
                      onInput={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                      name="bio"
                      id="bio"
                      cols={50}
                      rows={6}
                      onInput={(e) => setBio(e.target.value)}
                    >
                      {bio}
                    </textarea>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="update-btn"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleCancel}
                  >
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
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdateProfileForm;
