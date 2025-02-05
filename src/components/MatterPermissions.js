// MatterPermissions.js
import React, { useState } from 'react';
import './MatterPermissions.css';

const MatterPermissions = ({ data, onUpdate }) => {
  const [localData, setLocalData] = useState(data);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setLocalData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSave = () => {
    onUpdate(localData);
  };

  return (
    <div className="matter-permissions">
      <h2>Set Matter Permissions</h2>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="canView"
            checked={localData.canView || false}
            onChange={handleChange}
          />
          Can View Matter
        </label>
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="canEdit"
            checked={localData.canEdit || false}
            onChange={handleChange}
          />
          Can Edit Matter
        </label>
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="canDelete"
            checked={localData.canDelete || false}
            onChange={handleChange}
          />
          Can Delete Matter
        </label>
      </div>
      <button onClick={handleSave}>Save and Continue</button>
    </div>
  );
};

export default MatterPermissions;
