import React from "react";
import "./Company.scss";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import CompanyCard from "../../components/CompanyCard/CompanyCard";
function Company() {
  const [company, setCompany] = useState([]);
  const getCompany = async () => {
    try {
      const response = await axios.get("https://localhost:7215/api/Companies");
      //console.log(response.data);
      setCompany(response.data);
    } catch (error) {
      console.error("Get company failed:", error);
    }
  };
  useEffect(() => {
    getCompany();
  }, []);

  return (
    <div className="company">
      <div className="left">
        <div className="wrapper">
          <h1>Company</h1>
          <div className="company-container">
            {company.map((item) => (
              <CompanyCard item={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
      <div className="right">
        <img src="./company-img.svg" alt="" />
      </div>
    </div>
  );
}

export default Company;
