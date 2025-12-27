// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { 
  FiGithub, 
  FiLinkedin, 
  FiMail, 
  FiArrowRight,
  FiCode,
  FiCoffee,
  FiStar,
  FiExternalLink,
  FiChevronDown,
  FiAward,
  FiBriefcase,
  FiTrendingUp
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
  SiDotnet 
} from "react-icons/si";
import "./Home.css";

// Fixed C# icon with proper SVG
const CSharpIcon = ({ size = "1em", color = "#239120" }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 256 256" 
      fill="currentColor"
      style={{ display: 'block' }}
    >
      <circle cx="128" cy="128" r="128" fill="#239120"/>
      <path fill="#fff" d="M57.8 85.3c-4.7 8.2-7.2 18.2-7.2 30s2.5 21.8 7.2 30l-20.3 11.7c-7.5-13.1-11.5-28.7-11.5-41.7s4-28.6 11.5-41.7L57.8 85.3z"/>
      <path fill="#fff" d="M76.6 149.1c-2.2-3.8-3.4-8.3-3.4-13.4s1.2-9.7 3.4-13.4l-20.3-11.7c-4.7 8.2-7.2 18.2-7.2 30s2.5 21.8 7.2 30L76.6 149.1z"/>
      <path fill="#fff" d="M128 50.5c21.4 0 40.2 10.9 51.2 27.4l-20.3 11.7c-6.4-11.2-18.4-18.6-31-18.6s-24.6 7.4-31 18.6L76.8 77.9C87.8 61.4 106.6 50.5 128 50.5z"/>
      <path fill="#fff" d="M128 205.5c-21.4 0-40.2-10.9-51.2-27.4l20.3-11.7c6.4 11.2 18.4 18.6 31 18.6s24.6-7.4 31-18.6l20.3 11.7C168.2 194.6 149.4 205.5 128 205.5z"/>
      <path fill="#fff" d="M179.2 178.1c4.7-8.2 7.2-18.2 7.2-30s-2.5-21.8-7.2-30l20.3-11.7c7.5 13.1 11.5 28.7 11.5 41.7s-4 28.6-11.5 41.7L179.2 178.1z"/>
      <path fill="#fff" d="M179.2 77.9l-20.3 11.7c2.2 3.8 3.4 8.3 3.4 13.4s-1.2 9.7-3.4 13.4l20.3 11.7c4.7-8.2 7.2-18.2 7.2-30s-2.5-21.8-7.2-30z"/>
    </svg>
  </div>
);

