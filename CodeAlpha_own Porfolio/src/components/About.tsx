import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO } from '../data';
import { Sparkles, Trophy, Lightbulb, CheckCircle2 } from 'lucide-react';

interface CounterProps {
  value: number;
  suffix?: string;
}

function AnimatedCounter({ value, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = value;
          if (end === 0) return;
          
          const duration = 1500; // ms
          const incrementTime = Math.max(Math.floor(duration / end), 15);
          
          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) {
              clearInterval(timer);
              setCount(end); // force match target
            }
          }, incrementTime);
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
  }, [value, hasAnimated]);

  return (
    <div ref={elementRef} className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-violet-400 font-sans tracking-tight">
      <span>{count}</span>
      <span>{suffix}</span>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="py-24 bg-white dark:bg-[#050508] border-t border-slate-100 dark:border-white/5 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold tracking-widest text-purple-600 dark:text-purple-400 uppercase">
            About Me
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white">
            Designing Fluid Interactive Spaces
          </p>
          <div className="mt-4 w-12 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Visual card showcasing core traits */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50/60 dark:bg-white/5 backdrop-blur-md border border-slate-200/50 dark:border-white/10 shadow-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 dark:bg-purple-600/5 rounded-full blur-xl" />
              <div className="p-3 w-12 h-12 bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-xl mb-6">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Creative Insight</h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-450 leading-relaxed">
                Applying visual arts theories, modern layouts proportions, and clean styling choices to convert empty layouts into stunning digital canvases.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50/60 dark:bg-white/5 backdrop-blur-md border border-slate-200/50 dark:border-white/10 shadow-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 dark:bg-blue-600/5 rounded-full blur-xl" />
              <div className="p-3 w-12 h-12 bg-blue-105 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Dynamic Experience</h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-450 leading-relaxed">
                Engaging viewport scroll triggers and physics-based cursor micro-behaviors to make desktop clicks feel delightful and fluid.
              </p>
            </div>
          </div>

          {/* Core Biography and Goal Statements */}
          <div className="lg:col-span-8 flex flex-col h-full justify-between">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold font-sans text-slate-900 dark:text-white">
                Designing of Web Excellence
              </h3>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-450 leading-relaxed">
                {PERSONAL_INFO.detailedBio}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300">Clean semantic HTML & CSS variables architectures</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300">Modular custom components with Tailwind workflows</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300">Interactive features via custom Vanilla ES6 JS elements</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300">Performance benchmarking (LightHouse diagnostic readiness)</span>
                </div>
              </div>
            </div>

            {/* Counters representation */}
            <div className="grid grid-cols-3 gap-4 p-6 sm:p-8 rounded-2xl bg-slate-50/60 dark:bg-white/5 backdrop-blur-md border border-slate-200/50 dark:border-white/10 mt-10">
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div key={idx} className="text-center group">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <p className="mt-2 text-xs sm:text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400 uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
