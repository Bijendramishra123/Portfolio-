// src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { 
  FiMenu, 
  FiX, 
  FiHome, 
  FiUser, 
  FiBriefcase, 
  FiCode, 
  FiMail,
  FiGithub, 
  FiLinkedin, 
  FiYoutube, 
  FiFolder,
  FiCalendar,
  FiMessageSquare,
  FiChevronRight,
  FiExternalLink,
  FiStar
} from "react-icons/fi";
import { SiLeetcode, SiHackerrank } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import "./Sidebar.css";

export default function Sidebar() {
  const data = useSelector((state) => state.resume);
  const [isOpen, setIsOpen] = useState(false); // Initially closed
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Navigation items
  const navItems = [
    { path: "/", label: "Home", icon: <FiHome /> },
    { path: "/about", label: "About", icon: <FiUser /> },
    { path: "/profile", label: "Profile", icon: <FiUser /> },
    { path: "/projects", label: "Projects", icon: <FiFolder /> },
    { path: "/experience", label: "Experience", icon: <FiBriefcase /> },
    { path: "/skills", label: "Skills", icon: <FiCode /> },
    { path: "/contact", label: "Contact", icon: <FiMail /> },
  ];

  // Featured projects (only names)
  const featuredProjects = data.projects.slice(0, 3).map(project => ({
    id: project.id,
    name: project.title,
    slug: project.slug
  }));

  // Social links
  const socialLinks = [
    { href: data.github, icon: <FiGithub />, label: "GitHub", color: "#333" },
    { href: data.linkedin, icon: <FiLinkedin />, label: "LinkedIn", color: "#0077B5" },
    { href: data.youtube, icon: <FiYoutube />, label: "YouTube", color: "#FF0000" },
    { href: data.leetcode, icon: <SiLeetcode />, label: "LeetCode", color: "#FFA116" },
    { href: data.hackerrank, icon: <SiHackerrank />, label: "HackerRank", color: "#00EA64" },
  ].filter(link => link.href); // Only show if link exists

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close sidebar
  const closeSidebar = () => {
    setIsOpen(false);
  };

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Close sidebar on route change (mobile only)
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location, isMobile]);

  // Add click outside listener
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      const sidebar = document.querySelector('.sidebar');
      const toggleBtn = document.querySelector('.sidebar-toggle');
      
      if (sidebar && toggleBtn && 
          !sidebar.contains(e.target) && 
          !toggleBtn.contains(e.target)) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Toggle Button - Always Visible */}
      <motion.button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </motion.div>
        <span className="toggle-label">Menu</span>
      </motion.button>

      {/* Overlay for mobile when sidebar is open */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            className="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Main Sidebar */}
      <motion.aside
        className={`sidebar ${isOpen ? 'open' : 'closed'}`}
        initial={false}
        animate={{ 
          x: isOpen ? 0 : "-100%",
        }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <div className="sidebar-content">
          {/* Close Button for Mobile */}
          {isMobile && (
            <button
              className="mobile-close-btn"
              onClick={closeSidebar}
              aria-label="Close sidebar"
            >
              <FiX size={24} />
            </button>
          )}

          {/* Profile Header */}
          <motion.div 
            className="sidebar-profile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="profile-avatar">
              <div className="avatar-ring">
                <div className="avatar-inner">
                  <span className="avatar-text">👨‍💻</span>
                </div>
              </div>
            </div>
            
            <div className="profile-info">
              <h3 className="profile-name">{data.name}</h3>
              <p className="profile-title">{data.title}</p>
              <div className="profile-location">
                <FiCalendar className="location-icon" />
                <span>{data.location || "Pune, India"}</span>
              </div>
            </div>
          </motion.div>

          {/* Navigation Menu */}
          <nav className="sidebar-nav">
            <h4 className="nav-title">
              <span className="title-icon">📱</span>
              Navigation
            </h4>
            
            <ul className="nav-list">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.li
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className={`nav-item ${isActive ? 'active' : ''}`}
                      onClick={closeSidebar}
                    >
                      <div className="nav-icon">{item.icon}</div>
                      <span className="nav-label">{item.label}</span>
                      {isActive && (
                        <motion.div
                          className="nav-indicator"
                          layoutId="navIndicator"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                      <FiChevronRight className="nav-arrow" />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* Featured Projects - Only Names */}
          {featuredProjects.length > 0 && (
            <div className="sidebar-projects">
              <h4 className="projects-title">
                <FiStar className="title-icon" />
                Featured Projects
              </h4>
              
              <div className="projects-list">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="project-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      to={`/projects/${project.slug}`}
                      className="project-link"
                      onClick={closeSidebar}
                    >
                      <div className="project-bullet">
                        <div className="bullet-dot"></div>
                      </div>
                      <span className="project-name">{project.name}</span>
                      <FiChevronRight className="project-arrow" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="sidebar-social">
              <h4 className="social-title">
                <span className="title-icon">🌐</span>
                Connect With Me
              </h4>
              
              <div className="social-icons-grid">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-link"
                    style={{ '--social-color': social.color }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    whileHover={{ 
                      scale: 1.2,
                      y: -5
                    }}
                    whileTap={{ scale: 0.9 }}
                    title={social.label}
                  >
                    <div className="social-icon-wrapper">
                      {social.icon}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          )}

          {/* Quick Contact */}
          <div className="sidebar-contact">
            <motion.a
              href="/contact"
              className="contact-cta"
              onClick={closeSidebar}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMessageSquare className="cta-icon" />
              <div className="cta-content">
                <span className="cta-text">Need Help?</span>
                <span className="cta-subtext">Get in Touch</span>
              </div>
              <FiExternalLink className="cta-arrow" />
            </motion.a>
          </div>

          {/* Copyright */}
          <motion.div 
            className="sidebar-footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="footer-text">
              © {new Date().getFullYear()} {data.name}
            </p>
            <p className="footer-subtext">Built with ❤️ & React</p>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
}