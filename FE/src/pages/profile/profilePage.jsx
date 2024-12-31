import React, { useEffect, useState } from "react";
import "./profilePage.scss";
import List from "../../components/List/List";
import UpdateProfileForm from "../../components/UpdateProfileForm/UpdateProfileForm";
import NewPostForm from "../../components/NewPostForm/NewPostForm";
import { useSelector } from "react-redux";
import UpdateToggle from "../../components/UpdateToggle/UpdateToggle";
import MyList from "../../components/MyList/MyList";
import UpdateRealEstate from "../../components/UpdateRealEstate/UpdateRealEstate";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { use } from "react";
function ProfilePage() {
  const [openForm, setOpenForm] = useState(false);
  const token = useSelector((state) => state.token);
  const profile = useSelector((state) => state.profile);
  const account = useSelector((state) => state.account);
  const [follow, setFollowing] = useState(account.follow);
  const followid = useSelector((state) => state.account.followid);
  const navigateTo = useNavigate();
  console.log(follow);
  const getFollow = async (id) => {
    try {
      const response = await axios.get(
        `https://localhost:7215/api/Follows/${id}`
      );
      setFollowing(response.data);
    } catch (error) {
      console.error("Get follow failed:", error);
    }
  };

  useEffect(() => {
    getFollow(followid);
  }, [followid]);
  const activeForm = () => {
    setOpenForm(true);
  };
  const onClose = () => {
    setOpenForm(false);
  };
  const [newPost, setNewPost] = useState(false);
  const activeNewPost = () => {
    setNewPost(true);
  };
  const closeNewPost = () => {
    setNewPost(false);
  };

  const goToAdminPage = () => {
    navigateTo("/admin");
  };

  const goToOtherProfile = (id) => {
    navigateTo("/otherProfile", { state: id });
  };
  const [buttonText, setButtonText] = useState("Admin");

  const handleMouseEnter = () => setButtonText("Go to Admin Page");
  const handleMouseLeave = () => setButtonText("Admin");

  return (
    <div className="profilePage">
      <div className={`overlay ${openForm ? "active" : "non-active"}`}>
        <UpdateProfileForm
          className={openForm ? "active" : "non-active"}
          onClose={onClose}
        />
      </div>
      <div className={`overlay ${newPost ? "active" : "non-active"}`}>
        <NewPostForm
          className={newPost ? "active" : "non-active"}
          onClose={closeNewPost}
        />
      </div>

      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button onClick={activeForm}>Update Profile</button>
          </div>
          <div className={`info ${account.role === 0 ? "admin" : "user"}`}>
            <div className="infowrap">
              <span>
                Avatar:
                <img
                  src={`https://localhost:7215/Resources/${profile.ImageURL[0]}`}
                  alt=""
                />
              </span>
              <span>
                User Name:{" "}
                <b>
                  {profile.LastName && profile.FirstName
                    ? `${profile.LastName} ${profile.FirstName}`
                    : "N/A"}
                </b>
              </span>
              <span>
                Email: <b>{account.email}</b>
              </span>
              {account.role === 0 && (
                <button
                  onClick={goToAdminPage}
                  className="admin-button golden-btn"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {buttonText}
                </button>
              )}
            </div>
            <div className="description">
              <h3>Description:</h3>
              <span>{profile.Description}</span>
            </div>
          </div>
          <div className="title">
            <h1>My List</h1>

            <button onClick={activeNewPost}>Create New Post</button>
          </div>
          <MyList />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <div className="userwrapper">
            {follow != undefined ? (
              follow.following.map((element, index) => (
                // console.log(element);
                <div
                  className="user"
                  onClick={() => goToOtherProfile(element.id)}
                >
                  {element.imageURL && element.imageURL[0] ? (
                    <img
                      src={`https://localhost:7215/Resources/${element.imageURL[0]}`}
                      alt=""
                    />
                  ) : (
                    "N/A"
                  )}
                  <span>User Name: {element.lastName + " " + element.firstName}</span>
                  <span>PhoneNumber: {element.phoneNumber}</span>
                  <spand>{element.description}</spand>
                </div>
              ))
            ) : (
              <div>Empty</div>
            )}
          </div>
        </div>
      </div>
      <div className="chat">
        <div className="wrapper"></div>
      </div>
    </div>
  );
}

export default ProfilePage;
