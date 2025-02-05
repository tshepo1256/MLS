// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Case Manager</h1>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/create-matter">Create Matter</Link>
      </div>
    </nav>
  );
};

export default Navbar;
