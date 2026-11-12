import React from 'react';

interface PtmLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const PtmLogo: React.FC<PtmLogoProps> = ({
  className = '',
  size = 40,
  showText = true,
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* 3D Golden Crest Icon */}
      <div 
        className="relative flex items-center justify-center shrink-0" 
        style={{ width: size, height: size }}
      >
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(245,186,66,0.4)]"
        >
          <defs>
            <linearGradient id="ptmGoldBase" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF3C4" />
              <stop offset="30%" stopColor="#F5BA42" />
              <stop offset="70%" stopColor="#D48812" />
              <stop offset="100%" stopColor="#8A5104" />
            </linearGradient>

            <linearGradient id="ptmGoldDark" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4A2F02" />
              <stop offset="50%" stopColor="#B8760A" />
              <stop offset="100%" stopColor="#FAD77A" />
            </linearGradient>

            <linearGradient id="ptmInnerShine" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#E5A93C" stopOpacity="0.1" />
            </linearGradient>

            <radialGradient id="ptmGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F5BA42" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#F5BA42" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Ambient Glow */}
          <circle cx="50" cy="50" r="46" fill="url(#ptmGlow)" />

          {/* Outer Shield Hexagon */}
          <polygon
            points="50,6 88,28 88,72 50,94 12,72 12,28"
            fill="#101217"
            stroke="url(#ptmGoldBase)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Inner Geometric Facets */}
          <polygon
            points="50,14 80,32 80,68 50,86 20,68 20,32"
            fill="none"
            stroke="url(#ptmGoldDark)"
            strokeWidth="1.5"
            strokeOpacity="0.7"
          />

          {/* Central Monogram / 3D "P T M" Geometric Emblem */}
          {/* P-Bar Left Pillar */}
          <path
            d="M 33 30 L 41 30 L 41 70 L 33 70 Z"
            fill="url(#ptmGoldBase)"
          />
          {/* T-Bar Top Crossbar */}
          <path
            d="M 28 30 L 72 30 L 68 37 L 32 37 Z"
            fill="url(#ptmGoldBase)"
          />
          {/* Central Peak / M-Wings */}
          <polygon
            points="50,37 62,56 50,70 38,56"
            fill="url(#ptmGoldDark)"
          />
          {/* Central Diamond Core */}
          <polygon
            points="50,42 58,54 50,65 42,54"
            fill="url(#ptmGoldBase)"
            stroke="#FFF3C4"
            strokeWidth="1"
          />

          {/* Corner Light Accents */}
          <circle cx="50" cy="14" r="2.5" fill="#FFF8DB" />
          <circle cx="80" cy="32" r="2" fill="#F5BA42" />
          <circle cx="80" cy="68" r="2" fill="#D48812" />
          <circle cx="50" cy="86" r="2.5" fill="#FFF8DB" />
          <circle cx="20" cy="68" r="2" fill="#D48812" />
          <circle cx="20" cy="32" r="2" fill="#F5BA42" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-extrabold text-lg tracking-wider text-white">
              PTM
            </span>
            <span className="font-display font-semibold text-xs tracking-widest text-[#F5BA42] uppercase bg-[#F5BA42]/10 px-1.5 py-0.5 rounded border border-[#F5BA42]/30">
              V9
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-medium">
            Protocol
          </span>
        </div>
      )}
    </div>
  );
};
