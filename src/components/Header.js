import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Ensure you have this CSS file for styling

function Header() {
    const navigate=useNavigate()
    const handleLogout = () => {
      navigate("/");
        // Remove token from local storage
        localStorage.removeItem('accessToken');
        // Redirect to login page
        
    };
  return (
    <header>
  
        <nav className="header-nav">
        <h2 className="header-title">F/S Management</h2>
        <div>
          <Link to="/">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/faculty-dashboard">Faculty Dashboard</Link>
          <Link to="/student-dashboard">Student Dashboard</Link>
 <Link onClick={handleLogout} className='navbar-btn btn-logout'>Logout</Link>

          </div>
        </nav>

        
        
      
    </header>
  );
}

export default Header;
