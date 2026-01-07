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
  FiChevronRight,
  FiZap,
  FiCpu,
  FiLayers
} from 'react-icons/fi';
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaJava,
  FaAws,
  FaDocker,
  FaDatabase
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiNextdotjs, 
  SiTailwindcss,
  SiMongodb,
  SiGraphql,
  SiFirebase,
  SiRedux
} from 'react-icons/si';
import './ProjectCard.css';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [techHover, setTechHover] = useState(null);
  const cardRef = useRef(null);
  
  // Generate unique color based on project title
  const generateColorFromTitle = (title) => {
    const colors = [
      '#6366f1', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981', 
      '#f59e0b', '#ef4444', '#3b82f6', '#84cc16', '#8b5cf6'
    ];
    const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const primaryColor = generateColorFromTitle(project.title);
  const secondaryColor = generateColorFromTitle(project.title.split('').reverse().join(''));

  // Mouse position tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [8, -8]), {
    stiffness: 150,
    damping: 25
  });
  
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-8, 8]), {
    stiffness: 150,
    damping: 25
  });

  const scale = useSpring(isHovered ? 1.02 : 1, {
    stiffness: 200,
    damping: 20
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current || !isHovered) return;
    
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
    setTechHover(null);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.15, rootMargin: '50px' }
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

  // Get tech icon with better mapping
  const getTechIcon = (tech) => {
    const iconMap = {
      'React': <FaReact />,
      'React.js': <FaReact />,
      'Node.js': <FaNodeJs />,
      'Python': <FaPython />,
      'Java': <FaJava />,
      'JavaScript': <FiCode />,
      'TypeScript': <SiTypescript />,
      'Next.js': <SiNextdotjs />,
      'Tailwind CSS': <SiTailwindcss />,
      'Tailwind': <SiTailwindcss />,
      'MongoDB': <SiMongodb />,
      'SQL': <FaDatabase />,
      'PostgreSQL': <FaDatabase />,
      'AWS': <FaAws />,
      'Docker': <FaDocker />,
      'GraphQL': <SiGraphql />,
      'Firebase': <SiFirebase />,
      'Redux': <SiRedux />,
      'Vue': <FiGlobe />,
      'Angular': <FiGlobe />,
      'Flutter': <FiLayers />,
      'Django': <FiCode />,
      'Flask': <FiCode />,
      'Express': <FaNodeJs />,
      'Spring': <FaJava />,
      'AI/ML': <FiCpu />,
      'Machine Learning': <FiCpu />,
      'TensorFlow': <FiCpu />,
      'PyTorch': <FiCpu />,
    };
    return iconMap[tech] || <FiCode />;
  };

  // Get tech color
  const getTechColor = (tech) => {
    const colors = {
      'React': '#61DAFB',
      'Node.js': '#339933',
      'Python': '#3776AB',
      'Java': '#007396',
      'TypeScript': '#3178C6',
      'Next.js': '#000000',
      'Tailwind CSS': '#06B6D4',
      'MongoDB': '#47A248',
      'AWS': '#FF9900',
      'Docker': '#2496ED',
      'GraphQL': '#E10098',
      'Firebase': '#FFCA28',
      'Redux': '#764ABC',
    };
    return colors[tech] || '#8b5cf6';
  };

  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      rotateX: 10,
      rotateY: -5
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      rotateY: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.2 }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="project-card"
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        scale: scale,
        transformStyle: 'preserve-3d',
        '--primary-color': primaryColor,
        '--secondary-color': secondaryColor,
      }}
    >
      {/* Animated Background Gradient */}
      <motion.div 
        className="gradient-background"
        animate={{
          background: isHovered 
            ? `linear-gradient(135deg, ${primaryColor}20 0%, ${secondaryColor}15 100%)`
            : `linear-gradient(135deg, ${primaryColor}10 0%, ${secondaryColor}08 100%)`
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Animated Border Glow */}
      <motion.div 
        className="border-glow"
        animate={{
          opacity: isHovered ? 1 : 0.3,
          boxShadow: isHovered 
            ? `0 0 30px ${primaryColor}40, 0 0 60px ${primaryColor}20, inset 0 0 20px ${primaryColor}10`
            : `0 0 15px ${primaryColor}20, inset 0 0 10px ${primaryColor}05`
        }}
      />
      
      {/* Floating Particles */}
      <div className="particles-container">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              background: primaryColor,
              left: `${20 + i * 15}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Card Content */}
      <motion.div 
        className="card-content"
        style={{ transform: 'translateZ(30px)' }}
        variants={contentVariants}
      >
        
        {/* Header Section */}
        <div className="card-header">
          <motion.div 
            className="icon-wrapper"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <div 
              className="project-icon"
              style={{ 
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                color: 'white'
              }}
            >
              {getTechIcon(project.tech?.[0] || 'React')}
            </div>
          </motion.div>
          
          <div className="title-section">
            <motion.h3 
              className="project-title"
              animate={{ color: isHovered ? primaryColor : '#f8fafc' }}
              transition={{ duration: 0.3 }}
            >
              {project.title}
            </motion.h3>
            
            <div className="badge-container">
              <span 
                className="category-badge"
                style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
              >
                {project.category || 'Web App'}
              </span>
              
              {project.featured && (
                <motion.span 
                  className="featured-badge"
                  style={{ backgroundColor: `${secondaryColor}20`, color: secondaryColor }}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <FiStar /> Featured
                </motion.span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <motion.p 
          className="project-description"
          animate={{ 
            opacity: isHovered ? 1 : 0.85,
            y: isHovered ? 0 : 5 
          }}
          transition={{ duration: 0.3 }}
        >
          {project.description || project.overview}
        </motion.p>

        {/* Tech Stack */}
        <div className="tech-section">
          <div className="section-header">
            <FiCpu className="section-icon" />
            <h4 className="section-title">Tech Stack</h4>
          </div>
          
          <div className="tech-grid">
            {project.tech?.slice(0, 6).map((tech, i) => (
              <motion.div
                key={tech}
                className="tech-item"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3 + i * 0.05, type: "spring" }}
                whileHover={{ 
                  scale: 1.15, 
                  y: -5,
                  transition: { type: "spring", stiffness: 400 }
                }}
                onMouseEnter={() => setTechHover(tech)}
                onMouseLeave={() => setTechHover(null)}
              >
                <div 
                  className="tech-icon-wrapper"
                  style={{ 
                    backgroundColor: `${getTechColor(tech)}20`,
                    borderColor: `${getTechColor(tech)}40`
                  }}
                >
                  <div 
                    className="tech-icon"
                    style={{ color: getTechColor(tech) }}
                  >
                    {getTechIcon(tech)}
                  </div>
                </div>
                <span className="tech-name">{tech}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div 
          className="stats-bar"
          animate={{ 
            backgroundColor: isHovered ? `${primaryColor}10` : 'transparent' 
          }}
        >
          <div className="stat-item">
            <FiClock />
            <div className="stat-content">
              <span className="stat-value">{project.duration || '3 Months'}</span>
              <span className="stat-label">Duration</span>
            </div>
          </div>
          
          <div className="stat-item">
            <FiEye />
            <div className="stat-content">
              <span className="stat-value">{project.views || '1.2K'}</span>
              <span className="stat-label">Views</span>
            </div>
          </div>
          
          <div className="stat-item">
            <FiStar />
            <div className="stat-content">
              <span className="stat-value">{project.likes || '89'}</span>
              <span className="stat-label">Likes</span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="action-buttons">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-github"
              whileHover={{ 
                scale: 1.05,
                y: -2,
                backgroundColor: primaryColor,
                boxShadow: `0 8px 20px ${primaryColor}40`
              }}
              whileTap={{ scale: 0.95 }}
              style={{ '--btn-color': primaryColor }}
            >
              <FiGithub />
              <span>Code</span>
            </motion.a>
          )}
          
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-demo"
              whileHover={{ 
                scale: 1.05,
                y: -2,
                backgroundColor: secondaryColor,
                boxShadow: `0 8px 20px ${secondaryColor}40`
              }}
              whileTap={{ scale: 0.95 }}
              style={{ '--btn-color': secondaryColor }}
            >
              <FiExternalLink />
              <span>Live Demo</span>
            </motion.a>
          )}
          
          <motion.button
            className="btn btn-details"
            whileHover={{ 
              scale: 1.05,
              y: -2,
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View Details</span>
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiChevronRight />
            </motion.div>
          </motion.button>
        </div>
      </motion.div>

      {/* Hover Glow Effect */}
      {isHovered && (
        <motion.div 
          className="hover-glow"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          style={{ 
            background: `radial-gradient(circle at 50% 50%, ${primaryColor}20, transparent 70%)`
          }}
        />
      )}
    </motion.div>
  );
};

export default ProjectCard;