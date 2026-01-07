// src/pages/ProjectPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProjectPage.css";

export default function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const data = useSelector((s) => s.resume);
  const contentRef = useRef(null);

  const project = data.projects.find((p) => p.slug === slug);

  const [isVisible, setIsVisible] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [videoLoading, setVideoLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!project) {
    return (
      <div className="project-not-found">
        <div className="not-found-content animate-fade-in">
          <h2 className="not-found-title">🚧 Project Not Found</h2>
          <p className="not-found-desc">
            The project you're looking for doesn't exist or has been moved.
          </p>
          <button 
            onClick={() => navigate("/projects")} 
            className="back-home-btn"
          >
            ← Back to Projects
          </button>
        </div>
      </div>
    );
  }

  /* ========= VIDEO URL (SAFE) ========= */
  const rawVideoSrc = project.video || "";
  const videoSrc =
    rawVideoSrc && !rawVideoSrc.startsWith("http")
      ? `${window.location.origin}${import.meta.env.BASE_URL}${rawVideoSrc.replace(/^\/+/, "")}`
      : rawVideoSrc;

  const isYouTubeEmbed =
    videoSrc.includes("youtube.com") ||
    videoSrc.includes("youtube-nocookie.com");

  const isLocalVideo =
    videoSrc.endsWith(".mp4") || videoSrc.endsWith(".webm");

  const currentIndex = data.projects.indexOf(project);
  const nextProject = data.projects[(currentIndex + 1) % data.projects.length];
  const prevProject =
    data.projects[(currentIndex - 1 + data.projects.length) %
      data.projects.length];

  const handleNavigation = (direction) => {
    if (contentRef.current) {
      contentRef.current.style.opacity = "0";
      contentRef.current.style.transform = "translateY(20px)";
    }

    setTimeout(() => {
      navigate(`/projects/${direction === "next" ? nextProject.slug : prevProject.slug}`);
    }, 300);
  };

  return (
    <div className={`project-page ${isVisible ? "visible" : ""} ${scrolled ? "scrolled" : ""}`}>
      {/* FLOATING HEADER */}
      <header className={`project-header ${scrolled ? "header-scrolled" : ""}`}>
        <div className="header-container">
          <button 
            onClick={() => navigate("/projects")} 
            className="back-btn"
          >
            <span className="btn-icon">←</span>
            <span className="btn-text">All Projects</span>
          </button>

          <h2 className="header-title">{project.title}</h2>

          <div className="nav-btns">
            <button 
              onClick={() => handleNavigation("prev")}
              className="nav-btn prev-btn"
            >
              <span className="nav-icon">←</span>
              <span className="nav-text">Prev</span>
            </button>
            <button 
              onClick={() => handleNavigation("next")}
              className="nav-btn next-btn"
            >
              <span className="nav-text">Next</span>
              <span className="nav-icon">→</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div 
        ref={contentRef}
        className="project-content animate-slide-up"
      >
        {/* HERO SECTION */}
        <div className="project-hero">
          <div className="hero-overlay">
            <div className="hero-content">
              <div className="hero-tags">
                {project.tech?.slice(0, 3).map((t, i) => (
                  <span key={i} className="tech-tag">{t}</span>
                ))}
                {project.tech?.length > 3 && (
                  <span className="tech-tag">+{project.tech.length - 3} more</span>
                )}
              </div>
              <h1 className="project-title-main">{project.title}</h1>
              <p className="project-subtitle">
                {project.overview || project.description}
              </p>
            </div>
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="project-layout">
          {/* LEFT CONTENT */}
          <div className="project-info">
            <div className="info-card animate-card">
              <h3 className="section-title">
                <span className="title-icon">📋</span>
                Project Details
              </h3>
              
              {project.fullDescription && (
                <div className="detail-section">
                  <h4>Description</h4>
                  <p className="full-desc">{project.fullDescription}</p>
                </div>
              )}

              {project.features?.length > 0 && (
                <div className="detail-section">
                  <h4>Key Features</h4>
                  <ul className="features-list">
                    {project.features.map((f, i) => (
                      <li key={i} className="feature-item">
                        <span className="feature-icon">✓</span>
                        <span className="feature-text">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="detail-section">
                <h4>Technologies Used</h4>
                <div className="tech-stack">
                  {project.tech?.map((t, i) => (
                    <div key={i} className="tech-item">
                      <span className="tech-bubble">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* LINKS CARD */}
            <div className="links-card animate-card">
              <h3 className="section-title">
                <span className="title-icon">🔗</span>
                Project Links
              </h3>
              <div className="links-grid">
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="project-link github-link"
                  >
                    <span className="link-icon">💻</span>
                    <div className="link-content">
                      <span className="link-title">Source Code</span>
                      <span className="link-subtitle">View on GitHub</span>
                    </div>
                    <span className="link-arrow">↗</span>
                  </a>
                )}
                {project.live && (
                  <a 
                    href={project.live} 
                    target="_blank" 
                    rel="noreferrer"
                    className="project-link live-link"
                  >
                    <span className="link-icon">🚀</span>
                    <div className="link-content">
                      <span className="link-title">Live Demo</span>
                      <span className="link-subtitle">Visit Website</span>
                    </div>
                    <span className="link-arrow">↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT VIDEO/DEMO SECTION */}
          <div className="project-media">
            <div className="media-card animate-card">
              <div className="media-header">
                <h3 className="section-title">
                  <span className="title-icon">🎥</span>
                  Project Demo
                </h3>
                {project.videoDuration && (
                  <span className="duration-badge">
                    ⏱️ {project.videoDuration}
                  </span>
                )}
              </div>

              <div className="media-container">
                {videoSrc ? (
                  <>
                    {isYouTubeEmbed ? (
                      <div className="video-wrapper">
                        <iframe
                          src={videoSrc}
                          title={project.title}
                          allowFullScreen
                          onLoad={() => setVideoLoading(false)}
                          className="youtube-embed"
                        />
                      </div>
                    ) : isLocalVideo ? (
                      <div className="video-wrapper">
                        <video
                          controls
                          preload="metadata"
                          onLoadedData={() => setVideoLoading(false)}
                          className="local-video"
                          poster={project.thumbnail}
                        >
                          <source src={videoSrc} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ) : (
                      <div className="unsupported-format">
                        <span className="format-icon">⚠️</span>
                        <p>Unsupported video format</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="no-video-placeholder">
                    <span className="placeholder-icon">📹</span>
                    <p>No demo video available</p>
                    <p className="placeholder-subtitle">Check the live link for project demo</p>
                  </div>
                )}

                {videoLoading && videoSrc && (
                  <div className="video-loading">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Loading video...</p>
                  </div>
                )}
              </div>

              {/* ADDITIONAL MEDIA (IF AVAILABLE) */}
              {project.images && project.images.length > 0 && (
                <div className="image-gallery">
                  <h4 className="gallery-title">📸 Project Screenshots</h4>
                  <div className="gallery-grid">
                    {project.images.slice(0, 3).map((img, index) => (
                      <div 
                        key={index} 
                        className="gallery-item"
                        onClick={() => setActiveImage(index)}
                      >
                        <img 
                          src={img} 
                          alt={`${project.title} screenshot ${index + 1}`}
                          loading="lazy"
                        />
                        {index === 0 && project.images.length > 3 && (
                          <div className="more-overlay">
                            +{project.images.length - 3} more
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* PROJECT STATS (OPTIONAL) */}
            {(project.duration || project.status || project.teamSize) && (
              <div className="stats-card animate-card">
                <h3 className="section-title">
                  <span className="title-icon">📊</span>
                  Project Stats
                </h3>
                <div className="stats-grid">
                  {project.duration && (
                    <div className="stat-item">
                      <span className="stat-icon">⏳</span>
                      <div className="stat-content">
                        <span className="stat-value">{project.duration}</span>
                        <span className="stat-label">Duration</span>
                      </div>
                    </div>
                  )}
                  {project.status && (
                    <div className="stat-item">
                      <span className="stat-icon">
                        {project.status === 'Completed' ? '✅' : 
                         project.status === 'In Progress' ? '🔄' : '📋'}
                      </span>
                      <div className="stat-content">
                        <span className="stat-value">{project.status}</span>
                        <span className="stat-label">Status</span>
                      </div>
                    </div>
                  )}
                  {project.teamSize && (
                    <div className="stat-item">
                      <span className="stat-icon">👥</span>
                      <div className="stat-content">
                        <span className="stat-value">{project.teamSize}</span>
                        <span className="stat-label">Team Size</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER NAVIGATION */}
      <footer className="project-footer">
        <div className="footer-container">
          <button 
            onClick={() => handleNavigation("prev")}
            className="footer-nav prev-nav"
          >
            <span className="footer-nav-icon">←</span>
            <div className="footer-nav-content">
              <span className="nav-label">Previous Project</span>
              <span className="nav-project">{prevProject.title}</span>
            </div>
          </button>

          <button 
            onClick={() => navigate("/projects")}
            className="footer-home"
          >
            <span className="home-icon">🏠</span>
            <span className="home-text">All Projects</span>
          </button>

          <button 
            onClick={() => handleNavigation("next")}
            className="footer-nav next-nav"
          >
            <div className="footer-nav-content">
              <span className="nav-label">Next Project</span>
              <span className="nav-project">{nextProject.title}</span>
            </div>
            <span className="footer-nav-icon">→</span>
          </button>
        </div>
      </footer>

      {/* BACK TO TOP */}
      {scrolled && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="back-to-top"
        >
          ↑
        </button>
      )}
    </div>
  );
}