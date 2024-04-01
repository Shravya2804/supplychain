import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div style={containerStyle}>
      <div style={buttonContainerStyle}>
        <Link to="/Manager" style={buttonStyle}>Manager</Link>
        <Link to="/Professional" style={buttonStyle}>Professional</Link>
        <Link to="/roles" style={buttonStyle}>Roles</Link>
      </div>
    </div>
  );
};

const containerStyle = {
  position: 'absolute',
  left: '0',
  right: '0',
  top: '0',
  bottom: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const buttonContainerStyle = {
  textAlign: 'center',
};

const buttonStyle = {
  display: 'inline-block',
  padding: '10px 20px',
  backgroundColor: '#007bff', /* Button background color */
  color: '#ffffff', /* Button text color */
  textDecoration: 'none',
  border: 'none',
  borderRadius: '5px',
  marginRight: '10px',
  marginBottom: '10px',
  cursor: 'pointer',
};

export default Admin;
