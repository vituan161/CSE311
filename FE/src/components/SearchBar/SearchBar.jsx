import { useState, useEffect } from "react";
import "./SearchBar.scss";

const types = ["buy", "rent", "project"];
const API_URL = "https://open.oapi.vn/location/provinces?size=63";

function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (value) => {
    setQuery((prev) => ({ ...prev, type: value }));
  };

  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    // Fetch data from the API using fetch
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        setProvinces(data.data);
        console.log(data.data);
      })
      .catch((err) => {
        console.log("Lỗi khi fetch:", err);
      });
  }, []);

  // const provinceOptions = provinces.map((province) => ({
  //   value: province.id,
  //   label: province.name,
  // }));
  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>

      <form action="">
        <select name="city-location" id="">
          {provinces.map((province) => (
            <option
              key={province.id}
              value={province.id}
              selected={province.name === "Bình Dương"}
            >
              {province.name}
            </option>
          ))}
        </select>

        <input type="text" name="location" placeholder="City Location" />
        <input type="number" name="minPrice" min={0} placeholder="Min Price" />
        <input type="number" name="maxPrice" min={0} placeholder="Max Price" />
        <button className="searchBtn">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
