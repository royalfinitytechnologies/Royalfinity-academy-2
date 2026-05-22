'use client';

import { useEffect, useState, use, useRef } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Mock data mapping
const coursesData: Record<string, {
  title: string;
  badge: string;
  duration: string;
  description: string;
  tags: string[];
  image: string;
  syllabus: string[];
  toolsProvided: { name: string; desc: string; icon: string }[];
  careerPaths: { role: string; salary: string; demand: string }[];
  whoIsThisFor: { profile: string; desc: string; icon: string }[];
  accentColor: string;
  glowClass: string;
}> = {
  'php-stack': {
    title: 'PHP Full Stack Development',
    badge: '🛠️ Back-End Principal',
    duration: '16 Weeks • 100% Practical',
    description: 'Master enterprise-level backend engineering, database architectures, and secure server deployments. Learn to design, model, and deploy custom applications using PHP 8, MySQL, and Laravel.',
    tags: ['PHP 8', 'MySQL', 'Laravel Framework', 'RESTful APIs', 'MVC Architecture', 'Git & GitHub'],
    image: '/images/php_developer.png',
    accentColor: 'text-amber-500',
    glowClass: 'bg-glow-amber',
    syllabus: [
      'Core Programming Syntax, Control Structures, Arrays, and Functions',
      'Object-Oriented Programming (OOP) in PHP, namespaces, and trait models',
      'Advanced MySQL Database Designing, ER Diagrams, Relational models, indexing',
      'Writing Secure Code (Preventing SQL injection, XSS, Session hijacking)',
      'Laravel Routing, Middleware, Controllers, Eloquent ORM relationships',
      'Tailwind CSS Integration, AJAX, and frontend REST communications',
      'Deploying applications live to Linux Production Cloud Servers'
    ],
    toolsProvided: [
      { name: 'Direct Cloud Server Instance', desc: 'Free production hosting for active portfolio deployment', icon: '☁️' },
      { name: 'Premium MySQL GUI Tool', desc: 'Professional database management client license', icon: '🗄️' },
      { name: 'GitKraken Pro License', desc: 'Premium visual version controller client', icon: '🌿' }
    ],
    careerPaths: [
      { role: 'Full Stack PHP Developer', salary: '₹4.5L - ₹8.5L', demand: 'Extreme' },
      { role: 'Laravel Backend Engineer', salary: '₹5.0L - ₹9.0L', demand: 'High' },
      { role: 'Database Administrator', salary: '₹4.0L - ₹7.5L', demand: 'Moderate' }
    ],
    whoIsThisFor: [
      { profile: 'Aspiring Backend Engineers', desc: 'Want to build logic and architect server infrastructures.', icon: '💻' },
      { profile: 'Frontend Developers', desc: 'Looking to transition to full stack by mastering database relations.', icon: '🔄' },
      { profile: 'Tech Enthusiasts', desc: 'Individuals eager to learn the backbone of 70% of the web.', icon: '🌐' }
    ]
  },
  'mern-stack': {
    title: 'MERN Stack Development',
    badge: '⚛️ Full JavaScript Principal',
    duration: '20 Weeks • 100% Practical',
    description: 'Become a highly capable, modern JavaScript application architect. Build high-scale real-time software systems using MongoDB, Express.js, React, and Node.js.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB NoSQL', 'Redux Toolkit', 'WebSockets', 'Tailwind CSS'],
    image: '/images/mern_stack.png',
    accentColor: 'text-cyan-400',
    glowClass: 'bg-glow-teal',
    syllabus: [
      'Modern ES6+ JavaScript runtime, asynchronous promises, and error handling',
      'React UI structures, custom hooks, context values, and performance tuning',
      'Global application state architecture using Redux Toolkit',
      'Building REST APIs with Express.js and Node.js server frameworks',
      'MongoDB schemas, advanced aggregates, indexing, and mongoose object models',
      'Bi-directional real-time communication networks using Socket.io WebSockets',
      'Deploying full stack platforms to Vercel, Render, and AWS environments'
    ],
    toolsProvided: [
      { name: 'Vercel Pro Subscription', desc: 'Paid hosting deployment server tools', icon: '⚡' },
      { name: 'MongoDB Compass Enterprise', desc: 'Advanced NoSQL modeling client tools', icon: '🍃' },
      { name: 'Paid Postman Pro Account', desc: 'Premium team collaborative API testing sandbox', icon: '🚀' }
    ],
    careerPaths: [
      { role: 'MERN Stack Developer', salary: '₹6.0L - ₹12.0L', demand: 'Extreme' },
      { role: 'React Frontend Developer', salary: '₹5.0L - ₹9.5L', demand: 'High' },
      { role: 'Node.js Backend Developer', salary: '₹5.5L - ₹10.5L', demand: 'Extreme' }
    ],
    whoIsThisFor: [
      { profile: 'JavaScript Developers', desc: 'Wanting to master a single language across the entire stack.', icon: '⚡' },
      { profile: 'React Enthusiasts', desc: 'Ready to build their own backend REST APIs and secure databases.', icon: '⚛️' },
      { profile: 'Startup Founders', desc: 'Entrepreneurs looking to build rapid high-scale SaaS products.', icon: '🚀' }
    ]
  },
  'digital-marketing': {
    title: 'Digital Marketing',
    badge: '📢 Organic & Search Growth',
    duration: '12 Weeks • 100% Practical',
    description: 'Master organic marketing, Search Engine Optimization (SEO), high scale organic funnel architectures, and Google Ads management. Direct live budgets under guidance.',
    tags: ['Search Engine Optimization (SEO)', 'Google Ads Management', 'Canva Pro', 'Google Analytics 4', 'Technical SEO auditing', 'Copywriting'],
    image: '/images/digital_marketing.png',
    accentColor: 'text-amber-500',
    glowClass: 'bg-glow-amber',
    syllabus: [
      'Keyword Research, Competitor audits, Search Volume calculations',
      'On-Page Optimization, meta schemas, alt structuring, speed auditing',
      'Technical SEO, sitemaps, robots.txt, Google Search Console indexing',
      'High-converting ad copies, display ads, search ads, and video promotions',
      'Graphic systems using Canva Pro, visual branding, storytelling parameters',
      'Google Analytics 4 tagging, custom event setups, landing page audits',
      'Live Case Study: Auditing and ranking an active local business portal'
    ],
    toolsProvided: [
      { name: 'Canva Pro License', desc: 'Fully paid access to Canva design resources', icon: '🎨' },
      { name: 'Premium SEO Keyword Tool', desc: 'Access to high-tier competitor search volume audits', icon: '📊' },
      { name: 'Hosting for Practice', desc: 'Free CMS sandbox server for practicing SEO configurations', icon: '🌐' }
    ],
    careerPaths: [
      { role: 'Digital Marketing Manager', salary: '₹5.0L - ₹9.5L', demand: 'High' },
      { role: 'SEO Specialist', salary: '₹4.0L - ₹7.0L', demand: 'Extreme' },
      { role: 'Google Ads Strategist', salary: '₹4.5L - ₹8.0L', demand: 'High' }
    ],
    whoIsThisFor: [
      { profile: 'Creative Marketers', desc: 'Looking to master data-driven search and organic growth.', icon: '📈' },
      { profile: 'Business Owners', desc: 'Wanting to drive zero-cost traffic to their local operations.', icon: '🏪' },
      { profile: 'Content Creators', desc: 'Ready to optimize funnels and scale their audience visibility.', icon: '🎥' }
    ]
  },
  'performance-marketing': {
    title: 'Performance Marketing',
    badge: '📈 Paid Scaling & ROAS',
    duration: '12 Weeks • 100% Practical',
    description: 'Become a highly paid media buyer. Learn conversion mathematical architectures, landing page funnel audits, A/B Split experiments, and direct Meta Ad spends.',
    tags: ['Meta Ads Manager', 'Conversion API (CAPI)', 'A/B Split Experiments', 'ROAS Optimization', 'Funnel Architectures', 'Audience Building'],
    image: '/images/performance_marketing.png',
    accentColor: 'text-rose-500',
    glowClass: 'bg-glow-purple',
    syllabus: [
      'Meta Business Suite setup, domain verification, and business asset safety',
      'Meta Pixel integration, Conversion API (CAPI) backend setups',
      'Custom Audiences, Lookalike parameters, interest targeting stacks',
      'Creating High-ROAS hooks, copywriting structures, and visual angles',
      'Mathematical performance auditing, CAC, LTV, ROAS formulas',
      'A/B Split testing on campaigns, assets, and landing page conversions',
      'Live Budgeting: Scaling a real campaign under Principal supervision'
    ],
    toolsProvided: [
      { name: 'Meta Business Sandbox Access', desc: 'Direct access to ad campaign configurations', icon: '💳' },
      { name: 'Canva Pro License', desc: 'Fully paid creative design tool permissions', icon: '🎨' },
      { name: 'Hotjar Premium Access', desc: 'Heatmap analytical tools for CRO conversions', icon: '🔥' }
    ],
    careerPaths: [
      { role: 'Performance Media Buyer', salary: '₹5.5L - ₹10.0L', demand: 'Extreme' },
      { role: 'Growth Marketing Lead', salary: '₹6.5L - ₹13.0L', demand: 'Extreme' },
      { role: 'Conversion Rate Analyst', salary: '₹5.0L - ₹8.5L', demand: 'High' }
    ],
    whoIsThisFor: [
      { profile: 'Data-Driven Analysts', desc: 'Who enjoy math, A/B testing, and ROAS optimization.', icon: '🧮' },
      { profile: 'Media Buyers', desc: 'Looking to manage high-budget campaigns on Meta infrastructure.', icon: '💸' },
      { profile: 'Growth Hackers', desc: 'Wanting to master the conversion API and landing page psychology.', icon: '🎯' }
    ]
  }
};

