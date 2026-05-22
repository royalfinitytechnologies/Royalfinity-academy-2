'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Course {
  id: string;
  category: '6th-8th' | '9th-12th' | 'college' | 'ai-special';
  categoryLabel: string;
  title: string;
  price: string;
  duration: string;
  icon: string;
  syllabus: string[];
  gradient: string;
  borderColor: string;
  glowColor: string;
  accentText: string;
}

const coursesData: Course[] = [
  {
    id: '6th-8th-basic-computer',
    category: '6th-8th',
    categoryLabel: '6th to 8th Class',
    title: 'Basic Computer',
    price: '1,199',
    duration: '1st to 30th June',
    icon: '💻',
    syllabus: [
      'Computer Fundamentals & OS',
      'Windows & File Management',
      'MS Office Basics (Word, Paint, Excel)',
      'Typing Skills & Accuracy Training',
      'Internet, Email & Browsing Basics',
      'Fun Projects & Digital Activities'
    ],
    gradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
    borderColor: 'group-hover:border-emerald-500/35 border-emerald-500/10',
    glowColor: 'shadow-emerald-500/5 hover:shadow-emerald-500/25',
    accentText: 'text-emerald-400'
  },
  {
    id: '6th-8th-web-marketing',
    category: '6th-8th',
    categoryLabel: '6th to 8th Class',
    title: 'Website & Digital Marketing',
    price: '1,999',
    duration: '1st to 30th June',
    icon: '📢',
    syllabus: [
      'Introduction to Websites & Domain Basics',
      'Social Media Marketing Basics',
      'Content Creation & Digital Storytelling',
      'Google & YouTube Platform Basics',
      'Online Safety & Cyber Ethics',
      'Fun Marketing Projects & Brand Ideas'
    ],
    gradient: 'from-amber-500/10 via-amber-500/5 to-transparent',
    borderColor: 'group-hover:border-amber-500/35 border-amber-500/10',
    glowColor: 'shadow-amber-500/5 hover:shadow-amber-500/25',
    accentText: 'text-amber-400'
  },
  {
    id: '9th-12th-basic-computer',
    category: '9th-12th',
    categoryLabel: '9th to 12th Class',
    title: 'Basic Computer',
    price: '1,999',
    duration: '1st to 30th June',
    icon: '🖥️',
    syllabus: [
      'Computer Hardware & System Info',
      'MS Office Suite (Word, Excel, PowerPoint)',
      'Internet Research & Communication',
      'Typing Speed & Workplace Productivity',
      'Cyber Safety & Network Security',
      'Practical Assignments & Evaluation'
    ],
    gradient: 'from-blue-500/10 via-blue-500/5 to-transparent',
    borderColor: 'group-hover:border-blue-500/35 border-blue-500/10',
    glowColor: 'shadow-blue-500/5 hover:shadow-blue-500/25',
    accentText: 'text-blue-400'
  },
  {
    id: '9th-12th-web-marketing',
    category: '9th-12th',
    categoryLabel: '9th to 12th Class',
    title: 'Website & Digital Marketing',
    price: '2,999',
    duration: '1st to 30th June',
    icon: '🌐',
    syllabus: [
      'Website Development (HTML, CSS, JS)',
      'Social Media Marketing Strategy',
      'Google Ads & Marketing Platforms',
      'SEO Basics & Analytics Insights',
      'Content Strategy & Visual Designing',
      'Live Projects: Build Your Own Website'
    ],
    gradient: 'from-pink-500/10 via-pink-500/5 to-transparent',
    borderColor: 'group-hover:border-pink-500/35 border-pink-500/10',
    glowColor: 'shadow-pink-500/5 hover:shadow-pink-500/25',
    accentText: 'text-pink-400'
  },
  {
    id: 'college-basic-computer',
    category: 'college',
    categoryLabel: 'College Students',
    title: 'Basic Computer',
    price: '2,499',
    duration: '1st to 30th June',
    icon: '🎓',
    syllabus: [
      'Advanced MS Office Suite Applications',
      'Advanced Internet & Web Research Methods',
      'Data Management & Cloud Storage Setup',
      'Professional Formatting & Productivity Tools',
      'System Customization & Performance Optimization',
      'Practical Capstone Projects & Evaluation'
    ],
    gradient: 'from-indigo-500/10 via-indigo-500/5 to-transparent',
    borderColor: 'group-hover:border-indigo-500/35 border-indigo-500/10',
    glowColor: 'shadow-indigo-500/5 hover:shadow-indigo-500/25',
    accentText: 'text-indigo-400'
  },
  {
    id: 'college-web-marketing',
    category: 'college',
    categoryLabel: 'College Students',
    title: 'Website & Digital Marketing',
    price: '2,999',
    duration: '1st to 30th June',
    icon: '🚀',
    syllabus: [
      'WordPress Website Setup & Dev',
      'Digital Marketing Funnel Strategy',
      'SEO & Google Search Analytics',
      'Paid Social Media Campaigns (Meta, Google)',
      'Content Marketing & Brand Messaging',
      'Live Industry Case Studies & Client Projects'
    ],
    gradient: 'from-cyan-500/10 via-cyan-500/5 to-transparent',
    borderColor: 'group-hover:border-cyan-500/35 border-cyan-500/10',
    glowColor: 'shadow-cyan-500/5 hover:shadow-cyan-500/25',
    accentText: 'text-cyan-400'
  },
  {
    id: 'ai-special-video-generation',
    category: 'ai-special',
    categoryLabel: 'AI Special Program',
    title: 'AI Videos Generation',
    price: '1,499',
    duration: '1st to 30th June',
    icon: '🤖',
    syllabus: [
      'Introduction to Generative AI Video Tools',
      'AI Prompt Engineering for Video Generation',
      'Text to Video (Runway, Sora, Luma Veo)',
      'AI Voiceover Generation & Sync Basics',
      'Creative Video Editing & Promo Creation'
    ],
    gradient: 'from-violet-500/15 via-fuchsia-500/5 to-transparent',
    borderColor: 'group-hover:border-violet-500/45 border-violet-500/20',
    glowColor: 'shadow-violet-500/10 hover:shadow-violet-500/30',
    accentText: 'text-violet-400'
  }
];

