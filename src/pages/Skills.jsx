import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiCpu, FiDatabase, FiCloud, FiTool, FiLayers } from 'react-icons/fi';
import { 
  SiReact, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPython, SiMongodb, SiPostgresql, SiFirebase,
  SiRedis, SiGit, SiDocker, SiFigma,
  SiDotnet, SiFlutter, SiNextdotjs, SiAngular, SiBootstrap
} from 'react-icons/si';
import { FaJava, FaAws } from 'react-icons/fa';
import './Skills.css';

// Hardcoded skills data from your JSON
const defaultSkills = [
  "Core Java",
  "React.js",
  "JavaScript",
  "C#",
  ".NET",
  "Python",
  "SQL",
  "MongoDB",
  "HTML",
  "CSS",
  "Bootstrap",
  "Node.js",
  "Docker",
  "Machine Learning",
  "Deep Learning",
  "Flutter",
  "flask",
  "React-Native",
  "React-expo",
  "Next.js",
  "Angular"
];

// Or import directly from JSON if it's in src folder
// import resumeData from '../data/resume.json';

const Skills = () => {
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try multiple paths for JSON file
    const loadSkills = async () => {
      try {
        // Try different possible paths
        const paths = [
          '/data/resume.json',
          './data/resume.json',
          '/src/data/resume.json',
          'resume.json'
        ];
        
        let data = null;
        
        for (const path of paths) {
          try {
            const response = await fetch(path);
            if (response.ok) {
              const jsonData = await response.json();
              data = jsonData;
              console.log('Loaded skills from:', path);
              break;
            }
          } catch (err) {
            // Try next path
            continue;
          }
        }
        
        // If no JSON file found, use default skills
        const skillsToUse = data?.skills || defaultSkills;
        const processedSkills = processSkillsFromResume(skillsToUse);
        setSkillsData(processedSkills);
        
      } catch (error) {
        console.warn('Using default skills data:', error.message);
        // Use hardcoded skills
        const processedSkills = processSkillsFromResume(defaultSkills);
        setSkillsData(processedSkills);
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  // Function to get icon for each skill
  const getSkillIcon = (skillName) => {
    const iconMap = {
      'React': <SiReact />,
      'React.js': <SiReact />,
      'JavaScript': <SiJavascript />,
      'TypeScript': <SiTypescript />,
      'HTML': <SiHtml5 />,
      'CSS': <SiCss3 />,
      'Tailwind CSS': <SiTailwindcss />,
      'Bootstrap': <SiBootstrap />,
      'Node.js': <SiNodedotjs />,
      'Python': <SiPython />,
      'MongoDB': <SiMongodb />,
      'PostgreSQL': <SiPostgresql />,
      'Firebase': <SiFirebase />,
      'Redis': <SiRedis />,
      'Git': <SiGit />,
      'Docker': <SiDocker />,
      'AWS': <FaAws />,
      'Figma': <SiFigma />,
      'Core Java': <FaJava />,
      'Java': <FaJava />,
      'C#': <FiCode />,
      '.NET': <SiDotnet />,
      'Flutter': <SiFlutter />,
      'Next.js': <SiNextdotjs />,
      'Angular': <SiAngular />,
      'Express': <FiCode />,
      'Machine Learning': <FiCpu />,
      'Deep Learning': <FiCpu />,
      'Flask': <FiCode />,
      'SQL': <FiDatabase />,
      'flask': <FiCode />,
      'React-Native': <SiReact />,
      'React-expo': <SiReact />
    };

    return iconMap[skillName] || <FiTool />;
  };

  // Process skills from resume.json into categories
  const processSkillsFromResume = (skillsArray) => {
    // Define skill categories with base structure
    const categories = {
      "Frontend": {
        title: "Frontend",
        icon: <FiCode />,
        skills: []
      },
      "Backend": {
        title: "Backend",
        icon: <FiCpu />,
        skills: []
      },
      "Database": {
        title: "Database",
        icon: <FiDatabase />,
        skills: []
      },
      "DevOps & Tools": {
        title: "DevOps & Tools",
        icon: <FiCloud />,
        skills: []
      },
      "Mobile": {
        title: "Mobile",
        icon: <FiLayers />,
        skills: []
      }
    };

    // Skill categorization logic
    const skillCategories = {
      'Frontend': ['React', 'React.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'Next.js', 'Angular'],
      'Backend': ['Node.js', 'Python', 'Express', 'Core Java', 'Java', 'C#', '.NET', 'Flask', 'flask', 'Machine Learning', 'Deep Learning'],
      'Database': ['MongoDB', 'PostgreSQL', 'Firebase', 'Redis', 'SQL'],
      'DevOps & Tools': ['Git', 'Docker', 'AWS', 'Figma'],
      'Mobile': ['Flutter', 'React-Native', 'React-expo']
    };

    // Assign proficiency levels
    const proficiencyLevels = {
      'React': 95, 'React.js': 95,
      'JavaScript': 90,
      'TypeScript': 85,
      'HTML': 95, 'CSS': 95,
      'Tailwind CSS': 90,
      'Bootstrap': 85,
      'Node.js': 88,
      'Python': 85,
      'MongoDB': 85,
      'PostgreSQL': 80,
      'Git': 90,
      'Docker': 75,
      'Core Java': 85,
      'Java': 85,
      'C#': 80,
      '.NET': 80,
      'Flutter': 75,
      'Next.js': 80,
      'Angular': 70,
      'Express': 85,
      'Machine Learning': 80,
      'Deep Learning': 75,
      'Firebase': 75,
      'Redis': 70,
      'AWS': 70,
      'Figma': 85,
      'React Native': 75,
      'React-Native': 75,
      'React-expo': 75,
      'Flask': 75,
      'flask': 75,
      'SQL': 85
    };

    // Categorize skills
    skillsArray.forEach(skill => {
      let categorized = false;
      
      for (const [category, skillList] of Object.entries(skillCategories)) {
        if (skillList.includes(skill)) {
          categories[category].skills.push({
            name: skill,
            level: proficiencyLevels[skill] || 75,
            icon: getSkillIcon(skill)
          });
          categorized = true;
          break;
        }
      }

      // If not categorized, add to Others
      if (!categorized) {
        if (!categories['Others']) {
          categories['Others'] = {
            title: "Others",
            icon: <FiTool />,
            skills: []
          };
        }
        categories['Others'].skills.push({
          name: skill,
          level: proficiencyLevels[skill] || 75,
          icon: getSkillIcon(skill)
        });
      }
    });

    // Convert to array and filter out empty categories
    return Object.values(categories).filter(cat => cat.skills.length > 0);
  };

  // Floating particles background
  const ParticleBackground = () => {
    return (
      <div className="particles-container">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
            }}
            animate={{
              y: [null, -30, 30, -30],
              x: [null, 20, -20, 20],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="skills-page page-container flex items-center justify-center">
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
      className="skills-page page-container"
    >
      <ParticleBackground />
      
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="section-header"
      >
        <h1 className="section-title gradient-text">Skills & Expertise</h1>
        <p className="section-subtitle">Technologies I've mastered and tools I work with</p>
      </motion.div>

      <div className="skills-grid mt-8">
        {skillsData.length > 0 ? (
          skillsData.map((category, catIndex) => (
            <motion.div
              key={category.title}
              className="skill-category glass-card"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: catIndex * 0.15,
                type: "spring",
                stiffness: 100 
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <div className="category-header">
                <motion.div
                  className="category-icon"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    delay: catIndex * 0.5 
                  }}
                >
                  {category.icon}
                </motion.div>
                <div>
                  <h3 className="category-title">{category.title}</h3>
                  <p className="text-sm text-slate-400 mt-1">
                    {category.skills.length} skills
                  </p>
                </div>
              </div>
              
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="skill-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (catIndex * 0.1) + (skillIndex * 0.05) }}
                  >
                    <div className="skill-info">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400">
                          {skill.icon}
                        </span>
                        <span className="skill-name">{skill.name}</span>
                      </div>
                      <span className="skill-percent">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: (catIndex * 0.1) + (skillIndex * 0.05), 
                          duration: 1.5,
                          ease: "easeOut"
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Skill level indicator */}
              <motion.div 
                className="mt-4 pt-4 border-t border-slate-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: catIndex * 0.2 + 0.5 }}
              >
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Advanced</span>
                  <span>Expert</span>
                </div>
              </motion.div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-4 text-center py-10">
            <p className="text-slate-400">No skills data available</p>
          </div>
        )}
      </div>

      {/* Overall proficiency indicator */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="glass-card max-w-4xl mx-auto mt-12"
      >
        <h3 className="text-xl font-bold text-white mb-4">Overall Technical Proficiency</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-lg bg-slate-800/50">
            <div className="text-3xl font-bold text-blue-400">95%</div>
            <div className="text-sm text-slate-300">Frontend</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-slate-800/50">
            <div className="text-3xl font-bold text-green-400">85%</div>
            <div className="text-sm text-slate-300">Backend</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-slate-800/50">
            <div className="text-3xl font-bold text-yellow-400">80%</div>
            <div className="text-sm text-slate-300">Database</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-slate-800/50">
            <div className="text-3xl font-bold text-purple-400">85%</div>
            <div className="text-sm text-slate-300">Full Stack</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Skills;