interface Props {
  params: Promise<{ slug: string }>;
}

export default function CourseDetail({ params }: Props) {
  // Await the parameters Promise using React's use hook for React 19/Next 16 safety!
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const course = coursesData[slug];

  // Lead Enquiry state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (course) {
      setFormData(prev => ({ ...prev, course: course.title }));
    }
  }, [course]);

  // GSAP Animations
  useEffect(() => {
    if (!course || !containerRef.current) return;
    
    const ctx = gsap.context(() => {
      // 1. Hero Animations (Initial Load)
      const tl = gsap.timeline();
      
      tl.fromTo('.gsap-hero-badge', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
      .fromTo('.gsap-hero-title-word', 
        { y: 50, rotateX: -45, opacity: 0 }, 
        { y: 0, rotateX: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.5)' },
        "-=0.4"
      )
      .fromTo('.gsap-hero-desc',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        "-=0.5"
      )
      .fromTo('.gsap-hero-tags',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'back.out(2)' },
        "-=0.4"
      )
      .fromTo('.gsap-hero-buttons',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        "-=0.3"
      );

      // Hero Image 3D Entrance
      gsap.fromTo('.gsap-hero-image',
        { 
          opacity: 0, 
          transform: 'perspective(1000px) rotateY(-20deg) rotateX(10deg) translateZ(-100px)' 
        },
        { 
          opacity: 1, 
          transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)', 
          duration: 1.5, 
          ease: 'power3.out',
          delay: 0.3
        }
      );

      // 2. Who is this for? Staggered Cards
      gsap.fromTo('.gsap-who-card',
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#who-is-this-for',
            start: 'top 85%',
          }
        }
      );

      // 3. Syllabus Items
      gsap.fromTo('.gsap-syllabus-item',
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#syllabus',
            start: 'top 85%',
          }
        }
      );



      // 5. Career Pathways
      gsap.fromTo('.gsap-career-card',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1, opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#career-pathways',
            start: 'top 85%',
          }
        }
      );

      // 6. Sticky Form Slide-in
      gsap.fromTo('.gsap-form-container',
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gsap-form-container',
            start: 'top 90%',
          }
        }
      );

    }, containerRef);
    
    return () => ctx.revert();
  }, [course]);

  if (!course) {
    notFound();
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill out all fields.');
      return;
    }
    const leads = JSON.parse(localStorage.getItem('royalfinity_leads') || '[]');
    leads.push({ ...formData, timestamp: new Date().toISOString() });
    localStorage.setItem('royalfinity_leads', JSON.stringify(leads));

    // Send data to WhatsApp
    const message = `Hello Royalfinity Academy,\n\nI have submitted a course consultation request.\n\n👤 *Name:* ${formData.name}\n✉️ *Email:* ${formData.email}\n📞 *WhatsApp Mobile:* +91 ${formData.phone}\n🎓 *Selected Program:* ${formData.course}`;
    window.open(`https://wa.me/919211816999?text=${encodeURIComponent(message)}`, '_blank');

    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      course: course ? course.title : '',
    });
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#0A0A0C] text-white pt-16 pb-24 overflow-hidden">

      {/* Background glow spots */}
      <div className={`absolute top-20 right-10 w-96 h-96 ${course.glowClass} pointer-events-none -z-10 animate-pulse-slow`}></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-glow-amber pointer-events-none -z-10 animate-pulse-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="mb-6 text-xs text-white/40 tracking-wider">
          <Link href="/" className="hover:text-amber-400">Home</Link>
          <span className="mx-2.5">/</span>
          <Link href="/courses" className="hover:text-amber-400">Courses</Link>
          <span className="mx-2.5">/</span>
          <span className="text-white/60">{course.title}</span>
        </div>

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 lg:mb-28">

          {/* Left info column */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            <div className="mb-4">
              <span className="gsap-hero-badge inline-block px-3.5 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                {course.badge}
              </span>
              <span className="gsap-hero-badge inline-block ml-3 text-xs text-white/40 tracking-wider font-semibold">
                {course.duration}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6 leading-none flex flex-wrap gap-x-3 gap-y-2 [perspective:1000px]">
              {course.title.split(' ').map((word, i) => (
                <span key={i} className="overflow-hidden inline-flex">
                  <span className={`gsap-hero-title-word inline-block [transform-origin:bottom_center] ${i === course.title.split(' ').length - 1 ? course.accentColor : ''}`}>
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <p className="gsap-hero-desc text-base sm:text-lg text-white/70 leading-relaxed mb-8">
              {course.description}
            </p>

            <div className="flex flex-wrap gap-2.5 mb-8">
              {course.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="gsap-hero-tags px-3 py-1.5 bg-white/5 border border-white/15 rounded-lg text-xs font-bold text-white/80 tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="gsap-hero-buttons flex gap-4">
              <a
                href="https://wa.me/+919211816999"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm uppercase tracking-widest shadow-md flex items-center gap-2"
              >
                <span>💬 Enquire via WhatsApp</span>
              </a>
              <a
                href="#syllabus"
                className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm uppercase tracking-widest flex items-center justify-center"
              >
                Syllabus Breakdown
              </a>
            </div>

          </div>

          {/* Right image column */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className="gsap-hero-image w-full max-w-md h-80 sm:h-96 rounded-3xl bg-cover bg-center border border-white/15 shadow-2xl relative overflow-hidden group"
              style={{ backgroundImage: `url(${course.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest block mb-1">Interactive Campus Program</span>
                <span className="text-lg font-black uppercase text-white tracking-wide">Learn Skills. Build Career.</span>
              </div>
            </div>
          </div>

        </section>

        {/* Who Is This For Section */}
        <section id="who-is-this-for" className="mb-20 lg:mb-28">
          <div className="text-center mb-10 overflow-hidden">
            <h2 className="gsap-hero-badge inline-block text-2xl sm:text-4xl font-black uppercase tracking-wide text-white mb-3">
              Who Is This Program For?
            </h2>
            <div className="hidden lg:block w-16 h-1 bg-amber-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {course.whoIsThisFor.map((item, idx) => (
              <div key={idx} className="gsap-who-card p-6 rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent hover:border-white/10 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-white mb-2">{item.profile}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Content split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left side: Syllabus & tools */}
          <div className="lg:col-span-8 space-y-16">

            {/* Syllabus */}
            <section id="syllabus">
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-white mb-6 border-b border-white/5 pb-3">
                Curriculum Syllabus
              </h2>
              <div className="space-y-4">
                {course.syllabus.map((item, idx) => (
                  <div
                    key={idx}
                    className="gsap-syllabus-item p-5 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02] flex gap-4 transition-all duration-200"
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-semibold">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Career Pathways */}
            <section id="career-pathways">
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-white mb-2 border-b border-white/5 pb-3">
                Career Pathways & Outlook
              </h2>
              <p className="text-xs text-white/40 mb-6">
                Where our graduates go after completing portfolios.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {course.careerPaths.map((path, idx) => (
                  <div key={idx} className="gsap-career-card p-5 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col justify-between h-36">
                    <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">{path.role}</h4>
                    <div className="mt-4 border-t border-white/5 pt-3 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block">Average Salary</span>
                        <span className="text-xs font-black text-amber-400">{path.salary}</span>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block">Industry Demand</span>
                        <span className="text-xs font-black text-emerald-400">{path.demand}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right side: Sticky Enquiry form */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="gsap-form-container p-6 rounded-3xl glass-container border border-white/10 shadow-2xl relative overflow-hidden">

              <div className="text-center mb-6">
                <h3 className="text-xl font-black uppercase text-white tracking-wide">Request Consultation</h3>
                <p className="text-xs text-white/50 mt-1">Get curriculum details and counselor assistance.</p>
              </div>

              {submitted ? (
                <div className="py-8 text-center">
                  <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400 text-xl">
                    ✓
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">Request Received!</h4>
                  <p className="text-[10px] text-white/60 mb-4 px-4 leading-relaxed">Thank you. A principal academic advisor will contact you within 24 hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[10px] font-semibold uppercase tracking-wider transition-all"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">

                  <div>
                    <label className="block text-[9px] font-extrabold uppercase tracking-wider text-white/65 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="w-full px-4 py-2.5 bg-[#131317] border border-white/10 rounded-xl focus:border-amber-500 focus:outline-none text-xs placeholder-white/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-extrabold uppercase tracking-wider text-white/65 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="w-full px-4 py-2.5 bg-[#131317] border border-white/10 rounded-xl focus:border-amber-500 focus:outline-none text-xs placeholder-white/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-extrabold uppercase tracking-wider text-white/65 mb-1">WhatsApp Mobile No</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-white/30 font-semibold">+91</span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        pattern="[0-9]{10}"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="10-digit number"
                        className="w-full pl-11 pr-4 py-2.5 bg-[#131317] border border-white/10 rounded-xl focus:border-amber-500 focus:outline-none text-xs placeholder-white/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-extrabold uppercase tracking-wider text-white/65 mb-1">Program Selection</label>
                    <input
                      type="text"
                      name="course"
                      disabled
                      value={formData.course}
                      className="w-full px-4 py-2.5 bg-[#1a1a20] border border-white/5 rounded-xl text-xs text-white/50"
                    />
                  </div>

                  <p className="text-[9px] text-white/30 text-center leading-relaxed py-1">
                    By submitting, I permit Royalfinity Academy to send course schedules.
                  </p>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-extrabold text-xs tracking-widest uppercase shadow-lg hover:shadow-amber-500/10 transition-all"
                  >
                    Submit request callback
                  </button>

                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