export default function SummerCampPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [flippedCardIdx, setFlippedCardIdx] = useState<number | null>(null);
  const router = useRouter();

  // Switch Category Tab & Re-trigger Entrance Animation for Grid Cards
  const handleCategorySwitch = (cat: string) => {
    setActiveCategory(cat);
  };

  // Auto-Select Course and Route to Dedicated Enrollment Form Page
  const handleEnrollClick = (courseTitle: string, categoryLabel: string) => {
    let selectValue = 'General Enquiry / Seat Booking';
    if (categoryLabel.includes('6th to 8th')) {
      selectValue = courseTitle.includes('Computer') ? '6th to 8th: Basic Computer' : '6th to 8th: Website & Digital Marketing';
    } else if (categoryLabel.includes('9th to 12th')) {
      selectValue = courseTitle.includes('Computer') ? '9th to 12th: Basic Computer' : '9th to 12th: Website & Digital Marketing';
    } else if (categoryLabel.includes('College')) {
      selectValue = courseTitle.includes('Computer') ? 'College: Basic Computer' : 'College: Website & Digital Marketing';
    } else if (categoryLabel.includes('AI Special')) {
      selectValue = 'AI Special: AI Videos Generation';
    }

    router.push(`/courses/summer-camp/enroll?course=${encodeURIComponent(selectValue)}`);
  };

  // GSAP Entrance & Scroll Animations
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Hero Text Animations
      tl.fromTo('.gsap-summer-badge',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
      .fromTo('.gsap-summer-title-word',
        { y: 40, rotateX: -30, opacity: 0 },
        { y: 0, rotateX: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.5)' },
        '-=0.4'
      )
      .fromTo('.gsap-summer-desc',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo('.gsap-summer-tag',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(2)' },
        '-=0.4'
      )
      .fromTo('.gsap-summer-buttons',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );

      // Hero Video Background Entrance
      gsap.fromTo('.gsap-video-hero',
        {
          opacity: 0,
          scale: 0.97,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
        }
      );

      // General Perks Ribbon Entrance Scrolltrigger
      gsap.fromTo('.gsap-perk-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#camp-perks',
            start: 'top 85%',
          }
        }
      );

      // Curriculum Cards Scroll Entrance
      gsap.fromTo('.gsap-course-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#camp-curriculum',
            start: 'top 75%',
          }
        }
      );

      // AI Special Spotlight Section Scrolltrigger
      gsap.fromTo('.gsap-ai-spotlight',
        { y: 60, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#ai-spotlight-section',
            start: 'top 80%',
          }
        }
      );

      // Schedule Cards Stagger
      gsap.fromTo('.gsap-schedule-card',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#camp-schedule',
            start: 'top 85%',
          }
        }
      );

      // Callback Form Entrance
      gsap.fromTo('.gsap-callback-form',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-callback-form',
            start: 'top 90%',
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Filter-based card re-animation logic
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.fromTo('.gsap-course-card',
        { opacity: 0, y: 15, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.06,
          ease: 'power2.out',
          overwrite: 'auto'
        }
      );
    }
  }, [activeCategory]);

  const filteredCourses = activeCategory === 'all'
    ? coursesData
    : coursesData.filter(c => c.category === activeCategory);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#0A0A0C] pt-20 overflow-hidden">

      {/* SECTION 1: HERO (DARK THEME - VIDEO BACKGROUND) */}
      <section className="relative w-full bg-[#0A0A0C] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="mb-8 text-xs text-white/40 tracking-wider">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span className="mx-2.5">/</span>
            <Link href="/courses" className="hover:text-amber-400 transition-colors">Courses</Link>
            <span className="mx-2.5">/</span>
            <span className="text-white/60">Summer Tech & Creative Camp</span>
          </nav>

          {/* Hero Widescreen Panel */}
          <div className="gsap-video-hero relative w-full min-h-[70vh] sm:min-h-[80vh] rounded-3xl overflow-hidden flex items-center justify-center border border-white/10 shadow-2xl p-6 sm:p-12 md:p-16">
            
            {/* Background Video */}
            <video
              ref={videoRef}
              src="/videos/summer.mp4"
              autoPlay
              loop
              muted={isVideoMuted}
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/55 via-black/20 to-[#0A0A0C]/55 z-10 pointer-events-none"></div>

            {/* Centered Content */}
            <div className="relative z-20 max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
              
              <div className="mb-5 gsap-summer-badge flex flex-wrap justify-center items-center gap-1.5">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/30 rounded-full text-[10px] sm:text-xs font-bold text-amber-400 uppercase tracking-widest shadow-[0_0_15px_rgba(245,158,11,0.05)]">
                  ☀️ AI • Coding • Creativity
                </span>
                <span className="inline-block px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] sm:text-xs font-bold text-white/60 tracking-wider">
                  🔥 Summer Special • 1st to 30th June
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight text-white mb-6 leading-none flex flex-wrap justify-center gap-x-3 gap-y-2 [perspective:1000px] [text-shadow:0_4px_24px_rgba(0,0,0,0.75)]">
                {['Summer', 'Tech', '&', 'Creative', 'Camp'].map((word, i) => (
                  <span key={i} className="overflow-hidden inline-flex">
                    <span 
                      className={`gsap-summer-title-word inline-block [transform-origin:bottom_center] ${
                        word === 'Summer' || word === 'Camp' 
                          ? 'text-sunset-gradient' 
                          : 'text-white'
                      }`}
                    >
                      {word}
                    </span>
                  </span>
                ))}
              </h1>

              <p className="gsap-summer-desc text-base sm:text-lg text-white/95 leading-relaxed mb-8 max-w-3xl [text-shadow:0_2px_16px_rgba(0,0,0,0.75)]">
                Transform school holidays into creative fuel. Join Royalfinity Academy's interactive summer modules built for students from Class 6th up to College Level. Master programming, digital marketing, computing systems, and futuristic AI tools under expert guidance.
              </p>

              {/* Quick stats tags */}
              <div className="flex flex-wrap justify-center gap-2.5 mb-8 max-w-2xl">
                {['Ages 10-22', 'No Prior Coding Needed', 'Expert Live Mentoring', 'Practical Assignments', 'Limited Batches'].map((tag, idx) => (
                  <span
                    key={idx}
                    className="gsap-summer-tag px-3.5 py-2 bg-black/60 hover:bg-black/80 backdrop-blur-sm border border-white/10 rounded-xl text-xs font-semibold text-white/95 tracking-wide transition-all shadow-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="gsap-summer-buttons flex flex-wrap justify-center gap-4">
                <Link
                  href="/courses/summer-camp/enroll"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 text-black font-extrabold text-xs tracking-widest uppercase shadow-lg shadow-orange-500/10 hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-[1.02] flex items-center gap-2"
                >
                  <span>📝 Register & Book Seat</span>
                </Link>
                <a
                  href="#camp-curriculum"
                  className="px-8 py-4 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 text-white font-bold text-xs tracking-widest uppercase flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                >
                  Explore Syllabus
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 2: PERKS (LIGHT THEME - WHITE BACKGROUND) */}
      <section id="camp-perks" className="relative w-full bg-white text-slate-900 py-24 lg:py-36 overflow-hidden">
        
        {/* Top Beautiful Curve Divider */}
        <div className="absolute -top-[2px] left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
          <svg className="relative block w-[calc(100%+1.3px)] h-[60px] lg:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,42.4V0Z" fill="#0A0A0C"></path>
          </svg>
        </div>

        {/* Bottom Beautiful Curve Divider */}
        <div className="absolute -bottom-[1px] left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
          <svg className="relative block w-[calc(100%+1.3px)] h-[60px] lg:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,42.4V0Z" fill="#0A0A0C" transform="rotate(180 600 60)"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-16">
            <span className="cursive-title font-accent text-3xl text-amber-500 mb-2 block">Premium Vibe</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-slate-900 mb-4">
              Why Choose Royalfinity Summer Camp?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed font-semibold">
              We provide professional industry guidance, high-speed labs, and verified completions to give young innovators a real superpower.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: 'Practical Learning', icon: '💻', desc: '100% hands-on project building workflows' },
              { title: 'Expert Mentorship', icon: '🎯', desc: 'Individual feedback & expert coding logic reviews' },
              { title: 'Completion Certificate', icon: '📜', desc: 'Verifiable credentials for portfolios' },
              { title: 'Live Projects & Real Exp', icon: '🚀', desc: 'Build actual portfolios, apps, & campaigns' },
              { title: 'Skill for Better Future', icon: '📈', desc: 'Lay programming seeds for upcoming decades' }
            ].map((perk, i) => (
              <div
                key={i}
                className="gsap-perk-card flip-card-container w-full h-48 cursor-pointer group"
                onClick={() => setFlippedCardIdx(prev => prev === i ? null : i)}
              >
                <div className={`flip-card-inner ${flippedCardIdx === i ? 'is-flipped' : ''}`}>
                  {/* Front Side */}
                  <div className="backface-hidden absolute inset-0 w-full h-full p-6 rounded-2xl border border-slate-200/80 bg-[#F9FAFB] text-center flex flex-col items-center justify-center shadow-sm group-hover:border-amber-500/35 transition-all duration-300">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {perk.icon}
                    </div>
                    <h4 className="text-xs font-black uppercase text-slate-800 leading-tight tracking-wider">
                      {perk.title}
                    </h4>
                  </div>
                  {/* Back Side */}
                  <div 
                    className="backface-hidden absolute inset-0 w-full h-full p-6 rounded-2xl border border-amber-500/25 bg-[#0D0D11] text-center flex flex-col items-center justify-center shadow-lg shadow-black/20"
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                    <h4 className="text-xs font-black uppercase text-amber-400 leading-tight tracking-wider mb-2">
                      {perk.title}
                    </h4>
                    <p className="text-[10px] text-white/70 font-bold leading-relaxed">
                      {perk.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 3: CURRICULUM GRID (DARK THEME - BLACK BACKGROUND) */}
      <section id="camp-curriculum" className="relative w-full bg-[#0A0A0C] text-white py-16 md:py-24">
        
        {/* Ambient glows behind grid */}
        <div className="absolute top-[10%] left-1/4 w-[400px] h-[400px] bg-gradient-to-r from-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[20%] right-1/4 w-[450px] h-[450px] bg-gradient-to-l from-orange-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="cursive-title font-accent text-3xl text-amber-500 mb-2 block">Choose Your Path</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-4">
              Detailed Camp Curriculum
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full mb-8"></div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap justify-center items-center gap-2 max-w-4xl mx-auto p-1.5 bg-[#0F0F13]/80 backdrop-blur border border-white/5 rounded-2xl sm:rounded-full">
              {[
                { id: 'all', label: 'All Programs' },
                { id: '6th-8th', label: '6th to 8th Class' },
                { id: '9th-12th', label: '9th to 12th Class' },
                { id: 'college', label: 'College Students' },
                { id: 'ai-special', label: 'AI Special' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleCategorySwitch(tab.id)}
                  className={`px-5 py-2.5 rounded-xl sm:rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === tab.id
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-[0_4px_16px_rgba(245,158,11,0.2)]'
                      : 'bg-transparent text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className={`gsap-course-card p-7 rounded-3xl border bg-gradient-to-b ${course.gradient} bg-[#0D0D11]/60 backdrop-blur-md transition-all duration-300 flex flex-col justify-between group ${course.borderColor} ${course.glowColor}`}
              >
                <div>
                  {/* Category and Title Bar */}
                  <div className="flex justify-between items-start mb-6">
                    <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-wider text-white/50">
                      {course.categoryLabel}
                    </span>
                    <span className="text-3xl filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                      {course.icon}
                    </span>
                  </div>

                  <h3 className="text-lg font-black uppercase text-white mb-2 leading-tight group-hover:text-amber-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-1.5 mb-5 border-b border-white/5 pb-3">
                    <span>📅 {course.duration}</span>
                  </p>

                  {/* Syllabus List */}
                  <ul className="space-y-3 mb-8">
                    {course.syllabus.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-white/70 leading-relaxed font-medium">
                        <span className={`text-sm leading-none shrink-0 ${course.accentText}`}>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  {/* Price Section */}
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 mb-5 flex items-center justify-between">
                    <div>
                      <span className="block text-[8px] font-black uppercase tracking-widest text-white/40">Total Fee</span>
                      <span className={`text-xl font-black ${course.accentText}`}>₹{course.price}</span>
                      <span className="text-[10px] text-white/30 font-semibold ml-0.5">only!</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[9px] font-black uppercase tracking-wider text-amber-400">
                      Limited Seats
                    </span>
                  </div>

                  {/* Enroll CTA */}
                  <button
                    onClick={() => handleEnrollClick(course.title, course.categoryLabel)}
                    className="w-full py-3 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 group-hover:bg-white/10 hover:text-black text-white font-extrabold text-[11px] tracking-widest uppercase transition-all duration-300 border border-white/10 hover:border-transparent flex items-center justify-center gap-1.5 transform active:scale-[0.98]"
                  >
                    <span>⚡ Enroll Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: AI SPECIAL SPOTLIGHT (LIGHT THEME - WHITE BACKGROUND) */}
      <section id="ai-spotlight-section" className="relative w-full bg-white text-slate-900 py-24 lg:py-36 overflow-hidden">
        
        {/* Top Beautiful Curve Divider */}
        <div className="absolute -top-[2px] left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
          <svg className="relative block w-[calc(100%+1.3px)] h-[60px] lg:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,42.4V0Z" fill="#0A0A0C"></path>
          </svg>
        </div>

        {/* Bottom Beautiful Curve Divider */}
        <div className="absolute -bottom-[1px] left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
          <svg className="relative block w-[calc(100%+1.3px)] h-[60px] lg:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,42.4V0Z" fill="#0A0A0C" transform="rotate(180 600 60)"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="gsap-ai-spotlight p-8 md:p-12 rounded-3xl border border-violet-200 bg-[#F9FAFB] relative overflow-hidden group shadow-md">
            
            {/* Soft purple glows inside light theme */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-violet-200/40 to-transparent rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-fuchsia-200/40 to-transparent rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-100 border border-violet-200 rounded-full text-[10px] font-bold text-violet-700 uppercase tracking-widest">
                  🤖 Hot Summer Special Spotlight
                </span>
                <h3 className="text-3xl font-black uppercase text-slate-900 leading-tight">
                  AI Video Generation Masterclass
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold">
                  Future-proof your skillset. Ideal for all school students above 6th Class, college tech starters, and hobbyists. Learn to engineer prompts, manage text-to-video diffusion models, render cinematic visuals, and assemble high-retention video stories using modern generative tools.
                </p>

                {/* Sub features grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200 pt-6">
                  <div>
                    <h5 className="text-[11px] font-black uppercase tracking-wider text-violet-700 mb-1.5">🌀 What You Get</h5>
                    <ul className="space-y-1.5 text-[11px] text-slate-500 font-bold">
                      <li>• Prompt Battle Tournaments</li>
                      <li>• Text-to-Video Editing Workflow</li>
                      <li>• Cinematic Sound Engineering</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-[11px] font-black uppercase tracking-wider text-violet-700 mb-1.5">🎓 Eligibility & Price</h5>
                    <ul className="space-y-1.5 text-[11px] text-slate-500 font-bold">
                      <li>• All Students above 6th Class</li>
                      <li>• Complete Program Duration: 1 Month</li>
                      <li>• Flat Fee: <span className="text-violet-700 font-extrabold">₹1,499 ONLY</span></li>
                    </ul>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <button
                    onClick={() => handleEnrollClick('AI Videos Generation', 'AI Special Program')}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-extrabold text-[10px] tracking-widest uppercase transition-all duration-300 shadow-md shadow-violet-500/20 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    🚀 Claim AI Seat (₹1,499)
                  </button>
                  <a
                    href="https://wa.me/919211816999?text=Hello%20Royalfinity%20Academy%2C%20I%20want%20to%20enquire%20about%20the%20AI%20Video%20Generation%20summer%20camp%20track."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-extrabold text-[10px] tracking-widest uppercase transition-all duration-300 shadow-sm"
                  >
                    💬 Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Right Mockup Layout visual (popout dark block in light section) */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="w-full max-w-[340px] aspect-square rounded-2xl border border-violet-500/20 bg-slate-950 p-4 shadow-xl relative overflow-hidden flex flex-col justify-between text-white">
                  <div className="absolute top-0 left-0 right-0 h-6 bg-white/[0.02] border-b border-white/5 px-3 flex items-center justify-between text-[9px] font-bold text-white/30">
                    <span>AI Video Editor Canvas</span>
                    <span className="w-2 h-2 rounded-full bg-red-500/70 animate-pulse"></span>
                  </div>

                  <div className="h-full flex items-center justify-center py-6 text-center">
                    <div className="space-y-3">
                      <span className="text-4xl block animate-bounce">🤖</span>
                      <div className="px-3 py-1 bg-violet-500/15 border border-violet-500/30 rounded-md text-[10px] font-bold text-violet-400">
                        Prompt: "sunset retro synthwave city"
                      </div>
                      <p className="text-[9px] text-white/30 leading-normal max-w-[200px]">Generating high resolution horizontal sequences...</p>
                    </div>
                  </div>

                  <div className="h-10 bg-white/[0.02] border-t border-white/5 p-2 rounded-lg flex items-center gap-1.5 justify-between">
                    <span className="text-[8px] font-bold text-white/40">Status: Render Completed</span>
                    <span className="text-[8px] px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-extrabold uppercase">
                      100% OK
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: SCHEDULES, FAQ & FORM (DARK THEME - BLACK BACKGROUND) */}
      <section className="relative w-full bg-[#0A0A0C] text-white py-16 md:py-24">
        
        {/* Sunset glow decorations */}
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Side: Schedule & Details */}
            <div className="lg:col-span-7 space-y-12">
              
              <section id="camp-schedule">
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-white mb-6 border-b border-white/5 pb-3">
                  Camp Schedule & Perks
                </h2>
                
                <div className="space-y-4">
                  
                  {/* Schedule Card 1 */}
                  <div className="gsap-schedule-card p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-white/10 flex gap-4 transition-all duration-200">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center text-sm font-bold shrink-0">
                      📅
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-white mb-1">Flexible Batch Timings</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Choose between Morning batches (10:00 AM - 1:00 PM) or Afternoon batches (3:00 PM - 6:00 PM) to align with school vacation periods.
                      </p>
                    </div>
                  </div>

                  {/* Schedule Card 2 */}
                  <div className="gsap-schedule-card p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-white/10 flex gap-4 transition-all duration-200">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center text-sm font-bold shrink-0">
                      🏆
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-white mb-1">Verifiable Certification</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Receive an official digital certificate of completion detailing all modules mastered, along with links to the live personal projects.
                      </p>
                    </div>
                  </div>

                  {/* Schedule Card 3 */}
                  <div className="gsap-schedule-card p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-white/10 flex gap-4 transition-all duration-200">
                    <div className="w-8 h-8 rounded-lg bg-yellow-500/10 text-yellow-400 flex items-center justify-center text-sm font-bold shrink-0">
                      🛠️
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-white mb-1">Premium Workstations Access</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        Classes take place inside our premium workspace, featuring fully equipped computer labs, high-speed fiber internet, and creative lounges.
                      </p>
                    </div>
                  </div>

                  {/* Schedule Card 4 */}
                  <div className="gsap-schedule-card p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-white/10 flex gap-4 transition-all duration-200">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center text-sm font-bold shrink-0">
                      🍕
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-white mb-1">Camp Finale Showcase</h4>
                      <p className="text-xs text-white/50 leading-relaxed">
                        The final day features a project gallery walk for parents to witness live project demonstrations, followed by awards and refreshments.
                      </p>
                    </div>
                  </div>

                </div>
              </section>

              {/* General FAQ */}
              <section className="space-y-4">
                <h3 className="text-lg font-black uppercase text-white mb-2">Camp FAQs</h3>
                
                <div className="p-5 rounded-2xl bg-[#0D0D11]/30 border border-white/5 space-y-4">
                  <div>
                    <h4 className="text-xs font-extrabold text-white uppercase">Is a personal laptop required?</h4>
                    <p className="text-[11px] text-white/50 mt-1">We recommend bringing a laptop so students can continue working on projects at home, but our premium workstation hardware is fully available for use during classes.</p>
                  </div>
                  
                  <div className="border-t border-white/5 pt-4">
                    <h4 className="text-xs font-extrabold text-white uppercase">Who are the mentors?</h4>
                    <p className="text-[11px] text-white/50 mt-1">Our instructors are active industry software engineers, creative video content creators, and growth marketers who teach real-world methods rather than dry textbooks.</p>
                  </div>

                  <div className="border-t border-white/5 pt-4">
                    <h4 className="text-xs font-extrabold text-white uppercase">What is the batch size?</h4>
                    <p className="text-[11px] text-white/50 mt-1">To ensure 1:1 attention and focus, we cap each batch at a maximum of 12 students.</p>
                  </div>
                </div>
              </section>

            </div>

            {/* Right Side: Consultation Enquiry Summary & Action CTA */}
            <div id="registration-form" className="lg:col-span-5 lg:sticky lg:top-24 scroll-mt-28">
              <div className="gsap-callback-form p-8 rounded-3xl bg-[#0D0D11]/90 border border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden transition-all duration-300">
                
                {/* Decorative glow */}
                <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -top-20 -left-20 w-48 h-48 bg-gradient-to-br from-violet-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

                <div className="text-center mb-8 relative">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[9px] font-black text-amber-400 uppercase tracking-widest mb-3">
                    🔥 Admissions Open
                  </span>
                  <h3 className="text-xl font-black uppercase text-white tracking-wide">Secure Your Slot</h3>
                  <p className="text-xs text-white/50 mt-1.5 font-semibold">Join the Faridabad summer tech & creative movement.</p>
                </div>

                <div className="space-y-6 relative z-10 mb-8">
                  {/* Perk lines */}
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm shrink-0 border border-white/5">📅</span>
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-wider text-white/80">Batch Period</h4>
                      <p className="text-xs text-white/50 font-bold">1st June to 30th June (1 Month)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm shrink-0 border border-white/5">👥</span>
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-wider text-white/80">Class Size Limit</h4>
                      <p className="text-xs text-white/50 font-bold">Max 12 students per batch for 1:1 focus</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm shrink-0 border border-white/5">💼</span>
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-wider text-white/80">Free Workspace Software</h4>
                      <p className="text-xs text-white/50 font-bold">Includes active usage licenses for development tools</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm shrink-0 border border-white/5">🎓</span>
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-wider text-white/80">Outcomes</h4>
                      <p className="text-xs text-white/50 font-bold">Verifiable completion credentials & public portfolio</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase tracking-wider text-white/40">Fee Structure</span>
                    <span className="text-xs font-extrabold text-amber-400">Starting from ₹1,199/-</span>
                  </div>
                </div>

                <Link
                  href="/courses/summer-camp/enroll"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 text-black font-black text-xs tracking-widest uppercase shadow-lg shadow-orange-500/10 hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer relative z-10"
                >
                  <span>⚡ Go to Enrollment Page</span>
                </Link>

                <p className="text-[9px] text-white/30 text-center leading-relaxed mt-4">
                  For immediate confirmation, you will be redirected to confirm details with counselors on WhatsApp.
                </p>

              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
