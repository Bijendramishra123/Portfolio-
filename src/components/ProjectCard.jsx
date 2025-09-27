import React, { useState, useEffect } from 'react';
import './ProjectCard.css';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project, delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Generate a unique gradient based on project title
  const getGradient = (title) => {
    const colors = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
      'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)'
    ];
    
    // Simple hash function to get consistent color for same project
    const hash = title.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <article 
      className={`project-card ${isVisible ? 'visible' : ''} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ background: getGradient(project.title) }}
    >
      {/* Animated Background Elements */}
      <div className="color-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
        <div className="bg-shine"></div>
      </div>
      
      {/* Project Content */}
      <div className="project-content">
        {/* Header with Title and Tech */}
        <div className="project-head">
          <div className="title-wrapper">
            <h3 className="project-title">{project.title}</h3>
            {project.featured && (
              <div className="featured-badge">
                <span className="featured-star">⭐</span>
                Featured
              </div>
            )}
          </div>
          <div className="badges">
            {project.tech?.slice(0,4).map((t, index) => (
              <span 
                key={t} 
                className="tech"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {t}
              </span>
            ))}
            {project.tech && project.tech.length > 4 && (
              <span className="tech-more">+{project.tech.length - 4}</span>
            )}
          </div>
        </div>
        
        {/* Project Metadata */}
        <div className="project-meta">
          {project.duration && (
            <div className="meta-item">
              <span className="meta-icon">⏱️</span>
              <span className="meta-text">{project.duration}</span>
            </div>
          )}
          {project.status && (
            <div className="meta-item">
              <span className="meta-icon">📊</span>
              <span className="meta-text">{project.status}</span>
            </div>
          )}
          {project.category && (
            <div className="meta-item">
              <span className="meta-icon">📁</span>
              <span className="meta-text">{project.category}</span>
            </div>
          )}
        </div>
        
        {/* Project Description */}
        <div className="description-container">
          <p className="project-desc">{project.description}</p>
          <div className="read-more">Read more...</div>
        </div>
        
        {/* Action Buttons */}
        <div className="project-actions">
          <Link to={`/projects/${project.slug}`} className="btn btn-primary">
            <span className="btn-text">View Details</span>
            <span className="btn-icon"></span>
          </Link>
          {project.github && (
            <a 
              className="btn btn-secondary" 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span className="btn-text">Code</span>
              <span className="btn-icon">💻</span>
            </a>
          )}
          {project.demo && (
            <a 
              className="btn btn-tertiary" 
              href={project.demo} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span className="btn-text">Live Demo</span>
              <span className="btn-icon"></span>
            </a>
          )}
        </div>
        
        {/* Footer with Tags */}
        <div className="project-footer">
          {project.tags && (
            <div className="project-tags">
              {project.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={tag} 
                  className="tag"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          {/* View Count/Likes */}
          <div className="project-stats">
            {project.views && (
              <span className="stat">
                 {project.views}
              </span>
            )}
            {project.likes && (
              <span className="stat">
                 {project.likes}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Hover Effect Elements */}
      <div className="hover-effects">
        <div className="effect-circle circle-1"></div>
        <div className="effect-circle circle-2"></div>
        <div className="effect-circle circle-3"></div>
      </div>
    </article>
  );
}