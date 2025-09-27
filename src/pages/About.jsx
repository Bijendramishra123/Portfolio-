import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './About.css';

export default function About(){
  const data = useSelector(s => s.resume);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`about container-custom ${isVisible ? 'visible' : ''}`}>
      {/* Animated Background */}
      <div className="about-background">
        <div className="bg-circle circle-1"></div>
        <div className="bg-circle circle-2"></div>
        <div className="bg-circle circle-3"></div>
      </div>

      <div className="about-content">
        {/* Header Section */}
        <section className="about-header">
          <div className="header-content">
            <h1 className="page-title">About Me</h1>
            <div className="title-underline"></div>
            <p className="page-subtitle">Get to know more about my journey and expertise</p>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="about-grid">
          {/* Profile Summary */}
          <div className="summary-card card">
            <div className="card-header">
              <div className="card-icon">👨‍💻</div>
              <h2>Professional Summary</h2>
            </div>
            <div className="card-content">
              <p className="summary-text">{data.summary}</p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="skills-card card">
            <div className="card-header">
              <div className="card-icon">⚡</div>
              <h2>Skills & Technologies</h2>
            </div>
            <div className="card-content">
              <div className="skills-grid">
                {data.skills.map((skill, index) => (
                  <div 
                    key={skill} 
                    className="skill-item"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <span className="skill-text">{skill}</span>
                    <div className="skill-progress">
                      <div 
                        className="skill-fill"
                        style={{ width: `${Math.min(80 + (index * 2), 95)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="education-card card">
            <div className="card-header">
              <div className="card-icon">🎓</div>
              <h2>Education</h2>
            </div>
            <div className="card-content">
              <div className="timeline">
                {data.education.map((ed, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-marker">
                      <div className="marker-dot"></div>
                      {idx !== data.education.length - 1 && <div className="timeline-line"></div>}
                    </div>
                    <div className="timeline-content">
                      <h3 className="degree">{ed.degree}</h3>
                      <p className="institution">{ed.institution}</p>
                      <div className="education-meta">
                        <span className="year-badge">{ed.year}</span>
                        {ed.gpa && <span className="gpa-badge">GPA: {ed.gpa}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="info-cards">
            {/* Experience Summary */}
            <div className="info-card experience-card">
              <div className="info-icon">💼</div>
              <div className="info-content">
                <h3>Experience</h3>
                <p className="info-number">{data.experience?.length || 0}+ Years</p>
                <p className="info-desc">Professional Experience</p>
              </div>
            </div>

            {/* Projects Summary */}
            <div className="info-card projects-card">
              <div className="info-icon"></div>
              <div className="info-content">
                <h3>Projects</h3>
                <p className="info-number">{data.projects?.length || 0}+</p>
                <p className="info-desc">Completed Projects</p>
              </div>
            </div>

            {/* Certifications */}
            <div className="info-card certs-card">
              <div className="info-icon">🏆</div>
              <div className="info-content">
                <h3>Certifications</h3>
                <p className="info-number">{data.certifications?.length || 0}+</p>
                <p className="info-desc">Professional Certs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="about-cta">
          <div className="cta-content">
            <h3>Want to work together?</h3>
            <p>I'm always open to discussing new opportunities and interesting projects.</p>
            <div className="cta-buttons">
              <a href="/contact" className="btn btn-primary">
                <span>Get In Touch</span>
                <span className="btn-icon"></span>
              </a>
              <a href={data.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <span>View GitHub</span>
                <span className="btn-icon">📂</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}