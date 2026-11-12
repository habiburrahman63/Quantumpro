import React from 'react';

export const HeroArtwork: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-radial from-[#F5BA42]/20 via-[#D48812]/5 to-transparent blur-3xl pointer-events-none" />

      {/* Outer Rotating Ambient Ring */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-[#F5BA42]/20 border-dashed animate-[spin_60s_linear_infinite]" />
      <div className="absolute w-60 h-60 sm:w-80 sm:h-80 rounded-full border border-[#FFF3C4]/10 animate-[spin_40s_linear_infinite_reverse]" />

      {/* Main 3D Metallic Monolith / Crest Sculpture */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex items-center justify-center">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full drop-shadow-[0_20px_50px_rgba(245,186,66,0.35)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="heroGoldGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF9E6" />
              <stop offset="25%" stopColor="#F5BA42" />
              <stop offset="60%" stopColor="#C67D0C" />
              <stop offset="85%" stopColor="#7E4703" />
              <stop offset="100%" stopColor="#412401" />
            </linearGradient>

            <linearGradient id="heroGoldGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF2B8" />
              <stop offset="40%" stopColor="#E5A32B" />
              <stop offset="80%" stopColor="#9C5D08" />
              <stop offset="100%" stopColor="#2A1802" />
            </linearGradient>

            <linearGradient id="heroDarkMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#252A36" />
              <stop offset="50%" stopColor="#141820" />
              <stop offset="100%" stopColor="#0A0C10" />
            </linearGradient>

            <radialGradient id="centerCoreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFECA8" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#F5BA42" stopOpacity="0.6" />
              <stop offset="80%" stopColor="#C48216" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#F5BA42" stopOpacity="0" />
            </radialGradient>

            <filter id="goldGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Central Radiant Halo */}
          <circle cx="200" cy="200" r="140" fill="url(#centerCoreGlow)" />

          {/* Outer Octagonal Beveled Ring */}
          <polygon
            points="200,30 320,80 370,200 320,320 200,370 80,320 30,200 80,80"
            fill="url(#heroDarkMetallic)"
            stroke="url(#heroGoldGradient1)"
            strokeWidth="6"
            strokeLinejoin="round"
          />

          {/* Inner Facet Lines */}
          <line x1="200" y1="30" x2="200" y2="370" stroke="url(#heroGoldGradient2)" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="30" y1="200" x2="370" y2="200" stroke="url(#heroGoldGradient2)" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="80" y1="80" x2="320" y2="320" stroke="url(#heroGoldGradient2)" strokeWidth="1.5" strokeOpacity="0.3" />
          <line x1="80" y1="320" x2="320" y2="80" stroke="url(#heroGoldGradient2)" strokeWidth="1.5" strokeOpacity="0.3" />

          {/* Floating Diamond Shield Plates */}
          {/* Top Diamond Plate */}
          <polygon
            points="200,60 260,140 200,200 140,140"
            fill="url(#heroGoldGradient1)"
            opacity="0.9"
          />
          {/* Bottom Diamond Plate */}
          <polygon
            points="200,200 260,260 200,340 140,260"
            fill="url(#heroGoldGradient2)"
            opacity="0.9"
          />
          {/* Left Wing Plate */}
          <polygon
            points="60,200 140,140 200,200 140,260"
            fill="url(#heroGoldGradient2)"
            opacity="0.8"
          />
          {/* Right Wing Plate */}
          <polygon
            points="200,200 260,140 340,200 260,260"
            fill="url(#heroGoldGradient1)"
            opacity="0.8"
          />

          {/* 3D Core PTM Pillar Architecture */}
          {/* Central Column */}
          <polygon
            points="185,110 215,110 225,290 175,290"
            fill="url(#heroGoldGradient1)"
            filter="url(#goldGlowFilter)"
          />
          {/* Left Pillar */}
          <polygon
            points="140,140 165,140 165,260 140,260"
            fill="url(#heroGoldGradient2)"
          />
          {/* Right Pillar */}
          <polygon
            points="235,140 260,140 260,260 235,260"
            fill="url(#heroGoldGradient1)"
          />

          {/* Floating Golden Token Core */}
          <circle cx="200" cy="200" r="38" fill="url(#heroGoldGradient1)" stroke="#FFF9E6" strokeWidth="2.5" />
          <circle cx="200" cy="200" r="28" fill="#141820" />
          <text
            x="200"
            y="207"
            textAnchor="middle"
            fill="url(#heroGoldGradient1)"
            fontSize="20"
            fontWeight="900"
            fontFamily="'Outfit', sans-serif"
            letterSpacing="2"
          >
            PTM
          </text>

          {/* Corner Gem / Light Nodes */}
          <circle cx="200" cy="30" r="6" fill="#FFF9E6" />
          <circle cx="320" cy="80" r="5" fill="#F5BA42" />
          <circle cx="370" cy="200" r="6" fill="#FFF9E6" />
          <circle cx="320" cy="320" r="5" fill="#F5BA42" />
          <circle cx="200" cy="370" r="6" fill="#FFF9E6" />
          <circle cx="80" cy="320" r="5" fill="#F5BA42" />
          <circle cx="30" cy="200" r="6" fill="#FFF9E6" />
          <circle cx="80" cy="80" r="5" fill="#F5BA42" />
        </svg>

        {/* Floating Specular Sparkle Accents */}
        <div className="absolute top-8 right-12 w-3 h-3 bg-[#FFF3C4] rounded-full blur-[1px] animate-ping" />
        <div className="absolute bottom-12 left-10 w-2.5 h-2.5 bg-[#F5BA42] rounded-full blur-[1px] animate-pulse" />
      </div>

      {/* Base Platform Shadow */}
      <div className="absolute -bottom-6 w-3/4 h-8 bg-gradient-to-r from-transparent via-[#F5BA42]/20 to-transparent blur-xl rounded-full" />
    </div>
  );
};
