import React from "react";
import "./List.scss";
import { useState, useEffect } from "react";
import Card from "../Card/Card";
import axios from "axios";
import { useSelector } from "react-redux";
function List({realEstates}) {
  const [listData, setListData] = useState([]);

  return (
    <div className="list">
      {realEstates.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

export default List;
