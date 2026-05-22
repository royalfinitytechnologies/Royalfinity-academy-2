'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

// Course details mapped
const courses = [
  {
    slug: 'php-stack',
    title: 'PHP Full Stack Development',
    badge: '🛠️ Back-End Principal',
    duration: '16 Weeks • 100% Practical',
    accentColor: 'from-amber-500 to-yellow-600',
    accentBorder: 'border-amber-500/20 hover:border-amber-500/50',
    glowClass: 'bg-glow-amber',
    num: '01',
    image: '/images/php_developer.png',
    description: 'Master enterprise-level backend engineering, database architectures, and secure server deployments. Learn to design, model, and deploy custom applications using PHP 8, MySQL, and Laravel.',
    tags: ['PHP 8', 'MySQL', 'Laravel', 'RESTful APIs', 'MVC Architecture', 'Git & GitHub'],
    syllabus: [
      'Core Programming Syntax, Control Structures, Arrays, and Functions',
      'Object-Oriented Programming (OOP) in PHP & MVC models',
      'Advanced MySQL Database Designing & ER Diagrams',
      'Writing Secure Code (Preventing SQL injection, XSS)',
      'Laravel Routing, Eloquent ORM, and Middleware',
      'Deploying applications live to Linux Cloud Servers'
    ],
    tools: [
      { name: 'Cloud Server Instance', desc: 'Free hosting for portfolio', icon: '☁️' },
      { name: 'Premium MySQL Client', desc: 'Enterprise database designer', icon: '🗄️' },
      { name: 'GitKraken Pro License', desc: 'Premium visual version controller', icon: '🌿' }
    ]
  },
  {
    slug: 'mern-stack',
    title: 'MERN Stack Development',
    badge: '⚛️ Full JavaScript Principal',
    duration: '20 Weeks • 100% Practical',
    accentColor: 'from-cyan-400 to-teal-500',
    accentBorder: 'border-cyan-500/20 hover:border-cyan-500/50',
    glowClass: 'bg-glow-teal',
    num: '02',
    image: '/images/mern_stack.png',
    description: 'Become a highly capable, modern JavaScript application architect. Build high-scale real-time software systems using MongoDB, Express.js, React, and Node.js.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux Toolkit', 'WebSockets', 'Tailwind CSS'],
    syllabus: [
      'Modern ES6+ JavaScript runtime and async programming',
      'React UI structures, custom hooks, and performance tuning',
      'Global application state architecture using Redux Toolkit',
      'Building REST APIs with Express.js and Node.js server frameworks',
      'MongoDB schemas, aggregates, and mongoose object models',
      'Bi-directional real-time networks using Socket.io WebSockets'
    ],
    tools: [
      { name: 'Vercel Pro Suite', desc: 'Paid collaborative server tools', icon: '⚡' },
      { name: 'MongoDB Compass Pro', desc: 'Advanced NoSQL modeling client', icon: '🍃' },
      { name: 'Paid Postman Pro Account', desc: 'Premium team collaborative API testing', icon: '🚀' }
    ]
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    badge: '📢 Organic & Search Growth',
    duration: '12 Weeks • 100% Practical',
    accentColor: 'from-amber-500 to-yellow-500',
    accentBorder: 'border-yellow-500/20 hover:border-yellow-500/50',
    glowClass: 'bg-glow-amber',
    num: '03',
    image: '/images/digital_marketing.png',
    description: 'Master organic marketing, Search Engine Optimization (SEO), high-scale organic funnel architectures, and Google Ads management. Direct live budgets under guidance.',
    tags: ['SEO', 'Google Ads', 'Canva Pro', 'Google Analytics 4', 'Technical SEO auditing', 'Copywriting'],
    syllabus: [
      'Keyword Research, Competitor audits, Search Volume calculation',
      'On-Page Optimization, meta schemas, alt structuring, speed auditing',
      'Technical SEO, sitemaps, robots.txt, Search Console indexing',
      'High-converting ad copies, display ads, and video promotions',
      'Google Analytics 4 tagging and custom conversion tracking',
      'Live Case Study: Auditing and ranking an active local business portal'
    ],
    tools: [
      { name: 'Canva Pro License', desc: 'Fully paid design resource access', icon: '🎨' },
      { name: 'Premium SEO Keyword Tool', desc: 'Advanced keyword difficulty search', icon: '📊' },
      { name: 'Practice Hosting Sandbox', desc: 'Free CMS sandbox server for SEO setups', icon: '🌐' }
    ]
  },
  {
    slug: 'performance-marketing',
    title: 'Performance Marketing',
    badge: '📈 Paid Scaling & ROAS',
    duration: '12 Weeks • 100% Practical',
    accentColor: 'from-rose-500 to-purple-600',
    accentBorder: 'border-purple-500/20 hover:border-purple-500/50',
    glowClass: 'bg-glow-purple',
    num: '04',
    image: '/images/performance_marketing.png',
    description: 'Become a highly paid media buyer. Learn conversion mathematical architectures, landing page funnel audits, A/B Split experiments, and direct Meta Ad spends.',
    tags: ['Meta Ads Manager', 'Conversion API (CAPI)', 'A/B Split Experiments', 'ROAS Optimization', 'Audience Building'],
    syllabus: [
      'Meta Business Suite setup, domain verification, asset safety',
      'Meta Pixel integration, Conversion API (CAPI) backend setups',
      'Custom Audiences, Lookalike parameters, interest targeting stacks',
      'Creating High-ROAS hooks, copywriting structures, and visual angles',
      'Mathematical performance auditing, CAC, LTV, ROAS formulas',
      'Live Budgeting: Scaling a real campaign under Principal supervision'
    ],
    tools: [
      { name: 'Ad Business Sandbox', desc: 'Direct campaign configuration budgets', icon: '💳' },
      { name: 'Canva Pro License', desc: 'Fully paid creative design tool permissions', icon: '🎨' },
      { name: 'Hotjar Premium Access', desc: 'Heatmap conversion rate auditing tools', icon: '🔥' }
    ]
  }
];

