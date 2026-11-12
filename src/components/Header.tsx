import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenLogin: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenLogin,
  onScrollToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full relative z-30 pt-7 pb-4 bg-[#1E1C1F] bg-[url('/assets/ptm/header_bg_strip.png')] bg-repeat bg-top">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        {/* Brand Logo matching Reference Image */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer transition-opacity hover:opacity-95 flex items-center"
        >
          <img
            src="/assets/ptm/header_logo.png"
            alt="Path To Marriage"
            className="h-9 sm:h-10 w-auto object-contain select-none"
          />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 font-serif-luxury text-[17px] text-[#EDEDED] tracking-wide">
          <button
            onClick={() => onScrollToSection('about-section')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            About Us
          </button>
          <button
            onClick={() => onScrollToSection('pricing-section')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Pricing
          </button>
          <button
            onClick={() => onScrollToSection('pricing-section')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Shop
          </button>
          <button
            onClick={() => onScrollToSection('assisted-section')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Help
          </button>
          <button
            onClick={onOpenLogin}
            className="px-7 py-1.5 rounded-full border border-white/40 text-white font-serif-luxury text-[16px] hover:border-[#D69E3A] hover:text-[#D69E3A] transition-all duration-200 cursor-pointer"
          >
            Login
          </button>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={onOpenLogin}
            className="px-5 py-1 rounded-full border border-white/40 text-sm font-serif-luxury text-white"
          >
            Login
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded text-stone-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 px-6 py-4 bg-[#141519]/95 backdrop-blur-md border-y border-white/10 space-y-3 font-serif-luxury text-base">
          <button
            onClick={() => {
              onScrollToSection('about-section');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-stone-200 hover:text-white"
          >
            About Us
          </button>
          <button
            onClick={() => {
              onScrollToSection('pricing-section');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-stone-200 hover:text-white"
          >
            Pricing
          </button>
          <button
            onClick={() => {
              onScrollToSection('pricing-section');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-stone-200 hover:text-white"
          >
            Shop
          </button>
          <button
            onClick={() => {
              onScrollToSection('assisted-section');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-stone-200 hover:text-white"
          >
            Help
          </button>
        </div>
      )}
    </header>
  );
};
