import React, { useState } from "react";
import "./NewPostForm.scss";
import UploadImage from "../UploadImage/UploadImage";
import SelectLocation from "../Map/SelectLocation";
import MultiSelectDropdown from "../SelectDropdown/SelectDropdown";
function NewPostForm({ className, onClose }) {
  const [location, setLocation] = useState(null);

  const handleLocationSelect = (latlng) => {
    setLocation(latlng);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  return (
    <div className={`new-post-form ${className}`}>
      <div className="form-content">
        <div className="information-section">
          <h1>Real Estate Information</h1>
          <form action="" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            <div className="left">
              <div className="description">
                <h2>Description</h2>

                <label htmlFor="title">Title</label>
                <input type="text" id="title" />

                <label htmlFor="description"> Real Estate Description</label>
                <textarea
                  name="description"
                  id="description"
                  cols={50}
                  rows={6}
                ></textarea>
              </div>
              <div className="category">
                <h2>Category</h2>

                <label htmlFor="type">Type</label>
                <select name="type" id="type">
                  <option value="any"> Any</option>
                  <option value="sale"> For Sale</option>
                  <option value="rent"> For Rent</option>
                  <option value="project"> Project</option>
                </select>

                <label htmlFor="property">Property</label>
                <select name="property" id="property">
                  <option value="any"> Any</option>
                  <option value="house"> House</option>
                  <option value="apartment"> Apartmet</option>
                  <option value="land"> Land</option>
                  <option value="warehouse"> Warehouse</option>
                </select>
              </div>
              <div className="price-section">
                <h2>Pricing</h2>
                <label htmlFor="price">Price</label>
                <input type="number" id="price" />
              </div>
              <div className="address-section">
                <h2>Address</h2>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" />
              </div>
              <div className="select-location">
                <h2>Select Location</h2>
                <SelectLocation onLocationSelect={handleLocationSelect} />
                {location && (
                  <>
                    <label htmlFor="lat">Latitude</label>
                    <input type="text" id="lat" value={location.lat} readOnly />
                    <label htmlFor="lng">Longitude</label>
                    <input type="text" id="lng" value={location.lng} readOnly />
                  </>
                )}
              </div>
            </div>
            <div className="right">
              <div className="upload-img">
                <h2>Images</h2>
                <UploadImage />
              </div>
              <div className="room-size">
                <h2>Room Size</h2>
                <label htmlFor="size">Size</label>
                <input type="number" id="size" />
                <label htmlFor="bedroom">Bedroom</label>
                <input type="number" id="bedroom" />

                <label htmlFor="bathroom">Bathroom</label>
                <input type="number" id="bathroom" />
              </div>
              <div className="features">
                <h2>Features</h2>
                <MultiSelectDropdown />
              </div>

              <div className="nearby-place">
                <h2>Nearby Places</h2>
                <label htmlFor="school">School</label>
                <input type="text" id="school" />

                <label htmlFor="hospital">Hospital</label>
                <input type="text" id="hospital" />

                <label htmlFor="market">Market</label>
                <input type="text" id="market" />
                <label htmlFor="bus-stop">Bus Stop</label>
                <input type="text" id="bus-stop" />
                <label htmlFor="restaurant">Restaurant</label>
                <input type="text" id="restaurant" />
              </div>

              <div className="form-actions">
                <button type="submit"> Post</button>
                <button onClick={onClose} className="close-btn">
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewPostForm;
