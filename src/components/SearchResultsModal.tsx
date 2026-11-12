import React from 'react';
import { X, User, Heart, Sparkles, MapPin } from 'lucide-react';
import { SearchFilterState, formatHeight } from '../utils/filterUtils';

interface SearchResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: SearchFilterState | null;
}

export const SearchResultsModal: React.FC<SearchResultsModalProps> = ({
  isOpen,
  onClose,
  filters,
}) => {
  if (!isOpen || !filters) return null;

  const mockMatches = [
    {
      id: 'PTM-8921',
      age: 28,
      height: 64, // 5'4"
      status: 'Single',
      profession: 'Software Engineer',
      location: 'London, United Kingdom',
      religion: 'Islam',
      isPremium: true,
      bio: 'Family-oriented, enjoys literature, traveling, and community volunteer work.',
    },
    {
      id: 'PTM-7742',
      age: 31,
      height: 68, // 5'8"
      status: 'Single',
      profession: 'Physician / Medical Resident',
      location: 'New York, United States',
      religion: 'Islam',
      isPremium: true,
      bio: 'Practicing doctor focused on healthcare and balanced lifestyle with strong family values.',
    },
    {
      id: 'PTM-6510',
      age: 27,
      height: 62, // 5'2"
      status: 'Single',
      profession: 'Architectural Designer',
      location: 'Toronto, Canada',
      religion: 'Islam',
      isPremium: false,
      bio: 'Creative professional with passion for heritage preservation and lifelong learning.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-2xl p-6 sm:p-8 rounded-[28px] bg-[#14161C] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D69E3A]/10 text-[#D69E3A] border border-[#D69E3A]/20 text-[11px] font-serif-luxury uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>Search Filter Applied</span>
          </div>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal tracking-wide">
            Matching Biodata Profiles
          </h3>
          <p className="font-serif-luxury text-sm text-stone-300">
            Showing verified candidates matching Marital Status: <span className="text-[#D69E3A] font-semibold">{filters.maritalStatus}</span>, Height: <span className="text-[#D69E3A] font-semibold">{formatHeight(filters.heightMin)} - {formatHeight(filters.heightMax)}</span>, Age: <span className="text-[#D69E3A] font-semibold">{filters.ageMin} - {filters.ageMax} yrs</span>
          </p>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {mockMatches.map((match) => (
            <div
              key={match.id}
              className="p-4 rounded-xl bg-black/40 border border-white/5 hover:border-[#D69E3A]/30 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#1C1F27] border border-[#D69E3A]/30 text-[#D69E3A] flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif-luxury text-base font-bold text-white">
                      Profile #{match.id}
                    </span>
                    {match.isPremium && (
                      <span className="font-serif-luxury text-[11px] font-semibold text-[#D69E3A] bg-[#D69E3A]/15 px-1.5 py-0.2 rounded border border-[#D69E3A]/20">
                        Verified KYC
                      </span>
                    )}
                  </div>
                  <div className="font-serif-luxury text-xs text-stone-300 mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span>{match.age} yrs</span>
                    <span>•</span>
                    <span>{formatHeight(match.height)}</span>
                    <span>•</span>
                    <span>{match.status}</span>
                    <span>•</span>
                    <span>{match.profession}</span>
                  </div>
                  <div className="font-serif-luxury flex items-center gap-1 text-[12px] text-stone-400 mt-1">
                    <MapPin className="w-3 h-3 text-[#D69E3A]" />
                    <span>{match.location}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full sm:w-auto py-1.5 px-4 rounded-lg bg-gradient-to-b from-[#C68B25] to-[#A27018] text-[#151006] font-serif-luxury text-xs font-semibold shrink-0 flex items-center justify-center gap-1.5 cursor-pointer hover:brightness-105 transition"
              >
                <Heart className="w-3.5 h-3.5" />
                <span>Express Interest</span>
              </button>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="py-1.5 px-5 rounded-lg bg-white/10 font-serif-luxury text-xs text-white hover:bg-white/20 transition cursor-pointer"
          >
            Close Results
          </button>
        </div>
      </div>
    </div>
  );
};
