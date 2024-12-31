import React, { useEffect, useState } from "react";
import "./otherProfile.scss";
import List from "../../components/List/List";
import { useSelector } from "react-redux";
import MyList from "../../components/MyList/MyList";
import axios from "axios";
import { useNavigate, useLocation, json } from "react-router-dom";
import { use } from "react";

function OtherProfile() {
  const location = useLocation();
  const id = location.state || {};
  const token = useSelector((state) => state.token);
  const [profile, setProfile] = useState({});
  const [account, setAccount] = useState({});
  const [realEstates, setRealEstates] = useState([]);
  const followId = useSelector((state) => state.account.followid);
  const navigateTo = useNavigate();
  const getProfile = async () => {
    try {
      const response = await axios.get("https://localhost:7215/api/Profiles/"+id);
      await setProfile(response.data);
      setAccount(response.data.appUser);
      getRealEstates(response.data.appUser.id);
    } catch (error) {
      console.error("Get company failed:", error);
    }
  };

  const putFollow = async (followid) => {
    try {
      const response = await axios.put(
        `https://localhost:7215/api/Follows/${followid}`,
        null,
        {
          params: { Profileid: id },
          headers: {
            Authorization: `Bearer ${token.value}`,
            'Content-Type': 'application/json',
          },
        }
      );
      window.alert(response.data);
    } catch (error) {
      console.error("Get failed:", error);
      window.alert("Follow failed");
    }
  };

  const getRealEstates = async (id) => {
    try {
      const response = await axios.get(
        `https://localhost:7215/api/Sellers/UserId/${id}`
      );
      setRealEstates(response.data.realEstates);
    } catch (error) {
      console.error("Get failed:", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="otherprofilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button onClick={() => putFollow(followId)}>Follow</button>
          </div>
          <div className={`info ${account.role === 0 ? "admin" : "user"}`}>
            <div className="infowrap">
              <span>
                Avatar:
                {profile.imageURL && profile.imageURL[0] ? (
                  <img
                    src={`https://localhost:7215/Resources/${profile.imageURL[0]}`}
                    alt=""
                  />
                ) : (
                  "N/A"
                )}
              </span>
              <span>
                User Name:{" "}
                <b>
                  {profile.lastName && profile.firstName
                    ? `${profile.lastName} ${profile.firstName}`
                    : "N/A"}
                </b>
              </span>
              <span>
                Email: <b>{account.email}</b>
              </span>
            </div>
            <div className="description">
              <h3>Description:</h3>
              <span>{profile.description}</span>
            </div>
          </div>
          <div className="title">
            <h1>List</h1>
          </div>
          <List realEstates={realEstates} />
        </div>
      </div>
      <div className="chat">
        <div className="wrapper"></div>
      </div>
    </div>
  );
}

export default OtherProfile;
