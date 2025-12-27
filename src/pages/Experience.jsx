import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiMapPin, FiCheckCircle, FiBook } from 'react-icons/fi';
import './Experience.css';

const Experience = () => {
  const [experienceData, setExperienceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExperience = async () => {
      try {
        // Import JSON directly from src/data folder
        const response = await fetch('/src/data/resume.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Create experience data from JSON
        const processedExperience = [
          // Add internship experience from JSON
          {
            id: 1,
            company: data.experience?.[0]?.company || "MDI Networx, Pune",
            position: data.experience?.[0]?.role || "Junior Software Developer Intern",
            duration: data.experience?.[0]?.duration || "Feb 2024 – Apr 2024",
            location: "Pune, India",
            description: "Gained hands-on experience in full-stack development with .NET technologies and contributed to real-world projects.",
            details: data.experience?.[0]?.details || [
              "Developed RESTful APIs using ASP.NET Core / Web API",
              "Worked with Entity Framework Core for efficient data access and LINQ queries",
              "Implemented Authentication & Authorization using JWT and ASP.NET Identity",
              "Collaborated with senior developers for complex problem-solving",
              "Customized features for client applications to meet business requirements"
            ],
            tech: ["ASP.NET Core", "Web API", "Entity Framework", "JWT", "C#", "SQL", "REST APIs"],
            type: "professional"
          },
          // Add MCA education from JSON
          {
            id: 2,
            company: data.education?.[0]?.institution || "Parul University, Vadodara",
            position: data.education?.[0]?.degree || "MCA in Artificial Intelligence",
            duration: data.education?.[0]?.year || "2024 – 2026",
            location: "Vadodara, India",
            description: "Pursuing Masters in Computer Applications with specialization in Artificial Intelligence.",
            details: [
              "Specializing in AI and Machine Learning",
              "Advanced coursework in Data Structures, Algorithms, and ML",
              "Working on cutting-edge AI projects",
              "Focus on both theoretical and practical aspects of AI"
            ],
            tech: ["Machine Learning", "Deep Learning", "Python", "AI Algorithms", "Data Science"],
            type: "education"
          },
          // Add BCA education from JSON
          {
            id: 3,
            company: data.education?.[1]?.institution || "IMED Pune",
            position: data.education?.[1]?.degree || "BCA in Computer Science",
            duration: data.education?.[1]?.year || "2021 – 2024",
            location: "Pune, India",
            description: "Completed Bachelor's in Computer Applications with focus on software development fundamentals.",
            details: [
              "Graduated with strong foundation in Computer Science",
              "Completed multiple software development projects",
              "Gained expertise in full-stack development",
              "Developed problem-solving and analytical skills"
            ],
            tech: ["Java", "Web Development", "Database", "Software Engineering"],
            type: "education"
          }
        ];
        
        setExperienceData(processedExperience);
        setLoading(false);
        
      } catch (error) {
        console.error('Error loading experience data:', error);
        
        // Fallback to default data
        const defaultData = [
          {
            id: 1,
            company: "MDI Networx, Pune",
            position: "Junior Software Developer Intern",
            duration: "Feb 2024 – Apr 2024",
            location: "Pune, India",
            description: "Gained hands-on experience in full-stack development with .NET technologies and contributed to real-world projects.",
            details: [
              "Developed RESTful APIs using ASP.NET Core / Web API",
              "Worked with Entity Framework Core for efficient data access and LINQ queries",
              "Implemented Authentication & Authorization using JWT and ASP.NET Identity",
              "Collaborated with senior developers for complex problem-solving",
              "Customized features for client applications to meet business requirements"
            ],
            tech: ["ASP.NET Core", "Web API", "Entity Framework", "JWT", "C#", "SQL", "REST APIs"],
            type: "professional"
          },
          {
            id: 2,
            company: "Parul University, Vadodara",
            position: "MCA in Artificial Intelligence",
            duration: "2024 – 2026",
            location: "Vadodara, India",
            description: "Pursuing Masters in Computer Applications with specialization in Artificial Intelligence.",
            details: [
              "Specializing in AI and Machine Learning",
              "Advanced coursework in Data Structures, Algorithms, and ML",
              "Working on cutting-edge AI projects",
              "Focus on both theoretical and practical aspects of AI"
            ],
            tech: ["Machine Learning", "Deep Learning", "Python", "AI Algorithms", "Data Science"],
            type: "education"
          },
          {
            id: 3,
            company: "IMED Pune",
            position: "BCA in Computer Science",
            duration: "2021 – 2024",
            location: "Pune, India",
            description: "Completed Bachelor's in Computer Applications with focus on software development fundamentals.",
            details: [
              "Graduated with strong foundation in Computer Science",
              "Completed multiple software development projects",
              "Gained expertise in full-stack development",
              "Developed problem-solving and analytical skills"
            ],
            tech: ["Java", "Web Development", "Database", "Software Engineering"],
            type: "education"
          }
        ];
        
        setExperienceData(defaultData);
        setLoading(false);
      }
    };

    loadExperience();
  }, []);

  // Floating particles background
  const ParticleBackground = () => {
    return (
      <div className="particles-container">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              width: Math.random() * 80 + 30,
              height: Math.random() * 80 + 30,
            }}
            animate={{
              y: [null, -20, 20, -20],
              x: [null, 15, -15, 15],
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  };

  const getTypeIcon = (type) => {
    return type === 'education' ? <FiBook /> : <FiBriefcase />;
  };

  const getTypeColor = (type) => {
    return type === 'education' 
      ? 'linear-gradient(135deg, #8b5cf6, #a78bfa)' 
      : 'linear-gradient(135deg, #3b82f6, #60a5fa)';
  };

  if (loading) {
    return (
      <div className="experience-page page-container loading-container">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="experience-page page-container"
    >
      <ParticleBackground />
      
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="section-header"
      >
        <h1 className="section-title gradient-text">Experience & Education</h1>
        <p className="section-subtitle">My professional journey and academic achievements</p>
      </motion.div>

      <div className="timeline mt-12">
        {experienceData.map((exp, index) => (
          <motion.div
            key={exp.id}
            className="timeline-item"
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.2,
              type: "spring",
              stiffness: 100 
            }}
          >
            <motion.div
              className="timeline-marker"
              style={{ background: getTypeColor(exp.type) }}
              animate={{ 
                scale: [1, 1.2, 1],
                boxShadow: [
                  '0 0 0 0 rgba(59, 130, 246, 0.7)',
                  '0 0 0 10px rgba(59, 130, 246, 0)',
                  '0 0 0 0 rgba(59, 130, 246, 0)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.5
              }}
            >
              <div className="text-white text-xl">
                {getTypeIcon(exp.type)}
              </div>
            </motion.div>
            
            <div className="timeline-content">
              {index === 0 && exp.type === 'professional' && (
                <div className="achievement-badge">
                  <FiCheckCircle className="inline mr-1" /> Latest Experience
                </div>
              )}
              
              <div className="timeline-header">
                <div className="flex items-center gap-3 mb-2">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl"
                    style={{ background: getTypeColor(exp.type) }}
                  >
                    {getTypeIcon(exp.type)}
                  </div>
                  <div>
                    <h3 className="company-name">{exp.company}</h3>
                    <span 
                      className="position"
                      style={{ 
                        background: getTypeColor(exp.type),
                        color: 'white'
                      }}
                    >
                      {exp.position}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="timeline-meta">
                <span className="meta-item">
                  <FiCalendar /> {exp.duration}
                </span>
                <span className="meta-item">
                  <FiMapPin /> {exp.location}
                </span>
                <span className="meta-item">
                  {exp.type === 'education' ? <FiBook /> : <FiBriefcase />} 
                  {exp.type === 'education' ? 'Education' : 'Professional'}
                </span>
              </div>
              
              <p className="timeline-description">{exp.description}</p>
              
              {exp.details && (
                <div className="timeline-details">
                  <h4 className="details-title">
                    {exp.type === 'education' ? 'Key Learnings:' : 'Key Responsibilities & Achievements:'}
                  </h4>
                  <ul className="details-list">
                    {exp.details.map((detail, i) => (
                      <motion.li
                        key={i}
                        className="detail-item"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index * 0.1) + (i * 0.05) }}
                      >
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="timeline-tech">
                {exp.tech.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="tech-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index * 0.1) + (i * 0.05) }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Information Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="glass-card max-w-4xl mx-auto mt-12"
      >
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-400">0-1</div>
            <div className="text-sm text-slate-300">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">5+</div>
            <div className="text-sm text-slate-300">Projects Completed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-400">Full Stack</div>
            <div className="text-sm text-slate-300">Development Focus</div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Continuously learning and expanding skills in modern web technologies and AI/ML
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Experience;