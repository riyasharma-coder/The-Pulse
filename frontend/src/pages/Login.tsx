import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight, HeartPulse } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API login
    if (email && password) {
      login('dummy_token_123'); // Store token and update state
      navigate('/dashboard');
    }
  };

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
            <div className="w-16 h-16 overflow-hidden flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="w-full h-full object-cover rounded-full" 
                style={{ clipPath: 'circle(45% at 50% 50%)' }}
              />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">The Pulse<span className="text-indigo-600">.</span></span>
          </Link>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Welcome Back.</h1>
          <p className="text-slate-500 font-medium tracking-tight uppercase text-xs font-black tracking-widest opacity-60">Sign in to your private account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address" 
                required
                className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-indigo-500/30 text-slate-800 placeholder:text-slate-400 font-bold transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" 
                required
                className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-2xl focus:outline-none focus:bg-white focus:border-indigo-500/30 text-slate-800 placeholder:text-slate-400 font-bold transition-all"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-sm font-black text-indigo-600 hover:text-indigo-700 transition-colors">Forgot Password?</button>
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-slate-900 text-white text-lg font-black rounded-2xl shadow-xl hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-3 group"
          >
            Sign In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-slate-100 text-center relative z-10">
          <p className="text-slate-500 font-medium">Don't have an account?</p>
          <Link to="/register" className="text-indigo-600 font-black hover:text-indigo-700 transition-colors">Create one now</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
