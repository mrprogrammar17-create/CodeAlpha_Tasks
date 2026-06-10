import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import { motion } from 'motion/react';
import { downloadResume } from '../utils/resumeGenerator';

export default function Hero() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = [
    'Front-End Developer',
    'Modern Web Designer',
    'Responsive Coder',
    'Creative UI Architect'
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleType = () => {
      const currentRole = roles[loopIndex % roles.length];
      const fullRoleLength = currentRole.length;

      if (!isDeleting) {
        // Typing characters
        setText(currentRole.substring(0, text.length + 1));
        setTypingSpeed(110); // Natural typing rhythm
        
        if (text.length === fullRoleLength) {
          // Pause at the end of word
          timer = setTimeout(() => setIsDeleting(true), 2400);
          return;
        }
      } else {
        // Backspacing
        setText(currentRole.substring(0, text.length - 1));
        setTypingSpeed(60); // Fast deletions

        if (text.length === 0) {
          setIsDeleting(false);
          setLoopIndex((prev) => prev + 1);
          setTypingSpeed(300); // Small pause before writing next
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopIndex, typingSpeed]);

  const handleDownloadCV = async () => {
    try {
      await downloadResume();
    } catch (error) {
      console.error('Error generating resume:', error);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-slate-50 dark:bg-[#050508] transition-colors"
    >
      {/* Background radial soft lights */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-purple-900/15 dark:bg-purple-900/20 rounded-full blur-[120px] pointer-events-none animate-pulse duration-10000" />
      <div className="absolute bottom-[0%] right-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-blue-900/15 dark:bg-blue-900/20 rounded-full blur-[120px] pointer-events-none animate-pulse duration-10000" />
      <div className="absolute top-[20%] right-[10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Main Info Blocks */}
          <div className="md:col-span-7 flex flex-col justify-center text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex self-center md:self-start items-center space-x-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] text-purple-600 dark:text-purple-400 tracking-widest uppercase font-bold mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-purple-400 animate-ping" />
              <span>Available for Freelance & Contract</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white"
            >
              Hi, I am <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-400 dark:to-blue-400">{PERSONAL_INFO.name}</span>
            </motion.h1>

            {/* Dynamic Typing Title */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-4 text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-300 h-10 flex items-center justify-center md:justify-start"
            >
              <span>I specialize in&nbsp;</span>
              <span className="text-purple-600 dark:text-purple-400 font-sans border-r-2 border-purple-600 dark:border-purple-400 pr-1 animate-caret">
                {text}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-450 leading-relaxed max-w-xl mx-auto md:mx-0"
            >
              {PERSONAL_INFO.shortBio}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
            >
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl shadow-lg shadow-purple-500/15 hover:shadow-purple-500/25 transition-all hover:-translate-y-0.5"
              >
                <span>Hire Kamran</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <button
                onClick={handleDownloadCV}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 text-base font-semibold text-slate-705 dark:text-slate-200 bg-white/60 dark:bg-white/5 backdrop-blur-md hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl shadow-sm transition-all hover:-translate-y-0.5"
              >
                <span>Download CV</span>
                <Download className="w-5 h-5" />
              </button>
            </motion.div>

            {/* Quick Tech Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex items-center justify-center md:justify-start space-x-4 text-slate-450 dark:text-slate-500"
            >
              <span className="text-xs font-mono tracking-widest uppercase">Connect:</span>
              <div className="flex space-x-3.5">
                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  aria-label="GitHub profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="Email Address link"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Profile Representation */}
          <div className="md:col-span-5 flex justify-center py-4 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-72 h-72 sm:w-85 sm:h-85 rounded-3xl p-2.5 bg-gradient-to-tr from-purple-500 to-blue-500 overflow-hidden shadow-2xl group flex items-center justify-center"
            >
              {/* Spinning background glow */}
              <div className="absolute inset-0.5 bg-white dark:bg-[#050508] rounded-[22px]" />
              
              <div className="relative w-full h-full rounded-[20px] overflow-hidden flex items-center justify-center bg-slate-50 dark:bg-white/5">
                {PERSONAL_INFO.avatar ? (
                  <img
                    src={PERSONAL_INFO.avatar}
                    alt={PERSONAL_INFO.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                ) : (
                  <div className="text-center p-6 flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 select-none">
                    <span className="text-7xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent font-sans">
                      {PERSONAL_INFO.name.split(' ').map(n => n[0]).join('')}
                    </span>
                    <span className="mt-4 text-xs font-mono font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase max-w-[200px]">
                      {PERSONAL_INFO.title}
                    </span>
                  </div>
                )}
              </div>

              {/* Decorative Floating Card components */}
              <div className="absolute -bottom-3 -right-3 bg-white/70 dark:bg-black/40 backdrop-blur-xl rounded-2xl p-3 border border-slate-200/50 dark:border-white/10 shadow-lg flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase">Design Philosophy</div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Aesthetics & Performance</div>
                </div>
              </div>

              {/* Decorative Frame Line */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-purple-500 rounded-tl-xl pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-blue-500 rounded-br-xl pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
