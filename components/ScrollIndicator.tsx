'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface Section {
  id: string;
  label: string;
}

export default function ScrollIndicator() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('hero');
  const [visible, setVisible] = useState(false);

  const sections: Section[] = [
    { id: 'hero', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'testimonials', label: 'Placements' },
  ];

  useEffect(() => {
    // Only operate on the homepage
    if (pathname !== '/') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(false);
      return;
    }

    // Scroll listener for visibility (hide on top fold)
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setVisible(true);
      } else {
        setVisible(false);
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initial state

    // Intersection Observer to track active section
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Center-weighted viewport detection
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (pathname !== '/' || !visible) return null;

  const handleDotClick = (id: string) => {
    const targetEl = document.getElementById(id);
    if (!targetEl) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).lenis) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).lenis.scrollTo(`#${id}`, {
        offset: -40,
        duration: 1.5,
      });
    } else {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="fixed right-6 top-1/2 -translate-y-1/2 z-45 flex flex-col gap-3 py-4 px-2 rounded-full border border-white/5 bg-[#0D0D11]/75 backdrop-blur-md shadow-2xl transition-all duration-500 scale-100 opacity-100 select-none animate-fadeIn hidden lg:flex"
      style={{
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.05)'
      }}
    >
      {sections.map((sec) => (
        <button
          key={sec.id}
          onClick={() => handleDotClick(sec.id)}
          className={`scroll-dot-pill group ${activeSection === sec.id ? 'active' : ''}`}
          aria-label={`Scroll to ${sec.label}`}
        >
          {/* Active Ring */}
          <span className="scroll-dot-ring" />
          
          {/* Core Dot */}
          <span className="scroll-dot-core" />

          {/* Premium Floating Tooltip on Hover */}
          <span className="absolute right-10 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-[#0D0D11] border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider opacity-0 pointer-events-none translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-xl whitespace-nowrap">
            {sec.label}
          </span>
        </button>
      ))}
    </div>
  );
}
