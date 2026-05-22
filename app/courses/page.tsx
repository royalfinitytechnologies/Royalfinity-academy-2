'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CoursesListing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coursesGridRef = useRef<HTMLDivElement>(null);
  const [activeCourseIndex, setActiveCourseIndex] = useState<number | null>(null);

  // 3D Card tilt handlers with Parallax support
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;

    const angleX = (yc - y) / 12;
    const angleY = (x - xc) / 12;

    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;

    const glow = card.querySelector('.ambient-glow') as HTMLDivElement;
    if (glow) {
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
      glow.style.opacity = '1';
    }
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

    const glow = card.querySelector('.ambient-glow') as HTMLDivElement;
    if (glow) {
      glow.style.opacity = '0';
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.fade-in-courses',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
        );

        gsap.fromTo(
          '.course-card-listing',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: coursesGridRef.current,
              start: 'top 80%',
            },
          }
        );
      }, containerRef);

      return () => ctx.revert();
    }
  }, []);

  const courses = [
    {
      title: 'PHP Full Stack Development',
      badge: '🛠️ Core Server Web Dev',
      slug: 'php-stack',
      description: 'Master server-side programming, database architecture, and frontend integrations. Design and build robust web portals from scratch.',
      tags: ['PHP 8', 'MySQL', 'Laravel', 'JavaScript', 'HTML/CSS'],
      syllabus: [
        'Core & Advanced PHP Development (OOP, Sessions, REST APIs)',
        'MySQL Database Designing, Complex Query Optimization',
        'Laravel Framework (Routing, MVC architecture, Eloquent ORM)',
        'Full Frontend integration with AJAX, Tailwind CSS & JS frameworks',
        'Live Project: Custom Corporate E-Commerce CMS Deployment'
      ],
      image: '/images/php_developer.png'
    },
    {
      title: 'MERN Full Stack Development',
      badge: '⚡ Modern React Stack',
      slug: 'mern-stack',
      description: 'Build fast, interactive, and modern single-page applications. Learn full MVC architecture using Node.js, Express, React, and MongoDB.',
      tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Next.js'],
      syllabus: [
        'RESTful API Design & Express Server Frameworks',
        'Database Modeling & Complex Aggregations with MongoDB',
        'React Client State Management, Context API & Hooks',
        'Next.js Server Component architecture and serverless deployments',
        'Live Project: Custom Collaborative Board Management System'
      ],
      image: '/images/mern_developer.png'
    },
    {
      title: 'Next.js & Frontend Engineering',
      badge: '🌀 Production Performance',
      slug: 'nextjs-frontend',
      description: 'Master React frameworks, Server Components, page caching architectures, routing API endpoints, and optimize SEO core-vitals.',
      tags: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind v4', 'GSAP'],
      syllabus: [
        'Next.js App Router, Route Handlers & Middleware',
        'React 19 Server Actions, Server Components & Suspense APIs',
        'Page load and image optimization, SEO Meta-tag pipelines',
        'Advanced CSS styling layouts, Framer Motion & GSAP animations',
        'Live Project: High-Traffic Dynamic Marketing Dashboard & CMS'
      ],
      image: '/images/nextjs_developer.png'
    },
    {
      title: 'Digital Marketing & Growth',
      badge: '📈 Ads & Revenue Funnels',
      slug: 'digital-marketing',
      description: 'Optimize search engines, structure metadata pipelines, design high-converting PPC funnels, run advanced data tracking dashboards.',
      tags: ['Google Ads', 'Meta Ads', 'SEO Audit', 'Tag Manager', 'Analytics'],
      syllabus: [
        'SEO Core Fundamentals, Schema Markups & Performance auditing',
        'Conversion Rate Optimization (CRO), A/B Testing landing pages',
        'Paid PPC Campaigns structuring (Meta Ads, Google Search & Display)',
        'Server-side Tag Management and Analytics dashboard reporting',
        'Live Project: End-to-end Growth Hacking campaign with real budgets'
      ],
      image: '/images/marketing_growth.png'
    }
  ];

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#0A0A0C] text-white overflow-hidden">
      
      {/* Top beautiful curve divider transition */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
        <svg className="relative block w-[calc(100%+1.3px)] h-[60px] lg:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,42.4V0Z" fill="#0A0A0C"></path>
        </svg>
      </div>

      {/* Background glow spots */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-glow-purple pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-glow-amber pointer-events-none -z-10 animate-pulse-slow"></div>

      <div className="relative w-full">

        {/* Banner Section */}
        <section className="relative z-10 w-full py-24 sm:py-32 flex flex-col justify-center bg-[#0A0A0C]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
            <span className="cursive-title font-accent text-3xl text-amber-500 mb-2 block">Our Career Portals</span>
            <h1 className="fade-in-courses text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6">
              Industry Calibrated Programs
            </h1>
            <div className="hidden lg:block w-16 h-1 bg-amber-500 mx-auto rounded-full mb-6"></div>
            <p className="fade-in-courses text-base sm:text-lg text-white/70 leading-relaxed">
              Every curriculum is engineered to bypass generic classroom lectures. Work inside active technical databases, direct live marketing budgets, and graduate with a portfolio that secures placement.
            </p>
          </div>
        </section>

        {/* Courses Cards Grid */}
        <section ref={coursesGridRef} className="relative z-20 w-full py-24 sm:py-32 bg-[#050507] border-t border-white/5 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-20">
            {courses.map((course, idx) => (
              <div
                key={idx}
                className="course-card-listing p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-white/10 transition-all duration-300 relative overflow-hidden flex flex-col transform-style-3d group cursor-pointer"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-10 group-hover:scale-105 transition-all duration-500 -z-10 animate-pulse-slow"
                  style={{ backgroundImage: `url(${course.image})` }}
                ></div>

                <div className="ambient-glow absolute pointer-events-none w-56 h-56 -ml-28 -mt-28 bg-amber-500/10 rounded-full blur-2xl opacity-0 transition-opacity duration-300 -z-10"></div>

                {/* 3D Parallax Layer 1: Badge */}
                <div className="flex items-start justify-between mb-4 transform-style-3d">
                  <span
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-amber-400 uppercase tracking-widest animate-pulse"
                    style={{ transform: 'translateZ(40px)' }}
                  >
                    {course.badge}
                  </span>
                  <span
                    className="text-white/20 font-black text-4xl group-hover:text-amber-500/20 transition-colors"
                    style={{ transform: 'translateZ(30px)' }}
                  >
                    0{idx + 1}
                  </span>
                </div>

                {/* 3D Parallax Layer 2: Title */}
                <h2
                  className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide mb-3 group-hover:text-amber-400 transition-colors"
                  style={{ transform: 'translateZ(50px)' }}
                >
                  {course.title}
                </h2>

                {/* 3D Parallax Layer 3: Description */}
                <p
                  className="text-sm text-white/50 mb-6 leading-relaxed flex-grow"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  {course.description}
                </p>

                {/* 3D Parallax Layer 4: Tags */}
                <div
                  className="flex flex-wrap gap-2 mb-8 transform-style-3d"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  {course.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 bg-amber-500/5 border border-amber-500/15 rounded-md text-[10px] font-extrabold text-amber-400/90 tracking-wider uppercase transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 3D Parallax Layer 5: Buttons */}
                <div
                  className="mt-auto border-t border-white/5 pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 transform-style-3d"
                  style={{ transform: 'translateZ(50px)' }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCourseIndex(activeCourseIndex === idx ? null : idx);
                    }}
                    className="flex items-center gap-2 text-xs font-bold text-white/70 uppercase tracking-widest hover:text-amber-400 transition-colors focus:outline-none"
                  >
                    <span>Syllabus breakdown</span>
                    <svg
                      className={`w-3.5 h-3.5 text-amber-500 transition-transform duration-300 ${activeCourseIndex === idx ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <Link
                    href={`/courses/${course.slug}`}
                    className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-center font-extrabold text-xs uppercase tracking-widest rounded-lg shadow-md hover:shadow-amber-500/20 transition-all hover:scale-102"
                  >
                    Deep Dive Into Program →
                  </Link>
                </div>

                {/* Collapsible Syllabus panel */}
                {activeCourseIndex === idx && (
                  <div className="mt-4 space-y-2.5 border-t border-white/5 pt-4 animate-fadeIn">
                    {course.syllabus.map((item, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2.5 text-xs text-white/75">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