const Home = () => {
  const data = useSelector(s => s.resume);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTech, setCurrentTech] = useState(0);
  const [orbitRotation, setOrbitRotation] = useState(0);

  // Get skills from resume data
  const resumeSkills = data.skills || [];
  
  // Map resume skills to icons
  const skillToIcon = {
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
    'Flutter': <FiCode />,
    'Flask': <FaPython />,
    'React-Native': <FaReact />,
    'React-expo': <FaReact />,
    'Angular': <FiCode />,
    'Bootstrap': <FiCode />
  };

  // Create tech stack from resume skills
  const techStack = resumeSkills.map(skill => ({
    name: skill,
    icon: skillToIcon[skill] || <FiCode />,
    level: Math.floor(Math.random() * 20) + 80, // 80-100% for known skills
    color: getSkillColor(skill)
  })).slice(0, 12); // Take only 12 skills for better display

  function getSkillColor(skill) {
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
      'Flask': '#000000',
      'Angular': '#DD0031',
      'Bootstrap': '#7952B3'
    };
    return colors[skill] || '#667eea';
  }

  // Tech icons for orbit (automatic rotation)
  const orbitTechs = [
    { icon: <FaReact />, name: 'React', color: '#61DAFB' },
    { icon: <FaNodeJs />, name: 'Node.js', color: '#339933' },
    { icon: <FaPython />, name: 'Python', color: '#3776AB' },
    { icon: <SiTypescript />, name: 'TypeScript', color: '#3178C6' },
    { icon: <SiMongodb />, name: 'MongoDB', color: '#47A248' },
    { icon: <FaBrain />, name: 'AI/ML', color: '#FF6B6B' }
  ];

  // Stats from data
  const stats = [
    { icon: <FiBriefcase />, value: `${data.experience?.length || 1}+`, label: "Years Experience", color: "#FF6B6B" },
    { icon: <FiCode />, value: `${data.projects?.length || 5}+`, label: "Projects", color: "#4ECDC4" },
    { icon: <FiAward />, value: "100%", label: "Satisfaction", color: "#FFD166" },
    { icon: <FiTrendingUp />, value: "24/7", label: "Available", color: "#118AB2" }
  ];

  // Featured projects (first 3)
  const featuredProjects = data.projects?.slice(0, 3) || [];

  // Auto-rotate orbit tech
  useEffect(() => {
    setIsVisible(true);
    
    // Auto change tech in orbit
    const techInterval = setInterval(() => {
      setCurrentTech(prev => (prev + 1) % orbitTechs.length);
    }, 2000);

    // Smooth rotation for orbit rings
    const rotationInterval = setInterval(() => {
      setOrbitRotation(prev => (prev + 1) % 360);
    }, 50);

    return () => {
      clearInterval(techInterval);
      clearInterval(rotationInterval);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="home-page">
      {/* Floating Particles Background with smoother animation */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        {/* Animated Background Shapes with smoother animation */}
        <div className="background-shapes">
          <motion.div 
            className="shape shape-1" 
            animate={{ 
              y: [0, -30, 0],
              x: [0, 15, 0],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="shape shape-2"
            animate={{ 
              x: [0, 40, 0],
              y: [0, -20, 0],
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="shape shape-3"
            animate={{ 
              scale: [1, 1.15, 1],
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="hero-container">
          {/* Left Content */}
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <motion.div
              className="hero-badge"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <span className="badge-dot"></span>
              <span className="badge-text">AI Student & Full Stack Developer</span>
            </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            >
              Hi, I'm <span className="gradient-text">{data.name || "Bijendra Mishra"}</span>
            </motion.h1>

            <motion.h2
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            >
              {data.title || "Software Engineer"}
            </motion.h2>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            >
              {data.summary || "Passionate about creating innovative solutions using cutting-edge technologies."}
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            >
              <motion.button
                className="btn btn-primary"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('projects')}
              >
                <span>View My Work</span>
                <FiArrowRight className="btn-icon" />
              </motion.button>

              <motion.a
                href={`mailto:${data.email || "bijendramishra2002@gmail.com"}`}
                className="btn btn-secondary"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMail className="btn-icon" />
                <span>Get In Touch</span>
              </motion.a>
            </motion.div>

            {/* Social Links with smoother hover */}
            <motion.div
              className="hero-social"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              {data.github && (
                <motion.a
                  href={data.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ y: -5, scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ 
                    y: [0, -3, 0],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    delay: 0.5
                  }}
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
                  whileHover={{ y: -5, scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ 
                    y: [0, -3, 0],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    delay: 1
                  }}
                >
                  <FiLinkedin />
                </motion.a>
              )}
            </motion.div>
          </motion.div>

          {/* Right Visual with smoother animations */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="visual-container">
              {/* Main Floating Card with smoother animation */}
              <motion.div
                className="floating-card"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 1, -1, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="card-inner">
                  <div className="card-face card-front">
                    <div className="code-snippet">
                      {`const ${(data.name || "Bijendra").split(' ')[0].toLowerCase()} = {
  name: "${data.name || "Bijendra Mishra"}",
  role: "${data.title || "Software Engineer"}",
  location: "${data.location || "Pune, India"}",
  tech: ${JSON.stringify((resumeSkills || []).slice(0, 3)).replace(/"/g, "'")},
  passion: "AI & Full Stack Development"
}`}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Auto-Rotating Orbit with smoother animations */}
              <div className="orbit-container">
                {/* Orbit Ring 1 */}
                <motion.div
                  className="orbit-ring ring-1"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  <motion.div 
                    className="orbit-item"
                    style={{ backgroundColor: `${orbitTechs[0].color}20`, color: orbitTechs[0].color }}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {orbitTechs[0].icon}
                  </motion.div>
                </motion.div>

                {/* Orbit Ring 2 */}
                <motion.div
                  className="orbit-ring ring-2"
                  animate={{ rotate: -360 }}
                  transition={{ 
                    duration: 25, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  <motion.div 
                    className="orbit-item"
                    style={{ backgroundColor: `${orbitTechs[1].color}20`, color: orbitTechs[1].color }}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      delay: 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    {orbitTechs[1].icon}
                  </motion.div>
                </motion.div>

                {/* Orbit Ring 3 */}
                <motion.div
                  className="orbit-ring ring-3"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 30, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  <motion.div 
                    className="orbit-item"
                    style={{ backgroundColor: `${orbitTechs[2].color}20`, color: orbitTechs[2].color }}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: 1,
                      ease: "easeInOut"
                    }}
                  >
                    {orbitTechs[2].icon}
                  </motion.div>
                </motion.div>

                {/* Central Changing Tech Icon with smoother transition */}
                <motion.div
                  className="central-tech"
                  key={currentTech}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ 
                    scale: 1, 
                    rotate: 0,
                    y: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 0.8,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div 
                    className="central-icon"
                    style={{ 
                      backgroundColor: `${orbitTechs[currentTech].color}20`,
                      color: orbitTechs[currentTech].color 
                    }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    {orbitTechs[currentTech].icon}
                  </motion.div>
                  <div className="central-name">
                    {orbitTechs[currentTech].name}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator with smoother animation */}
        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          onClick={() => scrollToSection('stats')}
          whileHover={{ scale: 1.1 }}
        >
          <FiChevronDown />
          <span>Explore More</span>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="stats-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="section-title">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="title-icon-wrapper"
              >
                <FiTrendingUp className="title-icon" />
              </motion.div>
              <span className="title-text">By The Numbers</span>
            </h2>
            <p className="section-subtitle">
              A glimpse of my journey and achievements
            </p>
          </motion.div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-card"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="stat-icon-wrapper"
                  style={{ backgroundColor: `${stat.color}20` }}
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div 
                    className="stat-icon"
                    style={{ color: stat.color }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    {stat.icon}
                  </motion.div>
                </motion.div>
                <div className="stat-content">
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="tech-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="section-title">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="title-icon-wrapper"
              >
                <FiCode className="title-icon" />
              </motion.div>
              <span className="title-text">Tech Stack</span>
            </h2>
            <p className="section-subtitle">
              Technologies I use to build amazing products
            </p>
          </motion.div>

          <div className="tech-grid">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="tech-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  delay: index * 0.05, 
                  duration: 0.5, 
                  ease: "easeOut" 
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 15 
                  }
                }}
              >
                <motion.div 
                  className="tech-icon"
                  style={{ color: tech.color }}
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 10, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: index * 0.1
                  }}
                >
                  {tech.icon}
                </motion.div>
                <h3 className="tech-name">{tech.name}</h3>
                <div className="skill-meter">
                  <motion.div
                    className="skill-level"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 0.3 + index * 0.05, 
                      duration: 1.5,
                      ease: "easeInOut"
                    }}
                    style={{ backgroundColor: tech.color }}
                  />
                </div>
                <span className="skill-percent">{tech.level}%</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="section-title">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  y: [0, -5, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="title-icon-wrapper"
              >
                <FiCoffee className="title-icon" />
              </motion.div>
              <span className="title-text">Featured Projects</span>
            </h2>
            <p className="section-subtitle">
              Some of my recent work that I'm proud of
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
                  delay: index * 0.2, 
                  duration: 0.6, 
                  ease: "easeOut" 
                }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                  transition: { 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 15 
                  }
                }}
              >
                <div className="project-header">
                  <motion.div
                    className="project-badge"
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <FiStar />
                    <span>Featured</span>
                  </motion.div>
                  <div className="project-links">
                    {project.github && (
                      <motion.a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                        whileHover={{ scale: 1.2, rotate: 5 }}
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
                        whileHover={{ scale: 1.2, rotate: -5 }}
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
                    {project.tech.slice(0, 4).map((tech, techIndex) => (
                      <motion.span 
                        key={tech} 
                        className="tech-tag"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.1 + techIndex * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="tech-tag more">+{project.tech.length - 4}</span>
                    )}
                  </div>
                </div>

                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to={`/projects/${project.slug}`} 
                    className="project-cta"
                  >
                    <span>View Details</span>
                    <FiArrowRight />
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {(data.projects?.length || 0) > 3 && (
            <motion.div
              className="section-footer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
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
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="cta-title">Ready to Bring Your Ideas to Life?</h2>
            <p className="cta-description">
              Let's collaborate and create something extraordinary together.
              Whether it's a website, application, or AI solution, I'm here to help.
            </p>
            
            <div className="cta-actions">
              <motion.a
                href={`mailto:${data.email || "bijendramishra2002@gmail.com"}`}
                className="btn btn-primary btn-large"
                whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FiMail />
                <span>Start a Project</span>
              </motion.a>
              
              <Link to="/contact" className="btn btn-secondary btn-large">
                <FiMail />
                <span>Contact Me</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Contact Info with smoother animation */}
        <motion.div 
          className="floating-contact"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
      </section>
    </div>
  );
};

export default Home;