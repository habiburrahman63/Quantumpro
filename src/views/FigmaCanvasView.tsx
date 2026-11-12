import React, { useState } from 'react';
import { PageId } from '../types';
import { LayoutGrid, Smartphone, Monitor, ZoomIn, ZoomOut, Maximize2, ExternalLink } from 'lucide-react';

interface FigmaCanvasViewProps {
  onSelectScreen: (page: PageId) => void;
}

export const FigmaCanvasView: React.FC<FigmaCanvasViewProps> = ({ onSelectScreen }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [activeTab, setActiveTab] = useState<'all' | 'desktop' | 'mobile'>('all');

  const desktopFrames = [
    {
      id: 'home' as PageId,
      number: '01',
      title: 'Desktop • Home & Hero',
      desc: 'Institutional Liquidity, 3D Monolith, Staking Estimator, Ecosystem & Feature Grid',
      height: '1440 × 900',
    },
    {
      id: 'about' as PageId,
      number: '02',
      title: 'Desktop • About & Tokenomics',
      desc: 'Decentralized Liquidity Engine, $PTM Distribution Breakdown, Security Architecture',
      height: '1440 × 1200',
    },
    {
      id: 'roadmap' as PageId,
      number: '03',
      title: 'Desktop • Roadmap & Milestones',
      desc: 'Phase 1 to Phase 5 execution roadmap, CertiK milestones, DAO governance',
      height: '1440 × 1400',
    },
    {
      id: 'app' as PageId,
      number: '04',
      title: 'Desktop • Web3 Trading Terminal',
      desc: 'Interactive Chart, Instant Swap Desk, Staking Vault, Order Book & Tx History',
      height: '1440 × 1080',
    },
  ];

  const mobileFrames = [
    { id: 'home' as PageId, title: 'Mobile • Home', number: 'M-01', width: '390 × 844' },
    { id: 'about' as PageId, title: 'Mobile • About & Tokenomics', number: 'M-02', width: '390 × 960' },
    { id: 'roadmap' as PageId, title: 'Mobile • Roadmap', number: 'M-03', width: '390 × 1100' },
    { id: 'app' as PageId, title: 'Mobile • Terminal', number: 'M-04', width: '390 × 900' },
  ];

  return (
    <div className="w-full min-h-screen bg-[#08090C] py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Controls Toolbar */}
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#0F1117] border border-[#F5BA42]/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F5BA42] shadow-[0_0_8px_#F5BA42]" />
            <h2 className="font-display font-bold text-white text-base">
              Figma Canvas Artboards Overview
            </h2>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#F5BA42]/15 text-[#F5BA42] border border-[#F5BA42]/30">
              PTM-UI-V9
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare all 4 Desktop frames and 4 Mobile frames as designed in Figma. Click any card to launch full interactive view.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Filter */}
          <div className="flex p-1 rounded-xl bg-black/40 border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeTab === 'all' ? 'bg-[#F5BA42] text-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Frames
            </button>
            <button
              onClick={() => setActiveTab('desktop')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeTab === 'desktop' ? 'bg-[#F5BA42] text-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              Desktop (4)
            </button>
            <button
              onClick={() => setActiveTab('mobile')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeTab === 'mobile' ? 'bg-[#F5BA42] text-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              Mobile (4)
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP ARTBOARDS SECTION */}
      {(activeTab === 'all' || activeTab === 'desktop') && (
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
              <Monitor className="w-4 h-4 text-[#F5BA42]" />
              <span>Desktop Artboards (1440px Canvas)</span>
            </div>
            <span className="text-xs text-slate-400">4 Full Responsive Pages</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {desktopFrames.map((frame) => (
              <div
                key={frame.id}
                onClick={() => onSelectScreen(frame.id)}
                className="group cursor-pointer rounded-2xl dark-glass-card border border-white/10 hover:border-[#F5BA42]/40 transition-all duration-300 p-5 flex flex-col justify-between hover:shadow-[0_12px_35px_rgba(245,186,66,0.12)] hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#F5BA42] bg-[#F5BA42]/10 px-2 py-0.5 rounded border border-[#F5BA42]/20">
                      Frame {frame.number}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{frame.height}</span>
                  </div>

                  <h3 className="font-display font-bold text-base text-white group-hover:text-[#F5BA42] transition">
                    {frame.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {frame.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#F5BA42] font-semibold">
                  <span>Open Interactive Screen</span>
                  <Maximize2 className="w-3.5 h-3.5 group-hover:scale-125 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MOBILE ARTBOARDS SECTION */}
      {(activeTab === 'all' || activeTab === 'mobile') && (
        <div className="max-w-7xl mx-auto space-y-4 pt-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
              <Smartphone className="w-4 h-4 text-[#F5BA42]" />
              <span>Mobile Artboards (390px Viewport)</span>
            </div>
            <span className="text-xs text-slate-400">4 Fluid Mobile Screens</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {mobileFrames.map((frame) => (
              <div
                key={frame.number}
                onClick={() => onSelectScreen(frame.id)}
                className="group cursor-pointer rounded-2xl dark-glass-card border border-white/10 hover:border-[#F5BA42]/40 transition p-4 flex flex-col justify-between text-center hover:-translate-y-1"
              >
                <div className="space-y-2">
                  <div className="text-[10px] font-mono font-bold text-[#F5BA42]">{frame.number}</div>
                  <h4 className="font-display font-semibold text-xs text-white group-hover:text-[#F5BA42] transition">
                    {frame.title}
                  </h4>
                  <div className="text-[10px] text-slate-400 font-mono">{frame.width}</div>
                </div>
                <div className="pt-3 text-[11px] text-[#F5BA42] font-medium flex items-center justify-center gap-1">
                  <span>View</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