const journeyCandidates = [
  
  
  {
    name: 'Bhavya Sachdeva',
    role: 'Digital Marketing Specialist • Royalfinity Academy, 2025',
    text: 'Placed at Fundoo Travels, where I apply digital marketing strategies and brand growth skills daily.',
    category: 'Digital Marketing',
    badge: '📈 PLACED',
    image: '/images/bhavya.png',
    company: 'Fundoo Travels',
  },
  {
    name: 'Mansi Chopra',
    role: 'Performance Marketer • Royalfinity Academy, 2025',
    text: 'Placed at MLAI Digital Pvt. Ltd., working on social media campaigns and performance marketing.',
    category: 'Digital Marketing',
    badge: '🚀 PLACED',
    image: '/images/mansi.jpeg',
    company: 'MLAI Digital Pvt. Ltd.',
  },
  {
    name: 'Trilok',
    role: 'AI Video Creator • Royalfinity Academy, 2026',
    text: 'Placed at Royalfinite Technologies as an AI video creator working on creative visual projects.',
    category: 'AI Video',
    badge: '🎬 PLACED',
    image: '/images/trilok.jpeg',
    company: 'Royalfinite Technologies',
  },
  {
    name: 'Jatin',
    role: 'AI Video Editor • Royalfinity Academy, 2026',
    text: 'Placed at Royalfinite Technologies, creating cinematic AI videos and motion content.',
    category: 'AI Video',
    badge: '🎥 PLACED',
    image: '/images/jatin.jpeg',
    company: 'Royalfinite Technologies',
  },
  {
    name: 'Monika',
    role: 'Graphic Designer • Royalfinity Academy, 2026',
    text: 'Placed at Royalfinite Technologies, designing creative branding and social media visuals.',
    category: 'Graphic Design',
    badge: '🎨 PLACED',
    image: '/images/monika.jpeg',
    company: 'Royalfinite Technologies',
  },
  {
    name: 'Teesha Singh',
    role: 'MERN Stack Developer • Royalfinity Academy, 2025',
    text: 'Placed at Inforises Technologies, building responsive and modern web applications.',
    category: 'MERN Stack Developer',
    badge: '💻 PLACED',
    image: '/images/teesha.jpeg',
    company: 'Inforises Technologies',
  },
  {
    name: 'Deeksha',
    role: 'Content Creator • Royalfinity Academy, 2026',
    text: 'Placed at Royalfinite Technologies, creating engaging content and creative campaigns.',
    category: 'Content Creation',
    badge: '✨ PLACED',
    image: '/images/deeksha.jpeg',
    company: 'Royalfinite Technologies',
  },
  {
    name: 'Dhruv Rana',
    role: 'Full Stack Developer • Royalfinity Academy, 2026',
    text: 'Placed at Royalfinite Technologies, working on full stack development and live client projects.',
    category: 'Full Stack Development',
    badge: '⚡ PLACED',
    image: '/images/dhruv.jpeg',
    company: 'Royalfinite Technologies',
  },
  {
    name: 'Aakash Bhatt',
    role: 'Full Stack Developer • Royalfinity Academy, 2026',
    text: 'Placed at Royalfinite Technologies, working on full stack development and live client projects.',
    category: 'Full Stack Development',
    badge: '⚡ PLACED',
    image: '/images/aakash.jpeg',
    company: 'Royalfinite Technologies',
  },
  {
    name: 'Chandan Yadav',
    role: 'Full Stack Developer • Royalfinity Academy, 2026',
    text: 'Placed at Royalfinite Technologies, working on full stack development and live client projects.',
    category: 'Full Stack Development',
    badge: '⚡ PLACED',
    image: '/images/chandan.jpeg',
    company: 'Royalfinite Technologies',
  }


];

