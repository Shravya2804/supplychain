
import React, { useState } from 'react';
// Assuming Orders component for order management
import './Manager.css';
import { useNavigate } from 'react-router-dom';
import gifBackground from './pro.gif';
 

 
const Manager = () => {
  const [showProducts, setShowProducts] = useState(false);
  const navigate=useNavigate();
  const handleProductsClick = () => {
    setShowProducts(true); // Set state to show Orders component
  };
 
  const [showCustomers, setShowCustomers] = useState(false);
 
  const handleCustomersClick = () => {
    setShowCustomers(true); // Set state to show Orders component
  };
 
 
 
 
  return (
    <>
    <div className="background">
        <img src={gifBackground} alt="Background" />
      </div>
    <div className="manager-container">
      <button className="manage-products-button" onClick={handleProductsClick}>
        Manage Products
      </button>
      {showProducts && navigate('/products')}
 
      <button className="manage-customers-button" onClick={handleCustomersClick}>
        Manage Customers
      </button>
      {showCustomers && navigate('/customers')}
    </div>
    </>
  );
};
 
export default Manager;
 