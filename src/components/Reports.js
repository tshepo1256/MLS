// Reports.js
import React, { useState } from 'react';
import './Reports.css';

const Reports = ({ data, onUpdate }) => {
  const [localData, setLocalData] = useState(data);

  const handleSave = () => {
    onUpdate(localData);
  };

  return (
    <div className="reports">
      <h2>Reports</h2>
      <div>
        <label>Report Type:</label>
        <select
          name="reportType"
          value={localData.reportType || 'statusReport'}
          onChange={(e) => setLocalData({ ...localData, reportType: e.target.value })}
        >
          <option value="statusReport">Status Report</option>
          <option value="billingReport">Billing Report</option>
          <option value="tasksReport">Tasks Report</option>
        </select>
      </div>
      <button onClick={handleSave}>Save and Continue</button>
    </div>
  );
};

export default Reports;
