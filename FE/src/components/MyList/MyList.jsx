import React from "react";
import "./MyList.scss";
import { useState, useEffect } from "react";
import Card from "../Card/Card";
import axios from "axios";
import { useSelector } from "react-redux";
import UpdateToggle from "../UpdateToggle/UpdateToggle";
function MyList() {
  const [listData, setListData] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const token = useSelector((state) => state.token);
  const getMyRealEstate = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7215/api/RealEstates/MyRealEstate/",
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );
      console.log(response.data);
      setListData(response.data);
    } catch (error) {
      console.error("Get real estate failed:", error);
    }
  };
  useEffect(() => {
    getMyRealEstate();
  }, []);
  // if (
  //   listData.length > 0 &&
  //   listData[0].prices &&
  //   listData[0].prices.length > 0
  // ) {
  // }
  const handleToggle = (value) => {
    setIsOn(value);
  };
  // State to track the `isUpdate` state for each card
  const [updateModes, setUpdateModes] = useState({});

  // Toggle the `isUpdate` state for all cards
  const toggleUpdateMode = () => {
    const isAnyUpdateModeOn = Object.values(updateModes).some((value) => value);
    const newUpdateModes = listData.reduce((acc, item) => {
      acc[item.id] = !isAnyUpdateModeOn; // Toggle all based on the current state
      return acc;
    }, {});
    setUpdateModes(newUpdateModes);
  };

  // Toggle the `isUpdate` state for a specific card
  const toggleCardUpdateMode = (id) => {
    setUpdateModes((prevModes) => ({
      ...prevModes,
      [id]: !prevModes[id], // Toggle the specific card's `isUpdate` state
    }));
  };

  const deleteRealEstate = async (itemID) => {
    const sure = confirm(
      `Are you sure you want to delete the Real Estate with ID: ${itemID} ?`
    );
    if (sure)
      try {
        await axios.delete(`https://localhost:7215/api/RealEstates/${itemID}`, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
      } catch (error) {
        console.error("Error deleting user:", error);
      }
  };

  return (
    <div className={"list"}>
      <button
        onClick={toggleUpdateMode}
        className={
          Object.values(updateModes).some((v) => v) ? "updateOn" : "updateOff"
        }
      >
        Update Mode is{" "}
        {Object.values(updateModes).some((v) => v) ? "ON" : "OFF"}
      </button>
      {listData.map((item) => (
        <div key={item.id} className="card-group">
          <Card
            key={item.id}
            item={item}
            isUpdate={updateModes[item.id] || false}
          />
          <div className="btn-group">
            <button
              onClick={() => toggleCardUpdateMode(item.id)}
              className={`toggle-each-btn ${
                updateModes[item.id] ? "updateOn" : "updateOff"
              }`}
            >
              {updateModes[item.id] ? "On" : "Off"}
            </button>
            <button
              className="delete-btn"
              onClick={() => deleteRealEstate(item.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyList;
