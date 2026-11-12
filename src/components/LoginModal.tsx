import React, { useState } from 'react';
import { X, Lock, Mail, ArrowRight } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn(true);
    setTimeout(() => {
      setLoggedIn(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-sm p-6 sm:p-7 rounded-[24px] bg-[#14161C] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1 pt-1">
          <img
            src="/assets/ptm/header_logo.png"
            alt="Path To Marriage"
            className="h-8 w-auto mx-auto object-contain mb-3"
          />
          <h3 className="font-serif-luxury text-2xl text-white font-normal tracking-wide">
            Member Login
          </h3>
          <p className="font-serif-luxury text-xs text-stone-400">
            Access your biodata and prospective connections
          </p>
        </div>

        {loggedIn ? (
          <div className="py-6 text-center font-serif-luxury text-sm text-[#D69E3A] font-medium animate-pulse">
            Signing into your matrimonial account...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="font-serif-luxury text-xs text-stone-300 block mb-1">Email / Member ID</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0D0F13] text-white font-serif-luxury text-xs px-3.5 py-2.5 rounded-lg border border-white/10 outline-none focus:border-[#D69E3A]"
                />
              </div>
            </div>

            <div>
              <label className="font-serif-luxury text-xs text-stone-300 block mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0D0F13] text-white font-serif-luxury text-xs px-3.5 py-2.5 rounded-lg border border-white/10 outline-none focus:border-[#D69E3A]"
              />
            </div>

            <div className="flex items-center justify-between font-serif-luxury text-xs text-stone-400">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" className="accent-[#D69E3A]" defaultChecked />
                <span>Remember me</span>
              </label>
              <a href="#forgot" onClick={(e) => e.preventDefault()} className="hover:text-[#D69E3A] transition">
                Forgot password?
              </a>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-gradient-to-b from-[#C68B25] to-[#A27018] text-[#151006] font-serif-luxury text-sm font-semibold tracking-wide shadow-md hover:brightness-105 active:scale-[0.99] transition cursor-pointer"
              >
                Log In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
