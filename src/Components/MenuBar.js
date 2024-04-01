import React from 'react';
import './Navbar1.css'; // Ensure this is the correct path to your CSS file
import { Link } from 'react-router-dom';
 
const MenuBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav"> {/* Ensure this class matches with your CSS */}
        <li className="navbar-item"> {/* This ensures proper styling */}
          <Link to="/Home">Home</Link>
        </li>
      </ul>
    </nav>
  );
};
 
export default MenuBar;