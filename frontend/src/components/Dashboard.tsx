import React, { useState, useEffect } from 'react';
import { getAnalytics, type Analytics } from '../api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, AreaChart, Area } from 'recharts';
import { Activity, MessageSquare, TrendingUp, PieChart as PieChartIcon, Bot, Sparkles, Heart, Brain, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const COLORS = ['#6366f1', '#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6'];

const Dashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to load analytics', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !analytics) {
    return (
      <div className="flex justify-center items-center h-[750px] w-full max-w-5xl mx-auto bg-white rounded-[2rem] shadow-xl border border-gray-100">
        <div className="flex flex-col items-center gap-6">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center"
          >
            <Activity className="text-indigo-600" size={32} />
          </motion.div>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs animate-pulse">Syncing your Pulse...</p>
        </div>
      </div>
    );
  }

  const chartData = analytics.mood_trends.map(t => ({
    date: new Date(t.date).toLocaleDateString([], { month: 'short', day: 'numeric' }),
    emotion: t.emotion,
    count: t.count
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col h-[750px] w-full max-w-6xl mx-auto bg-[#f8fafc] rounded-[2rem] shadow-2xl overflow-y-auto border border-gray-100 p-8 space-y-8 no-scrollbar"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <motion.h2 
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3"
          >
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
              <TrendingUp size={28} />
            </div>
            Your Emotional Pulse
          </motion.h2>
          <p className="text-slate-500 font-semibold mt-2 ml-1">Deep analysis of your mental well-being journey.</p>
        </div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 group"
        >
          <div className="bg-indigo-50 p-2 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <MessageSquare size={20} className="text-indigo-600 group-hover:text-white" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Check-ins</p>
            <p className="text-xl font-black text-slate-900">{analytics.total_messages}</p>
          </div>
        </motion.div>
      </div>

      {/* AI Insight Hero Card */}
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-200 text-white"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full -ml-10 -mb-10 blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/20">
              <Bot size={24} className="text-white" />
            </div>
            <span className="text-sm font-black uppercase tracking-[0.3em] text-indigo-100">The Pulse Intelligence</span>
            <Sparkles size={18} className="text-amber-300 ml-auto animate-bounce" />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-black leading-tight">Weekly Mental Wellness Report</h3>
            <p className="text-lg text-indigo-50 leading-relaxed font-medium italic opacity-90">
              "{analytics.weekly_insight || "I'm still gathering data to provide your first deep insight. Keep sharing your day with me!"}"
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 text-xs font-bold flex items-center gap-2">
              <Brain size={14} /> Pattern Detection Active
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 text-xs font-bold flex items-center gap-2">
              <Zap size={14} /> Real-time Analysis
            </div>
          </div>
        </div>
      </motion.div>

      {analytics.total_messages === 0 ? (
        <div className="bg-white p-20 rounded-[2.5rem] shadow-sm border border-dashed border-slate-200 text-center flex flex-col items-center">
          <div className="bg-slate-50 p-8 rounded-full mb-6">
            <Activity size={64} className="text-slate-300" />
          </div>
          <h3 className="text-2xl font-black text-slate-800 mb-2">Your Emotional Map is Empty</h3>
          <p className="text-slate-500 font-medium max-w-md">Start chatting with The Pulse to begin mapping your emotional journey and receive personalized insights.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Trend Line Chart */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-rose-50 p-2 rounded-xl">
                    <Activity size={20} className="text-rose-500" />
                  </div>
                  <span className="font-black text-slate-800 uppercase tracking-widest text-sm">Emotional Intensity</span>
                </div>
              </div>
              <div className="h-64 w-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 700, fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 700, fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Emotion Bar Chart */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-50 p-2 rounded-xl">
                    <PieChartIcon size={20} className="text-amber-500" />
                  </div>
                  <span className="font-black text-slate-800 uppercase tracking-widest text-sm">Emotion Distribution</span>
                </div>
              </div>
              <div className="h-64 w-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.top_emotions}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="emotion" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 700, fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 700, fontSize: 12}} />
                    <Tooltip 
                      cursor={{fill: '#f8fafc'}}
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                    />
                    <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={40}>
                      {analytics.top_emotions.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5">
              <div className="bg-indigo-600 p-4 rounded-2xl text-white">
                <Heart size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dominant Mood</p>
                <p className="text-xl font-black text-slate-900 capitalize">{analytics.top_emotions[0]?.emotion || 'N/A'}</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5">
              <div className="bg-emerald-500 p-4 rounded-2xl text-white">
                <Brain size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stability Status</p>
                <p className="text-xl font-black text-slate-900">Normal</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5">
              <div className="bg-amber-500 p-4 rounded-2xl text-white">
                <Zap size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth Phase</p>
                <p className="text-xl font-black text-slate-900">Developing</p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Dashboard;
