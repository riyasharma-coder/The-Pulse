import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, PublicRoute } from './components/auth/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Awareness from './pages/Awareness';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './components/Chat';
import Dashboard from './components/Dashboard';
import { HeartPulse } from 'lucide-react';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900">
          <Navbar />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/awareness" element={<Awareness />} />
              <Route path="/about" element={<About />} />
              
              {/* Only for logged out users */}
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              <Route path="/register" element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } />
              
              {/* Protected Routes (Only for logged in users) */}
              <Route path="/chat" element={
                <ProtectedRoute>
                  <div className="pt-28 pb-12 px-4"><Chat /></div>
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <div className="pt-28 pb-12 px-4"><Dashboard /></div>
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          
          <footer className="bg-slate-50 border-t border-slate-100 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="flex justify-center items-center gap-3 mb-8">
              <div className="w-16 h-16 overflow-hidden flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="Logo" 
                  className="w-full h-full object-cover rounded-full" 
                  style={{ clipPath: 'circle(45% at 50% 50%)' }}
                />
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight">The Pulse<span className="text-indigo-600">.</span></span>
            </div>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-8">© 2026 The Pulse AI • All Rights Reserved</p>
              <div className="flex justify-center gap-8 text-sm font-bold text-slate-400">
                <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-indigo-600 transition-colors">Contact Us</a>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
