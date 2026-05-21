'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const campusRef = useRef<HTMLDivElement>(null);
  const cultureRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  // Canvas Sequence Refs
  const sequenceRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  // FAQ Expandable State
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  // Track flipped card states on touch devices
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleCardFlip = (idx: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

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
      ScrollTrigger.config({ ignoreMobileResize: true });

      // --- 3D CANVAS SEQUENCE ENGINE ---
      const frameCount = 19;
      const images: HTMLImageElement[] = [];
      let imagesLoaded = 0;
      const sequenceObj = { frame: 0 };

      const renderCanvas = () => {
        if (!canvasRef.current || imagesLoaded < frameCount) return;
        const context = canvasRef.current.getContext('2d');
        if (!context) return;
        const img = images[Math.round(sequenceObj.frame)];
        if (!img) return;

        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        const canvasRatio = canvasRef.current.width / canvasRef.current.height;
        const imgRatio = img.width / img.height;
        let drawWidth = canvasRef.current.width;
        let drawHeight = canvasRef.current.height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
          drawHeight = drawWidth / imgRatio;
          offsetY = (canvasRef.current.height - drawHeight) / 2;
        } else {
          drawWidth = drawHeight * imgRatio;
          offsetX = (canvasRef.current.width - drawWidth) / 2;
        }

        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      };

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        const handleLoad = () => {
          imagesLoaded++;
          if (imagesLoaded === frameCount) {
             renderCanvas();
             ScrollTrigger.refresh(); // Refresh pin math once images are loaded
          }
        };
        img.onload = handleLoad;
        img.onerror = handleLoad;
        img.src = `/assets/aboutbg/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`;
        images.push(img);
      }

      const resizeCanvas = () => {
        if (canvasRef.current) {
          canvasRef.current.width = window.innerWidth;
          canvasRef.current.height = window.innerHeight;
          renderCanvas();
        }
      };
      
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas(); 

      const ctx = gsap.context(() => {
        // Main Canvas Sequence Timeline (Runs on all viewports)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sequenceRef.current,
            start: "top top",
            end: "+=1800", 
            scrub: 1.2,
            pin: true,
            anticipatePin: 1
          }
        });

        // Scrub through 19 frames
        tl.to(sequenceObj, {
          frame: frameCount - 1,
          snap: "frame",
          ease: "none",
          duration: 3, 
          onUpdate: renderCanvas,
        });

        // Reveal Text Block at the end of frames
        tl.fromTo(
          textContentRef.current,
          { autoAlpha: 0, y: 40, scale: 0.95, rotateX: -10 },
          { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: 1.5, ease: 'power3.out' }
        );
        
        // Add breathing room before unpin
        tl.to({}, { duration: 0.5 });

        // 2. Parallax background drifting glows
        gsap.to('.drift-glow-1', {
          y: '80px',
          x: '-40px',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
          }
        });
        gsap.to('.drift-glow-2', {
          y: '-100px',
          x: '60px',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
          }
        });

        // 3. Staggered reveal for Values Cards with 3D entry
        gsap.fromTo(
          '.value-card',
          { opacity: 0, rotateY: 15, y: 40, scale: 0.95 },
          {
            opacity: 1,
            rotateY: 0,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: valuesRef.current,
              start: 'top 85%',
            },
          }
        );

        // 4. Staggered 3D tilt reveal for Team Cards
        gsap.fromTo(
          '.team-card',
          { opacity: 0, rotateX: 12, y: 50, scale: 0.95 },
          {
            opacity: 1,
            rotateX: 0,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.18,
            ease: 'back.out(1.15)',
            scrollTrigger: {
              trigger: teamRef.current,
              start: 'top 85%',
            },
          }
        );

        // 5. Staggered reveal for Campus Cards
        gsap.fromTo(
          '.campus-card',
          { opacity: 0, y: 40, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: campusRef.current,
              start: 'top 85%',
            },
          }
        );

        // 6. Slide-in from left for Culture Cards
        gsap.fromTo(
          '.culture-card',
          { opacity: 0, x: -45, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cultureRef.current,
              start: 'top 85%',
            },
          }
        );

        // 7. General Section header animations
        gsap.utils.toArray<HTMLElement>('.section-header-reveal').forEach((header) => {
          gsap.fromTo(
            header,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: header,
                start: 'top 90%',
              }
            }
          );
        });

      }, containerRef);

      return () => {
        window.removeEventListener('resize', resizeCanvas);
        ctx.revert();
      };
    }
  }, []);

  const values = [
    { title: "Practicality Over Theory", desc: "Every lesson has a real-world deliverable. If you cannot use it in a job tomorrow, we question why it is in the curriculum." },
    { title: "Tools Without Barriers", desc: "Professional paid tools should not be a privilege. Every student gets full access to premium software from day one — no compromises, no trials." },
    { title: "Environment as Education", desc: "Where you learn shapes how you perform. Our simulated modern tech office environment trains you to behave professionally from day one." },
    { title: "Honest Mentorship", desc: "We do not tell you what you want to hear. Our experienced tech mentors provide direct, agency-calibrated audits because that is what actually grows careers." },
    { title: "Outcomes Over Enrollment", desc: "Our ultimate metric is not registration. It is how many graduates land great tech jobs, launch products, and build careers they are proud of." }
  ];

  const campusAmenities = [
    {
      title: 'Ergonomic Workstation Setup',
      desc: 'Work on comfortable dedicated tech desks equipped with high-back posture support chairs, multiple charging arrays, and dual-display capabilities to simulate modern coding setups.',
      icon: '🏢',
      bgImg: '/images/campus_workstation.png'
    },
    {
      title: 'Collaborative Boardroom',
      desc: 'Conduct team standups, audit conversion metrics on displays, hold code reviews, and brainstorm mock landing page models exactly like professional developers do in modern agencies.',
      icon: '👥',
      bgImg: '/images/campus_boardroom.png'
    },
    {
      title: 'Unlimited Complimentary Cafe',
      desc: 'Your ultimate cognitive asset is deep focus. Enjoy complimentary access to our fully stocked caffeine bar, featuring premium espresso roasts, green teas, and healthy study snacks.',
      icon: '☕',
      bgImg: '/images/campus_cafe.png'
    }
  ];

  const cultureItems = [
    {
      title: 'Slack Dev Workspace Inclusions',
      desc: 'Coordinate with fellow learners, exchange resources, flag code bugs, and schedule review panels under mentors on direct Slack channels.',
      badge: '💬 24/7 Connect'
    },
    {
      title: 'Weekly Standups & Agile Reviews',
      desc: 'Participate in short daily/weekly briefings where you pitch your sprint goals, flag blockers, and track timeline deliverables.',
      badge: '⏱️ Agile Flow'
    },
    {
      title: 'Production-Grade Client Simulations',
      desc: 'Work on direct client specifications, handle live server permissions, deploy database indexes, and direct meta agency budgets.',
      badge: '💼 Agency Budgets'
    }
  ];

  const faqs = [
    {
      q: "Are the paid tool licenses truly provided for free?",
      a: "Yes. Every single program includes fully paid, enterprise-tier licenses for Canva Pro, SEO suites, cloud hosting instances, and active ad budget credits. There are absolutely no hidden surcharges or premium license upgrade demands."
    },
    {
      q: "How does the career placement referral process work?",
      a: "Our academy maintains direct pipelines with tech companies, product startups, and advertising agencies. We provide personalized resume audits, mock interviews, LinkedIn profiles calibration, and guarantee 6+ direct recruitment referral slots per graduate."
    },
    {
      q: "Can I take a physical guided tour of the campus?",
      a: "Absolutely. We encourage ambitious learners to visit us in person. Select the 'Contact' page, fill out your consultation call back details, and we will schedule an admissions counselor to walk you through our workstations and complimentary cafe lounge."
    },
    {
      q: "Are there any strict educational qualification prerequisites?",
      a: "None. We welcome students, graduates, and professionals changing pathways. The only prerequisite is a strong drive to learn, high curiosity, and a dedication to practical, project-based delivery."
    }
  ];

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#0A0A0C] text-white">
      
      {/* Background glow spots with parallax hooks */}
      <div className="drift-glow-1 absolute top-20 right-10 w-[500px] h-[500px] bg-glow-purple pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="drift-glow-2 absolute bottom-40 left-10 w-[500px] h-[500px] bg-glow-amber pointer-events-none -z-10 animate-pulse-slow"></div>

      <div className="relative w-full">
        
        {/* 3D Sequence Canvas Section */}
        <section ref={sequenceRef} className="w-full h-screen bg-[#0A0A0C] relative flex flex-col items-center justify-center overflow-hidden border-b border-white/5">
          
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-85 block"></canvas>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C] via-transparent to-[#0A0A0C] z-0 pointer-events-none"></div>

          <div ref={textContentRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-5 opacity-0 invisible">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-500 shadow-sm">
              ⚡ Our Foundation Belief
            </span>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-tight drop-shadow-2xl">
              We Didn&rsquo;t Build A Classroom.
            </h1>
            <div className="hidden lg:block w-16 h-1 bg-amber-500 mx-auto rounded-full mt-1 mb-1 shadow-[0_0_15px_rgba(245,158,11,0.5)]"></div>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl mx-auto font-bold drop-shadow-xl bg-black/20 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
              Royalfinity Academy was built on a singular realization — that real-world hands-on skills, paid professional tools, and an office environment can change the trajectory of any professional career.
            </p>
          </div>

        </section>
 
        {/* Story Section (Born from a Gap) */}
        <section className="w-full py-24 lg:py-32 bg-[#0A0A0C] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 flex flex-col gap-6 section-header-reveal">
              <span className="text-amber-500 font-extrabold text-xs uppercase tracking-widest block">Our Origins</span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-white leading-tight">
                Born from a Gap.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-400">Built with Purpose.</span>
              </h2>
              <div className="hidden lg:block w-16 h-1 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"></div>
              <p className="text-sm sm:text-base text-white/50 leading-relaxed font-medium">
                Royalfinity was born when our founders noticed a painful truth: students were graduating from standard institutes and training classes without ever touching the tools that professionals actually use in their daily agency campaigns.
              </p>
              <p className="text-sm sm:text-base text-white/50 leading-relaxed font-medium">
                The gap between traditional theoretical education and true corporate employability was massive. So we closed it. We replication a tech company work culture inside our academy to give you real agency experience starting day one.
              </p>
            </div>

            <div className="lg:col-span-6 section-header-reveal">
              <div className="p-8 sm:p-10 rounded-3xl border border-white/5 bg-white/[0.01] glass-panel shadow-2xl relative overflow-hidden group hover:border-amber-500/10 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
                <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-white mb-6 border-b border-white/5 pb-2">The Real Problem We Solve:</h3>
                
                <ul className="space-y-6 text-xs sm:text-sm font-medium">
                  <li className="flex gap-4 items-start">
                    <span className="text-rose-500 text-base shrink-0">✕</span>
                    <span className="text-white/60"><strong>The Old Way</strong>: Memorizing theoretical textbook slides, using free trials, and studying in cramped classroom desks.</span>
                  </li>
                  <li className="flex gap-4 items-start border-t border-white/5 pt-6">
                    <span className="text-emerald-400 text-base shrink-0">✓</span>
                    <span className="text-white/60"><strong>The Royalfinity Way</strong>: Operating active technology accounts, writing production-grade code on agency-level setups, and utilizing complimentary beverage bars inside a simulated tech office.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* Campus Workspace & Amenities Gallery */}
        <section ref={campusRef} className="w-full py-24 lg:py-32 bg-[#050507] border-t border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-16 flex flex-col gap-4 section-header-reveal">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-500">
                Tour Our Workspace
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-wide">
                Campus Facilities & Amenities
              </h2>
              <div className="hidden lg:block w-20 h-1 bg-amber-500 mx-auto rounded-full"></div>
              <p className="text-white/50 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed font-semibold">
                We operate inside a professional office environment meticulously configured for high performance, focus, and productivity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {campusAmenities.map((amenity, idx) => (
                <div 
                  key={idx}
                  className="campus-card flip-card-container group relative block aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full cursor-pointer"
                >
                  <div 
                    className={`flip-card-inner ${
                      flippedCards[idx] ? 'is-flipped' : ''
                    }`}
                    onClick={() => toggleCardFlip(idx)}
                  >
                    
                    {/* Front Face (Image + Icon) */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl border border-white/10 overflow-hidden bg-[#0A0A0E] shadow-xl">
                      <div 
                        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                        style={{ backgroundImage: `url(${amenity.bgImg})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/80 to-transparent z-10" />
                      
                      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-8">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-2xl flex items-center justify-center shrink-0 mb-4 backdrop-blur-md text-amber-400 shadow-inner group-hover:scale-110 transition-transform">
                          {amenity.icon}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-wide leading-tight">
                          {amenity.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-[10px] text-amber-500 font-extrabold uppercase tracking-widest mt-4">
                          <span className="hidden lg:inline">Hover to Read</span>
                          <span className="inline lg:hidden">Tap to Read</span>
                          <span className="transition-transform group-hover:translate-x-1">➔</span>
                        </div>
                      </div>
                    </div>

                    {/* Back Face (Dark Card with Description) */}
                    <div className="absolute inset-0 w-full h-full backface-hidden [transform:rotateY(180deg)] rounded-3xl border border-white/10 bg-[#0E0E12] p-6 sm:p-8 flex flex-col justify-center text-center shadow-2xl">
                      <div className="w-12 h-12 rounded-full bg-amber-500/10 mx-auto text-2xl flex items-center justify-center mb-4">
                         {amenity.icon}
                      </div>
                      <h4 className="text-lg font-black uppercase text-white tracking-wide mb-3">
                        {amenity.title}
                      </h4>
                      <div className="hidden lg:block w-8 h-1 bg-amber-500 rounded-full mx-auto mb-5"></div>
                      <p className="text-[12px] sm:text-sm text-gray-400 leading-relaxed font-medium">
                        {amenity.desc}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Mission & Vision (Light theme transition block with organic wavy dividers) */}
        <section className="relative z-40 w-full bg-white text-black py-32 lg:py-44 overflow-hidden">
          {/* Top Wavy Divider from Campus section (#050507) to White */}
          <div className="absolute -top-[2px] left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
            <svg className="relative block w-[calc(100%+1.3px)] h-[60px] lg:h-[110px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,42.4V0Z" fill="#050507"></path>
            </svg>
          </div>

          {/* Bottom Wavy Divider from White to Culture section (#0A0A0C) */}
          <div className="absolute -bottom-[2px] left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
            <svg className="relative block w-[calc(100%+1.3px)] h-[60px] lg:h-[110px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,42.4V0Z" fill="#0A0A0C" transform="rotate(180 600 60)"></path>
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-4 lg:my-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              
              <div className="flex flex-col gap-4 section-header-reveal">
                <span className="text-amber-600 font-extrabold text-xs uppercase tracking-widest block">Our Daily Mission</span>
                <h3 className="text-2xl sm:text-4xl font-black uppercase text-slate-900 tracking-wider">To Make Real Skills Accessible</h3>
                <div className="hidden lg:block w-12 h-1 bg-amber-500 rounded-full"></div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-semibold">
                  Our daily mission is to give every single student — regardless of background — access to the paid tools, productive office environment, and technical mentorship that standard practitioners take years to discover. We compress the learning curve so you step into your first career role ready, not raw.
                </p>
              </div>

              <div className="flex flex-col gap-4 border-t md:border-t-0 md:border-l border-slate-200 pt-8 md:pt-0 md:pl-12 lg:pl-16 section-header-reveal">
                <span className="text-amber-600 font-extrabold text-xs uppercase tracking-widest block">Our Vision</span>
                <h3 className="text-2xl sm:text-4xl font-black uppercase text-slate-900 tracking-wider">India&rsquo;s Most Practical Academy</h3>
                <div className="hidden lg:block w-12 h-1 bg-amber-500 rounded-full"></div>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-semibold">
                  We envision a future where no student has to learn on outdated theoretical interfaces or inside uninspiring classrooms. By 2027, our vision is to train 5,000+ graduates across multiple smart campuses — each one operated as a high-performing professional environment, not just a room with chairs.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Student Life & Technical Work Culture */}
        <section ref={cultureRef} className="w-full py-24 lg:py-32 bg-[#0A0A0C] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              <div className="lg:col-span-5 flex flex-col gap-5 section-header-reveal">
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-500">
                  Daily Workflows
                </span>
                <h2 className="text-3xl sm:text-5xl font-black uppercase text-white leading-tight tracking-wide">
                  Active Tech Agency Culture
                </h2>
                <div className="hidden lg:block w-16 h-1 bg-amber-500 rounded-full"></div>
                <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-medium">
                  Our learning model is built around accountability, collaboration, and high deliverables. You do not sit silently listening to a lecturer read templates. You actively code, deploy, review, and analyze alongside agency professionals.
                </p>
                <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-medium">
                  By experiencing the daily workflows of modern technical squads, you overcome intermediate hurdles, master team coordination, and build robust professional confidence.
                </p>
              </div>

              <div className="lg:col-span-7 space-y-4">
                {cultureItems.map((item, idx) => (
                  <div 
                    key={idx}
                    className="culture-card p-6 sm:p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-white/10 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  >
                    <div className="max-w-md">
                      <h4 className="font-extrabold text-white text-base tracking-wider uppercase mb-2 transition-colors duration-300 group-hover:text-amber-400">
                        {item.title}
                      </h4>
                      <p className="text-xs text-white/45 leading-relaxed font-semibold">
                        {item.desc}
                      </p>
                    </div>
                    <span className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 font-extrabold text-[10px] uppercase tracking-widest rounded-xl h-max w-max shrink-0 shadow-sm">
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* Founders / Team Section */}
        <section ref={teamRef} className="w-full py-24 lg:py-32 bg-[#050507] border-t border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-16 flex flex-col gap-4 section-header-reveal">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-500">
                Our Leadership
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-wide">
                Practitioners First, Mentors Second
              </h2>
              <div className="hidden lg:block w-20 h-1 bg-amber-500 mx-auto rounded-full"></div>
              <p className="text-white/50 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed font-semibold">
                Our founders run active marketing agencies and development firms. You learn exactly what works in the tech industry today.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  name: 'Bhumika Gandhi',
                  role: 'Founder & Digital Marketing Principal',
                  desc: '6+ years of active agency operations in Digital Marketing, Media Buying, and Conversion Rate Optimization. Built Royalfinity to give graduates what they wished they had at the start of their campaigns.',
                  icon: '📢',
                  glow: 'rgba(245, 158, 11, 0.08)',
                  glowBorder: 'hover:border-amber-500/30'
                },
                {
                  name: 'Lavish Sachdeva',
                  role: 'Co-Founder & Web Development Principal',
                  desc: '4+ years of active web engineering, database architecture, and technical consultation. Structured the hands-on PHP Laravel and MERN Stack syllabi to ensure true enterprise readiness.',
                  icon: '💻',
                  glow: 'rgba(6, 182, 212, 0.08)',
                  glowBorder: 'hover:border-cyan-500/30'
                }
              ].map((mentor, index) => (
                <div 
                  key={index}
                  className={`team-card p-8 rounded-3xl border border-white/5 bg-white/[0.01] flex flex-col items-center text-center transition-all duration-500 relative overflow-hidden group cursor-pointer ${mentor.glowBorder}`}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  style={{
                    boxShadow: `0 15px 35px -10px ${mentor.glow}`
                  }}
                >
                  <div className="ambient-glow absolute pointer-events-none w-48 h-48 -ml-24 -mt-24 bg-white/5 rounded-full blur-xl opacity-0 transition-opacity duration-300 -z-10"></div>

                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    {mentor.icon}
                  </div>

                  <h3 className="text-2xl font-extrabold uppercase text-white tracking-wide mb-1 group-hover:text-amber-400 transition-colors duration-300">
                    {mentor.name}
                  </h3>
                  <span className="text-xs text-amber-500 font-extrabold uppercase tracking-wider mb-4 block">
                    {mentor.role}
                  </span>

                  <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-semibold">
                    {mentor.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Five Values */}
        <section ref={valuesRef} className="w-full py-24 lg:py-32 bg-[#0A0A0C] border-t border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-16 flex flex-col gap-4 section-header-reveal">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-500">
                Our Core Values
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-wide">
                Five Values That Define Us
              </h2>
              <div className="hidden lg:block w-20 h-1 bg-amber-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((value, idx) => (
                <div 
                  key={idx}
                  className="value-card p-6 sm:p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-white/10 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-52 group cursor-pointer"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <div className="ambient-glow absolute pointer-events-none w-32 h-32 -ml-16 -mt-16 bg-amber-500/5 rounded-full blur-xl opacity-0 transition-opacity duration-300 -z-10"></div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white/15 font-black text-3xl group-hover:text-amber-500/25 transition-colors duration-300">
                      0{idx + 1}
                    </span>
                    <span className="text-amber-500 font-extrabold text-lg">✦</span>
                  </div>

                  <div>
                    <h4 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wider mb-2 group-hover:text-amber-400 transition-colors duration-300">
                      {value.title}
                    </h4>
                    <p className="text-[12px] sm:text-xs text-white/40 leading-relaxed font-semibold">
                      {value.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Expandable Academy FAQs */}
        <section ref={faqRef} className="w-full py-24 lg:py-32 bg-[#050507] border-t border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-16 flex flex-col gap-4 section-header-reveal">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-500">
                Curious About Royalfinity?
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-wide">
                Frequently Asked Questions
              </h2>
              <div className="hidden lg:block w-20 h-1 bg-amber-500 mx-auto rounded-full"></div>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaqIndex === idx;
                return (
                  <div 
                    key={idx}
                    className="rounded-3xl border border-white/5 bg-white/[0.01] overflow-hidden transition-all duration-300 hover:border-white/10"
                  >
                    <button 
                      onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between focus:outline-none cursor-pointer group"
                    >
                      <span className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider pr-4 transition-colors duration-300 group-hover:text-amber-400">
                        {faq.q}
                      </span>
                      <span className={`text-amber-500 text-lg font-black transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                        ＋
                      </span>
                    </button>
                    
                    {isOpen && (
                      <div className="px-6 pb-6 text-xs sm:text-sm text-white/50 leading-relaxed border-t border-white/5 pt-4 animate-fadeIn font-semibold">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* Call to Action Section */}
        <section className="w-full py-28 bg-[#0A0A0C] border-t border-white/5 relative text-center flex flex-col items-center justify-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6 section-header-reveal items-center">
            
            <h3 className="text-3xl sm:text-5xl font-black uppercase mb-2 text-white tracking-tight leading-tight">
              You&rsquo;ve Read Our Story.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-400">Now Start Yours.</span>
            </h3>
            
            <p className="text-xs sm:text-sm text-white/50 mb-4 max-w-md mx-auto leading-relaxed font-semibold">
              Join hundreds of ambitious students who walked into Royalfinity Academy with dreams and walked out with robust professional portfolios.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/contact" 
                className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-extrabold text-xs uppercase tracking-widest shadow-lg shadow-amber-500/10 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Enroll Now
              </Link>
              <Link 
                href="/courses" 
                className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Explore Courses
              </Link>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
