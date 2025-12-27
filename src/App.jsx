// src/App.jsx
import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Skills from "./pages/Skills";
import ProjectPage from "./pages/ProjectPage";

import "./App.css";

// ✅ Lazy load ChatBot (performance optimized)
const ChatBot = lazy(() => import("./components/ChatBot"));

/* Page animation variants */
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const pageTransition = {
  duration: 0.35,
  ease: "easeOut",
};

/* Animated Routes Component */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Home />
            </motion.div>
          }
        />

        <Route
          path="/about"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <About />
            </motion.div>
          }
        />

        <Route
          path="/profile"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Profile />
            </motion.div>
          }
        />

        <Route
          path="/contact"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Contact />
            </motion.div>
          }
        />

        <Route
          path="/projects"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Projects />
            </motion.div>
          }
        />

        <Route
          path="/experience"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Experience />
            </motion.div>
          }
        />

        <Route
          path="/skills"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <Skills />
            </motion.div>
          }
        />

        <Route
          path="/projects/:slug"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              <ProjectPage />
            </motion.div>
          }
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="page-container not-found"
            >
              <h1 className="gradient-text">404 - Page Not Found</h1>
              <p className="mt-2">
                The page you're looking for doesn't exist.
              </p>
              <a href="/" className="btn mt-3">
                Go Back Home
              </a>
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

/* Main App Component */
export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Sidebar />

      <main className="main-content">
        <AnimatedRoutes />
      </main>

      {/* ✅ ChatBot visible on ALL pages */}
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>

      <Footer />
    </div>
  );
}
