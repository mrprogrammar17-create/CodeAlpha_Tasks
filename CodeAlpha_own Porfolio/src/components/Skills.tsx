import React, { useState, useEffect, useRef } from 'react';
import { SKILLS } from '../data';
import { Skill } from '../types';
import * as Icons from 'lucide-react';

interface SkillProgressBarProps {
  level: number;
}

function SkillProgressBar({ level }: SkillProgressBarProps) {
  const [width, setWidth] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          // Set small delay for visual elegance
          setTimeout(() => {
            setWidth(level);
          }, 150);
        }
      },
      { threshold: 0.1 }
    );

    const el = elementRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [level, hasAnimated]);

  return (
    <div ref={elementRef} className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden block">
      <div
        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

export default function Skills() {
  const [filter, setFilter] = useState<'all' | 'frontend' | 'design' | 'tools'>('all');

  const filteredSkills = filter === 'all'
    ? SKILLS
    : SKILLS.filter(skill => skill.category === filter);

  // Helper to map icon names to actual Lucide Components safely
  const renderSkillIcon = (iconName: string) => {
    // Dynamic component access safely
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
    }
    return <Icons.Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
  };

  return (
    <section
      id="skills"
      className="py-24 bg-slate-50 dark:bg-[#050508] border-t border-slate-100 dark:border-white/5 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold tracking-widest text-purple-600 dark:text-purple-400 uppercase">
            My Tech Stack
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white">
            Languages, Libraries, & Standards
          </p>
          <div className="mt-4 w-12 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {([
            { id: 'all', label: 'All Stack' },
            { id: 'frontend', label: 'Front-End Development' },
            { id: 'design', label: 'UI/UX & RWD' },
            { id: 'tools', label: 'Tools & DevOps' }
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                filter === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md shadow-purple-500/15'
                  : 'bg-white/65 dark:bg-white/5 backdrop-blur-md text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/60 dark:border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="p-6 bg-white/60 dark:bg-white/5 backdrop-blur-md border border-slate-200/50 dark:border-white/10 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-350 group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-purple-105 dark:bg-purple-950/20 group-hover:scale-110 transition-transform">
                    {renderSkillIcon(skill.iconName)}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 font-sans">
                    {skill.name}
                  </h3>
                </div>
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 font-mono">
                  {skill.level}%
                </span>
              </div>

              {/* Animated Progress Bar */}
              <SkillProgressBar level={skill.level} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
