import React, { useState, useEffect } from "react";
import "./UpdateRealEstate.scss";
import UploadImage from "../UploadImage/UploadImage";
import SelectLocation from "../Map/SelectLocation";
import MultiSelectDropdown from "../SelectDropdown/SelectDropdown";
import axios from "axios";
import { useSelector } from "react-redux";
function UpdateRealEstate({ className, onClose, item }) {
  const designArray = item.design;
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.prices[0].priceValue);
  const [address, setAddress] = useState(item.address);
  const [type, setType] = useState(item.type);
  const [choice, setChoice] = useState(item.choice);
  const [design, setDesign] = useState([]);
  const [area, setArea] = useState(parseInt(item.area, 10));
  const [legality, setLegality] = useState(item.legality);
  const [status, setStatus] = useState(item.status);
  const [location, setLocation] = useState(
    item.location ? { lat: item.location[0], lng: item.location[1] } : null
  );
  const [bathroom, setBathroom] = useState(parseInt(item.design[0], 10));
  const [bedroom, setBedroom] = useState(parseInt(item.design[1], 10));
  const [detail, setDetail] = useState(designArray.slice(2));
  const [imgList, setImgList] = useState(item.imageurl);

  const date = new Date();
  const current = date.toISOString().split("T")[0];
  // Add two months to the current date
  const expiryDate = new Date();
  expiryDate.setMonth(date.getMonth() + 2);
  // Format the expiry date as YYYY-MM-DD
  const formattedExpiryDate = expiryDate.toISOString().split("T")[0];

  const token = useSelector((state) => state.token);

  const handleLocationSelect = (latlng) => {
    setLocation(latlng);
  };

  const update = async () => {
    const realEstate = {
      name: name,
      area: area + "mét vuông",
      address: address,
      link: "",
      imageurl: getAllImgURL(),
      description: description,
      design: [
        bedroom + " phòng ngủ",
        bathroom + " phòng tắm",
        ...detail.split(",").map((item) => item.trim()),
      ],
      legality: legality,
      type: type,
      dateCreated: current,
      dateExprired: formattedExpiryDate,
      status: status,
      prices: [
        {
          priceValue: price,
          dateCreated: current,
        },
      ],
      choice: choice,
      location: [location.lat, location.lng],
    };
    console.log(description);
    console.log(realEstate);
    console.log(JSON.stringify(realEstate));

    try {
      const response = await axios.put(
        ` https://localhost:7215/api/RealEstates/${item.id}`,
        item.id,

        realEstate,
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.value}`,
          },
        }
      );
      console.log(response.status);
      if (response.status === 201) {
        console.log(response);
        window.alert("Update Successful!");
      }
    } catch (error) {
      window.alert("Update failed!", error);
      console.error("Update failed:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await update();
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const addInput = () => {
    const inputField = document.querySelector(".inputUpdateField");

    const group = document.createElement("div");
    group.classList.add("group");
    inputField.appendChild(group);
    const imgShow = document.createElement("img");
    imgShow.classList.add("imgShow");
    group.appendChild(imgShow);

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("name", " ");
    input.setAttribute("placeholder", "Enter Image URL");
    input.addEventListener("input", () => {
      imgShow.src = input.value;
    });
    group.appendChild(input);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => {
      group.remove();
    });
    group.appendChild(deleteButton);
  };

  const getAllImgURL = () => {
    const inputs = document.querySelectorAll(".inputField input");
    return Array.from(inputs).map((input) => input.value);
  };

  return (
    <div className="overlay">
      <div className={`update-form ${className}`}>
        <div className="form-content">
          <div className="information-section">
            <h1>Real Estate Update Informations</h1>
            <form action="" onKeyDown={handleKeyDown}>
              <div className="left">
                <div className="description">
                  <h2>Description</h2>

                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <label htmlFor="description"> Real Estate Description</label>
                  <textarea
                    name="description"
                    id="description"
                    cols={50}
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="category">
                  <h2>Category</h2>

                  <label htmlFor="type">Type</label>
                  <select
                    name="type"
                    id="type"
                    value={choice}
                    onChange={(e) => setChoice(+e.target.value)}
                  >
                    <option value="0"> For Rent</option>
                    <option value="1"> For Sale</option>
                    <option value="2"> Project</option>
                  </select>

                  <label htmlFor="property">Property</label>
                  <select
                    name="property"
                    id="property"
                    value={type}
                    onChange={(e) => setType(+e.target.value)}
                  >
                    <option value="0"> Apartmet</option>
                    <option value="1"> House</option>
                    <option value="2"> Land</option>
                  </select>
                </div>
                <div className="price-section">
                  <h2>Pricing</h2>
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="address-section">
                  <h2>Address</h2>
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="select-location">
                  <h2>Select Location</h2>
                  <SelectLocation
                    onLocationSelect={handleLocationSelect}
                    defaultLat={location ? location.lat : 0}
                    defaultLng={location ? location.lng : 0}
                  />
                  {location && (
                    <>
                      <label htmlFor="lat">Latitude</label>
                      <input
                        type="text"
                        id="lat"
                        value={location.lat}
                        readOnly
                      />
                      <label htmlFor="lng">Longitude</label>
                      <input
                        type="text"
                        id="lng"
                        value={location.lng}
                        readOnly
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="right">
                <div className="upload-img">
                  <h2>Images</h2>
                  <div className="upload-img">
                    <button
                      type="button"
                      onClick={addInput}
                      className="add-field-btn"
                    >
                      Add new Image URL
                    </button>

                    <div className="inputUpdateField"></div>

                    {/* <button onClick={getAllImgURL}>OK</button> */}
                  </div>
                </div>
                <div className="room-size">
                  <h2>Design And Room Size</h2>
                  <label htmlFor="size">Size</label>
                  <input
                    type="number"
                    id="size"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                  <label htmlFor="bedroom">Bedroom</label>
                  <input
                    type="number"
                    id="bedroom"
                    value={bedroom}
                    onChange={(e) => setBedroom(e.target.value)}
                  />

                  <label htmlFor="bathroom">Bathroom</label>
                  <input
                    type="number"
                    id="bathroom"
                    value={bathroom}
                    onChange={(e) => setBathroom(e.target.value)}
                  />
                  <label htmlFor="moreDetail">More</label>
                  <input
                    type="text"
                    id="moreDetail"
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                  />
                </div>
                <div className="status-wrapper">
                  <h2> Legality and Status</h2>
                  <label htmlFor="legality">Legality</label>
                  <input
                    type="text"
                    id="legality"
                    value={legality}
                    onChange={(e) => setLegality(e.target.value)}
                  />
                  <label htmlFor="status">Status</label>
                  <input
                    type="text"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" onClick={handleUpdate}>
                    {" "}
                    Update
                  </button>
                  <button type="button" onClick={onClose} className="close-btn">
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateRealEstate;
