import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  FiExternalLink, 
  FiGithub, 
  FiStar, 
  FiEye, 
  FiClock,
  FiCode,
  FiGlobe,
  FiChevronRight
} from 'react-icons/fi';
import { TbBrandReact, TbBrandPython, TbBrandJavascript } from 'react-icons/tb';
import './ProjectCard.css';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  
  // Mouse position tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [10, -10]), {
    stiffness: 200,
    damping: 30
  });
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-10, 10]), {
    stiffness: 200,
    damping: 30
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // Get tech icon
  const getTechIcon = (tech) => {
    const icons = {
      'React': <TbBrandReact />,
      'Python': <TbBrandPython />,
      'JavaScript': <TbBrandJavascript />,
      'Node.js': <FiCode />,
      'TypeScript': <FiCode />,
      'Next.js': <FiGlobe />,
      'Vue': <FiCode />,
      'Angular': <FiCode />,
      'Django': <FiCode />,
      'Flask': <FiCode />,
      'MongoDB': <FiCode />,
      'PostgreSQL': <FiCode />,
      'Firebase': <FiCode />,
      'AWS': <FiGlobe />,
      'Docker': <FiCode />,
    };
    return icons[tech] || <FiCode />;
  };

  return (
    <motion.div
      ref={cardRef}
      className="project-card"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glassmorphism Background Layers */}
      <div className="glass-layer layer-1"></div>
      <div className="glass-layer layer-2"></div>
      <div className="glass-layer layer-3"></div>
      
      {/* Animated Gradient Background */}
      <div className="gradient-bg">
        <div className="gradient gradient-1"></div>
        <div className="gradient gradient-2"></div>
        <div className="gradient gradient-3"></div>
      </div>

      {/* Floating Particles */}
      <div className="floating-particles">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      {/* Card Content */}
      <div className="card-content" style={{ transform: 'translateZ(50px)' }}>
        
        {/* Header with Icon and Title */}
        <div className="card-header">
          <motion.div 
            className="project-icon"
            animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.6 }}
          >
            {getTechIcon(project.tech?.[0] || 'React')}
          </motion.div>
          
          <div className="header-text">
            <h3 className="project-title">{project.title}</h3>
            <div className="project-category">
              <span className="category-badge">{project.category}</span>
              {project.featured && (
                <motion.div 
                  className="featured-badge"
                  animate={{ scale: isHovered ? 1.1 : 1 }}
                  transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
                >
                  <FiStar /> Featured
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Project Description */}
        <motion.p 
          className="project-description"
          animate={{ 
            opacity: isHovered ? 1 : 0.8,
            x: isHovered ? 0 : -10 
          }}
        >
          {project.description}
        </motion.p>

        {/* Tech Stack with Icons */}
        <div className="tech-stack">
          <h4 className="tech-title">Tech Stack</h4>
          <div className="tech-icons">
            {project.tech?.slice(0, 5).map((tech, i) => (
              <motion.div
                key={tech}
                className="tech-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.2, rotate: 360 }}
              >
                {getTechIcon(tech)}
                <span className="tech-tooltip">{tech}</span>
              </motion.div>
            ))}
            {project.tech && project.tech.length > 5 && (
              <div className="more-tech">
                +{project.tech.length - 5}
              </div>
            )}
          </div>
        </div>

        {/* Project Stats */}
        <div className="project-stats">
          <div className="stat">
            <FiClock />
            <span>{project.duration || '3 months'}</span>
          </div>
          <div className="stat">
            <FiEye />
            <span>{project.views || '1.2k'}</span>
          </div>
          <div className="stat">
            <FiStar />
            <span>{project.likes || '89'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <motion.a
            href={project.github || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-code"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiGithub />
            <span>Code</span>
          </motion.a>
          
          <motion.a
            href={project.demo || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-demo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiExternalLink />
            <span>Live Demo</span>
          </motion.a>
          
          <motion.button
            className="btn btn-details"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Details</span>
            <FiChevronRight />
          </motion.button>
        </div>

        {/* Hover Effect Glow */}
        {isHovered && (
          <motion.div 
            className="hover-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </div>

      {/* Edge Glow Effect */}
      <div className="edge-glow"></div>
    </motion.div>
  );
};

export default ProjectCard;