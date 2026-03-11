import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, MapPin, Clock, Users, Plus, AlertCircle } from 'lucide-react';
import { mockMatches } from '../data/mock';

export default function Matches() {
  const [activeTab, setActiveTab] = useState<'join' | 'create'>('join');

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto h-full flex flex-col">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Matches</h1>

      {/* Tabs */}
      <div className="flex bg-gray-200 p-1 rounded-xl mb-6 w-full max-w-md">
        <button 
          onClick={() => setActiveTab('join')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${activeTab === 'join' ? 'bg-white text-green-800 shadow-sm' : 'text-gray-600'}`}
        >
          Join Match
        </button>
        <button 
          onClick={() => setActiveTab('create')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${activeTab === 'create' ? 'bg-white text-green-800 shadow-sm' : 'text-gray-600'}`}
        >
          Create Match
        </button>
      </div>

      {activeTab === 'join' ? (
        <div className="flex-1 overflow-y-auto">
          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar mb-2">
            <button className="flex items-center gap-1 bg-white border border-gray-200 px-3 py-1.5 rounded-full text-sm whitespace-nowrap shadow-sm">
              <Filter size={14} /> Filters
            </button>
            <button className="bg-green-700 text-white px-3 py-1.5 rounded-full text-sm whitespace-nowrap shadow-sm">Football</button>
            <button className="bg-white border border-gray-200 px-3 py-1.5 rounded-full text-sm whitespace-nowrap shadow-sm">Basketball</button>
            <button className="bg-white border border-gray-200 px-3 py-1.5 rounded-full text-sm whitespace-nowrap shadow-sm">Intermediate</button>
          </div>

          {/* Match List */}
          <div className="space-y-4 pb-20">
            {mockMatches.map(match => (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={match.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-900">{match.title}</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-md">{match.sport}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1"><MapPin size={16} className="text-gray-400"/> {match.location}</div>
                  <div className="flex items-center gap-1"><Clock size={16} className="text-gray-400"/> {match.time}, {match.date}</div>
                  <div className="flex items-center gap-1"><Users size={16} className="text-gray-400"/> {match.skillLevel}</div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                  <div className="flex -space-x-2">
                    {match.participants.map((p, i) => (
                      <img key={i} src={p.avatarUrl || `https://i.pravatar.cc/150?u=${p.id}`} alt={p.name} className="w-8 h-8 rounded-full border-2 border-white" />
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
                      +{match.requiredPlayers - match.currentPlayers}
                    </div>
                  </div>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-medium transition shadow-sm">
                    Join
                  </button>
                </div>
                
                {/* Emergency Sub Alert Example */}
                {match.currentPlayers === match.requiredPlayers - 1 && (
                  <div className="mt-3 bg-red-50 text-red-700 p-2 rounded-lg text-xs flex items-center gap-2 border border-red-100">
                    <AlertCircle size={14} /> Emergency Substitute needed! Game starts soon.
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-2xl">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Match Title</label>
              <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" placeholder="e.g. Sunday League Final" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sport</label>
                <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none">
                  <option>Football</option>
                  <option>Basketball</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skill Level</label>
                <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none">
                  <option>Any</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input type="date" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input type="time" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" placeholder="Search venue..." />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Players Needed</label>
              <input type="number" min="2" max="22" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" placeholder="10" />
            </div>
            
            <button type="button" className="w-full bg-green-800 hover:bg-green-900 text-white font-bold py-3.5 rounded-xl transition flex justify-center items-center gap-2 mt-6">
              <Plus size={20} /> Create Match
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
