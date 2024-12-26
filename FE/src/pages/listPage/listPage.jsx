import React from "react";
import { listData } from "../../lib/dummydata";
import "./listPage.scss";
import Filter from "../../components/Filter/filter";
import Card from "../../components/Card/Card";
import Map from "../../components/Map/Map";
function ListPage() {
  const data = listData;
  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {/* {data.map((item) => (
            <Card key={item.id} item={item} />
          ))} */}
        </div>
      </div>
      <div className="mapContainer">
        <Map items={data} />
      </div>
    </div>
  );
}

export default ListPage;
