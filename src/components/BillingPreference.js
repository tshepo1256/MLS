// BillingPreferences.js
import React, { useState } from 'react';
import './BillingPreference.css';

const BillingPreferences = ({ data, onUpdate }) => {
  const [localData, setLocalData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(localData);
  };

  return (
    <div className="billing-preferences">
      <h2>Set Billing Preferences</h2>
      <div className="form-group">
        <label>Billing Method</label>
        <select
          name="billingMethod"
          value={localData.billingMethod || ''}
          onChange={handleChange}
        >
          <option value="">Select Billing Method</option>
          <option value="hourly">Hourly</option>
          <option value="fixedFee">Fixed Fee</option>
          <option value="customRate">Custom Rate</option>
        </select>
      </div>
      <div className="form-group">
        <label>Custom Rate (if applicable)</label>
        <input
          type="number"
          name="customRate"
          value={localData.customRate || ''}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSave}>Save and Continue</button>
    </div>
  );
};

export default BillingPreferences;
