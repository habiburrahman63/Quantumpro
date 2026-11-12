import React, { useState } from 'react';
import { Play, X, PhoneCall, CheckCircle } from 'lucide-react';

export const AssistedRegistration: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !name) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setModalOpen(false);
      setFormSubmitted(false);
      setName('');
      setPhone('');
    }, 2500);
  };

  return (
    <section
      id="assisted-section"
      className="py-16 sm:py-24 w-full relative overflow-hidden"
      style={{
        backgroundColor: '#232125',
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 35%, rgba(0, 0, 0, 0.08) 65%, rgba(0, 0, 0, 0.18) 100%), url('/assets/ptm/hero_bg_clean_tile.png')`,
        backgroundSize: 'auto, 400px 400px',
      }}
    >
      <div className="max-w-[1360px] mx-auto px-6 sm:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Title & 3-line balanced description */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[42px] text-white font-normal tracking-wide">
              Assisted Registration
            </h2>
            <p className="font-serif-luxury text-sm sm:text-[15.5px] text-[#A6ABB7] leading-[1.7] font-light max-w-[430px]">
              Need help signing up? Apply for our Assisted Registration service where we will complete the registration process over phone on your behalf.{' '}
              <span
                onClick={() => setModalOpen(true)}
                className="cursor-pointer text-[#C4C8D2] hover:text-[#D69E3A] transition"
              >
                Click here to learn more...
              </span>
            </p>
          </div>

          {/* Right Column: Video Card matching Screenshot */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div
              onClick={() => setModalOpen(true)}
              className="w-full max-w-[570px] h-[400px] sm:h-[460px] lg:h-[498px] rounded-[32px] border border-[#B88A32]/60 bg-gradient-to-b from-[#1C1A18] via-[#141315] to-[#0E0E10] flex items-center justify-center cursor-pointer group shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative overflow-hidden transition-all duration-300 hover:border-[#D49E35]/80 hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(200,148,46,0.15)]"
            >
              {/* Subtle inner ambient glow */}
              <div className="absolute inset-0 bg-radial from-white/[0.03] to-transparent pointer-events-none" />

              {/* Centered Gold Squircle Play Button matching Screenshot */}
              <div className="w-[56px] h-[56px] rounded-[18px] bg-gradient-to-b from-[#E5A83B] via-[#C88E28] to-[#996815] flex items-center justify-center shadow-[0_4px_22px_rgba(214,158,58,0.45)] group-hover:scale-105 transition-transform duration-200">
                <Play className="w-5 h-5 text-[#14110A] fill-[#14110A] ml-0.5" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Assisted Registration Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-[#14171E] border border-white/10 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {formSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-[#D69E3A] mx-auto animate-bounce" />
                <h3 className="font-serif-luxury text-2xl text-white font-normal">
                  Request Received
                </h3>
                <p className="font-serif-luxury text-sm text-stone-300">
                  Our assisted registration specialist will call you shortly to assist with your onboarding.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                  <div className="p-2.5 rounded-xl bg-[#D69E3A]/10 text-[#D69E3A]">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif-luxury text-xl text-white font-normal">
                      Assisted Registration
                    </h3>
                    <p className="font-serif-luxury text-xs text-stone-400">
                      We'll set up your profile over the phone
                    </p>
                  </div>
                </div>

                <form onSubmit={handleApply} className="space-y-3">
                  <div>
                    <label className="font-serif-luxury text-xs text-stone-300 block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#0D0F13] text-white text-xs px-3.5 py-2.5 rounded-lg border border-white/10 outline-none focus:border-[#D69E3A]"
                    />
                  </div>

                  <div>
                    <label className="font-serif-luxury text-xs text-stone-300 block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#0D0F13] text-white text-xs px-3.5 py-2.5 rounded-lg border border-white/10 outline-none focus:border-[#D69E3A]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-lg bg-gradient-to-b from-[#C68B25] to-[#A27018] text-[#151006] font-serif-luxury text-sm font-semibold tracking-wide shadow-md hover:brightness-105 active:scale-[0.99] transition cursor-pointer"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
