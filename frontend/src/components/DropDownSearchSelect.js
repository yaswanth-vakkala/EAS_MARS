import React, { useState } from 'react';
// import './styles.css';
import Select from 'react-select';

export default function DropDownSearchSelect() {
  // React state to manage selected options
  const [selectedOptions, setSelectedOptions] = useState();

  // Array of all options
  const optionList = [
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'blue', label: 'Blue' },
    { value: 'white', label: 'White' },
  ];

  // Function triggered on selection
  function handleSelect(data) {
    setSelectedOptions(data);
  }
  return (
    <div className="app">
      <h2>Choose your color</h2>
      <div className="dropdown-container">
        <Select
          options={optionList}
          placeholder="Select color"
          value={selectedOptions}
          onChange={handleSelect}
          isSearchable={true}
        />
      </div>
    </div>
  );
}
