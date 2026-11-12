import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSearch } from './components/HeroSearch';
import { HowItWorks } from './components/HowItWorks';
import { AssistedRegistration } from './components/AssistedRegistration';
import { MissionGrid } from './components/MissionGrid';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { SearchResultsModal } from './components/SearchResultsModal';
import { SearchFilterState } from './utils/filterUtils';

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchFilterState | null>(null);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (filters: SearchFilterState) => {
    setSearchResults(filters);
  };

  return (
    <div className="min-h-screen flex flex-col site-bg text-[#E2E8F0] selection:bg-[#D69E3A]/30 selection:text-[#F5BA42] relative overflow-x-hidden">
      {/* 1. Header Navigation */}
      <Header
        onOpenLogin={() => setIsLoginOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* 2. Main Sections */}
      <main className="flex-1 w-full relative">
        {/* Hero Section: Monogram (Left) & Search Filters (Right) */}
        <section className="relative z-10">
          <HeroSearch onSearch={handleSearchSubmit} />
        </section>

        {/* How It Works & Pricing Comparison Table */}
        <section className="relative z-10">
          <HowItWorks />
        </section>

        {/* Assisted Registration & Video Showcase */}
        <section className="relative z-10">
          <AssistedRegistration />
        </section>

        {/* 6-Grid Mission, Commitment & Vision Mosaic with Real Imagery */}
        <section className="relative z-10">
          <MissionGrid />
        </section>
      </main>

      {/* 3. Footer */}
      <Footer
        onOpenLogin={() => setIsLoginOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      <SearchResultsModal
        isOpen={!!searchResults}
        onClose={() => setSearchResults(null)}
        filters={searchResults}
      />
    </div>
  );
}
