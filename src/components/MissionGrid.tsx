import React from 'react';

export const MissionGrid: React.FC = () => {
  return (
    <section
      id="about-section"
      className="w-full relative overflow-hidden"
      style={{
        backgroundColor: '#1E1C1F',
        backgroundImage: "url('/assets/ptm/hero_bg_clean_tile.png')",
        backgroundSize: '400px 400px',
      }}
    >
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 border-t border-b border-[#A8905F]/45 shadow-[0_1px_0_0_rgba(0,0,0,0.85)]">
        
        {/* ROW 1: ITEM 1 - Who are we (Text) */}
        <div
          className="aspect-[4/3] sm:aspect-[1.037/1] flex flex-col items-center justify-center p-4 text-center border-b sm:border-b-0 sm:border-r border-[#A8905F]/45 shadow-[inset_0_0_35px_rgba(0,0,0,0.55),1px_0_0_0_rgba(0,0,0,0.85)] relative"
          style={{
            backgroundColor: '#1E1C1F',
            backgroundImage: `radial-gradient(circle at 20% 75%, rgba(65, 52, 35, 0.22) 0%, rgba(30, 26, 24, 0.15) 50%, rgba(15, 14, 15, 0.40) 100%), url('/assets/ptm/hero_bg_clean_tile.png')`,
            backgroundSize: '100% 100%, 400px 400px',
          }}
        >
          <div className="w-[242px] max-w-[90%] flex flex-col items-center pt-3.5 sm:pt-4">
            <h3 className="font-serif-luxury text-[20px] sm:text-[23.5px] text-white font-normal tracking-wide mb-3.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
              Who are we
            </h3>
            <p className="font-serif-luxury text-[12px] sm:text-[12.5px] text-[#C2C6D0] leading-[14.5px] sm:leading-[15px] font-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
              Path to Marriage is a subscription-based matrimonial community platform designed to transform the way people find life partners. We aim to set new industry standards by combining technology with strong community-driven approach. Our mission is to create the largest and most trusted social networking based matrimonial service, where meaningful connections lead to lifelong commitment.
            </p>
          </div>
        </div>

        {/* ROW 1: ITEM 2 - Wedding Rings (Image) */}
        <div className="aspect-[4/3] sm:aspect-[1.037/1] relative overflow-hidden bg-black border-b sm:border-b-0 sm:border-r border-[#A8905F]/45 shadow-[1px_0_0_0_rgba(0,0,0,0.85)] group">
          <img
            src="/assets/ptm/rings_exact.png"
            alt="Wedding Rings"
            className="w-full h-full object-cover object-center block"
          />
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.45)]" />
        </div>

        {/* ROW 1: ITEM 3 - Our Commitment (Text) */}
        <div
          className="aspect-[4/3] sm:aspect-[1.037/1] flex flex-col items-center justify-center p-4 text-center border-b sm:border-b-0 border-[#A8905F]/45 shadow-[inset_0_0_35px_rgba(0,0,0,0.55)] relative"
          style={{
            backgroundColor: '#1E1C1F',
            backgroundImage: `radial-gradient(circle at 20% 75%, rgba(65, 52, 35, 0.22) 0%, rgba(30, 26, 24, 0.15) 50%, rgba(15, 14, 15, 0.40) 100%), url('/assets/ptm/hero_bg_clean_tile.png')`,
            backgroundSize: '100% 100%, 400px 400px',
          }}
        >
          <div className="w-[244px] max-w-[90%] flex flex-col items-center pt-3.5 sm:pt-4">
            <h3 className="font-serif-luxury text-[20px] sm:text-[23.5px] text-white font-normal tracking-wide mb-3.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
              Our Commitment
            </h3>
            <p className="font-serif-luxury text-[12px] sm:text-[12.5px] text-[#C2C6D0] leading-[14.5px] sm:leading-[15px] font-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
              Our goal is to provide high-quality matchmaking services at the most affordable rates. By bringing people together on a single platform, we ensure that candidates and their families can find the right match, no matter where they are in the world. Whether you're searching for yourself or a loved one, Path to Marriage is dedicated to making the process smooth, transparent and fulfilling.
            </p>
          </div>
        </div>

        {/* ROW 2: ITEM 4 - Wax Seal (Image) */}
        <div className="aspect-[4/3] sm:aspect-[1.037/1] relative overflow-hidden bg-black sm:border-t border-b sm:border-b-0 sm:border-r border-[#A8905F]/45 shadow-[1px_0_0_0_rgba(0,0,0,0.85),0_1px_0_0_rgba(0,0,0,0.85)] group">
          <img
            src="/assets/ptm/wax_seal_exact.png"
            alt="Vintage Wax Seal Letter"
            className="w-full h-full object-cover object-center block"
          />
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.45)]" />
        </div>

        {/* ROW 2: ITEM 5 - Our Vision (Text) */}
        <div
          className="aspect-[4/3] sm:aspect-[1.037/1] flex flex-col items-center justify-center p-4 text-center sm:border-t border-b sm:border-b-0 sm:border-r border-[#A8905F]/45 shadow-[inset_0_0_35px_rgba(0,0,0,0.55),1px_0_0_0_rgba(0,0,0,0.85),0_1px_0_0_rgba(0,0,0,0.85)] relative"
          style={{
            backgroundColor: '#1E1C1F',
            backgroundImage: `radial-gradient(circle at 20% 25%, rgba(65, 52, 35, 0.22) 0%, rgba(30, 26, 24, 0.15) 50%, rgba(15, 14, 15, 0.40) 100%), url('/assets/ptm/hero_bg_clean_tile.png')`,
            backgroundSize: '100% 100%, 400px 400px',
          }}
        >
          <div className="w-[244px] max-w-[90%] flex flex-col items-center pt-3.5 sm:pt-4">
            <h3 className="font-serif-luxury text-[20px] sm:text-[23.5px] text-white font-normal tracking-wide mb-3.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
              Our Vision
            </h3>
            <p className="font-serif-luxury text-[12px] sm:text-[12.5px] text-[#C2C6D0] leading-[14.5px] sm:leading-[15px] font-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
              We believe that finding a life partner should be a seamless, secure and enjoyable experience. By revolutiionizing electronic matrimonial services, we strive to make matchmaking more accessible and efficient for people worldwide. Our platform is designed to build genuine relationships, helping individuals and families navigate the journey of marriage with confidence and trust.
            </p>
          </div>
        </div>

        {/* ROW 2: ITEM 6 - Candles (Image) */}
        <div className="aspect-[4/3] sm:aspect-[1.037/1] relative overflow-hidden bg-black sm:border-t border-[#A8905F]/45 shadow-[0_1px_0_0_rgba(0,0,0,0.85)] group">
          <img
            src="/assets/ptm/candles_exact.png"
            alt="Romantic Candlelight"
            className="w-full h-full object-cover object-center block"
          />
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.45)]" />
        </div>

      </div>
    </section>
  );
};
