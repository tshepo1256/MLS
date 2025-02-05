import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import Sidebar styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">Case Manager</h1>
      </div>
      <div className="sidebar-nav">
        <ul>
          <li>
            <Link to="/" className="sidebar-link">Dashboard</Link>
          </li>
          <li>
            <Link to="/matter-creation" className="sidebar-link">Create Matter</Link>
          </li>
          <li>
            <Link to="/matter-list" className="sidebar-link">Matters List</Link>
          </li>
          <li>
            <Link to="/matter-list" className="sidebar-link">Reports</Link>
          </li>
          <li>
            <Link to="/chats" className="sidebar-link">Chats</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
