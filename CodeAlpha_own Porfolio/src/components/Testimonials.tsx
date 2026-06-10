import React, { useState, useEffect, useRef } from 'react';
import { TESTIMONIALS } from '../data';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    if (!isHovered) {
      timeoutRef.current = setTimeout(
        () =>
          setCurrentIndex((prevIndex) =>
            prevIndex === TESTIMONIALS.length - 1 ? 0 : prevIndex + 1
          ),
        5500
      );
    }
    return () => {
      resetTimeout();
    };
  }, [currentIndex, isHovered]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const handleSelectDot = (idx: number) => {
    setCurrentIndex(idx);
  };

  return (
    <section
      id="testimonials"
      className="py-24 bg-white dark:bg-[#050508] border-t border-slate-100 dark:border-white/5 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold tracking-widest text-purple-600 dark:text-purple-400 uppercase">
            Endorsements
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white">
            Client & Partner Reviews
          </p>
          <div className="mt-4 w-12 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full" />
        </div>

        {/* Carousel stage wrapper */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-8">
          
          {/* Main Card */}
          <div
            className="p-8 sm:p-12 rounded-3xl bg-slate-50/60 dark:bg-white/5 backdrop-blur-md border border-slate-200/50 dark:border-white/10 shadow-md relative overflow-hidden transition-all duration-350"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Elegant Background icon quote marks */}
            <Quote className="absolute top-8 right-8 w-24 h-24 text-purple-600/5 dark:text-purple-400/5 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Star Rating display */}
              <div className="flex space-x-1 justify-center sm:justify-start">
                {Array.from({ length: TESTIMONIALS[currentIndex].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-450 text-yellow-500" />
                ))}
              </div>

              {/* Core comment text */}
              <p className="text-base sm:text-lg sm:leading-relaxed text-slate-705 dark:text-slate-300 italic text-center sm:text-left">
                "{TESTIMONIALS[currentIndex].comment}"
              </p>

              {/* User Bio Details */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-200/50 dark:border-white/5">
                {/* Custom Avatar container */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 text-white font-extrabold text-lg flex items-center justify-center shadow-md">
                  {TESTIMONIALS[currentIndex].avatar}
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {TESTIMONIALS[currentIndex].name}
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-slate-550 dark:text-slate-400">
                    {TESTIMONIALS[currentIndex].role} — <span className="text-purple-600 dark:text-purple-400 font-sans">{TESTIMONIALS[currentIndex].company}</span>
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Action chevron controllers */}
          <div className="flex justify-center sm:block">
            <button
              onClick={handlePrev}
              className="sm:absolute left-0 top-1/2 sm:-translate-y-1/2 sm:-left-6 mt-6 sm:mt-0 p-3 rounded-xl bg-white dark:bg-white/5 backdrop-blur-md hover:bg-slate-50 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 shadow-md transition-all sm:hover:-translate-x-1"
              aria-label="Previous slider card"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="sm:absolute right-0 top-1/2 sm:-translate-y-1/2 sm:-right-6 mt-6 sm:mt-0 ml-4 sm:ml-0 p-3 rounded-xl bg-white dark:bg-white/5 backdrop-blur-md hover:bg-slate-50 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 shadow-md transition-all sm:hover:translate-x-1"
              aria-label="Next slider card"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Bullet Index indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectDot(idx)}
                className={`w-3.5 h-1.5 rounded-full transition-all ${
                  currentIndex === idx ? 'w-8 bg-purple-600' : 'bg-slate-300 dark:bg-white/10 hover:bg-slate-400'
                }`}
                aria-label={`Select testimonial ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
