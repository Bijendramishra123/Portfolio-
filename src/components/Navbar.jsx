import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import { FiMenu } from 'react-icons/fi';

export default function Navbar(){
  const toggleSidebar = () => {
    document.body.classList.toggle('sidebar-open');
    const ev = new Event('sidebar:toggle');
    window.dispatchEvent(ev);
  };

  return (
    <nav className="top-navbar">
      <div className="nav-left">
        <button className="sidebar-toggle" aria-label="Toggle sidebar" onClick={toggleSidebar}>
          <FiMenu size={20}/>
        </button>
        <Link to="/" className="brand">
          <img src="/assets/profile-placeholder.png" alt="logo" className="brand-img" />
          <span className="brand-text">Bijendra Mishra</span>
        </Link>
      </div>

      <div className="nav-links">
        <NavLink to="/" end className={({isActive})=> isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/about" className={({isActive})=> isActive ? 'active' : ''}>About</NavLink>
        <NavLink to="/profile" className={({isActive})=> isActive ? 'active' : ''}>Profile</NavLink>
        <NavLink to="/contact" className={({isActive})=> isActive ? 'active' : ''}>Contact</NavLink>
      </div>
    </nav>
  );
}
