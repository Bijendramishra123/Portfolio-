import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiMail, 
  FiGithub, 
  FiLinkedin, 
  FiTwitter, 
  FiHeart,
  FiArrowUp,
  FiCode,
  FiCoffee,
  FiExternalLink
} from 'react-icons/fi';
import { SiLeetcode, SiHackerrank, SiDevdotto } from 'react-icons/si';
import './Footer.css';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visitorCount] = useState(() => Math.floor(Math.random() * 5000) + 1500);
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com', label: 'GitHub', color: '#6e5494' },
    { icon: <FiLinkedin />, url: 'https://linkedin.com', label: 'LinkedIn', color: '#0077b5' },
    { icon: <SiLeetcode />, url: 'https://leetcode.com', label: 'LeetCode', color: '#ffa116' },
    { icon: <SiHackerrank />, url: 'https://hackerrank.com', label: 'HackerRank', color: '#2ec866' },
    { icon: <SiDevdotto />, url: 'https://dev.to', label: 'Dev.to', color: '#0a0a0a' },
    { icon: <FiTwitter />, url: 'https://twitter.com', label: 'Twitter', color: '#1da1f2' },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="footer-container">
        
        {/* Main Content - Compact Layout */}
        <div className="footer-main">
          {/* Left Section - Brand & Contact */}
          <div className="footer-left">
            <motion.div 
              className="footer-brand"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="brand-icon">
                <FiCode size={20} />
              </div>
              <div className="brand-info">
                <h3 className="brand-name">Bijendra Mishra</h3>
                <p className="brand-title">AI & Full Stack Developer</p>
              </div>
            </motion.div>

            <div className="contact-info">
              <a 
                href="mailto:bijendramishra2002@gmail.com" 
                className="email-link"
              >
                <FiMail className="email-icon" />
                <span className="email-text">bijendramishra2002@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Middle Section - Quick Links */}
          <div className="footer-center">
            <div className="quick-links">
              <h4 className="section-title">Quick Links</h4>
              <div className="links-grid">
                <motion.a 
                  href="/about" 
                  className="nav-link"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="link-bullet">•</span>
                  About
                </motion.a>
                <motion.a 
                  href="/projects" 
                  className="nav-link"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="link-bullet">•</span>
                  Projects
                </motion.a>
                <motion.a 
                  href="/skills" 
                  className="nav-link"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="link-bullet">•</span>
                  Skills
                </motion.a>
                <motion.a 
                  href="/experience" 
                  className="nav-link"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="link-bullet">•</span>
                  Experience
                </motion.a>
              </div>
            </div>
          </div>

          {/* Right Section - Social & Stats */}
          <div className="footer-right">
            <div className="social-section">
              <h4 className="section-title">Connect</h4>
              <div className="social-icons">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="social-icon"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 200,
                      damping: 10 
                    }}
                    whileHover={{ 
                      y: -3,
                      scale: 1.15,
                      boxShadow: `0 5px 15px ${social.color}40`
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <motion.div
              className="heart-beat"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FiHeart className="heart-icon" />
            </motion.div>
            <span className="copyright-text">
              © {currentYear} Bijendra Mishra. All rights reserved.
            </span>
          </div>

          <div className="footer-stats">
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.05 }}
            >
              <FiCoffee className="stat-icon" />
              <span className="stat-text">Fueled by coffee</span>
            </motion.div>
            <div className="stat-divider">•</div>
            <div className="stat-item">
              <span className="visitor-badge">
                <span className="visitor-dot"></span>
                {visitorCount.toLocaleString()} visitors
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            className="scroll-top-btn"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { type: "spring", stiffness: 200 }
            }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 5px 20px rgba(99, 102, 241, 0.4)"
            }}
            whileTap={{ scale: 0.9 }}
          >
            <FiArrowUp className="arrow-icon" />
            <span className="scroll-text">Top</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Decorative Elements */}
      <div className="footer-decoration">
        <div className="decoration-line"></div>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="decoration-dot"
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.footer>
  );
};

export default Footer;