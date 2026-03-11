import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, Calendar, MapPin, Users, User as UserIcon, Shield, Menu, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/discover', icon: Flame, label: 'Discover' },
  { path: '/matches', icon: Calendar, label: 'Matches' },
  { path: '/turfs', icon: MapPin, label: 'Turfs' },
  { path: '/community', icon: Users, label: 'Community' },
  { path: '/profile', icon: UserIcon, label: 'Profile' },
];

export default function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
        className="hidden md:flex flex-col bg-green-800 text-white h-full shadow-xl z-20 transition-all duration-300"
      >
        <div className="p-4 flex items-center justify-between">
          {isSidebarOpen ? (
            <h1 className="text-2xl font-bold tracking-tight text-white cursor-pointer" onClick={() => navigate('/home')}>Play<span className="text-orange-500">Match</span></h1>
          ) : (
            <div className="w-full flex justify-center font-bold text-xl text-orange-500 cursor-pointer" onClick={() => navigate('/home')}>PM</div>
          )}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-green-700 rounded-lg hidden lg:block">
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 mt-8 px-3 space-y-2 overflow-y-auto hide-scrollbar pb-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-3 rounded-xl transition-colors ${
                  isActive ? 'bg-green-700 text-white' : 'text-green-100 hover:bg-green-700/50'
                } ${!isSidebarOpen && 'justify-center'}`
              }
            >
              <item.icon size={24} />
              {isSidebarOpen && <span className="ml-3 font-medium">{item.label}</span>}
            </NavLink>
          ))}
          
          <div className="pt-8 mt-8 border-t border-green-700">
             <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center px-3 py-3 rounded-xl transition-colors ${
                  isActive ? 'bg-green-700 text-white' : 'text-green-100 hover:bg-green-700/50'
                } ${!isSidebarOpen && 'justify-center'}`
              }
            >
              <Shield size={24} />
              {isSidebarOpen && <span className="ml-3 font-medium">Admin Panel</span>}
            </NavLink>
          </div>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0 relative">
        <Outlet />
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 px-2 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? 'text-green-700' : 'text-gray-500 hover:text-green-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} className={isActive ? 'stroke-[2.5px]' : ''} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
