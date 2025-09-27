import React, { useMemo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import { FiMenu } from 'react-icons/fi';
import profileFallback from '../styles/profile-placeholder.png.png';

export default function Navbar() {
  const toggleSidebar = () => {
    document.body.classList.toggle('sidebar-open');
    const ev = new Event('sidebar:toggle');
    window.dispatchEvent(ev);
  };

  // ✅ Resolve image path for GitHub Pages
  const profileSrc = useMemo(() => {
  const base = import.meta.env.BASE_URL || '/';
  const imagePath = 'assets/profile-placeholder.png';
  return `${base.replace(/\/?$/, '/')}${imagePath}`;
}, []);

  return (
    <nav className="top-navbar">
      <div className="nav-left">
        <button
          className="sidebar-toggle"
          aria-label="Toggle sidebar"
          onClick={toggleSidebar}
        >
          <FiMenu size={20} />
        </button>
        <Link to="/" className="brand">
          {/* ✅ Image resolved for GitHub Pages */}
          <img
            src={profileSrc}
            alt="logo"
            className="brand-img"
            onError={(e) => {
              e.target.src = profileFallback;
            }}
          />
          <span className="brand-text">Bijendra Mishra</span>
        </Link>
      </div>

      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
          About
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
          Profile
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
          Contact
        </NavLink>
      </div>
    </nav>
  );
}