import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProjectCard from '../components/ProjectCard';
import './Home.css';

export default function Home(){
  const data = useSelector(s => s.resume);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`home container-custom ${isVisible ? 'visible' : ''}`}>
      {/* Animated Background Elements */}
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <section className="hero">
        <div className="hero-left">
          <div className="hero-content">
            <div className="greeting">Hello, I'm</div>
            <h1 className="name-title">{data.name}</h1>
            <p className="lead">{data.summary}</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">{data.projects?.length || 0}+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat">
                <span className="stat-number">{data.experience?.length || 0}+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="stat-number">{data.skills?.length || 0}+</span>
                <span className="stat-label">Skills</span>
              </div>
            </div>
            <div className="cta">
              <a className="btn btn-primary" href={data.github} target="_blank" rel="noreferrer">
                <span>View GitHub</span>
                <span className="btn-icon"></span>
              </a>
              <a className="btn btn-secondary" href="/contact">
                <span>Get In Touch</span>
                <span className="btn-icon"></span>
              </a>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="photo-container">
            <img 
              src={data.profilePhoto || "/assets/profile-placeholder.png"} 
              alt={data.name} 
              className="hero-photo" 
            />
            <div className="photo-frame"></div>
            <div className="floating-elements">
              <div className="floating-element element-1">💻</div>
              <div className="floating-element element-2">⚡</div>
              <div className="floating-element element-3">🎯</div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Preview Section */}
      <section className="skills-preview">
        <div className="skills-container">
          <h3>Tech Stack</h3>
          <div className="skills-grid">
            {data.skills?.slice(0, 8).map((skill, index) => (
              <div key={skill} className="skill-item" style={{animationDelay: `${index * 0.1}s`}}>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="projects">
        <div className="section-header">
          <h2>Featured Projects</h2>
          <p>Check out some of my recent work</p>
        </div>
        <div className="project-grid">
          {data.projects.map((p, index) => (
            <ProjectCard key={p.id} project={p} delay={index * 0.1} />
          ))}
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="contact-cta">
        <div className="cta-card">
          <h3>Let's Work Together</h3>
          <p>Have a project in mind? I'd love to hear about it.</p>
          <a className="btn btn-large" href="/contact">
            Start a Conversation
          </a>
        </div>
      </section>
    </div>
  );
}