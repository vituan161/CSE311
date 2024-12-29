import React, { useState } from "react";
import "./NewPostForm.scss";
import UploadImage from "../UploadImage/UploadImage";
import SelectLocation from "../Map/SelectLocation";
import MultiSelectDropdown from "../SelectDropdown/SelectDropdown";
import axios from "axios";
import { useSelector } from "react-redux";
function NewPostForm({ className, onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [address, setAddress] = useState("");
  const [type, setType] = useState(1);
  const [choice, setChoice] = useState(1);
  const [design, setDesign] = useState([]);
  const [area, setArea] = useState("");
  const [legality, setLegality] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState(null);
  const [bathroom, setBathroom] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [detail, setDetail] = useState("");

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
  const designArray = detail.split(",").map((item) => item.trim());
  designArray.unshift(bedroom.toString(), bathroom.toString());
  const submit = async () => {
    const realEstate = {
      name: name,
      area: area,
      address: address,
      link: "",
      imageurl: getAllImgURL(),
      description: [description],
      design: designArray,
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
    console.log(JSON.stringify(realEstate));
    try {
      const response = await axios.post(
        "https://localhost:7215/api/RealEstates",
        realEstate,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.status);
      if (response.status === 201) {
        console.log(response.status);
        window.alert("Post Successful!");
      }
    } catch (error) {
      window.alert("Post failed!", error);
      console.error("Post failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submit();
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
    const inputField = document.querySelector(".inputField");
    const group = document.createElement("div");
    group.classList.add("input-group");
    inputField.appendChild(group);
    const input = document.createElement("input");
    const imgShow = document.createElement("img");

    input.setAttribute("type", "text");
    input.setAttribute("name", " ");
    input.setAttribute("placeholder", "Enter Image URL");
    input.addEventListener("input", () => {
      imgShow.src = input.value;
    });
    group.appendChild(imgShow);
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
    <div className={`new-post-form ${className}`}>
      <div className="form-content">
        <div className="information-section">
          <h1>Real Estate Information</h1>
          <form action="" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            <div className="left">
              <div className="description">
                <h2>Description</h2>

                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="description"> Real Estate Description</label>
                <textarea
                  name="description"
                  id="description"
                  cols={50}
                  rows={6}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="category">
                <h2>Category</h2>

                <label htmlFor="type">Type</label>
                <select
                  name="type"
                  id="type"
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
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="address-section">
                <h2>Address</h2>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  onChange={(e) => setAddress(e.target.value)}
                />
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
                <div className="upload-img">
                  <button
                    type="button"
                    onClick={addInput}
                    className="add-field-btn"
                  >
                    Add new Image URL
                  </button>
                  <div className="inputField"></div>
                  {/* <button onClick={getAllImgURL}>OK</button> */}
                </div>
              </div>
              <div className="room-size">
                <h2>Design And Room Size</h2>
                <label htmlFor="size">Size</label>
                <input
                  type="number"
                  id="size"
                  onChange={(e) => setArea(e.target.value)}
                />
                <label htmlFor="bedroom">Bedroom</label>
                <input
                  type="number"
                  id="bedroom"
                  onChange={(e) => setBedroom(e.target.value + " phòng ngủ")}
                />

                <label htmlFor="bathroom">Bathroom</label>
                <input
                  type="number"
                  id="bathroom"
                  onChange={(e) => setBathroom(e.target.value + " phòng tắm")}
                />
                <label htmlFor="moreDetail">Detail Design</label>
                <input
                  type="text"
                  id="moreDetail"
                  onChange={(e) => setDetail(e.target.value)}
                />
              </div>
              <div className="status-wrapper">
                <h2> Legality and Status</h2>
                <label htmlFor="legality">Legality</label>
                <input
                  type="text"
                  id="legality"
                  onChange={(e) => setLegality(e.target.value)}
                />
                <label htmlFor="status">Status</label>
                <input
                  type="text"
                  id="status"
                  onChange={(e) => setStatus(e.target.value)}
                />
              </div>
              {/* <div className="features">
                <h2>Features</h2>
                <MultiSelectDropdown />
              </div> */}

              {/* <div className="nearby-place">
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
              </div> */}

              <div className="form-actions">
                <button type="submit" onClick={handleSubmit}>
                  {" "}
                  Post
                </button>
                <button type="button" onClick={onClose} className="close-btn">
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
