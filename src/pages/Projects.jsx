import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "AI Chat Assistant",
      description: "Intelligent chatbot using OpenAI API with real-time responses",
      tech: ["React", "Node.js", "OpenAI", "Socket.io"],
      featured: true,
      github: "https://github.com",
      demo: "https://demo.com",
      status: "Live",
      views: 2450,
      likes: 189
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce with payment integration and admin dashboard",
      tech: ["Next.js", "Stripe", "MongoDB", "Tailwind"],
      featured: true,
      github: "https://github.com",
      demo: "https://demo.com",
      status: "Complete",
      views: 1870,
      likes: 142
    },
    {
      id: 3,
      title: "Portfolio v3",
      description: "Modern portfolio with 3D animations and interactive elements",
      tech: ["React", "Three.js", "Framer Motion", "GSAP"],
      featured: false,
      github: "https://github.com",
      demo: "https://demo.com",
      status: "In Progress",
      views: 980,
      likes: 76
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="projects-page page-container"
    >
      <div className="section-header">
        <h1 className="section-title gradient-text">Projects</h1>
        <p className="section-subtitle">Some of my recent work that I'm proud of</p>
      </div>

      <div className="projects-grid mt-4">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;
