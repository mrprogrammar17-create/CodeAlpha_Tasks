import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import RevealOnScroll from './components/RevealOnScroll';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Initializer with local storage checks
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        return true;
      }
      if (savedTheme === 'light') {
        return false;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true; // Default dark theme for high-end feel
  });

  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Synchronize Dark Mode visual toggles
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Loading Screen Timer
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(loadTimer);
  }, []);

  // Track scroll depth indicators & Back to Top triggers
  useEffect(() => {
    const handleScrollTracking = () => {
      // Back to top indicator
      setShowBackToTop(window.scrollY > 400);

      // Scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScrollTracking);
    return () => window.removeEventListener('scroll', handleScrollTracking);
  }, []);

  // Active Section Navigation Tracker
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'services', 'projects', 'testimonials', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // focused viewport zone
      threshold: 0,
    };

    const sectionElements = sections.map((id) => document.getElementById(id));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      sectionElements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [isLoading]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleReturnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Full-Screen Premium Loading Screen Spinner
  if (isLoading) {
    return (
      <div
        id="app-loader-splash"
        className="fixed inset-0 z-[99999] bg-slate-950 flex flex-col items-center justify-center space-y-6"
      >
        <div className="relative flex items-center justify-center">
          {/* Central Logo */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-lg shadow-blue-500/20 animate-wiggle">
            KK
          </div>
          {/* Outer Ring Spinning */}
          <div className="absolute inset-5 w-24 h-24 border-2 border-transparent border-t-blue-550 border-r-indigo-500 rounded-full animate-spin -m-4" />
        </div>
        
        <div className="text-center space-y-2">
          <h2 className="text-xl font-sans font-extrabold text-white tracking-widest uppercase">
            Kamran Khan
          </h2>
          <p className="text-xs font-mono text-slate-500 tracking-wider">
            Loading Portfolio Canvas...
          </p>
        </div>

        {/* Dynamic sliding fill line indicator */}
        <div className="w-48 h-[3px] bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-600 to-violet-600 animate-loading-bar" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans cursor-default select-none overflow-x-hidden">
      
      {/* Scroll Progress Indicator Line */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-blue-600 to-violet-600 z-[100] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating Canvas Particle Layer */}
      <ParticleBackground isDarkMode={isDarkMode} />

      {/* Embedded Desktop Cursor component */}
      <CustomCursor />

      {/* Navigation Layer */}
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} activeSection={activeSection} />

      {/* Sections with Modular Reveal Scroll Elements */}
      <main className="relative z-10">
        
        <Hero />

        <RevealOnScroll animation="slide-up">
          <About />
        </RevealOnScroll>

        <RevealOnScroll animation="slide-up">
          <Skills />
        </RevealOnScroll>

        <RevealOnScroll animation="slide-up">
          <Services />
        </RevealOnScroll>

        <RevealOnScroll animation="slide-up">
          <Projects />
        </RevealOnScroll>

        <RevealOnScroll animation="slide-up">
          <Testimonials />
        </RevealOnScroll>

        <RevealOnScroll animation="slide-up">
          <Contact />
        </RevealOnScroll>

      </main>

      {/* Footer Section */}
      <Footer />

      {/* Floating Back to Top controls */}
      {showBackToTop && (
        <button
          onClick={handleReturnTop}
          id="back-to-top"
          className="fixed bottom-6 right-6 z-50 p-3.5 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200/80 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all animate-bounce-subtle"
          title="Return to topmost boundary"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
}
