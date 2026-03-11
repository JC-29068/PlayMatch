import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Phone, ChevronRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [step, setStep] = useState<'login' | 'signup' | 'profile'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (step === 'login') {
      const { error } = await login(email, password);
      if (error) { setError(error); setIsLoading(false); }
      else navigate('/home');
    } else if (step === 'signup') {
      const { error } = await signup(email, password);
      if (error) { setError(error); setIsLoading(false); }
      else { setStep('profile'); setIsLoading(false); }
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-md rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="bg-green-800 p-6 text-white relative">
          {step !== 'login' && (
            <button onClick={() => setStep(step === 'profile' ? 'signup' : 'login')} className="absolute top-6 left-4">
              <ArrowLeft size={24} />
            </button>
          )}
          <h2 className="text-3xl font-bold text-center mt-4">
            {step === 'login' ? 'Welcome Back' : step === 'signup' ? 'Create Account' : 'Complete Profile'}
          </h2>
          <p className="text-green-200 text-center mt-2 text-sm">
            {step === 'login' ? 'Login to access your matches' : step === 'signup' ? 'Join the PlayMatch community' : 'Tell us about your sports preferences'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>
          )}

          {step !== 'profile' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="••••••••" />
                </div>
              </div>
              {step === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input type="tel" className="pl-10 w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                      placeholder="+91 00000 00000" />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Sports</label>
                <select multiple className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl h-24">
                  <option>Football</option><option>Basketball</option><option>Tennis</option><option>Cricket</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skill Level</label>
                <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>Pro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input type="number" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" placeholder="e.g. 24" />
              </div>
            </div>
          )}

          <button type="submit" disabled={isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl flex justify-center items-center gap-2">
            {isLoading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : (
              <>{step === 'login' ? 'Sign In' : step === 'signup' ? 'Continue' : 'Complete Setup'}<ChevronRight size={20} /></>
            )}
          </button>
        </form>

        {step !== 'profile' && (
          <div className="p-6 pt-0 text-center">
            <p className="text-sm text-gray-600">
              {step === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button onClick={() => { setError(null); setStep(step === 'login' ? 'signup' : 'login'); }}
                className="text-green-700 font-bold hover:underline">
                {step === 'login' ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}