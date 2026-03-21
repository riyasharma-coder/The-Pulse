import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, ShieldCheck, Zap, Star, MessageSquare, ArrowRight, Brain, Heart, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-indigo-50/50 blur-3xl opacity-50" />
        
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-black uppercase tracking-widest mb-8 border border-indigo-100 shadow-sm"
          >
            <Zap size={16} className="animate-pulse" />
            AI-Powered Emotional Companion
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.9] mb-8"
          >
            Your feelings <span className="text-indigo-600 italic">matter</span>. <br />
            Find your <span className="text-purple-600 underline decoration-purple-200">Pulse</span>.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto text-xl text-slate-500 font-medium mb-12 leading-relaxed"
          >
            A safe, private, and AI-powered space to understand your emotions. 
            Track your mental well-being and get actionable insights to live a balanced life.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6"
          >
            <Link 
              to="/chat" 
              className="px-10 py-5 bg-indigo-600 text-white text-lg font-black rounded-2xl shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-105 transition-all flex items-center gap-3 active:scale-95 group"
            >
              Start Chatting <MessageSquare size={22} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/awareness" 
              className="px-10 py-5 bg-white text-slate-900 text-lg font-black rounded-2xl border-2 border-slate-100 hover:border-indigo-100 hover:bg-indigo-50 transition-all active:scale-95"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Built for your Well-being</h2>
            <p className="text-lg text-slate-500 font-bold max-w-xl mx-auto uppercase tracking-widest text-xs">Powerful features to support your journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <ShieldCheck size={32} />, title: "100% Private", desc: "Your conversations are secure and encrypted. We prioritize your privacy above all.", color: "bg-emerald-50 text-emerald-600" },
              { icon: <Brain size={32} />, title: "Emotion Analysis", desc: "Our AI identifies 7+ emotions to help you understand what you're truly feeling.", color: "bg-indigo-50 text-indigo-600" },
              { icon: <Activity size={32} />, title: "Trend Tracking", desc: "Visualize your emotional journey over days and weeks with beautiful charts.", color: "bg-rose-50 text-rose-600" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all"
              >
                <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ratings Section */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left">
            <h2 className="text-5xl font-black text-slate-900 tracking-tight mb-4">Trusted by users.</h2>
            <p className="text-xl text-slate-500 font-medium">Providing support to thousands every single day.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-slate-50 p-8 rounded-[2rem] text-center border border-slate-100">
              <div className="flex justify-center gap-1 mb-2">
                {[1,2,3,4,5].map(s => <Star key={s} size={20} className="fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-4xl font-black text-slate-900">4.9/5</p>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">User Rating</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-[2rem] text-center border border-slate-100">
              <p className="text-4xl font-black text-slate-900">10k+</p>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Active Users</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
