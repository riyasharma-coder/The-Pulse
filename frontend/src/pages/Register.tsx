import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus, ArrowRight, HeartPulse, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-4 flex items-center justify-center min-h-[90vh]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 blur-2xl" />
        
        <div className="text-center mb-12 relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 group mb-8">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg">
              <HeartPulse size={24} />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">The Pulse<span className="text-indigo-600">.</span></span>
          </Link>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Join The Pulse.</h1>
          <p className="text-slate-500 font-medium tracking-tight uppercase text-xs font-black tracking-widest opacity-60">Start your emotional journey today</p>
        </div>

        <form className="space-y-6 relative z-10">
          <div className="space-y-2">
            <div className="relative group">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-indigo-500/30 text-slate-800 placeholder:text-slate-400 font-bold transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-indigo-500/30 text-slate-800 placeholder:text-slate-400 font-bold transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-indigo-500/30 text-slate-800 placeholder:text-slate-400 font-bold transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 py-2">
            <div className="bg-emerald-50 p-2 rounded-lg">
              <ShieldCheck size={16} className="text-emerald-600" />
            </div>
            <p className="text-xs text-slate-400 font-bold tracking-tight uppercase leading-relaxed">By creating an account, you agree to our privacy policy and terms.</p>
          </div>

          <Link 
            to="/chat"
            className="w-full py-5 bg-indigo-600 text-white text-lg font-black rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-3 group"
          >
            Create Account <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </form>

        <div className="mt-12 pt-8 border-t border-slate-100 text-center relative z-10">
          <p className="text-slate-500 font-medium">Already have an account?</p>
          <Link to="/login" className="text-indigo-600 font-black hover:text-indigo-700 transition-colors">Sign in here</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
