import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Filter from "../../components/Filter/Filter";
import Card from "../../components/Card/Card";
import Map from "../../components/Map/Map";
import "./listPage.scss";

function ListPage() {
  const [data, setData] = useState([]);
  const location = useLocation();

  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryString = queryParams.toString();
        const url = queryString
          ? `https://localhost:7215/api/RealEstates/Filter?${queryString}`
          : `https://localhost:7215/api/RealEstates`;
        console.log("Fetching URL:", url);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const result = await response.json();
        setData(result); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching real estate data:", error);
      }
    };

    fetchData();
  }, [location.search]); // Re-fetch when search query changes
  console.log(data);
  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {data.length > 0 ? (
            data.map((item) => <Card key={item.id} item={item} />)
          ) : (
            <p>What are you finding for ???</p>
          )}
        </div>
      </div>
      <div className="mapContainer">
        <Map items={data} />
      </div>
    </div>
  );
}

export default ListPage;