export default function Home() {
  // Lead form submission states
  const [formData, setFormData] = useState({ name: '', phone: '', course: '' });
  const [submitted, setSubmitted] = useState(false);

  // Track open syllabus accordion indices per course index
  const [openAccordions, setOpenAccordions] = useState<Record<number, number | null>>({
    0: null, 1: null, 2: null, 3: null
  });

  // Track why-us flipped card states on touch devices
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleCardFlip = (idx: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Toggle dynamic syllabus accordions
  const toggleAccordion = (courseIdx: number, itemIdx: number) => {
    setOpenAccordions(prev => ({
      ...prev,
      [courseIdx]: prev[courseIdx] === itemIdx ? null : itemIdx
    }));
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Simulate database storage
    const currentLeads = JSON.parse(localStorage.getItem('enquiries') || '[]');
    currentLeads.push({
      ...formData,
      timestamp: new Date().toISOString(),
      source: 'Homepage Hero Lead'
    });
    localStorage.setItem('enquiries', JSON.stringify(currentLeads));

    // Send data to WhatsApp
    const message = `Hello Royalfinity Academy,\n\nI would like to request a callback.\n\n👤 *Name:* ${formData.name}\n📞 *WhatsApp Mobile:* ${formData.phone}\n🎓 *Target Course:* ${formData.course || 'Not Selected'}`;
    window.open(`https://wa.me/919211816999?text=${encodeURIComponent(message)}`, '_blank');

    setSubmitted(true);
    setFormData({ name: '', phone: '', course: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  // GSAP 3D Scroll Card Stacking Overlap Timelines
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero scaling and subtle drift
      gsap.fromTo('.hero-fade-in',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power4.out' }
      );

      // 2. Desktop Card Deck Stacking Timeline (Removed due to layout overlap bugs)
      // 3. Staggered reveal for pathway cards
      gsap.fromTo(
        '.pathway-card',
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#pathways',
            start: 'top 75%',
          }
        }
      );

      // 4. Why Choose Us 3D Scroll Grid & Parallax Shapes
      const whyUsTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#why-us',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        }
      });

      // Animate Floating Parallax Shapes
      whyUsTl.fromTo('.why-us-shape-1',
        { y: -60, rotate: 0 },
        { y: 60, rotate: 180, ease: 'none' },
        0
      );
      whyUsTl.fromTo('.why-us-shape-2',
        { y: 60, rotate: 0 },
        { y: -60, rotate: -180, ease: 'none' },
        0
      );

      // Animate 3D Text Roll-Up (Play once on enter)
      gsap.fromTo('.why-us-text-3d',
        { opacity: 0, y: 30, rotateX: -15, transformOrigin: 'top center' },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#why-us',
            start: 'top 80%',
          }
        }
      );

      // Animate Grid Cards 3D alignment (Play once on enter)
      gsap.fromTo('.why-us-card-3d',
        {
          opacity: 0,
          transform: 'perspective(1200px) translateZ(-100px) rotateX(12deg) translateY(50px)'
        },
        {
          opacity: 1,
          transform: 'perspective(1200px) translateZ(0px) rotateX(0deg) translateY(0px)',
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#why-us',
            start: 'top 75%',
          }
        }
      );

      // 5. Course Intro Section Animations
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#courses',
          start: 'top 80%',
        }
      });

      // Background Marquee Pan
      gsap.to('.intro-bg-text', {
        xPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: '#courses',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Parallax Glows
      gsap.to('.intro-glow-1', {
        y: -100, x: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '#courses',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
      gsap.to('.intro-glow-2', {
        y: 100, x: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: '#courses',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      introTl.fromTo('.intro-subheading',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
        .fromTo('.intro-heading-word',
          { y: 60, rotateX: -60, opacity: 0 },
          { y: 0, rotateX: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'back.out(1.4)' },
          "-=0.4"
        )
        .to('.intro-divider',
          { width: '120px', duration: 1, ease: 'power4.out' },
          "-=0.4"
        )
        .fromTo('.intro-paragraph',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          "-=0.6"
        );

      // 5.2. Alumni Testimonials Zigzag Video Cards Reveal
      gsap.fromTo('.gsap-alumni-card-left',
        { opacity: 0, x: -100, rotateY: -15, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-alumni-card-left',
            start: 'top 85%',
          }
        }
      );

      gsap.fromTo('.gsap-alumni-card-right',
        { opacity: 0, x: 100, rotateY: 15, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-alumni-card-right',
            start: 'top 85%',
          }
        }
      );

      gsap.fromTo('.gsap-alumni-text-reveal',
        { opacity: 0, y: 30, rotateX: -10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#testimonials',
            start: 'top 80%',
          }
        }
      );

      // 5.5. Student Journey Section 3D GSAP Reveal
      gsap.fromTo('.journey-text-3d',
        { opacity: 0, y: 30, rotateX: -15, transformOrigin: 'top center' },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#student-journey',
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.journey-slider-reveal',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#student-journey',
            start: 'top 75%',
          }
        }
      );

      // 6. The Environment Section GSAP Scroll-Pin
      gsap.fromTo('.env-text-reveal',
        { y: 40, opacity: 0, rotateX: -20, transformOrigin: 'top center' },
        {
          y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.1, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: '#environment', start: 'top 75%' }
        }
      );

      gsap.fromTo('.env-img-reveal',
        { opacity: 0, x: -60, rotateY: -20, scale: 0.9 },
        {
          opacity: 1, x: 0, rotateY: 0, scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '#environment', start: 'top 75%' }
        }
      );

      // 5.8. Technical Programs (Courses) 3D Card Stacking Animation and Environment Slider
      const mm = gsap.matchMedia();

      // Card Stacking Animation for ALL screen sizes
      mm.add({
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)"
      }, (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean };
        const sections = gsap.utils.toArray('.sticky-section') as HTMLElement[];
        const yOffset = isMobile ? -15 : -35;
        
        // Initial setup for 3D stacking depth
        sections.forEach((section, idx) => {
          gsap.set(section, {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            transformOrigin: 'center center -150px',
            transformPerspective: 1200,
            z: -100 * idx,
            y: yOffset * idx, // Shifting upward deck-style (smaller shift on mobile to prevent top cutoff)
            rotateX: -8 * idx,
            opacity: 1 - 0.22 * idx,
            scale: 1 - 0.04 * idx,
            pointerEvents: idx === 0 ? 'auto' : 'none', // Only front card is interactive initially
          });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top top",
            end: isMobile ? "+=2000" : "+=3200", // Scroll length (shorter on mobile for better ergonomics)
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });

        // Loop through cards to animate transitions
        sections.forEach((section, idx) => {
          if (idx < sections.length - 1) {
            // Current card flies upwards and out in 3D
            tl.to(section, {
              yPercent: -130,
              rotateX: 45,
              z: 150,
              opacity: 0,
              pointerEvents: 'none', // Scrolled card loses interactivity
              duration: 1,
              ease: "power2.inOut",
            }, `card-${idx}`);

            // The cards behind move forward one step in the stack
            for (let j = idx + 1; j < sections.length; j++) {
              const targetIdx = j - (idx + 1); // 0 is front
              tl.to(sections[j], {
                z: -100 * targetIdx,
                y: yOffset * targetIdx, // Shift forward/upward
                rotateX: -8 * targetIdx,
                opacity: 1 - 0.22 * targetIdx,
                scale: 1 - 0.04 * targetIdx,
                pointerEvents: targetIdx === 0 ? 'auto' : 'none', // Card moving to front becomes interactive
                duration: 1,
                ease: "power2.inOut",
              }, `card-${idx}`);
            }
          }
        });
      });

      // Desktop layout viewports >= 1024px for horizontal environment slider
      mm.add("(min-width: 1024px)", () => {
        // Horizontal Scroll Sequence for agency workspace slider
        const track = document.querySelector('.env-slider-track') as HTMLElement;
        const trackContainer = document.querySelector('.env-slider-container') as HTMLElement;
        if (track && trackContainer) {
          gsap.to(track, {
            x: () => -(track.scrollWidth - trackContainer.clientWidth) + "px",
            ease: "none",
            scrollTrigger: {
              trigger: '#environment',
              start: "top 5%",
              end: () => "+=" + (track.scrollWidth),
              scrub: 1,
              pin: true,
              anticipatePin: 1
            }
          });
        }
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-[#0A0A0C] text-white overflow-x-hidden">

      {/* Immersive Cinematic Hero Fold */}
      <section id="hero" ref={heroRef} className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-20 lg:py-32 overflow-hidden border-b border-white/5 bg-black">
        {/* Background Cinematic Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-45"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Cinematic dark overlay filters */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/40 via-[#0A0A0C]/70 to-[#0A0A0C] pointer-events-none z-10"></div>

        {/* Breathing glowing backdrops */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-glow-amber pointer-events-none z-10 animate-pulse-slow mix-blend-screen opacity-40"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-glow-purple pointer-events-none z-10 animate-pulse-slow mix-blend-screen opacity-40"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Left Header Titles */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <div className="hero-fade-in inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-500 text-xs font-bold uppercase tracking-widest w-fit shadow-md">
                <span>🔥 Admissions Open</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
              </div>

              <h1 className="hero-fade-in text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white">
                Learn Skills.<br />
                <span className="text-sunset-gradient">Use Premium Tools.</span><br />
                Build Your Future.
              </h1>

              <p className="hero-fade-in text-base text-gray-400 leading-relaxed font-medium">
                Royalfinity Academy gives you real-world agency experience with <span className="font-extrabold text-white">free access to all paid enterprise tools</span> — in a physical, corporate-like office environment where ambition is the dress code. Master web development, software architectures, and marketing.
              </p>

              {/* Stats Highlights */}
              <div className="hero-fade-in grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 mt-2 border-t border-white/5">
                {[
                  { value: '100%', label: 'Practical Work' },
                  { value: '1:1', label: 'Personal Mentors' },
                  { value: 'Free', label: 'Premium Softwares' },
                  { value: 'Direct', label: 'Placement Referrals' },
                ].map((stat, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-2xl font-extrabold text-white tracking-tight">{stat.value}</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right High-Converting Lead Form */}
            <div className="lg:col-span-5 w-full">
              <div className="hero-fade-in w-full rounded-3xl p-6 sm:p-8 bg-[#0D0D11]/90 border border-white/5 shadow-2xl relative">
                <div className="absolute inset-0 rounded-3xl border border-white/5 pointer-events-none bg-gradient-to-b from-white/5 to-transparent"></div>

                <h3 className="text-lg sm:text-xl font-extrabold uppercase tracking-wide text-white">
                  Request Call Back
                </h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Reserve a slot, consult our principal mentors, and schedule a walk-through.
                </p>

                {submitted ? (
                  <div className="mt-8 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center animate-fadeIn">
                    <span className="text-3xl">🎉</span>
                    <h4 className="text-base font-extrabold text-amber-500 uppercase tracking-wide mt-2">
                      Request Confirmed!
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed mt-1">
                      Our coordinator will call you within 24 operational hours. Prepare your goals!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 focus:border-amber-500/40 text-xs font-medium text-white placeholder-gray-600 outline-none transition-all duration-300"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">WhatsApp Mobile</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 focus:border-amber-500/40 text-xs font-medium text-white placeholder-gray-600 outline-none transition-all duration-300"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Target Curriculum</label>
                      <select
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 focus:border-amber-500/40 text-xs font-medium text-gray-400 outline-none transition-all duration-300"
                      >
                        <option value="" className="bg-[#0A0A0C]">Select a Course</option>
                        <option value="PHP Full Stack" className="bg-[#0A0A0C]">PHP Full Stack Development</option>
                        <option value="MERN Stack" className="bg-[#0A0A0C]">MERN Stack Development</option>
                        <option value="Digital Marketing" className="bg-[#0A0A0C]">Digital Marketing Specialist</option>
                        <option value="Performance Marketing" className="bg-[#0A0A0C]">Performance Marketing Architect</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl mt-2 text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-amber-500 via-yellow-400 to-yellow-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-amber-500/20"
                    >
                      Book Free consultation
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Course Categories Introductory Fold (Premium Redesign) */}
      <section id="courses" className="relative z-10 w-full pt-32 pb-24 bg-[#0A0A0C] border-b border-white/5 overflow-hidden">
        {/* Background Ambient Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full pointer-events-none z-0">
          <div className="intro-glow-1 absolute top-1/2 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-amber-500/10 rounded-full blur-[100px] -translate-y-1/2"></div>
          <div className="intro-glow-2 absolute top-1/2 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-yellow-500/10 rounded-full blur-[100px] -translate-y-1/2"></div>
        </div>

        {/* Massive Background Typography Marquee */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[200vw] overflow-hidden pointer-events-none select-none opacity-[0.02] z-0 flex whitespace-nowrap">
          <span className="intro-bg-text text-[15vw] font-black uppercase tracking-tighter text-white">
            PROGRAMS CURRICULUMS EXPERTISE PROGRAMS CURRICULUMS
          </span>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col items-center text-center">

          {/* Animated Subheading */}
          <div className="overflow-hidden mb-6 flex justify-center w-full">
            <span className="intro-subheading inline-block text-xs sm:text-sm font-extrabold uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-400">
              TECHNICAL PROGRAMS
            </span>
          </div>

          {/* Animated Main Heading with Word Split */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white leading-[1.1] max-w-4xl mx-auto flex flex-wrap justify-center gap-x-3 gap-y-2 [perspective:1000px]">
            {["Curriculums", "Built", "for", "Builders"].map((word, i) => (
              <span key={i} className="overflow-hidden inline-flex pb-2">
                <span className={`intro-heading-word inline-block [transform-origin:bottom_center] ${word === 'Builders' ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-400 to-yellow-600 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]' : ''}`}>
                  {word}
                </span>
              </span>
            ))}
          </h2>

          {/* Animated Divider Line */}
          <div className="intro-divider hidden lg:block w-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mt-10 mb-8 rounded-full"></div>

          {/* Animated Paragraph */}
          <p className="intro-paragraph text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto font-medium opacity-0">
            We don&apos;t just build courses, we build careers. In our programs, you get 100% practical experience working on live projects, backed by <strong className="text-amber-400 font-bold">₹40,000+ worth of premium paid tools</strong> provided completely free!
          </p>

        </div>
      </section>

      {/* 3D Vertical Card Stacking Showcase Container */}
      <div ref={cardsContainerRef} className="stacked-container relative w-full h-screen overflow-hidden bg-[#0A0A0C]">
        {courses.map((course, idx) => (
          <section
            key={idx}
            className="sticky-section absolute inset-0 w-full h-full overflow-hidden bg-transparent flex items-center justify-center"
            style={{ zIndex: 30 + (courses.length - idx) }}
          >
            {/* Background Glow */}
            <div className={`absolute top-1/4 right-1/4 w-80 h-80 ${course.glowClass} pointer-events-none -z-10 opacity-70`}></div>

            <div className="w-[92%] sm:w-[90%] md:w-[85%] lg:w-full max-w-5xl mx-auto px-5 py-6 sm:px-8 sm:py-8 lg:py-6 lg:px-10 relative z-20 bg-[#0D0D11] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden block lg:flex lg:items-center h-auto lg:h-[80vh]">
              <div className="grid grid-cols-12 gap-6 lg:gap-12 items-center lg:w-full">

                {/* Left Side: Course Info */}
                <div className="col-span-12 lg:col-span-7 flex flex-col gap-3 lg:gap-4 text-left order-2 lg:order-1">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
                    <span className="text-2xl sm:text-5xl font-extrabold text-white/10 tracking-wider">
                      {course.num}
                    </span>
                    <div className="flex flex-col gap-0.5 sm:gap-1">
                      <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border border-white/5 bg-white/5 text-[8px] sm:text-[10px] font-bold text-amber-500 uppercase tracking-widest w-fit">
                        {course.badge}
                      </span>
                      <span className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-1 mt-0.5">
                        {course.duration}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    {course.title}
                  </h2>

                  <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 pt-1 sm:pt-2">
                    {course.tags.slice(0, 4).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg border border-white/5 bg-white/5 text-[8px] sm:text-[10px] font-semibold text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Dynamic Syllabus Preview Accordion */}
                  <div className="hidden sm:flex flex-col gap-1 lg:gap-2 pt-1 lg:pt-2">
                    <span className="text-[8px] sm:text-[10px] uppercase font-bold tracking-widest text-gray-500">
                      Syllabus Overview
                    </span>

                    <div 
                      data-lenis-prevent
                      className="flex flex-col gap-1.5 sm:gap-2.5 max-h-[120px] lg:max-h-[110px] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar overscroll-contain"
                    >
                      {course.syllabus.slice(0, 3).map((module, mIdx) => {
                        const isExpanded = openAccordions[idx] === mIdx;
                        return (
                          <div
                            key={mIdx}
                            className={`rounded-lg sm:rounded-xl border border-white/5 transition-all duration-300 ${isExpanded ? 'bg-white/5' : 'bg-transparent'
                              }`}
                          >
                            <button
                              onClick={() => toggleAccordion(idx, mIdx)}
                              className="w-full flex items-center justify-between p-2 sm:p-3 text-[9px] sm:text-[11px] font-bold text-gray-300 hover:text-white uppercase tracking-wider text-left outline-none cursor-pointer"
                            >
                              <span>{`Module ${mIdx + 1}: ${module.split(' ')[0]} ${module.split(' ')[1] || ''}`}</span>
                              <span className={`text-[8px] sm:text-[10px] transition-transform duration-300 ${isExpanded ? 'rotate-180 text-amber-500' : 'text-gray-500'}`}>
                                ▼
                              </span>
                            </button>
                            {isExpanded && (
                              <div className="px-2 pb-2 sm:px-3 sm:pb-3 text-[9px] sm:text-[10px] text-gray-400 leading-relaxed font-medium">
                                {module}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Program Action Buttons */}
                  <div className="flex flex-row items-center gap-2 sm:gap-4 pt-2 lg:pt-3">
                    <Link
                      href="/contact"
                      className="flex-1 sm:flex-none text-center px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl text-[9px] sm:text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-amber-500 via-yellow-400 to-yellow-600 hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                      Apply & Reserve
                    </Link>

                    <Link
                      href={`/courses/${course.slug}`}
                      className="flex-1 sm:flex-none text-center px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl text-[9px] sm:text-xs font-bold uppercase tracking-wider text-white border border-white/10 hover:bg-white/5 hover:border-white/20 active:scale-95 transition-all duration-300"
                    >
                      Deep Dive stack
                    </Link>
                  </div>
                </div>

                {/* Right Side: Course Showcase Image */}
                <div className="col-span-12 lg:col-span-5 w-full h-[150px] sm:h-[250px] md:h-[300px] lg:h-[360px] xl:h-[400px] flex items-center justify-center p-1 sm:p-2 order-1 lg:order-2">
                  <div className="relative w-full h-full rounded-2xl sm:rounded-3xl bg-[#0D0D11]/90 border border-white/10 shadow-2xl overflow-hidden group">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Cinematic Bottom Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/20 to-transparent z-10 pointer-events-none"></div>

                    {/* Floating Overlay Text */}
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 z-20 flex flex-col gap-1 sm:gap-1.5">
                      <span className="text-[7px] sm:text-[10px] font-extrabold uppercase tracking-widest text-amber-500 shadow-sm">
                        Interactive Campus Program
                      </span>
                      <h4 className="text-[9px] sm:text-lg font-black text-white uppercase tracking-wide leading-tight drop-shadow-md">
                        Learn Skills. Build Career.
                      </h4>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Why Choose Us Section */}
      <section id="why-us" className="relative z-10 w-full bg-white text-slate-900 py-24 lg:py-36 overflow-hidden">
        {/* Floating Parallax 3D Glassmorphic Shapes */}
        <div className="why-us-shape-1 absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-blue-500/10 via-indigo-500/5 to-transparent blur-2xl pointer-events-none z-0"></div>
        <div className="why-us-shape-2 absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-transparent blur-2xl pointer-events-none z-0"></div>

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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-6 lg:my-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column: Heading and description */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-left">
              <div className="why-us-text-3d inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/10 bg-amber-50 text-amber-600 text-xs font-extrabold uppercase tracking-widest w-fit shadow-sm">
                <span>⚡ Why Royalfinity</span>
              </div>

              <h2 className="why-us-text-3d text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Agency Atmosphere.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-400 to-yellow-600">Real Code.</span>
              </h2>

              <p className="why-us-text-3d text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                We are not a traditional coaching center; we are a fully active digital agency. We believe that true, high-value expertise comes from building real client projects, not from studying textbooks.
              </p>

              <div className="why-us-text-3d hidden lg:flex items-center gap-2.5 text-xs font-bold text-slate-400 mt-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                <span className="uppercase tracking-wider">Practical training over theory</span>
              </div>
            </div>

            {/* Right Column: 2x2 Grid of premium 3D flip cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  title: 'Agency Atmosphere',
                  image: '/images/why_us_agency.png',
                  desc: 'Study in a professional corporate environment, sit in collaborative agency bays, and run agile standups daily.',
                  icon: (
                    <svg className="w-6 h-6 stroke-[1.75]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="4" y="2" width="16" height="20" rx="2" />
                      <path d="M9 22V18H15V22" />
                      <path d="M8 6H10" />
                      <path d="M14 6H16" />
                      <path d="M8 10H10" />
                      <path d="M14 10H16" />
                      <path d="M8 14H10" />
                      <path d="M14 14H16" />
                    </svg>
                  ),
                  colorClass: 'bg-blue-50 text-blue-600 border-blue-100/50 shadow-blue-100/10',
                  bullets: [
                    'Collaborative open-plan agency bays',
                    'Agile scrum sprint standups daily',
                    'Direct interaction with developers'
                  ],
                  btnText: 'Tour Campus',
                  link: '/about'
                },
                {
                  title: 'Licensed Software Provided',
                  image: '/images/why_us_software.png',
                  desc: 'No cracked systems. Get direct paid licenses of Vercel, Canva Pro, high-tier SEO audits, and server instances.',
                  icon: (
                    <svg className="w-6 h-6 stroke-[1.75]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="7.5" cy="15.5" r="3.5" />
                      <path d="M21 2L13 10" />
                      <path d="M16 5L19 8" />
                      <path d="M19 2L22 5" />
                    </svg>
                  ),
                  colorClass: 'bg-amber-50 text-amber-600 border-amber-100/50 shadow-amber-100/10',
                  bullets: [
                    'Vercel Pro team sandbox access',
                    'Canva Pro design and branding tools',
                    'Cloud sandbox virtual servers'
                  ],
                  btnText: 'View Ecosystem',
                  link: '/about'
                },
                {
                  title: 'Production-Grade Projects',
                  image: '/images/why_us_projects.png',
                  desc: 'Work on actual live agency budgets and build full-scale database platforms instead of template assignments.',
                  icon: (
                    <svg className="w-6 h-6 stroke-[1.75]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <path d="M8 21H16" />
                      <path d="M12 17V21" />
                      <path d="M7 8L10 11L7 14" />
                      <path d="M14 13H17" />
                    </svg>
                  ),
                  colorClass: 'bg-purple-50 text-purple-600 border-purple-100/50 shadow-purple-100/10',
                  bullets: [
                    'Live customer-facing databases',
                    'Real advertising budget handling',
                    'Agile team-based version control'
                  ],
                  btnText: 'Explore Syllabus',
                  link: '#courses'
                },
                {
                  title: 'Referral Placements',
                  image: '/images/why_us_referrals.png',
                  desc: 'Get directed straight to high-tier hiring agencies, custom referral networks, and local partner consultations.',
                  icon: (
                    <svg className="w-6 h-6 stroke-[1.75]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  ),
                  colorClass: 'bg-emerald-50 text-emerald-600 border-emerald-100/50 shadow-emerald-100/10',
                  bullets: [
                    'Direct active referral network mapping',
                    'Custom mock panel preparations',
                    'Resume auditing by top creators'
                  ],
                  btnText: 'Apply & Reserve',
                  link: '/contact'
                }
              ].map((item, idx) => (
                <div key={idx} className="why-us-card-3d flip-card-container w-full h-[320px] sm:h-[340px] cursor-pointer">
                  <div
                    className={`flip-card-inner ${
                      flippedCards[idx] ? 'is-flipped' : ''
                    }`}
                    onClick={() => toggleCardFlip(idx)}
                  >

                    {/* Front Face (White Card) */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl border border-slate-100 bg-white flex flex-col shadow-[0_15px_30px_-5px_rgba(0,0,0,0.025)] overflow-hidden">
                      {/* Top Cover Image Area */}
                      <div className="h-32 sm:h-36 w-full relative shrink-0">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }}></div>
                        {/* Subtle gradient overlay to blend */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-0"></div>

                        {/* Floating SVG Icon overlapping the edge */}
                        <div className={`absolute -bottom-6 left-6 w-12 h-12 rounded-2xl flex items-center justify-center border ${item.colorClass} shadow-[0_5px_15px_rgba(0,0,0,0.05)] bg-white z-10`}>
                          {item.icon}
                        </div>
                      </div>

                      {/* Text Content Area */}
                      <div className="flex flex-col flex-1 justify-between p-6 pt-10">
                        <div className="flex flex-col gap-1.5">
                          <h4 className="text-base font-extrabold text-slate-800 tracking-tight">
                            {item.title}
                          </h4>
                          <p className="text-[12px] sm:text-xs text-slate-500 leading-relaxed font-semibold">
                            {item.desc}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 text-[9px] text-amber-600 font-extrabold uppercase tracking-widest mt-2">
                          <span className="hidden lg:inline">Hover to Flip</span>
                          <span className="inline lg:hidden">Tap to Flip</span>
                          <span>➔</span>
                        </div>
                      </div>
                    </div>

                    {/* Back Face (Dark Card) */}
                    <div className="absolute inset-0 w-full h-full backface-hidden [transform:rotateY(180deg)] rounded-3xl border border-white/10 bg-[#0E0E12] p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
                      <div className="flex flex-col gap-3.5">
                        <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest">
                          ✨ Core Details
                        </span>
                        <div className="flex flex-col gap-2.5">
                          {item.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-2 text-[11px] sm:text-xs text-gray-400 font-semibold leading-relaxed">
                              <span className="text-amber-500 select-none shrink-0">•</span>
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Link
                        href={item.link}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full py-3 rounded-xl text-center text-[10px] font-bold uppercase tracking-wider text-black bg-gradient-to-r from-amber-500 via-yellow-400 to-yellow-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
                      >
                        {item.btnText}
                      </Link>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Alumni Reviews Testimonials Section */}
      <section id="testimonials" className="relative z-10 w-full py-20 lg:py-28 bg-[#0A0A0C] overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl mx-auto text-center flex flex-col gap-4 mb-20">
            <span className="gsap-alumni-text-reveal text-xs font-extrabold uppercase tracking-widest text-amber-500">
              Alumni Success
            </span>
            <h2 className="gsap-alumni-text-reveal text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Success Spotlights
            </h2>
            <p className="gsap-alumni-text-reveal text-xs sm:text-sm text-gray-400 leading-relaxed max-w-2xl mx-auto font-medium">
              See how our candidates mastered organic SEO audits, scaled paid search budgets, and leveraged technical agency skills to transform their career paths.
            </p>
          </div>

          {/* Zigzag Alumni Success Cards */}
          <div className="flex flex-col gap-24 lg:gap-32 mt-12">
            
            {/* Card 1: Rana */}
            <div className="gsap-alumni-card-left grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-5 w-full max-w-[360px] mx-auto relative group">
                <div className="absolute -inset-4 rounded-3xl bg-amber-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative rounded-3xl border border-white/10 bg-[#0D0D11]/60 p-2 sm:p-3 overflow-hidden shadow-2xl hover:border-amber-500/20 transition-all duration-300">
                  <div className="relative w-full rounded-2xl overflow-hidden aspect-[9/16] bg-[#050507]">
                    <video
                      src="/videos/rana.mp4"
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={(e) => {
                        e.currentTarget.muted = !e.currentTarget.muted;
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Text Right */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <span className="px-3.5 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-extrabold uppercase tracking-widest rounded-xl mb-4">
                  Organic & Search Growth
                </span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                  Digital Marketing Specialist
                </span>
                <h3 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-wide mb-4">
                 Nitin Rana
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-medium mb-6">
                  From Traditional Businessman to Digital Marketer: Nitin Rana's Journey
Nitin Rana runs a successful consultancy and travel agency. Recognizing that social media and modern technology are absolute priorities for modern business growth, he wanted to upgrade his skills but lacked technical knowledge.

That's when he discovered Royalfinity Academy on Instagram.

The Transformation:

Expert Guidance: The instructors understood his business needs and guided him toward the Advanced Digital Marketing Course.

Hands-on Skills: Even before completing the course, Nitin upgraded his skills by 50%, moving to an advanced level.

Total Independence: Today, he creates his own marketing banners, shoots/edits reels, and manages his brand's social media platforms completely on his own.

"The professional and supportive teaching at Royalfinity Academy is unmatched. If you want to scale your business and update your skills, this is the place to be!" — Nitin Rana
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 w-full">
                  {[
                    'Managed ₹25,000+ live search budget',
                    'Mastered SEO keywords & competitor audits',
                    'Built high-converting landing pages',
                    'Landed Growth Strategist referral role'
                  ].map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 text-xs text-gray-300 font-semibold leading-relaxed">
                      <span className="text-amber-500 text-sm select-none shrink-0">✓</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/courses/digital-marketing"
                  className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-amber-500 to-yellow-400 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20"
                >
                  View Digital Marketing Stack
                </Link>
              </div>
            </div>

            {/* Card 2: Bhavya */}
            <div className="gsap-alumni-card-right grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Text Left (order-2 lg:order-1) */}
              <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col items-start">
                <span className="px-3.5 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-extrabold uppercase tracking-widest rounded-xl mb-4">
                  Full Funnel Strategy & Analytics
                </span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                  Digital Marketing Specialist
                </span>
                <h3 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-wide mb-4">
                  Bhavya
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-medium mb-6">
                  Mastering the Digital Space: Bhavya’s Journey with Royalfinity Academy
Meet Bhavya, a bright student who wanted to learn the fast-paced world of digital marketing but was looking for the right platform to build her confidence and skills. Her search led her to Royalfinity Academy, and it turned out to be a complete game-changer.

The Learning Experience:

Step-by-Step Clarity: At Royalfinity, Bhavya found that digital marketing concepts weren't just explained, but broken down step-by-step for absolute clarity.

100% Practical Exposure: From running high-converting ad campaigns to mastering social media management, everything she learned was completely hands-on and practical.

Unmatched Mentorship: What stood out the most for Bhavya was the incredible support from her mentors, who were always ready to clear every doubt with immense patience.

The Transformation:
Thanks to the real-world projects and professional guidance, Bhavya has successfully completed her course. Today, she stepped out with immense confidence and advanced skills, ready to conquer the digital marketing industry.

"My overall experience here has been absolutely amazing! The mentors are highly supportive, and I’ve gained so much confidence in using my skills. If you want to learn digital marketing, Royalfinity Academy is definitely the place to be!" — Bhavya
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 w-full">
                  {[
                    '40% organic rank boost on client project',
                    'Mastered Google Analytics 4 tracking',
                    'Audited local business portal ranking',
                    'Secured Digital Media referral slot'
                  ].map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 text-xs text-gray-300 font-semibold leading-relaxed">
                      <span className="text-amber-500 text-sm select-none shrink-0">✓</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/courses/digital-marketing"
                  className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-amber-500 to-yellow-400 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20"
                >
                  View Digital Marketing Stack
                </Link>
              </div>

              {/* Video Right (order-1 lg:order-2) */}
              <div className="lg:col-span-5 order-1 lg:order-2 w-full max-w-[360px] mx-auto relative group">
                <div className="absolute -inset-4 rounded-3xl bg-amber-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative rounded-3xl border border-white/10 bg-[#0D0D11]/60 p-2 sm:p-3 overflow-hidden shadow-2xl hover:border-amber-500/20 transition-all duration-300">
                  <div className="relative w-full rounded-2xl overflow-hidden aspect-[9/16] bg-[#050507]">
                    <video
                      src="/videos/bhavya.webm"
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={(e) => {
                        e.currentTarget.muted = !e.currentTarget.muted;
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Students Journey Section */}
      <section id="student-journey" className="relative z-10 w-full py-20 lg:py-28 bg-[#0A0A0C] border-t border-white/5 overflow-hidden">
        {/* Background Glows matching the theme */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-glow-amber pointer-events-none -z-10 mix-blend-screen opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center flex flex-col gap-4 mb-16">
            <span className="journey-text-3d text-xs font-extrabold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-400 to-yellow-600">
              Academic Milestones
            </span>
            <h2 className="journey-text-3d text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Students Journey With Us
            </h2>
            <div className="journey-text-3d w-16 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full mt-1"></div>
            <p className="journey-text-3d text-xs sm:text-sm text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Thousands of learners from across the globe have transformed their careers through our programs. Here&apos;s what our Royalfinity Academy candidates say about their academic journey with us.
            </p>
          </div>

          {/* Infinite Horizontal Marquee Carousel */}
          <div className="relative w-full overflow-hidden py-4 journey-slider-reveal [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
            <div className="flex gap-8 w-max animate-marquee hover:[animation-play-state:paused] py-4">
              {[
                ...journeyCandidates,
                ...journeyCandidates,
                ...journeyCandidates,
                ...journeyCandidates,
              ].map((candidate, idx) => (
                <div
                  key={idx}
                  className="w-[320px] sm:w-[360px] shrink-0 bg-[#0D0D11]/80 backdrop-blur-sm border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative shadow-2xl transition-all duration-500 hover:border-amber-500/30 group/card"
                >
                  {/* Top quotes decorative circle */}
                  <div className="absolute top-6 left-6 w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 text-sm font-serif">
                    “
                  </div>

                  {/* Headshot & Badge */}
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="w-full h-full p-1 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-yellow-600 shadow-md">
                      <img
                        src={candidate.image}
                        alt={candidate.name}
                        className="w-full h-full object-cover rounded-full bg-[#0A0A0C]"
                      />
                    </div>
                   
                  </div>

                  {/* Graduate Info */}
                  <div className="flex flex-col items-center">
                    <h3 className="text-lg font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-yellow-500 tracking-wide">
                      {candidate.name}
                    </h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center mt-1">
                      {candidate.role}
                    </p>

                    {/* Rating */}
                    <div className="flex justify-center gap-1 my-3 text-amber-500 text-xs">
                      ★ ★ ★ ★ ★
                    </div>

                    {/* Testimonial Quote */}
                    <p className="text-xs text-gray-300 leading-relaxed text-center italic my-4 px-2">
                      &quot;{candidate.text}&quot;
                    </p>
                  </div>

                  {/* Category Pill Tag */}
                  <div className="flex justify-center mt-4">
                    <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-[9px] font-extrabold uppercase tracking-widest hover:scale-105 transition-transform cursor-pointer">
                      {candidate.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Environment Section */}
      <section id="environment" className="relative z-10 w-full py-16 lg:py-20 bg-[#050508] border-t border-white/5 overflow-clip">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-screen"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[150px] pointer-events-none -z-10 mix-blend-screen"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column: Premium Image Container */}
            <div className="lg:col-span-5 w-full h-[300px] sm:h-[400px] lg:h-[450px] flex justify-center env-img-reveal [perspective:1200px]">
              <div className="w-full h-full rounded-[2rem] border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent z-10"></div>
                {/* Premium Tech Image from Unsplash */}
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
                  alt="Royalfinity Academy Professional Setup"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100"
                />

                {/* Glow accents */}
                <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50 z-20"></div>
                <div className="absolute bottom-8 left-8 z-20">
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/50 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    Faridabad Campus
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 env-text-reveal">
                  <div className="w-8 h-[2px] bg-amber-500"></div>
                  <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-amber-500">
                    The Environment
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight env-text-reveal">
                  Where Professionals<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 italic pr-2 font-serif font-medium">Are Made</span>
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-medium env-text-reveal max-w-xl">
                We replicated a real tech company&apos;s work culture inside our academy. Because the best way to prepare for professional life is to live it — starting day one.
              </p>

              {/* Scroll-Driven Horizontal Slider */}
              <div className="relative w-full mt-2 env-slider-container overflow-x-auto lg:overflow-hidden scrollbar-none rounded-3xl border border-white/5 bg-[#0D0D12]/60 backdrop-blur-sm shadow-xl lg:[mask-image:linear-gradient(to_right,black_85%,transparent_100%)]">

                <div className="flex env-slider-track w-max gap-4 p-4 lg:gap-0 lg:p-0">
                  {[
                    { title: "Professional Workstations", desc: "Dedicated ergonomic desks with high-spec equipment — your own professional setup every session.", icon: "🖥️" },
                    { title: "Enterprise-Grade Internet", desc: "100 Mbps+ fibre connection ensures zero latency whether you're hosting, deploying, or downloading.", icon: "🌐" },
                    { title: "Complimentary Refreshments", desc: "Unlimited tea and coffee throughout your learning hours — comfort that fuels deep focus.", icon: "☕" },
                    { title: "Collaborative Work Culture", desc: "Peer-to-peer learning, group projects, and a community that pushes everyone to grow together.", icon: "🤝" }
                  ].map((item, idx) => (
                    <div 
                      key={idx} 
                      className="w-[270px] sm:w-[320px] lg:w-[350px] flex-shrink-0 flex flex-col items-start gap-4 p-6 lg:p-7 rounded-2xl border border-white/5 lg:border-0 lg:border-r lg:rounded-none bg-[#0A0A0C]/60 lg:bg-transparent hover:bg-white/[0.02] transition-colors duration-300 shadow-lg lg:shadow-none"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-xl border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                        {item.icon}
                      </div>
                      <div className="flex flex-col gap-2">
                        <h4 className="text-sm font-black text-white tracking-wide uppercase">{item.title}</h4>
                        <p className="text-[11px] text-gray-400 leading-relaxed font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              <div className="mt-2 env-text-reveal">
                <Link href="/contact" className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-extrabold text-[11px] uppercase tracking-widest shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all duration-300">
                  Experience It Yourself
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* New Course Pathways Overlapping Section */}
      <section id="pathways" className="relative w-full bg-white pt-28 pb-36 text-slate-900 overflow-visible">

        {/* Curved overlay at the top (waves from the dark environment section to this white section) */}
        <div className="absolute -top-[2px] left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
          <svg className="relative block w-[calc(100%+1.3px)] h-[60px] lg:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,42.4V0Z" fill="#050508"></path>
          </svg>
        </div>

        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 text-center flex flex-col gap-3 mb-24 relative z-30 pt-10">
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-600 block mb-2">
            ⚡ SPECIALIZED STACKS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-slate-900 leading-tight">
            Kickstart Your Career With Royalfinity Pathways
          </h2>
          <div className="hidden lg:block w-16 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full mt-3"></div>
          <p className="text-xs sm:text-sm text-slate-500 font-extrabold uppercase tracking-widest mt-3">
            What are you interested in?
          </p>
        </div>

        {/* Main Curved Overlapping Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">

          {/* Dark Box Container */}
          <div className="bg-[#050507] rounded-[48px] p-8 sm:p-16 border border-white/5 shadow-2xl relative">

            {/* 2x2 Overlapping Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 -mt-24 sm:-mt-32 mb-6">
              {[
                {
                  title: 'PHP Developer Courses',
                  desc: 'Master enterprise-level backend engineering, database architectures, and secure server deployments.',
                  bgImage: '/images/php_developer.png',
                  link: '/contact',
                  badge: 'PHP & Laravel'
                },
                {
                  title: 'MERN Stack Courses',
                  desc: 'Become a highly capable JavaScript application architect. Build high-scale real-time software systems.',
                  bgImage: '/images/mern_stack.png',
                  link: '/contact',
                  badge: 'React & Node'
                },
                {
                  title: 'Digital Marketing Courses',
                  desc: 'Master organic marketing, Search Engine Optimization (SEO), and high-scale organic funnel architectures.',
                  bgImage: '/images/digital_marketing.png',
                  link: '/contact',
                  badge: 'SEO & Growth'
                },
                {
                  title: 'Performance Marketing Courses',
                  desc: 'Learn conversion mathematical architectures, landing page funnel audits, and direct Meta Ad spends.',
                  bgImage: '/images/performance_marketing.png',
                  link: '/contact',
                  badge: 'Paid Ads & ROAS'
                }
              ].map((card, pIdx) => {
                const handlePathwayMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
                  const el = e.currentTarget;
                  const rect = el.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;

                  const xc = rect.width / 2;
                  const yc = rect.height / 2;

                  const angleX = (yc - y) / 10;
                  const angleY = (x - xc) / 10;

                  el.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;

                  const glow = el.querySelector('.ambient-glow') as HTMLDivElement;
                  if (glow) {
                    glow.style.left = `${x}px`;
                    glow.style.top = `${y}px`;
                    glow.style.opacity = '1';
                  }
                };

                const handlePathwayMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
                  const el = e.currentTarget;
                  el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

                  const glow = el.querySelector('.ambient-glow') as HTMLDivElement;
                  if (glow) {
                    glow.style.opacity = '0';
                  }
                };

                return (
                  <Link
                    href={card.link}
                    key={pIdx}
                    className="pathway-card group relative block aspect-[4/3] w-full rounded-[32px] overflow-hidden border border-white/10 bg-[#0B0B0D] shadow-2xl transition-all duration-300 cursor-pointer"
                    onMouseMove={handlePathwayMouseMove}
                    onMouseLeave={handlePathwayMouseLeave}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Hover ambient spotlight glow */}
                    <div className="ambient-glow absolute pointer-events-none w-48 h-48 -ml-24 -mt-24 bg-amber-500/10 rounded-full blur-2xl opacity-0 transition-opacity duration-300 z-30"></div>

                    {/* Card Background Image with hover zoom */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                        style={{ backgroundImage: `url(${card.bgImage})` }}
                      />
                      {/* Dark gradient overlay for extreme readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent z-10" />
                    </div>

                    {/* Card Contents */}
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-8" style={{ transform: 'translateZ(30px)' }}>

                      {/* Category Badge */}
                      <span className="w-fit px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] font-bold text-amber-500 uppercase tracking-widest mb-3">
                        {card.badge}
                      </span>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-wide transition-colors group-hover:text-amber-400">
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[11px] sm:text-xs text-white/50 leading-relaxed font-semibold mt-2 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[80px] transition-all duration-500 ease-in-out">
                        {card.desc}
                      </p>

                      {/* Visual indicator (arrow) */}
                      <div className="flex items-center gap-1.5 text-[10px] text-amber-500 font-extrabold uppercase tracking-widest mt-4">
                        <span>Explore pathway</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1.5">➔</span>
                      </div>

                    </div>
                  </Link>
                );
              })}
            </div>

          </div>
        </div>

        {/* Bottom curve transitions back to a dark footer section or fits smoothly */}
        <div className="absolute -bottom-[1px] left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
          <svg className="relative block w-[calc(100%+1.3px)] h-[60px] lg:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,42.4V0Z" fill="#050507" transform="rotate(180 600 60)"></path>
          </svg>
        </div>

      </section>

    </div>
  );
}