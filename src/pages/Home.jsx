// src/pages/Home.jsx
import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProjectCard from "../components/ProjectCard";
import profileFallback from "../styles/profile-placeholder.png.png";
import "./Home.css";

export default function Home() {
  const data = useSelector((s) => s.resume);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  // ✅ Updated image resolution logic for GitHub Pages
  const profileSrc = useMemo(() => {
    const p = data.profilePhoto;
    const base = import.meta.env.BASE_URL || "/";
    const cleanedBase = base.endsWith("/") ? base : base + "/";

    if (!p || typeof p !== "string") return profileFallback;
    if (p.startsWith("http")) return p;

    const cleanedPath = p.replace(/^\//, "");
    return `${cleanedBase}${cleanedPath}`;
  }, [data.profilePhoto]);

  return (
    <div className={`home container-custom ${isVisible ? "visible" : ""}`}>
      <div className="background-shapes" aria-hidden="true">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <section className="hero" role="region" aria-label="Hero">
        <div className="hero-left">
          <div className="hero-content">
            <div className="greeting">Hello, I'm</div>
            <h1 className="name-title">{data.name}</h1>
            <p className="lead">{data.summary}</p>

            <div className="hero-stats" aria-hidden="false">
              <div className="stat" title={`${data.projects?.length || 0} projects`}>
                <span className="stat-number">{data.projects?.length || 0}</span>
                <span className="stat-label">Projects</span>
              </div>

              <div className="stat" title={`${data.experience?.length || 0} experience entries`}>
                <span className="stat-number">{data.experience?.length || 0}</span>
                <span className="stat-label">Experience</span>
              </div>

              <div className="stat" title={`${data.skills?.length || 0} skills`}>
                <span className="stat-number">{data.skills?.length || 0}</span>
                <span className="stat-label">Skills</span>
              </div>
            </div>

            <div className="cta">
              <a
                className="btn btn-primary"
                href={data.github}
                target="_blank"
                rel="noreferrer"
                aria-label="View GitHub"
              >
                View GitHub
              </a>

              <Link to="/contact" className="btn btn-secondary" aria-label="Get in touch">
                Get in touch
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-right" aria-hidden={false}>
          <div className="photo-container" role="img" aria-label={`${data.name} profile`}>
            <img
              src={profileSrc}
              alt={data.name}
              className="hero-photo"
              loading="lazy"
              width="320"
              height="320"
              onError={(e) => {
                e.target.src = profileFallback;
              }}
            />
            <div className="photo-frame" aria-hidden="true" />
            <div className="floating-elements" aria-hidden="true">
              <div className="floating-element element-1">💻</div>
              <div className="floating-element element-2">⚡</div>
              <div className="floating-element element-3">🎯</div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Preview */}
      <section className="skills-preview" aria-label="Tech stack">
        <div className="skills-container">
          <h3>Tech Stack</h3>
          <div className="skills-grid">
            {data.skills?.slice(0, 8).map((skill, index) => (
              <div key={skill} className="skill-item" style={{ animationDelay: `${index * 0.06}s` }}>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="projects" aria-label="Featured projects">
        <div className="section-header">
          <h2>Featured Projects</h2>
          <p>Check out some of my recent work</p>
        </div>

        <div className="project-grid">
          {data.projects?.map((p, index) => (
            <ProjectCard key={p.id} project={p} delay={index * 0.06} />
          ))}
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="contact-cta" aria-label="Contact call to action">
        <div className="cta-card">
          <h3>Let's Work Together</h3>
          <p>Have a project in mind? I'd love to hear about it.</p>
          <Link className="btn btn-lg" to="/contact" aria-label="Start a conversation">
            Start a Conversation
          </Link>
        </div>
      </section>
    </div>
  );
}