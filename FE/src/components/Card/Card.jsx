import React from "react";
import "./Card.scss";
import { useState } from "react";
import UpdateRealEstate from "../UpdateRealEstate/UpdateRealEstate";
import { Link } from "react-router-dom";

function Card({ item, key, isUpdate }) {
  const [openUpdate, setOpenUpdate] = useState(false);
  const activeUpdateForm = () => {
    if (isUpdate) {
      setOpenUpdate(true);
    }
  };
  const closeUpdateForm = () => {
    isUpdate = !isUpdate;
    setOpenUpdate(false);
    console.log(openUpdate);
  };

  return (
    <div className="card" onClick={activeUpdateForm}>
      <Link to={`/${item.id}`} className="imgContainer">
        <img
          src={`https://localhost:7215/Resources/${item.imageurl[0]}`}
          alt=""
        />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.name}</Link>
        </h2>
        <p>{item.id}</p>
        {/* <p className="isUpdateStatus">Update Mode: {isUpdate ? "ON" : "OFF"}</p> */}
        <p className="address">
          {" "}
          <img src="./pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">
          {item.prices[item.prices.length - 1].priceValue}$
        </p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <span>Diện tích: {item.area}</span>
              {item.design.map((design) => (
                <span>{design}</span>
              ))}
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="./save.png" alt="" />
            </div>
            <div className="icon">
              <img src="./chat.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      {openUpdate && (
        // <div className="overlay">
        <UpdateRealEstate
          className={openUpdate && isUpdate ? "active" : "non-active"}
          onClose={closeUpdateForm}
          item={item}
        />
        // </div>
      )}
    </div>
  );
}

export default Card;
