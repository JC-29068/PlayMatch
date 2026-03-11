import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { X, Heart, MapPin, Info, CheckCircle2 } from 'lucide-react';
import { mockDiscoverProfiles } from '../data/mock';

export default function Discover() {
  const [profiles, setProfiles] = useState(mockDiscoverProfiles);
  const [matchPopup, setMatchPopup] = useState<string | null>(null);

  const activeProfile = profiles[profiles.length - 1];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (!activeProfile) return;
    
    if (direction === 'right') {
      // Show match popup briefly
      setMatchPopup(activeProfile.name);
      setTimeout(() => setMatchPopup(null), 1500);
    }
    
    setProfiles((prev) => prev.slice(0, -1));
  };

  return (
    <div className="h-full flex flex-col p-4 md:p-8 max-w-md mx-auto relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Discover</h1>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Online Now
        </div>
      </div>

      <div className="flex-1 relative w-full flex items-center justify-center">
        <AnimatePresence>
          {profiles.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center text-gray-500 flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <MapPin size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No more profiles</h3>
              <p>Check back later for more players and teams in your area.</p>
              <button 
                onClick={() => setProfiles(mockDiscoverProfiles)}
                className="mt-6 text-orange-500 font-bold hover:underline"
              >
                Reload Profiles
              </button>
            </motion.div>
          ) : (
            profiles.map((profile, index) => {
              const isTop = index === profiles.length - 1;
              return (
                <SwipeableCard 
                  key={profile.id} 
                  profile={profile} 
                  isTop={isTop} 
                  onSwipe={handleSwipe} 
                  index={index}
                />
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 mt-6 pb-20 md:pb-0">
        <button 
          onClick={() => handleSwipe('left')}
          disabled={profiles.length === 0}
          className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-red-500 hover:bg-red-50 transition border border-gray-100 disabled:opacity-50"
        >
          <X size={32} strokeWidth={2.5} />
        </button>
        <button 
          onClick={() => handleSwipe('right')}
          disabled={profiles.length === 0}
          className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-green-500 hover:bg-green-50 transition border border-gray-100 disabled:opacity-50"
        >
          <Heart size={32} strokeWidth={2.5} className="fill-green-500" />
        </button>
      </div>

      {/* Match Popup Overlay */}
      <AnimatePresence>
        {matchPopup && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-white/90 backdrop-blur-md px-8 py-6 rounded-3xl shadow-2xl flex flex-col items-center text-center border border-green-100">
              <CheckCircle2 size={64} className="text-green-500 mb-4" />
              <h2 className="text-3xl font-extrabold text-green-800 mb-2">It's a Match!</h2>
              <p className="text-gray-600 font-medium">You and {matchPopup} liked each other.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SwipeableCard({ profile, isTop, onSwipe, index }: { profile: any, isTop: boolean, onSwipe: (dir: 'left'|'right') => void, index: number }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  // Visual indicators for swiping
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [0, -100], [0, 1]);

  const handleDragEnd = (e: any, info: any) => {
    if (info.offset.x > 100) {
      onSwipe('right');
    } else if (info.offset.x < -100) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      className="absolute w-full h-[60vh] md:h-[65vh] max-h-[600px] rounded-3xl shadow-xl overflow-hidden bg-white border border-gray-200 origin-bottom"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        opacity: isTop ? opacity : 1,
        scale: isTop ? 1 : 1 - (3 - index) * 0.05,
        y: isTop ? 0 : (3 - index) * 15,
        zIndex: index,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
    >
      <div className="relative w-full h-full">
        <img src={profile.image} alt={profile.name} className="w-full h-full object-cover pointer-events-none" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>

        {/* Swipe Indicators */}
        <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-8 border-4 border-green-500 text-green-500 font-extrabold text-4xl px-4 py-2 rounded-xl transform -rotate-12 pointer-events-none z-10">
          LIKE
        </motion.div>
        <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 right-8 border-4 border-red-500 text-red-500 font-extrabold text-4xl px-4 py-2 rounded-xl transform rotate-12 pointer-events-none z-10">
          NOPE
        </motion.div>

        {/* Profile Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white pointer-events-none">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold">{profile.name}</h2>
            {profile.online && (
              <span className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
              {profile.type}
            </span>
            <span className="bg-orange-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
              {profile.sport}
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
              {profile.skillLevel}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-200 text-sm mb-3">
            <MapPin size={16} /> {profile.distance}
          </div>

          <p className="text-sm text-gray-300 line-clamp-2">
            {profile.bio}
          </p>
        </div>

        {/* Info Button */}
        <button className="absolute bottom-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition pointer-events-auto">
          <Info size={20} />
        </button>
      </div>
    </motion.div>
  );
}
