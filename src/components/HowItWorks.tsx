import React from 'react';

export const HowItWorks: React.FC = () => {
  return (
    <section
      id="pricing-section"
      className="py-16 sm:py-24 w-full relative overflow-hidden"
      style={{
        backgroundColor: '#1E1C1F',
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.32) 0%, rgba(0, 0, 0, 0.40) 50%, rgba(0, 0, 0, 0.52) 100%), url('/assets/ptm/hero_bg_clean_tile.png')`,
        backgroundSize: 'auto, 400px 400px',
      }}
    >
      <div className="max-w-[1352px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title & Subtitle matching Screenshot */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 sm:mb-14">
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[42px] text-white font-normal tracking-wide">
            How it works
          </h2>
          <p className="font-serif-luxury text-sm sm:text-[15px] text-[#A6ABB7] leading-relaxed font-light max-w-[660px] mx-auto">
            Create your profile, discover compatible matches, and unlock advanced features for a more personalized and
            <br className="hidden sm:inline" /> meaningful matchmaking experience.
          </p>
        </div>

        {/* 3-Column Plan Table Card */}
        <div className="w-full rounded-[20px] shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
          <div className="grid grid-cols-1 md:grid-cols-3">
            
            {/* Column 1: Standard account */}
            <div className="flex flex-col bg-[#111113]/95 border-t border-b border-l border-r md:border-r border-white/[0.08] rounded-2xl md:rounded-none md:rounded-l-[20px] overflow-hidden">
              {/* Header with silvery metallic sheen - darker at top, smooth gradient */}
              <div className="h-[56px] sm:h-[60px] px-6 bg-gradient-to-b from-[#1C1D22] via-[#2A2B32] to-[#3A3B44] border-b border-white/[0.12] relative flex items-center justify-center text-center">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <h3 className="font-sans text-[16px] sm:text-[17px] font-medium text-white tracking-wide">
                  Standard account
                </h3>
              </div>
              {/* Rows */}
              <div className="font-sans text-[14px] sm:text-[14.5px] text-[#C4C8D4] text-center flex-1 flex flex-col">
                <div className="h-[52px] sm:h-[54px] flex items-center justify-center px-4 border-b border-white/[0.08]">
                  Create Account
                </div>
                <div className="h-[52px] sm:h-[54px] flex items-center justify-center px-4 border-b border-white/[0.08]">
                  Refine Search Using Filters
                </div>
                <div className="h-[52px] sm:h-[54px] flex items-center justify-center px-4 border-b border-white/[0.08]">
                  Explore Profiles
                </div>
                <div className="h-[52px] sm:h-[54px] flex items-center justify-center px-4 border-b border-white/[0.08]">
                  Discover Matches
                </div>
                <div className="h-[52px] sm:h-[54px] flex items-center justify-center px-4">
                  Initiate Connection
                </div>
                {/* 6th slot remains empty without bottom line to match screenshot */}
                <div className="h-[52px] sm:h-[54px]" />
              </div>
            </div>

            {/* Column 2: Premium account */}
            <div className="flex flex-col bg-[#14120E]/95 border-t border-b border-x md:border-x-0 border-white/[0.08] rounded-2xl md:rounded-none overflow-hidden">
              {/* Header with warm bronze-gold tint */}
              <div className="h-[56px] sm:h-[60px] px-6 bg-gradient-to-b from-[#3D311B] via-[#48391F] to-[#554222] border-b border-[#D69E3A]/30 relative flex items-center justify-center text-center">
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#E8B85C]/60 to-transparent" />
                <h3 className="font-sans text-[16px] sm:text-[17px] font-medium text-[#F5F2EB] tracking-wide">
                  Premium account
                </h3>
              </div>
              {/* Rows */}
              <div className="font-sans text-[14px] sm:text-[14.5px] text-[#C4C8D4] text-center flex-1 flex flex-col">
                <div className="h-[52px] sm:h-[54px] flex items-center justify-center px-4 border-b border-[#D69E3A]/25">
                  Verify Your Account (KYC)
                </div>
                <div className="h-[52px] sm:h-[54px] flex items-center justify-center px-4 border-b border-[#D69E3A]/25">
                  Access Complete Biodata
                </div>
                <div className="h-[52px] sm:h-[54px] flex items-center justify-center px-4 border-b border-[#D69E3A]/25">
                  Assess Comapatibility
                </div>
                <div className="h-[52px] sm:h-[54px] flex items-center justify-center px-4 border-b border-[#D69E3A]/25">
                  Chat Privately
                </div>
                <div className="h-[52px] sm:h-[54px] flex items-center justify-center px-4 border-b border-[#D69E3A]/25">
                  Download Biodata for Sharing
                </div>
                <div className="h-[52px] sm:h-[54px] flex items-center justify-center px-4">
                  Send Gifts
                </div>
              </div>
            </div>

            {/* Column 3: VIP */}
            <div className="flex flex-col bg-[#15120C]/95 border border-[#C8942E]/85 rounded-2xl md:rounded-none md:rounded-r-[20px] overflow-hidden shadow-[0_0_20px_rgba(200,148,46,0.14)]">
              {/* Header with radiant warm gold sheen */}
              <div className="h-[56px] sm:h-[60px] px-6 bg-gradient-to-b from-[#3E2F16] via-[#4D3A1B] to-[#684C1E] border-b border-[#D69E3A]/35 relative flex items-center justify-center text-center">
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-[#BA8520] via-[#F3C875] to-[#996515]" />
                <h3 className="font-sans text-[16px] sm:text-[17px] font-semibold text-[#FDFBF7] tracking-wide">
                  VIP
                </h3>
              </div>
              {/* Rows */}
              <div className="font-sans text-[14px] sm:text-[14.5px] text-[#C4C8D4] text-center flex-1 flex flex-col">
                <div className="h-[52px] sm:h-[54px] flex items-center justify-center px-4 border-b border-[#D69E3A]/25">
                  Everything in Premium
                </div>
                <div className="h-[52px] sm:h-[54px] flex items-center justify-center px-4 border-b border-[#D69E3A]/25">
                  Hide Your Profile
                </div>
                <div className="h-[52px] sm:h-[54px] flex items-center justify-center px-4 border-b border-[#D69E3A]/25">
                  Chat Without Adding
                </div>
                <div className="h-[52px] sm:h-[54px] border-b border-[#D69E3A]/25" />
                <div className="h-[52px] sm:h-[54px] border-b border-[#D69E3A]/25" />
                <div className="h-[52px] sm:h-[54px]" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
