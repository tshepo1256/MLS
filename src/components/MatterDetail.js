// MatterDetails.js
import React, { useState } from 'react';
import './MatterDetail.css';

const MatterDetail = ({ data, onUpdate }) => {
  const [localData, setLocalData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(localData); // Update the parent form data
  };

  return (
    <div className="matter-details">
      <h2>Enter Matter Details</h2>
      <div className="form-group">
        <label>Client Name</label>
        <input
          type="text"
          name="clientName"
          value={localData.clientName || ''}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Matter Description</label>
        <textarea
          name="description"
          value={localData.description || ''}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Responsible Solicitor</label>
        <input
          type="text"
          name="responsibleSolicitor"
          value={localData.responsibleSolicitor || ''}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Client Reference Number</label>
        <input
          type="text"
          name="clientReference"
          value={localData.clientReference || ''}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={localData.location || ''}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSave}>Save and Continue</button>
    </div>
  );
};

export default MatterDetail;
