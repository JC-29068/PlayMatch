import React from 'react';
import { Settings, Trophy, Activity, Star, Edit3 } from 'lucide-react';
import { currentUser } from '../data/mock';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto pb-24">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="h-32 bg-green-800 relative">
          <button className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 p-2 rounded-full backdrop-blur-sm transition">
            <Settings size={20} />
          </button>
        </div>
        <div className="px-6 pb-6 relative">
          <div className="flex justify-between items-end -mt-12 mb-4">
            <img 
              src={currentUser.avatarUrl} 
              alt="Profile" 
              className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-white"
            />
            <div className="flex gap-2">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition">
                <Edit3 size={16} /> Edit Profile
              </button>
              <button 
                onClick={async () => { await logout(); navigate('/'); }}
                className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-xl text-sm font-medium transition">
                Logout
              </button>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900">{currentUser.name}</h1>
          <p className="text-gray-500 text-sm mb-4">{currentUser.skillLevel} • {currentUser.preferredSports.join(', ')}</p>
          
          <div className="flex flex-wrap gap-2">
            {currentUser.badges.map(badge => (
              <span key={badge} className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                <Trophy size={12} /> {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
          <Activity className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{currentUser.stats.matchesPlayed}</p>
          <p className="text-xs text-gray-500">Matches Played</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
          <Trophy className="w-6 h-6 text-orange-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{currentUser.stats.winRatio}%</p>
          <p className="text-xs text-gray-500">Win Ratio</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
          <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2 fill-yellow-400" />
          <p className="text-2xl font-bold text-gray-900">{currentUser.stats.rating}</p>
          <p className="text-xs text-gray-500">Player Rating</p>
        </div>
      </div>

      <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Matches</h2>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
            <div>
              <h4 className="font-bold text-sm text-gray-900">5v5 Football</h4>
              <p className="text-xs text-gray-500">Oct {20 - i}, 2025 • Downtown Turf</p>
            </div>
            <div className="text-right">
              <span className={`text-xs font-bold px-2 py-1 rounded-md ${i === 2 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {i === 2 ? 'Lost' : 'Won'}
              </span>
              {i === 1 && (
                <p className="text-[10px] text-orange-500 mt-1 cursor-pointer hover:underline">Rate Match</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}