import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUser, 
  FiCode, 
  FiBriefcase,
  FiGlobe,
  FiMapPin,
  FiCalendar,
  FiExternalLink,
  FiChevronRight,
  FiAward,
  FiMail,
  FiPhone,
  FiGithub,
  FiLinkedin
} from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';
import { SiLeetcode, SiHackerrank } from 'react-icons/si';
import './About.css';

const About = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from resume.json
    fetch('/data/resume.json')
      .then(response => response.json())
      .then(data => {
        setUserData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setLoading(false);
      });
  }, []);

  const tabs = [
    { id: 'about', label: 'About Me', icon: <FiUser /> },
    { id: 'skills', label: 'Skills', icon: <FiCode /> },
    { id: 'education', label: 'Education', icon: <FaGraduationCap /> },
    { id: 'experience', label: 'Experience', icon: <FiBriefcase /> }
  ];

  // Process skills data into categories
  const getSkillsByCategory = () => {
    if (!userData?.skills) return { frontend: [], backend: [], database: [], tools: [] };

    const skills = userData.skills;
    const categories = {
      frontend: [],
      backend: [],
      database: [],
      tools: []
    };

    // Define skill mappings
    const frontendSkills = ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Bootstrap', 'Next.js', 'Angular', 'Tailwind CSS'];
    const backendSkills = ['Node.js', 'Python', 'C#', '.NET', 'Flask', 'Java', 'Express', 'Machine Learning', 'Deep Learning'];
    const databaseSkills = ['MongoDB', 'PostgreSQL', 'Firebase', 'Redis', 'SQL'];
    const toolsSkills = ['Git', 'Docker', 'AWS', 'Figma'];

    // Assign proficiency levels
    const proficiencyLevels = {
      'React': 95, 'React.js': 95,
      'JavaScript': 90,
      'TypeScript': 85,
      'HTML': 95, 'CSS': 95,
      'Bootstrap': 85,
      'Next.js': 80,
      'Angular': 70,
      'Tailwind CSS': 90,
      'Node.js': 88,
      'Python': 85,
      'C#': 80,
      '.NET': 80,
      'Flask': 75,
      'Core Java': 85,
      'Express': 85,
      'Machine Learning': 80,
      'Deep Learning': 75,
      'MongoDB': 85,
      'PostgreSQL': 80,
      'Firebase': 75,
      'Redis': 70,
      'SQL': 85,
      'Git': 90,
      'Docker': 75,
      'AWS': 70,
      'Figma': 85,
      'React Native': 75,
      'Flutter': 70
    };

    // Categorize skills
    skills.forEach(skill => {
      if (frontendSkills.includes(skill)) {
        categories.frontend.push({
          name: skill,
          level: proficiencyLevels[skill] || 75,
          color: getSkillColor(skill)
        });
      } else if (backendSkills.includes(skill)) {
        categories.backend.push({
          name: skill,
          level: proficiencyLevels[skill] || 75,
          color: getSkillColor(skill)
        });
      } else if (databaseSkills.includes(skill)) {
        categories.database.push({
          name: skill,
          level: proficiencyLevels[skill] || 75,
          color: getSkillColor(skill)
        });
      } else if (toolsSkills.includes(skill)) {
        categories.tools.push({
          name: skill,
          level: proficiencyLevels[skill] || 75,
          color: getSkillColor(skill)
        });
      }
    });

    return categories;
  };

  const getSkillColor = (skillName) => {
    const colorMap = {
      'React': '#61DAFB',
      'JavaScript': '#F7DF1E',
      'TypeScript': '#3178C6',
      'HTML': '#E34F26',
      'CSS': '#1572B6',
      'Bootstrap': '#7952B3',
      'Node.js': '#339933',
      'Python': '#3776AB',
      'C#': '#239120',
      '.NET': '#512BD4',
      'MongoDB': '#47A248',
      'PostgreSQL': '#336791',
      'Git': '#F05032',
      'Docker': '#2496ED',
      'AWS': '#FF9900',
      'Figma': '#F24E1E',
      'Java': '#007396',
      'SQL': '#4479A1',
      'Firebase': '#FFCA28',
      'Redis': '#DC382D',
      'Flutter': '#02569B',
      'Next.js': '#000000',
      'Angular': '#DD0031'
    };
    return colorMap[skillName] || '#6366f1';
  };

  const skills = getSkillsByCategory();

  const certifications = [
    { name: 'Full Stack Developer', issuer: 'Various Projects', year: '2024' },
    { name: 'AI/ML Specialist', issuer: 'Academic Projects', year: '2024' },
    { name: 'Web Development', issuer: 'Practical Experience', year: '2024' }
  ];

  if (loading) {
    return (
      <div className="about-page loading">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="loader"
        />
      </div>
    );
  }

  return (
    <div className="about-page">
      {/* Animated Background */}
      <div className="about-background">
        <div className="bg-gradient gradient-1"></div>
        <div className="bg-gradient gradient-2"></div>
        <div className="bg-gradient gradient-3"></div>
        <div className="floating-shapes">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="floating-shape"></div>
          ))}
        </div>
      </div>

      <div className="about-container">
        {/* Header Section */}
        <motion.section
          className="about-header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="header-content">
            <motion.div
              className="profile-badge"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <div className="badge-inner">👨‍💻</div>
            </motion.div>
            
            <div className="header-text">
              <h1 className="page-title">
                <span className="title-text">About</span>
                <span className="title-highlight">Me</span>
              </h1>
              <p className="page-subtitle">
                {userData?.title || 'Software Engineer'} from {userData?.location || 'India'}
              </p>
            </div>

            <div className="header-stats">
              <div className="stat">
                <div className="stat-number">{userData?.projects?.length || 5}+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat">
                <div className="stat-number">{userData?.skills?.length || 20}+</div>
                <div className="stat-label">Skills</div>
              </div>
              <div className="stat">
                <div className="stat-number">100%</div>
                <div className="stat-label">Dedication</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Main Content */}
        <div className="about-main">
          {/* Tabs Navigation */}
          <div className="tabs-navigation">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {/* About Tab */}
            {activeTab === 'about' && (
              <motion.div
                className="tab-pane"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="about-content">
                  <div className="about-text">
                    <h2 className="content-title">Hello! I'm {userData?.name}</h2>
                    <p className="content-description">
                      {userData?.summary || 'Results-oriented software developer with a proven track record in crafting efficient, scalable code.'}
                    </p>
                    <p className="content-description">
                      I specialize in creating intelligent, scalable solutions using cutting-edge technologies 
                      like React, Node.js, Python, and modern AI/ML frameworks. Passionate about transforming 
                      complex problems into elegant, user-friendly applications.
                    </p>
                    
                    <div className="personal-info">
                      <div className="info-item">
                        <FiMapPin className="info-icon" />
                        <span>Location: {userData?.location || 'Pune, India'}</span>
                      </div>
                      <div className="info-item">
                        <FiCalendar className="info-icon" />
                        <span>Experience: 2+ Years</span>
                      </div>
                      <div className="info-item">
                        <FiMail className="info-icon" />
                        <span>Email: {userData?.email || 'bijendramishra2002@gmail.com'}</span>
                      </div>
                      <div className="info-item">
                        <FiPhone className="info-icon" />
                        <span>Phone: {userData?.phone || '+91-9325784771'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="coding-profiles">
                    <h3 className="profiles-title">Connect With Me</h3>
                    <div className="profiles-grid">
                      <motion.a
                        href={userData?.github || "https://github.com/Bijendramishra123"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="profile-link github"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiGithub />
                        <span>GitHub</span>
                        <FiChevronRight className="link-arrow" />
                      </motion.a>
                      
                      <motion.a
                        href={userData?.linkedin || "https://www.linkedin.com/in/bijendra-mishraa-176744279"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="profile-link linkedin"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiLinkedin />
                        <span>LinkedIn</span>
                        <FiChevronRight className="link-arrow" />
                      </motion.a>
                      
                      <motion.a
                        href="https://leetcode.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="profile-link leetcode"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <SiLeetcode />
                        <span>LeetCode</span>
                        <FiChevronRight className="link-arrow" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <motion.div
                className="tab-pane"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="skills-content">
                  <h2 className="content-title">Technical Skills</h2>
                  <p className="content-subtitle">
                    Technologies and tools I use to build amazing products
                  </p>

                  <div className="skills-categories">
                    {Object.entries(skills).map(([category, items]) => (
                      items.length > 0 && (
                        <div key={category} className="skill-category">
                          <h3 className="category-title">
                            {category.charAt(0).toUpperCase() + category.slice(1)} Development
                          </h3>
                          <div className="skills-list">
                            {items.map((skill, index) => (
                              <motion.div
                                key={skill.name}
                                className="skill-item"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <div className="skill-header">
                                  <span className="skill-name">{skill.name}</span>
                                  <span className="skill-percent">{skill.level}%</span>
                                </div>
                                <div className="skill-bar">
                                  <motion.div
                                    className="skill-fill"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.level}%` }}
                                    transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                                    style={{ backgroundColor: skill.color }}
                                  />
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Education Tab */}
            {activeTab === 'education' && (
              <motion.div
                className="tab-pane"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="education-content">
                  <h2 className="content-title">Education</h2>
                  <p className="content-subtitle">
                    My academic journey and qualifications
                  </p>

                  <div className="timeline">
                    {userData?.education?.map((edu, index) => (
                      <motion.div
                        key={edu.degree}
                        className="timeline-item"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        <div className="timeline-marker">
                          <div className="marker-dot"></div>
                          {index !== userData.education.length - 1 && (
                            <div className="timeline-line"></div>
                          )}
                        </div>
                        
                        <div className="timeline-content glass-card">
                          <div className="timeline-header">
                            <h3 className="degree">{edu.degree}</h3>
                            <div className="gpa-badge">{edu.year}</div>
                          </div>
                          
                          <div className="timeline-meta">
                            <span className="meta-item">
                              <FaGraduationCap /> {edu.institution}
                            </span>
                            <span className="meta-item">
                              <FiCalendar /> {edu.year}
                            </span>
                          </div>
                          
                          <div className="achievements">
                            <h4>Focus Areas</h4>
                            <ul className="achievements-list">
                              {edu.degree.includes('Artificial Intelligence') ? (
                                <>
                                  <li className="achievement-item">
                                    <FiChevronRight /> Specialized in AI & Machine Learning
                                  </li>
                                  <li className="achievement-item">
                                    <FiChevronRight /> Advanced coursework in Data Science
                                  </li>
                                  <li className="achievement-item">
                                    <FiChevronRight /> Cutting-edge AI projects
                                  </li>
                                </>
                              ) : (
                                <>
                                  <li className="achievement-item">
                                    <FiChevronRight /> Software Development Fundamentals
                                  </li>
                                  <li className="achievement-item">
                                    <FiChevronRight /> Full-Stack Web Development
                                  </li>
                                  <li className="achievement-item">
                                    <FiChevronRight /> Database Management
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Experience Tab */}
            {activeTab === 'experience' && (
              <motion.div
                className="tab-pane"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="experience-content">
                  <h2 className="content-title">Professional Experience</h2>
                  <p className="content-subtitle">
                    My career journey and work experience
                  </p>

                  <div className="experience-timeline">
                    {userData?.experience?.map((exp, index) => (
                      <motion.div
                        key={exp.company}
                        className="experience-item glass-card"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="experience-header">
                          <div className="company-info">
                            <h3 className="company-name">{exp.company}</h3>
                            <span className="position">{exp.role}</span>
                          </div>
                          <div className="experience-meta">
                            <span className="meta-item">
                              <FiCalendar /> {exp.duration}
                            </span>
                            <span className="meta-item">
                              <FiMapPin /> {exp.company.includes('Pune') ? 'Pune, India' : 'India'}
                            </span>
                          </div>
                        </div>
                        
                        <p className="experience-description">
                          Contributed to software development projects with focus on backend systems and API development.
                        </p>
                        
                        <div className="achievements">
                          <h4>Key Responsibilities</h4>
                          <ul className="achievements-list">
                            {exp.details.map((detail, idx) => (
                              <li key={idx} className="achievement-item">
                                <FiChevronRight /> {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="tech-stack">
                          {['ASP.NET Core', 'Web API', 'C#', 'SQL', 'JWT', 'Entity Framework'].map((tech) => (
                            <span key={tech} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Certifications Sidebar */}
          <div className="certifications-sidebar">
            <h3 className="sidebar-title">
              <FiAward className="title-icon" />
              Achievements
            </h3>
            
            <div className="certifications-list">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  className="certification-item"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="cert-badge"></div>
                  <div className="cert-info">
                    <h4 className="cert-name">{cert.name}</h4>
                    <p className="cert-issuer">{cert.issuer}</p>
                    <span className="cert-year">{cert.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="projects-highlight">
              <h4 className="highlight-title">Projects Portfolio</h4>
              <p className="highlight-text">
                Built {userData?.projects?.length || 5}+ projects including AI/ML applications, 
                full-stack web apps, and mobile applications.
              </p>
            </div>
            
            <motion.a
              href="#contact"
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiExternalLink />
              <span>Get in Touch</span>
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;