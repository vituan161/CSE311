import React, { useState } from "react";
import "./NewPostForm.scss";
import UploadImage from "../UploadImage/UploadImage";
function NewPostForm({ className, onClose }) {
  const [activeSection, setActiveSection] = useState("information");
  return (
    <div className={`new-post-form ${className}`}>
      <div className="sidebar">
        <ul>
          <li
            className={activeSection === "information" ? "active" : ""}
            onClick={() => setActiveSection("information")}
          >
            Information
          </li>
          <li
            className={activeSection === "images" ? "active" : ""}
            onClick={() => setActiveSection("images")}
          >
            Images
          </li>
          <li
            className={activeSection === "maplocation" ? "active" : ""}
            onClick={() => setActiveSection("maplocation")}
          >
            Location
          </li>
        </ul>
      </div>
      <div className="form-content">
        {activeSection === "information" && (
          <div className="information-section">
            <h1>General Information</h1>
            <form action="">
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
              </div>
              <div className="right">
                <div className="upload-img">
                  <h2>Images</h2>
                  <UploadImage />
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
        )}
        {activeSection === "images" && <div>image</div>}
        {activeSection === "maplocation" && <div>map</div>}
      </div>
    </div>
  );
}

export default NewPostForm;
