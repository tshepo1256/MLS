// MatterCard.js
import React from 'react';
import './MatterCard.css'; // Component-specific styles

const MatterCard = ({ matter }) => {
  return (
    <div className="matter-card">
      <h3>{matter.title}</h3>
      <p>{matter.description}</p>
      <p><strong>Status:</strong> {matter.status}</p>
      <p><strong>Assigned To:</strong> {matter.assignedUser || 'Not assigned yet'}</p>
      <button>View Details</button>
    </div>
  );
};

export default MatterCard;
