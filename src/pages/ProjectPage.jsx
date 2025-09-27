// src/pages/ProjectPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProjectPage.css";

export default function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const data = useSelector((s) => s.resume);
  const project = data.projects.find((p) => p.slug === slug);
  const [isVisible, setIsVisible] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [videoLoading, setVideoLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="project-not-found container-custom">
        <div className="not-found-content">
          <h1>🚧 Project Not Found</h1>
          <p>The project you're looking for doesn't exist or has been moved.</p>
          <button onClick={() => navigate('/projects')} className="btn btn-primary">
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const videoSrc = project.video || "";
  const isYouTubeEmbed =
    typeof videoSrc === "string" && (videoSrc.includes("youtube.com") || videoSrc.includes("youtube-nocookie.com"));
  const isLocalVideo =
    typeof videoSrc === "string" && (videoSrc.endsWith(".mp4") || videoSrc.endsWith(".webm") || videoSrc.startsWith("/"));

  const nextProject = data.projects[(data.projects.indexOf(project) + 1) % data.projects.length];
  const prevProject = data.projects[(data.projects.indexOf(project) - 1 + data.projects.length) % data.projects.length];

  return (
    <div className={`project-page container-custom ${isVisible ? 'visible' : ''}`}>
      {/* Background Elements */}
      <div className="project-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>

      {/* Navigation Header */}
      <header className="project-header">
        <button onClick={() => navigate('/projects')} className="back-btn">
          <span className="back-icon">←</span>
          Back to Projects
        </button>
        <div className="project-nav">
          <button onClick={() => navigate(`/projects/${prevProject.slug}`)} className="nav-btn prev">
            ← Previous
          </button>
          <button onClick={() => navigate(`/projects/${nextProject.slug}`)} className="nav-btn next">
            Next →
          </button>
        </div>
      </header>

      <div className="project-layout">
        {/* Left side - Project Details */}
        <div className="project-info">
          {/* Project Header */}
          <div className="project-hero">
            <div className="project-title-section">
              <h1 className="project-title">{project.title}</h1>
              {project.featured && (
                <span className="featured-tag">⭐ Featured Project</span>
              )}
            </div>
            
            <div className="project-meta-grid">
              {project.duration && (
                <div className="meta-item">
                  <span className="meta-icon">⏱️</span>
                  <div>
                    <span className="meta-label">Duration</span>
                    <span className="meta-value">{project.duration}</span>
                  </div>
                </div>
              )}
              
              {project.status && (
                <div className="meta-item">
                  <span className="meta-icon">📊</span>
                  <div>
                    <span className="meta-label">Status</span>
                    <span className="meta-value">{project.status}</span>
                  </div>
                </div>
              )}
              
              {project.category && (
                <div className="meta-item">
                  <span className="meta-icon">📁</span>
                  <div>
                    <span className="meta-label">Category</span>
                    <span className="meta-value">{project.category}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tech Stack */}
          <section className="tech-section">
            <h3>🛠️ Tech Stack</h3>
            <div className="tech-badges">
              {project.tech?.map((tech, index) => (
                <span 
                  key={tech} 
                  className="tech-badge"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Project Description */}
          <section className="description-section">
            <h3>📖 Project Overview</h3>
            <p className="project-description">
              {project.overview || project.description}
            </p>
          </section>

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <section className="features-section">
              <h3>✨ Key Features</h3>
              <div className="features-grid">
                {project.features.map((feature, index) => (
                  <div key={index} className="feature-card">
                    <span className="feature-icon">✓</span>
                    <span className="feature-text">{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Project Links */}
          <section className="links-section">
            <h3>🔗 Project Links</h3>
            <div className="project-links">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-btn github">
                  <span className="link-icon">💻</span>
                  <span className="link-text">View Code</span>
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="link-btn live">
                  <span className="link-icon">🚀</span>
                  <span className="link-text">Live Demo</span>
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="link-btn demo">
                  <span className="link-icon">🎯</span>
                  <span className="link-text">Try Demo</span>
                </a>
              )}
            </div>
          </section>

          {/* Additional Notes */}
          {project.notes && (
            <section className="notes-section">
              <h3>📝 Project Notes</h3>
              <div className="notes-content">
                <p>{project.notes}</p>
              </div>
            </section>
          )}

          {/* Project Gallery */}
          {project.images && project.images.length > 0 && (
            <section className="gallery-section">
              <h3>🖼️ Project Gallery</h3>
              <div className="gallery">
                <div className="main-image">
                  <img 
                    src={project.images[activeImage]} 
                    alt={`${project.title} screenshot ${activeImage + 1}`}
                  />
                </div>
                {project.images.length > 1 && (
                  <div className="image-thumbnails">
                    {project.images.map((image, index) => (
                      <button
                        key={index}
                        className={`thumbnail ${index === activeImage ? 'active' : ''}`}
                        onClick={() => setActiveImage(index)}
                      >
                        <img src={image} alt={`Thumbnail ${index + 1}`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}
        </div>

        {/* Right side - Video Demo */}
        <div className="project-media">
          <div className="media-card">
            <div className="media-header">
              <h3>🎥 Project Demo</h3>
              {videoLoading && videoSrc && (
                <div className="video-loading">
                  <div className="loading-spinner"></div>
                  <span>Loading video...</span>
                </div>
              )}
            </div>
            
            <div className="media-content">
              {videoSrc ? (
                isYouTubeEmbed ? (
                  <div className="video-container">
                    <iframe
                      src={videoSrc}
                      title={project.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      onLoad={() => setVideoLoading(false)}
                    />
                  </div>
                ) : isLocalVideo ? (
                  <div className="video-container">
                    <video 
                      controls 
                      preload="metadata" 
                      onLoadedData={() => setVideoLoading(false)}
                    >
                      <source src={videoSrc} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <div className="no-media">
                    <div className="no-media-icon">📹</div>
                    <p>Video format not supported</p>
                  </div>
                )
              ) : (
                <div className="no-media">
                  <div className="no-media-icon">🎬</div>
                  <h4>No Demo Video Available</h4>
                  <p>Check out the live demo or GitHub repository instead!</p>
                </div>
              )}
            </div>
          </div>

          {/* Project Stats */}
          <div className="stats-card">
            <h4>📈 Project Stats</h4>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value">{project.tech?.length || 0}</span>
                <span className="stat-label">Technologies</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{project.features?.length || 0}</span>
                <span className="stat-label">Features</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{project.duration || 'N/A'}</span>
                <span className="stat-label">Duration</span>
              </div>
            </div>
          </div>

          {/* Related Projects */}
          <div className="related-projects">
            <h4>🔗 Related Projects</h4>
            <div className="related-list">
              {data.projects
                .filter(p => p.slug !== project.slug)
                .slice(0, 3)
                .map(relatedProject => (
                  <button
                    key={relatedProject.slug}
                    className="related-item"
                    onClick={() => navigate(`/projects/${relatedProject.slug}`)}
                  >
                    <span className="related-title">{relatedProject.title}</span>
                    <span className="related-arrow">→</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <footer className="project-footer">
        <button onClick={() => navigate(`/projects/${prevProject.slug}`)} className="footer-nav prev">
          <span className="nav-icon">←</span>
          <div className="nav-content">
            <span className="nav-label">Previous Project</span>
            <span className="nav-title">{prevProject.title}</span>
          </div>
        </button>
        
        <button onClick={() => navigate('/projects')} className="footer-nav back">
          <span className="nav-icon">🏠</span>
          All Projects
        </button>
        
        <button onClick={() => navigate(`/projects/${nextProject.slug}`)} className="footer-nav next">
          <div className="nav-content">
            <span className="nav-label">Next Project</span>
            <span className="nav-title">{nextProject.title}</span>
          </div>
          <span className="nav-icon">→</span>
        </button>
      </footer>
    </div>
  );
}