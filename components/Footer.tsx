'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).lenis) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#050507] py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & Vision Block */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#0D0D11]/70 border border-white/10 shadow-md overflow-hidden">
                <img
                  src="/images/Royalfinity-Academy-Logo.png"
                  alt="Royalfinity Academy Logo"
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-base font-extrabold tracking-wider uppercase text-white">
                  ROYALFINITY
                </span>
                <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-gray-400">
                  ACADEMY
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              We bridge the gap between education and execution. Learn production grade skills, use premium licensed tools, and build a spectacular portfolio in a physical, corporate-like agency environment.
            </p>
          </div>

          {/* Quick Directories Links */}
          <div className="flex flex-col gap-4">
            <span className="text-sm font-bold uppercase tracking-widest text-amber-500">
              Quick Directory
            </span>
            <div className="flex flex-col gap-2.5">
              <Link href="/" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-300">
                Home
              </Link>
              <Link href="/about" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-300">
                About Us
              </Link>
              <Link href="/why-us" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-300">
                Why Royalfinity
              </Link>
              <Link href="/contact" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-300">
                Request Call Back
              </Link>
            </div>
          </div>

          {/* Primary Courses Directory */}
          <div className="flex flex-col gap-4">
            <span className="text-sm font-bold uppercase tracking-widest text-amber-500">
              Curriculum Stack
            </span>
            <div className="flex flex-col gap-2.5">
              <Link href="/courses/mern-stack" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-300">
                MERN Stack Development
              </Link>
              <Link href="/courses/php-stack" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-300">
                PHP Full Stack Development
              </Link>
              <Link href="/courses/digital-marketing" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-300">
                Digital Marketing
              </Link>
              <Link href="/courses/performance-marketing" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-300">
                Performance Marketing
              </Link>
            </div>
          </div>

          {/* Office Contact Coordinates */}
          <div className="flex flex-col gap-4">
            <span className="text-sm font-bold uppercase tracking-widest text-amber-500">
              Campus Coordinates
            </span>
            <div className="flex flex-col gap-3">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Royalfinity+Technologies+Faridabad"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-sm text-gray-400 hover:text-white transition-colors duration-300"
              >
                <span className="text-sm">📍</span>
                <span className="leading-relaxed font-semibold">
                  5C/15, 1st Floor, NIT-5, Faridabad, Haryana, 121001
                </span>
              </a>
              <a href="tel:+919211816999" className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors duration-300">
                <span className="text-sm">📞</span>
                <span>+91 92118 16999</span>
              </a>
              <a href="mailto:info@royalfinityacademy.com" className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors duration-300">
                <span className="text-sm">✉️</span>
                <span>info@royalfinityacademy.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Upwards Scroll */}
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">
            © {currentYear} ROYALFINITY ACADEMY. ALL RIGHTS RESERVED.
          </span>

          <button
            onClick={handleBackToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/5 bg-[#0D0D11]/70 hover:bg-white/5 hover:border-white/10 active:scale-95 transition-all duration-300 text-sm font-bold text-gray-400 hover:text-white"
          >
            <span>Back to Top</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
