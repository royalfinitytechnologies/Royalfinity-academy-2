'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1, // Snappy response
      touchMultiplier: 1.5,
    });

    // Expose lenis instance globally for dot/navigation smooth scrolling
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).lenis = lenis;

    // Bind Lenis scroll to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP's ticker for the animation loop to ensure perfect synchronization
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).lenis;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
