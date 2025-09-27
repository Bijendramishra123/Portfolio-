import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Profile.css';

export default function Profile(){
  const data = useSelector(s => s.resume);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`profile container-custom ${isVisible ? 'visible' : ''}`}>
      {/* Animated Background */}
      <div className="profile-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>

      <div className="profile-content">
        {/* Header Section */}
        <section className="profile-header">
          <div className="header-content">
            <h1 className="page-title">My Profile</h1>
            <div className="title-underline"></div>
            <p className="page-subtitle">Get to know me better</p>
          </div>
        </section>

        {/* Main Profile Card */}
        <div className="profile-main-card">
          <div className="profile-grid">
            {/* Photo Section */}
            <div className="photo-section">
              <div className="photo-container">
                <img 
                  src={data.profilePhoto || "/assets/profile-placeholder.png"} 
                  alt={data.name} 
                  className="profile-photo"
                />
                <div className="photo-overlay">
                  <div className="photo-badge">👋</div>
                </div>
                <div className="photo-frame"></div>
                <div className="status-indicator online"></div>
              </div>
              
              {/* Quick Stats */}
              <div className="quick-stats">
                <div className="stat-circle">
                  <span className="stat-number">{data.projects?.length || 0}+</span>
                  <span className="stat-label">Projects</span>
                </div>
                <div className="stat-circle">
                  <span className="stat-number">{data.experience?.length || 0}+</span>
                  <span className="stat-label">Years Exp</span>
                </div>
                <div className="stat-circle">
                  <span className="stat-number">{data.skills?.length || 0}+</span>
                  <span className="stat-label">Skills</span>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="info-section">
              <div className="profile-basic">
                <h1 className="profile-name">{data.name}</h1>
                <p className="profile-title">{data.title || "Professional Developer"}</p>
                <div className="rating">
                  <div className="stars">
                    {'⭐'.repeat(5)}
                  </div>
                  <span className="rating-text">Top Rated Professional</span>
                </div>
              </div>

              {/* Bio Section */}
              <div className="bio-section">
                <p className="profile-bio">{data.summary}</p>
              </div>

              {/* Tabs Navigation */}
              <div className="tabs-navigation">
                <button 
                  className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
                  onClick={() => setActiveTab('personal')}
                >
                  📱 Personal Info
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'professional' ? 'active' : ''}`}
                  onClick={() => setActiveTab('professional')}
                >
                  💼 Professional
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'social' ? 'active' : ''}`}
                  onClick={() => setActiveTab('social')}
                >
                  🌐 Social Links
                </button>
              </div>

              {/* Tab Content */}
              <div className="tab-content">
                {activeTab === 'personal' && (
                  <div className="tab-panel personal-info">
                    <h3>Personal Information</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-icon">📧</span>
                        <div className="info-content">
                          <label>Email</label>
                          <a href={`mailto:${data.email}`} className="info-value">{data.email}</a>
                        </div>
                      </div>
                      <div className="info-item">
                        <span className="info-icon">📱</span>
                        <div className="info-content">
                          <label>Phone</label>
                          <span className="info-value">{data.phone}</span>
                        </div>
                      </div>
                      <div className="info-item">
                        <span className="info-icon">📍</span>
                        <div className="info-content">
                          <label>Location</label>
                          <span className="info-value">{data.location}</span>
                        </div>
                      </div>
                      <div className="info-item">
                        <span className="info-icon">🎂</span>
                        <div className="info-content">
                          <label>Experience</label>
                          <span className="info-value">{data.experience?.length || 0}+ Years</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'professional' && (
                  <div className="tab-panel professional-info">
                    <h3>Professional Details</h3>
                    <div className="pro-grid">
                      <div className="pro-item">
                        <span className="pro-icon">💻</span>
                        <div>
                          <label>Current Role</label>
                          <span>{data.title || "Software Developer"}</span>
                        </div>
                      </div>
                      <div className="pro-item">
                        <span className="pro-icon">🎯</span>
                        <div>
                          <label>Specialization</label>
                          <span>Full Stack Development</span>
                        </div>
                      </div>
                      <div className="pro-item">
                        <span className="pro-icon">🚀</span>
                        <div>
                          <label>Projects Completed</label>
                          <span>{data.projects?.length || 0}+</span>
                        </div>
                      </div>
                      <div className="pro-item">
                        <span className="pro-icon">⭐</span>
                        <div>
                          <label>Skills</label>
                          <span>{data.skills?.length || 0}+ Technologies</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'social' && (
                  <div className="tab-panel social-links">
                    <h3>Connect With Me</h3>
                    <div className="social-grid">
                      <a href={data.github} target="_blank" rel="noopener noreferrer" className="social-card github">
                        <span className="social-icon">💻</span>
                        <span className="social-name">GitHub</span>
                        <span className="social-handle">@{data.github?.split('/').pop()}</span>
                      </a>
                      <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="social-card linkedin">
                        <span className="social-icon">💼</span>
                        <span className="social-name">LinkedIn</span>
                        <span className="social-handle">Professional Profile</span>
                      </a>
                      <a href={`mailto:${data.email}`} className="social-card email">
                        <span className="social-icon">📧</span>
                        <span className="social-name">Email</span>
                        <span className="social-handle">Send Message</span>
                      </a>
                      <a href="#" className="social-card portfolio">
                        <span className="social-icon">🌐</span>
                        <span className="social-name">Portfolio</span>
                        <span className="social-handle">View Work</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <a href="/contact" className="btn btn-primary">
                  <span>Hire Me</span>
                  <span className="btn-icon">💬</span>
                </a>
                <a href="/projects" className="btn btn-secondary">
                  <span>View Projects</span>
                  <span className="btn-icon"></span>
                </a>
                <a href={data.resume} download className="btn btn-outline">
                  <span>Download CV</span>
                  <span className="btn-icon">📄</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Preview */}
        <div className="skills-preview">
          <h3>Top Skills</h3>
          <div className="skills-tags">
            {data.skills?.slice(0, 8).map((skill, index) => (
              <span 
                key={skill} 
                className="skill-tag"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}