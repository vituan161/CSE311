import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./singleCompany.scss";
function SingleCompany() {
  const { id } = useParams();
  console.log(id);
  const [company, setCompany] = useState([]);
  const getCompany = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7215/api/Companies/" + id
      );
      console.log(response.data);
      setCompany(response.data);
    } catch (error) {
      console.error("Get company failed:", error);
    }
  };
  useEffect(() => {
    getCompany();
  }, []);

  return (
    <div className="company-single">
      <h1>{company.name}</h1>
      <p>{company.mainField}</p>
      <p>{company.address}</p>
      <p>{company.phone}</p>
      <p>{company.description}</p>
    </div>
  );
}

export default SingleCompany;
