import React, { useState } from 'react';
import { PtmLogo } from './PtmLogo';
import { PageId, WalletState } from '../types';
import { 
  Wallet, 
  Layers, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  Fuel, 
  ExternalLink,
  SlidersHorizontal,
  LayoutGrid
} from 'lucide-react';
import { formatUsd } from '../utils/ptmMath';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  wallet: WalletState;
  onOpenWalletModal: () => void;
  isCanvasMode: boolean;
  onToggleCanvasMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  wallet,
  onOpenWalletModal,
  isCanvasMode,
  onToggleCanvasMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string; badge?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About & Tokenomics' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'app', label: 'Trade & Terminal', badge: 'Live' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#08090C]/85 border-b border-[#F5BA42]/15 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => {
            onNavigate('home');
            if (isCanvasMode) onToggleCanvasMode();
          }}
          className="cursor-pointer transition-transform hover:scale-[1.02]"
        >
          <PtmLogo size={42} showText={true} />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5">
          {navItems.map((item) => {
            const isActive = !isCanvasMode && currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (isCanvasMode) onToggleCanvasMode();
                  onNavigate(item.id);
                }}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'text-white bg-[#F5BA42]/15 border border-[#F5BA42]/40 shadow-[0_0_15px_rgba(245,186,66,0.15)] font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5BA42] shadow-[0_0_8px_#F5BA42]" />
                )}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA / Controls */}
        <div className="hidden lg:flex items-center gap-3">
          {/* All Figma Frames Canvas Switcher */}
          <button
            onClick={onToggleCanvasMode}
            title="Inspect all 4 Figma Desktop & Mobile artboards simultaneously"
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all border ${
              isCanvasMode
                ? 'bg-[#F5BA42] text-black border-[#F5BA42] shadow-[0_0_20px_rgba(245,186,66,0.3)]'
                : 'bg-white/[0.04] text-slate-300 hover:text-white border-white/10 hover:border-[#F5BA42]/30'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Figma Canvas Mode</span>
          </button>

          {/* Network & Gas Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#F5BA42] animate-pulse shadow-[0_0_8px_#F5BA42]" />
            <span className="text-slate-300 font-medium">Arbitrum</span>
            <div className="h-3 w-[1px] bg-white/10 mx-0.5" />
            <Fuel className="w-3 h-3 text-slate-400" />
            <span className="font-mono text-slate-400">12 Gwei</span>
          </div>

          {/* Wallet Connect / Account Button */}
          <button
            onClick={onOpenWalletModal}
            className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-all ${
              wallet.isConnected
                ? 'bg-white/[0.05] border border-[#F5BA42]/30 text-white hover:bg-[#F5BA42]/10'
                : 'gold-btn-gradient cursor-pointer'
            }`}
          >
            <Wallet className="w-4 h-4" />
            {wallet.isConnected ? (
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs">
                  {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                </span>
                <span className="text-xs text-[#F5BA42] font-bold">
                  {formatUsd(wallet.balanceUsd, true)}
                </span>
              </div>
            ) : (
              <span>Connect Wallet</span>
            )}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenWalletModal}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold gold-btn-gradient flex items-center gap-1.5"
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>{wallet.isConnected ? '0x71C...' : 'Connect'}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/[0.04] border border-white/10"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#F5BA42]/20 bg-[#0B0D12] px-4 py-5 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = !isCanvasMode && currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (isCanvasMode) onToggleCanvasMode();
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-[#F5BA42]/15 text-[#F5BA42] border border-[#F5BA42]/30 font-semibold'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isActive && <span className="w-2 h-2 rounded-full bg-[#F5BA42]" />}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 space-y-2">
            <button
              onClick={() => {
                onToggleCanvasMode();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-white/[0.05] border border-white/10 text-white"
            >
              <LayoutGrid className="w-4 h-4 text-[#F5BA42]" />
              <span>{isCanvasMode ? 'Exit Canvas Mode' : 'View All 4 Figma Frames'}</span>
            </button>
            <div className="flex items-center justify-between px-4 py-2 text-xs text-slate-400 bg-black/40 rounded-lg">
              <span>Network: Arbitrum One</span>
              <span className="font-mono text-emerald-400">12 Gwei</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
