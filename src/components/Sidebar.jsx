// src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin, FaYoutube, FaFolder } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "./Sidebar.css";

const MotionAside = motion.aside;
const MotionOverlay = motion.div;

export default function Sidebar() {
  const data = useSelector((state) => state.resume);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // toggle from Navbar
  useEffect(() => {
    const handler = () => setOpen((prev) => !prev);
    window.addEventListener("sidebar:toggle", handler);
    return () => window.removeEventListener("sidebar:toggle", handler);
  }, []);

  // responsive: open always on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991) setOpen(true);
      else setOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // close on route change (for mobile)
  useEffect(() => {
    if (window.innerWidth <= 991) setOpen(false);
  }, [location]);

  // lock body scroll on mobile, mark sidebar state on body for desktop
  useEffect(() => {
    if (window.innerWidth <= 991) {
      if (open) document.body.classList.add("body-no-scroll");
      else document.body.classList.remove("body-no-scroll");
    } else {
      if (open) document.body.classList.add("sidebar-open");
      else document.body.classList.remove("sidebar-open");
    }
  }, [open]);

  const closeSidebar = () => {
    if (window.innerWidth <= 991) {
      setOpen(false);
    }
  };

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
    exit: { x: "-100%" }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <MotionAside
            className="sidebar"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            aria-hidden={!open && window.innerWidth < 992}
          >
            <div className="sidebar-inner container-custom">
              {/* Sidebar Head (without profile photo) */}
              <div className="sidebar-head">
                <div>
                  <h4>{data.name}</h4>
                  <p className="muted">{data.title}</p>
                </div>
              </div>

              {/* Projects */}
              <div className="sidebar-section">
                <h5>Projects</h5>
                <ul className="project-list">
                  {data.projects.map((p) => (
                    <li key={p.id}>
                      <Link to={`/projects/${p.slug}`} onClick={closeSidebar}>
                        <FaFolder className="icon" /> {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social */}
              <div className="sidebar-section social">
                {data.github && (
                  <a href={data.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                    <FaGithub />
                  </a>
                )}
                {data.linkedin && (
                  <a href={data.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <FaLinkedin />
                  </a>
                )}
                {/* Optional: YouTube icon linking to first project video */}
                {data.projects?.[0]?.video && (
                  <a
                    href={data.projects[0].video}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Project video"
                  >
                    <FaYoutube />
                  </a>
                )}
              </div>
            </div>
          </MotionAside>
        )}
      </AnimatePresence>

      {/* overlay for mobile */}
      <AnimatePresence>
        {open && window.innerWidth <= 991 && (
          <MotionOverlay
            className="overlay"
            onClick={closeSidebar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
