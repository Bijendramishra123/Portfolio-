import React, {useState, useEffect} from 'react';
import './Contact.css';
import { useSelector } from 'react-redux';

export default function Contact(){
  const data = useSelector(s => s.resume);
  const [form, setForm] = useState({name:'', email:'', message:''});
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
    setForm({name: '', email: '', message: ''});
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleInputChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  return (
    <div className={`contact container-custom ${isVisible ? 'visible' : ''}`}>
      {/* Animated Background */}
      <div className="contact-background">
        <div className="bg-particle particle-1"></div>
        <div className="bg-particle particle-2"></div>
        <div className="bg-particle particle-3"></div>
        <div className="bg-particle particle-4"></div>
      </div>

      <div className="contact-content">
        {/* Header Section */}
        <section className="contact-header">
          <div className="header-content">
            <h1 className="page-title">Let's Talk</h1>
            <div className="title-underline"></div>
            <p className="page-subtitle">Ready to bring your ideas to life? Let's start a conversation.</p>
          </div>
        </section>

        {/* Success Message */}
        {isSubmitted && (
          <div className="success-message">
            <div className="success-icon">✅</div>
            <div className="success-content">
              <h3>Message Sent Successfully!</h3>
              <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
            </div>
          </div>
        )}

        <div className="contact-main">
          <div className="contact-grid">
            {/* Contact Information Card */}
            <div className="contact-info-card">
              <div className="card-header">
                <h2>Get In Touch</h2>
                <p>I'm always open to discussing new opportunities and interesting projects.</p>
              </div>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">📧</div>
                  <div className="method-content">
                    <h4>Email Me</h4>
                    <a href={`mailto:${data.email}`} className="method-link">{data.email}</a>
                    <p>Typically replies within 2 hours</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">📱</div>
                  <div className="method-content">
                    <h4>Call Me</h4>
                    <a href={`tel:${data.phone}`} className="method-link">{data.phone}</a>
                    <p>Available Mon-Fri, 9AM-6PM</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">💼</div>
                  <div className="method-content">
                    <h4>LinkedIn</h4>
                    <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="method-link">Connect Professionally</a>
                    <p>Let's network and collaborate</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="method-icon">💻</div>
                  <div className="method-content">
                    <h4>GitHub</h4>
                    <a href={data.github} target="_blank" rel="noopener noreferrer" className="method-link">View My Work</a>
                    <p>Check out my latest projects</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="contact-stats">
                <div className="stat">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Availability</div>
                </div>
                <div className="stat">
                  <div className="stat-number">2h</div>
                  <div className="stat-label">Avg Response</div>
                </div>
                <div className="stat">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-card">
              <div className="form-header">
                <h2>Send a Message</h2>
                <p>Fill out the form below and I'll get back to you ASAP</p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input 
                    id="name"
                    name="name"
                    type="text" 
                    required 
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                  <div className="input-icon">👤</div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input 
                    id="email"
                    name="email"
                    type="email" 
                    required 
                    placeholder="Enter your email address"
                    value={form.email}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                  <div className="input-icon">📧</div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message *</label>
                  <textarea 
                    id="message"
                    name="message"
                    required 
                    placeholder="Tell me about your project or inquiry..."
                    rows="5"
                    value={form.message}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  ></textarea>
                  <div className="input-icon"></div>
                </div>

                <button 
                  type="submit" 
                  className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <span className="btn-icon"></span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Additional Contact CTA */}
        <div className="contact-cta">
          <div className="cta-content">
            <h3>Prefer a Quick Chat?</h3>
            <p>Schedule a 15-minute discovery call to discuss your project requirements.</p>
            <div className="cta-buttons">
              <a href={`https://calendly.com/${data.email.split('@')[0]}/15min`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <span>Schedule a Call</span>
                <span className="btn-icon">📅</span>
              </a>
              <a href={`https://wa.me/${data.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <span>WhatsApp Me</span>
                <span className="btn-icon"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}