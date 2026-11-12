import React, { useState } from 'react';
import { Youtube, Instagram, Facebook, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenLogin: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLogin,
  onScrollToSection,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer
      className="w-full relative z-20 pt-[42px] pb-[34px] overflow-hidden"
      style={{
        backgroundColor: '#1E1C1F',
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.18) 100%), url('/assets/ptm/hero_bg_clean_tile.png')`,
        backgroundRepeat: 'repeat',
        backgroundSize: '400px 400px',
      }}
    >
      <div className="max-w-[854px] mx-auto px-6 sm:px-8 lg:px-0">
        <div className="flex flex-col sm:flex-row flex-wrap lg:flex-nowrap justify-between items-start gap-8 sm:gap-6 lg:gap-0">
          
          {/* Column 1: Brand Logo & Socials (width ~201px) */}
          <div className="w-full sm:w-auto lg:w-[201px] lg:pl-[7px]">
            <img
              src="/assets/ptm/header_logo.png"
              alt="Path To Marriage"
              className="h-[36px] w-auto object-contain cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
            {/* 4 Round Solid Gold Social Icons (YouTube, Instagram, TikTok, Facebook) */}
            <div className="flex items-center gap-[8px] mt-[21px]">
              <a
                href="#youtube"
                onClick={(e) => e.preventDefault()}
                aria-label="YouTube"
                className="w-[18px] h-[18px] rounded-full bg-[#CA8A20] hover:bg-[#DE9B2A] text-[#121316] flex items-center justify-center transition shadow-sm"
              >
                <Youtube className="w-[11px] h-[11px] fill-[#121316] stroke-none" />
              </a>
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                aria-label="Instagram"
                className="w-[18px] h-[18px] rounded-full bg-[#CA8A20] hover:bg-[#DE9B2A] text-[#121316] flex items-center justify-center transition shadow-sm"
              >
                <Instagram className="w-[11px] h-[11px] stroke-[2.5]" />
              </a>
              <a
                href="#tiktok"
                onClick={(e) => e.preventDefault()}
                aria-label="TikTok"
                className="w-[18px] h-[18px] rounded-full bg-[#CA8A20] hover:bg-[#DE9B2A] text-[#121316] flex items-center justify-center transition shadow-sm"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-[10px] h-[10px]">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .57.04.84.11V9.41a6.33 6.33 0 0 0-.84-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.16 8.16 0 0 0 4.77 1.52v-3.45a4.85 4.85 0 0 1-1-.13z"/>
                </svg>
              </a>
              <a
                href="#facebook"
                onClick={(e) => e.preventDefault()}
                aria-label="Facebook"
                className="w-[18px] h-[18px] rounded-full bg-[#CA8A20] hover:bg-[#DE9B2A] text-[#121316] flex items-center justify-center transition shadow-sm"
              >
                <Facebook className="w-[11px] h-[11px] fill-[#121316] stroke-none" />
              </a>
            </div>
          </div>

          {/* Column 2: Help (width ~155px) */}
          <div className="w-full sm:w-auto lg:w-[155px]">
            <h4 className="font-serif-luxury text-[17px] font-normal text-white tracking-wide">
              Help
            </h4>
            <ul className="mt-[14px] space-y-[9px] font-serif-luxury text-[13.5px] text-[#B4B8C4]">
              <li>
                <button onClick={onOpenLogin} className="hover:text-white transition cursor-pointer">
                  Member Login
                </button>
              </li>
              <li>
                <button onClick={onOpenLogin} className="hover:text-white transition cursor-pointer">
                  Signup
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('pricing-section')} className="hover:text-white transition cursor-pointer">
                  Pricing
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('assisted-section')} className="hover:text-white transition cursor-pointer">
                  Customer support
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company (width ~155px) */}
          <div className="w-full sm:w-auto lg:w-[155px]">
            <h4 className="font-serif-luxury text-[17px] font-normal text-white tracking-wide">
              Company
            </h4>
            <ul className="mt-[14px] space-y-[9px] font-serif-luxury text-[13.5px] text-[#B4B8C4]">
              <li>
                <button onClick={() => onScrollToSection('about-section')} className="hover:text-white transition cursor-pointer">
                  About us
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('assisted-section')} className="hover:text-white transition cursor-pointer">
                  Contact us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Privacy (width ~130px) */}
          <div className="w-full sm:w-auto lg:w-[130px]">
            <h4 className="font-serif-luxury text-[17px] font-normal text-white tracking-wide">
              Privacy
            </h4>
            <ul className="mt-[14px] space-y-[9px] font-serif-luxury text-[13.5px] text-[#B4B8C4]">
              <li>
                <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-white transition">
                  Terms of use
                </a>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white transition">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="#security" onClick={(e) => e.preventDefault()} className="hover:text-white transition">
                  Web security
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Stay up to date (width ~205px) */}
          <div className="w-full sm:w-auto lg:w-[205px]">
            <h4 className="font-serif-luxury text-[17px] font-normal text-white tracking-wide">
              Stay up to date
            </h4>
            <p className="mt-[8px] font-serif-luxury text-[13px] text-[#B4B8C4] leading-[17px] font-light max-w-[210px]">
              Sign up for our newsletter to receive exclusive promotions, news, & tips.
            </p>
            <form onSubmit={handleSubscribe} className="mt-[14px]">
              <input
                type="email"
                required
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[206px] max-w-full h-[36px] bg-transparent text-[#EDEDED] font-serif-luxury text-[13px] px-3 rounded-[6px] border border-white/20 outline-none focus:border-[#D69E3A] placeholder:text-[#8C909B]"
              />
              <div className="mt-[18px]">
                <button
                  type="submit"
                  className="w-[96px] h-[34px] rounded-[6px] bg-[#CA8A20] hover:bg-[#DE9B2A] text-[#121316] font-serif-luxury text-[13.5px] font-medium flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition"
                >
                  {subscribed ? (
                    <span>Done</span>
                  ) : (
                    <>
                      <span>Submit</span>
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* White line above Copyright */}
        <div className="mt-[34px] pt-[26px] border-t border-white/45 text-center">
          <p className="font-serif-luxury text-[13.5px] text-[#8C909B] font-light">
            Copyright © 2026 Path To Marriage. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
