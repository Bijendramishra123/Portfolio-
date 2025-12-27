import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiMail, 
  FiPhone, 
  FiLinkedin, 
  FiGithub, 
  FiUser, 
  FiMessageSquare,
  FiSend,
  FiCalendar,
  FiMessageCircle,
  FiCheckCircle,
  FiClock
} from 'react-icons/fi';
import { useSelector } from 'react-redux';
import './Contact.css';

export default function Contact() {
  const data = useSelector(s => s.resume);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setForm({ name: '', email: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: <FiMail />,
      title: 'Email Me',
      value: data.email,
      link: `mailto:${data.email}`,
      description: 'Typically replies within 2 hours',
      color: '#FF6B6B'
    },
    {
      icon: <FiPhone />,
      title: 'Call Me',
      value: data.phone,
      link: `tel:${data.phone}`,
      description: 'Available Mon-Fri, 9AM-6PM',
      color: '#4ECDC4'
    },
    {
      icon: <FiLinkedin />,
      title: 'LinkedIn',
      value: 'Connect Professionally',
      link: data.linkedin,
      description: 'Let\'s network and collaborate',
      color: '#0077B5'
    },
    {
      icon: <FiGithub />,
      title: 'GitHub',
      value: 'View My Work',
      link: data.github,
      description: 'Check out my latest projects',
      color: '#333'
    }
  ];

  const stats = [
    { number: '24/7', label: 'Availability', icon: <FiClock />, color: '#FFD166' },
    { number: '2h', label: 'Avg Response', icon: <FiSend />, color: '#06D6A0' },
    { number: '100%', label: 'Satisfaction', icon: <FiCheckCircle />, color: '#118AB2' }
  ];

  return (
    <div className="contact-page">
      {/* Animated Background */}
      <div className="contact-background">
        <div className="bg-gradient gradient-1"></div>
        <div className="bg-gradient gradient-2"></div>
        <div className="bg-gradient gradient-3"></div>
        <div className="floating-shapes">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="floating-shape"></div>
          ))}
        </div>
      </div>

      <div className="contact-container">
        {/* Header Section */}
        <motion.section
          className="contact-header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="header-content">
            <motion.div
              className="profile-badge"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div className="badge-inner">💬</div>
            </motion.div>

            <div className="header-text">
              <h1 className="page-title">
                <span className="title-text">Let's</span>
                <span className="title-highlight">Connect</span>
              </h1>
              <p className="page-subtitle">
                Ready to bring your ideas to life? Let's start a conversation.
              </p>
            </div>

            <div className="header-stats">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="stat"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div 
                    className="stat-icon"
                    style={{ backgroundColor: stat.color }}
                  >
                    {stat.icon}
                  </div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Success Message */}
        {isSubmitted && (
          <motion.div
            className="success-message glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="success-icon">
              <FiCheckCircle />
            </div>
            <div className="success-content">
              <h3>Message Sent Successfully!</h3>
              <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <div className="contact-main">
          {/* Left Side - Contact Info */}
          <div className="contact-info-section">
            <motion.div
              className="contact-info-card glass-card"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="card-header">
                <h2 className="card-title">
                  <FiMessageCircle className="title-icon" />
                  Get In Touch
                </h2>
                <p className="card-subtitle">
                  I'm always open to discussing new opportunities and interesting projects.
                </p>
              </div>

              <div className="contact-methods">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-method"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div 
                      className="method-icon"
                      style={{ backgroundColor: info.color }}
                    >
                      {info.icon}
                    </div>
                    <div className="method-content">
                      <h4 className="method-title">{info.title}</h4>
                      <span className="method-value">{info.value}</span>
                      <p className="method-description">{info.description}</p>
                    </div>
                    <div className="method-arrow">→</div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Chat CTA */}
            <motion.div
              className="quick-chat-card glass-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="cta-title">
                <FiCalendar className="title-icon" />
                Prefer a Quick Chat?
              </h3>
              <p className="cta-description">
                Schedule a 15-minute discovery call to discuss your project requirements.
              </p>
              <div className="cta-buttons">
                <motion.a
                  href={`https://calendly.com/${data.email.split('@')[0]}/15min`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiCalendar />
                  <span>Schedule a Call</span>
                </motion.a>
                <motion.a
                  href={`https://wa.me/${data.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiMessageSquare />
                  <span>WhatsApp Me</span>
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Contact Form */}
          <motion.div
            className="contact-form-section"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="contact-form-card glass-card">
              <div className="form-header">
                <h2 className="form-title">
                  <FiSend className="title-icon" />
                  Send a Message
                </h2>
                <p className="form-subtitle">
                  Fill out the form below and I'll get back to you ASAP
                </p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    <FiUser className="label-icon" />
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <FiMail className="label-icon" />
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={form.email}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    <FiMessageSquare className="label-icon" />
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Tell me about your project or inquiry..."
                    rows="6"
                    value={form.message}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="form-textarea"
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="btn-icon" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </div>

            {/* Form Stats */}
            <div className="form-stats">
              <div className="form-stat">
                <div className="stat-dot dot-1"></div>
                <div className="stat-content">
                  <h4>Privacy First</h4>
                  <p>Your data is secure and never shared</p>
                </div>
              </div>
              <div className="form-stat">
                <div className="stat-dot dot-2"></div>
                <div className="stat-content">
                  <h4>Quick Response</h4>
                  <p>Typically reply within 2 hours</p>
                </div>
              </div>
              <div className="form-stat">
                <div className="stat-dot dot-3"></div>
                <div className="stat-content">
                  <h4>No Spam</h4>
                  <p>Only relevant communication</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}