import React, { useState } from "react";
import Select from "react-select";

const SelectDropdown = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: "pet", label: "Pet Allow" },
    { value: "security", label: "Security" },
    { value: "parking", label: "Parking" },
    { value: "gym", label: "Gym" },
    { value: "pool", label: "Swimming Pool" },
    { value: "garden", label: "Garden" },
  ];

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  return (
    <div>
      <Select
        isMulti
        value={selectedOptions}
        onChange={handleChange}
        options={options}
      />
    </div>
  );
};

export default SelectDropdown;
