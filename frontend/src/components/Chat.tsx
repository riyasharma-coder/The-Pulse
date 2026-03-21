import React, { useState, useEffect, useRef } from 'react';
import { sendMessage, getHistory, clearHistory, type Message } from '../api';
import { Send, User, Bot, RefreshCw, PlusCircle, Sparkles, HeartPulse } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadHistory = async () => {
    try {
      const history = await getHistory();
      setMessages(history);
    } catch (error) {
      console.error('Failed to load history', error);
    }
  };

  const handleNewChat = async () => {
    if (!window.confirm('Are you sure you want to clear this chat and start fresh?')) return;
    try {
      await clearHistory();
      setMessages([]);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#a855f7', '#ec4899']
      });
    } catch (error) {
      console.error('Failed to clear history', error);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setLoading(true);

    try {
      const response = await sendMessage(userMessage);
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        role: 'user', 
        content: userMessage, 
        timestamp: new Date().toISOString() 
      }, response]);
      
      if (response.emotion === 'happy') {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.8 },
          colors: ['#fbbf24', '#f59e0b']
        });
      }
    } catch (error) {
      console.error('Failed to send message', error);
    } finally {
      setLoading(false);
    }
  };

  const getEmotionStyles = (emotion?: string) => {
    switch (emotion) {
      case 'happy': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'sad': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'stress': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'anxiety': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'neutral': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-indigo-50 text-indigo-700 border-indigo-100';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-[750px] w-full max-w-4xl mx-auto bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 relative"
    >
      {/* Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
        <img src="/logo.png" alt="Watermark" className="w-[400px] h-[400px] object-contain grayscale" />
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient" />
      
      <div className="bg-white/80 backdrop-blur-md p-6 border-b border-gray-100 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="bg-gradient-to-br from-indigo-600 to-purple-700 p-3 rounded-2xl shadow-lg shadow-indigo-200"
          >
            <Bot size={28} className="text-white" />
          </motion.div>
          <div>
            <h2 className="text-2xl tracking-tight font-black text-slate-800 flex items-center gap-2">
              The Pulse
              <Sparkles size={18} className="text-indigo-500 animate-pulse" />
            </h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Always Listening</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={loadHistory}
            className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
            title="Refresh Conversation"
          >
            <RefreshCw size={20} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNewChat}
            className="px-4 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-xl transition-all flex items-center gap-2 text-sm font-bold shadow-lg shadow-slate-200"
          >
            <PlusCircle size={18} />
            <span>New Session</span>
          </motion.button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-[#fcfcfd] scroll-smooth">
        <AnimatePresence>
          {messages.length === 0 && !loading && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center p-10 space-y-6"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-indigo-100 rounded-full blur-2xl opacity-50 animate-pulse" />
                <div className="bg-white p-8 rounded-full shadow-xl relative">
                  <Bot size={64} className="text-indigo-600" />
                </div>
              </div>
              <div className="max-w-sm space-y-2">
                <h3 className="text-2xl font-black text-slate-800">Hello, I'm The Pulse</h3>
                <p className="text-slate-500 font-medium">Your private, AI-powered emotional companion. How are you feeling in this moment?</p>
              </div>
            </motion.div>
          )}
          
          {messages.map((msg, idx) => (
            <motion.div 
              key={msg.id || idx}
              initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-md ${
                  msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-100 text-indigo-600'
                }`}>
                  {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-5 rounded-[1.5rem] shadow-sm text-[15px] leading-relaxed whitespace-pre-wrap font-medium ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-700 border border-gray-100 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                  <div className="flex items-center gap-3 px-1">
                    {msg.emotion && msg.role === 'user' && (
                      <motion.span 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-tighter border ${getEmotionStyles(msg.emotion)} shadow-sm`}
                      >
                        {msg.emotion}
                      </motion.span>
                    )}
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {loading && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start items-center gap-4"
          >
            <div className="w-10 h-10 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-md">
              <Bot size={20} className="text-indigo-600" />
            </div>
            <div className="bg-white px-6 py-4 rounded-[1.5rem] rounded-tl-none shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="flex space-x-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                    className="w-2 h-2 bg-indigo-400 rounded-full"
                  />
                ))}
              </div>
              <span className="text-[11px] font-black text-indigo-500 uppercase tracking-widest">Pulse is reflecting</span>
            </div>
          </motion.div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="p-8 bg-white/80 backdrop-blur-xl border-t border-gray-100">
        <form onSubmit={handleSend} className="relative group max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="How are you feeling right now?"
            className="w-full pl-8 pr-20 py-5 bg-slate-100/50 border-2 border-transparent rounded-[2rem] focus:outline-none focus:bg-white focus:border-indigo-500/30 text-slate-800 placeholder:text-slate-400 font-semibold transition-all shadow-inner"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-3.5 rounded-2xl hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 disabled:opacity-30 disabled:hover:shadow-none transition-all"
          >
            {loading ? <RefreshCw className="animate-spin" size={22} /> : <Send size={22} />}
          </motion.button>
        </form>
        <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          <Sparkles size={12} className="text-indigo-400" />
          Powered by Gemini AI • Always Confidential
        </div>
      </div>
    </motion.div>
  );
};

export default Chat;
