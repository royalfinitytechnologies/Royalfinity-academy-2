'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // 1. Text slide-up animation for the main hero
        gsap.fromTo(
          '.text-reveal-hero',
          { opacity: 0, y: 50, rotateX: -15 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.15, ease: 'power4.out' }
        );

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

        // 3. Staggered reveal for contact info cards
        gsap.fromTo(
          '.contact-info-card',
          { opacity: 0, x: -40, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.contact-section',
              start: 'top 85%',
            }
          }
        );

        // 4. Form container 3D entry animation
        gsap.fromTo(
          '.form-container-card',
          { opacity: 0, x: 55, rotateY: -12, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            duration: 1,
            ease: 'back.out(1.1)',
            scrollTrigger: {
              trigger: '.contact-section',
              start: 'top 85%',
            }
          }
        );

      }, containerRef);

      return () => ctx.revert();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.course) {
      alert('Please fill out all fields.');
      return;
    }
    const leads = JSON.parse(localStorage.getItem('royalfinity_leads') || '[]');
    leads.push({ ...formData, timestamp: new Date().toISOString() });
    localStorage.setItem('royalfinity_leads', JSON.stringify(leads));

    // Send data to WhatsApp
    const message = `Hello Royalfinity Academy,\n\nI have submitted an enquiry from the Contact page.\n\n👤 *Name:* ${formData.name}\n✉️ *Email:* ${formData.email}\n📞 *WhatsApp Mobile:* +91 ${formData.phone}\n🎓 *Training Program:* ${formData.course}`;
    window.open(`https://wa.me/919211816999?text=${encodeURIComponent(message)}`, '_blank');

    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', course: '' });
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const angleX = (yc - y) / 20; // gentler tilt
    const angleY = (x - xc) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.01, 1.01, 1.01)`;
    
    const glow = card.querySelector('.ambient-glow') as HTMLDivElement;
    if (glow) {
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
      glow.style.opacity = '1';
    }
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    
    const glow = card.querySelector('.ambient-glow') as HTMLDivElement;
    if (glow) {
      glow.style.opacity = '0';
    }
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#0A0A0C] text-white overflow-x-hidden">
      
      {/* Background glow spots with parallax hooks */}
      <div className="drift-glow-1 absolute top-20 left-10 w-[500px] h-[500px] bg-glow-purple pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="drift-glow-2 absolute bottom-20 right-10 w-[500px] h-[500px] bg-glow-amber pointer-events-none -z-10 animate-pulse-slow"></div>

      <div className="relative w-full flex flex-col">
        
        {/* Banner Section */}
        <section className="w-full min-h-[50vh] flex flex-col justify-center bg-[#0A0A0C] relative py-20 lg:py-28 border-b border-white/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4">
            <span className="text-reveal-hero text-xs font-extrabold uppercase tracking-[0.2em] text-amber-500">
              ⚡ Connect With Us
            </span>
            <h1 className="text-reveal-hero text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              Get In Touch Today
            </h1>
            <div className="hidden lg:block w-16 h-1 bg-amber-500 mx-auto rounded-full"></div>
            <p className="text-reveal-hero text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl mx-auto font-medium">
              Have questions about dynamic course pathways, fee structures, scheduling, or campus amenities? Write to our technical mentors below.
            </p>
          </div>
        </section>

        {/* Two Column Layout Section */}
        <section className="contact-section w-full py-24 lg:py-32 bg-[#050507] border-t border-white/5 relative pb-36">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Column 1: Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              
              <h2 className="text-2xl font-black uppercase tracking-wide text-white mb-6 border-b border-white/5 pb-2">
                Campus Headquarters
              </h2>

              {/* Address */}
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Royalfinity+Technologies+Faridabad"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info-card p-6 rounded-3xl border border-white/5 bg-white/[0.01] flex gap-4 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300 relative overflow-hidden cursor-pointer block"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="ambient-glow absolute pointer-events-none w-32 h-32 -ml-16 -mt-16 bg-amber-500/5 rounded-full blur-xl opacity-0 transition-opacity duration-300 -z-10"></div>
                <span className="text-3xl shrink-0">📍</span>
                <div>
                  <h3 className="font-extrabold text-white text-xs uppercase tracking-wider mb-2">Campus Address</h3>
                  <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-semibold">
                    5C/15, NIT-5, Faridabad, Haryana, 121001
                  </p>
                  <p className="text-[10px] text-amber-500 font-extrabold uppercase tracking-widest mt-3">
                    10:00 AM - 7:00 PM • Monday - Saturday
                  </p>
                </div>
              </a>

              {/* Dial Links */}
              <div 
                className="contact-info-card p-6 rounded-3xl border border-white/5 bg-white/[0.01] flex gap-4 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300 relative overflow-hidden cursor-pointer"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="ambient-glow absolute pointer-events-none w-32 h-32 -ml-16 -mt-16 bg-amber-500/5 rounded-full blur-xl opacity-0 transition-opacity duration-300 -z-10"></div>
                <span className="text-3xl shrink-0">📞</span>
                <div>
                  <h3 className="font-extrabold text-white text-xs uppercase tracking-wider mb-2">Telephones</h3>
                  <a href="tel:+919211816999" className="text-xs sm:text-sm text-white/70 hover:text-amber-400 block transition-colors leading-relaxed font-semibold">
                    +91 92118 16999 (Call Admissions)
                  </a>
                  
                  <a href="https://wa.me/+919211816999" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300 transition-colors mt-3 font-bold bg-emerald-500/10 px-3.5 py-1.5 rounded-xl border border-emerald-500/20">
                    <span>💬 WhatsApp Support</span>
                  </a>
                </div>
              </div>

              {/* Email Support */}
              <div 
                className="contact-info-card p-6 rounded-3xl border border-white/5 bg-white/[0.01] flex gap-4 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-300 relative overflow-hidden cursor-pointer"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                <div className="ambient-glow absolute pointer-events-none w-32 h-32 -ml-16 -mt-16 bg-amber-500/5 rounded-full blur-xl opacity-0 transition-opacity duration-300 -z-10"></div>
                <span className="text-3xl shrink-0">✉️</span>
                <div>
                  <h3 className="font-extrabold text-white text-xs uppercase tracking-wider mb-2">Email Inquiries</h3>
                  <a href="mailto:info@royalfinityacademy.com" className="text-xs sm:text-sm text-white/70 hover:text-amber-400 block transition-colors leading-relaxed font-semibold">
                    info@royalfinityacademy.com
                  </a>
                </div>
              </div>

              {/* Visual Workspace tag */}
              <div className="contact-info-card p-6 rounded-3xl border border-white/5 bg-white/[0.01] relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl"></div>
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-2">Our Campus Experience:</h3>
                <p className="text-[11px] sm:text-xs text-white/40 leading-relaxed font-semibold">
                  We replicate modern software agencies. If you want to visit our Faridabad tech campus, request an appointment below to plan a complete guided physical walkthrough with our Principal consultants.
                </p>
              </div>

            </div>

            {/* Column 2: Large Request Call Back Form */}
            <div className="lg:col-span-7">
              <div 
                className="form-container-card p-8 sm:p-10 rounded-[32px] bg-white/[0.01] border border-white/10 shadow-2xl relative overflow-visible transition-all duration-300 hover:border-white/15"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                {/* Floating ambient glow in form card */}
                <div className="ambient-glow absolute pointer-events-none w-64 h-64 -ml-32 -mt-32 bg-amber-500/[0.03] rounded-full blur-3xl opacity-0 transition-opacity duration-300 -z-10"></div>

                <div className="absolute -top-3.5 right-6 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black text-[9px] sm:text-[10px] uppercase tracking-widest rounded-full shadow-lg z-25">
                  ONLINE ENQUIRY PORTAL
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide">Submit Enquiry Request</h2>
                  <p className="text-xs sm:text-sm text-white/50 mt-1 font-semibold">Get custom brochure materials, fee splits, and syllabus schedules.</p>
                </div>

                {submitted ? (
                  <div className="py-16 text-center">
                    <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-400 text-2xl animate-bounce">
                      ✓
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-2 uppercase tracking-wide">Consultation Request Filed!</h3>
                    <p className="text-xs sm:text-sm text-white/60 mb-8 px-4 leading-relaxed font-semibold">Thank you. An academic counselor will contact you shortly to schedule an orientation walkthrough.</p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-extrabold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 duration-300 cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-white/65 mb-2">Your Full Name</label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your name"
                          className="w-full px-4 py-3.5 bg-[#131317] border border-white/10 hover:border-white/20 focus:border-amber-500 focus:bg-[#181820] focus:outline-none rounded-2xl text-sm placeholder-white/20 transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-white/65 mb-2">Email Address</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your email"
                          className="w-full px-4 py-3.5 bg-[#131317] border border-white/10 hover:border-white/20 focus:border-amber-500 focus:bg-[#181820] focus:outline-none rounded-2xl text-sm placeholder-white/20 transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-white/65 mb-2">WhatsApp Mobile No</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/30 font-bold select-none">+91</span>
                          <input 
                            type="tel" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            pattern="[0-9]{10}"
                            placeholder="10-digit number"
                            className="w-full pl-12 pr-4 py-3.5 bg-[#131317] border border-white/10 hover:border-white/20 focus:border-amber-500 focus:bg-[#181820] focus:outline-none rounded-2xl text-sm placeholder-white/20 transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] sm:text-xs font-black uppercase tracking-wider text-white/65 mb-2">Select Training Program</label>
                        <select 
                          name="course"
                          value={formData.course}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3.5 bg-[#131317] border border-white/10 hover:border-white/20 focus:border-amber-500 focus:bg-[#181820] focus:outline-none rounded-2xl text-sm text-white transition-all duration-300 appearance-none cursor-pointer"
                          style={{
                            backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3E%3Cpath d='M7 9l3 3 3-3' stroke='%23ffffff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                            backgroundPosition: 'right 1rem center',
                            backgroundSize: '1.25rem',
                            backgroundRepeat: 'no-repeat'
                          }}
                        >
                          <option value="" disabled className="bg-[#131317] text-white/40">Choose Course</option>
                          <option value="PHP Full Stack Development" className="bg-[#131317]">PHP Full Stack Development</option>
                          <option value="MERN Stack Development" className="bg-[#131317]">MERN Stack Development</option>
                          <option value="Digital Marketing" className="bg-[#131317]">Digital Marketing</option>
                          <option value="Performance Marketing" className="bg-[#131317]">Performance Marketing</option>
                        </select>
                      </div>
                    </div>

                    <p className="text-[10px] sm:text-xs text-white/35 text-center leading-relaxed py-1 font-semibold">
                      By filing this inquiry, I permit Royalfinity Academy counselors to audit my learning goals.
                    </p>

                    <button 
                      type="submit"
                      className="w-full py-4.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black text-xs sm:text-sm tracking-widest uppercase shadow-lg shadow-amber-500/10 hover:shadow-amber-500/30 hover:scale-[1.01] active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                      Submit Query Request
                    </button>

                  </form>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* Live Location Map Section */}
        <section className="w-full bg-[#050507] border-t border-white/5 relative">
          <div className="w-full h-[350px] sm:h-[450px] lg:h-[500px] relative overflow-hidden flex items-center justify-center">
            
            {/* Floating Tag Overlay */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <div className="px-5 py-2.5 bg-[#0A0A0C]/80 backdrop-blur-md border border-white/10 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-2xl shadow-2xl flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Campus Live Location</span>
              </div>
            </div>

            {/* Google Map iFrame with Dark Mode Filters */}
            <iframe 
              src="https://www.google.com/maps?q=Royalfinity%20Technologies%20Faridabad&output=embed" 
              className="absolute inset-0 w-full h-full border-0 invert hue-rotate-180 contrast-[1.1] opacity-70" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Royalfinity Academy Location"
            ></iframe>

            {/* Elegant Inner Shadow Vignette */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(5,5,7,1)] z-10"></div>
          </div>
        </section>

      </div>
    </div>
  );
}
