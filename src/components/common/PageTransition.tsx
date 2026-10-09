import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start page transition progress
    setIsTransitioning(true);
    setProgress(30);

    const timer1 = setTimeout(() => {
      setProgress(75);
    }, 100);

    const timer2 = setTimeout(() => {
      setProgress(100);
    }, 250);

    const timer3 = setTimeout(() => {
      setIsTransitioning(false);
      setProgress(0);
    }, 450);

    // Smooth scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [location.pathname, location.search]);

  return (
    <div className="relative w-full">
      {/* ── Top Glowing Navigation Progress Bar ─────────────── */}
      {isTransitioning && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-[0_0_12px_rgba(59,130,246,0.8)] transition-all ease-out duration-300 rounded-r-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* ── Animated Page Content Container ────────────────── */}
      <div
        key={`${location.pathname}${location.search}`}
        className="animate-page-enter"
      >
        {children}
      </div>
    </div>
  );
};
