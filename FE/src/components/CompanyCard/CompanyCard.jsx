import React from "react";
import "./CompanyCard.scss";
import { Link } from "react-router-dom";
function CompanyCard({ item }) {
  return (
    <div className="company-item">
      <div className="img-container">
        <Link to={`/company/${item.id}`}>
          <img
            src="https://file4.batdongsan.com.vn/resize/200x200/2024/11/13/20241113174853-2eda.jpg"
            alt=""
          />
        </Link>
      </div>

      <div className="content">
        <Link to={`/company/${item.id}`}>
          <h2>{item.name}</h2>
        </Link>
        <p className="address">Address: {item.address}</p>
        <p className="phone"> Phone: {item.phone}</p>
      </div>
    </div>
  );
}

export default CompanyCard;
