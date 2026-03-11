import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, CreditCard } from 'lucide-react';
import { mockTurfs } from '../data/mock';

export default function Turfs() {
  const [selectedTurf, setSelectedTurf] = useState<string | null>(null);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto pb-24">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Book a Turf</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTurfs.map(turf => (
          <motion.div 
            key={turf.id} 
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col"
          >
            <div className="h-48 overflow-hidden relative">
              <img src={turf.images[0]} alt={turf.name} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-bold flex items-center gap-1 shadow-sm">
                <Star size={14} className="text-orange-500 fill-orange-500" /> {turf.rating}
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-900">{turf.name}</h3>
                <span className="text-green-700 font-bold">${turf.hourlyRate}/hr</span>
              </div>
              <p className="text-sm text-gray-500 mb-4 flex items-center gap-1"><MapPin size={14}/> {turf.location}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {turf.amenities.map(amenity => (
                  <span key={amenity} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">{amenity}</span>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-gray-50">
                {selectedTurf === turf.id ? (
                  <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                    <p className="text-sm font-medium text-gray-700">Select Time Slot:</p>
                    <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                      {turf.availableSlots.map(slot => (
                        <button key={slot} className="border border-green-600 text-green-700 hover:bg-green-50 px-3 py-1 rounded-lg text-sm whitespace-nowrap transition">
                          {slot}
                        </button>
                      ))}
                    </div>
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl font-medium transition flex items-center justify-center gap-2 shadow-sm">
                      <CreditCard size={18} /> Pay & Book
                    </button>
                    <button onClick={() => setSelectedTurf(null)} className="w-full text-gray-500 text-sm hover:underline">Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setSelectedTurf(turf.id)} className="w-full py-2.5 bg-green-800 hover:bg-green-900 text-white font-medium rounded-xl transition shadow-sm flex items-center justify-center gap-2">
                    <Clock size={18} /> Check Availability
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
