import React from 'react';
import { motion } from 'framer-motion';
import { Info, Brain, Heart, Zap, ShieldCheck, Activity, Star, MessageSquare } from 'lucide-react';

const Awareness: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 text-rose-600 text-sm font-black uppercase tracking-widest mb-8 border border-rose-100 shadow-sm"
        >
          <Heart size={16} className="animate-pulse" />
          Mental Health Matters
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[0.9] mb-8"
        >
          Why Mental Health is <br />
          <span className="text-rose-600 italic">Universal</span>.
        </motion.h1>
        <p className="max-w-2xl mx-auto text-xl text-slate-500 font-medium mb-12 leading-relaxed">
          Understanding your emotions isn't just a personal choice—it's a fundamental part of your health. 
          Discover how awareness can change your life.
        </p>
      </div>

      {/* Why it Matters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
          <div className="relative z-10">
            <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-indigo-200">
              <Brain size={32} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Emotional Resilience</h2>
            <p className="text-slate-500 font-medium leading-relaxed text-lg">
              Mental health affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices. 
              Strong mental health builds the resilience needed to bounce back from life's challenges.
            </p>
          </div>
        </div>

        <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
          <div className="relative z-10">
            <div className="bg-rose-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-rose-200">
              <Heart size={32} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Physical Connection</h2>
            <p className="text-slate-500 font-medium leading-relaxed text-lg">
              Mental health is deeply connected to physical health. Chronic mental conditions can increase the risk for physical health problems 
              like stroke, type 2 diabetes, and heart disease. Taking care of your mind is taking care of your body.
            </p>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white mb-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-50" />
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-black mb-8 tracking-tight">How <span className="text-indigo-400 italic underline decoration-indigo-400/30">The Pulse</span> Works.</h2>
            <div className="space-y-10">
              {[
                { step: "01", title: "Open Conversation", desc: "Start a private, encrypted chat session with our empathetic AI." },
                { step: "02", title: "Real-time Analysis", desc: "Our AI analyzes your emotions and provides thoughtful, personalized responses." },
                { step: "03", title: "Pattern Discovery", desc: "Visualize your mood trends over time on your private dashboard." },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <span className="text-3xl font-black text-indigo-400 opacity-50 group-hover:opacity-100 transition-opacity">{item.step}</span>
                  <div>
                    <h3 className="text-2xl font-black mb-2">{item.title}</h3>
                    <p className="text-indigo-100/60 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-[2.5rem] shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-indigo-500 p-2 rounded-lg">
                <ShieldCheck size={24} />
              </div>
              <h4 className="text-xl font-black tracking-tight">Always Private. Always Free.</h4>
            </div>
            <div className="space-y-6">
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '85%' }}
                  className="h-full bg-indigo-500" 
                />
              </div>
              <p className="text-sm font-bold text-indigo-100/40 uppercase tracking-widest">User Trust Score</p>
              
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                <div>
                  <p className="text-3xl font-black">4.9/5</p>
                  <p className="text-xs font-bold text-indigo-100/40 uppercase tracking-widest mt-1">Satisfaction</p>
                </div>
                <div>
                  <p className="text-3xl font-black">100%</p>
                  <p className="text-xs font-bold text-indigo-100/40 uppercase tracking-widest mt-1">Confidential</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-indigo-50 p-16 rounded-[3rem] border border-indigo-100">
        <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Ready to prioritize your mind?</h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <Link 
            to="/chat" 
            className="px-10 py-5 bg-indigo-600 text-white text-lg font-black rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center gap-3 active:scale-95"
          >
            Start Your First Session <MessageSquare size={22} />
          </Link>
          <Link 
            to="/register" 
            className="px-10 py-5 bg-white text-slate-900 text-lg font-black rounded-2xl border-2 border-slate-100 hover:border-indigo-100 transition-all active:scale-95"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

// Helper Link component to avoid errors
import { Link } from 'react-router-dom';

export default Awareness;
