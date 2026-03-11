import React, { useState, useEffect } from 'react';
import { Settings, Trophy, Activity, Star, Edit3, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function Profile() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) loadProfile();
  }, [user]);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const ref = doc(db, 'users', user!.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setProfile(snap.data());
      } else {
        // Create default profile for new users
        const defaultProfile = {
          name: user?.email?.split('@')[0] || 'Player',
          email: user?.email,
          skillLevel: 'Beginner',
          preferredSports: [],
          badges: [],
          stats: { matchesPlayed: 0, winRatio: 0, rating: 0 },
          avatarUrl: `https://i.pravatar.cc/150?u=${user?.uid}`
        };
        await setDoc(ref, defaultProfile);
        setProfile(defaultProfile);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-full py-24">
      <Loader className="animate-spin text-green-700" size={32} />
    </div>
  );

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
              src={profile?.avatarUrl || `https://i.pravatar.cc/150?u=${user?.uid}`}
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

          <h1 className="text-2xl font-bold text-gray-900">{profile?.name}</h1>
          <p className="text-gray-500 text-sm mb-1">{user?.email}</p>
          <p className="text-gray-500 text-sm mb-4">
            {profile?.skillLevel}
            {profile?.preferredSports?.length > 0 && ` • ${profile.preferredSports.join(', ')}`}
          </p>

          <div className="flex flex-wrap gap-2">
            {profile?.badges?.length > 0 ? profile.badges.map((badge: string) => (
              <span key={badge} className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                <Trophy size={12} /> {badge}
              </span>
            )) : (
              <span className="text-sm text-gray-400">No badges yet. Start playing!</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
          <Activity className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{profile?.stats?.matchesPlayed ?? 0}</p>
          <p className="text-xs text-gray-500">Matches Played</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
          <Trophy className="w-6 h-6 text-orange-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{profile?.stats?.winRatio ?? 0}%</p>
          <p className="text-xs text-gray-500">Win Ratio</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
          <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2 fill-yellow-400" />
          <p className="text-2xl font-bold text-gray-900">{profile?.stats?.rating ?? 0}</p>
          <p className="text-xs text-gray-500">Player Rating</p>
        </div>
      </div>

      <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Matches</h2>
      <div className="text-center py-8 text-gray-400 text-sm bg-white rounded-2xl border border-gray-100">
        No matches played yet. Join your first match!
      </div>
    </div>
  );
}