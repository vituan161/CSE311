import React, { useState } from "react";
import "./profilePage.scss";
import List from "../../components/List/List";
import { listData } from "../../lib/dummydata";
import UpdateProfileForm from "../../components/UpdateProfileForm/UpdateProfileForm";
import NewPostForm from "../../components/NewPostForm/NewPostForm";
import { useSelector } from "react-redux";
import handleGetProfile from "../../lib/utilities";

function ProfilePage() {
  const [openForm, setOpenForm] = useState(false);
  const token = useSelector((state) => state.token);
  const profile = useSelector((state) => state.profile);
  
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
            <span>
              Avatar:
              <img
                src="https://scontent.fsgn15-1.fna.fbcdn.net/v/t1.6435-1/100623009_614214899302021_9077219818804871168_n.jpg?stp=dst-jpg_s200x200&_nc_cat=111&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=6n_EFNYJCnYQ7kNvgERHhH9&_nc_zt=24&_nc_ht=scontent.fsgn15-1.fna&_nc_gid=AnK8d6fR0yB5NA2tJ30KD6A&oh=00_AYAUuNudJ6S8h5NxR0oOAqujAF4x2qnCZl2-aZiFLgLPBA&oe=676AA3C4"
                alt=""
              />
            </span>
            <span>
              User Name: <b>Thuan Huynh</b>
            </span>
            <span>
              Email: <b>example@gmail.com</b>
            </span>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button onClick={activeNewPost}>Create New Post</button>
          </div>
          <List data={listData} />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List data={listData} />
        </div>
      </div>
      <div className="chat">
        <div className="wrapper"></div>
      </div>
    </div>
  );
}

export default ProfilePage;
