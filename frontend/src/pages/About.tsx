import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Twitter, MapPin, Heart, Star, Sparkles, MessageSquare } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-24">
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-black uppercase tracking-widest mb-8 border border-indigo-100 shadow-sm"
          >
            <Sparkles size={16} className="animate-pulse" />
            Our Story & Mission
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[0.9] mb-8"
          >
            A bridge between <br />
            <span className="text-indigo-600 italic underline decoration-indigo-100/50">Tech & Empathy</span>.
          </motion.h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed mb-10">
            Founded in 2026, The Pulse was born from a simple belief: that everyone deserves 
            access to mental health support without barriers, costs, or judgment.
          </p>
          
          <div className="grid grid-cols-2 gap-8 py-8 border-y border-slate-100">
            <div>
              <p className="text-4xl font-black text-slate-900">2026</p>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Established</p>
            </div>
            <div>
              <p className="text-4xl font-black text-slate-900">10k+</p>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Lives Impacted</p>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-indigo-100 rounded-[3rem] -rotate-3 scale-105 group-hover:rotate-0 transition-transform duration-500" />
          <div className="relative bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100">
            <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">Our Core Values</h2>
            <div className="space-y-8">
              {[
                { icon: <Heart size={20} className="text-rose-500" />, title: "Radical Empathy", desc: "We build tools that listen and care, prioritizing human-centric design." },
                { icon: <ShieldCheck size={20} className="text-emerald-500" />, title: "Privacy First", desc: "Your data is yours alone. We never sell or share your personal information." },
                { icon: <Zap size={20} className="text-amber-500" />, title: "Open Access", desc: "Providing free mental health support to everyone, everywhere." },
              ].map((value, i) => (
                <div key={i} className="flex gap-4">
                  <div className="bg-slate-50 p-2 rounded-lg">{value.icon}</div>
                  <div>
                    <h4 className="text-lg font-black text-slate-800 mb-1">{value.title}</h4>
                    <p className="text-slate-500 font-medium leading-relaxed">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ratings Section */}
      <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white mb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-5xl font-black mb-8 tracking-tight">User Ratings & Trust</h2>
          <div className="flex justify-center gap-1 mb-8">
            {[1,2,3,4,5].map(s => <Star key={s} size={32} className="fill-amber-400 text-amber-400" />)}
          </div>
          <p className="text-3xl font-black mb-12 italic">"The Pulse is the friend I never knew I needed. It's safe, private, and incredibly helpful."</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-white/10">
            <div>
              <p className="text-4xl font-black">4.9/5</p>
              <p className="text-xs font-black text-indigo-200 uppercase tracking-widest mt-1">App Store Rating</p>
            </div>
            <div>
              <p className="text-4xl font-black">98%</p>
              <p className="text-xs font-black text-indigo-200 uppercase tracking-widest mt-1">Support Satisfaction</p>
            </div>
            <div>
              <p className="text-4xl font-black">100%</p>
              <p className="text-xs font-black text-indigo-200 uppercase tracking-widest mt-1">Anonymity Guaranteed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Get in Touch</h2>
          <p className="text-lg text-slate-500 font-medium mb-10 leading-relaxed">
            Have questions or want to collaborate? We'd love to hear from you. 
            Reach out to our support team anytime.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-slate-600 font-bold group">
              <div className="bg-indigo-50 p-3 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Mail size={20} />
              </div>
              support@thepulse.ai
            </div>
            <div className="flex items-center gap-4 text-slate-600 font-bold group">
              <div className="bg-indigo-50 p-3 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <MapPin size={20} />
              </div>
              New Delhi, India
            </div>
          </div>
        </div>
        
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <input type="text" placeholder="Name" className="w-full px-6 py-4 bg-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold" />
              <input type="email" placeholder="Email" className="w-full px-6 py-4 bg-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold" />
            </div>
            <textarea placeholder="Your Message" rows={4} className="w-full px-6 py-4 bg-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold" />
            <button className="w-full py-5 bg-slate-900 text-white text-lg font-black rounded-2xl shadow-xl hover:bg-slate-800 active:scale-95 transition-all">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Import ShieldCheck to avoid error
import { ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default About;
