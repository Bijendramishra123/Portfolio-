// src/pages/Home.jsx
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { 
  FiGithub, 
  FiLinkedin, 
  FiMail, 
  FiArrowRight,
  FiCode,
  FiStar,
  FiExternalLink,
  FiChevronDown,
  FiAward,
  FiBriefcase,
  FiTrendingUp,
  FiMessageSquare,
  FiZap,
  FiUsers
} from "react-icons/fi";
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaJava, 
  FaAws, 
  FaDocker,
  FaDatabase,
  FaBrain,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaGitAlt
} from "react-icons/fa";
import { 
  SiTensorflow, 
  SiMongodb, 
  SiTypescript, 
  SiNextdotjs, 
  SiRedux, 
  SiTailwindcss, 
  SiDotnet,
  SiFlutter,
  SiFastapi
} from "react-icons/si";
import "./Home.css";

// Fixed C# icon component
const CSharpIcon = ({ size = "1em", color = "#239120" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 256 256"
    style={{ display: 'block' }}
  >
    <circle cx="128" cy="128" r="128" fill={color}/>
    <path fill="#fff" d="M57.8 85.3c-4.7 8.2-7.2 18.2-7.2 30s2.5 21.8 7.2 30l-20.3 11.7c-7.5-13.1-11.5-28.7-11.5-41.7s4-28.6 11.5-41.7L57.8 85.3z"/>
    <path fill="#fff" d="M76.6 149.1c-2.2-3.8-3.4-8.3-3.4-13.4s1.2-9.7 3.4-13.4l-20.3-11.7c-4.7 8.2-7.2 18.2-7.2 30s2.5 21.8 7.2 30L76.6 149.1z"/>
    <path fill="#fff" d="M128 50.5c21.4 0 40.2 10.9 51.2 27.4l-20.3 11.7c-6.4-11.2-18.4-18.6-31-18.6s-24.6 7.4-31 18.6L76.8 77.9C87.8 61.4 106.6 50.5 128 50.5z"/>
    <path fill="#fff" d="M128 205.5c-21.4 0-40.2-10.9-51.2-27.4l20.3-11.7c6.4 11.2 18.4 18.6 31 18.6s24.6-7.4 31-18.6l20.3 11.7C168.2 194.6 149.4 205.5 128 205.5z"/>
    <path fill="#fff" d="M179.2 178.1c4.7-8.2 7.2-18.2 7.2-30s-2.5-21.8-7.2-30l20.3-11.7c7.5 13.1 11.5 28.7 11.5 41.7s-4 28.6-11.5 41.7L179.2 178.1z"/>
    <path fill="#fff" d="M179.2 77.9l-20.3 11.7c2.2 3.8 3.4 8.3 3.4 13.4s-1.2 9.7-3.4 13.4l20.3 11.7c4.7-8.2 7.2-18.2 7.2-30s-2.5-21.8-7.2-30z"/>
  </svg>
);

const Home = () => {
  const data = useSelector(s => s.resume);
  const [currentTech, setCurrentTech] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Skill to icon mapping
  const skillToIcon = useMemo(() => ({
    'React': <FaReact />,
    'React.js': <FaReact />,
    'Node.js': <FaNodeJs />,
    'Python': <FaPython />,
    'Java': <FaJava />,
    'JavaScript': <FaJs />,
    'TypeScript': <SiTypescript />,
    'HTML': <FaHtml5 />,
    'CSS': <FaCss3Alt />,
    'MongoDB': <SiMongodb />,
    'SQL': <FaDatabase />,
    'Docker': <FaDocker />,
    'AWS': <FaAws />,
    'Git': <FaGitAlt />,
    'AI/ML': <FaBrain />,
    'Machine Learning': <FaBrain />,
    'Deep Learning': <FaBrain />,
    'TensorFlow': <SiTensorflow />,
    'Next.js': <SiNextdotjs />,
    'Redux': <SiRedux />,
    'Tailwind': <SiTailwindcss />,
    'Tailwind CSS': <SiTailwindcss />,
    'C#': <CSharpIcon />,
    '.NET': <SiDotnet />,
    'Flutter': <SiFlutter />,
    'FastAPI': <SiFastapi />,
    'Flask': <FaPython />,
    'React-Native': <FaReact />,
    'React-expo': <FaReact />,
    'Angular': <FiCode />,
    'Bootstrap': <FiCode />
  }), []);

  // Skill colors
  const getSkillColor = useCallback((skill) => {
    const colors = {
      'React': '#61DAFB',
      'Node.js': '#339933',
      'Python': '#3776AB',
      'Java': '#007396',
      'JavaScript': '#F7DF1E',
      'TypeScript': '#3178C6',
      'HTML': '#E34F26',
      'CSS': '#1572B6',
      'MongoDB': '#47A248',
      'SQL': '#336791',
      'Docker': '#2496ED',
      'AWS': '#FF9900',
      'Git': '#F05032',
      'AI/ML': '#FF6B6B',
      'Machine Learning': '#FF6B6B',
      'Deep Learning': '#FF6B6B',
      'TensorFlow': '#FF6F00',
      'Next.js': '#000000',
      'Redux': '#764ABC',
      'Tailwind': '#06B6D4',
      'C#': '#239120',
      '.NET': '#512BD4',
      'Flutter': '#02569B',
      'FastAPI': '#009688',
      'Flask': '#000000',
      'Angular': '#DD0031',
      'Bootstrap': '#7952B3'
    };
    return colors[skill] || '#667eea';
  }, []);

  // Create tech stack from resume skills
  const techStack = useMemo(() => {
    const skills = data.skills || [];
    return skills.slice(0, 12).map(skill => ({
      name: skill,
      icon: skillToIcon[skill] || <FiCode />,
      level: Math.floor(Math.random() * 20) + 80,
      color: getSkillColor(skill)
    }));
  }, [data.skills, skillToIcon, getSkillColor]);

  // Orbit technologies
  const orbitTechs = useMemo(() => [
    { icon: <FaReact />, name: 'React', color: '#61DAFB' },
    { icon: <FaNodeJs />, name: 'Node.js', color: '#339933' },
    { icon: <FaPython />, name: 'Python', color: '#3776AB' },
    { icon: <SiTypescript />, name: 'TypeScript', color: '#3178C6' },
    { icon: <SiMongodb />, name: 'MongoDB', color: '#47A248' },
    { icon: <FaBrain />, name: 'AI/ML', color: '#FF6B6B' }
  ], []);

  // Stats data
  const stats = useMemo(() => [
    { 
      icon: <FiBriefcase />, 
      value: `${data.experience?.length || 1}+`, 
      label: "Years Experience", 
      color: "#FF6B6B",
      suffix: "yrs"
    },
    { 
      icon: <FiCode />, 
      value: data.projects?.length || 5, 
      label: "Projects", 
      color: "#4ECDC4",
      suffix: "+"
    },
    { 
      icon: <FiUsers />, 
      value: "50+", 
      label: "Happy Clients", 
      color: "#FFD166",
      suffix: ""
    },
    { 
      icon: <FiZap />, 
      value: "99", 
      label: "Success Rate", 
      color: "#118AB2",
      suffix: "%"
    }
  ], [data.experience, data.projects]);

  // Featured projects
  const featuredProjects = useMemo(() => 
    data.projects?.slice(0, 3) || [], 
    [data.projects]
  );

  // Auto-rotate orbit tech
  useEffect(() => {
    setMounted(true);
    
    const techInterval = setInterval(() => {
      setCurrentTech(prev => (prev + 1) % orbitTechs.length);
    }, 3000);

    return () => clearInterval(techInterval);
  }, [orbitTechs.length]);

  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="home-page">
      {/* Optimized Particles Background */}
      <div className="particles-container">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        {/* Background Shapes */}
        <div className="background-shapes">
          <motion.div 
            className="shape shape-1" 
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="shape shape-2"
            animate={{ 
              x: [0, 30, 0],
              y: [0, -15, 0],
              rotate: [0, -180, -360],
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="shape shape-3"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{ 
              duration: 30, 
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="hero-container">
          {/* Left Content */}
          <motion.div
            className="hero-content"
            initial="hidden"
            animate={mounted ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.div
              className="hero-badge"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="badge-dot"></span>
              <span className="badge-text">AI Student & Full Stack Developer</span>
            </motion.div>

            <motion.h1
              className="hero-title"
              variants={fadeInUp}
            >
              Hi, I'm <span className="gradient-text">{data.name || "Bijendra Mishra"}</span>
            </motion.h1>

            <motion.h2
              className="hero-subtitle"
              variants={fadeInUp}
            >
              {data.title || "Software Engineer"}
            </motion.h2>

            <motion.p
              className="hero-description"
              variants={fadeInUp}
            >
              {data.summary || "Passionate about creating innovative solutions using cutting-edge technologies. Specializing in AI, machine learning, and full-stack development."}
            </motion.p>

            <motion.div
              className="hero-actions"
              variants={fadeInUp}
            >
              <motion.button
                className="btn btn-primary"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('projects')}
              >
                <span>View My Work</span>
                <FiArrowRight className="btn-icon" />
              </motion.button>

              <motion.a
                href={`mailto:${data.email || "bijendramishra2002@gmail.com"}`}
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMail className="btn-icon" />
                <span>Get In Touch</span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="hero-social"
              variants={fadeInUp}
            >
              {data.github && (
                <motion.a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiGithub />
                </motion.a>
              )}
              
              {data.linkedin && (
                <motion.a
                  href={data.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiLinkedin />
                </motion.a>
              )}
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={mounted ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="visual-container">
              {/* Floating Code Card */}
              <motion.div
                className="floating-card"
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="card-inner">
                  <div className="code-snippet">
                    <pre>
{`const developer = {
  name: "${(data.name || "Bijendra Mishra").split(' ')[0]}",
  role: "${data.title || "Full Stack Developer"}",
  stack: ["React", "Node.js", "Python", "AI/ML"],
  passion: "Building impactful solutions",
  motto: "Code. Create. Innovate."
};

console.log("🚀 Let's build something amazing!");`}
                    </pre>
                  </div>
                </div>
              </motion.div>

              {/* Tech Orbit */}
              <div className="orbit-container">
                {orbitTechs.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    className="orbit-ring"
                    style={{ '--index': index }}
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: 40 + index * 10, 
                      repeat: Infinity, 
                      ease: "linear",
                      delay: index * 0.5
                    }}
                  >
                    <motion.div 
                      className="orbit-item"
                      style={{ color: tech.color }}
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 3 + index,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {tech.icon}
                    </motion.div>
                  </motion.div>
                ))}

                {/* Central Tech Display */}
                <motion.div
                  className="central-tech"
                  key={currentTech}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                >
                  <motion.div 
                    className="central-icon"
                    style={{ color: orbitTechs[currentTech].color }}
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    {orbitTechs[currentTech].icon}
                  </motion.div>
                  <motion.div 
                    className="central-name"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {orbitTechs[currentTech].name}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          onClick={() => scrollToSection('stats')}
          whileHover={{ scale: 1.1 }}
        >
          <FiChevronDown />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="stats-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="section-title">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="title-icon-wrapper"
              >
                <FiTrendingUp className="title-icon" />
              </motion.div>
              <span className="title-text">Achievements & Metrics</span>
            </h2>
            <p className="section-subtitle">
              Quantifying excellence through measurable results
            </p>
          </motion.div>

          <motion.div 
            className="stats-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-card"
                variants={fadeInUp}
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <div className="stat-icon-wrapper" style={{ backgroundColor: `${stat.color}15` }}>
                  <motion.div 
                    className="stat-icon"
                    style={{ color: stat.color }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    {stat.icon}
                  </motion.div>
                </div>
                <div className="stat-content">
                  <motion.h3 
                    className="stat-value"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    {stat.value}<span className="stat-suffix">{stat.suffix}</span>
                  </motion.h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="tech-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="section-title">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="title-icon-wrapper"
              >
                <FiCode className="title-icon" />
              </motion.div>
              <span className="title-text">Technical Expertise</span>
            </h2>
            <p className="section-subtitle">
              Technologies I master and love working with
            </p>
          </motion.div>

          <motion.div 
            className="tech-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="tech-card"
                variants={fadeInUp}
                whileHover={{ 
                  y: -5,
                  boxShadow: `0 10px 25px ${tech.color}30`,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <div className="tech-header">
                  <motion.div 
                    className="tech-icon"
                    style={{ color: tech.color }}
                    animate={{ 
                      rotate: [0, 360],
                    }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity, 
                      ease: "linear",
                      delay: index * 0.1
                    }}
                  >
                    {tech.icon}
                  </motion.div>
                  <h3 className="tech-name">{tech.name}</h3>
                </div>
                <div className="skill-meter">
                  <div className="skill-track">
                    <motion.div
                      className="skill-level"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tech.level}%` }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: 0.2 + index * 0.05, 
                        duration: 1,
                        ease: "easeInOut"
                      }}
                      style={{ backgroundColor: tech.color }}
                    />
                  </div>
                  <span className="skill-percent">{tech.level}%</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="section-title">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="title-icon-wrapper"
              >
                <FiStar className="title-icon" />
              </motion.div>
              <span className="title-text">Featured Work</span>
            </h2>
            <p className="section-subtitle">
              Showcasing innovation and technical excellence
            </p>
          </motion.div>

          <div className="projects-grid">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  delay: index * 0.15, 
                  duration: 0.5,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <div className="project-header">
                  <div className="project-badge">
                    <FiStar />
                    <span>Featured</span>
                  </div>
                  <div className="project-links">
                    {project.github && (
                      <motion.a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiGithub />
                      </motion.a>
                    )}
                    {project.live && (
                      <motion.a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiExternalLink />
                      </motion.a>
                    )}
                  </div>
                </div>

                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.overview}</p>
                  
                  <div className="project-tech">
                    {project.tech.slice(0, 3).map((tech, techIndex) => (
                      <motion.span 
                        key={tech} 
                        className="tech-tag"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + techIndex * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="tech-tag more">+{project.tech.length - 3}</span>
                    )}
                  </div>
                </div>

                <Link 
                  to={`/projects/${project.slug}`} 
                  className="project-cta"
                >
                  <span>Explore Project</span>
                  <FiArrowRight />
                </Link>
              </motion.div>
            ))}
          </div>

          {(data.projects?.length || 0) > 3 && (
            <motion.div
              className="section-footer"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Link to="/projects" className="btn btn-outline">
                <span>View All Projects</span>
                <FiArrowRight />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <motion.div
            className="cta-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="cta-title">Let's Build Something Amazing</h2>
            <p className="cta-description">
              Have a project in mind? Let's collaborate to turn your ideas into reality. 
              I specialize in creating innovative solutions that drive results.
            </p>
            
            <div className="cta-actions">
              <motion.a
                href={`mailto:${data.email || "bijendramishra2002@gmail.com"}`}
                className="btn btn-primary btn-large"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMessageSquare />
                <span>Start Conversation</span>
              </motion.a>
              
              <Link to="/contact" className="btn btn-secondary btn-large">
                <FiMail />
                <span>Contact Form</span>
              </Link>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="contact-item">
              <FiMail />
              <span>{data.email || "bijendramishra2002@gmail.com"}</span>
            </div>
            <div className="contact-item">
              <FiBriefcase />
              <span>{data.location || "Pune, India"}</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;