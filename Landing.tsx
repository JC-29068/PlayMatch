import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Users, MapPin } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-800 text-white flex flex-col">
      <header className="p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Play<span className="text-orange-500">Match</span></h1>
        <button onClick={() => navigate('/auth')} className="text-sm font-medium hover:text-orange-400 transition">Login</button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        {/* Background Graphics */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-1/3 right-10 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-10 max-w-2xl"
        >
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Find Players. <br/> Join Games. <br/> <span className="text-orange-500">Play Anywhere.</span>
          </h2>
          <p className="text-lg md:text-xl text-green-100 mb-10">
            The ultimate sports matchmaking and turf booking network for your community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/auth')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-transform transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              Get Started <Play fill="currentColor" size={20} />
            </button>
          </div>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 z-10 w-full max-w-4xl">
          <div className="bg-green-700/50 p-6 rounded-2xl backdrop-blur-sm border border-green-600">
            <Users className="w-10 h-10 text-orange-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Matchmaking</h3>
            <p className="text-green-100 text-sm">Find players matching your skill level and preferred sports instantly.</p>
          </div>
          <div className="bg-green-700/50 p-6 rounded-2xl backdrop-blur-sm border border-green-600">
            <MapPin className="w-10 h-10 text-orange-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Turf Booking</h3>
            <p className="text-green-100 text-sm">Discover and book local sports venues with real-time availability.</p>
          </div>
          <div className="bg-green-700/50 p-6 rounded-2xl backdrop-blur-sm border border-green-600">
            <Play className="w-10 h-10 text-orange-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Play & Compete</h3>
            <p className="text-green-100 text-sm">Join tournaments, track your stats, and climb the local leaderboards.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
