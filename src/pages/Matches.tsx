import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Users, Plus, AlertCircle, Loader } from 'lucide-react';
import { getMatches, createMatch } from '../lib/firestore';
import { useAuth } from '../context/AuthContext';

export default function Matches() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'join' | 'create'>('join');
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState<string>('All');
  const filteredMatches = filter === 'All' ? matches : matches.filter(m => m.sport === filter || m.skillLevel === filter);
  const [form, setForm] = useState({
    title: '',
    sport: 'Football',
    skillLevel: 'Any',
    date: '',
    time: '',
    location: '',
    requiredPlayers: 10
  });

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    setLoading(true);
    try {
      const data = await getMatches();
      setMatches(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleCreateMatch = async () => {
    if (!form.title || !form.date || !form.location) return;
    setSubmitting(true);
    try {
      await createMatch({
        ...form,
        requiredPlayers: Number(form.requiredPlayers),
        currentPlayers: 1,
        creatorId: user?.uid,
        creatorEmail: user?.email,
        participants: [user?.uid],
        status: 'Open'
      });
      setForm({ title: '', sport: 'Football', skillLevel: 'Any', date: '', time: '', location: '', requiredPlayers: 10 });
      setActiveTab('join');
      await loadMatches();
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto h-full flex flex-col">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Matches</h1>

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
          <div className="flex gap-2 overflow-x-auto pb-4 hide-scrollbar mb-2">
            {['All', 'Football', 'Basketball', 'Tennis', 'Cricket', 'Beginner', 'Intermediate', 'Advanced'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap shadow-sm transition ${
                  filter === f ? 'bg-green-700 text-white' : 'bg-white border border-gray-200 text-gray-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader className="animate-spin text-green-700" size={32} />
            </div>
          ) : filteredMatches.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="font-medium">No matches found.</p>
              <p className="text-sm">Try a different filter or create one!</p>
            </div>
          ) : (
            <div className="space-y-4 pb-20">
              {filteredMatches.map(match => (
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
                    <span className="text-sm text-gray-500">{match.currentPlayers}/{match.requiredPlayers} players</span>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-medium transition shadow-sm">
                      Join
                    </button>
                  </div>
                  {match.currentPlayers === match.requiredPlayers - 1 && (
                    <div className="mt-3 bg-red-50 text-red-700 p-2 rounded-lg text-xs flex items-center gap-2 border border-red-100">
                      <AlertCircle size={14} /> Emergency Substitute needed!
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-2xl">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Match Title</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="e.g. Sunday League Final" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sport</label>
                <select value={form.sport} onChange={(e) => setForm({ ...form, sport: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none">
                  <option>Football</option>
                  <option>Basketball</option>
                  <option>Tennis</option>
                  <option>Cricket</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skill Level</label>
                <select value={form.skillLevel} onChange={(e) => setForm({ ...form, skillLevel: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none">
                  <option>Any</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="Search venue..." />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Players Needed</label>
              <input type="number" min="2" max="22" value={form.requiredPlayers}
                onChange={(e) => setForm({ ...form, requiredPlayers: Number(e.target.value) })}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" />
            </div>
            <button type="button" onClick={handleCreateMatch} disabled={submitting}
              className="w-full bg-green-800 hover:bg-green-900 text-white font-bold py-3.5 rounded-xl transition flex justify-center items-center gap-2 mt-6">
              {submitting ? <Loader className="animate-spin" size={20} /> : <><Plus size={20} /> Create Match</>}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}