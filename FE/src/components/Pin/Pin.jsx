import React from "react";
import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { Icon } from "leaflet";
import "./Pin.scss";

function Pin({ item }) {
  const redIcon = new Icon({
    iconUrl: "/pin-red.png", // Default Leaflet red icon
    iconSize: [28, 41], // Size of the icon
    iconAnchor: [28, 41], // Anchor point of the icon
    popupAnchor: [-15, -30], // Popup position
  });
  return (
    <Marker position={[item.latitude, item.longitude]} icon={redIcon}>
      <Popup>
        <div className="popupContainer">
          <img src={item.images} alt="" />
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>Bedroom: {item.bedroom}</span>
            <b>{item.price}$</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
