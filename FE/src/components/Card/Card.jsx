import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";

function Card({ item }) {
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imgContainer">
        <img src={item.imageurl[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.name}</Link>
        </h2>
        <p className="address">
          {" "}
          <img src="./pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">{item.prices[0].priceValue}$</p>
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
    </div>
  );
}

export default Card;
