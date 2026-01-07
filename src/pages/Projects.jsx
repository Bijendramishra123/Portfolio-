import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { 
  FiFilter, 
  FiSearch, 
  FiGrid, 
  FiList, 
  FiStar,
  FiCode,
  FiGlobe,
  FiTrendingUp,
  FiChevronDown,
  FiX,
  FiZap,
  FiCpu,
  FiLayers
} from 'react-icons/fi';
import { FaReact, FaNodeJs, FaPython, FaMobileAlt } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiMongodb, SiDjango } from 'react-icons/si';
import './Projects.css';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  const projects = [
    {
      id: "project-1",
      title: "AI Chat Assistant",
      slug: "ai-chat-assistant",
      tech: ["React", "Node.js", "OpenAI API", "Socket.io", "TypeScript", "MongoDB"],
      overview: "Intelligent chatbot powered by GPT-4 with real-time responses and sentiment analysis.",
      category: "AI/ML",
      featured: true,
      github: "https://github.com/Bijendramishra123",
      live: "",
      status: "Live",
      duration: "4 months",
      views: 2450,
      likes: 189,
      tags: ["AI", "Chatbot", "Real-time"]
    },
    {
      id: "project-2",
      title: "Weather Dashboard Pro",
      slug: "weather-dashboard-pro",
      tech: ["Django", "Python", "React", "OpenWeather API", "Chart.js"],
      overview: "Advanced weather forecasting with interactive maps and historical data analysis.",
      category: "Web App",
      featured: true,
      github: "https://github.com/Bijendramishra123",
      live: "",
      status: "Complete",
      duration: "3 months",
      views: 1870,
      likes: 142,
      tags: ["Weather", "Django", "API"]
    },
    {
      id: "project-3",
      title: "Modern Portfolio v3.0",
      slug: "modern-portfolio-v3",
      tech: ["Next.js", "TypeScript", "Framer Motion", "Three.js", "Tailwind CSS"],
      overview: "Contemporary portfolio with 3D animations and smooth interactive elements.",
      category: "Portfolio",
      featured: false,
      github: "https://github.com/Bijendramishra123",
      live: "https://bijendra.dev",
      status: "In Progress",
      duration: "2 months",
      views: 980,
      likes: 76,
      tags: ["Portfolio", "Next.js", "Animation"]
    },
    {
      id: "project-4",
      title: "Ramayan FullStack App",
      slug: "ramayan-fullstack-app",
      tech: ["React", "Bootstrap", "ASP.NET Core Web API", "SQL Server"],
      overview: "Full-stack web application displaying Ramayan content with user authentication.",
      category: "Web App",
      featured: true,
      github: "https://github.com/Bijendramishra123/Ramayan-gita-app",
      live: "",
      status: "Complete",
      duration: "2 months",
      views: 1560,
      likes: 98,
      tags: ["Full-stack", "ASP.NET", "Cultural"]
    },
    {
      id: "project-5",
      title: "AI Placement Checker",
      slug: "ai-placement-checker",
      tech: ["Python", "Machine Learning", "React", "MongoDB", "Scikit-learn"],
      overview: "ML project predicting placement eligibility based on student academic data.",
      category: "AI/ML",
      featured: true,
      github: "https://github.com/Bijendramishra123",
      live: "",
      status: "Complete",
      duration: "3 months",
      views: 1340,
      likes: 112,
      tags: ["AI", "Machine Learning", "Education"]
    },
    {
      id: "project-6",
      title: "Resume Checker AI Web App",
      slug: "resume-checker-ai-web-app",
      tech: ["Python", "React", "ML", "MongoDB", "NLP", "FastAPI"],
      overview: "AI-powered resume analyzer providing improvement suggestions based on job descriptions.",
      category: "AI/ML",
      featured: true,
      github: "https://github.com/Bijendramishra123",
      live: "https://resume-checker.bijendra.com",
      status: "Live",
      duration: "4 months",
      views: 1890,
      likes: 156,
      tags: ["AI", "NLP", "Resume"]
    },
    {
      id: "project-7",
      title: "Rental Roadies App",
      slug: "rental-roadies-app",
      tech: ["React Native", "Expo", "JavaScript", "ASP.NET Core Web API", "Firebase"],
      overview: "Bike rental application with real-time availability and booking system.",
      category: "Mobile App",
      featured: false,
      github: "https://github.com/Bijendramishra123/Rental-Roadies-App",
      live: "",
      status: "Beta",
      duration: "3 months",
      views: 1240,
      likes: 89,
      tags: ["Mobile", "React Native", "Rental"]
    },
    {
      id: "project-8",
      title: "Pantry Management System",
      slug: "pantry-management-system",
      tech: ["React", "Node.js", "ASP.NET Core Web API", "SQL Server", "Bootstrap"],
      overview: "Web app to manage pantry inventory with tracking and alert features.",
      category: "Web App",
      featured: false,
      github: "https://github.com/Bijendramishra123/pantry-management-system",
      live: "",
      status: "Complete",
      duration: "2 months",
      views: 980,
      likes: 67,
      tags: ["Inventory", "Management", "Productivity"]
    },
    {
      id: "project-9",
      title: "E-Commerce Platform",
      slug: "e-commerce-platform",
      tech: ["Next.js", "Stripe", "MongoDB", "Tailwind CSS", "Node.js", "Redux"],
      overview: "Full-stack e-commerce solution with payment integration and admin dashboard.",
      category: "Web App",
      featured: true,
      github: "https://github.com/Bijendramishra123",
      live: "https://shop.bijendra.com",
      status: "Live",
      duration: "5 months",
      views: 3120,
      likes: 234,
      tags: ["E-commerce", "Full-stack", "Payment"]
    }
  ];

  // Categories with icons
  const categories = [
    { id: 'all', label: 'All Projects', icon: <FiGrid />, count: projects.length },
    { id: 'AI/ML', label: 'AI/ML', icon: <FiCpu />, count: projects.filter(p => p.category === 'AI/ML').length },
    { id: 'Web App', label: 'Web Apps', icon: <FaReact />, count: projects.filter(p => p.category === 'Web App').length },
    { id: 'Mobile App', label: 'Mobile Apps', icon: <FaMobileAlt />, count: projects.filter(p => p.category === 'Mobile App').length },
    { id: 'Portfolio', label: 'Portfolios', icon: <FiGlobe />, count: projects.filter(p => p.category === 'Portfolio').length },
  ];

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.overview.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }
    
    // Sort projects
    switch (sortBy) {
      case 'featured':
        filtered.sort((a, b) => (b.featured === a.featured) ? 0 : b.featured ? 1 : -1);
        break;
      case 'views':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'likes':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'recent':
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        break;
    }
    
    return filtered;
  }, [projects, searchTerm, selectedCategory, sortBy]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="projects-page"
    >
      <div className="projects-container">
        {/* Hero Header */}
        <motion.div 
          className="projects-hero"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="hero-content">
            <div className="badge-container">
              <motion.span 
                className="featured-badge"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FiStar /> Featured Projects
              </motion.span>
              <span className="project-count">{projects.length} Projects</span>
            </div>
            
            <h1 className="hero-title">
              My <span className="gradient-text">Projects</span>
            </h1>
            
            <p className="hero-description">
              A collection of my work showcasing skills in full-stack development, 
              AI/ML integration, and modern web technologies.
            </p>
          </div>

          {/* Stats Overview */}
          <motion.div 
            className="stats-overview"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="stat-item" variants={itemVariants}>
              <div className="stat-icon">
                <FiCode />
              </div>
              <div className="stat-content">
                <span className="stat-value">{projects.length}</span>
                <span className="stat-label">Total Projects</span>
              </div>
            </motion.div>
            
            <motion.div className="stat-item" variants={itemVariants}>
              <div className="stat-icon">
                <FiZap />
              </div>
              <div className="stat-content">
                <span className="stat-value">{projects.filter(p => p.featured).length}</span>
                <span className="stat-label">Featured</span>
              </div>
            </motion.div>
            
            <motion.div className="stat-item" variants={itemVariants}>
              <div className="stat-icon">
                <FiGlobe />
              </div>
              <div className="stat-content">
                <span className="stat-value">{projects.filter(p => p.live).length}</span>
                <span className="stat-label">Live Demos</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Controls Bar */}
        <motion.div 
          className="controls-bar"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Search Bar */}
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="clear-search"
              >
                <FiX />
              </button>
            )}
          </div>

          {/* View Controls */}
          <div className="view-controls">
            <button
              onClick={() => setViewMode('grid')}
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              title="Grid View"
            >
              <FiGrid />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              title="List View"
            >
              <FiList />
            </button>
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`filter-btn ${showFilters ? 'active' : ''}`}
          >
            <FiFilter />
            <span>Filters</span>
            {showFilters && <FiChevronDown className="chevron" />}
          </button>
        </motion.div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="filters-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Categories */}
              <div className="filter-section">
                <h4 className="filter-title">
                  <FiGrid />
                  Categories
                </h4>
                <div className="category-filters">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                    >
                      <span className="category-icon">{category.icon}</span>
                      <span className="category-label">{category.label}</span>
                      <span className="category-count">{category.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div className="filter-section">
                <h4 className="filter-title">
                  <FiTrendingUp />
                  Sort By
                </h4>
                <div className="sort-options">
                  {['featured', 'views', 'likes', 'recent'].map((option) => (
                    <button
                      key={option}
                      onClick={() => setSortBy(option)}
                      className={`sort-btn ${sortBy === option ? 'active' : ''}`}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Display */}
        {filteredAndSortedProjects.length > 0 ? (
          <motion.div
            className={`projects-display ${viewMode}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={viewMode}
          >
            <AnimatePresence mode="wait">
              {filteredAndSortedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProjectCard 
                    project={project} 
                    index={index}
                    viewMode={viewMode}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            className="no-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="no-results-content">
              <FiSearch className="no-results-icon" />
              <h3>No projects found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSortBy('featured');
                }}
                className="reset-btn"
              >
                Reset Filters
              </button>
            </div>
          </motion.div>
        )}

        {/* Footer Stats */}
        {filteredAndSortedProjects.length > 0 && (
          <motion.div 
            className="results-footer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="results-stats">
              <span className="results-count">
                Showing <strong>{filteredAndSortedProjects.length}</strong> of {projects.length} projects
              </span>
              <div className="results-tags">
                {selectedCategory !== 'all' && (
                  <span className="active-tag">
                    {categories.find(c => c.id === selectedCategory)?.label}
                  </span>
                )}
                {searchTerm && (
                  <span className="active-tag">
                    Search: "{searchTerm}"
                  </span>
                )}
              </div>
            </div>
            
            <div className="tech-highlight">
              <span className="highlight-label">Tech Stack:</span>
              <div className="tech-icons">
                <FaReact title="React" />
                <FaNodeJs title="Node.js" />
                <SiTypescript title="TypeScript" />
                <SiNextdotjs title="Next.js" />
                <SiMongodb title="MongoDB" />
                <FaPython title="Python" />
                <SiDjango title="Django" />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Projects;