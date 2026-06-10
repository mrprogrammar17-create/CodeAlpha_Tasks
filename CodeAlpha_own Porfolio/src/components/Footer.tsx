import React from 'react';
import { PERSONAL_INFO } from '../data';
import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer
      id="portfolio-footer"
      className="bg-white dark:bg-[#050508] border-t border-slate-200/50 dark:border-white/5 transition-colors pt-16 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core footer layout grids */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-12 border-b border-slate-200/40 dark:border-white/5">
          
          {/* Logo Brand statement block */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#home"
              className="flex items-center space-x-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white group"
            >
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-base font-extrabold pb-[1px]">
                KK
              </span>
              <span>
                Kamran<span className="text-purple-600 dark:text-purple-400 font-sans">Khan</span>
              </span>
            </a>
            <p className="text-sm text-slate-550 dark:text-slate-405 mt-4 leading-relaxed max-w-sm">
              Creative Front-End Developer and UI/UX Web Designer specializing in building beautiful high-performance client interfaces using custom standard workflows.
            </p>
          </div>

          {/* Quick links sitemap */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-405 dark:text-slate-505">
              Sitemap Navigation
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-slate-650 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect Coordinate cards */}
          <div className="md:col-span-3 space-y-4 flex flex-col items-center md:items-start">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-405 dark:text-slate-505">
              Social Channels
            </h4>
            <div className="flex space-x-3">
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-50 dark:bg-white/5 hover:bg-purple-50 dark:hover:bg-purple-950/20 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 border border-slate-200/40 dark:border-white/5 rounded-xl transition-all hover:-translate-y-0.5"
                aria-label="LinkedIn profile coordination"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white border border-slate-200/40 dark:border-white/5 rounded-xl transition-all hover:-translate-y-0.5"
                aria-label="GitHub labs timeline"
              >
                <Github className="w-5 h-5" />
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-3 bg-slate-50 dark:bg-white/5 hover:bg-purple-50 dark:hover:bg-purple-950/20 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 border border-slate-200/40 dark:border-white/5 rounded-xl transition-all hover:-translate-y-0.5"
                aria-label="Mail interface dispatcher"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            {/* Back to top clicker inside footer */}
            <button
              onClick={handleScrollToTop}
              className="mt-4 text-xs font-mono font-bold text-slate-405 dark:text-slate-505 hover:text-purple-600 dark:hover:text-purple-400 flex items-center space-x-1"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Copywrite and developer credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-405 text-center md:text-left">
            &copy; {currentYear} Kamran Khan. All rights protected. Built using semantic React component guidelines.
          </p>

          <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-450 inline-flex items-center space-x-1.5 justify-center">
            <span>Handcrafted with</span>
            <Heart className="w-4 h-4 fill-red-500 text-red-500 inline" />
            <span>&amp; pure web principles.</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
