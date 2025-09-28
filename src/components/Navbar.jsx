import React, { useMemo, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import { FiMenu, FiX } from 'react-icons/fi';
import profileFallback from '../styles/profile-placeholder.png.png';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSidebar = () => {
    document.body.classList.toggle('sidebar-open');
    const ev = new Event('sidebar:toggle');
    window.dispatchEvent(ev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // ✅ Resolve image path for GitHub Pages
  const profileSrc = useMemo(() => {
    const base = import.meta.env.BASE_URL || '/';
    const imagePath = 'assets/profile-placeholder.png';
    return `${base.replace(/\/?$/, '/')}${imagePath}`;
  }, []);

  return (
    <>
      <nav className={`top-navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <div className="nav-container">
          <div className="nav-left">
            <button
              className="sidebar-toggle"
              aria-label="Toggle sidebar"
              onClick={toggleSidebar}
            >
              <FiMenu size={20} />
            </button>
            <Link to="/" className="brand" onClick={closeMobileMenu}>
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

          {/* Desktop Navigation */}
          <div className="nav-links desktop-nav">
            <NavLink to="/" end onClick={closeMobileMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
            <NavLink to="/about" onClick={closeMobileMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
              About
            </NavLink>
            <NavLink to="/profile" onClick={closeMobileMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
              Profile
            </NavLink>
            <NavLink to="/contact" onClick={closeMobileMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
              Contact
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-toggle"
            aria-label="Toggle mobile menu"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`mobile-nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <NavLink to="/" end onClick={closeMobileMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
            <span className="nav-icon">🏠</span>
            Home
          </NavLink>
          <NavLink to="/about" onClick={closeMobileMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
            <span className="nav-icon">👤</span>
            About
          </NavLink>
          <NavLink to="/profile" onClick={closeMobileMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
            <span className="nav-icon">📄</span>
            Profile
          </NavLink>
          <NavLink to="/contact" onClick={closeMobileMenu} className={({ isActive }) => (isActive ? 'active' : '')}>
            <span className="nav-icon">📧</span>
            Contact
          </NavLink>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu} />
      )}
    </>
  );
}