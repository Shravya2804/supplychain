import React, { useState } from 'react';
 // Assuming Orders component for order management
import './Professional.css';
import { useNavigate } from 'react-router';
import gifBackground from './order.gif';
 
 
const Professional = () => {
  const [showOrders, setShowOrders] = useState(false);
  const navigate=useNavigate();
 
  const handleOrdersClick = () => {
    setShowOrders(true); // Set state to show Orders component
  };
 
  return (
   <> <div className="background">
<img src={gifBackground} alt="Background" />
</div>
    <div className="professional-container">
      <button className="manage-orders-button" onClick={handleOrdersClick}>
        Manage Orders
      </button>
      {showOrders && navigate('/orders')}
    </div>
    </>
  );
};
 
export default Professional;
 
