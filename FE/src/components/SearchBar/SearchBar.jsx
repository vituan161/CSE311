import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.scss";

const types = ["buy", "rent", "project"];
const typeMapping = {
  buy: 0,
  rent: 1,
  project: 2,
};
const API_URL = "https://open.oapi.vn/location/provinces?size=63";

function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState({
    type: "buy",
    province: "",
    city: "",
    minPrice: "",
    maxPrice: "",
  });

  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setProvinces(data.data))
      .catch((err) => console.log("Error fetching provinces:", err));
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.append("choice", typeMapping[query.type]); // Map type to backend value
    if (query.province) params.append("province", query.province);
    if (query.city) params.append("city", query.city);
    if (query.minPrice) params.append("minPrice", query.minPrice);
    if (query.maxPrice) params.append("maxPrice", query.maxPrice);
    navigate(`/list?${params.toString()}`);
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setQuery((prev) => ({ ...prev, type }))}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <select
          name="province"
          onChange={(e) => setQuery((prev) => ({ ...prev, province: e.target.value }))}
          value={query.province}
        >
          <option value="">Choose Province</option>
          {provinces.map((province) => (
            <option key={province.id} value={province.name}>
              {province.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="city"
          placeholder="Enter City"
          value={query.city}
          onChange={(e) => setQuery((prev) => ({ ...prev, city: e.target.value }))}
        />

        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={query.minPrice}
          onChange={(e) => setQuery((prev) => ({ ...prev, minPrice: e.target.value }))}
          min={0}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={query.maxPrice}
          onChange={(e) => setQuery((prev) => ({ ...prev, maxPrice: e.target.value }))}
          min={0}
        />
        <button type="submit" className="searchBtn">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
