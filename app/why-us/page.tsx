'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function WhyUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);

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
          '.fade-in-whyus',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
        );

        // Pillars Header Scroll Text Animation
        const pillarsHeaderTl = gsap.timeline({
          scrollTrigger: {
            trigger: pillarsRef.current,
            start: 'top 75%',
          }
        });
        
        pillarsHeaderTl.fromTo('.pillars-subheading',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
        )
        .fromTo('.pillars-heading',
          { y: 40, rotateX: -30, opacity: 0, transformOrigin: 'top center' },
          { y: 0, rotateX: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.2)' },
          '-=0.3'
        )
        .fromTo('.pillars-divider',
          { scaleX: 0, transformOrigin: 'center' },
          { scaleX: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.4'
        );

        // 3D Perspective sliding entry for cards
        gsap.fromTo(
          '.pillar-card',
          { 
            opacity: 0, 
            transform: 'perspective(1000px) rotateX(-20deg) rotateY(15deg) translateZ(-100px) translateY(60px)' 
          },
          {
            opacity: 1,
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)',
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: 'top 70%',
            },
          }
        );

        gsap.fromTo(
          '.comparison-table-fade',
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: comparisonRef.current,
              start: 'top 75%',
            },
          }
        );

      }, containerRef);

      return () => ctx.revert();
    }
  }, []);

  const comparisonRows = [
    { feature: "Free Premium Tool Access", other: "✕", royal: "✓" },
    { feature: "Office-Like Environment", other: "✕", royal: "✓" },
    { feature: "100% Hands-On Projects", other: "✕", royal: "✓" },
    { feature: "AI Tools Integration in Curriculum", other: "✕", royal: "✓" },
    { feature: "Placement Assistance", other: "Partial", royal: "✓ 96% Rate" },
    { feature: "Complimentary Refreshments", other: "✕", royal: "✓" },
    { feature: "Dedicated Mentorship", other: "✕", royal: "✓" }
  ];

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#0A0A0C] text-white overflow-hidden">
      
      {/* Background glow spots */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-glow-purple pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-glow-teal pointer-events-none -z-10 animate-pulse-slow"></div>

      <div className="relative w-full">
        
        {/* Banner Section */}
        <section className="relative z-10 w-full py-24 sm:py-32 flex flex-col justify-center bg-[#0A0A0C]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
            <span className="cursive-title font-accent text-3xl text-amber-500 mb-2 block">The Royalfinity Standard</span>
            <h1 className="fade-in-whyus text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6">
              We Didn&rsquo;t Just Build Courses.
            </h1>
            <p className="fade-in-whyus text-base sm:text-lg text-white/70 leading-relaxed">
              We engineered an entirely different environment, integrated professional paid tools, and built a practical company-like culture that converts students into hired tech professionals.
            </p>
          </div>
        </section>

        {/* Pillars of Excellence Section (White Background with Organic Dividers) */}
        <section ref={pillarsRef} className="relative z-20 w-full pt-28 pb-32 lg:pt-36 lg:pb-40 bg-white text-slate-900 overflow-x-hidden">
          
          {/* Wavy top divider (Transition from dark banner to white bg) */}
          <div className="absolute -top-[2px] left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
            <svg className="relative block w-[calc(100%+1.3px)] h-[60px] lg:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#0A0A0C"></path>
            </svg>
          </div>

          {/* Organic bottom divider (Transition from white bg to dark comparison section) */}
          <div className="absolute -bottom-[2px] left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none">
            <svg className="relative block w-[calc(100%+1.3px)] h-[60px] lg:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="#0A0A0C"></path>
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
            <div className="text-center mb-16">
              <span className="pillars-subheading text-amber-600 font-extrabold text-xs uppercase tracking-widest block mb-2 opacity-0">Our Framework</span>
              <h2 className="pillars-heading text-3xl sm:text-5xl font-black uppercase text-slate-900 tracking-wide opacity-0">
                Four Pillars Of Excellence
              </h2>
              <div className="pillars-divider hidden lg:block w-16 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Free Access to All Premium Tools',
                  desc: 'Every single student receives fully paid, production-grade access to premium tools used by elite teams globally (Canva Pro, Meta Business Suites, direct hosting servers, Laravel analytics). No extra cost, no trial limitations.',
                  icon: '🛠️'
                },
                {
                  title: 'Real Simulated Tech Office Workspace',
                  desc: 'Learn inside a high-performing dev-shop layout complete with ergonomic workspace chairs, high speed enterprise gigabit fiber, and a culture that drives focus, comfort, and productivity. Ambition is the only dress code.',
                  icon: '🏢'
                },
                {
                  title: '100% Practical Project Curriculums',
                  desc: 'We enforce zero passive theoretical slide lectures. Every single module requires tangible, portfolio-ready deliverables. You build client simulations and deploy live systems that prove your capabilities to any hiring partner.',
                  icon: '💻'
                },
                {
                  title: 'Professional Career Support & Referrals',
                  desc: 'Our 96% placement rate is driven by robust, direct industry referrals. We handle direct resume auditing, mock technical interviews, LinkedIn conversion audits, and maintain direct pipelines with recruitment heads.',
                  icon: '📈'
                }
              ].map((pillar, index) => (
                <div 
                  key={index}
                  className="pillar-card p-8 rounded-3xl border border-slate-100 bg-white hover:border-amber-500/20 transition-all duration-300 relative overflow-hidden flex gap-6 group cursor-pointer shadow-[0_15px_30px_-5px_rgba(0,0,0,0.05)]"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <div className="ambient-glow absolute pointer-events-none w-48 h-48 -ml-24 -mt-24 bg-amber-500/10 rounded-full blur-xl opacity-0 transition-opacity duration-300"></div>

                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 text-3xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-sm text-amber-500">
                    {pillar.icon}
                  </div>

                  <div>
                    <h3 className="text-xl font-black uppercase text-slate-800 tracking-wide mb-2 group-hover:text-amber-600 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section (Royalfinity vs Others) */}
        <section ref={comparisonRef} className="relative z-30 w-full py-24 sm:py-32 bg-[#0A0A0C]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="text-center mb-16">
              <span className="cursive-title font-accent text-3xl text-amber-500 mb-2 block">Side By Side Comparison</span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-wide">
                Royalfinity vs Other Institutes
              </h2>
              <div className="hidden lg:block w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
              <p className="text-white/50 text-sm mt-4 max-w-md mx-auto">
                Our framework represents an entirely modern paradigm shift in technical education.
              </p>
            </div>

            {/* Premium Glassmorphic Table */}
            <div className="comparison-table-fade rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black/60 backdrop-blur-md">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  
                  {/* Table Header */}
                  <thead>
                    <tr className="border-b border-white/15 bg-white/[0.02]">
                      <th className="p-6 text-sm font-black uppercase tracking-widest text-white/70 border-r border-white/15">Feature</th>
                      <th className="p-6 text-sm font-black uppercase tracking-widest text-white/45 text-center border-r border-white/15">Other Institutes</th>
                      <th className="p-6 text-sm font-black uppercase tracking-widest text-amber-400 bg-amber-500/5 text-center">Royalfinity Academy</th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y divide-white/12">
                    {comparisonRows.map((row, index) => (
                      <tr key={index} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-6 text-xs sm:text-sm font-semibold text-white/90 leading-relaxed border-r border-white/12">
                          {row.feature}
                        </td>
                        <td className="p-6 text-xs sm:text-sm text-center text-white/40 leading-relaxed border-r border-white/12">
                          {row.other === '✕' ? (
                            <span className="text-white/20 text-base font-bold">✕</span>
                          ) : (
                            <span className="text-white/40 font-semibold uppercase tracking-wider text-xs">Partial</span>
                          )}
                        </td>
                        <td className="p-6 text-xs sm:text-sm text-center bg-amber-500/[0.02] leading-relaxed">
                          {row.royal === '✓' ? (
                            <span className="text-amber-500 text-lg font-bold">✓</span>
                          ) : (
                            <div className="flex items-center justify-center gap-1.5 text-amber-500 font-extrabold">
                              <span className="text-lg">✓</span>
                              <span className="text-amber-400">96% Rate</span>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="relative z-40 bg-[#0A0A0C] text-center py-20 border-t border-white/5 mt-16">
          <h3 className="text-2xl sm:text-3xl font-black uppercase mb-4 text-white">
            Experience the Royalfinity Difference Today
          </h3>
          <p className="text-xs text-white/50 mb-8 max-w-sm mx-auto">
            Batch 2025 schedules are currently active. Apply now to secure your workstation inside our development campus.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 max-w-sm mx-auto">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-extrabold text-sm uppercase tracking-widest shadow-md text-center"
            >
              Enroll Now
            </Link>
            <Link 
              href="/courses" 
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm uppercase tracking-widest text-center"
            >
              View Programs
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
