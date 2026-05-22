'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import gsap from 'gsap';

interface CourseOption {
  id: string;
  title: string;
  price: number;
  category: string;
}

const COURSES: CourseOption[] = [
  { id: '6th-8th-basic', title: '6th to 8th: Basic Computer', price: 1199, category: 'Middle School' },
  { id: '6th-8th-marketing', title: '6th to 8th: Website & Digital Marketing', price: 1999, category: 'Middle School' },
  { id: '9th-12th-basic', title: '9th to 12th: Basic Computer', price: 1999, category: 'High School' },
  { id: '9th-12th-marketing', title: '9th to 12th: Website & Digital Marketing', price: 2999, category: 'High School' },
  { id: 'college-basic', title: 'College: Basic Computer', price: 2499, category: 'College' },
  { id: 'college-marketing', title: 'College: Website & Digital Marketing', price: 2999, category: 'College' },
  { id: 'ai-special', title: 'AI Special: AI Videos Generation', price: 1499, category: 'Futuristic Tech' }
];

function EnrollFormContent() {
  const searchParams = useSearchParams();
  const initialCourseTitle = searchParams.get('course') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Prefill the course check state from query string on mount
  useEffect(() => {
    if (initialCourseTitle) {
      const match = COURSES.find(c => c.title.toLowerCase() === initialCourseTitle.toLowerCase());
      if (match) {
        setSelectedCourses([match.id]);
      }
    }
  }, [initialCourseTitle]);

  // GSAP animations for the page elements
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo('.gsap-enroll-title', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    )
    .fromTo('.gsap-enroll-card', 
      { y: 40, opacity: 0, scale: 0.98 }, 
      { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.1)' }, 
      '-=0.4'
    );
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCourseToggle = (courseId: string) => {
    setSelectedCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const calculateTotal = () => {
    return COURSES.filter(c => selectedCourses.includes(c.id)).reduce((sum, c) => sum + c.price, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill out all contact fields.');
      return;
    }
    if (selectedCourses.length === 0) {
      alert('Please select at least one course.');
      return;
    }

    const chosenCourses = COURSES.filter(c => selectedCourses.includes(c.id));
    const chosenTitles = chosenCourses.map(c => c.title).join(', ');
    const totalPrice = chosenCourses.reduce((sum, c) => sum + c.price, 0);

    // Save lead details locally
    const leads = JSON.parse(localStorage.getItem('royalfinity_leads') || '[]');
    leads.push({
      ...formData,
      courses: chosenTitles,
      totalFee: totalPrice,
      timestamp: new Date().toISOString(),
      source: 'Dedicated Summer Camp Enroll Page'
    });
    localStorage.setItem('royalfinity_leads', JSON.stringify(leads));

    // Redirect to WhatsApp
    const message = `Hello Royalfinity Academy,\n\nI want to enroll in the Summer Camp!\n\n👤 *Name:* ${formData.name}\n✉️ *Email:* ${formData.email}\n📞 *WhatsApp Mobile:* +91 ${formData.phone}\n🎓 *Selected Course(s):* ${chosenTitles}\n💰 *Total Fee:* ₹${totalPrice}/-\n\nPlease confirm my batch slot.`;
    
    window.open(`https://wa.me/919211816999?text=${encodeURIComponent(message)}`, '_blank');
    setSubmitted(true);

    // Clear form
    setFormData({ name: '', email: '', phone: '' });
    setSelectedCourses([]);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8">
      {submitted ? (
        <div className="gsap-enroll-card text-center p-10 rounded-[32px] bg-[#0D0D11]/90 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-400 text-2xl font-bold animate-bounce">
            ✓
          </div>
          <h2 className="text-2xl font-black uppercase text-white tracking-wide mb-3">Seat Requested!</h2>
          <p className="text-xs text-white/60 mb-8 leading-relaxed max-w-sm mx-auto font-medium">
            Thank you! Your information has been registered. We are redirecting you to WhatsApp for counselor coordination.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-extrabold uppercase tracking-widest transition-all duration-300"
          >
            Submit Another Enrollment
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="gsap-enroll-card space-y-6 p-6 sm:p-10 rounded-[32px] bg-[#0D0D11]/95 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-gradient-to-tr from-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-br from-violet-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

          <div className="border-b border-white/5 pb-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-black uppercase text-white tracking-wide">Seat Booking Portal</h2>
            <p className="text-xs text-white/50 mt-1 font-semibold">Enter your details and choose your summer curricula.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-white/60 mb-2">Student / Parent Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
                className="w-full px-4 py-3.5 bg-[#131317] border border-white/10 focus:border-amber-500 focus:outline-none rounded-xl text-xs text-white placeholder-white/20 transition-all font-semibold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-white/60 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                className="w-full px-4 py-3.5 bg-[#131317] border border-white/10 focus:border-amber-500 focus:outline-none rounded-xl text-xs text-white placeholder-white/20 transition-all font-semibold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-white/60 mb-2">WhatsApp Mobile No</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-white/30 font-bold">+91</span>
                <input
                  type="tel"
                  name="phone"
                  required
                  pattern="[0-9]{10}"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit number"
                  className="w-full pl-12 pr-4 py-3.5 bg-[#131317] border border-white/10 focus:border-amber-500 focus:outline-none rounded-xl text-xs text-white placeholder-white/20 transition-all font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-white/60 mb-2">Select Courses (Check all that apply)</label>
              <div 
                data-lenis-prevent
                className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin overscroll-contain"
              >
                {COURSES.map(course => {
                  const isChecked = selectedCourses.includes(course.id);
                  return (
                    <div
                      key={course.id}
                      onClick={() => handleCourseToggle(course.id)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-300 flex items-center justify-between group ${
                        isChecked
                          ? 'bg-amber-500/10 border-amber-500/40 shadow-sm'
                          : 'bg-[#131317]/50 border-white/5 hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // handled by div onClick
                          className="w-4 h-4 accent-amber-500 pointer-events-none rounded border-white/10"
                        />
                        <div>
                          <h4 className="text-xs font-black text-white group-hover:text-amber-400 transition-colors uppercase tracking-wide leading-tight">
                            {course.title}
                          </h4>
                          <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest mt-0.5 block">{course.category}</span>
                        </div>
                      </div>
                      <span className={`text-xs font-extrabold px-2.5 py-1 rounded-md transition-colors ${
                        isChecked ? 'bg-amber-500/25 text-amber-300' : 'bg-white/5 text-white/60'
                      }`}>
                        ₹{course.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-5 mt-6 flex justify-between items-center">
            <div>
              <span className="block text-[9px] font-black uppercase tracking-widest text-white/40">Total Program Cost</span>
              <span className="text-2xl font-black text-amber-400">₹{calculateTotal()}</span>
            </div>
            <button
              type="submit"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 text-black font-black text-xs tracking-widest uppercase shadow-lg shadow-orange-500/10 hover:shadow-orange-500/25 transition-all duration-300 transform active:scale-95"
            >
              🚀 Send on WhatsApp
            </button>
          </div>

          <p className="text-[9px] text-white/30 text-center leading-relaxed mt-4">
            Authorized counselors will message you directly to confirm slots and schedule campus walkthroughs.
          </p>
        </form>
      )}
    </div>
  );
}

export default function SummerCampEnrollPage() {
  return (
    <div className="relative w-full min-h-screen bg-[#0A0A0C] pt-28 pb-16 overflow-hidden flex flex-col justify-center">
      {/* Background Orbs */}
      <div className="absolute top-[20%] left-10 w-[500px] h-[500px] bg-glow-purple pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-[20%] right-10 w-[500px] h-[500px] bg-glow-amber pointer-events-none -z-10 animate-pulse-slow"></div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col gap-4">
        {/* Navigation Breadcrumb */}
        <nav className="mb-4 text-xs text-white/40 tracking-wider">
          <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
          <span className="mx-2.5">/</span>
          <Link href="/courses" className="hover:text-amber-400 transition-colors">Courses</Link>
          <span className="mx-2.5">/</span>
          <Link href="/courses/summer-camp" className="hover:text-amber-400 transition-colors">Summer Camp</Link>
          <span className="mx-2.5">/</span>
          <span className="text-white/60">Enrollment</span>
        </nav>

        <div className="gsap-enroll-title text-center max-w-xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-500">
            ☀️ Start Learning Tech
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight mt-2">
            Camp Registration
          </h1>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed mt-2 font-medium">
            Register below. Our system will prefill options from your selection. Select multiple programs to build an ultimate summer skill set.
          </p>
        </div>

        {/* Wrap form content in Suspense to support useSearchParams client hooks during static build optimization */}
        <Suspense fallback={
          <div className="w-full max-w-xl mx-auto text-center py-20 text-white/50 text-xs uppercase tracking-widest font-bold">
            Loading Registration Portals...
          </div>
        }>
          <EnrollFormContent />
        </Suspense>
      </div>
    </div>
  );
}
