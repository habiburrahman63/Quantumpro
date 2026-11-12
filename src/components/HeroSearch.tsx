import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SearchFilterState, formatHeight } from '../utils/filterUtils';

interface HeroSearchProps {
  onSearch: (filters: SearchFilterState) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({ onSearch }) => {
  const [premiumOnly, setPremiumOnly] = useState<'Any' | 'Premium Only'>('Any');
  const [maritalStatus, setMaritalStatus] = useState<'Any' | 'Single' | 'Divorced' | 'Widowed'>('Single');

  // Height in inches: 4'0" (48) to 7'0" (84)
  const [heightMin, setHeightMin] = useState<number>(60); // 5'0"
  const [heightMax, setHeightMax] = useState<number>(72); // 6'0"

  // Age in years: 18 to 100
  const [ageMin, setAgeMin] = useState<number>(25);
  const [ageMax, setAgeMax] = useState<number>(38);

  const [religion, setReligion] = useState<string>('');
  const [nationality, setNationality] = useState<string>('');
  const [residingIn, setResidingIn] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      premiumOnly,
      maritalStatus,
      heightMin,
      heightMax,
      ageMin,
      ageMax,
      religion,
      nationality,
      residingIn,
    });
  };

  // Slider percentage calculations
  const heightMinPct = ((heightMin - 48) / (84 - 48)) * 100;
  const heightMaxPct = ((heightMax - 48) / (84 - 48)) * 100;

  const ageMinPct = ((ageMin - 18) / (100 - 18)) * 100;
  const ageMaxPct = ((ageMax - 18) / (100 - 18)) * 100;

  return (
    <div
      className="relative w-full overflow-hidden flex justify-center bg-[#232125] bg-repeat"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0.08) 65%, rgba(0, 0, 0, 0.22) 100%), url('/assets/ptm/hero_bg_clean_tile.png')`,
        backgroundSize: 'auto, 400px 400px',
      }}
    >
      <div className="w-full max-w-[1440px] relative min-h-[640px] lg:min-h-[720px] flex items-center justify-center">
        {/* Decorative Bottom-Left Texture & Watermark Overlay - strictly confined to the red-marked bottom-left hero section area */}
        <div className="absolute left-0 bottom-0 pointer-events-none select-none z-0 w-[50%] max-w-[630px] overflow-hidden">
          <img
            src="/assets/ptm/hero_bottom_left_overlay.png"
            alt="Hero Section Bottom Left Overlay"
            className="w-full h-auto object-contain object-left-bottom"
          />
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 px-4 sm:px-8 lg:px-12 py-8">
        
          {/* Left Column: Embossed Gold PTM Monogram */}
          <div className="flex justify-center items-center">
            <div className="relative w-64 sm:w-72 lg:w-[280px] xl:w-[290px] flex items-center justify-center">
              <img
                src="/assets/ptm/hero_monogram_clean.png"
                alt="Path To Marriage Monogram"
                className="w-full h-auto object-contain select-none"
              />
            </div>
          </div>

        {/* Right Column: Search Filters Card & External Submit Button */}
        <div className="flex flex-col items-center">
          <form onSubmit={handleSubmit} className="w-full max-w-[614px]">
            {/* The Glassmorphic Filter Card matching Frame 1321314625 */}
            <div className="w-full rounded-[28px] border border-white/[0.12] bg-white/[0.02] backdrop-blur-sm p-6 sm:p-7 space-y-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
              {/* Card Title */}
              <h2 className="font-serif-luxury text-center text-[25px] text-white tracking-wide font-normal mb-2.5">
                Search filters
              </h2>

              {/* 1. Premium only Box */}
              <div className="pt-2.5 pb-3 px-4 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-2 text-center">
                <span className="font-serif-luxury text-[14px] text-stone-200 block tracking-wide">
                  Premium only
                </span>
                <div className="inline-flex rounded-lg border border-white/10 bg-black/30 p-0.5 w-64 justify-center">
                  <button
                    type="button"
                    onClick={() => setPremiumOnly('Any')}
                    className={`flex-1 py-1 px-4 rounded-md font-serif-luxury text-[14px] transition cursor-pointer ${
                      premiumOnly === 'Any'
                        ? 'bg-gradient-to-b from-[#BA8520] to-[#996B16] text-white font-normal shadow-sm'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    Any
                  </button>
                  <button
                    type="button"
                    onClick={() => setPremiumOnly('Premium Only')}
                    className={`flex-1 py-1 px-4 rounded-md font-serif-luxury text-[14px] transition cursor-pointer ${
                      premiumOnly === 'Premium Only'
                        ? 'bg-gradient-to-b from-[#BA8520] to-[#996B16] text-white font-normal shadow-sm'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    Premium Only
                  </button>
                </div>
              </div>

              {/* 2. Marital status Box */}
              <div className="pt-2.5 pb-3 px-4 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-2 text-center">
                <span className="font-serif-luxury text-[14px] text-stone-200 block tracking-wide">
                  Marital status
                </span>
                <div className="flex rounded-lg border border-white/10 bg-black/30 p-0.5 w-full max-w-[460px] mx-auto divide-x divide-white/10">
                  {(['Any', 'Single', 'Divorced', 'Widowed'] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setMaritalStatus(status)}
                      className={`flex-1 py-1 px-2 font-serif-luxury text-[14px] transition cursor-pointer ${
                        maritalStatus === status
                          ? 'bg-gradient-to-b from-[#BA8520] to-[#996B16] text-white font-normal rounded-md shadow-sm'
                          : 'text-stone-300 hover:text-white'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Dual Sliders (Height & Age) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* Height Slider */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-1">
                  <div className="text-center font-serif-luxury text-[14px] text-white font-normal">
                    Height <span className="text-stone-400 text-xs">(ft'in")</span>
                  </div>

                  <div className="relative pt-7 pb-1">
                    {/* Tooltip Badges */}
                    <div
                      className="slider-tooltip"
                      style={{ left: `${heightMinPct}%` }}
                    >
                      {formatHeight(heightMin)}
                    </div>
                    <div
                      className="slider-tooltip"
                      style={{ left: `${heightMaxPct}%` }}
                    >
                      {formatHeight(heightMax)}
                    </div>

                    {/* Dual Range Container with Base Track & Active Gold Segment */}
                    <div className="dual-range-container">
                      <div className="w-full h-[2px] bg-[#383D47] rounded-full relative">
                        <div
                          className="h-[3px] bg-gradient-to-r from-[#BA8520] via-[#D8A742] to-[#A27018] rounded-full absolute -top-[0.5px]"
                          style={{
                            left: `${heightMinPct}%`,
                            width: `${heightMaxPct - heightMinPct}%`,
                          }}
                        />
                      </div>

                      <input
                        type="range"
                        min={48}
                        max={84}
                        value={heightMin}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (val < heightMax) setHeightMin(val);
                        }}
                        className="dual-range-input"
                        aria-label="Minimum height"
                      />
                      <input
                        type="range"
                        min={48}
                        max={84}
                        value={heightMax}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (val > heightMin) setHeightMax(val);
                        }}
                        className="dual-range-input"
                        aria-label="Maximum height"
                      />
                    </div>

                    {/* Min / Max Labels */}
                    <div className="flex justify-between text-[11px] font-serif-luxury text-stone-400 pt-1">
                      <span>4'0"</span>
                      <span>7'0"</span>
                    </div>
                  </div>
                </div>

                {/* Age Slider */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-1">
                  <div className="text-center font-serif-luxury text-[14px] text-white font-normal">
                    Age <span className="text-stone-400 text-xs">(years)</span>
                  </div>

                  <div className="relative pt-7 pb-1">
                    {/* Tooltip Badges */}
                    <div
                      className="slider-tooltip"
                      style={{ left: `${ageMinPct}%` }}
                    >
                      {ageMin}
                    </div>
                    <div
                      className="slider-tooltip"
                      style={{ left: `${ageMaxPct}%` }}
                    >
                      {ageMax}
                    </div>

                    {/* Dual Range Container with Base Track & Active Gold Segment */}
                    <div className="dual-range-container">
                      <div className="w-full h-[2px] bg-[#383D47] rounded-full relative">
                        <div
                          className="h-[3px] bg-gradient-to-r from-[#BA8520] via-[#D8A742] to-[#A27018] rounded-full absolute -top-[0.5px]"
                          style={{
                            left: `${ageMinPct}%`,
                            width: `${ageMaxPct - ageMinPct}%`,
                          }}
                        />
                      </div>

                      <input
                        type="range"
                        min={18}
                        max={100}
                        value={ageMin}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (val < ageMax) setAgeMin(val);
                        }}
                        className="dual-range-input"
                        aria-label="Minimum age"
                      />
                      <input
                        type="range"
                        min={18}
                        max={100}
                        value={ageMax}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (val > ageMin) setAgeMax(val);
                        }}
                        className="dual-range-input"
                        aria-label="Maximum age"
                      />
                    </div>

                    {/* Min / Max Labels */}
                    <div className="flex justify-between text-[11px] font-serif-luxury text-stone-400 pt-1">
                      <span>18</span>
                      <span>100</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* 4. Dropdowns (Religion, Nationality, Residing in) */}
              <div className="grid grid-cols-3 gap-2.5 pt-0.5">
                <div className="relative rounded-xl border border-white/[0.12] bg-black/20 hover:border-white/20 hover:bg-black/10 transition">
                  <select
                    value={religion}
                    onChange={(e) => setReligion(e.target.value)}
                    className="w-full appearance-none bg-transparent font-serif-luxury text-stone-200 text-sm py-2.5 px-3 pr-7 outline-none cursor-pointer"
                  >
                    <option value="" className="bg-[#12141A] text-stone-300">Religion</option>
                    <option value="Islam" className="bg-[#12141A] text-stone-300">Islam</option>
                    <option value="Christianity" className="bg-[#12141A] text-stone-300">Christianity</option>
                    <option value="Hinduism" className="bg-[#12141A] text-stone-300">Hinduism</option>
                    <option value="Buddhism" className="bg-[#12141A] text-stone-300">Buddhism</option>
                    <option value="Other" className="bg-[#12141A] text-stone-300">Other</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-3.5 pointer-events-none" />
                </div>

                <div className="relative rounded-xl border border-white/[0.12] bg-black/20 hover:border-white/20 hover:bg-black/10 transition">
                  <select
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className="w-full appearance-none bg-transparent font-serif-luxury text-stone-200 text-sm py-2.5 px-3 pr-7 outline-none cursor-pointer"
                  >
                    <option value="" className="bg-[#12141A] text-stone-300">Nationality</option>
                    <option value="Bangladeshi" className="bg-[#12141A] text-stone-300">Bangladeshi</option>
                    <option value="British" className="bg-[#12141A] text-stone-300">British</option>
                    <option value="American" className="bg-[#12141A] text-stone-300">American</option>
                    <option value="Canadian" className="bg-[#12141A] text-stone-300">Canadian</option>
                    <option value="Australian" className="bg-[#12141A] text-stone-300">Australian</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-3.5 pointer-events-none" />
                </div>

                <div className="relative rounded-xl border border-white/[0.12] bg-black/20 hover:border-white/20 hover:bg-black/10 transition">
                  <select
                    value={residingIn}
                    onChange={(e) => setResidingIn(e.target.value)}
                    className="w-full appearance-none bg-transparent font-serif-luxury text-stone-200 text-sm py-2.5 px-3 pr-7 outline-none cursor-pointer"
                  >
                    <option value="" className="bg-[#12141A] text-stone-300">Residing in</option>
                    <option value="United Kingdom" className="bg-[#12141A] text-stone-300">United Kingdom</option>
                    <option value="United States" className="bg-[#12141A] text-stone-300">United States</option>
                    <option value="Canada" className="bg-[#12141A] text-stone-300">Canada</option>
                    <option value="Bangladesh" className="bg-[#12141A] text-stone-300">Bangladesh</option>
                    <option value="UAE" className="bg-[#12141A] text-stone-300">UAE</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-3.5 pointer-events-none" />
                </div>
              </div>

            </div>

            {/* Submit Button (Centered Outside Card Below) - Exactly 188px x 49px */}
            <div className="mt-[28px] flex justify-center">
              <button
                type="submit"
                className="w-[188px] h-[49px] rounded-[14px] bg-gradient-to-b from-[#C68B25] to-[#A27018] text-[#151006] font-serif-luxury text-[17px] font-semibold tracking-wide shadow-[0_4px_18px_rgba(186,128,33,0.35)] hover:brightness-105 active:scale-[0.99] transition cursor-pointer flex items-center justify-center"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        </div>
      </div>
    </div>
  );
};
