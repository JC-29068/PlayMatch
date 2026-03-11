import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, MapPin, CalendarPlus, Users, Zap, CloudSun } from 'lucide-react';
import { mockMatches, currentUser } from '../data/mock';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('Hi');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-gray-900">{greeting}, {currentUser.name.split(' ')[0]} 👋</h1>
          <p className="text-gray-500 flex items-center gap-1 text-sm mt-1">
            <MapPin size={14} className="text-green-600" /> Downtown Area
          </p>
        </motion.div>
        <div className="flex gap-3">
          <button className="p-2 bg-white rounded-full shadow-sm relative text-gray-600 hover:text-green-700 transition">
            <Search size={20} />
          </button>
          <button className="p-2 bg-white rounded-full shadow-sm relative text-gray-600 hover:text-green-700 transition">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-orange-500 border-2 border-white rounded-full"></span>
          </button>
        </div>
      </header>

      {/* AI Suggestion Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-800 to-green-600 rounded-2xl p-4 mb-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
            <Zap className="text-orange-300" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg">Perfect Match Found!</h3>
            <p className="text-sm text-green-100">Intermediate Football • 2 miles away • Starts in 1h</p>
          </div>
        </div>
        <button onClick={() => navigate('/matches')} className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 px-5 py-2.5 rounded-xl font-bold text-sm transition shadow-md whitespace-nowrap">
          Join Now
        </button>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <button onClick={() => navigate('/matches')} className="bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center gap-2 hover:shadow-md hover:-translate-y-1 transition-all duration-200 border border-gray-50">
          <div className="bg-green-100 p-3 rounded-full text-green-700"><Users size={24} /></div>
          <span className="text-sm font-bold text-gray-700">Join Match</span>
        </button>
        <button onClick={() => navigate('/matches')} className="bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center gap-2 hover:shadow-md hover:-translate-y-1 transition-all duration-200 border border-gray-50">
          <div className="bg-orange-100 p-3 rounded-full text-orange-600"><CalendarPlus size={24} /></div>
          <span className="text-sm font-bold text-gray-700">Create</span>
        </button>
        <button onClick={() => navigate('/turfs')} className="bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center gap-2 hover:shadow-md hover:-translate-y-1 transition-all duration-200 border border-gray-50">
          <div className="bg-blue-100 p-3 rounded-full text-blue-600"><MapPin size={24} /></div>
          <span className="text-sm font-bold text-gray-700">Book Turf</span>
        </button>
      </div>

      {/* Nearby Matches */}
      <section>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-bold text-gray-900">Nearby Matches</h2>
          <button onClick={() => navigate('/matches')} className="text-green-700 text-sm font-bold hover:underline">See All</button>
        </div>
        
        <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
          {mockMatches.map(match => (
            <motion.div 
              whileHover={{ scale: 0.98 }}
              key={match.id} 
              className="min-w-[280px] bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex-shrink-0 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-md">{match.sport}</span>
                {match.weather && (
                  <span className="flex items-center gap-1 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-100 px-2 py-1 rounded-md">
                    <CloudSun size={14} className="text-orange-400" /> {match.weather.temp}°C
                  </span>
                )}
              </div>
              <h3 className="font-bold text-gray-900 mb-1 text-lg">{match.title}</h3>
              <p className="text-sm text-gray-500 mb-4 flex items-center gap-1"><MapPin size={14} className="text-gray-400"/> {match.location}</p>
              
              <div className="mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-500 font-medium">Players Joined</span>
                  <span className="font-bold text-gray-900">{match.currentPlayers} / {match.requiredPlayers}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(match.currentPlayers / match.requiredPlayers) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-orange-500 h-2 rounded-full" 
                  />
                </div>
              </div>

              <button className="w-full py-2.5 bg-green-50 hover:bg-green-100 text-green-800 font-bold rounded-xl text-sm transition border border-green-100">
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
