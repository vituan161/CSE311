import React, { useState } from "react";
import "./profilePage.scss";
import List from "../../components/List/List";

import UpdateProfileForm from "../../components/UpdateProfileForm/UpdateProfileForm";
import NewPostForm from "../../components/NewPostForm/NewPostForm";
import { useSelector } from "react-redux";

function ProfilePage() {
  const [openForm, setOpenForm] = useState(false);
  const token = useSelector((state) => state.token);
  const profile = useSelector((state) => state.profile);
  const account = useSelector((state) => state.account);

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

  return (
    <div className="profilePage">
      <UpdateProfileForm
        className={openForm ? "active" : "non-active"}
        onClose={onClose}
      />
      <NewPostForm
        className={newPost ? "active" : "non-active"}
        onClose={closeNewPost}
      />

      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button onClick={activeForm}>Update Profile</button>
          </div>
          <div className="info">
            <div className="infowrap">
              <span>
                Avatar:
                <img src={profile.ImageURL[0]} alt="" />
              </span>
              <span>
                User Name: <b>{account.userName}</b>
              </span>
              <span>
                Email: <b>{account.email}</b>
              </span>
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
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chat">
        <div className="wrapper"></div>
      </div>
    </div>
  );
}

export default ProfilePage;
