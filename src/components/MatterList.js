import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MatterList.css';
import Sidebar from './Sidebar';

// Mock matters with added status and importance
const initialMatters = [
  { 
    id: 1, 
    name: 'Matter 1', 
    client: 'Client A', 
    type: 'Pro Bono', 
    importance: 'high', 
    color: '#FF4C4C',
    creationDate: '2024-10-15',
    users: ['Alice', 'Bob'],
    status: 'Open'
  },
  { 
    id: 2, 
    name: 'Matter 2', 
    client: 'Client B', 
    type: 'Litigation', 
    importance: 'low', 
    color: '#58A5FF',
    creationDate: '2024-09-10',
    users: ['Charlie', 'David'],
    status: 'Pending'
  },
  { 
    id: 3, 
    name: 'Matter 3', 
    client: 'Client C', 
    type: 'Corporate', 
    importance: 'medium', 
    color: '#FFBB33',
    creationDate: '2024-08-22',
    users: ['Eve', 'Frank'],
    status: 'Closed'
  },
  { 
    id: 4, 
    name: 'Matter 4', 
    client: 'Client D', 
    type: 'Pro Bono', 
    importance: 'high', 
    color: '#FF4C4C',
    creationDate: '2024-07-30',
    users: ['Grace', 'Hannah'],
    status: 'Open'
  },
];

const getImportanceColor = (importance) => {
  switch (importance) {
    case 'high':
      return '#FF4C4C'; // Red
    case 'medium':
      return '#FFBB33'; // Yellow
    case 'low':
      return '#58A5FF'; // Blue
    default:
      return '#aaa';
  }
};

const MatterList = () => {
  const [matters, setMatters] = useState(initialMatters);
  const [statusFilter, setStatusFilter] = useState('All');
  const [importanceFilter, setImportanceFilter] = useState('All');

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const handleImportanceFilter = (importance) => {
    setImportanceFilter(importance);
  };

  const filteredMatters = matters.filter(matter => {
    const statusMatch = statusFilter === 'All' || matter.status === statusFilter;
    const importanceMatch = importanceFilter === 'All' || matter.importance === importanceFilter;
    return statusMatch && importanceMatch;
  });

  return (
    <div className="layout">
      <Sidebar />
      <div className="matter-list-container">
        <div className="filter-bar">
          <div className="filter-groups">
            {/* Status Filters */}
            <div className="status-filters">
              {['All', 'Open', 'Pending', 'Closed'].map(status => (
                <button
                  key={status}
                  className={`filter-button ${statusFilter === status ? 'active' : ''}`}
                  onClick={() => handleStatusFilter(status)}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Importance Filters */}
            <div className="importance-filters">
              {['All', 'high', 'medium', 'low'].map(importance => (
                <button
                  key={importance}
                  className={`filter-button ${importanceFilter === importance ? 'active' : ''}`}
                  onClick={() => handleImportanceFilter(importance)}
                >
                  {importance.charAt(0).toUpperCase() + importance.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Create Matter Button */}
          <Link to="/matter-creation" className="create-matter-button">
            + Create Matter
          </Link>
        </div>

        <div className="matter-list">
          {filteredMatters.length > 0 ? (
            filteredMatters.map((matter) => (
              <Link to={`/edit-matter/${matter.id}`} key={matter.id} className="matter-card">
                <div className="matter-header">
                  <span className="matter-title">{matter.name}</span>
                  <div
                    className="matter-importance"
                    style={{ backgroundColor: getImportanceColor(matter.importance) }}
                    title={`Importance: ${matter.importance.charAt(0).toUpperCase() + matter.importance.slice(1)}`}
                  />
                </div>
                <div className="matter-info">
                  <p><strong>Client:</strong> {matter.client}</p>
                  <p><strong>Type:</strong> {matter.type}</p>
                  <p><strong>Created:</strong> {matter.creationDate}</p>
                  <p><strong>Related Users:</strong> {matter.users.join(', ')}</p>
                  <p><strong>Status:</strong> {matter.status}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No matters match the selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatterList;
