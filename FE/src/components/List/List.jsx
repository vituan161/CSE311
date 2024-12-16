import React from "react";
import "./List.scss";
import { listData } from "../../lib/dummydata";
import Card from "../Card/Card";
function List({ data }) {
  return (
    <div className="list">
      {data.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

export default List;
