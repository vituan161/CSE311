import React from "react";
import "./Filter.scss";
function Filter() {
  return (
    <div className="filter">
      <h1>Search results for</h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select name="type" id="type">
            <option value="any"> Any</option>
            <option value="sale"> For Sale</option>
            <option value="rent"> For Rent</option>
            <option value="project"> Project</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">Property</label>
          <select name="property" id="property">
            <option value="any">Any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="warehouse">Warehouse</option>
            <option value="land"> Land</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input type="number" id="minPrice" name="minPrice" min={0} />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input type="number" id="maxPrice" name="maxPrice" min={0} />
        </div>
        <div className="item">
          <label htmlFor="bedroom"> Bedroom</label>
          <input type="number" id="bedroom" name="bedroom" />
        </div>

        <button>Search</button>
      </div>
    </div>
  );
}

export default Filter;
