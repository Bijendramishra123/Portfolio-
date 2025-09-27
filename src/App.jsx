import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import ProjectPage from "./pages/ProjectPage";
import "./App.css";

// alias variables so ESLint sees them as used
const MotionDiv = motion.div;

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const pageTransition = { duration: 0.35, ease: "easeOut" };

export default function App() {
  const location = useLocation();

  return (
    <div className="app">
      <Navbar />
      <Sidebar />

      <main className="page-wrap" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <MotionDiv
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <Home />
                </MotionDiv>
              }
            />
            <Route
              path="/about"
              element={
                <MotionDiv
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <About />
                </MotionDiv>
              }
            />
            <Route
              path="/profile"
              element={
                <MotionDiv
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <Profile />
                </MotionDiv>
              }
            />
            <Route
              path="/contact"
              element={
                <MotionDiv
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <Contact />
                </MotionDiv>
              }
            />
            <Route
              path="/projects/:slug"
              element={
                <MotionDiv
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={pageTransition}
                >
                  <ProjectPage />
                </MotionDiv>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
