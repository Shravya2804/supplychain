import React from 'react';
import gifBackground from './background.gif';
import './Home.css';
import { Link } from 'react-router-dom';
 
const Home = () => {
  return (
    <div className="app">
      <div className="background">
        <img src={gifBackground} alt="Background" />
      </div>
      <div className="content">
        <Link to="/login" className="login-button">Login</Link>
      </div>
    </div>
  );
};
 
export default Home;