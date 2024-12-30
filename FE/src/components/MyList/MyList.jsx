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
  const getCompany = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7215/api/RealEstates/MyRealEstate/",
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        }
      );
      setListData(response.data);
    } catch (error) {
      console.error("Get real estate failed:", error);
    }
  };
  useEffect(() => {
    getCompany();
  }, [listData]);
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

  return (
    <div className={"list"}>
      <button
        onClick={toggleUpdateMode}
        className={
          Object.values(updateModes).some((v) => v) ? "updateOn" : "updateOff"
        }
      >
        Update Mode {Object.values(updateModes).some((v) => v) ? "ON" : "OFF"}
      </button>
      {listData.map((item) => (
        <div key={item.id}>
          <Card
            key={item.id}
            item={item}
            isUpdate={updateModes[item.id] || false}
          />
          <button onClick={() => toggleCardUpdateMode(item.id)}>
            {updateModes[item.id]
              ? "Turn OFF Update Mode"
              : "Turn ON Update Mode"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default MyList;
