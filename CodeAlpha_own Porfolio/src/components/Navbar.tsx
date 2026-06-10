import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Download } from 'lucide-react';
import { downloadResume } from '../utils/resumeGenerator';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  activeSection: string;
}

export default function Navbar({ isDarkMode, toggleTheme, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadCV = async () => {
    try {
      await downloadResume();
    } catch (error) {
      console.error('Error generating resume:', error);
    }
  };

  return (
    <nav
      id="main-navigation"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 backdrop-blur-md bg-white/70 dark:bg-[#050508]/70 shadow-lg shadow-black/10 border-b border-slate-200/40 dark:border-white/10'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <a
            href="#home"
            id="brand-logo"
            className="flex items-center space-x-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white group"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-base font-extrabold group-hover:rotate-6 transition-transform">
              KK
            </span>
            <span className="font-sans">
              Kamran<span className="text-blue-600 dark:text-violet-400">Khan</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === item.href.slice(1)
                    ? 'text-blue-600 dark:text-violet-400 bg-blue-50/50 dark:bg-violet-950/20'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-violet-450 hover:bg-slate-50 dark:hover:bg-slate-800/30'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Utilitarian elements */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark Mode Switcher */}
            <button
              onClick={toggleTheme}
              id="theme-toggler"
              aria-label="Toggle theme representation"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Quick Actions */}
            <button
              onClick={handleDownloadCV}
              id="nav-cv-button"
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 rounded-lg shadow-sm hover:shadow transition-all hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile elements (burger + mode toggle) */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              id="theme-toggler-mobile"
              aria-label="Toggle theme representation"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-toggler"
              className="p-2 rounded-lg text-slate-705 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div
          id="mobile-navigation-panel"
          className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-[#050508]/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 px-4 py-4 space-y-1 shadow-xl animate-fade-in"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                activeSection === item.href.slice(1)
                  ? 'text-blue-600 dark:text-violet-400 bg-blue-50 dark:bg-violet-950/20'
                  : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-violet-400 hover:bg-slate-50 dark:hover:bg-slate-800/30'
              }`}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-4 pb-2 px-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => {
                setIsOpen(false);
                handleDownloadCV();
              }}
              id="mobile-cv-button"
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
