'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Nav Links
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Courses', href: '#', hasDropdown: true },
    { name: 'Why Us', href: '/why-us' },
    { name: 'Contact', href: '/contact' },
  ];

  // Course Items inside Dropdown
  const courseItems = [
    {
      slug: 'php-stack',
      title: 'PHP Full Stack Development',
      badge: '🛠️ Back-End Principal',
      desc: 'Master backend engineering, DB architectures, and Laravel.',
      color: 'hover:text-amber-500',
      img: '/images/php_developer.png'
    },
    {
      slug: 'mern-stack',
      title: 'MERN Stack Development',
      badge: '⚛️ JavaScript Principal',
      desc: 'Build scalable React, Node.js, and real-time socket systems.',
      color: 'hover:text-cyan-400',
      img: '/images/mern_stack.png'
    },
    {
      slug: 'digital-marketing',
      title: 'Digital Marketing Specialist',
      badge: '📢 Organic Funnels & SEO',
      desc: 'Master search optimization, Google Analytics, and organic growth.',
      color: 'hover:text-amber-500',
      img: '/images/digital_marketing.png'
    },
    {
      slug: 'performance-marketing',
      title: 'Performance Marketing Architect',
      badge: '📈 Media Buying & ROAS',
      desc: 'Scale campaigns with Meta Ads, Conversion APIs, and CRO.',
      color: 'hover:text-rose-500',
      img: '/images/performance_marketing.png'
    },
  ];

  // Track scrolling to apply glass backgrounds
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100000] transition-all duration-500 ${
        scrolled
          ? 'bg-[#0A0A0C]/80 backdrop-blur-xl py-4 shadow-2xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Branding */}
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#0D0D11]/70 border border-white/10 shadow-lg group-hover:scale-105 transition-transform duration-300 overflow-hidden">
              <img
                src="/images/Royalfinity-Academy-Logo.png"
                alt="Royalfinity Academy Logo"
                className="w-full h-full object-contain p-1"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-lg font-extrabold tracking-wider uppercase text-white group-hover:text-amber-500 transition-colors duration-300">
                ROYALFINITY
              </span>
              <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-gray-400">
                ACADEMY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div
                    key={item.name}
                    className="relative group"
                    ref={dropdownRef}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider transition-colors duration-300 py-2 cursor-pointer ${
                        pathname.startsWith('/courses')
                          ? 'text-amber-500'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {item.name}
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          dropdownOpen ? 'rotate-180 text-amber-500' : 'text-gray-400'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Courses Dropdown Dashboard Submenu */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 top-full w-[450px] mt-2 rounded-2xl border border-white/5 bg-[#0D0D11]/95 backdrop-blur-xl p-5 shadow-2xl transition-all duration-300 origin-top ${
                        dropdownOpen
                          ? 'opacity-100 scale-100 pointer-events-auto translate-y-0'
                          : 'opacity-0 scale-95 pointer-events-none -translate-y-2'
                      }`}
                      style={{
                        boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.9)',
                      }}
                    >
                      <div className="grid grid-cols-1 gap-4">
                        {courseItems.map((course) => (
                          <Link
                            key={course.slug}
                            href={`/courses/${course.slug}`}
                            className="group/item flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-300"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 shadow-md group-hover/item:shadow-amber-500/20 transition-all duration-300 border border-white/10 group-hover/item:border-amber-500/50">
                              <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" />
                              <div className="absolute inset-0 bg-black/20 group-hover/item:bg-transparent transition-colors duration-300"></div>
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <span className={`text-xs font-bold uppercase tracking-wider text-gray-200 group-hover/item:text-amber-500 transition-colors duration-300`}>
                                  {course.title}
                                </span>
                              </div>
                              <span className="text-[10px] text-gray-400 font-medium mt-0.5 leading-relaxed">
                                {course.desc}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-sm font-semibold uppercase tracking-wider transition-colors duration-300 py-2 ${
                    isActive ? 'text-amber-500' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Call-to-Actions (Enroll CTA / Contact Link) */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-amber-500 via-yellow-400 to-yellow-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-amber-500/20"
            >
              Enroll Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl border border-white/5 bg-[#0D0D11]/70 backdrop-blur-md text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300"
              aria-label="Toggle Navigation Menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Panel */}
      <div
        className={`fixed inset-x-0 top-[76px] h-screen bg-[#0A0A0C]/98 backdrop-blur-2xl transition-all duration-500 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navigation.map((item) => {
            if (item.hasDropdown) {
              return (
                <div key={item.name} className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    {item.name}
                  </span>
                  <div className="pl-4 flex flex-col gap-4 border-l border-white/10">
                    {courseItems.map((course) => (
                      <Link
                        key={course.slug}
                        href={`/courses/${course.slug}`}
                        className="flex items-center gap-3 group/mob"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="relative w-14 h-10 rounded-md overflow-hidden shrink-0 border border-white/10 group-hover/mob:border-amber-500/50 transition-colors">
                           <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover/mob:scale-110 transition-transform duration-500" />
                           <div className="absolute inset-0 bg-black/20 group-hover/mob:bg-transparent transition-colors duration-300"></div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-300 group-hover/mob:text-amber-500 transition-colors">
                            {course.title}
                          </span>
                          <span className="text-[10px] text-gray-500 mt-0.5">{course.badge}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            const isActive = pathname === item.href;
            return (
              <Link
              key={item.name}
              href={item.href}
              className={`text-lg font-bold uppercase tracking-wide transition-colors duration-300 ${
                isActive ? 'text-amber-500' : 'text-gray-300'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          );
        })}
        <Link
          href="/contact"
          className="w-full py-4 rounded-xl text-center text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-amber-500 via-yellow-400 to-yellow-600 shadow-xl shadow-amber-500/20"
          onClick={() => setMobileMenuOpen(false)}
        >
          Enroll Now
        </Link>
        </div>
      </div>
    </header>
  );
}