import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Filter.scss";

const typeMapping = {
  0: "For Sale",
  1: "For Rent",
  2: "Project",
};

const propertyTypeMapping = {
  apartment: 0,
  house: 1,
  land: 2,
};

function Filter() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [query, setQuery] = useState({
    choice: params.get("choice") || "0",
    province: params.get("province") || "",
    city: params.get("city") || "",
    propertyType: params.get("propertyType") || "",
    minPrice: params.get("minPrice") || "",
    maxPrice: params.get("maxPrice") || "",
  });

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState(() => {
    const city = params.get("city") || "";
    const province = params.get("province") || "";
    return (city || "") + " " + (province || "");
  });

  useEffect(() => {
    fetch("https://open.oapi.vn/location/provinces?size=63")
      .then((response) => response.json())
      .then((data) => setProvinces(data.data))
      .catch((err) => console.log("Error fetching provinces:", err));
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.append("choice", query.choice);
    if (query.province) params.append("province", query.province);
    if (query.city) params.append("city", query.city);
    if (query.propertyType)
      params.append("type", propertyTypeMapping[query.propertyType]);
    if (query.minPrice) params.append("minPrice", query.minPrice);
    if (query.maxPrice) params.append("maxPrice", query.maxPrice);
    setCities(query.city + " " + query.province);
    navigate(`/list?${params.toString()}`);
  };

  return (
    <div className="filter">
      <h1>Search results for {cities}</h1>
      <div className="top">
        <div className="top-item">
          <label htmlFor="province">Province</label>
          <select
            name="province"
            value={query.province}
            onChange={(e) =>
              setQuery((prev) => ({ ...prev, province: e.target.value }))
            }
          >
            <option value="">Choose Province</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.name}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        <div className="top-item">
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            placeholder="Enter City"
            value={query.city}
            onChange={(e) =>
              setQuery((prev) => ({ ...prev, city: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select
            name="choice"
            value={query.choice}
            onChange={(e) =>
              setQuery((prev) => ({ ...prev, choice: e.target.value }))
            }
          >
            <option value="0">For Sale</option>
            <option value="1">For Rent</option>
            <option value="2">Project</option>
          </select>
        </div>

        <div className="item">
          <label htmlFor="propertyType">Property Type</label>
          <select
            name="propertyType"
            value={query.propertyType}
            onChange={(e) =>
              setQuery((prev) => ({ ...prev, propertyType: e.target.value }))
            }
          >
            <option value="">Choose Property Type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="land">Land</option>
          </select>
        </div>

        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={query.minPrice}
            onChange={(e) =>
              setQuery((prev) => ({ ...prev, minPrice: e.target.value }))
            }
            min={0}
          />
        </div>

        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={query.maxPrice}
            onChange={(e) =>
              setQuery((prev) => ({ ...prev, maxPrice: e.target.value }))
            }
            min={0}
          />
        </div>

        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default Filter;
