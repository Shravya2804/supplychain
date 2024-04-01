import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 import './Login.css';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
 
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5122/api/DataExtraction/getAllUsers');
      const users = await response.json();
 
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user)); // Fixed: Store stringified user object
        switch (user.role) {
          case 'Salesprofessional':
            navigate('/Professional');
            break;
          case 'SalesManager':
            navigate('/Manager');
            break;
          case 'Admin':
            navigate('/admin');
            break;
          default:
            navigate('./failed');
        }
      } else {
        console.log("No user found");
        navigate('./failed');
      }
    } catch (error) {
      console.error('Login error', error);
      navigate('./failed');
    }
  };
 
  return (
    <div className="login-container">
      <h3>Enter the User Credentials to Login</h3>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
 
export default Login;