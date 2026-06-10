import React, { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'scale-up';
  duration?: number; // duration in ms
  delay?: number; // delay in ms
  threshold?: number;
}

export default function RevealOnScroll({
  children,
  animation = 'slide-up',
  duration = 600,
  delay = 0,
  threshold = 0.1,
}: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Optionally unobserve to run animation only once
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  // Style helper mapping
  const getAnimationClass = () => {
    if (!isVisible) {
      switch (animation) {
        case 'fade-in': return 'opacity-0';
        case 'slide-up': return 'opacity-0 translate-y-12';
        case 'slide-down': return 'opacity-0 -translate-y-12';
        case 'slide-left': return 'opacity-0 translate-x-12';
        case 'scale-up': return 'opacity-0 scale-90';
        default: return 'opacity-0 translate-y-12';
      }
    }
    
    // Animated states
    switch (animation) {
      case 'fade-in': return 'opacity-100 transition-opacity';
      case 'slide-up': return 'opacity-100 translate-y-0 transition-all';
      case 'slide-down': return 'opacity-100 translate-y-0 transition-all';
      case 'slide-left': return 'opacity-100 translate-x-0 transition-all';
      case 'scale-up': return 'opacity-100 scale-100 transition-all';
      default: return 'opacity-100 translate-y-0 transition-all';
    }
  };

  const styleSetting = {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', // Smooth out deceleration profile
  };

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClass()}`}
      style={styleSetting}
    >
      {children}
    </div>
  );
}
