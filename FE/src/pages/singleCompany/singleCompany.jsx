import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./singleCompany.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faLock, faPhone } from "@fortawesome/free-solid-svg-icons";
import Slider from "../../components/Slider/Slider";

const SingleCompany = () => {
  const { id } = useParams();
  const [company, setCompany] = useState([]);
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const getCompany = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7215/api/Companies/" + id
      );
      console.log(response.data);
      setCompany(response.data);
      setImages(response.data.imageurl);
    } catch (error) {
      console.error("Get company failed:", error);
    }
  };
  useEffect(() => {
    getCompany();
    console.log(company);
  }, []);

  return (
    <div className="company-single">
      <div className="left">
        <div className="wrapper">
          <div className="imgSlider">
            {/* <img src={company.imageurl[1]} alt="" /> */}
            <Slider images={images} />
          </div>
          <div className="content">
            <h1>{company.name}</h1>
            <div className="address">
              <p>Address: {company.address}</p>
            </div>
            <h3>Contact</h3>
            <div className="contact">
              <p>
                <FontAwesomeIcon icon={faAt} />
                {company.email}
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} />
                {company.phone}
              </p>
            </div>

            <div className="description">
              <h3>Description</h3>
              <p>{company.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="right">News from {company.name}</div>
    </div>
  );
};

export default SingleCompany;
