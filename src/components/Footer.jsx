import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'; // DON'T rename it
import { 
  FiMail, 
  FiGithub, 
  FiLinkedin, 
  FiTwitter, 
  FiHeart,
  FiArrowUp,
  FiCode,
  FiCoffee
} from 'react-icons/fi';
import { SiLeetcode, SiHackerrank, SiDevdotto } from 'react-icons/si';
import './Footer.css';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com', label: 'GitHub', color: '#333' },
    { icon: <FiLinkedin />, url: 'https://linkedin.com', label: 'LinkedIn', color: '#0077b5' },
    { icon: <SiLeetcode />, url: 'https://leetcode.com', label: 'LeetCode', color: '#f89f1b' },
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
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <motion.footer // ✅ Use motion directly
      className="footer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="footer-container">
        
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-brand">
            <motion.div // ✅ Use motion directly
              className="footer-logo"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <FiCode size={32} />
            </motion.div>
            <div className="footer-brand-text">
              <h3 className="footer-name">Bijendra Mishra</h3>
              <p className="footer-tagline">AI & Full Stack Developer</p>
            </div>
          </div>

          <div className="footer-newsletter">
            <h4 className="newsletter-title">Stay Updated</h4>
            <p className="newsletter-desc">Get the latest tech insights</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="newsletter-input"
              />
              <motion.button // ✅ Use motion directly
                type="submit"
                className="newsletter-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Middle Section - Links */}
        <div className="footer-middle">
          <div className="footer-links-section">
            <h4 className="links-title">Quick Links</h4>
            <div className="footer-links">
              <a href="/about" className="footer-link">About Me</a>
              <a href="/projects" className="footer-link">Projects</a>
              <a href="/skills" className="footer-link">Skills</a>
              <a href="/experience" className="footer-link">Experience</a>
              <a href="/contact" className="footer-link">Contact</a>
            </div>
          </div>

          <div className="footer-links-section">
            <h4 className="links-title">Technologies</h4>
            <div className="footer-links">
              <span className="tech-tag">React</span>
              <span className="tech-tag">Node.js</span>
              <span className="tech-tag">Python</span>
              <span className="tech-tag">AI/ML</span>
              <span className="tech-tag">MongoDB</span>
              <span className="tech-tag">Docker</span>
            </div>
          </div>

          <div className="footer-links-section">
            <h4 className="links-title">Connect</h4>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <motion.a // ✅ Use motion directly
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="social-icon"
                  whileHover={{ 
                    y: -5,
                    scale: 1.1,
                    backgroundColor: social.color 
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ '--hover-color': social.color }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="copyright">
            <motion.div // ✅ Use motion directly
              className="heart-icon"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <FiHeart />
            </motion.div>
            <span>
              © {currentYear} Made with passion by Bijendra Mishra
            </span>
          </div>

          <div className="footer-contact">
            <a href="mailto:bijendramishra2002@gmail.com" className="contact-email">
              <FiMail />
              bijendramishra2002@gmail.com
            </a>
          </div>

          <div className="footer-extra">
            <span className="coffee">
              <FiCoffee /> Fueled by coffee
            </span>
            <span className="visitor-count">
              Visitors: {Math.floor(Math.random() * 10000) + 1000}
            </span>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {isVisible && (
            <motion.button // ✅ Use motion directly
              className="scroll-top"
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiArrowUp />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Particles */}
      <div className="footer-particles">
        {[...Array(15)].map((_, i) => (
          <motion.div // ✅ Use motion directly
            key={i}
            className="particle"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
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