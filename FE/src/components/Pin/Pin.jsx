import React from "react";
import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { Icon } from "leaflet";
import "./Pin.scss";

function Pin({ item }) {
  const redIcon = new Icon({
    iconUrl: "/pin-red.png", // Default Leaflet red icon
    iconSize: [23, 36], // Size of the icon
    iconAnchor: [23, 36], // Anchor point of the icon
    popupAnchor: [-12, -30], // Popup position
  });
  return (
    <Marker position={[item.location[0], item.location[1]]} icon={redIcon}>
      <Popup>
        <div className="popupContainer">
          <img src={item.imageurl[0]} alt="" />
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.name}</Link>
            <span>Area: {item.area}</span>
            <b>{item.prices[0].priceValue}$</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
