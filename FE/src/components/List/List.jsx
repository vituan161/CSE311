import React from "react";
import "./List.scss";
import { useState, useEffect } from "react";
import Card from "../Card/Card";
import axios from "axios";
import { useSelector } from "react-redux";
function List({ data }) {
  const [listData, setListData] = useState([]);
  const token = useSelector((state) => state.token);
  const getCompany = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7215/api/RealEstates/MyRealEstate/",
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );
      //console.log(response.data);
      setListData(response.data);
    } catch (error) {
      console.error("Get real estate failed:", error);
    }
  };
  useEffect(() => {
    getCompany();
  }, []);
  if (
    listData.length > 0 &&
    listData[0].prices &&
    listData[0].prices.length > 0
  ) {
    console.log(listData[0].prices[0]);
  }
  return (
    <div className="list">
      {listData.map((item) => (
        // <div>
        //   <p>{item.id}</p>
        //   <p>{item.name}</p>
        //   <p>{item.address}</p>
        //   <p>{item.area}</p>
        //   {/* <p>{item.prices[0].priceValue}</p> */}
        //   <img src={item.imageurl[0]} alt="" />
        // </div>
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

export default List;
